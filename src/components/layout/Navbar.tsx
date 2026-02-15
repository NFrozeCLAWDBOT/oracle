import { useEffect, useState } from "react";
import type { ViewState } from "@/types";

interface NavbarProps {
  view: ViewState;
  onNewAssessment: () => void;
}

export function Navbar({ view, onNewAssessment }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-abyss/80 backdrop-blur-xl border-b border-deep-teal/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-lg font-bold tracking-wider text-glow">
          ORACLE
        </span>
        {view !== "hero" && (
          <button
            onClick={onNewAssessment}
            className="text-sm text-muted-foreground hover:text-glow transition-colors duration-200 font-mono"
          >
            New Assessment
          </button>
        )}
      </div>
    </nav>
  );
}
