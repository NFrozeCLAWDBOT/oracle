import { owaspCategories } from "@/data/owasp-llm-top10";
import type { Assessment } from "@/types";
import { Progress } from "@/components/ui/progress";

interface CategorySidebarProps {
  assessment: Assessment;
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  onViewResults: () => void;
}

export function CategorySidebar({
  assessment,
  activeCategory,
  onSelectCategory,
  onViewResults,
}: CategorySidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-20 glass rounded-xl p-4 space-y-1">
        <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3 px-2">
          Categories
        </h3>
        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {assessment.selectedCategories.map((catId) => {
            const category = owaspCategories.find((c) => c.id === catId);
            if (!category) return null;
            const result = assessment.results.find(
              (r) => r.categoryId === catId
            );
            const totalItems = result
              ? result.testResults.length + result.mitigationResults.length
              : 0;
            const completedItems = result
              ? result.testResults.filter((t) => t.status !== "not_tested")
                  .length + result.mitigationResults.filter((m) => m.implemented).length
              : 0;
            const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

            return (
              <button
                key={catId}
                onClick={() => onSelectCategory(catId)}
                className={`text-left w-full min-w-[140px] lg:min-w-0 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                  activeCategory === catId
                    ? "bg-glow/10 border border-glow/30"
                    : "hover:bg-surface-mid"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {category.id}
                  </span>
                  <span className="text-xs text-white-core font-medium truncate">
                    {category.name}
                  </span>
                </div>
                <Progress value={progress} className="h-1" />
              </button>
            );
          })}
        </div>

        <div className="pt-3 mt-3 border-t border-deep-teal/50">
          <button
            onClick={onViewResults}
            className="w-full text-center text-xs font-mono text-glow hover:text-ice transition-colors py-2"
          >
            View Results
          </button>
        </div>
      </div>
    </aside>
  );
}
