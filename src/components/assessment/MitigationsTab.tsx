import type { OWASPCategory, CategoryResult } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

interface MitigationsTabProps {
  category: OWASPCategory;
  result: CategoryResult;
  onUpdateMitigation: (mitigationId: string, implemented: boolean) => void;
}

export function MitigationsTab({
  category,
  result,
  onUpdateMitigation,
}: MitigationsTabProps) {
  const implementedCount = result.mitigationResults.filter(
    (m) => m.implemented
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-mono text-sm font-semibold text-white-core">
          Mitigation Checklist
        </h4>
        <span className="text-xs font-mono text-muted-foreground">
          {implementedCount}/{result.mitigationResults.length} implemented
        </span>
      </div>

      <div className="space-y-3">
        {category.mitigations.map((mitigation) => {
          const mitigationResult = result.mitigationResults.find(
            (m) => m.mitigationId === mitigation.id
          );
          const implemented = mitigationResult?.implemented ?? false;

          return (
            <label
              key={mitigation.id}
              className={`flex items-start gap-4 glass rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                implemented
                  ? "border-green-500/30 bg-green-500/5"
                  : "hover:border-glow/30"
              }`}
            >
              <Checkbox
                checked={implemented}
                onCheckedChange={(checked) =>
                  onUpdateMitigation(mitigation.id, checked === true)
                }
                className="mt-0.5 border-deep-teal data-[state=checked]:bg-glow data-[state=checked]:border-glow"
              />
              <div className="flex-1">
                <span className="font-mono text-[10px] text-glow/60 block mb-1">
                  {mitigation.id}
                </span>
                <p
                  className={`text-sm leading-relaxed transition-colors ${
                    implemented
                      ? "text-green-400/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {mitigation.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
