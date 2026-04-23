import { Difficulty } from "../../challenge/challengeComponents/scoreStorage";

export const leaderboardData: Record<Difficulty, { name: string; score: number }[]> = {
  easy: [
    { name: "Yuri", score: 120 },
    { name: "Alex", score: 95 },
    { name: "Mina", score: 80 },
  ],
  medium: [
    { name: "Yuri", score: 90 },
    { name: "Ken", score: 70 },
  ],
  hard: [
    { name: "Luna", score: 60 },
  ],
  master: [
    { name: "Echo", score: 40 },
  ],
};
