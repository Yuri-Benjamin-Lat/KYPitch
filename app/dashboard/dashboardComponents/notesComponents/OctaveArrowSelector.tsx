"use client";

import React from "react";

type Props = {
  octave: number;
  onDec: () => void;
  onInc: () => void;
  enabledOctavesCount: number;
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
    <div className="flex flex-col items-center hover:bg-[var(--accent2)] border-2 rounded-lg px-6 py-2 gap-1 mb-4 md:border-3 md:px-10 md:py-3 md:gap-2 md:mb-8 lg:border-4 lg:rounded-2xl lg:px-14 lg:py-4 lg:gap-2 lg:mb-12">
      <div className="flex items-center gap-8 md:gap-16 lg:gap-20">
        <button
          onClick={onDec}
          disabled={enabledOctavesCount === 0 ? octave <= minOct : false}
          aria-label="Decrease octave"
          className={`font-semibold transition inline-flex items-center justify-center text-base md:text-3xl lg:text-4xl
            ${enabledOctavesCount === 0 && octave <= minOct ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"}`}
        >
          ◀
        </button>

        <span
          className="font-normal text-xl text-center md:text-3xl lg:text-4xl"
          aria-live="polite"
        >
          {octave}
        </span>

        <button
          onClick={onInc}
          disabled={enabledOctavesCount === 0 ? octave >= maxOct : false}
          aria-label="Increase octave"
          className={`font-semibold transition inline-flex items-center justify-center text-base md:text-3xl lg:text-4xl
            ${enabledOctavesCount === 0 && octave >= maxOct ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"}`}
        >
          ▶
        </button>
      </div>

      <span className="text-xs font-semibold opacity-50 md:text-base lg:text-lg">Viewing Octave</span>
    </div>
  );
}