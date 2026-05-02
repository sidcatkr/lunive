/**
 * Shared slugify function used by both the server-side TOC extractor
 * and the client-side MarkdownRenderer to guarantee consistent heading IDs.
 *
 * Uses Unicode property classes so non-Latin scripts (Korean, Japanese, etc.)
 * are preserved instead of being stripped to an empty string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "") // keep any Unicode letter/number, spaces, hyphens, underscores
    .replace(/[\s_]+/g, "-") // spaces & underscores → hyphens
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
    .replace(/-{2,}/g, "-"); // collapse multiple hyphens
}
