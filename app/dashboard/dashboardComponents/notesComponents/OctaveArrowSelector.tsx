// notesComponents/OctaveArrowSelector.tsx
"use client";

import React from "react";

type Props = {
  octave: number;
  onDec: () => void;
  onInc: () => void;
  enabledOctavesCount: number; // used for conditional disabling visuals (keeps your existing logic)
  minOct: number;
  maxOct: number;
};

export default function OctaveArrowSelector({
  octave,
  onDec,
  onInc,
  enabledOctavesCount,
  minOct,
  maxOct,
}: Props) {
  return (
    <div
      className="flex items-center grid grid-cols-1 hover:bg-[var(--accent2)]
                border-2 rounded-lg px-4 py-2 gap-2 mb-4 
                md:border-3 md:px-6 md:py-3 md:gap-3 md:mb-8 
                lg:border-4 lg:rounded-2xl lg:px-8 lg:py-4 lg:gap-4 lg:mb-12 
                "
    >
      <div className="flex items-center bg-transparent rounded-md gap-6 md:gap-12 lg:gap-18">
        <button
          onClick={onDec}
          disabled={enabledOctavesCount === 0 ? octave <= minOct : false}
          aria-label="Decrease octave"
          className={`font-semibold transition inline-flex items-center justify-center
                            text-base md:text-3xl lg:text-4xl
                        ${enabledOctavesCount === 0 && octave <= minOct ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"}`}
          title="Previous octave"
        >
          ◀
        </button>

        <div
          className="font-normal text-base text-center flex items-center justify-center
                            text-xl
                            md:text-3xl
                            lg:text-4xl"
          aria-live="polite"
        >
          {octave}
        </div>

        <button
          onClick={onInc}
          disabled={enabledOctavesCount === 0 ? octave >= maxOct : false}
          aria-label="Increase octave"
          className={`font-semibold transition inline-flex items-center justify-center
                            text-base md:text-3xl lg:text-4xl
                        ${enabledOctavesCount === 0 && octave >= maxOct ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"}`}
          title="Next octave"
        >
          ▶
        </button>
      </div>

      <span
        className="text-center font-bold
                    text-sm 
                    md:text-xl 
                    lg:text-2xl
                    "
      >
        Octave
      </span>
    </div>
  );
}
