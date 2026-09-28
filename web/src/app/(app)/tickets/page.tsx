"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CategoryBadge } from "@/components/tickets/category-badge";
import { PriorityBadge } from "@/components/tickets/priority-badge";
import { StatusBadge } from "@/components/tickets/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/format";
import {
  getTeamById,
  priorityLabels,
  statusLabels,
  teams,
  tickets,
} from "@/lib/mock-data";
import type { Priority, TicketStatus } from "@/lib/types";

export default function TicketsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [teamId, setTeamId] = useState<string>("all");

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        String(t.number).includes(q) ||
        t.requester.toLowerCase().includes(q);
      const matchesStatus = status === "all" || t.status === status;
      const matchesPriority = priority === "all" || t.priority === priority;
      const matchesTeam = teamId === "all" || t.teamId === teamId;
      return matchesQuery && matchesStatus && matchesPriority && matchesTeam;
    });
  }, [query, status, priority, teamId]);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Buscar
            </p>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ID, título o solicitante"
              className="bg-card"
            />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Estado
            </p>
            <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {(Object.keys(statusLabels) as TicketStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {statusLabels[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Prioridad
            </p>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v ?? "all")}
            >
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {(Object.keys(priorityLabels) as Priority[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p} · {priorityLabels[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Equipo
            </p>
            <Select value={teamId} onValueChange={(v) => setTeamId(v ?? "all")}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button asChild>
          <Link href="/tickets/new">Nuevo ticket</Link>
        </Button>
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
          {filtered.length} ticket{filtered.length === 1 ? "" : "s"}
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Equipo</TableHead>
              <TableHead>Asignado</TableHead>
              <TableHead className="text-right">Actualizado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((ticket) => {
              const team = getTeamById(ticket.teamId);
              return (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono text-xs">
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className="text-steel hover:underline"
                    >
                      #{ticket.number}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className="line-clamp-1 font-medium hover:text-steel"
                    >
                      {ticket.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {ticket.requester}
                    </p>
                  </TableCell>
                  <TableCell>
                    <CategoryBadge category={ticket.category} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} showLabel={false} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {team?.name ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {ticket.assignee ?? "Sin asignar"}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {formatDateTime(ticket.updatedAt)}
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No hay tickets con estos filtros.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
