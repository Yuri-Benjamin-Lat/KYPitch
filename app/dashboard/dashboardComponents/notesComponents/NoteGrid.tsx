// notesComponents/NoteGrid.tsx
"use client";

import React from "react";

export type NoteDef = { base: string; css: string };

const DEFAULT_NOTES: NoteDef[] = [
  { base: "C", css: "--C4" },
  { base: "C#", css: "--CH4" },
  { base: "D", css: "--D4" },
  { base: "D#", css: "--DH4" },
  { base: "E", css: "--E4" },
  { base: "F", css: "--F4" },
  { base: "F#", css: "--FH4" },
  { base: "G", css: "--G4" },
  { base: "G#", css: "--GH4" },
  { base: "A", css: "--A4" },
  { base: "A#", css: "--AH4" },
  { base: "B", css: "--B4" },
];

function toLabel(base: string, octave: number) {
  return base.replace("#", "♯") + octave;
}

type Props = {
  octave: number;
  onPlay: (base: string, octave: number) => void;
  selectedNote: string | null;
  notes?: NoteDef[];
  selectionEnabled?: boolean;
};

export default function NoteGrid({
  octave,
  onPlay,
  selectedNote,
  notes,
  selectionEnabled = true,
}: Props) {
  const used = notes ?? DEFAULT_NOTES;

  return (
    <div className="grid grid-cols-4 gap-4 my-6 md:grid-cols-6 md:gap-6 md:my-10 lg:grid-cols-6 lg:gap-8 lg:my-10">
      {used.map(({ base, css }) => {
        const label = toLabel(base, octave);
        const isSelected = selectedNote === label;
        const disabled = !selectionEnabled;

        return (
          <button
            key={label}
            onClick={() => {
              if (disabled) return;
              onPlay(base, octave);
            }}
            disabled={disabled}
            aria-disabled={disabled}
            aria-pressed={isSelected}
            style={{ ["--note-color" as any]: `var(${css})` } as React.CSSProperties}
            className={`
              aspect-square rounded-lg font-semibold transition-all duration-200
              flex items-center justify-center text-center
              px-4 py-4 border-2 text-xl
              md:px-6 md:py-6 md:border-3 md:text-2xl
              lg:px-10 lg:py-10 lg:border-4 lg:text-4xl lg:rounded-2xl
              focus:outline-none
              ${disabled
                ? "cursor-not-allowed border-foreground text-foreground"
                : isSelected
                  ? "text-background bg-[var(--note-color)] border-[var(--note-color)] shadow-[0_0_24px_var(--note-color)]"
                  : "border-foreground text-foreground hover:scale-105 hover:text-background hover:bg-[var(--note-color)] hover:border-[var(--note-color)] hover:shadow-[0_0_24px_var(--note-color)]"
              }
            `}
          >
            <span className={`transition-opacity ${disabled ? "opacity-40" : "opacity-100"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}