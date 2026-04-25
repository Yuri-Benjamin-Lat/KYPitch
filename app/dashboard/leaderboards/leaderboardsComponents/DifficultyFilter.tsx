"use client";

type Props = {
  selected: string;
  onChange: (difficulty: string) => void;
};

const difficulties = [
  { label: "Easy",   value: "easy",   color: "var(--FH4)" },
  { label: "Medium", value: "medium", color: "var(--D4)"  },
  { label: "Hard",   value: "hard",   color: "var(--CH4)" },
  { label: "Master", value: "master", color: "var(--AH4)" },
];

export default function DifficultyFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-3 mb-8 flex-wrap justify-center">
      {difficulties.map((d) => (
        <button
          key={d.value}
          onClick={() => onChange(d.value)}
          style={{ "--diff-color": d.color } as React.CSSProperties}
          className={`px-5 py-2 rounded-full font-semibold text-sm lg:text-base transition-all duration-200 border-2 ${
            selected === d.value
              ? "bg-[var(--diff-color)] border-[var(--diff-color)] text-background shadow-[0_0_20px_var(--diff-color)]"
              : "border-foreground/30 hover:border-[var(--diff-color)] hover:text-[var(--diff-color)] hover:shadow-[0_0_12px_var(--diff-color)]"
          }`}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}