// app/dashboard/challenge/easy/easyComponents/EasyNotes.tsx
"use client";

import React, { useState } from "react";
import GuessChallenge from "../../challengeComponents/GuessChallenge";
import NoteGrid from "../../../dashboardComponents/notesComponents/NoteGrid";
import { useNotePlayer } from "../../../dashboardComponents/notesComponents/useNotePlayer";

// NOTES defs (octave 4 only)
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

export default function EasyNotes() {
  const { playNote, stopCurrentNote } = useNotePlayer();

  // easy mode: fixed octave 4
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [selectionEnabled, setSelectionEnabled] = useState<boolean>(false);
  const OCTAVE = 4;

  const handlePlay = (base: string, oct: number) => {
    const label = base.replace("#", "♯") + oct;
    setSelectedNote(label);
    playNote(label, 1.5);
  };

  const clearSelected = () => {
    setSelectedNote(null);
    stopCurrentNote();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Guess controls (only octave 4 allowed) */}
      <GuessChallenge
        playNote={playNote}
        selectedNote={selectedNote}
        clearSelected={clearSelected}
        octave={OCTAVE}
        allowedOctaves={[OCTAVE]}
        onSelectionEnabledChange={(enabled) => {
          // keep local state in sync with the challenge component
          setSelectionEnabled(Boolean(enabled));
        }}
      />

      {/* Note grid for octave 4 */}
      <NoteGrid
        octave={OCTAVE}
        onPlay={handlePlay}
        selectedNote={selectedNote}
        notes={NOTES}
        selectionEnabled={selectionEnabled}
      />
    </div>
  );
}
