// dashboardComponents/notesComponents/Guess.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getFrequency } from "./getFrequency";

type Props = {
  playNote: (noteOrFreq: string | number, duration?: number) => void;
  selectedNote: string | null;
  clearSelected: () => void;
  octave?: number; // still accepted but not used for random generation
  allowedOctaves?: number[]; // list of allowed octaves (e.g. [0,1,2,3])
  /**
   * Optional: parent can provide this callback to receive the current "selection enabled" state.
   * Enabled when a target note exists and the round hasn't been submitted yet.
   */
  onSelectionEnabledChange?: (enabled: boolean) => void;
};

const BASES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function toLabel(base: string, octave: number) {
  return base.replace("#", "♯") + octave;
}

/** Compare by frequency instead of raw string. Tolerance in Hz. */
function isSamePitch(a: string | null, b: string | null, toleranceHz = 1.0) {
  const fa = getFrequency(a ?? null);
  const fb = getFrequency(b ?? null);
  if (fa == null || fb == null) return false;
  return Math.abs(fa - fb) <= toleranceHz;
}

/** Extract octave number from a label like "C#4" or "A3". Returns null if not parseable. */
function extractOctaveFromLabel(label: string | null): number | null {
  if (!label) return null;
  const m = label.match(/(-?\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? n : null;
}

export default function Guess({
  playNote,
  selectedNote,
  clearSelected,
  allowedOctaves,
  onSelectionEnabledChange,
}: Props) {
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastResultCorrect, setLastResultCorrect] = useState<boolean | null>(null);

  // RANGE FOR RANDOM PICKING: all octaves 0..8
  const MIN_OCT = 0;
  const MAX_OCT = 8;

  // derive octave choices: if allowedOctaves provided and non-empty, use that; otherwise fallback to full range
  const octaveChoices = useMemo(() => {
    if (allowedOctaves && allowedOctaves.length > 0) {
      // ensure values are within range and unique
      return Array.from(new Set(allowedOctaves.filter((n) => n >= MIN_OCT && n <= MAX_OCT)));
    }
    return Array.from({ length: MAX_OCT - MIN_OCT + 1 }, (_, i) => i + MIN_OCT);
  }, [allowedOctaves]);

  // -------------------------------
  // watch for allowedOctaves changes and invalidate targetNote
  // -------------------------------
  useEffect(() => {
    if (!targetNote) return; // nothing to validate
    // If octaveChoices is full range, no need to clear
    if (!allowedOctaves || allowedOctaves.length === 0) return;

    const noteOct = extractOctaveFromLabel(targetNote);
    if (noteOct == null) return;

    // If the note's octave is not among the allowed choices, clear the target
    const allowedSet = new Set(octaveChoices);
    if (!allowedSet.has(noteOct)) {
      // Reset exactly like handleReset
      setTargetNote(null);
      setSubmitted(false);
      setLastResultCorrect(null);
      clearSelected();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedOctaves, targetNote, octaveChoices]);

  // Notify parent about selection-enabled state:
  // selectionEnabled = true when there's a targetNote and it hasn't been submitted yet
  useEffect(() => {
    const enabled = !!targetNote && !submitted;
    if (typeof onSelectionEnabledChange === "function") {
      onSelectionEnabledChange(enabled);
    }
  }, [targetNote, submitted, onSelectionEnabledChange]);

  // -------------------------------

  const pickRandomNote = () => {
    if (targetNote) {
      // replay the same note if already chosen
      playNote(targetNote);
      return;
    }

    if (octaveChoices.length === 0) {
      // safety: fallback to 4
      const fallback = toLabel(BASES[Math.floor(Math.random() * BASES.length)], 4);
      setTargetNote(fallback);
      playNote(fallback);
      return;
    }

    // pick a random base and a random octave from the allowed choices
    const rndBase = BASES[Math.floor(Math.random() * BASES.length)];
    const rndOct = octaveChoices[Math.floor(Math.random() * octaveChoices.length)];
    const rnd = toLabel(rndBase, rndOct);

    setTargetNote(rnd);
    setSubmitted(false);
    setLastResultCorrect(null);

    // play the random note
    playNote(rnd);
  };

  const handleSubmit = () => {
    if (!targetNote) return;
    setSubmitted(true);

    const correct = isSamePitch(selectedNote, targetNote);
    setLastResultCorrect(correct);

    // --- CHANGE: play the user's chosen guess instead of the correct target note ---
    // The user should hear exactly what they selected for confirmation/feedback.
    if (!selectedNote) return;
    playNote(selectedNote);
  };

  function handleReset() {
    setTargetNote(null);
    setSubmitted(false);
    setLastResultCorrect(null);
    clearSelected();
  }

  return (
    <div className="w-full flex flex-col items-center mt-4 md:mt-8 lg:mt-12">
      <div className="font-normal mb-2">
        {submitted && lastResultCorrect !== null ? (
          lastResultCorrect ? (
            <span className="text-sm md:text-xl lg:text-2xl">Correct!</span>
          ) : (
            <span className="text-sm md:text-xl lg:text-2xl">Wrong — correct: {targetNote}</span>
          )
        ) : targetNote ? (
          <span className="text-muted-foreground text-sm md:text-xl lg:text-2xl">Ready — choose your answer then press Submit</span>
        ) : (
          <span className="text-muted-foreground text-sm md:text-xl lg:text-2xl">Click "?" to play a random note</span>
        )}
      </div>

      <div className="flex items-center justify-center rounded-full hover:bg-[var(--accent2)] gap-12 border-2 py-4 px-6 mt-2 md:gap-16 md:border-3 md:py-2 md:px-12 md:mt-6 lg:gap-20 lg:border-4 lg:px-20">
        <button onClick={handleReset} className="rounded-lg text-foreground font-semibold border-foreground hover:opacity-70 cursor-pointer text-xs md:px-6 md:py-6 md:text-base lg:px-10 lg:py-10 lg:text-2xl">
          Reset
        </button>

        <button onClick={pickRandomNote} className="rounded-full border-foreground text-foreground font-semibold transition flex items-center justify-center text-center hover:opacity-70 cursor-pointer text-xl md:px-6 md:py-6 md:text-2xl lg:px-10 lg:py-10 lg:text-4xl" aria-label="Play random note">
          {submitted && targetNote ? targetNote : "?"}
        </button>

        {/* center display — now clickable to replay the currently selected note */}
        <button
          onClick={() => {
            if (!selectedNote) return;
            playNote(selectedNote);
          }}
          disabled={!selectedNote}
          aria-label={selectedNote ? `Play ${selectedNote}` : "No note selected"}
          className={`rounded-lg border-foreground text-foreground font-semibold flex items-center justify-center text-center text-xl md:px-6 md:py-6 md:text-2xl lg:px-10 lg:py-10 lg:text-4xl ${
            !selectedNote ? "cursor-not-allowed" : "hover:opacity-80 cursor-pointer"
          }`}
          aria-live="polite"
        >
          {selectedNote ?? "-"}
        </button>

        <button onClick={handleSubmit} disabled={!targetNote} className={`rounded-md font-semibold text-xs md:px-6 md:py-6 md:text-base lg:px-10 lg:py-10 lg:text-2xl ${!targetNote ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"} border-foreground text-foreground`}>
          Submit
        </button>
      </div>
    </div>
  );
}
