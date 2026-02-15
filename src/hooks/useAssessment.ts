import { useState, useEffect, useCallback } from "react";
import type { Assessment } from "@/types";
import {
  loadAssessment,
  saveAssessment,
  createAssessment,
  calculateOverallScore,
  clearAssessment,
} from "@/store/assessmentStore";

export function useAssessment() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    const saved = loadAssessment();
    if (saved) setAssessment(saved);
  }, []);

  const startAssessment = useCallback((selectedCategories: string[]) => {
    const newAssessment = createAssessment(selectedCategories);
    setAssessment(newAssessment);
    return newAssessment;
  }, []);

  const updateTestResult = useCallback(
    (
      categoryId: string,
      promptId: string,
      status: "not_tested" | "pass" | "fail" | "partial",
      notes: string
    ) => {
      setAssessment((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, results: prev.results.map((r) => ({ ...r })) };
        const categoryResult = updated.results.find(
          (r) => r.categoryId === categoryId
        );
        if (!categoryResult) return prev;

        categoryResult.testResults = categoryResult.testResults.map((tr) =>
          tr.promptId === promptId ? { ...tr, status, notes } : tr
        );
        updated.overallScore = calculateOverallScore(updated);
        saveAssessment(updated);
        return updated;
      });
    },
    []
  );

  const updateMitigationResult = useCallback(
    (categoryId: string, mitigationId: string, implemented: boolean) => {
      setAssessment((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, results: prev.results.map((r) => ({ ...r })) };
        const categoryResult = updated.results.find(
          (r) => r.categoryId === categoryId
        );
        if (!categoryResult) return prev;

        categoryResult.mitigationResults = categoryResult.mitigationResults.map(
          (mr) =>
            mr.mitigationId === mitigationId ? { ...mr, implemented } : mr
        );
        updated.overallScore = calculateOverallScore(updated);
        saveAssessment(updated);
        return updated;
      });
    },
    []
  );

  const resetAssessment = useCallback(() => {
    clearAssessment();
    setAssessment(null);
  }, []);

  return {
    assessment,
    startAssessment,
    updateTestResult,
    updateMitigationResult,
    resetAssessment,
  };
}
