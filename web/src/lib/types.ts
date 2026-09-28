export type TicketStatus =
  | "new"
  | "classified"
  | "assigned"
  | "in_progress"
  | "resolved"
  | "closed";

export type Priority = "P1" | "P2" | "P3" | "P4";

export type Category =
  | "network"
  | "hardware"
  | "software"
  | "access"
  | "email"
  | "security"
  | "other";

export type Team = {
  id: string;
  name: string;
  slug: string;
  memberCount: number;
  openTickets: number;
  description: string;
};

export type SolutionSuggestion = {
  id: string;
  title: string;
  steps: string[];
  confidence: number;
  sources: { type: "ticket" | "kb"; id: string; label: string }[];
};

export type TimelineEvent = {
  id: string;
  at: string;
  label: string;
  detail?: string;
};

export type Ticket = {
  id: string;
  number: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  category: Category;
  teamId: string;
  assignee: string | null;
  requester: string;
  createdAt: string;
  updatedAt: string;
  classification: {
    confidence: number;
    rationale: string;
  };
  suggestions: SolutionSuggestion[];
  timeline: TimelineEvent[];
};

export type TicketSummary = { 
  openTicketsCount: number;
  criticalTicketsCount: number;
  inProgressTicketsCount: number;
  resolvedTicketsCount: number;
  tickets: Ticket[];
}

export type Login = {
    email: string;
    password: string;
}

export type Token = {
    accessToken: string;
}
