import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllStories, getStoryBySlug, getAdjacentStories } from "@/lib/stories";
import StoryContent from "@/components/stories/StoryContent";

// ─── Static generation ────────────────────────────────────────────────────────

/** Pre-build all story pages at build time. */
export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

/** Dynamic <title> and <meta description> per story. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      type: "article",
      publishedTime: story.date,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) notFound();

  const { previous, next } = getAdjacentStories(slug);

  return <StoryContent story={story} previous={previous} next={next} />;
}
