# incidenTI — Guía de implementación

Plataforma inteligente de gestión de incidentes TI: recibe tickets, clasifica automáticamente, identifica prioridad, sugiere soluciones y asigna al equipo correspondiente.

---

## 1. Visión y alcance MVP

### Objetivo

Reducir el tiempo de triaje y asignación de incidentes TI mediante un pipeline de IA con humano en el loop.

### Flujo de valor

1. Ingreso del ticket (formulario web; luego email/Slack/API)
2. Clasificación automática (categoría)
3. Priorización (P1–P4)
4. Sugerencia de soluciones (RAG sobre KB + tickets resueltos)
5. Asignación al equipo correspondiente
6. Resolución y feedback para mejorar el modelo

### Alcance del MVP

- Auth con roles: solicitante, agente, admin
- CRUD de tickets y equipos
- Pipeline IA asíncrono (clasificar, priorizar, asignar, sugerir)
- Dashboard operativo y detalle de ticket con panel IA
- Feedback de aceptación/corrección de sugerencias

### Fuera del MVP (fases posteriores)

- Canales Slack/email productivos
- Asignación por carga/skills/on-call
- Fine-tuning / datasets propios
- Detección de duplicados correlacionados
- Chat asistente sobre el ticket

---

## 2. Arquitectura

```
┌─────────────┐   ┌──────────────┐   ┌─────────────────┐
│  Canales    │──▶│  API + Queue │──▶│  Motor IA       │
│ Web/Email/  │   │  (tickets)   │   │  clasificar /   │
│ Slack/API   │   └──────┬───────┘   │  priorizar /    │
└─────────────┘          │           │  sugerir /      │
                         ▼           │  enrutar        │
                  ┌──────────────┐   └────────┬────────┘
                  │  PostgreSQL  │◀───────────┘
                  │  + pgvector  │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │  Dashboard   │
                  │  + notifs    │
                  └──────────────┘
```

### Stack objetivo

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js (App Router) + TypeScript + Tailwind + shadcn/ui |
| Backend | FastAPI (Python) |
| DB | PostgreSQL + pgvector |
| Cola | Redis + worker (Celery o RQ) |
| IA | LLM API (OpenAI/Claude) + embeddings |
| Auth | Auth.js / sesión + roles |
| Deploy | Docker Compose → Railway/Render/Fly |

### Estructura de carpetas

```
incidenTI/
├── web/                    # Next.js (arranque actual)
├── api/                    # FastAPI (fase posterior)
├── worker/                 # Jobs de clasificación / embeddings
├── docker-compose.yml
├── implementation-guide.md
└── README.md
```

---

## 3. Modelo de datos

### Entidades

- **User** — roles: `requester`, `agent`, `admin`
- **Team** — redes, apps, seguridad, helpdesk, etc.
- **Ticket** — título, descripción, estado, categoría, prioridad, equipo, asignado
- **Classification** — categoría predicha, confianza, prioridad, rationale
- **SolutionSuggestion** — texto + referencias a tickets/KB similares
- **Assignment** — equipo/agente + motivo
- **Feedback** — corrección humana
- **KnowledgeArticle** — base de conocimiento para RAG

### Estados del ticket

`new` → `classified` → `assigned` → `in_progress` → `resolved` → `closed`

### Prioridades

| Código | Nombre | Uso típico |
|--------|--------|------------|
| P1 | Crítica | Outage / bloqueo masivo |
| P2 | Alta | Impacto alto, workaround limitado |
| P3 | Media | Degradación parcial |
| P4 | Baja | Consulta / mejora menor |

### Categorías (ejemplo)

`network`, `hardware`, `software`, `access`, `email`, `security`, `other`

---

## 4. Motor inteligente

### 4.1 Clasificación

- Entrada: título + descripción (+ metadata de adjuntos)
- Salida JSON estricto: categoría, confianza, explicación
- Fallback por keywords/reglas si confianza &lt; umbral

### 4.2 Prioridad

Matriz impacto × urgencia + señales del LLM:

- Impacto: usuarios afectados, sistema crítico
- Urgencia: SLA, “no puedo trabajar”, outage
- Resultado: P1–P4

### 4.3 Sugerencia de soluciones (RAG)

1. Embedding del ticket
2. Búsqueda vectorial en tickets resueltos + KB (`pgvector`)
3. LLM resume top-k en pasos accionables
4. UI muestra fuentes (IDs de tickets / artículos)

### 4.4 Asignación

- Mapa `categoría → equipo`
- Auto-asignar si confianza ≥ umbral; si no, cola “por revisar”
- Fases posteriores: skills, carga, on-call

---

## 5. Frontend inicial (decisión comprometida)

### Stack UI

**Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui**

Motivo: control total del look formal, tablas/formularios limpios, sin estética SaaS púrpura. Producto de operaciones TI → layout de dashboard operativo.

### Dirección visual

| Token | Valor | Uso |
|-------|-------|-----|
| Primary | `#0B1F3A` | Navy — sidebar, CTAs, marca |
| Accent | `#1B4F72` | Steel blue — links, focus, highlights |
| Neutrals | `#64748B` / `#F1F5F9` | Texto secundario / fondos |
| Surface | `#FFFFFF` | Contenido principal |
| P1 | rojo muted | Prioridad crítica |
| P2 | ámbar | Prioridad alta |
| P3 | azul | Prioridad media |
| P4 | gris | Prioridad baja |
| Success | verde muted | Resuelto / OK |

- **Modo claro** por defecto (corporativo)
- **Tipografía:** IBM Plex Sans (UI) + IBM Plex Serif solo en marca “incidenTI” (login/sidebar)
- **Layout:** sidebar fija + top bar + área de contenido
- **Densidad:** media-alta (filas compactas, badges discretos)
- **Cards:** solo en KPIs interactivos y panel de sugerencias IA; sin cards decorativas

### Mapa de pantallas MVP

```
Login → AppShell
          ├── Dashboard
          ├── Tickets (lista)
          ├── Ticket (detalle + panel IA)
          ├── Nuevo ticket
          └── Equipos (admin)
```

| Ruta | Propósito |
|------|-----------|
| `/login` | Acceso (mock al inicio) |
| `/` | Dashboard: abiertos, P1, por equipo |
| `/tickets` | Lista con filtros estado/prioridad/equipo |
| `/tickets/[id]` | Detalle + clasificación + sugerencias + timeline |
| `/tickets/new` | Crear ticket |
| `/teams` | Gestión básica de equipos |

### Orden de construcción del frontend

1. Scaffold + tokens CSS navy/slate + fuentes
2. AppShell (sidebar / topbar)
3. Rutas mock con datos tipados estáticos
4. Lista y detalle con badges y panel IA
5. Conectar a API real (cuando exista)

---

## 6. Fases de implementación

### Fase 0 — Frontend mock (actual)

- Scaffold `web/`
- Design system empresarial
- Pantallas MVP con datos mock
- Validar UX del flujo crear → listar → detalle → sugerencias

### Fase 1 — Fundamentos backend

- Docker Compose (Postgres + Redis)
- FastAPI: auth, CRUD tickets/equipos
- Conectar frontend a API

### Fase 2 — Pipeline IA básico

- Worker asíncrono al crear ticket
- Clasificación + prioridad vía LLM (JSON schema)
- Asignación por reglas categoría→equipo
- Guardar confianza y explicación
- UI muestra resultados del pipeline

### Fase 3 — Sugerencias RAG

- Seed de KB + tickets resueltos
- Embeddings + `pgvector`
- Panel “Soluciones sugeridas” con fuentes reales
- Feedback thumbs up/down

### Fase 4 — Operación

- Email inbound / Slack webhook
- Notificaciones
- SLA timers y métricas de precisión IA
- Auditoría de cambios

### Fase 5 — Inteligencia avanzada (opcional)

- Aprendizaje con feedback
- Asignación por carga y skills
- Duplicados / correlación
- Chat asistente sobre el ticket

---

## 7. Criterios de éxito del MVP

- Ticket nuevo clasificado y priorizado automáticamente en &lt; 15 s
- Asignación correcta al equipo en ≥ 80% de casos de prueba
- Al menos 1 solución sugerida útil cuando hay historial similar
- Agente puede aceptar/corregir clasificación y queda registrado
- Flujo completo: crear → clasificar → asignar → resolver → cerrar

---

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| Alucinaciones del LLM | Schema estricto + umbral de confianza + humano |
| Sin historial para RAG | Seed sintético + artículos KB de ejemplo |
| Costos de API | Cache de embeddings; clasificar solo al crear/editar |
| Scope creep | Congelar MVP en Fases 0–3 |

---

## 9. Hitos de demo

| Hito | Qué se ve |
|------|-----------|
| M1 | UI formal: crear/ver tickets (mock) |
| M2 | API + “Enviar” → categoría, prioridad y equipo en &lt;10s |
| M3 | Sugerencias con pasos y tickets similares |
| M4 | Agente resuelve; siguiente ticket similar mejora sugerencia |
| M5 | Dashboard de volumen y precisión IA |

---

## 10. Orden de trabajo recomendado

1. **Ahora:** frontend mock (`web/`) según sección 5
2. Backend FastAPI + Postgres
3. Worker IA (clasificar / priorizar / asignar)
4. RAG + feedback
5. Canales y operación

---

*Documento vivo — actualizar cuando cambien decisiones de stack o alcance.*
