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

// Dark mode context
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function PrototypeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved preference or system preference
    const saved = localStorage.getItem("essay-theme");
    if (saved) {
      setIsDark(saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }

    // Add prototype class to body for footer styling
    document.body.classList.add("prototype-page");
    return () => {
      document.body.classList.remove("prototype-page");
    };
  }, []);

  // Update body class when theme changes
  useEffect(() => {
    if (mounted) {
      if (isDark) {
        document.body.classList.add("prototype-dark");
      } else {
        document.body.classList.remove("prototype-dark");
      }
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("essay-theme", next ? "dark" : "light");
      return next;
    });
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`${inter.variable} ${newsreader.variable} prototype-layout`}
      >
        <div className="min-h-screen" />
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`${inter.variable} ${newsreader.variable} prototype-layout ${isDark ? "dark" : ""}`}
      >
        <style jsx global>{`
          .prototype-layout {
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

          .prototype-layout.dark {
            --essay-bg: #0a0a0a;
            --essay-text: #e5e5e5;
            --essay-muted: #a3a3a3;
            --essay-border: #262626;
            --essay-accent: #60a5fa;
            --essay-card: #171717;
            --essay-code-bg: rgba(255, 255, 255, 0.1);
          }

          .prototype-layout * {
            cursor: auto !important;
          }

          /* Footer styling for prototype page - targeting body class since footer is outside layout */
          body.prototype-page footer {
            background-color: #fafaf9 !important;
            border-color: #e5e5e5 !important;
            transition:
              background-color 0.3s ease,
              border-color 0.3s ease;
          }

          body.prototype-page footer * {
            transition: color 0.3s ease;
          }

          body.prototype-page footer p,
          body.prototype-page footer span {
            color: #6b6b6b !important;
          }

          body.prototype-page footer strong {
            color: #1a1a1a !important;
          }

          body.prototype-page footer a {
            color: #6b6b6b !important;
          }

          body.prototype-page footer a:hover {
            color: #1a1a1a !important;
          }

          /* Dark mode footer */
          body.prototype-page.prototype-dark footer {
            background-color: #0a0a0a !important;
            border-color: #262626 !important;
          }

          body.prototype-page.prototype-dark footer p,
          body.prototype-page.prototype-dark footer span {
            color: #a3a3a3 !important;
          }

          body.prototype-page.prototype-dark footer strong {
            color: #e5e5e5 !important;
          }

          body.prototype-page.prototype-dark footer a {
            color: #a3a3a3 !important;
          }

          body.prototype-page.prototype-dark footer a:hover {
            color: #e5e5e5 !important;
          }

          /* Navbar styling for prototype page - light mode */
          body.prototype-page header {
            background-color: rgba(250, 250, 249, 0.8) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border-bottom: 1px solid #e5e5e5;
            transition:
              background-color 0.3s ease,
              border-color 0.3s ease;
          }

          body.prototype-page header span,
          body.prototype-page header nav {
            color: #1a1a1a !important;
          }

          body.prototype-page header a {
            color: #1a1a1a !important;
          }

          body.prototype-page header a:hover {
            color: #3b82f6 !important;
          }

          body.prototype-page header button {
            color: #1a1a1a !important;
          }

          /* Dark mode navbar */
          body.prototype-page.prototype-dark header {
            background-color: rgba(10, 10, 10, 0.8) !important;
            border-bottom: 1px solid #262626;
          }

          body.prototype-page.prototype-dark header span,
          body.prototype-page.prototype-dark header nav {
            color: #e5e5e5 !important;
          }

          body.prototype-page.prototype-dark header a {
            color: #e5e5e5 !important;
          }

          body.prototype-page.prototype-dark header a:hover {
            color: #60a5fa !important;
          }

          body.prototype-page.prototype-dark header button {
            color: #e5e5e5 !important;
          }
        `}</style>

        {/* Theme Toggle Button - positioned below navbar */}
        <button
          onClick={toggleTheme}
          className="fixed top-20 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: isDark ? "var(--essay-card)" : "var(--essay-card)",
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
