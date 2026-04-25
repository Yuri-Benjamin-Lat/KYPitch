// app/dashboard/challenge/challengeComponents/scoreStorage.ts
// tiny helper to centralize localStorage access and key formatting
export type Difficulty = "easy" | "medium" | "hard" | "master";

const PREFIX = "challenge_highscore"; // base prefix

export function getHighScoreKey(difficulty: Difficulty) {
  return `${PREFIX}_${difficulty}`;
}

export function loadHighScore(difficulty: Difficulty): number {
  if (typeof window === "undefined" || !window.localStorage) return 0;
  try {
    const raw = window.localStorage.getItem(getHighScoreKey(difficulty));
    if (!raw) return 0;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(difficulty: Difficulty, value: number): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(getHighScoreKey(difficulty), String(Math.max(0, Math.floor(value))));
  } catch {
    // ignore storage errors
  }
}

export async function syncHighScore(difficulty: Difficulty, score: number): Promise<void> {
  if (score <= 0) return;
  try {
    await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty, score }),
    });
  } catch {
    // silently fail — localStorage still tracks the score locally
  }
}