"use client";

import React, { useState } from "react";
import learnPages from "../../../../data/learnPages.json";

type Section =
  | { type: "text"; content: string }
  | { type: "list"; items: string[] };

type Page = {
  id: string;
  slug: string;
  title: string;
  lede: string;
  introParagraphs: string[];
  sections: Section[];
};

export default function LearnPagesComponent() {
  const pages: Page[] = (learnPages as unknown) as Page[];
  const [index, setIndex] = useState<number>(0);

  const page = pages[index];
  const progress = ((index + 1) / pages.length) * 100;

  return (
    <div className="flex gap-8 px-6 pb-12 lg:px-8">

      {/* Sidebar — desktop only */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-foreground/20 pr-6 pt-2">
        <p className="font-semibold text-xs uppercase tracking-widest text-accent mb-4">Topics</p>
        <nav className="flex flex-col gap-1">
          {pages.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                i === index
                  ? "bg-[var(--accent)] text-background font-semibold"
                  : "hover:bg-foreground/10 opacity-60 hover:opacity-100"
              }`}
            >
              {p.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-foreground/10 rounded-full mb-8">
          <div
            className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <article>
          <h1 className="font-bold text-2xl lg:text-4xl">{page.title}</h1>
          <p className="text-accent font-semibold text-lg lg:text-2xl mt-3">{page.lede}</p>

          <div className="mt-6 space-y-3 text-base lg:text-xl opacity-80">
            {page.introParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-base lg:text-xl">
            {page.sections.map((s, si) => {
              if (s.type === "text") {
                return <p key={si} className="leading-relaxed">{s.content}</p>;
              }
              if (s.type === "list") {
                return (
                  <ul key={si} className="list-disc pl-6 space-y-1">
                    {s.items.map((it, ii) => (
                      <li key={ii}>{it}</li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="px-5 py-2 rounded-lg border-2 font-semibold text-sm lg:text-base transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_16px_var(--accent)]"
          >
            ← Previous
          </button>

          <span className="text-sm font-semibold opacity-50">{index + 1} / {pages.length}</span>

          <button
            onClick={() => setIndex((i) => Math.min(pages.length - 1, i + 1))}
            disabled={index === pages.length - 1}
            className="px-5 py-2 rounded-lg border-2 font-semibold text-sm lg:text-base transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_16px_var(--accent)]"
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}