"use client";

import LightDarkMode from "./UtilitiesComponents/LightDarkMode";
import MusicPlayer from "./UtilitiesComponents/MusicPlayer";

export default function Utilities() {
    return (
        <div
            className="w-full flex flex-col items-center 
            px-8 
            md:px-12 
            lg:px-12"
        >
            <div className="flex items-center justify-center hover:bg-[var(--accent2)]
            gap-8 border-2 rounded-full py-1 px-6
            md:gap-12 md:border-3 md:rounded-full md:py-2 md:px-12
            lg:gap-20 lg:border-4 lg:px-20">

                <div>
                    <LightDarkMode />
                </div>

                <div>
                    <MusicPlayer />
                </div>
            </div>
        </div>
    );
}
