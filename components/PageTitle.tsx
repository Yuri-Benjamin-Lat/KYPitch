"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface PageTitleProps {
  title: string;
  backHref?: string;        // optional explicit link
  useHistoryBack?: boolean; // if true, call router.back()
  showBack?: boolean;       // default true
  className?: string;       // extra wrapper classes
  children?: React.ReactNode;
}

export default function PageTitle({
  title,
  backHref = "/dashboard",
  useHistoryBack = false,
  showBack = true,
  className = "",
  children,
}: PageTitleProps) {
  const router = useRouter();

  function handleBack() {
    if (useHistoryBack) return router.back();
    return router.push(backHref);
  }

  return (
    <div
      className={`flex flex-col items-center relative
        py-4 px-4 md:py-8 md:px-8 lg:py-8 lg:px-8 ${className}`}
    >
      {showBack && (
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="absolute hover:opacity-70 transition select-none top-1/2 -translate-y-1/2
            text-xl left-4 md:text-4xl md:left-6 lg:text-5xl lg:left-8"
        >
          ⮜
        </button>
      )}

      <p className="text-center font-bold text-base md:text-3xl lg:text-4xl">
        {title}
      </p>

      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}
