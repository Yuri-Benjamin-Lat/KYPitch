"use client";

import { useRouter } from "next/navigation";

import useClickOutsideToggle from "./contentsHooks/useClickOutsideToggle";

export default function Contents() {
    const router = useRouter();
    // Challenge hook
    const {
        open: showChallengeMenu,
        setOpen: setShowChallengeMenu,
        ref: challengeRef,
    } = useClickOutsideToggle(false);

    // Only control Challenge now
    function openChallenge() {
        setShowChallengeMenu(true);
    }

    return (
        <div className="grid 
            grid-cols-1 gap-8 p-8 pt-0
            md:grid-cols-2 
            lg:gap-12 lg:p-12 lg:pt-0
        ">

            {/* PRACTICE */}
            <div
                onClick={() => router.push("/dashboard/practice")}
                role="button"
                aria-label="Practice"
                tabIndex={0}
                onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push("/dashboard/practice");
                }}
                className="aspect-square bg-[var(--accent2)] hover:bg-[var(--accent)] flex items-center justify-center
                        border-2 rounded-xl text-4xl
                        md:border-3
                        lg:border-4 lg:text-6xl"
                >
                Practice
            </div>

            {/* CHALLENGE (toggles menu) */}
            {showChallengeMenu ? (
                <div
                    ref={challengeRef}
                    className=" aspect-square grid grid-cols-1 flex bg-[var(--accent2)] rounded-xl 
                        border-2 text-3xl p-2 gap-2
                        md:border-3 md:p-3 md:gap-3
                        lg:border-4 lg:text-5xl lg:p-4 lg:gap-4
                        ">
                    <button
                        type="button"
                        className="rounded-xl hover:bg-[var(--accent)] bg-background
                                    border-2 
                                    md:border-3
                                    lg:border-4
                                    "
                        onClick={() => router.push("/dashboard/challenge/easy")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") router.push("/dashboard/challenge/easy");
                        }}
                    >
                        Easy
                    </button>
                    <button
                        type="button"
                        className="rounded-xl hover:bg-[var(--accent)] bg-background
                                    border-2 
                                    md:border-3
                                    lg:border-4
                                    "
                        onClick={() => router.push("/dashboard/challenge/medium")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") router.push("/dashboard/challenge/medium");
                        }}
                    >
                        Medium
                    </button>
                    <button
                        type="button"
                        className="rounded-xl hover:bg-[var(--accent)] bg-background
                                    border-2
                                    md:border-3
                                    lg:border-4
                                    "
                        onClick={() => router.push("/dashboard/challenge/hard")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") router.push("/dashboard/challenge/hard");
                        }}
                    >
                        Hard
                    </button>
                    <button
                        type="button"
                        className="rounded-xl hover:bg-[var(--accent)] bg-background
                                    border-2
                                    md:border-3
                                    lg:border-4
                                    "
                        onClick={() => router.push("/dashboard/challenge/master")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") router.push("/dashboard/challenge/master");
                        }}
                    >
                        Master
                    </button>
                </div>
            ) : (
                <div
                    onClick={openChallenge}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openChallenge();
                        }
                    }}
                    className="aspect-square bg-[var(--accent2)] hover:bg-[var(--accent)] flex items-center justify-center cursor-pointer
                                    border-2 rounded-xl text-4xl
                                    md:border-3
                                    lg:border-4 lg:text-6xl
                            ">
                    Challenge
                </div>
            )}

            {/* LEADERBOARDS */}
            <div
                onClick={() => router.push("/dashboard/leaderboards")}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") router.push("/dashboard/leaderboards");
                }}            
                className="aspect-square bg-[var(--accent2)] hover:bg-[var(--accent)] flex items-center justify-center cursor-pointer
                        border-2 rounded-xl text-4xl
                        md:border-3
                        lg:border-4 lg:text-6xl"
                role="button"
                aria-label="Leaderboards"
                >
                Leaderboards
            </div>

            {/* LEARN MORE */}
            <div
                onClick={() => router.push("/dashboard/learnMore")}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") router.push("/dashboard/learnMore");
                }}            
                className="aspect-square bg-[var(--accent2)] hover:bg-[var(--accent)] flex items-center justify-center
                        border-2 rounded-xl text-4xl
                        md:border-3
                        lg:border-4 lg:text-6xl"
                role="button"
                aria-label="Learn More"
                >
                Learn More
            </div>
        </div>
    );
}