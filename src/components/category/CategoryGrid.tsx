import { useState } from "react";
import { owaspCategories } from "@/data/owasp-llm-top10";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  onStartAssessment: (selectedCategories: string[]) => void;
}

export function CategoryGrid({ onStartAssessment }: CategoryGridProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleCategory = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === owaspCategories.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(owaspCategories.map((c) => c.id)));
    }
  };

  return (
    <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-white mb-3">
          Select Assessment Categories
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
          Choose which OWASP Top 10 for LLM Applications categories to evaluate.
          Each category includes attack examples, test prompts, and mitigation checklists.
        </p>
        <button
          onClick={selectAll}
          className="text-xs font-mono text-glow hover:text-ice transition-colors"
        >
          {selected.size === owaspCategories.length
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {owaspCategories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={selected.has(category.id)}
            onToggle={() => toggleCategory(category.id)}
            index={index}
          />
        ))}
      </div>

      {selected.size > 0 && (
        <div className="mt-10 text-center animate-fade-in-up">
          <button
            onClick={() => onStartAssessment(Array.from(selected))}
            className="px-8 py-3 rounded-lg font-mono font-semibold text-sm tracking-wide
              bg-gradient-to-r from-glow to-ice text-abyss
              hover:from-warm hover:to-aquamarine
              transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,200,0.3)]"
          >
            Start Assessment ({selected.size}{" "}
            {selected.size === 1 ? "category" : "categories"})
          </button>
        </div>
      )}
    </section>
  );
}
