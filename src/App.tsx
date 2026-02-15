import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import type { ViewState } from "@/types";

function App() {
  const [view, setView] = useState<ViewState>("hero");

  const handleNewAssessment = () => {
    setView("hero");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-abyss text-foreground">
        <Navbar view={view} onNewAssessment={handleNewAssessment} />

        {view === "hero" && (
          <HeroSection onBeginAssessment={() => setView("category-select")} />
        )}

        {view === "category-select" && (
          <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <p className="text-muted-foreground text-center">
              Category selection loading...
            </p>
          </main>
        )}

        {view === "assessment" && (
          <main className="pt-20 pb-12">
            <p className="text-muted-foreground text-center">
              Assessment view loading...
            </p>
          </main>
        )}

        {view === "results" && (
          <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <p className="text-muted-foreground text-center">
              Results loading...
            </p>
          </main>
        )}

        <Footer />
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
