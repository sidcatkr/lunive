"use client";

/**
 * StoryContent — client component that renders the full story page.
 * Receives server-fetched data as props and mounts all interactive views.
 */

import TableOfContents from "@/components/stories/TableOfContents";
import ArticleHeader from "@/components/stories/ArticleHeader";
import ArticleNav from "@/components/stories/ArticleNav";
import MarkdownRenderer from "@/components/stories/MarkdownRenderer";
import type { Story, StoryMeta } from "@/lib/stories";

interface StoryContentProps {
  story: Story;
  previous: StoryMeta | null;
  next: StoryMeta | null;
}

export default function StoryContent({
  story,
  previous,
  next,
}: StoryContentProps) {
  return (
    <>
      <TableOfContents items={story.toc} />

      <main className="max-w-[680px] mx-auto px-6 py-24">
        <ArticleHeader
          title={story.title}
          date={story.date}
          tags={story.tags}
          backLink={{ href: "/stories", label: "Stories" }}
        />

        <article className="prose-essay">
          <MarkdownRenderer content={story.content} />
        </article>

        <ArticleNav previous={previous} next={next} />
      </main>
    </>
  );
}
