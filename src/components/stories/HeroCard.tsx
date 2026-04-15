import Link from "next/link";
import type { HeroMedia } from "@/lib/stories";
import ExpandMedia from "./ExpandMedia";

interface HeroCardProps {
  title: string;
  subtitle?: string;
  href?: string;
  cta?: string;
  heroMedia?: HeroMedia;
  /** When true, card renders as a link (used on the index featured slot). */
  linked?: boolean;
  /**
   * Fills its parent completely (100% / 100%). Set true when the card lives
   * inside an ExpandOnScroll wrapper that controls the outer dimensions.
   */
  fill?: boolean;
}

export default function HeroCard({
  title,
  subtitle,
  href,
  cta = "Continue reading",
  heroMedia,
  linked = false,
  fill = false,
}: HeroCardProps) {
  const content = (
    <div
      className={`hero-card bg-[#0d0d0d] text-white flex flex-col md:flex-row items-stretch overflow-hidden ${
        fill ? "w-full h-full" : "w-full rounded-[28px]"
      }`}
      style={{ containerType: "inline-size" }}
    >
      <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-12 md:py-16 gap-6 min-w-0">
        <h2 className="font-[family-name:var(--font-newsreader)] font-medium tracking-tight leading-[1.05] text-[clamp(2.5rem,6cqw,5rem)]">
          {title}
        </h2>
        {subtitle && (
          <p className="font-[family-name:var(--font-newsreader)] text-[clamp(1rem,1.6cqw,1.375rem)] text-white/70 leading-snug max-w-xl">
            {subtitle}
          </p>
        )}
        {linked && href && (
          <div>
            <span className="inline-flex items-center gap-2 bg-white text-[#0d0d0d] px-5 py-2.5 rounded-full text-sm font-medium">
              {cta}
            </span>
          </div>
        )}
      </div>

      {heroMedia && (
        <div className="relative flex-1 min-h-[280px] md:min-h-0 md:max-w-[55%] bg-black">
          <ExpandMedia
            type={heroMedia.type}
            src={heroMedia.src}
            poster={heroMedia.poster}
            component={heroMedia.component}
            alt={heroMedia.alt ?? title}
            contained
            fillParent
          />
        </div>
      )}
    </div>
  );

  if (linked && href) {
    return (
      <Link
        href={href}
        className={`block group ${fill ? "w-full h-full" : ""}`}
        aria-label={`Read: ${title}`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
