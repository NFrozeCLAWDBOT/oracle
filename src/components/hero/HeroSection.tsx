interface HeroSectionProps {
  onBeginAssessment: () => void;
}

export function HeroSection({ onBeginAssessment }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/oracle-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/60 to-transparent" />

      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="glass rounded-2xl p-10 md:p-14 max-w-2xl w-full text-center animate-fade-in-up glow-teal">
          <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-white mb-4">
            ORACLE
          </h1>
          <p className="text-lg md:text-xl text-mint/80 font-mono mb-2">
            Systematic LLM Security Assessment
          </p>
          <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto">
            Evaluate your LLM integrations against the OWASP Top 10 for LLM
            Applications 2025. Structured. Trackable. Actionable.
          </p>
          <button
            onClick={onBeginAssessment}
            className="px-8 py-3 rounded-lg font-mono font-semibold text-sm tracking-wide
              bg-gradient-to-r from-glow to-ice text-abyss
              hover:from-warm hover:to-aquamarine
              transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,200,0.3)]"
          >
            Begin Assessment
          </button>
        </div>
      </div>
    </section>
  );
}
