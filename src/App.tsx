import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { AssessmentView } from "@/components/assessment/AssessmentView";
import { ResultsView } from "@/components/results/ResultsView";
import { useAssessment } from "@/hooks/useAssessment";
import type { ViewState } from "@/types";

function App() {
  const [view, setView] = useState<ViewState>("hero");
  const {
    assessment,
    startAssessment,
    updateTestResult,
    updateMitigationResult,
    resetAssessment,
  } = useAssessment();

  useEffect(() => {
    if (assessment && view === "hero") {
      setView("assessment");
    }
  }, [assessment, view]);

  const handleNewAssessment = () => {
    resetAssessment();
    setView("hero");
  };

  const handleStartAssessment = (selectedCategories: string[]) => {
    startAssessment(selectedCategories);
    setView("assessment");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-abyss text-foreground relative">
        {view !== "hero" && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-glow/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-ice/5 rounded-full blur-[100px]" />
            <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-warm/3 rounded-full blur-[80px]" />
          </div>
        )}

        <div className="relative z-10">
          <Navbar view={view} onNewAssessment={handleNewAssessment} />

          {view === "hero" && (
            <HeroSection
              onBeginAssessment={() => setView("category-select")}
            />
          )}

          {view === "category-select" && (
            <CategoryGrid onStartAssessment={handleStartAssessment} />
          )}

          {view === "assessment" && assessment && (
            <AssessmentView
              assessment={assessment}
              onUpdateTest={updateTestResult}
              onUpdateMitigation={updateMitigationResult}
              onViewResults={() => setView("results")}
            />
          )}

          {view === "results" && assessment && (
            <ResultsView
              assessment={assessment}
              onBackToAssessment={() => setView("assessment")}
              onNewAssessment={handleNewAssessment}
            />
          )}

          <Footer />
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0A0F12",
              border: "1px solid #0D3B3E",
              color: "#E8FFFC",
            },
          }}
        />
      </div>
    </TooltipProvider>
  );
}

export default App;
