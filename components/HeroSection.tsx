"use client";
import Link from "next/link";
import { useAuth, SignUpButton } from "@clerk/nextjs";
export default function HeroSection() {
    const { isSignedIn } = useAuth();
    return (
        <div className="w-full flex flex-col items-center text-center
            py-24 px-8
            md:py-36 md:px-12
            lg:py-44 lg:px-12"
        >
            <p className="font-semibold tracking-widest uppercase text-accent
                text-xs
                md:text-sm
                lg:text-sm"
            >
                Train Your Ear
            </p>
            <h1 className="font-bold leading-tight mt-4
                text-5xl
                md:text-7xl
                lg:text-8xl"
            >
                Know Your <span className="text-accent">Pitch</span>
            </h1>
            <p className="font-normal text-foreground max-w-xl opacity-70 mt-6
                text-base
                md:text-xl
                lg:text-2xl"
            >
                Play, listen, and identify musical notes. Train your ear through fun challenges and climb the leaderboards.
            </p>
            <div className="flex items-center gap-4 mt-10
                md:gap-6 md:mt-12"
            >
                <a
                    href="#demo"
                    className="font-semibold border-2 border-foreground hover:opacity-70 transition rounded-lg
                        text-sm px-6 py-3
                        md:text-lg md:px-8 md:py-4"
                >
                    Try the Demo
                </a>
                {isSignedIn ? (
                    <Link
                        href="/dashboard"
                        className="font-semibold bg-[var(--accent)] text-background hover:bg-[var(--accent2)] transition rounded-lg
                            text-sm px-6 py-3
                            md:text-lg md:px-8 md:py-4"
                    >
                        Go to Dashboard
                    </Link>
                ) : (
                    <SignUpButton mode="modal">
                        <button className="font-semibold bg-[var(--accent)] text-background hover:bg-[var(--accent2)] transition rounded-lg
                            text-sm px-6 py-3
                            md:text-lg md:px-8 md:py-4"
                        >
                            Get Started
                        </button>
                    </SignUpButton>
                )}
            </div>
        </div>
    );
}