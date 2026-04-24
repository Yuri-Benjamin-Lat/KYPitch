"use client";

import { useState } from "react";

import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";

import DifficultyFilter from "./leaderboardsComponents/DifficultyFilter";
import LeaderboardTable from "./leaderboardsComponents/LeaderboardTable";
import { leaderboardData } from "./leaderboardsComponents/leaderboardData";

import { Difficulty } from "../challenge/challengeComponents/scoreStorage";

export default function LeaderboardsPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />

        <PageTitle title="Leaderboards" backHref="/dashboard" />

        {/* Leaderboards content */}
        <div className="flex flex-col items-center px-4 mt-6">
          <DifficultyFilter
            selected={difficulty}
            onChange={(d) => setDifficulty(d as Difficulty)}
          />

          <LeaderboardTable entries={leaderboardData[difficulty]} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
