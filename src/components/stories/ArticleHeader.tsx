import Link from "next/link";

interface ArticleHeaderProps {
  title: string;
  date: string;
  tags?: string[];
  backLink?: {
    href: string;
    label: string;
  };
}

export default function ArticleHeader({
  title,
  date,
  tags,
  backLink,
}: ArticleHeaderProps) {
  const formatted = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <header className="mb-12">
      {backLink && (
        <Link
          href={backLink.href}
          className="inline-flex items-center gap-2 text-[var(--essay-muted)] hover:text-[var(--essay-text)] transition-colors mb-8 text-sm"
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

      <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-medium tracking-tight mb-4">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        {formatted && (
          <p className="text-[var(--essay-muted)] text-sm">{formatted}</p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
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
