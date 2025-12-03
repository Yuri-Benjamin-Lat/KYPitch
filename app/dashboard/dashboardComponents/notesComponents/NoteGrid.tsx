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
  notes?: NoteDef[]; // optional override
};

export default function NoteGrid({ octave, onPlay, selectedNote, notes }: Props) {
  const used = notes ?? DEFAULT_NOTES;

  return (
    <div
      className="
                grid grid-cols-4 gap-4 my-6
                md:grid-cols-6 md:gap-6 md:my-10 
                lg:grid-cols-6 lg:gap-8 lg:my-10
                "
    >
      {used.map(({ base, css }) => {
        const label = toLabel(base, octave);
        return (
          <button
            key={label}
            onClick={() => onPlay(base, octave)}
            style={
              {
                ["--note-color" as any]: `var(${css})`,
              } as React.CSSProperties
            }
            className="
                                aspect-square rounded-lg border-foreground text-foreground font-semibold transition
                                flex items-center justify-center text-center
                                px-4 py-4 border-2 text-xl
                                md:px-6 md:py-6 md:border-3 md:text-2xl
                                lg:px-10 lg:py-10 lg:border-4 lg:text-4xl lg:rounded-2xl
                                hover:text-background hover:bg-[var(--note-color)]
                                focus:outline-none"
            aria-pressed={selectedNote === label}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
