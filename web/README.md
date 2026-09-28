# incidenTI Web

Frontend de la plataforma de gestión inteligente de incidentes TI.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Tema empresarial navy / slate (modo claro)
- Tipografía: IBM Plex Sans + IBM Plex Serif (marca)

## Desarrollo

```bash
cd web
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Login demo en `/login`.

## Rutas mock

| Ruta | Descripción |
|------|-------------|
| `/login` | Acceso demo |
| `/` | Dashboard |
| `/tickets` | Lista con filtros |
| `/tickets/new` | Crear ticket |
| `/tickets/[id]` | Detalle + panel IA |
| `/teams` | Equipos |

Los datos viven en `src/lib/mock-data.ts` hasta conectar el backend.
