// components/AudioProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

type AudioContextShape = {
  playing: boolean;
  ready: boolean;
  currentTime: number;
  duration: number | null;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  audio?: HTMLAudioElement | null;
};

const AudioContext = createContext<AudioContextShape | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio("/audio/ClairDeLune.mp3");
      a.loop = true;
      a.preload = "auto";
      a.volume = 0.2;
      audioRef.current = a;

      // event listeners to keep React state in sync
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      const onTime = () => setCurrentTime(a.currentTime);
      const onCanPlay = () => {
        setReady(true);
        setDuration(isFinite(a.duration) ? a.duration : null);
      };

      a.addEventListener("play", onPlay);
      a.addEventListener("pause", onPause);
      a.addEventListener("timeupdate", onTime);
      a.addEventListener("canplay", onCanPlay);

      // Attempt to autoplay — if blocked we rely on user gesture later.
      a.play().catch(() => {
        // autoplay blocked — that's fine, user gesture required
      });

      // don't null out audioRef on cleanup — we want the audio to persist while app is running
      return () => {
        a.removeEventListener("play", onPlay);
        a.removeEventListener("pause", onPause);
        a.removeEventListener("timeupdate", onTime);
        a.removeEventListener("canplay", onCanPlay);
        // NOTE: don't pause or null out `a` so audio persists across pages.
      };
    }
  }, []);

  const play = async () => {
    try {
      await audioRef.current?.play();
    } catch (err) {
      console.warn("play failed (user gesture required?)", err);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      pause();
    } else {
      await play();
    }
  };

  const value: AudioContextShape = {
    playing,
    ready,
    currentTime,
    duration,
    play,
    pause,
    toggle,
    audio: audioRef.current,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
