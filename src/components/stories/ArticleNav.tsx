import { Link } from "@/i18n/navigation";
import type { StoryMeta } from "@/lib/stories";

interface ArticleNavProps {
  previous?: StoryMeta | null;
  next?: StoryMeta | null;
  labels?: { previous: string; next: string };
}

export default function ArticleNav({
  previous,
  next,
  labels = { previous: "Previous", next: "Next" },
}: ArticleNavProps) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-20 pt-10 border-t border-[var(--essay-border)]">
      <div className="flex justify-between items-start gap-4">
        {previous ? (
          <Link
            href={`/stories/${previous.slug}`}
            locale={previous.locale}
            className="group flex flex-col items-start"
          >
            <span className="text-xs text-[var(--essay-muted)] mb-1">
              {labels.previous}
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
            href={`/stories/${next.slug}`}
            locale={next.locale}
            className="group flex flex-col items-end text-right"
          >
            <span className="text-xs text-[var(--essay-muted)] mb-1">
              {labels.next}
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
