/**
 * Shared slugify function used by both the server-side TOC extractor
 * and the client-side MarkdownRenderer to guarantee consistent heading IDs.
 *
 * Matches the behavior of github-slugger used by rehype-slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/gu, "") // remove non-word chars (keep letters, digits, _, -, spaces)
    .replace(/[\s_]+/g, "-") // spaces & underscores → hyphens
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
    .replace(/-{2,}/g, "-"); // collapse multiple hyphens
}
