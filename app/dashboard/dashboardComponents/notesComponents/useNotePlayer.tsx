// notesComponents/useNotePlayer.ts
"use client";

import { useCallback } from "react";
import { loadSampler, getSampler, toToneNote } from "@/lib/tonePlayer";

export function useNotePlayer() {
  const playNote = useCallback((noteOrFreq: string | number, duration = 0.75): void => {
    void (async () => {
      const Tone = await import("tone");
      await Tone.start();
      const sampler = await loadSampler();
      sampler.triggerAttackRelease(toToneNote(noteOrFreq), duration);
    })().catch((err) => console.warn("Audio error:", err));
  }, []);

  const stopCurrentNote = useCallback((): void => {
    const sampler = getSampler();
    if (sampler) sampler.releaseAll();
  }, []);

  return { playNote, stopCurrentNote };
}