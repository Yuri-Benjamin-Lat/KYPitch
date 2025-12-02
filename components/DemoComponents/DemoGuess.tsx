// components/DemoComponents/DemoGuess.tsx
"use client";

import React, { useState } from "react";

type Props = {
    playNote: (noteOrFreq: string | number, duration?: number) => void;
    selectedNote: string | null;
    clearSelected: () => void;
};

const NOTES = [
    "C4", "C♯4", "D4", "D♯4", "E4", "F4",
    "F♯4", "G4", "G♯4", "A4", "A♯4", "B4"
];

export default function DemoGuess({ playNote, selectedNote, clearSelected }: Props) {
    const [targetNote, setTargetNote] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [lastResultCorrect, setLastResultCorrect] = useState<boolean | null>(null);

    // First click picks a note, later clicks just replay it
    const pickRandomNote = () => {
        if (targetNote) {
            // Replay the same note if already chosen
            playNote(targetNote);
            return;
        }

        // Choose a new note only if none exists yet
        const rnd = NOTES[Math.floor(Math.random() * NOTES.length)];
        setTargetNote(rnd);
        setSubmitted(false);
        setLastResultCorrect(null);
        playNote(rnd);
    };

    const handleSubmit = () => {
        if (!targetNote) return;

        setSubmitted(true);
        const correct = selectedNote === targetNote;
        setLastResultCorrect(correct);

        // Play the correct note as confirmation
        playNote(targetNote);
    };

    const handleReset = () => {
        setTargetNote(null);
        setSubmitted(false);
        setLastResultCorrect(null);
        clearSelected();
    };

    return (
        <div className="w-full flex flex-col items-center 
            mt-4
            md:mt-8
            lg:mt-12
            ">

            {/* Feedback area */}
            <div className="font-normal">
                {submitted && lastResultCorrect !== null ? (
                    lastResultCorrect ? (
                        <span className="text-green-600
                        text-sm 
                        md:text-xl 
                        lg:text-2xl
                        ">
                            Correct!</span>
                    ) : (
                        <span className="text-red-600
                        text-sm 
                        md:text-xl 
                        lg:text-2xl
                        ">
                            Wrong — correct: {targetNote}</span>
                    )
                ) : targetNote ? (
                    <span className="text-muted-foreground
                    text-sm 
                    md:text-xl 
                    lg:text-2xl
                    ">
                        Ready — choose your answer then press Submit</span>
                ) : (
                    <span className="text-muted-foreground
                    text-sm 
                    md:text-xl 
                    lg:text-2xl
                    ">Click "?" to play a random note</span>
                )}
            </div>

            {/* Row: Reset | ? | Your Guess | Submit */}
            <div className="flex items-center justify-center rounded-full 
            gap-12 border-2 py-4 px-6 mt-2
            md:gap-12 md:border-3 md:py-2 md:px-12 md:mt-6
            lg:gap-20 lg:border-4 lg:px-20">

                {/* Reset button (left) */}
                <button
                    onClick={handleReset}
                    className="rounded-lg text-foreground font-semibold border-foreground hover:opacity-70
                    text-xs
                    md:px-6 md:py-6 md:text-base
                    lg:px-10 lg:py-10 lg:text-xl
                    ">
                    Reset
                </button>

                {/* "?" Random Note Button */}
                <button
                    onClick={pickRandomNote}
                    className="rounded-full border-foreground text-foreground font-semibold transition flex items-center justify-center text-center hover:opacity-70
                    text-xl
                    md:px-6 md:py-6 md:text-2xl 
                    lg:px-10 lg:py-10 lg:text-4xl
                    "
                    aria-label="Play random note"
                >
                    {submitted && targetNote ? targetNote : "?"}
                </button>

                {/* Selected Guess Display */}
                <div
                    className="rounded-lg border-foreground text-foreground font-semibold flex items-center justify-center text-center
                    text-xl
                    md:px-6 md:py-6 md:text-2xl
                    lg:px-10 lg:py-10 lg:text-4xl
                    "
                    aria-live="polite"
                >
                    {selectedNote ?? "-"}
                </div>

                {/* Submit Button (right) */}
                <button
                    onClick={handleSubmit}
                    disabled={!targetNote}
                    className={`rounded-md font-semibold 
                    text-xs
                    md:px-6 md:py-6 md:text-base
                    lg:px-10 lg:py-10 lg:text-xl
                    ${!targetNote ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"} border-foreground text-foreground
                    
                    `}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}