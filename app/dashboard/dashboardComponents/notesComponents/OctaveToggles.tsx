// notesComponents/OctaveToggles.tsx
"use client";

import React from "react";

type Props = {
  allowedOctaves: boolean[];
  onToggle: (index: number) => void;
};

export default function OctaveToggles({ allowedOctaves, onToggle }: Props) {
  return (
    <div className="flex flex-col items-center mt-4 md:mt-8 lg:mt-12">
      <div className="flex items-center gap-3 border-2 rounded-full px-4 md:border-3 lg:border-4">
        <span className="font-semibold text-sm opacity-50 shrink-0 md:text-base lg:text-lg">Octave</span>

        <div className="grid grid-cols-5 gap-2 p-2 md:gap-3 md:p-3 md:grid-cols-9 lg:gap-4 lg:p-4">
          {allowedOctaves.map((isOn, idx) => (
            <button
              key={idx}
              onClick={() => onToggle(idx)}
              className={`rounded-full font-semibold transition-all duration-150 aspect-square
                px-3 py-1 text-base
                md:px-4 md:py-2 md:text-3xl
                lg:px-5 lg:py-3 lg:text-4xl
                ${isOn ? "bg-[var(--accent)] text-background" : "text-foreground bg-transparent hover:opacity-70"}
              `}
              aria-pressed={isOn}
              aria-label={`Toggle octave ${idx}`}
            >
              {idx}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs opacity-40 mt-2 md:text-sm">tap to toggle octaves</p>
    </div>
  );
}