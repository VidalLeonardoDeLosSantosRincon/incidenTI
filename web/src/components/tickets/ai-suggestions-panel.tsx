import { Check, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SolutionSuggestion } from "@/lib/types";

export function AiSuggestionsPanel({
  suggestions,
  confidence,
  rationale,
}: {
  suggestions: SolutionSuggestion[];
  confidence: number;
  rationale: string;
}) {
  return (
    <section className="border border-border bg-card">
      <div className="flex items-start gap-3 border-b border-border bg-slate-50 px-4 py-3">
        <div className="mt-0.5 flex size-8 items-center justify-center rounded bg-steel text-steel-foreground">
          <Sparkles className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-foreground">
            Asistente IA
          </h2>
          <p className="text-xs text-muted-foreground">
            Clasificación · confianza {(confidence * 100).toFixed(0)}%
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
            {rationale}
          </p>
        </div>
      </div>

      <div className="divide-y divide-border">
        {suggestions.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted-foreground">
            No hay sugerencias para este ticket.
          </p>
        ) : (
          suggestions.map((s) => (
            <article key={s.id} className="px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Relevancia {(s.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-sm" aria-label="Útil">
                    <ThumbsUp className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" aria-label="No útil">
                    <ThumbsDown className="size-3.5" />
                  </Button>
                </div>
              </div>

              <ol className="mt-3 space-y-2">
                {s.steps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm bg-slate-100 text-[10px] font-semibold text-slate-600">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.sources.map((src) => (
                  <span
                    key={src.id}
                    className="rounded-sm border border-border bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600"
                  >
                    {src.label}
                  </span>
                ))}
              </div>

              <Button size="sm" className="mt-3 gap-1.5">
                <Check className="size-3.5" />
                Usar esta solución
              </Button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
