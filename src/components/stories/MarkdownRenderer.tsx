"use client";

/**
 * MarkdownRenderer
 * ────────────────
 * Converts markdown source to styled JSX using react-markdown.
 *
 * Supported Obsidian/VSCode markdown features:
 *  - Headings H1–H6 (H2/H3 are linked to the Table of Contents)
 *  - Paragraphs, bold, italic, strikethrough
 *  - Links (external links open in new tab)
 *  - Images: ![alt](url "caption") — caption via title attribute
 *  - Blockquotes
 *  - Ordered & unordered lists
 *  - Tables (GFM)
 *  - Inline code + fenced code blocks
 *  - Footnotes: [^1] inline, [^1]: text at bottom (GFM)
 *  - Raw HTML passthrough (for custom layouts)
 *
 * Image tips for authors:
 *  - External: ![alt](https://example.com/img.jpg "Optional caption")
 *  - Local (in public/stories/): ![alt](/stories/images/my-photo.jpg "caption")
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import type { Components } from "react-markdown";
import type { Element, ElementContent } from "hast";
import { slugify } from "@/lib/slugify";
import ExpandMedia from "./ExpandMedia";

// Module-level constants to avoid recreating arrays on every render
const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeRaw];

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Recursively extract plain text from React children (for heading ID generation). */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children != null && typeof children === "object" && "props" in children) {
    return extractText((children as React.ReactElement).props.children);
  }
  return "";
}

// ─── Component Map ───────────────────────────────────────────────────────────

const components: Components = {
  // ── Headings ──────────────────────────────────────────────────────────────
  h1: ({ children }) => (
    <h1 className="font-[family-name:var(--font-newsreader)] text-3xl font-medium mt-12 mb-5 text-[var(--essay-text)] scroll-mt-24">
      {children}
    </h1>
  ),
  h2: ({ children, node }) => {
    const hNode = node as Element;
    // Hide the remark-gfm sr-only "Footnotes" label (our section wrapper has its own)
    if (hNode?.properties?.id === "footnote-label") return null;
    const id = slugify(extractText(children));
    return (
      <h2
        id={id}
        className="font-[family-name:var(--font-inter)] text-xl font-semibold mt-10 mb-4 text-[var(--essay-text)] scroll-mt-24"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(extractText(children));
    return (
      <h3
        id={id}
        className="font-[family-name:var(--font-inter)] text-lg font-semibold mt-8 mb-3 text-[var(--essay-text)] scroll-mt-24"
      >
        {children}
      </h3>
    );
  },
  h4: ({ children }) => (
    <h4 className="font-[family-name:var(--font-inter)] text-base font-semibold mt-6 mb-2 text-[var(--essay-text)]">
      {children}
    </h4>
  ),

  // ── Paragraph (unwrap standalone block-ish children) ──────────────────────
  // react-markdown wraps inline HTML in <p>. For tags that render block-level
  // content (figure, div, etc.), nesting them inside <p> produces invalid HTML
  // and triggers a hydration error. Strip the <p> when it holds just one of
  // these as its sole child.
  p: ({ children, node }) => {
    const hNode = node as Element;
    const onlyChild =
      hNode?.children?.length === 1 && hNode.children[0].type === "element"
        ? (hNode.children[0] as Element).tagName
        : null;
    if (onlyChild === "img" || onlyChild === "expand-media") {
      return <>{children}</>;
    }
    return (
      <p className="mb-[1.5rem] text-[var(--essay-text)] leading-[1.8]">
        {children}
      </p>
    );
  },

  // ── Images → styled figure ─────────────────────────────────────────────────
  img: ({ src, alt, title }) => {
    if (!src) return null;

    // Enforce alt text on every story image. Empty/whitespace-only alt is
    // treated as a missing alt — markdown authors must either write a real
    // description or explicitly use `alt=""` *with the figure caption (title)
    // present* to mark it decorative. In dev/build we throw so the issue
    // shows up in CI; in production we degrade silently to avoid blanking
    // the page on a single missing alt.
    const trimmedAlt = (alt ?? "").trim();
    const hasCaption = Boolean(title?.trim());
    if (!trimmedAlt && !hasCaption) {
      const msg = `[MarkdownRenderer] Image is missing alt text and figure caption. src="${src}". Provide an alt description or a markdown title (caption).`;
      if (process.env.NODE_ENV !== "production") {
        throw new Error(msg);
      }
      console.warn(msg);
    }

    // For external URLs use standard img tag (avoids next/image config issues)
    // For /public paths, use next/image
    const isExternal = src.startsWith("http://") || src.startsWith("https://");

    return (
      <figure className="my-10">
        <div className="relative overflow-hidden rounded-lg bg-[var(--essay-border)]">
          {isExternal ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={trimmedAlt}
              className="w-full h-auto"
              loading="lazy"
            />
          ) : (
            <Image
              src={src}
              alt={trimmedAlt}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          )}
        </div>
        {title && (
          <figcaption className="mt-3 text-sm text-[var(--essay-muted)] text-center italic font-[family-name:var(--font-newsreader)]">
            {title}
          </figcaption>
        )}
      </figure>
    );
  },

  // ── Links ─────────────────────────────────────────────────────────────────
  a: ({ href, children, node }) => {
    const hNode = node as Element;
    const classes = (hNode?.properties?.className ?? []) as string[];
    const isBackref =
      classes.includes("data-footnote-backref") ||
      (href?.startsWith("#user-content-fnref-") ?? false);

    if (isBackref) {
      // remark-gfm injects a ↩ character that iOS renders as an emoji.
      // Swap the content for an inline SVG so it's consistent across platforms.
      const ariaLabel = (hNode?.properties?.ariaLabel as string | undefined) ??
        "Back to reference";
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className="inline-flex items-center text-[var(--essay-accent)] no-underline hover:opacity-70 transition-opacity duration-150 ml-1"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="9 14 4 9 9 4" />
            <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
          </svg>
        </a>
      );
    }

    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className="text-[var(--essay-accent)] underline underline-offset-2 hover:decoration-transparent transition-all duration-150"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  },

  // ── Blockquote ────────────────────────────────────────────────────────────
  blockquote: ({ children }) => (
    <blockquote className="border-l-[3px] border-[var(--essay-border)] pl-6 my-8 italic text-[var(--essay-muted)]">
      {children}
    </blockquote>
  ),

  // ── Code ──────────────────────────────────────────────────────────────────
  code: ({ children, className }) => {
    // Block code (inside <pre>) has a language- className
    if (className?.startsWith("language-")) {
      return <code className={className}>{children}</code>;
    }
    // Inline code
    return (
      <code className="text-[0.875em] bg-[var(--essay-code-bg)] px-[0.4em] py-[0.15em] rounded-[4px] font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg bg-[var(--essay-code-bg)] p-5 text-sm font-mono leading-relaxed">
      {children}
    </pre>
  ),

  // ── Lists ─────────────────────────────────────────────────────────────────
  ul: ({ children }) => (
    <ul className="my-6 pl-6 list-disc space-y-2 text-[var(--essay-text)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 pl-6 list-decimal space-y-2 text-[var(--essay-text)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-[1.8]">{children}</li>,

  // ── Horizontal rule ───────────────────────────────────────────────────────
  hr: () => <hr className="my-12 border-[var(--essay-border)]" />,

  // ── Tables (GFM) ─────────────────────────────────────────────────────────
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-[var(--essay-border)]">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--essay-code-bg)]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold border-b border-[var(--essay-border)] text-[var(--essay-text)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-b border-[var(--essay-border)] text-[var(--essay-text)]">
      {children}
    </td>
  ),

  // ── GFM Footnotes (rendered as part of the document body) ─────────────────
  // remark-gfm outputs a <section data-footnotes class="footnotes"> block at the bottom
  section: ({ children, node, ...rest }) => {
    const hNode = node as Element;
    const classes = (hNode?.properties?.className ?? []) as string[];
    const isFootnotes =
      hNode?.properties?.dataFootnotes || classes.includes("footnotes");
    if (isFootnotes) {
      return (
        <section
          className="mt-16 pt-8 border-t border-[var(--essay-border)]"
          {...(rest as React.HTMLAttributes<HTMLElement>)}
        >
          <p className="text-xs uppercase tracking-widest font-medium mb-4 font-[family-name:var(--font-inter)] text-[var(--essay-muted)]">
            Notes
          </p>
          {children}
        </section>
      );
    }
    return (
      <section {...(rest as React.HTMLAttributes<HTMLElement>)}>
        {children}
      </section>
    );
  },

  // Style footnote sup markers to match the prototype Footnote component
  sup: ({ children, node }) => {
    const hNode = node as Element;
    const hasAnchor = hNode?.children?.some(
      (c: ElementContent) =>
        c.type === "element" && (c as Element).tagName === "a",
    );
    if (hasAnchor) {
      return (
        <sup
          className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-medium text-[var(--essay-accent)] rounded-full ml-0.5 cursor-help"
          style={{ backgroundColor: "var(--essay-code-bg)" }}
        >
          {children}
        </sup>
      );
    }
    return <sup>{children}</sup>;
  },
};

// Custom tags (not part of the standard `Components` type, so attached separately).
// Authors write: <expand-media type="video" src="/stories/demo.mp4"></expand-media>
const customComponents = {
  "expand-media": ({
    type,
    src,
    poster,
    component,
    alt,
    contained,
  }: {
    type?: "image" | "video" | "component";
    src?: string;
    poster?: string;
    component?: string;
    alt?: string;
    /** Set to any string (e.g. "true") to render a static card instead of a scroll-expand block. */
    contained?: string | boolean;
  }) => {
    const isContained = contained === true || contained === "true" || contained === "";
    // Break out of the max-width reading column so the expand can span the
    // full viewport width (Anthropic-style). `width: 100vw` + negative margin
    // re-centers the block regardless of parent width. body has overflow-x:
    // hidden in stories globals, so no horizontal scrollbar.
    return (
      <div
        className="relative my-20"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
        }}
      >
        <ExpandMedia
          type={type}
          src={src}
          poster={poster}
          component={component}
          alt={alt}
          contained={isContained}
        />
      </div>
    );
  },
};

// ─── Renderer ────────────────────────────────────────────────────────────────

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={REMARK_PLUGINS}
      rehypePlugins={REHYPE_PLUGINS}
      components={{ ...components, ...customComponents } as Components}
    >
      {content}
    </ReactMarkdown>
  );
}
