// components/MusicPlayer.tsx
"use client";

import React from "react";
import { useAudio } from "../AudioProvider";

export default function MusicPlayer() {
  const { playing, toggle, ready } = useAudio();

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => void toggle()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          void toggle();
        }
      }}
      className="select-none cursor-pointer text-xl md:text-4xl lg:text-4xl"
      title={playing ? "Pause music" : ready ? "Play music" : "Loading... (click to enable)"}
      aria-pressed={playing}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? "❚❚" : "▶"}
    </span>
  );
}
