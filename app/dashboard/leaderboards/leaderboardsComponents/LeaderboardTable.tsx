type Entry = {
  name: string;
  score: number;
};

type Props = {
  entries: Entry[];
};

export default function LeaderboardTable({ entries }: Props) {
  // Sort highest → lowest
  const sorted = [...entries].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-xl">
      <div className="grid grid-cols-3 font-semibold border-b pb-2 mb-2">
        <span>Rank</span>
        <span>Name</span>
        <span className="text-right">Score</span>
      </div>

      {sorted.map((entry, idx) => (
        <div
          key={`${entry.name}-${idx}`}
          className="grid grid-cols-3 py-2 border-b border-foreground/10"
        >
          <span>{idx + 1}</span>
          <span>{entry.name}</span>
          <span className="text-right">{entry.score}</span>
        </div>
      ))}

      {sorted.length === 0 && (
        <p className="text-center opacity-60 mt-6">
          No scores yet.
        </p>
      )}
    </div>
  );
}
