import type { OWASPCategory } from "@/types";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  category: OWASPCategory;
  selected: boolean;
  onToggle: () => void;
  index: number;
}

const severityColors = {
  critical: "bg-critical/20 text-critical border-critical/30",
  high: "bg-high/20 text-high border-high/30",
  medium: "bg-medium/20 text-glow border-glow/30",
};

export function CategoryCard({
  category,
  selected,
  onToggle,
  index,
}: CategoryCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`text-left w-full rounded-xl p-6 transition-all duration-300 cursor-pointer
        glass glass-hover animate-fade-in-up
        ${
          selected
            ? "border-glow/60 shadow-[0_0_20px_rgba(0,229,200,0.15)] animate-pulse-once"
            : "hover:-translate-y-1"
        }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-xs text-muted-foreground">
          {category.id}
        </span>
        <Badge
          variant="outline"
          className={`text-[10px] uppercase tracking-wider ${severityColors[category.severity]}`}
        >
          {category.severity}
        </Badge>
      </div>
      <h3 className="font-mono text-sm font-semibold text-white-core mb-2">
        {category.name}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
        {category.description}
      </p>
      {selected && (
        <div className="mt-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-glow" />
          <span className="text-[10px] text-glow font-mono uppercase tracking-wider">
            Selected
          </span>
        </div>
      )}
    </button>
  );
}
