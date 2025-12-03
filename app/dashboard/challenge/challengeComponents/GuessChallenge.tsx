// File: app/dashboard/challenge/challengeComponents/GuessChallenge.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getFrequency } from "../../dashboardComponents/notesComponents/getFrequency";

type Props = {
  playNote: (noteOrFreq: string | number, duration?: number) => void;
  selectedNote: string | null;
  clearSelected: () => void;
  octave?: number; // still accepted but not used for random generation
  allowedOctaves?: number[]; // list of allowed octaves (e.g. [0,1,2,3])
  onCorrect?: () => void; // optional callback when user answers correctly
};

const BASES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function toLabel(base: string, octave: number) {
  return base.replace("#", "♯") + octave;
}

function isSamePitch(a: string | null, b: string | null, toleranceHz = 1.0) {
  const fa = getFrequency(a ?? null);
  const fb = getFrequency(b ?? null);
  if (fa == null || fb == null) return false;
  return Math.abs(fa - fb) <= toleranceHz;
}

function extractOctaveFromLabel(label: string | null): number | null {
  if (!label) return null;
  const m = label.match(/(-?\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? n : null;
}

export default function GuessChallenge({
  playNote,
  selectedNote,
  clearSelected,
  allowedOctaves,
  onCorrect,
}: Props) {
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastResultCorrect, setLastResultCorrect] = useState<boolean | null>(null);

  const MIN_OCT = 0;
  const MAX_OCT = 8;

  const octaveChoices = useMemo(() => {
    if (allowedOctaves && allowedOctaves.length > 0) {
      return Array.from(new Set(allowedOctaves.filter((n) => n >= MIN_OCT && n <= MAX_OCT)));
    }
    return Array.from({ length: MAX_OCT - MIN_OCT + 1 }, (_, i) => i + MIN_OCT);
  }, [allowedOctaves]);

  useEffect(() => {
    if (!targetNote) return;
    if (!allowedOctaves || allowedOctaves.length === 0) return;

    const noteOct = extractOctaveFromLabel(targetNote);
    if (noteOct == null) return;

    const allowedSet = new Set(octaveChoices);
    if (!allowedSet.has(noteOct)) {
      // invalidate if no longer allowed
      setTargetNote(null);
      setSubmitted(false);
      setLastResultCorrect(null);
      clearSelected();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedOctaves, targetNote, octaveChoices]);

  /**
   * pickRandomNote(silent = false)
   * - When silent === false: sets a new target and plays it (or replays existing target if already set)
   * - When silent === true: sets a new target silently (or does not replay existing target)
   */
  const pickRandomNote = (silent = false) => {
    if (targetNote) {
      // If there's already a chosen target, replay only when not silent
      if (!silent) playNote(targetNote);
      return;
    }

    if (octaveChoices.length === 0) {
      const fallback = toLabel(BASES[Math.floor(Math.random() * BASES.length)], 4);
      setTargetNote(fallback);
      setSubmitted(false);
      setLastResultCorrect(null);
      if (!silent) playNote(fallback);
      return;
    }

    const rndBase = BASES[Math.floor(Math.random() * BASES.length)];
    const rndOct = octaveChoices[Math.floor(Math.random() * octaveChoices.length)];
    const rnd = toLabel(rndBase, rndOct);

    setTargetNote(rnd);
    setSubmitted(false);
    setLastResultCorrect(null);

    if (!silent) playNote(rnd);
  };

  const handleReset = () => {
    setTargetNote(null);
    setSubmitted(false);
    setLastResultCorrect(null);
    clearSelected();
  };

  // Auto-submit behavior:
  // - When selectedNote becomes non-null while there's a targetNote and we haven't submitted yet,
  //   auto-validate the guess exactly once.
  useEffect(() => {
    if (!targetNote) return;
    if (submitted) return;
    if (!selectedNote) return;

    // mark submitted so this runs only once per round
    setSubmitted(true);

    const correct = isSamePitch(selectedNote, targetNote);
    setLastResultCorrect(correct);

    // play the correct note for confirmation
    playNote(targetNote);

    if (correct && typeof onCorrect === "function") onCorrect();
    // we intentionally do not clearSelected here; Next/Reset control clearing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote, targetNote]);

  // Left button behavior per rules:
  // - When there's a current random note and it's been answered correctly -> show "Next" enabled
  // - When there's a current random note and it's been answered incorrectly -> show "Reset" enabled
  // - In the beginning of a new random note (after pickRandomNote) the "Next" should be unclickable
  // - When no target is chosen (fresh) show "Next" but disabled (user must press center to get a random note)

  const leftButtonState = (() => {
    // returns { label, disabled, onClick }
    if (!targetNote) {
      return { label: "Next", disabled: true, onClick: undefined as any };
    }

    if (!submitted) {
      // note chosen but not yet answered (waiting for auto-submit)
      return { label: "Next", disabled: true, onClick: undefined as any };
    }

    // submitted === true
    if (lastResultCorrect === true) {
      return {
        label: "Next",
        disabled: false,
        onClick: () => {
          // advance to a new random note silently (Next should never play a sound)
          setTargetNote(null);
          setSubmitted(false);
          setLastResultCorrect(null);
          clearSelected();
          // small timeout to ensure state cleared before picking new note
          setTimeout(() => pickRandomNote(true), 0); // <-- silent
        },
      };
    }

    // submitted true but incorrect
    return {
      label: "Reset",
      disabled: false,
      onClick: () => {
        handleReset();
      },
    };
  })();

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
          <span className="text-muted-foreground text-sm md:text-xl lg:text-2xl">Ready — choose your answer</span>
        ) : (
          <span className="text-muted-foreground text-sm md:text-xl lg:text-2xl">Click "?" to play a random note</span>
        )}
      </div>

      <div className="flex items-center justify-center rounded-full hover:bg-[var(--accent2)] gap-12 border-2 py-4 px-6 mt-2 md:gap-16 md:border-3 md:py-2 md:px-12 md:mt-6 lg:gap-20 lg:border-4 lg:px-20">
        <button
          onClick={() => pickRandomNote(false)} // "?" plays the note (silent=false)
          className="rounded-full border-foreground text-foreground font-semibold transition flex items-center justify-center text-center hover:opacity-70 cursor-pointer text-xl md:px-6 md:py-6 md:text-2xl lg:px-10 lg:py-10 lg:text-4xl"
          aria-label="Play random note"
        >
          {submitted && targetNote ? targetNote : "?"}
        </button>

        <button
          onClick={leftButtonState.onClick}
          disabled={leftButtonState.disabled}
          className={`rounded-lg text-foreground font-semibold border-foreground ${
            leftButtonState.disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-70 cursor-pointer"
          } text-xs md:px-6 md:py-6 md:text-base lg:px-10 lg:py-10 lg:text-2xl`}
        >
          {leftButtonState.label}
        </button>

        <div className="rounded-lg border-foreground text-foreground font-semibold flex items-center justify-center text-center text-xl md:px-6 md:py-6 md:text-2xl lg:px-10 lg:py-10 lg:text-4xl" aria-live="polite">
          {selectedNote ?? "-"}
        </div>

        {/* Submit button removed — guesses are auto-submitted when the user picks them */}
      </div>
    </div>
  );
}
