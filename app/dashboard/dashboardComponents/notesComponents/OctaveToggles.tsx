// notesComponents/OctaveToggles.tsx
"use client";

import React from "react";

type Props = {
  allowedOctaves: boolean[]; // length 9 for 0..8
  onToggle: (index: number) => void;
};

export default function OctaveToggles({ allowedOctaves, onToggle }: Props) {
  return (
    <div className="w-fit flex items-center justify-center 
                px-4 mt-4 border-2 rounded-full
                md:mt-8 md:border-3
                lg:mt-12 lg:border-4
                ">
      <div
        className=" grid grid-cols-5
                    gap-2 p-2
                    md:gap-3 md:p-3 md:grid-cols-9
                    lg:gap-4 lg:p-4
                    "
      >
        {allowedOctaves.map((isOn, idx) => (
          <button
            key={idx}
            onClick={() => onToggle(idx)}
            className={`rounded-full border-foreground font-semibold transition aspect-square 
                                px-3 py-1 text-base
                                md:px-4 md:py-2 md:text-3xl
                                lg:px-5 lg:py-3 md:text-4xl
                                ${isOn ? "bg-[var(--accent)] text-background" : "text-foreground bg-transparent"}
                                `}
            aria-pressed={isOn}
            aria-label={`Toggle octave ${idx}`}
            title={`Toggle octave ${idx}`}
          >
            {idx}
          </button>
        ))}
      </div>
    </div>
  );
}
