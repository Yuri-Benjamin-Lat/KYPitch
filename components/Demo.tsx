"use client";

import { useMemo } from "react";
import { useNotePlayer } from "./DemoComponents/DemoNotes";

export default function DemoNotes() {
    const notes = useMemo(() => [
        { label: "C4",   css: "--C4" },
        { label: "C♯4",  css: "--CH4" },
        { label: "D4",   css: "--D4" },
        { label: "D♯4",  css: "--DH4" },
        { label: "E4",   css: "--E4" },
        { label: "F4",   css: "--F4" },
        { label: "F♯4",  css: "--FH4" },
        { label: "G4",   css: "--G4" },
        { label: "G♯4",  css: "--GH4" },
        { label: "A4",   css: "--A4" },
        { label: "A♯4",  css: "--AH4" },
        { label: "B4",   css: "--B4" },
    ], []);

    const { playNote } = useNotePlayer();

    return (
        <div className="w-full flex flex-col items-center
            py-4 px-8
            md:py-8 md:px-12
            lg:py-6 lg:px-12"
        >
            {/* Grid of notes */}
            <div
                className="
                    grid grid-cols-4 gap-4
                    md:grid-cols-6 md:gap-6
                    lg:grid-cols-6 lg:gap-8"
            >
                {notes.map((note) => (
                    <button
                        key={note.label}
                        onClick={() => playNote(note.label)}
                        style={{
                            "--note-color": `var(${note.css})`,
                        } as React.CSSProperties}
                        className="
                            aspect-square rounded-lg border-2 border-foreground text-foreground font-semibold transition flex items-center justify-center text-center
                            px-4 py-4 border-2 text-xl
                            md:px-6 md:py-6 md:border-3 md:text-2xl
                            lg:px-10 lg:py-10 lg:border-4 lg:text-4xl
                            hover:text-background hover:bg-[var(--note-color)]"
                    >
                        {note.label}
                    </button>
                ))}
            </div>
        </div>
    );
}