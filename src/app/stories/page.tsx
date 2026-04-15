import Link from "next/link";
import { getAllStories, getFeaturedStory } from "@/lib/stories";
import FeaturedStory from "@/components/stories/FeaturedStory";

export const metadata = {
  title: "Stories",
  description: "Essays and long-form writing.",
};

export default function StoriesIndexPage() {
  const stories = getAllStories();
  const featured = getFeaturedStory();
  const rest = featured
    ? stories.filter((s) => s.slug !== featured.slug)
    : stories;

  return (
    <main className="stories-index">
      {/* ─── Masthead — Anthropic-style typographic hero ────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
          <h1 className="font-[family-name:var(--font-newsreader)] font-medium tracking-tight leading-[1.02] text-[clamp(2.75rem,6vw,5.5rem)] text-[var(--essay-text)]">
            Writing <span className="anthropic-underline">that</span> shapes how
            we <span className="anthropic-underline">build</span>.
          </h1>
          <p className="text-[var(--essay-muted)] text-base md:text-[17px] leading-[1.6] max-w-md md:pb-3">
            Long-form essays, product notes, and observations from the team at
            Lunive.
          </p>
        </div>
      </section>

      {/* ─── Featured story — hero card that expands as you scroll ───────────── */}
      {featured && <FeaturedStory story={featured} />}

      {/* ─── Rest of the stories ─────────────────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-32 pt-8 md:pt-16">
        {rest.length > 0 && (
          <>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.12em] text-[var(--essay-muted)]">
                All stories
              </h2>
            </div>
            <ul className="divide-y divide-[var(--essay-rule,var(--essay-border))]">
              {rest.map((story) => {
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
                      className="group grid md:grid-cols-[1fr_auto] gap-2 md:gap-10 py-8 md:py-10 items-baseline transition-opacity duration-200 hover:opacity-90"
                    >
                      <div>
                        <h3 className="font-[family-name:var(--font-newsreader)] text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.15] text-[var(--essay-text)] group-hover:[text-decoration:underline] [text-decoration-thickness:2px] [text-underline-offset:6px] mb-2">
                          {story.title}
                        </h3>
                        {story.description && (
                          <p className="text-[var(--essay-muted)] text-[15px] leading-[1.55] max-w-2xl">
                            {story.description}
                          </p>
                        )}
                        {story.tags && story.tags.length > 0 && (
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {story.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] px-2 py-0.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-muted)] uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {formatted && (
                        <time
                          dateTime={story.date}
                          className="text-sm text-[var(--essay-muted)] shrink-0 md:pt-2 font-[family-name:var(--font-inter)]"
                        >
                          {formatted}
                        </time>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {stories.length === 0 && (
          <p className="text-[var(--essay-muted)] py-16 text-center">
            No stories yet.
          </p>
        )}
      </section>
    </main>
  );
}
