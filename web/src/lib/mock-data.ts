import type { Team, Ticket } from "./types";

export const teams: Team[] = [
  {
    id: "team-helpdesk",
    name: "Helpdesk",
    slug: "helpdesk",
    memberCount: 8,
    openTickets: 14,
    description: "Soporte de primer nivel y triaje inicial.",
  },
  {
    id: "team-network",
    name: "Redes",
    slug: "network",
    memberCount: 5,
    openTickets: 6,
    description: "Conectividad, VPN, firewall y Wi‑Fi.",
  },
  {
    id: "team-apps",
    name: "Aplicaciones",
    slug: "apps",
    memberCount: 7,
    openTickets: 9,
    description: "ERP, CRM y aplicaciones de negocio.",
  },
  {
    id: "team-security",
    name: "Seguridad",
    slug: "security",
    memberCount: 4,
    openTickets: 3,
    description: "Identidad, accesos y respuesta a incidentes.",
  },
  {
    id: "team-infra",
    name: "Infraestructura",
    slug: "infra",
    memberCount: 6,
    openTickets: 5,
    description: "Servidores, almacenamiento y endpoints.",
  },
];

export const tickets: Ticket[] = [
  {
    id: "tkt-1042",
    number: 1042,
    title: "VPN corporativa no conecta desde oficinas remotas",
    description:
      "Desde las 08:15 varios usuarios en oficinas remotas reportan timeout al autenticarse en la VPN. El portal web responde, pero el túnel no se establece. Impacto estimado: ~40 usuarios.",
    status: "assigned",
    priority: "P1",
    category: "network",
    teamId: "team-network",
    assignee: "María López",
    requester: "Carlos Ruiz",
    createdAt: "2026-09-23T08:22:00Z",
    updatedAt: "2026-09-23T08:35:00Z",
    classification: {
      confidence: 0.94,
      rationale:
        "Síntomas de falla de túnel VPN con impacto multi-usuario; categoría redes y prioridad crítica.",
    },
    suggestions: [
      {
        id: "sug-1",
        title: "Verificar gateway VPN y certificados",
        confidence: 0.88,
        steps: [
          "Revisar estado del concentrador VPN en el panel de monitoreo.",
          "Validar vigencia del certificado SSL del portal.",
          "Probar autenticación con cuenta de servicio desde red interna.",
          "Si el gateway está saturado, redistribuir sesiones o reiniciar nodo secundario.",
        ],
        sources: [
          { type: "ticket", id: "tkt-891", label: "#891 — Caída VPN sede norte" },
          { type: "kb", id: "kb-12", label: "KB-12 Procedimiento VPN gateway" },
        ],
      },
      {
        id: "sug-2",
        title: "Regla de firewall / MFA",
        confidence: 0.71,
        steps: [
          "Comprobar reglas de firewall hacia el puerto UDP 443/1194.",
          "Revisar logs de MFA por fallos masivos de segundo factor.",
        ],
        sources: [
          { type: "ticket", id: "tkt-776", label: "#776 — MFA bloqueando VPN" },
        ],
      },
    ],
    timeline: [
      {
        id: "ev-1",
        at: "2026-09-23T08:22:00Z",
        label: "Ticket creado",
        detail: "Canal: portal web",
      },
      {
        id: "ev-2",
        at: "2026-09-23T08:23:12Z",
        label: "Clasificado por IA",
        detail: "Redes · P1 · confianza 94%",
      },
      {
        id: "ev-3",
        at: "2026-09-23T08:23:40Z",
        label: "Asignado a equipo Redes",
        detail: "Agente: María López",
      },
    ],
  },
  {
    id: "tkt-1041",
    number: 1041,
    title: "Error 500 al exportar reportes en ERP",
    description:
      "Al exportar reportes de nómina el ERP responde HTTP 500. Otros módulos funcionan. Ocurre desde el despliegue de anoche.",
    status: "in_progress",
    priority: "P2",
    category: "software",
    teamId: "team-apps",
    assignee: "Diego Fernández",
    requester: "Ana Méndez",
    createdAt: "2026-09-23T07:10:00Z",
    updatedAt: "2026-09-23T09:02:00Z",
    classification: {
      confidence: 0.91,
      rationale: "Falla acotada a un módulo tras despliegue; impacto alto en nómina.",
    },
    suggestions: [
      {
        id: "sug-3",
        title: "Revisar logs del servicio de reportes",
        confidence: 0.82,
        steps: [
          "Consultar logs del microservicio reporting desde el último deploy.",
          "Validar permisos del job de exportación sobre el storage.",
          "Reprocesar cola de jobs fallidos si aplica.",
        ],
        sources: [
          { type: "kb", id: "kb-44", label: "KB-44 Troubleshooting ERP reportes" },
          { type: "ticket", id: "tkt-920", label: "#920 — Export CSV fallido" },
        ],
      },
    ],
    timeline: [
      {
        id: "ev-4",
        at: "2026-09-23T07:10:00Z",
        label: "Ticket creado",
      },
      {
        id: "ev-5",
        at: "2026-09-23T07:11:05Z",
        label: "Clasificado por IA",
        detail: "Software · P2 · confianza 91%",
      },
      {
        id: "ev-6",
        at: "2026-09-23T07:45:00Z",
        label: "En progreso",
        detail: "Diego Fernández investigando deploy",
      },
    ],
  },
  {
    id: "tkt-1040",
    number: 1040,
    title: "Solicitud de acceso a carpeta compartida Finanzas",
    description:
      "Necesito acceso de lectura a \\\\filesrv\\finanzas\\Q3 para el cierre contable. Mi gerente ya aprobó por correo.",
    status: "classified",
    priority: "P3",
    category: "access",
    teamId: "team-security",
    assignee: null,
    requester: "Laura Gómez",
    createdAt: "2026-09-22T16:40:00Z",
    updatedAt: "2026-09-22T16:41:20Z",
    classification: {
      confidence: 0.89,
      rationale: "Solicitud de acceso a recurso compartido; no hay outage.",
    },
    suggestions: [
      {
        id: "sug-4",
        title: "Alta en grupo AD Finanzas-RO",
        confidence: 0.9,
        steps: [
          "Verificar aprobación del gerente en el hilo adjunto.",
          "Agregar usuario al grupo AD Finanzas-RO.",
          "Solicitar al usuario cerrar sesión y volver a iniciar.",
        ],
        sources: [
          { type: "kb", id: "kb-03", label: "KB-03 Accesos a file shares" },
        ],
      },
    ],
    timeline: [
      {
        id: "ev-7",
        at: "2026-09-22T16:40:00Z",
        label: "Ticket creado",
      },
      {
        id: "ev-8",
        at: "2026-09-22T16:41:20Z",
        label: "Clasificado por IA",
        detail: "Acceso · P3 · confianza 89%",
      },
    ],
  },
  {
    id: "tkt-1039",
    number: 1039,
    title: "Impresora de piso 3 no imprime en color",
    description:
      "La impresora HP del piso 3 imprime solo en blanco y negro aunque se selecciona color. Tóner color al 60%.",
    status: "assigned",
    priority: "P4",
    category: "hardware",
    teamId: "team-helpdesk",
    assignee: "Pedro Sánchez",
    requester: "Sofía Díaz",
    createdAt: "2026-09-22T14:05:00Z",
    updatedAt: "2026-09-22T15:20:00Z",
    classification: {
      confidence: 0.86,
      rationale: "Incidente de hardware localizado, bajo impacto.",
    },
    suggestions: [
      {
        id: "sug-5",
        title: "Driver y cartucho color",
        confidence: 0.78,
        steps: [
          "Reinstalar driver PCL6 en el equipo del usuario.",
          "Ejecutar página de prueba de color desde el panel de la impresora.",
          "Limpiar cabezal / verificar sensor de cartucho.",
        ],
        sources: [
          { type: "ticket", id: "tkt-650", label: "#650 — Color HP piso 2" },
        ],
      },
    ],
    timeline: [
      {
        id: "ev-9",
        at: "2026-09-22T14:05:00Z",
        label: "Ticket creado",
      },
      {
        id: "ev-10",
        at: "2026-09-22T14:06:10Z",
        label: "Clasificado y asignado",
        detail: "Helpdesk · P4",
      },
    ],
  },
  {
    id: "tkt-1038",
    number: 1038,
    title: "Correo no llega a dominio externo @cliente.com",
    description:
      "Los mensajes hacia @cliente.com quedan en cola outbound. Internos funcionan. Inició hace ~2 horas.",
    status: "new",
    priority: "P2",
    category: "email",
    teamId: "team-network",
    assignee: null,
    requester: "Comercial Norte",
    createdAt: "2026-09-23T10:05:00Z",
    updatedAt: "2026-09-23T10:05:00Z",
    classification: {
      confidence: 0.83,
      rationale: "Falla de entrega externa selectiva; impacto comercial alto.",
    },
    suggestions: [
      {
        id: "sug-6",
        title: "Revisar reputación y cola SMTP",
        confidence: 0.8,
        steps: [
          "Inspeccionar cola del relay SMTP outbound.",
          "Verificar SPF/DKIM/DMARC y blacklist del dominio.",
          "Probar envío de prueba con encabezados de diagnóstico.",
        ],
        sources: [
          { type: "kb", id: "kb-21", label: "KB-21 Entrega correo externo" },
        ],
      },
    ],
    timeline: [
      {
        id: "ev-11",
        at: "2026-09-23T10:05:00Z",
        label: "Ticket creado",
        detail: "Pendiente de clasificación completa",
      },
    ],
  },
  {
    id: "tkt-1037",
    number: 1037,
    title: "Alerta: intento de phishing reportado por 12 usuarios",
    description:
      "Correo con asunto 'Actualice su nómina' y enlace sospechoso. Varios usuarios hicieron clic. Necesitamos contención.",
    status: "in_progress",
    priority: "P1",
    category: "security",
    teamId: "team-security",
    assignee: "Elena Vargas",
    requester: "SOC",
    createdAt: "2026-09-23T09:30:00Z",
    updatedAt: "2026-09-23T09:55:00Z",
    classification: {
      confidence: 0.97,
      rationale: "Campaña de phishing con clics confirmados; prioridad crítica.",
    },
    suggestions: [
      {
        id: "sug-7",
        title: "Contención phishing",
        confidence: 0.93,
        steps: [
          "Bloquear URL/dominio en proxy y correo.",
          "Purgar mensajes de buzones con la campaña.",
          "Forzar reset de sesión en usuarios que hicieron clic.",
          "Abrir investigación forense si hay credenciales expuestas.",
        ],
        sources: [
          { type: "kb", id: "kb-90", label: "KB-90 Playbook phishing" },
          { type: "ticket", id: "tkt-701", label: "#701 — Phishing nómina Q1" },
        ],
      },
    ],
    timeline: [
      {
        id: "ev-12",
        at: "2026-09-23T09:30:00Z",
        label: "Ticket creado",
        detail: "Fuente: SOC",
      },
      {
        id: "ev-13",
        at: "2026-09-23T09:31:00Z",
        label: "Clasificado por IA",
        detail: "Seguridad · P1 · confianza 97%",
      },
      {
        id: "ev-14",
        at: "2026-09-23T09:40:00Z",
        label: "Contención iniciada",
      },
    ],
  },
  {
    id: "tkt-1035",
    number: 1035,
    title: "Laptop no enciende tras actualización de BIOS",
    description:
      "Equipo Dell Latitud 5540 queda en pantalla negra tras update de BIOS sugerido por el portal.",
    status: "resolved",
    priority: "P3",
    category: "hardware",
    teamId: "team-infra",
    assignee: "Julián Ortega",
    requester: "Miguel Torres",
    createdAt: "2026-09-21T11:00:00Z",
    updatedAt: "2026-09-22T17:30:00Z",
    classification: {
      confidence: 0.85,
      rationale: "Hardware endpoint post-BIOS; un solo usuario afectado.",
    },
    suggestions: [],
    timeline: [
      {
        id: "ev-15",
        at: "2026-09-21T11:00:00Z",
        label: "Ticket creado",
      },
      {
        id: "ev-16",
        at: "2026-09-22T17:30:00Z",
        label: "Resuelto",
        detail: "Rollback BIOS + imagen corporativa",
      },
    ],
  },
];

export function getTicketById(id: string): Ticket | undefined {
  return tickets.find((t) => t.id === id);
}

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getOpenTickets(): Ticket[] {
  return tickets.filter((t) => t.status !== "resolved" && t.status !== "closed");
}

export const categoryLabels: Record<Ticket["category"], string> = {
  network: "Redes",
  hardware: "Hardware",
  software: "Software",
  access: "Acceso",
  email: "Correo",
  security: "Seguridad",
  other: "Otro",
};

export const statusLabels: Record<Ticket["status"], string> = {
  new: "Nuevo",
  classified: "Clasificado",
  assigned: "Asignado",
  in_progress: "En progreso",
  resolved: "Resuelto",
  closed: "Cerrado",
};

export const priorityLabels: Record<Ticket["priority"], string> = {
  P1: "Crítica",
  P2: "Alta",
  P3: "Media",
  P4: "Baja",
};
