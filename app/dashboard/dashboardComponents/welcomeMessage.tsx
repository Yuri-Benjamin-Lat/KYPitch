"use client";
import { useUser } from "@clerk/nextjs";

export default function WelcomeMessage() {
    const { user, isLoaded } = useUser();
    const name = user?.firstName || user?.username || "there";
    return (
        <p className="text-center font-normal py-4 text-xl md:text-3xl md:py-8 lg:text-4xl lg:py-8">
            Hello,{" "}
            {!isLoaded
                ? <span className="inline-block w-24 h-6 md:h-8 bg-foreground/10 rounded animate-pulse align-middle" />
                : <span className="font-bold">{name}</span>
            }!
        </p>
    );
}