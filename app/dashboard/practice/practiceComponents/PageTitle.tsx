"use client";

import { useRouter } from "next/navigation";

export default function PageTitle() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center relative
            py-4 px-4
            md:py-6 md:px-8
            lg:py-8 lg:px-8
            ">

            {/* Arrow Back */}
            <button
                onClick={() => router.push("/dashboard")}
                aria-label="Go back"
                className="absolute hover:opacity-70 transition select-none top-1/2 -translate-y-1/2
                    text-xl left-4
                    md:text-4xl md:left-6
                    lg:text-5xl lg:left-8
                ">
                    ⮜
            </button>

            {/* Title */}
            <p className="text-center font-bold
                text-base
                md:text-3xl
                lg:text-4xl
                ">
                Practice Mode
            </p>

        </div>
    );
}
