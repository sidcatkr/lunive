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
//
// All visual styles live in globals.css, keyed off html[data-essay-theme]
// which is set synchronously by the blocking <script> in app/layout.tsx.
// Styles apply BEFORE first paint — zero flash on any browser/device/iOS.
//
// This component only:
//   1. Reads theme from the pre-set attribute and syncs React state.
//   2. Updates html[data-essay-theme] + localStorage when user toggles.
//   3. Keeps data-stories on <body> for SPA navigations (the blocking script
//      handles it on hard reloads).

export default function StoriesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ── Initial mount ────────────────────────────────────────────────────────
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-essay-theme");
    const initialDark =
      attr === "dark" ||
      (attr === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(initialDark);
    setMounted(true);

    // Ensure data-stories on <html> for SPA navigations.
    document.documentElement.setAttribute("data-stories", "true");
    return () => {
      document.documentElement.removeAttribute("data-stories");
    };
  }, []);

  // ── Theme sync ──────────────────────────────────────────────────────────
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
      localStorage.setItem("essay-theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        suppressHydrationWarning
        className={`${inter.variable} ${newsreader.variable} stories-layout`}
      >
        {/* Theme toggle — rendered after mount only to avoid hydration mismatch */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="fixed top-20 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: "var(--essay-card)",
              border: "1px solid var(--essay-border)",
              boxShadow: isDark
                ? "0 2px 10px rgba(0,0,0,0.5)"
                : "0 2px 10px rgba(0,0,0,0.1)",
              transition:
                "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
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
        )}

        {children}
      </div>
    </ThemeContext.Provider>
  );
}
