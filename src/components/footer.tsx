"use client";

import Image from "next/image";
import { Github, Twitter, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SOCIAL } from "@/lib/seo";

// Client component so it picks up locale changes from `LocaleProviderShell`
// without a full page roundtrip. Footer lives in the root layout (outside
// the `[locale]` segment), where the next-intl server APIs would otherwise
// emit ENVIRONMENT_FALLBACK because there's no request locale at that level.
export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full py-14 md:py-20 border-t border-[var(--essay-border)] text-[var(--essay-muted)]"
      style={{ backgroundColor: "var(--essay-bg)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-2 mb-8 text-[var(--essay-text)]"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src="/web-app-manifest-192x192.png"
                alt="Lunive Logo"
                fill
                sizes="32px"
                className="object-contain rounded-[6px]"
              />
            </div>
            <span className="text-lg font-bold tracking-tight">Lunive</span>
          </Link>

          {/* Legal & Notice Section */}
          <div className="max-w-2xl mb-10 space-y-4">
            <p className="text-[11px] sm:text-xs font-medium tracking-wide uppercase text-[var(--essay-muted)]">
              <span className="text-[var(--essay-accent)] mr-1.5">●</span>
              {t("footer.officialNoticeKicker")}
            </p>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[var(--essay-muted)]">
              {t("footer.officialNoticeBody")}
            </p>
            <p className="text-[11px] sm:text-xs leading-relaxed text-[var(--essay-muted)] opacity-80">
              {t("footer.trademarkBody")}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-5 mb-10">
            <SocialLink href={SOCIAL.github} label="GitHub" Icon={Github} />
            <SocialLink
              href={SOCIAL.instagram}
              label="Instagram"
              Icon={Instagram}
            />
            <SocialLink href={SOCIAL.twitter} label="X (Twitter)" Icon={Twitter} />
          </div>

          {/* Site links */}
          <nav className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <Link
              href="/"
              className="text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/cadenza"
              className="text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors"
            >
              {t("nav.cadenza")}
            </Link>
            <Link
              href="/stories"
              className="text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors"
            >
              {t("nav.stories")}
            </Link>
            <Link
              href="/about"
              className="text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/legal"
              className="text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors"
            >
              {t("nav.legal")}
            </Link>
          </nav>

          {/* Copyright */}
          <div className="pt-8 border-t border-[var(--essay-border)] w-full max-w-xs">
            <p className="text-[11px] tracking-widest uppercase text-[var(--essay-muted)] opacity-70">
              © 2025 - {currentYear} Lunive. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: typeof Github;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 active:scale-90 inline-block"
    >
      <Icon size={20} aria-hidden />
    </a>
  );
}
