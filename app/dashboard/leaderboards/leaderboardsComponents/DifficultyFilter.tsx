"use client";

type Props = {
  selected: string;
  onChange: (difficulty: string) => void;
};

const difficulties = ["easy", "medium", "hard", "master"];

export default function DifficultyFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      {difficulties.map((diff) => (
        <button
          key={diff}
          onClick={() => onChange(diff)}
          className={`px-4 py-2 rounded-full font-semibold transition
            ${selected === diff
              ? "bg-foreground text-background"
              : "border border-foreground text-foreground hover:bg-foreground/10"
            }`}
        >
          {diff.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
