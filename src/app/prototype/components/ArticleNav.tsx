import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
  title: string;
}

interface ArticleNavProps {
  previous?: NavItem;
  next?: NavItem;
}

export default function ArticleNav({ previous, next }: ArticleNavProps) {
  return (
    <nav className="mt-20 pt-10 border-t border-[var(--essay-border)]">
      <div className="flex justify-between items-start gap-4">
        {previous ? (
          <Link
            href={previous.href}
            className="group flex flex-col items-start"
          >
            <span className="text-xs text-[var(--essay-muted)] mb-1">
              {previous.label}
            </span>
            <span className="text-base font-medium group-hover:text-[var(--essay-accent)] transition-colors">
              ← {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col items-end text-right"
          >
            <span className="text-xs text-[var(--essay-muted)] mb-1">
              {next.label}
            </span>
            <span className="text-base font-medium group-hover:text-[var(--essay-accent)] transition-colors">
              {next.title} →
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
