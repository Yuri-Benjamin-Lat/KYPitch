"use client";

import { useCallback } from "react";
import { loadSampler, toToneNote } from "@/lib/tonePlayer";

export function useNotePlayer() {
  const playNote = useCallback((noteOrFreq: string | number, duration = 1.0): void => {
    void (async () => {
      const Tone = await import("tone");
      await Tone.start();
      const synth = await loadSampler();
      const note = typeof noteOrFreq === "number"
        ? noteOrFreq
        : toToneNote(noteOrFreq);
      synth.triggerAttackRelease(note, duration);
    })().catch((err) => console.warn("Audio error:", err));
  }, []);

  return { playNote };
}