"use client";

import { useEffect, useState } from "react";

/**
 * Inline theme toggle. The blocking script in [locale]/layout.tsx already
 * sets `data-essay-theme` on <html> before first paint, so this component
 * only needs to flip the value and persist the choice.
 *
 * Designed to live inside the navbar — small, theme-aware, no shadow.
 */
export default function EssayThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-essay-theme");
    const initialDark =
      attr === "dark" ||
      (attr === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(initialDark);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute(
      "data-essay-theme",
      isDark ? "dark" : "light",
    );
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      const value = next ? "dark" : "light";
      const bg = next ? "#0b0b0a" : "#faf7f2";
      try {
        localStorage.setItem("essay-theme", value);
        // Cookie is what the server reads on the next render, so it MUST be
        // updated atomically with the attribute. Without this, locale-change
        // navigations re-render the layout with the *old* cookie value and
        // the page flashes to the previous theme.
        document.cookie = `essay-theme=${value}; max-age=31536000; path=/; samesite=lax`;
        // Sync inline backgroundColor on <html> and <body> so the layout's
        // server-rendered hard-coded bg matches the new theme immediately
        // (otherwise the next navigation paints the *old* color for one
        // frame before the new server render commits).
        document.documentElement.style.backgroundColor = bg;
        document.body.style.backgroundColor = bg;
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Render a placeholder of the same shape pre-mount to avoid layout shift +
  // hydration mismatch (the icon depends on the resolved theme).
  if (!mounted) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--essay-muted)] hover:text-[var(--essay-text)] hover:bg-[var(--essay-overlay)] transition-colors ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
