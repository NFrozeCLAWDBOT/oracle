import type { OWASPCategory, CategoryResult } from "@/types";
import { useClipboard } from "@/hooks/useClipboard";
import { toast } from "sonner";

interface TestPromptsTabProps {
  category: OWASPCategory;
  result: CategoryResult;
  onUpdateTest: (
    promptId: string,
    status: "not_tested" | "pass" | "fail" | "partial",
    notes: string
  ) => void;
}

const statusOptions = [
  { value: "not_tested" as const, label: "Not Tested", color: "bg-muted-foreground/30 text-muted-foreground" },
  { value: "pass" as const, label: "Pass", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { value: "fail" as const, label: "Fail", color: "bg-critical/20 text-critical border-critical/30" },
  { value: "partial" as const, label: "Partial", color: "bg-high/20 text-high border-high/30" },
];

export function TestPromptsTab({
  category,
  result,
  onUpdateTest,
}: TestPromptsTabProps) {
  const { copiedId, copy } = useClipboard();

  const handleCopy = (text: string, id: string) => {
    copy(text, id);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <h4 className="font-mono text-sm font-semibold text-white-core">
        Test Prompts
      </h4>

      {category.testPrompts.map((prompt) => {
        const testResult = result.testResults.find(
          (t) => t.promptId === prompt.id
        );
        const currentStatus = testResult?.status ?? "not_tested";
        const currentNotes = testResult?.notes ?? "";

        return (
          <div key={prompt.id} className="glass rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[10px] text-glow/60 shrink-0 mt-1">
                {prompt.id}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      onUpdateTest(prompt.id, opt.value, currentNotes)
                    }
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition-all duration-200 ${
                      currentStatus === opt.value
                        ? opt.color + " border-current"
                        : "border-transparent text-muted-foreground/50 hover:text-muted-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <pre className="font-mono text-xs text-white-core bg-abyss/50 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {prompt.prompt}
              </pre>
              <button
                onClick={() => handleCopy(prompt.prompt, prompt.id)}
                className="absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-mono
                  bg-surface-mid/80 text-muted-foreground hover:text-glow
                  opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedId === prompt.id ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-mono text-glow/60 uppercase tracking-wider">
                  Expected Secure Behaviour
                </span>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {prompt.expectedBehaviour}
                </p>
              </div>
              {prompt.notes && (
                <div>
                  <span className="text-[10px] font-mono text-glow/60 uppercase tracking-wider">
                    Notes
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {prompt.notes}
                  </p>
                </div>
              )}
            </div>

            <textarea
              value={currentNotes}
              onChange={(e) =>
                onUpdateTest(prompt.id, currentStatus, e.target.value)
              }
              placeholder="Add your testing notes here..."
              className="w-full bg-abyss/30 border border-deep-teal/30 rounded-lg p-3
                text-xs text-white-core placeholder:text-muted-foreground/40
                focus:border-glow/40 focus:outline-none transition-colors resize-y min-h-[60px]"
              rows={2}
            />
          </div>
        );
      })}
    </div>
  );
}
