import Link from "next/link";
import { getAllStories } from "@/lib/stories";

export const metadata = {
  title: "Stories",
  description: "Essays and long-form writing.",
};

export default function StoriesIndexPage() {
  const stories = getAllStories();

  return (
    <main className="max-w-[680px] mx-auto px-6 py-24">
      <header className="mb-16">
        <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-medium tracking-tight mb-3">
          Stories
        </h1>
        <p className="text-[var(--essay-muted)] text-base">
          Essays, observations, and long-form writing.
        </p>
      </header>

      {stories.length === 0 ? (
        <p className="text-[var(--essay-muted)]">No stories yet.</p>
      ) : (
        <ul className="space-y-0 divide-y divide-[var(--essay-border)]">
          {stories.map((story) => {
            const formatted = story.date
              ? new Date(story.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : null;

            return (
              <li key={story.slug}>
                <Link
                  href={`/stories/${story.slug}`}
                  className="group block py-8 transition-opacity duration-200 hover:opacity-80"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h2 className="font-[family-name:var(--font-newsreader)] text-xl font-medium text-[var(--essay-text)] group-hover:text-[var(--essay-accent)] transition-colors">
                      {story.title}
                    </h2>
                    {formatted && (
                      <time
                        dateTime={story.date}
                        className="text-sm text-[var(--essay-muted)] shrink-0"
                      >
                        {formatted}
                      </time>
                    )}
                  </div>
                  {story.description && (
                    <p className="text-[var(--essay-muted)] text-sm leading-relaxed mt-1">
                      {story.description}
                    </p>
                  )}
                  {story.tags && story.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
