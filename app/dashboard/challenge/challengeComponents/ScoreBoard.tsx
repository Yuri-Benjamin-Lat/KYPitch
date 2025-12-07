// app/dashboard/challenge/challengeComponents/ScoreBoard.tsx
"use client";

import React from "react";

type Props = {
  currentScore: number;
  highScore: number;
};

export default function ScoreBoard({ currentScore, highScore }: Props) {
  return (
    <div className="w-full flex items-center justify-center gap-6 mb-3 md:gap-12 md:mb-12 lg:gap-20 lg:mb-16">
      <div className="flex flex-col items-center">
        <span className="text-xs md:text-xl lg:text-2xl text-muted-foreground">Current Score</span>
        <span className="text-lg md:text-xl lg:text-2xl font-semibold">{currentScore}</span>
      </div>

      <div className="h-8 w-px bg-border/30" />

      <div className="flex flex-col items-center">
        <span className="text-xs md:text-xl lg:text-2xl text-muted-foreground">Highest Score</span>
        <span className="text-lg md:text-xl lg:text-2xl font-semibold">{highScore}</span>
      </div>
    </div>
  );
}
    