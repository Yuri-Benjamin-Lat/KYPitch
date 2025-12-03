// notesComponents/useNotePlayer.ts
"use client";

import { useCallback, useRef } from "react";
import { getFrequency } from "./getFrequency";

export function useNotePlayer() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentOscRef = useRef<OscillatorNode | null>(null);
  const currentGainRef = useRef<GainNode | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const stopCurrentNote = useCallback(() => {
    const ctx = audioCtxRef.current;
    const osc = currentOscRef.current;
    const gain = currentGainRef.current;
    if (!ctx || !osc || !gain) return;

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.005);

    try {
      osc.stop(now + 0.03);
    } catch {}

    currentOscRef.current = null;
    currentGainRef.current = null;
  }, []);

  const playNote = useCallback(
    (noteOrFreq: string | number, duration = 1.5) => {
      const ctx = getCtx();
      if (!ctx) return;

      const freq =
        typeof noteOrFreq === "number" ? noteOrFreq : getFrequency(noteOrFreq);

      if (!freq) {
        console.warn("Unknown note:", noteOrFreq);
        return;
      }

      stopCurrentNote();

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );

      osc.connect(gain).connect(ctx.destination);

      currentOscRef.current = osc;
      currentGainRef.current = gain;

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.05);
    },
    [getCtx, stopCurrentNote]
  );

  return { playNote, stopCurrentNote };
}
