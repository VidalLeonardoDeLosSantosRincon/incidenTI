"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  Users,
  Plus,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/tickets/new", label: "Nuevo ticket", icon: Plus },
  { href: "/teams", label: "Equipos", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex size-8 items-center justify-center rounded bg-sidebar-primary">
          <Shield className="size-4 text-sidebar-primary-foreground" />
        </div>
        <div className="leading-tight">
          <p className="font-serif text-base tracking-tight text-white">
            incidenTI
          </p>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Gestión de incidentes
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href === "/tickets"
                ? pathname === "/tickets" ||
                  (pathname.startsWith("/tickets/") &&
                    !pathname.startsWith("/tickets/new"))
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-slate-300 hover:bg-sidebar-accent/70 hover:text-white"
              )}
            >
              <item.icon className="size-4 shrink-0 opacity-80" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4 text-xs text-slate-400">
        Entorno demo · datos mock
      </div>
    </aside>
  );
}
