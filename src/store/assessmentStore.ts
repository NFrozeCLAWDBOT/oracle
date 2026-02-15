import type { Assessment, CategoryResult, TestResult, MitigationResult } from "@/types";
import { owaspCategories } from "@/data/owasp-llm-top10";

const STORAGE_KEY = "oracle-assessment";

export function loadAssessment(): Assessment | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as Assessment;
  } catch {
    return null;
  }
}

export function saveAssessment(assessment: Assessment): void {
  try {
    assessment.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assessment));
  } catch {
    // localStorage may be full or unavailable
  }
}

export function createAssessment(selectedCategories: string[]): Assessment {
  const results: CategoryResult[] = selectedCategories.map((categoryId) => {
    const category = owaspCategories.find((c) => c.id === categoryId);
    if (!category) throw new Error(`Category ${categoryId} not found`);

    const testResults: TestResult[] = category.testPrompts.map((tp) => ({
      promptId: tp.id,
      status: "not_tested" as const,
      notes: "",
    }));

    const mitigationResults: MitigationResult[] = category.mitigations.map(
      (m) => ({
        mitigationId: m.id,
        implemented: false,
      })
    );

    return { categoryId, testResults, mitigationResults };
  });

  const assessment: Assessment = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    selectedCategories,
    results,
    overallScore: 0,
  };

  saveAssessment(assessment);
  return assessment;
}

export function calculateOverallScore(assessment: Assessment): number {
  let totalMitigations = 0;
  let implementedMitigations = 0;

  for (const result of assessment.results) {
    for (const m of result.mitigationResults) {
      totalMitigations++;
      if (m.implemented) implementedMitigations++;
    }
  }

  if (totalMitigations === 0) return 0;
  return Math.round((implementedMitigations / totalMitigations) * 100);
}

export function clearAssessment(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportAssessmentJSON(assessment: Assessment): void {
  const data = JSON.stringify(assessment, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `oracle-assessment-${assessment.id.slice(0, 8)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
