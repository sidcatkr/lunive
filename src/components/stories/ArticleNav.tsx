import Link from "next/link";
import type { StoryMeta } from "@/lib/stories";

interface ArticleNavProps {
  previous?: StoryMeta | null;
  next?: StoryMeta | null;
}

export default function ArticleNav({ previous, next }: ArticleNavProps) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-20 pt-10 border-t border-[var(--essay-border)]">
      <div className="flex justify-between items-start gap-4">
        {previous ? (
          <Link
            href={`/stories/${previous.slug}`}
            className="group flex flex-col items-start"
          >
            <span className="text-xs text-[var(--essay-muted)] mb-1">
              Previous
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
            className="group flex flex-col items-end text-right"
          >
            <span className="text-xs text-[var(--essay-muted)] mb-1">Next</span>
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
