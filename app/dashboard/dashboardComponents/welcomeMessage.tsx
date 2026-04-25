"use client";

import { useUser } from "@clerk/nextjs";

export default function WelcomeMessage() {
    const { user } = useUser();
    const name = user?.firstName || user?.username || "there";

    return (
        <p className="text-center font-normal py-4 text-xl md:text-3xl md:py-8 lg:text-4xl lg:py-8">
            Hello, <span className="font-bold">{name}</span>!
        </p>
    );
}