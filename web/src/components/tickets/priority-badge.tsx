import { Badge } from "@/components/ui/badge";
import type { Priority } from "@/lib/types";
import { priorityLabels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const styles: Record<Priority, string> = {
  P1: "border-transparent bg-priority-p1 text-priority-p1-fg",
  P2: "border-transparent bg-priority-p2 text-priority-p2-fg",
  P3: "border-transparent bg-priority-p3 text-priority-p3-fg",
  P4: "border-transparent bg-priority-p4 text-priority-p4-fg",
};

export function PriorityBadge({
  priority,
  showLabel = true,
}: {
  priority: Priority;
  showLabel?: boolean;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-sm font-semibold tracking-wide", styles[priority])}
    >
      {priority}
      {showLabel ? (
        <span className="font-normal opacity-80">· {priorityLabels[priority]}</span>
      ) : null}
    </Badge>
  );
}
