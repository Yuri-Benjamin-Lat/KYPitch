"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // initialize + autoplay logic
  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio("/audio/ClairDeLune.mp3");
      a.loop = true;
      a.preload = "auto";
      a.volume = 0.2;
      audioRef.current = a;
    }

    const audio = audioRef.current;

    // Try autoplay immediately
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // if blocked, wait for first click anywhere
        const resume = () => {
          audio.play()
            .then(() => setPlaying(true))
            .catch((err) => console.warn("Playback blocked:", err));

          window.removeEventListener("click", resume);
        };
        window.addEventListener("click", resume, { once: true });
      });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // manual toggle
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (err) {
        console.warn("User gesture needed.", err);
      }
    }
  };

  return (
    <span
      onClick={toggle}
      className="select-none cursor-pointer
      text-xl
      md:text-4xl
      lg:text-4xl
      "
      title={playing ? "Pause music" : "Play music"}
    >
      {playing ? "❚❚" : "▶"}
    </span>
  );
}
