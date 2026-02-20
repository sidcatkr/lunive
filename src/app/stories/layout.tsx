"use client";

import type { ReactNode } from "react";
import { Inter, Newsreader } from "next/font/google";
import { useEffect, useState, createContext, useContext } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

// ─── Theme context (shared with child client components) ──────────────────────

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ─── Layout ──────────────────────────────────────────────────────────────────

export default function StoriesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("essay-theme");
    if (saved) {
      setIsDark(saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }

    document.body.classList.add("stories-page");
    return () => document.body.classList.remove("stories-page");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.body.classList.add("stories-dark");
    } else {
      document.body.classList.remove("stories-dark");
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("essay-theme", next ? "dark" : "light");
      return next;
    });
  };

  if (!mounted) {
    return (
      <div
        className={`${inter.variable} ${newsreader.variable} stories-layout`}
      >
        <div className="min-h-screen" />
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`${inter.variable} ${newsreader.variable} stories-layout ${isDark ? "dark" : ""}`}
      >
        <style jsx global>{`
          /* ── CSS custom properties ─────────────────────────────────────── */
          .stories-layout {
            --essay-bg: #fafaf9;
            --essay-text: #1a1a1a;
            --essay-muted: #6b6b6b;
            --essay-border: #e5e5e5;
            --essay-accent: #3b82f6;
            --essay-card: #ffffff;
            --essay-code-bg: rgba(0, 0, 0, 0.05);
            background-color: var(--essay-bg);
            color: var(--essay-text);
            min-height: 100vh;
            transition:
              background-color 0.3s ease,
              color 0.3s ease;
          }

          .stories-layout.dark {
            --essay-bg: #0a0a0a;
            --essay-text: #e5e5e5;
            --essay-muted: #a3a3a3;
            --essay-border: #262626;
            --essay-accent: #60a5fa;
            --essay-card: #171717;
            --essay-code-bg: rgba(255, 255, 255, 0.1);
          }

          /* Reset cursor inside stories layout */
          .stories-layout * {
            cursor: auto !important;
          }

          /* ── Navbar ────────────────────────────────────────────────────── */
          body.stories-page header {
            background-color: rgba(250, 250, 249, 0.8) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border-bottom: 1px solid #e5e5e5;
            transition:
              background-color 0.3s ease,
              border-color 0.3s ease;
          }
          body.stories-page header span,
          body.stories-page header nav {
            color: #1a1a1a !important;
          }
          body.stories-page header a {
            color: #1a1a1a !important;
          }
          body.stories-page header a:hover {
            color: #3b82f6 !important;
          }
          body.stories-page header button {
            color: #1a1a1a !important;
          }

          body.stories-page.stories-dark header {
            background-color: rgba(10, 10, 10, 0.8) !important;
            border-bottom: 1px solid #262626;
          }
          body.stories-page.stories-dark header span,
          body.stories-page.stories-dark header nav {
            color: #e5e5e5 !important;
          }
          body.stories-page.stories-dark header a {
            color: #e5e5e5 !important;
          }
          body.stories-page.stories-dark header a:hover {
            color: #60a5fa !important;
          }
          body.stories-page.stories-dark header button {
            color: #e5e5e5 !important;
          }

          /* ── Footer ────────────────────────────────────────────────────── */
          body.stories-page footer {
            background-color: #fafaf9 !important;
            border-color: #e5e5e5 !important;
            transition:
              background-color 0.3s ease,
              border-color 0.3s ease;
          }
          body.stories-page footer p,
          body.stories-page footer span {
            color: #6b6b6b !important;
          }
          body.stories-page footer strong {
            color: #1a1a1a !important;
          }
          body.stories-page footer a {
            color: #6b6b6b !important;
          }
          body.stories-page footer a:hover {
            color: #1a1a1a !important;
          }

          body.stories-page.stories-dark footer {
            background-color: #0a0a0a !important;
            border-color: #262626 !important;
          }
          body.stories-page.stories-dark footer p,
          body.stories-page.stories-dark footer span {
            color: #a3a3a3 !important;
          }
          body.stories-page.stories-dark footer strong {
            color: #e5e5e5 !important;
          }
          body.stories-page.stories-dark footer a {
            color: #a3a3a3 !important;
          }
          body.stories-page.stories-dark footer a:hover {
            color: #e5e5e5 !important;
          }

          /* ── Prose styles (shared across all stories) ──────────────────── */
          .prose-essay {
            font-family: var(--font-newsreader), Georgia, serif;
            font-size: 1.125rem;
            line-height: 1.8;
          }

          .prose-essay p {
            margin-bottom: 1.5rem;
          }

          .prose-essay a {
            color: var(--essay-accent);
            text-decoration: underline;
            text-underline-offset: 2px;
          }

          .prose-essay a:hover {
            text-decoration-color: transparent;
          }

          .prose-essay blockquote {
            border-left: 3px solid var(--essay-border);
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: var(--essay-muted);
          }

          .prose-essay code {
            font-size: 0.875em;
            background: var(--essay-code-bg);
            padding: 0.2em 0.4em;
            border-radius: 4px;
            font-family: ui-monospace, monospace;
          }

          .prose-essay pre code {
            background: transparent;
            padding: 0;
          }

          .prose-essay ul,
          .prose-essay ol {
            margin: 1.5rem 0;
            padding-left: 1.5rem;
          }

          .prose-essay li {
            margin-bottom: 0.5rem;
          }

          /* Footnote list */
          .prose-essay .footnotes ol {
            list-style: decimal;
          }

          .prose-essay .footnotes li {
            font-size: 0.875rem;
            color: var(--essay-muted);
            font-family: var(--font-inter), system-ui, sans-serif;
          }

          .prose-essay .footnotes a {
            color: var(--essay-accent);
          }

          @media (max-width: 1024px) {
            .prose-essay {
              font-size: 1.0625rem;
            }
          }
        `}</style>

        {/* Dark mode toggle button */}
        <button
          onClick={toggleTheme}
          className="fixed top-20 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: "var(--essay-card)",
            border: "1px solid var(--essay-border)",
            boxShadow: isDark
              ? "0 2px 10px rgba(0,0,0,0.5)"
              : "0 2px 10px rgba(0,0,0,0.1)",
          }}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {children}
      </div>
    </ThemeContext.Provider>
  );
}
