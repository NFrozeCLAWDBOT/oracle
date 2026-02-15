import { owaspCategories } from "@/data/owasp-llm-top10";
import type { Assessment } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeatmapProps {
  assessment: Assessment;
}

function getColor(percentage: number): string {
  if (percentage === 0) return "bg-muted-foreground/10";
  if (percentage < 50) return "bg-critical/30";
  if (percentage < 80) return "bg-high/30";
  return "bg-green-500/30";
}

function getTextColor(percentage: number): string {
  if (percentage === 0) return "text-muted-foreground/50";
  if (percentage < 50) return "text-critical";
  if (percentage < 80) return "text-high";
  return "text-green-400";
}

export function Heatmap({ assessment }: HeatmapProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[500px]">
        <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 mb-2">
          <div />
          <span className="font-mono text-[10px] text-muted-foreground text-center uppercase tracking-wider">
            Tests
          </span>
          <span className="font-mono text-[10px] text-muted-foreground text-center uppercase tracking-wider">
            Mitigations
          </span>
          <span className="font-mono text-[10px] text-muted-foreground text-center uppercase tracking-wider">
            Overall
          </span>
        </div>

        {assessment.results.map((result) => {
          const category = owaspCategories.find(
            (c) => c.id === result.categoryId
          );
          if (!category) return null;

          const testsPassed = result.testResults.filter(
            (t) => t.status === "pass"
          ).length;
          const testsTotal = result.testResults.length;
          const testsPercent =
            testsTotal > 0 ? Math.round((testsPassed / testsTotal) * 100) : 0;

          const mitigationsImpl = result.mitigationResults.filter(
            (m) => m.implemented
          ).length;
          const mitigationsTotal = result.mitigationResults.length;
          const mitigationsPercent =
            mitigationsTotal > 0
              ? Math.round((mitigationsImpl / mitigationsTotal) * 100)
              : 0;

          const overallPercent = Math.round(
            (testsPercent + mitigationsPercent) / 2
          );

          return (
            <div
              key={result.categoryId}
              className="grid grid-cols-[1fr_100px_100px_100px] gap-2"
            >
              <div className="flex items-center gap-2 py-2">
                <span className="font-mono text-[10px] text-glow/60 shrink-0">
                  {category.id}
                </span>
                <span className="text-xs text-white-core truncate">
                  {category.name}
                </span>
              </div>

              {[
                {
                  label: `Tests: ${testsPassed}/${testsTotal}`,
                  pct: testsPercent,
                },
                {
                  label: `Mitigations: ${mitigationsImpl}/${mitigationsTotal}`,
                  pct: mitigationsPercent,
                },
                { label: `Overall: ${overallPercent}%`, pct: overallPercent },
              ].map((cell, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div
                      className={`rounded-lg flex items-center justify-center py-2 transition-colors ${getColor(cell.pct)}`}
                    >
                      <span
                        className={`font-mono text-xs font-semibold ${getTextColor(cell.pct)}`}
                      >
                        {cell.pct}%
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface-dark border-deep-teal text-white-core font-mono text-xs"
                  >
                    {category.name}: {cell.label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
