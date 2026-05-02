import { Link } from "@/i18n/navigation";

interface ArticleHeaderProps {
  title: string;
  date: string;
  tags?: string[];
  backLink?: {
    href: string;
    label: string;
  };
  /** Locale used for date formatting; the next-intl Link infers locale from URL. */
  dateLocale?: string;
}

export default function ArticleHeader({
  title,
  date,
  tags,
  backLink,
  dateLocale = "en-US",
}: ArticleHeaderProps) {
  const formatted = date
    ? new Date(date).toLocaleDateString(dateLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <header className="mb-14">
      {backLink && (
        <Link
          href={backLink.href}
          className="inline-flex items-center gap-2 text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors mb-10 text-sm font-[family-name:var(--font-inter)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transform rotate-180"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {backLink.label}
        </Link>
      )}

      <h1 className="font-[family-name:var(--font-newsreader)] font-medium tracking-tight leading-[1.05] text-[clamp(2.25rem,4.8vw,4rem)] mb-6 text-[var(--essay-text)]">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 mb-10 text-sm text-[var(--essay-muted)] font-[family-name:var(--font-inter)]">
        {formatted && <time dateTime={date}>{formatted}</time>}
        {tags && tags.length > 0 && (
          <>
            <span aria-hidden="true" className="opacity-50">
              ·
            </span>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-full border border-[var(--essay-border)] uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div
        className="border-t border-[var(--essay-border)]"
        role="separator"
        aria-hidden="true"
      />
    </header>
  );
}
