import { useState } from "react";
import type { Assessment } from "@/types";
import { owaspCategories } from "@/data/owasp-llm-top10";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategorySidebar } from "./CategorySidebar";
import { OverviewTab } from "./OverviewTab";
import { TestPromptsTab } from "./TestPromptsTab";
import { MitigationsTab } from "./MitigationsTab";

interface AssessmentViewProps {
  assessment: Assessment;
  onUpdateTest: (
    categoryId: string,
    promptId: string,
    status: "not_tested" | "pass" | "fail" | "partial",
    notes: string
  ) => void;
  onUpdateMitigation: (
    categoryId: string,
    mitigationId: string,
    implemented: boolean
  ) => void;
  onViewResults: () => void;
}

export function AssessmentView({
  assessment,
  onUpdateTest,
  onUpdateMitigation,
  onViewResults,
}: AssessmentViewProps) {
  const [activeCategory, setActiveCategory] = useState(
    assessment.selectedCategories[0]
  );

  const category = owaspCategories.find((c) => c.id === activeCategory);
  const result = assessment.results.find(
    (r) => r.categoryId === activeCategory
  );

  if (!category || !result) return null;

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <CategorySidebar
          assessment={assessment}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onViewResults={onViewResults}
        />

        <main className="flex-1 min-w-0">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-surface-dark border border-deep-teal/30">
              <TabsTrigger
                value="overview"
                className="font-mono text-xs data-[state=active]:bg-glow/10 data-[state=active]:text-glow"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="test-prompts"
                className="font-mono text-xs data-[state=active]:bg-glow/10 data-[state=active]:text-glow"
              >
                Test Prompts
              </TabsTrigger>
              <TabsTrigger
                value="mitigations"
                className="font-mono text-xs data-[state=active]:bg-glow/10 data-[state=active]:text-glow"
              >
                Mitigations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab category={category} />
            </TabsContent>

            <TabsContent value="test-prompts">
              <TestPromptsTab
                category={category}
                result={result}
                onUpdateTest={(promptId, status, notes) =>
                  onUpdateTest(activeCategory, promptId, status, notes)
                }
              />
            </TabsContent>

            <TabsContent value="mitigations">
              <MitigationsTab
                category={category}
                result={result}
                onUpdateMitigation={(mitigationId, implemented) =>
                  onUpdateMitigation(activeCategory, mitigationId, implemented)
                }
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
