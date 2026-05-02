"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowRight, FileText, Home, Boxes, Info, Scale, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export type SearchItem = {
  title: string;
  description?: string;
  /** Locale-relative path (e.g. "/stories/foo") — router prepends locale. */
  href: string;
  kind: "page" | "story";
};

const KIND_ICON: Record<SearchItem["kind"], React.ComponentType<{ className?: string }>> = {
  page: ArrowRight,
  story: FileText,
};

const PAGE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "/": Home,
  "/cadenza": Boxes,
  "/stories": FileText,
  "/about": Info,
  "/legal": Scale,
};

interface Props {
  storyItems: SearchItem[];
  variant?: "navbar" | "mobile";
  /** Server-detected from User-Agent to render the right keyboard hint
      (⌘ vs Ctrl) on first paint — no flicker on Mac. */
  isMac: boolean;
}

export default function SearchOverlay({
  storyItems,
  variant = "navbar",
  isMac,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations();

  const allItems = useMemo<SearchItem[]>(() => {
    const pageItems: SearchItem[] = [
      { title: t("nav.home"), href: "/", kind: "page" },
      { title: t("nav.cadenza"), description: t("cadenza.tagline"), href: "/cadenza", kind: "page" },
      { title: t("nav.stories"), description: t("stories.indexDescription"), href: "/stories", kind: "page" },
      { title: t("nav.about"), href: "/about", kind: "page" },
      { title: t("nav.legal"), href: "/legal", kind: "page" },
    ];
    return [...pageItems, ...storyItems];
  }, [storyItems, t]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((item) => {
      const haystack = `${item.title} ${item.description ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [allItems, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // CMD/CTRL+K opens.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  const navigateTo = useCallback(
    (item: SearchItem) => {
      setIsOpen(false);
      setQuery("");
      router.push(item.href);
    },
    [router],
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) navigateTo(item);
    }
  };

  const triggerLabel = t("nav.search");

  return (
    <>
      {variant === "navbar" ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={triggerLabel}
          // Icon + shortcut only — no "Search"/"검색" text, so the navbar
          // doesn't reflow when the user toggles locale.
          className="group flex items-center gap-1.5 text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors"
        >
          <Search className="w-4 h-4" aria-hidden />
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-[var(--essay-border)] px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-[var(--essay-muted)] opacity-70 group-hover:opacity-100">
            {isMac ? "⌘" : "Ctrl"}K
          </kbd>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center gap-2.5 rounded-lg border border-[var(--essay-border)] bg-[var(--essay-overlay)] px-3.5 py-3 text-[15px] text-[var(--essay-muted)] active:bg-[var(--essay-overlay-strong)] transition"
        >
          <Search className="w-[18px] h-[18px]" aria-hidden />
          <span>{triggerLabel}</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[14vh] px-3 sm:px-4"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--essay-bg) 70%, transparent)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              ref={overlayRef}
              className="w-full max-w-xl"
              initial={{ y: -16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
            >
              <div
                className="overflow-hidden rounded-xl border border-[var(--essay-border)] shadow-2xl"
                style={{ backgroundColor: "var(--essay-bg-elevated)" }}
              >
                {/* Input row */}
                <div className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 border-b border-[var(--essay-border)]">
                  <Search
                    className="w-4 h-4 text-[var(--essay-muted)] shrink-0"
                    aria-hidden
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    placeholder="Search pages, stories…"
                    // 16px on mobile to prevent iOS Safari's auto-zoom on
                    // focus (any input < 16px triggers a viewport zoom +
                    // forces the user to pinch back). Tablet/desktop drop
                    // back to 15px to match the rest of the overlay's type
                    // scale. Disable autocorrect/capitalize for a cleaner
                    // search experience.
                    className="flex-1 min-w-0 bg-transparent text-[var(--essay-text)] placeholder:text-[var(--essay-muted)] placeholder:opacity-60 text-[16px] sm:text-[15px] outline-none"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    enterKeyHint="search"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="shrink-0 text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition"
                      aria-label="Clear"
                    >
                      <X className="w-4 h-4" aria-hidden />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-flex items-center rounded border border-[var(--essay-border)] px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-[var(--essay-muted)] opacity-70 shrink-0">
                      ESC
                    </kbd>
                  )}
                </div>

                {/* Results — overflow-x: hidden eliminates the horizontal
                    scrollbar that the OS sometimes draws when content barely
                    overflows. `overscroll-contain` prevents body scroll
                    chaining when the user reaches the bottom of results. */}
                <ul
                  role="listbox"
                  className="max-h-[55vh] overflow-y-auto overflow-x-hidden overscroll-contain py-1"
                >
                  {results.length === 0 && (
                    <li className="px-4 py-8 text-sm text-[var(--essay-muted)] text-center">
                      No results.
                    </li>
                  )}
                  {results.map((item, i) => {
                    const Icon =
                      item.kind === "page"
                        ? PAGE_ICON[item.href] ?? KIND_ICON.page
                        : KIND_ICON.story;
                    const active = i === activeIndex;
                    return (
                      <li key={`${item.kind}-${item.href}`} className="px-1.5">
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => navigateTo(item)}
                          className={`group w-full flex items-center gap-3 px-2.5 sm:px-3 py-2.5 rounded-md text-left transition-colors ${
                            active
                              ? "bg-[var(--essay-overlay-strong)] text-[var(--essay-text)]"
                              : "text-[var(--essay-text)] opacity-80 hover:opacity-100"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              active
                                ? "text-[var(--essay-text)]"
                                : "text-[var(--essay-muted)]"
                            }`}
                            aria-hidden
                          />
                          <span className="flex-1 min-w-0">
                            <span className="block truncate text-sm font-medium">
                              {item.title}
                            </span>
                            {item.description && (
                              <span className="block truncate text-[12px] text-[var(--essay-muted)]">
                                {item.description}
                              </span>
                            )}
                          </span>
                          <span className="hidden sm:inline shrink-0 text-[10px] uppercase tracking-wider text-[var(--essay-muted)] opacity-70">
                            {item.kind === "page" ? "Page" : "Story"}
                          </span>
                          {active && (
                            <ArrowRight
                              className="shrink-0 w-3.5 h-3.5 text-[var(--essay-muted)]"
                              aria-hidden
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Footer hints — hidden on mobile (no physical keyboard,
                    keys aren't useful) and shown from sm: up. */}
                <div className="hidden sm:flex items-center justify-between px-4 py-2 border-t border-[var(--essay-border)] text-[11px] text-[var(--essay-muted)]">
                  <div className="flex items-center gap-3 opacity-80">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-[var(--essay-border)] px-1 py-0.5">
                        ↑
                      </kbd>
                      <kbd className="rounded border border-[var(--essay-border)] px-1 py-0.5">
                        ↓
                      </kbd>
                      navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-[var(--essay-border)] px-1 py-0.5">
                        ↵
                      </kbd>
                      open
                    </span>
                  </div>
                  <span className="flex items-center gap-1 opacity-80">
                    <kbd className="rounded border border-[var(--essay-border)] px-1 py-0.5">
                      ESC
                    </kbd>
                    close
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
