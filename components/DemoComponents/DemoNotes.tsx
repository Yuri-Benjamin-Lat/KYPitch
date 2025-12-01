"use client";

import { useRef, useCallback } from "react";

export function useNotePlayer() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Keep track of the current note playing
  const currentOscRef = useRef<OscillatorNode | null>(null);
  const currentGainRef = useRef<GainNode | null>(null);

  const freqMap: Record<string, number> = {
    C4: 261.63,
    "C♯4": 277.18,
    "C#4": 277.18,
    D4: 293.66,
    "D♯4": 311.13,
    "D#4": 311.13,
    E4: 329.63,
    F4: 349.23,
    "F♯4": 369.99,
    "F#4": 369.99,
    G4: 392.0,
    "G♯4": 415.3,
    "G#4": 415.3,
    A4: 440.0,
    "A♯4": 466.16,
    "A#4": 466.16,
    B4: 493.88,
  };

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  // Stop any currently playing note
  const stopCurrentNote = () => {
    const ctx = audioCtxRef.current;
    const osc = currentOscRef.current;
    const gain = currentGainRef.current;

    if (!ctx || !osc || !gain) return;

    const now = ctx.currentTime;

    // Fade out quickly to avoid click
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.005);

    // Stop oscillator after fade
    osc.stop(now + 0.03);

    currentOscRef.current = null;
    currentGainRef.current = null;
  };

  const playNote = useCallback(
    (noteOrFreq: string | number, duration = 5) => {
      const ctx = getCtx();
      if (!ctx) return;

      const freq =
        typeof noteOrFreq === "number"
          ? noteOrFreq
          : freqMap[noteOrFreq];

      if (!freq) {
        console.warn("Unknown note:", noteOrFreq);
        return;
      }

      // Stop previously playing note
      stopCurrentNote();

      // Create new note
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

      // Save references so we can stop this note next time
      currentOscRef.current = osc;
      currentGainRef.current = gain;

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.05);
    },
    [getCtx]
  );

  return { playNote };
}
