"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryLabels, teams } from "@/lib/mock-data";
import type { Category } from "@/lib/types";

export default function NewTicketPage() {
  const router = useRouter();

  return (
    <form
      className="mx-auto max-w-2xl border border-border bg-card p-6"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/tickets/tkt-1042");
      }}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            required
            placeholder="Resuma el incidente en una línea"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            required
            rows={6}
            placeholder="Detalle síntomas, impacto, hora de inicio y pasos ya intentados…"
            className="bg-background"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Categoría sugerida (opcional)</Label>
            <Select defaultValue="other">
              <SelectTrigger className="w-full bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(categoryLabels) as Category[]).map((c) => (
                  <SelectItem key={c} value={c}>
                    {categoryLabels[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Equipo preferido (opcional)</Label>
            <Select>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Asignación automática" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="rounded-sm border border-border bg-slate-50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          Al enviar, el pipeline IA propondrá categoría, prioridad P1–P4, equipo
          destino y soluciones similares. Un agente podrá confirmar o corregir.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" type="button" asChild>
            <Link href="/tickets">Cancelar</Link>
          </Button>
          <Button type="submit">Crear y clasificar</Button>
        </div>
      </div>
    </form>
  );
}
