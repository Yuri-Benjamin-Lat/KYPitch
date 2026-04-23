"use client";

import LightDarkMode from "./utilitiesComponents/LightDarkMode";

export default function Utilities() {
    return (
        <div className="w-full flex justify-end
            px-8
            md:px-12
            lg:px-12"
        >
            <LightDarkMode />
        </div>
    );
}
