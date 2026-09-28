import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";
import { categoryLabels } from "@/lib/mock-data";

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <Badge variant="secondary" className="rounded-sm font-medium">
      {categoryLabels[category]}
    </Badge>
  );
}
