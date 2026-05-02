"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import SearchOverlay, { type SearchItem } from "@/components/search-overlay";
import EssayThemeToggle from "@/components/stories/EssayThemeToggle";
import { springConfig } from "@/utils/spring-animations";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type NavLink = { href: string; en: string; ko: string };

// Labels are hard-coded per locale (instead of using `t(...)`) so each link
// can pre-render *both* translations stacked in the same grid cell. The cell
// sizes to whichever is wider — locale toggle therefore causes zero layout
// shift in the navbar. Pure opacity transition between languages.
const NAV_LINKS: NavLink[] = [
  { href: "/", en: "Home", ko: "홈" },
  { href: "/cadenza", en: "Cadenza", ko: "Cadenza" },
  { href: "/stories", en: "Stories", ko: "스토리" },
  { href: "/about", en: "About", ko: "소개" },
  { href: "/legal", en: "Legal", ko: "법적 고지" },
];

export default function Navbar({
  storyItems,
  isMac,
}: {
  storyItems: SearchItem[];
  isMac: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const currentLocale = useLocale() as Locale;
  const [, startTransition] = useTransition();
  // Optimistic locale: drives the bubble position so the toggle reacts
  // *instantly* on click, before next-intl's navigation roundtrip resolves.
  const [optimisticLocale, setOptimisticLocale] =
    useState<Locale>(currentLocale);
  useEffect(() => {
    setOptimisticLocale(currentLocale);
  }, [currentLocale]);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        rafId = 0;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Publish the live navbar height to a CSS variable so the mobile menu
  // panel can pin its top edge exactly to the navbar's bottom border —
  // no gap, no overlap. ResizeObserver handles font-load reflow and the
  // 1px border swap when scroll state flips.
  //
  // Also publish `--scrollbar-w` (the width of the scrollbar gutter
  // reserved by `scrollbar-gutter: stable`) so full-bleed sections like
  // <ExpandOnScroll> can extend all the way to the viewport's right edge,
  // not just the body's content edge.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty(
        "--navbar-h",
        `${el.getBoundingClientRect().height}px`,
      );
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty(
        "--scrollbar-w",
        `${Math.max(0, sbw)}px`,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === optimisticLocale) return;
    setOptimisticLocale(nextLocale);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  return (
    <header
      ref={headerRef}
      suppressHydrationWarning
      className={`fixed top-0 w-full z-50 py-3 ${
        isScrolled
          ? "border-b border-[var(--essay-border)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: isScrolled
          ? "color-mix(in srgb, var(--essay-bg) 80%, transparent)"
          : "transparent",
      }}
    >
      <div className="container mx-auto px-4 flex items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 text-[var(--essay-text)]"
        >
          <Image
            src="/web-app-manifest-192x192.png"
            alt="Lunive Logo"
            width={32}
            height={32}
            className="object-contain rounded-[6px]"
          />
          <span className="text-xl font-bold tracking-tight">Lunive</span>
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex justify-center space-x-7 text-sm font-medium text-[var(--essay-text)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavItemLink
                  href={link.href}
                  en={link.en}
                  ko={link.ko}
                  locale={optimisticLocale}
                />
              </li>
            ))}
          </ul>
        </nav>

        <nav className="hidden md:flex items-center gap-3 ml-auto">
          <LocaleSwitcher
            id="desktop"
            current={optimisticLocale}
            onChange={switchLocale}
            label={t("nav.switchLanguage")}
          />
          <EssayThemeToggle />
          <SearchOverlay storyItems={storyItems} variant="navbar" isMac={isMac} />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <LocaleSwitcher
            id="mobile"
            current={optimisticLocale}
            onChange={switchLocale}
            label={t("nav.switchLanguage")}
          />
          <EssayThemeToggle />
          <button
            type="button"
            className="p-1 -mr-1 text-[var(--essay-text)]"
            aria-label={
              mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")
            }
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <HamburgerIcon open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu — fills the viewport from just below the navbar header
          down to the bottom edge. We use `position: fixed` (not absolute)
          with `top` set to the live navbar height so the panel butts up
          flush against the navbar's bottom border with no gap, and
          `bottom: 0` so the panel always reaches the bottom of the screen,
          regardless of how few links are inside. */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed left-0 right-0 origin-top overflow-hidden backdrop-blur-xl"
            style={{
              top: "var(--navbar-h, 56px)",
              bottom: 0,
              backgroundColor: "var(--essay-bg)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", ...springConfig.medium }}
          >
            <motion.div
              className="container mx-auto px-4 pt-4 pb-6 flex flex-col gap-1 h-full"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
                closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 380, damping: 30 },
                    },
                    closed: { opacity: 0, y: -8, transition: { duration: 0.12 } },
                  }}
                >
                  <Link
                    href={link.href}
                    className="block py-2 text-base font-medium text-[var(--essay-text)] hover:opacity-70 transition-opacity"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {optimisticLocale === "ko" ? link.ko : link.en}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mt-auto pt-4 border-t border-[var(--essay-border)]"
                variants={{
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 380, damping: 30 },
                  },
                  closed: { opacity: 0, y: -8, transition: { duration: 0.12 } },
                }}
              >
                <SearchOverlay storyItems={storyItems} variant="mobile" isMac={isMac} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * NavItemLink — renders both EN and KO labels stacked in the same grid cell
 * so the link's bounding box is sized to the wider of the two. Locale toggle
 * therefore causes zero layout shift; only opacity changes.
 */
function NavItemLink({
  href,
  en,
  ko,
  locale,
}: {
  href: string;
  en: string;
  ko: string;
  locale: Locale;
}) {
  return (
    <Link
      href={href}
      className="relative inline-grid place-items-center opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
    >
      <span
        className="col-start-1 row-start-1 transition-opacity duration-150"
        aria-hidden={locale !== "en"}
        style={{ opacity: locale === "en" ? 1 : 0 }}
      >
        {en}
      </span>
      <span
        className="col-start-1 row-start-1 transition-opacity duration-150"
        aria-hidden={locale !== "ko"}
        style={{ opacity: locale === "ko" ? 1 : 0 }}
      >
        {ko}
      </span>
    </Link>
  );
}

// Each locale button is fixed-width so the pill's size stays constant — only
// its position animates. This eliminates the size-morph stutter you'd get
// with auto-sized buttons (EN at 2 char vs 한 at 1 wide char).
const LOCALE_BUTTON_WIDTH = 36; // px — matches w-9
const LOCALE_BUTTON_HEIGHT = 24; // px — matches h-6 ≈ py-1 + 11px font

function LocaleSwitcher({
  current,
  onChange,
  label,
}: {
  /** id is accepted for API compat but no longer needed. */
  id?: string;
  current: Locale;
  onChange: (l: Locale) => void;
  label: string;
}) {
  const labels: Record<Locale, string> = { en: "EN", ko: "한" };
  const activeIndex = Math.max(0, routing.locales.indexOf(current));
  return (
    <div
      role="group"
      aria-label={label}
      className="relative inline-flex items-center rounded-full bg-[var(--essay-overlay)] ring-1 ring-inset ring-[var(--essay-border)] p-0.5 text-[11px] font-semibold tracking-wide"
    >
      {/* Single always-rendered pill. No layoutId — Motion's layoutId tracks
          rects in document coordinates, so when the navbar unmounts during
          page navigation (and the new page is at scroll=0 vs the old one
          scrolled down) Motion would interpolate between document
          coordinates and "fly" the pill from the old document Y to the new
          one. We use `animate.x` instead, which is purely a transform
          relative to the element's own current position — fresh mounts
          start at the target with `initial={false}` so there is nothing to
          interpolate from. Cross-page nav: pill snaps in place on the new
          page. Same-page state change (where this component re-renders
          without unmount): pill springs smoothly to the new x. */}
      <motion.span
        aria-hidden
        data-no-vt
        className="absolute top-0.5 left-0.5 rounded-full bg-[var(--essay-text)] pointer-events-none"
        style={{
          width: LOCALE_BUTTON_WIDTH,
          height: LOCALE_BUTTON_HEIGHT,
        }}
        initial={false}
        animate={{ x: activeIndex * LOCALE_BUTTON_WIDTH }}
        transition={{
          type: "spring",
          visualDuration: 0.5,
          bounce: 0.18,
        }}
      />
      {routing.locales.map((l) => {
        const active = current === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => {
              if (active) {
                const idx = routing.locales.indexOf(l);
                const next =
                  routing.locales[(idx + 1) % routing.locales.length];
                onChange(next);
              } else {
                onChange(l);
              }
            }}
            aria-current={active ? "page" : undefined}
            aria-label={l === "en" ? "English" : "한국어"}
            style={{
              width: LOCALE_BUTTON_WIDTH,
              height: LOCALE_BUTTON_HEIGHT,
            }}
            className={`relative z-10 inline-flex items-center justify-center rounded-full transition-colors duration-200 ${
              active
                ? "text-[var(--essay-bg)]"
                : "text-[var(--essay-muted)] hover:text-[var(--essay-text)]"
            }`}
          >
            {labels[l]}
          </button>
        );
      })}
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const barBase =
    "absolute left-[3px] right-[3px] h-[2px] bg-current rounded-full transition-transform duration-300 ease-out";
  return (
    <div className="relative w-6 h-6" aria-hidden>
      <span
        className={barBase}
        style={{
          top: "11px",
          transformOrigin: "center",
          transform: open ? "rotate(45deg)" : "translateY(-5px)",
        }}
      />
      <span
        className={barBase}
        style={{
          top: "11px",
          transformOrigin: "center",
          transform: open ? "rotate(-45deg)" : "translateY(5px)",
        }}
      />
    </div>
  );
}
