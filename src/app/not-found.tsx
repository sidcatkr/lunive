import type { Metadata } from "next";
import Link from "next/link";

/**
 * Global 404. Triggered for any unmatched route — including locale-prefixed
 * URLs, since `[locale]/layout.tsx` calls `notFound()` for unknown locales,
 * and any deeper `notFound()` call falls through to here when no nearer
 * `not-found.tsx` exists.
 *
 * Crawler hygiene: tagged `robots: noindex` so Google doesn't index the
 * 404 itself (which would otherwise pollute SERP for any deeplink that
 * stops working). The HTTP status is set to 404 automatically by Next.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you're looking for doesn't exist. It may have been moved or never existed.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundColor: "var(--essay-bg)",
        color: "var(--essay-text)",
      }}
    >
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--essay-muted)] mb-6">
        404
      </p>
      <h1 className="font-[family-name:var(--font-newsreader)] font-medium tracking-tight leading-[1.04] text-[clamp(2.25rem,5vw,4rem)] mb-6 max-w-2xl">
        We couldn&rsquo;t find that page.
        <br />
        <span lang="ko" className="opacity-70">
          페이지를 찾을 수 없습니다.
        </span>
      </h1>
      <p className="text-[var(--essay-muted)] text-base md:text-[17px] leading-[1.6] max-w-md mb-10">
        It may have moved, or the link might be broken. Try one of these
        instead.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--essay-text)] text-[var(--essay-bg)] text-sm font-medium hover:opacity-90 transition"
        >
          Home
        </Link>
        <Link
          href="/cadenza"
          className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-text)] text-sm font-medium hover:bg-[var(--essay-overlay)] transition"
        >
          Cadenza
        </Link>
        <Link
          href="/stories"
          className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-text)] text-sm font-medium hover:bg-[var(--essay-overlay)] transition"
        >
          Stories
        </Link>
      </div>
    </main>
  );
}
