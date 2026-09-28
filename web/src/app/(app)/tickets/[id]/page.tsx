import Link from "next/link";
import { notFound } from "next/navigation";
import { AiSuggestionsPanel } from "@/components/tickets/ai-suggestions-panel";
import { CategoryBadge } from "@/components/tickets/category-badge";
import { PriorityBadge } from "@/components/tickets/priority-badge";
import { StatusBadge } from "@/components/tickets/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDateTimeLong } from "@/lib/format";
import { getTeamById, getTicketById } from "@/lib/mock-data";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = getTicketById(id);
  if (!ticket) notFound();

  const team = getTeamById(ticket.teamId);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/tickets">← Volver</Link>
        </Button>
        <span className="font-mono text-sm text-muted-foreground">
          #{ticket.number}
        </span>
        <PriorityBadge priority={ticket.priority} />
        <StatusBadge status={ticket.status} />
        <CategoryBadge category={ticket.category} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="border border-border bg-card p-5">
            <h2 className="text-lg font-semibold tracking-tight">
              {ticket.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
              {ticket.description}
            </p>

            <Separator className="my-5" />

            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Solicitante
                </dt>
                <dd className="mt-1 text-sm font-medium">{ticket.requester}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Equipo
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  {team?.name ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Asignado
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  {ticket.assignee ?? "Sin asignar"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Creado
                </dt>
                <dd className="mt-1 text-sm">
                  {formatDateTimeLong(ticket.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Actualizado
                </dt>
                <dd className="mt-1 text-sm">
                  {formatDateTimeLong(ticket.updatedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Confianza IA
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  {(ticket.classification.confidence * 100).toFixed(0)}%
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm">Tomar ticket</Button>
              <Button size="sm" variant="outline">
                Cambiar prioridad
              </Button>
              <Button size="sm" variant="outline">
                Reasignar equipo
              </Button>
              <Button size="sm" variant="secondary">
                Marcar resuelto
              </Button>
            </div>
          </section>

          <section className="border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Línea de tiempo</h3>
            <ol className="mt-4 space-y-4">
              {ticket.timeline.map((event, index) => (
                <li key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 size-2.5 rounded-full bg-steel" />
                    {index < ticket.timeline.length - 1 ? (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    ) : null}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium text-foreground">
                      {event.label}
                    </p>
                    {event.detail ? (
                      <p className="text-xs text-muted-foreground">
                        {event.detail}
                      </p>
                    ) : null}
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {formatDateTimeLong(event.at)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <AiSuggestionsPanel
          suggestions={ticket.suggestions}
          confidence={ticket.classification.confidence}
          rationale={ticket.classification.rationale}
        />
      </div>
    </>
  );
}
