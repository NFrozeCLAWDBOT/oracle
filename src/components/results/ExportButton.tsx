import type { Assessment } from "@/types";
import { exportAssessmentJSON } from "@/store/assessmentStore";
import { toast } from "sonner";

interface ExportButtonProps {
  assessment: Assessment;
}

export function ExportButton({ assessment }: ExportButtonProps) {
  const handleExport = () => {
    exportAssessmentJSON(assessment);
    toast.success("Assessment exported as JSON");
  };

  return (
    <button
      onClick={handleExport}
      className="px-6 py-2.5 rounded-lg font-mono font-semibold text-xs tracking-wide
        bg-gradient-to-r from-glow to-ice text-abyss
        hover:from-warm hover:to-aquamarine
        transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,200,0.3)]"
    >
      Export JSON Report
    </button>
  );
}
