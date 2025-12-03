// notesComponents/PracticeNotes.tsx
"use client";

import React, { useMemo, useState } from "react";
import Guess from "../../dashboardComponents/notesComponents/Guess";
import NoteGrid from "../../dashboardComponents/notesComponents/NoteGrid";
import OctaveToggles from "../../dashboardComponents/notesComponents/OctaveToggles";
import OctaveArrowSelector from "../../dashboardComponents/notesComponents/OctaveArrowSelector";
import { useNotePlayer } from "../../dashboardComponents/notesComponents/useNotePlayer";

// NOTES defs (same CSS variable names you had)
const NOTES = [
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

export default function PracticeNotes() {
  const { playNote, stopCurrentNote } = useNotePlayer();

  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [octave, setOctave] = useState<number>(4);

  const MIN_OCT = 0;
  const MAX_OCT = 8;

  // allowed octaves state (0..8) — default all enabled
  const defaultAllowed = Array.from({ length: 9 }, () => true);
  const [allowedOctaves, setAllowedOctaves] = useState<boolean[]>(defaultAllowed);

  // toggle handler that prevents disabling the last-on octave and ensures visible octave stays valid
  const handleToggleOctave = (index: number) => {
    setAllowedOctaves((prev) => {
      const enabledCount = prev.filter(Boolean).length;
      // if the clicked is on and it's the only one, prevent turning off
      if (prev[index] && enabledCount === 1) {
        return prev;
      }
      const next = prev.slice();
      next[index] = !next[index];

      // if current octave was turned off, move to first enabled
      if (!next[octave]) {
        const firstEnabled = next.findIndex(Boolean);
        if (firstEnabled !== -1) {
          setOctave(firstEnabled);
        }
      }

      return next;
    });
  };

  const handlePlay = (base: string, oct: number) => {
    const label = base.replace("#", "♯") + oct;
    setSelectedNote(label);
    playNote(label, 1.5);
  };

  const clearSelected = () => {
    setSelectedNote(null);
    stopCurrentNote();
  };

  // derive enabled octave numbers array
  const enabledOctaveNumbers = useMemo(
    () => allowedOctaves.map((v, i) => (v ? i : -1)).filter((n) => n >= 0),
    [allowedOctaves]
  );

  // arrow handlers that cycle through enabled octaves (wrap)
  const decOctave = () => {
    if (enabledOctaveNumbers.length === 0) {
      setOctave((o) => Math.max(MIN_OCT, o - 1));
      return;
    }
    const idx = enabledOctaveNumbers.indexOf(octave);
    if (idx === -1) {
      setOctave(enabledOctaveNumbers[0]);
      return;
    }
    const prevIdx = (idx - 1 + enabledOctaveNumbers.length) % enabledOctaveNumbers.length;
    setOctave(enabledOctaveNumbers[prevIdx]);
  };

  const incOctave = () => {
    if (enabledOctaveNumbers.length === 0) {
      setOctave((o) => Math.min(MAX_OCT, o + 1));
      return;
    }
    const idx = enabledOctaveNumbers.indexOf(octave);
    if (idx === -1) {
      setOctave(enabledOctaveNumbers[0]);
      return;
    }
    const nextIdx = (idx + 1) % enabledOctaveNumbers.length;
    setOctave(enabledOctaveNumbers[nextIdx]);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Octave toggles */}
      <OctaveToggles allowedOctaves={allowedOctaves} onToggle={handleToggleOctave} />

      {/* Guess controls */}
      <Guess
        playNote={playNote}
        selectedNote={selectedNote}
        clearSelected={clearSelected}
        octave={octave}
        allowedOctaves={enabledOctaveNumbers}
      />

      {/* Note grid */}
      <NoteGrid octave={octave} onPlay={handlePlay} selectedNote={selectedNote} notes={NOTES} />

      {/* Arrow selector */}
      <OctaveArrowSelector
        octave={octave}
        onDec={decOctave}
        onInc={incOctave}
        enabledOctavesCount={enabledOctaveNumbers.length}
        minOct={MIN_OCT}
        maxOct={MAX_OCT}
      />
    </div>
  );
}
