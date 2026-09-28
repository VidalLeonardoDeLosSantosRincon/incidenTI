import { Badge } from "@/components/ui/badge";
import type { TicketStatus } from "@/lib/types";
import { statusLabels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const styles: Record<TicketStatus, string> = {
  new: "border-slate-300 bg-white text-slate-700",
  classified: "border-sky-200 bg-sky-50 text-sky-800",
  assigned: "border-indigo-200 bg-indigo-50 text-indigo-800",
  in_progress: "border-amber-200 bg-amber-50 text-amber-900",
  resolved: "border-transparent bg-success text-success-fg",
  closed: "border-slate-200 bg-slate-100 text-slate-500",
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-sm font-medium", styles[status])}
    >
      {statusLabels[status]}
    </Badge>
  );
}
