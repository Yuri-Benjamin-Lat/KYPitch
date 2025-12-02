"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reusable hook for toggling an "open" state and closing when clicking outside.
 * Returns: { open, setOpen, ref }
 */
export default function useClickOutsideToggle(defaultOpen = false) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  return { open, setOpen, ref };
}
