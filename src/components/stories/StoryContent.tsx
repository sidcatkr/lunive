"use client";

/**
 * StoryContent — client component that renders the full story page.
 * Receives server-fetched data as props and mounts all interactive views.
 */

import TableOfContents from "@/components/stories/TableOfContents";
import ArticleHeader from "@/components/stories/ArticleHeader";
import ArticleNav from "@/components/stories/ArticleNav";
import MarkdownRenderer from "@/components/stories/MarkdownRenderer";
import HeroCard from "@/components/stories/HeroCard";
import type { Story, StoryMeta } from "@/lib/stories";

interface StoryContentProps {
  story: Story;
  previous: StoryMeta | null;
  next: StoryMeta | null;
  navLabels?: { previous: string; next: string };
  backLink?: { href: string; label: string };
}

export default function StoryContent({
  story,
  previous,
  next,
  navLabels,
  backLink = { href: "/stories", label: "Stories" },
}: StoryContentProps) {
  const dateLocale = story.locale === "ko" ? "ko-KR" : "en-US";
  return (
    <>
      <TableOfContents items={story.toc} />

      {story.heroMedia && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28 md:pt-32">
          <HeroCard
            title={story.title}
            subtitle={story.subtitle ?? story.description}
            heroMedia={story.heroMedia}
            // This hero is the page LCP — opt into next/image priority so the
            // browser preloads it instead of waiting for the parser to reach
            // the <img>. Saves ~200–400ms of LCP on cold loads.
            priority
          />
          <div className="max-w-[720px] mx-auto mt-10 mb-2 flex flex-wrap items-center gap-3 text-sm text-[var(--essay-muted)]">
            {story.date && (
              <time dateTime={story.date} className="font-[family-name:var(--font-inter)]">
                {new Date(story.date).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {story.tags && story.tags.length > 0 && (
              <>
                <span aria-hidden="true" className="opacity-50">·</span>
                <div className="flex gap-2 flex-wrap">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border border-[var(--essay-border)] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <main className="max-w-[720px] mx-auto px-6 py-16 md:py-20">
        {!story.heroMedia && (
          <ArticleHeader
            title={story.title}
            date={story.date}
            tags={story.tags}
            backLink={backLink}
          />
        )}

        <article className="prose-essay pt-8">
          <MarkdownRenderer content={story.content} />
        </article>

        <ArticleNav previous={previous} next={next} labels={navLabels} />
      </main>
    </>
  );
}
