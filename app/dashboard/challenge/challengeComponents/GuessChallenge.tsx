// challenge/challengeComponents/GuessChallenge.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getFrequency } from "../../dashboardComponents/notesComponents/getFrequency";
import ScoreBoard from "./ScoreBoard";
import { loadHighScore, saveHighScore, Difficulty } from "./scoreStorage";

type Props = {
  playNote: (noteOrFreq: string | number, duration?: number) => void;
  selectedNote: string | null;
  clearSelected: () => void;
  octave?: number; // still accepted but not used for random generation
  allowedOctaves?: number[]; // list of allowed octaves (e.g. [0,1,2,3])
  onCorrect?: () => void; // optional callback when user answers correctly
  /**
   * Optional parent callback to receive the selection-enabled state.
   * Enabled when a target note exists and the round hasn't been submitted yet.
   */
  onSelectionEnabledChange?: (enabled: boolean) => void;
  /**
   * Difficulty key for per-difficulty highscore storage.
   * Defaults to "easy" — supports "easy" | "medium" | "hard" | "master".
   */
  difficulty?: Difficulty;
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
  onSelectionEnabledChange,
  difficulty = "easy",
}: Props) {
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastResultCorrect, setLastResultCorrect] = useState<boolean | null>(null);

  // scoring state
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const MIN_OCT = 0;
  const MAX_OCT = 8;

  const octaveChoices = useMemo(() => {
    if (allowedOctaves && allowedOctaves.length > 0) {
      return Array.from(new Set(allowedOctaves.filter((n) => n >= MIN_OCT && n <= MAX_OCT)));
    }
    return Array.from({ length: MAX_OCT - MIN_OCT + 1 }, (_, i) => i + MIN_OCT);
  }, [allowedOctaves]);

  // load persisted high score for this difficulty on mount / difficulty change
  useEffect(() => {
    const loaded = loadHighScore(difficulty);
    setHighScore(loaded);
  }, [difficulty]);

  // persist high score when it changes
  useEffect(() => {
    saveHighScore(difficulty, highScore);
  }, [difficulty, highScore]);

  useEffect(() => {
    if (!targetNote) return;
    if (!allowedOctaves || allowedOctaves.length === 0) return;

    const noteOct = extractOctaveFromLabel(targetNote);
    if (noteOct == null) return;

    const allowedSet = new Set(octaveChoices);
    if (!allowedSet.has(noteOct)) {
      setTargetNote(null);
      setSubmitted(false);
      setLastResultCorrect(null);
      clearSelected();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedOctaves, targetNote, octaveChoices]);

  // Notify parent about selection-enabled state:
  useEffect(() => {
    const enabled = !!targetNote && !submitted;
    if (typeof onSelectionEnabledChange === "function") {
      onSelectionEnabledChange(enabled);
    }
  }, [targetNote, submitted, onSelectionEnabledChange]);

  const pickRandomNote = (silent = false) => {
    if (targetNote) {
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
    // reset current score on manual reset as well
    setCurrentScore(0);
  };

  useEffect(() => {
    if (!targetNote) return;
    if (submitted) return;
    if (!selectedNote) return;

    // mark submitted so this runs only once per round
    setSubmitted(true);

    const correct = isSamePitch(selectedNote, targetNote);
    setLastResultCorrect(correct);

    // play the user's chosen guess (guarded)
    if (selectedNote) {
      playNote(selectedNote);
    }

    if (correct) {
      // increment streak/current score
      setCurrentScore((prev) => {
        const next = prev + 1;
        // bump highscore if needed
        setHighScore((hs) => (next > hs ? next : hs));
        return next;
      });
      if (typeof onCorrect === "function") onCorrect();
    } else {
      // incorrect -> reset current streak
      setCurrentScore(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote, targetNote]);

  const leftButtonState = (() => {
    if (!targetNote) {
      return { label: "Next", disabled: true, onClick: undefined as any };
    }

    if (!submitted) {
      return { label: "Next", disabled: true, onClick: undefined as any };
    }

    if (lastResultCorrect === true) {
      return {
        label: "Next",
        disabled: false,
        onClick: () => {
          setTargetNote(null);
          setSubmitted(false);
          setLastResultCorrect(null);
          clearSelected();
          setTimeout(() => pickRandomNote(true), 0);
        },
      };
    }

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
      {/* Scoreboard */}
      <ScoreBoard currentScore={currentScore} highScore={highScore} />

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
          className={`rounded-lg text-foreground font-semibold border-foreground ${leftButtonState.disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-70 cursor-pointer"} text-xs md:px-6 md:py-6 md:text-base lg:px-10 lg:py-10 lg:text-2xl`}
        >
          {leftButtonState.label}
        </button>

        {/* center display — clickable to replay the currently selected note */}
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
      </div>
    </div>
  );
}
