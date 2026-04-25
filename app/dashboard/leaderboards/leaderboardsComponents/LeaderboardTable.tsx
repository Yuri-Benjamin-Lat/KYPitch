type Entry = {
  name: string;
  score: number;
};

type Props = {
  entries: Entry[];
};

const medals = ["🥇", "🥈", "🥉"];

const topColors = [
  "bg-[var(--FH4)]/10 border-[var(--FH4)]/30",
  "bg-foreground/5 border-foreground/20",
  "bg-[var(--DH4)]/10 border-[var(--DH4)]/30",
];

export default function LeaderboardTable({ entries }: Props) {
  const sorted = [...entries].sort((a, b) => b.score - a.score);

  if (sorted.length === 0) {
    return (
      <p className="text-center opacity-50 mt-12 text-lg">No scores yet.</p>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-[3rem_1fr_auto] gap-4 px-4 pb-3 border-b border-foreground/20 font-semibold text-sm uppercase tracking-widest opacity-50">
        <span>#</span>
        <span>Player</span>
        <span>Score</span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {sorted.map((entry, idx) => {
          const isTop3 = idx < 3;
          return (
            <div
              key={`${entry.name}-${idx}`}
              className={`grid grid-cols-[3rem_1fr_auto] gap-4 items-center px-4 py-3 rounded-xl border transition-all duration-150 ${
                isTop3 ? topColors[idx] : "border-transparent hover:bg-foreground/5"
              }`}
            >
              <span className="text-xl font-bold">
                {isTop3 ? medals[idx] : <span className="text-sm opacity-50">{idx + 1}</span>}
              </span>
              <span className={`font-semibold ${isTop3 ? "text-lg" : "text-base opacity-80"}`}>
                {entry.name}
              </span>
              <span className={`font-bold tabular-nums ${isTop3 ? "text-lg text-accent" : "text-base opacity-70"}`}>
                {entry.score.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}