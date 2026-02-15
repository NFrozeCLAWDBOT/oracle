interface ScoreIndicatorProps {
  score: number;
}

export function ScoreIndicator({ score }: ScoreIndicatorProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#0D3B3E"
            strokeWidth="8"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5C8" />
              <stop offset="100%" stopColor="#47F0E0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="font-mono text-4xl font-bold text-white">
              {score}
            </span>
            <span className="font-mono text-lg text-muted-foreground">%</span>
          </div>
        </div>
      </div>
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
        Overall Mitigation Score
      </p>
    </div>
  );
}
