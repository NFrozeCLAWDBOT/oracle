export interface OWASPCategory {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium";
  description: string;
  attackExamples: AttackExample[];
  testPrompts: TestPrompt[];
  mitigations: Mitigation[];
}

export interface AttackExample {
  title: string;
  description: string;
  source: string;
}

export interface TestPrompt {
  id: string;
  category: string;
  prompt: string;
  expectedBehaviour: string;
  notes: string;
}

export interface Mitigation {
  id: string;
  description: string;
  implemented: boolean;
}

export interface Assessment {
  id: string;
  createdAt: string;
  updatedAt: string;
  selectedCategories: string[];
  results: CategoryResult[];
  overallScore: number;
}

export interface CategoryResult {
  categoryId: string;
  testResults: TestResult[];
  mitigationResults: MitigationResult[];
}

export interface TestResult {
  promptId: string;
  status: "not_tested" | "pass" | "fail" | "partial";
  notes: string;
}

export interface MitigationResult {
  mitigationId: string;
  implemented: boolean;
}

export type ViewState = "hero" | "category-select" | "assessment" | "results";
