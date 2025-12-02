"use client";
import useClickOutsideToggle from "./contentsHooks/useClickOutsideToggle";

export default function Contents() {
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
                className="aspect-square bg-[var(--accent2)] hover:bg-[var(--accent)] flex items-center justify-center
                        border-2 rounded-xl text-4xl
                        md:border-3
                        lg:border-4 lg:text-6xl"
                role="button"
                aria-label="Practice"
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
                        onClick={() => console.log("Easy clicked")}
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
                        onClick={() => console.log("Medium clicked")}
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
                        onClick={() => console.log("Hard clicked")}
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
                        onClick={() => console.log("Master clicked")}
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