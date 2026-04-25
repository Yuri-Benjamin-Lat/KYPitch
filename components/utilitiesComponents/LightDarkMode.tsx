"use client";
import { useEffect, useState } from "react";

export default function LightDarkMode() {
    const [isDark, setIsDark] = useState<boolean | null>(null);

    function applyTheme(dark: boolean) {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }

    useEffect(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("ky_theme") : null;

        if (saved === "dark") { setIsDark(true); applyTheme(true); return; }
        if (saved === "light") { setIsDark(false); applyTheme(false); return; }

        // no saved preference → default to dark
        setIsDark(true);
        applyTheme(true);
    }, []);

    function toggle() {
        const next = !isDark;
        setIsDark(next);
        applyTheme(next);
        try { localStorage.setItem("ky_theme", next ? "dark" : "light"); } catch { }
    }

    if (isDark === null) return null;

    return (
        <span
            aria-pressed={isDark}
            onClick={toggle}
            className="select-none cursor-pointer text-xl md:text-2xl lg:text-2xl"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? "⏾" : "☀︎"}
        </span>
    );
}