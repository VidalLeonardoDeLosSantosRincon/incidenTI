"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const meta: Record<string, { title: string; description?: string }> = {
  "/": {
    title: "Dashboard",
    description: "Resumen operativo de incidentes TI",
  },
  "/tickets": {
    title: "Tickets",
    description: "Cola de incidentes con clasificación y prioridad",
  },
  "/tickets/new": {
    title: "Nuevo ticket",
    description: "El motor IA clasificará y asignará al crear",
  },
  "/teams": {
    title: "Equipos",
    description: "Equipos de resolución y carga actual",
  },
};

function resolveMeta(pathname: string) {
  if (meta[pathname]) return meta[pathname];
  if (pathname.startsWith("/tickets/")) {
    return {
      title: "Detalle del ticket",
      description: "Clasificación, asignación y sugerencias IA",
    };
  }
  return { title: "incidenTI" };
}

export function Topbar() {
  const pathname = usePathname();
  const { title, description } = resolveMeta(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-6">
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="truncate text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden w-56 md:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar tickets…"
            className="h-8 bg-background pl-8 text-sm"
          />
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Notificaciones">
          <Bell className="size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 px-1.5">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary text-[10px] text-primary-foreground">
                  AG
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">
                Ana García
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Agente · Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/login">Cerrar sesión</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
