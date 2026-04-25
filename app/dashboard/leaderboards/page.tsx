"use client";

import { useState, useEffect } from "react";

import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";

import DifficultyFilter from "./leaderboardsComponents/DifficultyFilter";
import LeaderboardTable from "./leaderboardsComponents/LeaderboardTable";

import { Difficulty } from "../challenge/challengeComponents/scoreStorage";

type Entry = { name: string; score: number };

export default function LeaderboardsPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/scores?difficulty=${difficulty}`)
      .then((r) => r.json())
      .then((data: { user_name: string; score: number }[]) => {
        setEntries(data.map((row) => ({ name: row.user_name, score: row.score })));
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [difficulty]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />

        <PageTitle title="Leaderboards" backHref="/dashboard" />

        <div className="flex flex-col items-center px-4 mt-6">
          <DifficultyFilter
            selected={difficulty}
            onChange={(d) => setDifficulty(d as Difficulty)}
          />

          {loading ? (
            <div className="w-full max-w-xl mt-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 rounded-md bg-foreground/10 animate-pulse" />
              ))}
            </div>
          ) : (
            <LeaderboardTable entries={entries} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}