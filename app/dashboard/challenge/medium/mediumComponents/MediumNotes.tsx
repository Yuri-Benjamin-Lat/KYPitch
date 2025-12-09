// File: app/dashboard/challenge/medium/mediumComponents/MediumNotes.tsx
"use client";


import React, { useState } from "react";
import GuessChallenge from "../../challengeComponents/GuessChallenge";
import NoteGrid from "../../../dashboardComponents/notesComponents/NoteGrid";
import OctaveArrowSelector from "../../../dashboardComponents/notesComponents/OctaveArrowSelector";
import { useNotePlayer } from "../../../dashboardComponents/notesComponents/useNotePlayer";


// NOTES defs (used for grid rendering)
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


export default function MediumNotes() {
    const { playNote, stopCurrentNote } = useNotePlayer();


    // medium mode: allow octaves 3 and 4 (user can toggle between them)
    const [octave, setOctave] = useState<number>(4);
    const allowedOctaves = [3, 4];


    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const [selectionEnabled, setSelectionEnabled] = useState<boolean>(false);


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
            {/* Guess controls (allowed octaves 3 & 4). Pass difficulty="medium" for per-difficulty highscores */}
            <GuessChallenge
                playNote={playNote}
                selectedNote={selectedNote}
                clearSelected={clearSelected}
                allowedOctaves={allowedOctaves}
                onSelectionEnabledChange={(enabled) => setSelectionEnabled(Boolean(enabled))}
                difficulty="medium"
            />


            {/* Note grid bound to the currently selected octave */}
            <NoteGrid
                octave={octave}
                onPlay={handlePlay}
                selectedNote={selectedNote}
                notes={NOTES}
                selectionEnabled={selectionEnabled}
            />

            {/* Octave selector (only 3 and 4 are relevant for medium) */}
            <OctaveArrowSelector
                octave={octave}
                onDec={() => setOctave((o) => Math.max(3, o - 1))}
                onInc={() => setOctave((o) => Math.min(4, o + 1))}
                // pass 0 so the selector enforces min/max disabling visuals (keeps existing logic)
                enabledOctavesCount={0}
                minOct={3}
                maxOct={4}
            />
        </div>
    );
}