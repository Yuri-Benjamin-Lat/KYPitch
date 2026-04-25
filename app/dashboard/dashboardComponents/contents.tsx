"use client";

import { useRouter } from "next/navigation";
import useClickOutsideToggle from "./contentsHooks/useClickOutsideToggle";

const cards = [
    {
        label: "Practice",
        icon: "🎵",
        subtitle: "Free play, any note",
        color: "var(--A4)",
        route: "/dashboard/practice",
    },
    {
        label: "Leaderboards",
        icon: "🏆",
        subtitle: "See how you rank",
        color: "var(--FH4)",
        route: "/dashboard/leaderboards",
    },
    {
        label: "Learn",
        icon: "📖",
        subtitle: "Music theory & notes",
        color: "var(--DH4)",
        route: "/dashboard/learnMore",
    },
];

const difficultyButtons = [
    { label: "Easy",   subtitle: "1 Octave",   color: "var(--FH4)", route: "/dashboard/challenge/easy" },
    { label: "Medium", subtitle: "2 Octaves",  color: "var(--D4)",  route: "/dashboard/challenge/medium" },
    { label: "Hard",   subtitle: "7 Octaves",  color: "var(--CH4)", route: "/dashboard/challenge/hard" },
    { label: "Master", subtitle: "Full Range", color: "var(--AH4)", route: "/dashboard/challenge/master" },
];

export default function Contents() {
    const router = useRouter();
    const { open: showChallengeMenu, setOpen: setShowChallengeMenu, ref: challengeRef } = useClickOutsideToggle(false);

    return (
        <div className="grid grid-cols-1 gap-8 p-8 pt-0 md:grid-cols-2 lg:gap-12 lg:p-12 lg:pt-0">

            {/* CHALLENGE */}
            {showChallengeMenu ? (
                <div
                    ref={challengeRef}
                    className="aspect-square grid grid-cols-2 bg-background rounded-xl border-2 p-2 gap-2 md:border-3 md:p-3 md:gap-3 lg:border-4 lg:p-4 lg:gap-4"
                >
                    {difficultyButtons.map((d) => (
                        <button
                            key={d.label}
                            type="button"
                            style={{ "--card-color": d.color } as React.CSSProperties}
                            onClick={() => router.push(d.route)}
                            className="rounded-xl bg-background border-2 font-semibold transition-all duration-200 hover:text-background hover:bg-[var(--card-color)] hover:border-[var(--card-color)] hover:shadow-[0_0_24px_var(--card-color)] md:border-3 lg:border-4 flex flex-col items-center justify-center gap-1"
                        >
                            <span className="text-lg lg:text-2xl">{d.label}</span>
                            <span className="font-normal opacity-60 text-xs lg:text-sm">{d.subtitle}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <div
                    onClick={() => setShowChallengeMenu(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShowChallengeMenu(true); } }}
                    style={{ "--card-color": "var(--CH4)" } as React.CSSProperties}
                    className="aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer border-2 rounded-xl transition-all duration-200 hover:bg-[var(--card-color)] hover:border-[var(--card-color)] hover:text-background hover:shadow-[0_0_32px_var(--card-color)] md:border-3 lg:border-4 lg:gap-4"
                >
                    <span className="text-4xl lg:text-6xl">⚡</span>
                    <span className="font-bold text-2xl lg:text-4xl">Challenge</span>
                    <span className="font-normal opacity-60 text-sm lg:text-lg">Test your limits</span>
                </div>
            )}

            {/* OTHER CARDS */}
            {cards.map((card) => (
                <div
                    key={card.label}
                    onClick={() => router.push(card.route)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(card.route); }}
                    style={{ "--card-color": card.color } as React.CSSProperties}
                    className="aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer border-2 rounded-xl transition-all duration-200 hover:bg-[var(--card-color)] hover:border-[var(--card-color)] hover:text-background hover:shadow-[0_0_32px_var(--card-color)] md:border-3 lg:border-4 lg:gap-4"
                >
                    <span className="text-4xl lg:text-6xl">{card.icon}</span>
                    <span className="font-bold text-2xl lg:text-4xl">{card.label}</span>
                    <span className="font-normal opacity-60 text-sm lg:text-lg">{card.subtitle}</span>
                </div>
            ))}

        </div>
    );
}