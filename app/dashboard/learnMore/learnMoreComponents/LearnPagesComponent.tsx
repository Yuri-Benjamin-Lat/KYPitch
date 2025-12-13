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

  function goPrev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setIndex((i) => Math.min(pages.length - 1, i + 1));
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <article>
        <h1 className="text-2xl font-semibold mb-2">{page.title}</h1>
        <p className="mb-4">{page.lede}</p>

        {page.introParagraphs.map((p, idx) => (
          <p key={idx} className="mb-2">
            {p}
          </p>
        ))}

        <div className="mt-4 space-y-4">
          {page.sections.map((s, si) => {
            if (s.type === "text") {
              return (
                <p key={si} className="leading-relaxed">
                  {s.content}
                </p>
              );
            }

            if (s.type === "list") {
              return (
                <ul key={si} className="list-disc pl-6">
                  {s.items.map((it, ii) => (
                    <li key={ii} className="mb-1">
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }

            return null;
          })}
        </div>
      </article>

      <footer className="mt-8 flex items-center justify-between">
        <div>
          <button
            onClick={goPrev}
            disabled={index === 0}
            className={`px-4 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Previous page"
          >
            Previous
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Page {index + 1} of {pages.length}
        </div>

        <div>
          <button
            onClick={goNext}
            disabled={index === pages.length - 1}
            className={`px-4 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
