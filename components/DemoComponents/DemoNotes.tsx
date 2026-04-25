"use client";

import { useCallback } from "react";
import { loadSampler, getSampler, toToneNote } from "@/lib/tonePlayer";

export function useNotePlayer() {
  const playNote = useCallback((note: string): void => {
    void (async () => {
      const Tone = await import("tone");
      await Tone.start();
      const sampler = await loadSampler();
      sampler.triggerAttackRelease(toToneNote(note), 2.0);
    })().catch((err) => console.warn("Audio error:", err));
  }, []);

  return { playNote };
}