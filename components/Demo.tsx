"use client";

import { useMemo, useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { useNotePlayer } from "./demoComponents/DemoNotes";
import DemoGuess from "./demoComponents/DemoGuess";

export default function Demo() {
    const notes = useMemo(() => [
        { label: "C4", css: "--C4" }, { label: "C♯4", css: "--CH4" },
        { label: "D4", css: "--D4" }, { label: "D♯4", css: "--DH4" },
        { label: "E4", css: "--E4" }, { label: "F4", css: "--F4" },
        { label: "F♯4", css: "--FH4" }, { label: "G4", css: "--G4" },
        { label: "G♯4", css: "--GH4" }, { label: "A4", css: "--A4" },
        { label: "A♯4", css: "--AH4" }, { label: "B4", css: "--B4" },
    ], []);

    const { playNote } = useNotePlayer();
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    return (
        <div id="demo" className="w-full flex flex-col items-center py-4 px-8 md:py-8 md:px-12 lg:py-6 lg:px-12">
            <p className="text-center font-bold text-2xl md:text-4xl lg:text-5xl">Demo: Guess The Note</p>

            <DemoGuess playNote={playNote} selectedNote={selectedNote} clearSelected={() => setSelectedNote(null)} />

            <div className="grid grid-cols-4 gap-4 mt-4 md:grid-cols-6 md:gap-6 md:mt-8 lg:grid-cols-6 lg:gap-8 lg:mt-8">
                {notes.map((note) => (
                    <button
                        key={note.label}
                        onClick={() => { playNote(note.label); setSelectedNote(note.label); }}
                        style={{ "--note-color": `var(${note.css})` } as React.CSSProperties}
                        className={`aspect-square rounded-lg font-semibold transition-all duration-200 flex items-center justify-center text-center px-4 py-4 border-2 text-xl md:px-6 md:py-6 md:border-3 md:text-2xl lg:px-10 lg:py-10 lg:border-4 lg:text-4xl lg:rounded-2xl hover:scale-105 hover:text-background hover:bg-[var(--note-color)] hover:border-[var(--note-color)] hover:shadow-[0_0_24px_var(--note-color)] ${
                            selectedNote === note.label
                                ? "text-background bg-[var(--note-color)] border-[var(--note-color)] shadow-[0_0_24px_var(--note-color)]"
                                : "border-foreground text-foreground"
                        }`}
                        aria-pressed={selectedNote === note.label}
                    >
                        {note.label}
                    </button>
                ))}
            </div>

            <SignUpButton mode="modal">
                <button className="text-center font-bold hover:opacity-70 transition text-sm mt-8 md:text-xl md:mt-12 lg:text-2xl lg:mt-12">
                    <span className="text-accent">Sign Up</span> to get the most of KYPitch
                </button>
            </SignUpButton>
        </div>
    );
}