"use client";

import type { StoryMeta } from "@/lib/stories";
import HeroCard from "./HeroCard";
import ExpandOnScroll from "./ExpandOnScroll";

interface FeaturedStoryProps {
  story: StoryMeta;
}

export default function FeaturedStory({ story }: FeaturedStoryProps) {
  const href = `/stories/${story.slug}`;

  // Render a static card (no scroll takeover) when there's no hero visual,
  // or when the author explicitly opted out with `expand: false`.
  if (!story.heroMedia || story.expand === false) {
    return (
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <HeroCard
          title={story.title}
          subtitle={story.subtitle ?? story.description}
          href={href}
          heroMedia={story.heroMedia}
          linked
        />
      </section>
    );
  }

  return (
    <ExpandOnScroll
      initialWidth="min(1200px, 92vw)"
      initialHeight="min(620px, 76vh)"
      initialRadius="28px"
      cardClassName="shadow-2xl"
    >
      <HeroCard
        title={story.title}
        subtitle={story.subtitle ?? story.description}
        href={href}
        heroMedia={story.heroMedia}
        linked
        fill
      />
    </ExpandOnScroll>
  );
}
