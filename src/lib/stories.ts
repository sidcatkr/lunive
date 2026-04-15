import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugify } from "./slugify";

const STORIES_DIR = path.join(process.cwd(), "content/stories");

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface HeroMedia {
  /** Media kind rendered in the hero card / expand slot. */
  type: "image" | "video" | "component";
  /** URL for image/video. */
  src?: string;
  /** Optional poster frame for videos. */
  poster?: string;
  /** Name of a component registered in hero-components.tsx (for type: "component"). */
  component?: string;
  /** Alt text for images; accessible label for videos/components. */
  alt?: string;
}

export interface StoryMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  coverImage?: string;
  /** When true, this story renders as the large featured card on /stories. */
  featured?: boolean;
  /**
   * When true (default) and heroMedia is set, the featured card on /stories
   * grows to fill the viewport as the user scrolls. Set false for a static
   * dark card that doesn't animate.
   */
  expand?: boolean;
  /** Hero visual shown in the article/index card. */
  heroMedia?: HeroMedia;
  /** Optional subtitle line under the hero title (used on the dark card). */
  subtitle?: string;
}

export interface Story extends StoryMeta {
  content: string;
  toc: TocItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extract H2/H3 headings from raw markdown source for the Table of Contents. */
function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    // Strip inline markdown (bold, italic, inline code, links)
    const raw = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
      .replace(/[`*_~]/g, "") // inline markers
      .trim();
    items.push({ id: slugify(raw), title: raw, level });
  }

  return items;
}

function parseStory(filename: string): StoryMeta {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(STORIES_DIR, filename), "utf-8");
  const { data } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : "",
    description: data.description,
    tags: data.tags,
    coverImage: data.coverImage,
    featured: data.featured === true,
    expand: data.expand !== false,
    heroMedia: data.heroMedia as HeroMedia | undefined,
    subtitle: data.subtitle,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/** Returns all story metadata sorted by date descending (newest first). */
export function getAllStories(): StoryMeta[] {
  if (!fs.existsSync(STORIES_DIR)) return [];

  return fs
    .readdirSync(STORIES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseStory)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/** Returns the full story (content + toc) for a given slug, or null if not found. */
export function getStoryBySlug(slug: string): Story | null {
  const fullPath = path.join(STORIES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : "",
    description: data.description,
    tags: data.tags,
    coverImage: data.coverImage,
    featured: data.featured === true,
    expand: data.expand !== false,
    heroMedia: data.heroMedia as HeroMedia | undefined,
    subtitle: data.subtitle,
    content,
    toc: extractToc(content),
  };
}

/**
 * Returns the story that should lead the /stories index.
 * Prefers `featured: true`; falls back to the newest story.
 */
export function getFeaturedStory(): StoryMeta | null {
  const all = getAllStories();
  if (all.length === 0) return null;
  return all.find((s) => s.featured) ?? all[0];
}

/**
 * Returns the previous (older) and next (newer) stories relative to the
 * given slug, based on the date-sorted list.
 */
export function getAdjacentStories(slug: string): {
  previous: StoryMeta | null;
  next: StoryMeta | null;
} {
  const all = getAllStories(); // newest first
  const idx = all.findIndex((s) => s.slug === slug);

  if (idx === -1) return { previous: null, next: null };

  return {
    next: idx > 0 ? all[idx - 1] : null, // newer
    previous: idx < all.length - 1 ? all[idx + 1] : null, // older
  };
}
