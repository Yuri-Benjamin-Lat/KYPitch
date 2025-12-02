"use client";
import { useEffect, useState } from "react";

export default function Utilities() {
    const [isDark, setIsDark] = useState<boolean | null>(null);

    // helper to apply/remove class on <html>
    function applyTheme(dark: boolean) {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }

    // initialize from localStorage or system preference
    useEffect(() => {
        // check saved preference
        const saved = typeof window !== "undefined" ? localStorage.getItem("ky_theme") : null;

        if (saved === "dark") {
            setIsDark(true);
            applyTheme(true);
            return;
        }
        if (saved === "light") {
            setIsDark(false);
            applyTheme(false);
            return;
        }

        // no saved preference -> use system preference
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefersDark);
        applyTheme(prefersDark);
    }, []);

    // toggle and persist preference
    function toggle() {
        const next = !isDark;
        setIsDark(next);
        applyTheme(next);
        try {
            localStorage.setItem("ky_theme", next ? "dark" : "light");
        } catch {
            // ignore
        }
    }

    // while initializing, avoid flashing a wrong icon — render nothing until we know state
    if (isDark === null) return null;

    return (
        <span
            aria-pressed={isDark}
            onClick={toggle}
            className="select-none
                text-2xl
                md:text-5xl
                lg:text-5xl"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? "⏾" : "☀︎"}
        </span>

    );
}
