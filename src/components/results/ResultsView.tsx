import type { Assessment } from "@/types";
import { ScoreIndicator } from "./ScoreIndicator";
import { Heatmap } from "./Heatmap";
import { ExportButton } from "./ExportButton";

interface ResultsViewProps {
  assessment: Assessment;
  onBackToAssessment: () => void;
  onNewAssessment: () => void;
}

export function ResultsView({
  assessment,
  onBackToAssessment,
  onNewAssessment,
}: ResultsViewProps) {
  return (
    <section className="pt-24 pb-16 px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-white mb-2">
          Assessment Results
        </h2>
        <p className="text-sm text-muted-foreground">
          Risk matrix heatmap across evaluated OWASP LLM categories
        </p>
      </div>

      <div className="flex justify-center">
        <ScoreIndicator score={assessment.overallScore} />
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="font-mono text-sm font-semibold text-white-core mb-6">
          Risk Matrix Heatmap
        </h3>
        <Heatmap assessment={assessment} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <ExportButton assessment={assessment} />
        <button
          onClick={onBackToAssessment}
          className="px-6 py-2.5 rounded-lg font-mono text-xs tracking-wide
            border border-deep-teal text-muted-foreground
            hover:border-glow/40 hover:text-glow
            transition-all duration-200"
        >
          Back to Assessment
        </button>
        <button
          onClick={onNewAssessment}
          className="px-6 py-2.5 rounded-lg font-mono text-xs tracking-wide
            text-muted-foreground/60 hover:text-muted-foreground
            transition-colors duration-200"
        >
          New Assessment
        </button>
      </div>
    </section>
  );
}
