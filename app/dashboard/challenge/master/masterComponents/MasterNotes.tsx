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

export default function MasterNotes() {
    const { playNote, stopCurrentNote } = useNotePlayer();


    // master mode: allow octaves 0..8 (A0..A8)
    const [octave, setOctave] = useState<number>(4);
    const allowedOctaves = Array.from({ length: 9 }, (_, i) => i); // [0,1,2,3,4,5,6,7,8]


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
            {/* Guess controls (allowed octaves 0..8). Pass difficulty="master" for per-difficulty highscores */}
            <GuessChallenge
                playNote={playNote}
                selectedNote={selectedNote}
                clearSelected={clearSelected}
                allowedOctaves={allowedOctaves}
                onSelectionEnabledChange={(enabled) => setSelectionEnabled(Boolean(enabled))}
                difficulty="master"
            />


            {/* Note grid bound to the currently selected octave */}
            <NoteGrid
                octave={octave}
                onPlay={handlePlay}
                selectedNote={selectedNote}
                notes={NOTES}
                selectionEnabled={selectionEnabled}
            />

            {/* Octave selector (0..8) */}
            <OctaveArrowSelector
                octave={octave}
                onDec={() => setOctave((o) => Math.max(0, o - 1))}
                onInc={() => setOctave((o) => Math.min(8, o + 1))}
                enabledOctavesCount={0}
                minOct={0}
                maxOct={8}
            />
        </div>
    );
}