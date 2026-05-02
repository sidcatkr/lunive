"use client";

import Image from "next/image";
import ExpandOnScroll from "./ExpandOnScroll";
import { getHeroComponent } from "./hero-components";

export interface ExpandMediaProps {
  type?: "image" | "video" | "component";
  src?: string;
  poster?: string;
  component?: string;
  alt?: string;
  /**
   * When true, renders the media at its natural size without the
   * scroll-expand wrapper. Use inside the hero card where the card itself
   * owns the expand behavior.
   */
  contained?: boolean;
  /**
   * When true, the contained media fills its parent box (width: 100%, height: 100%).
   * When false (default for contained mode), uses a 16:9 aspect-ratio box so it's
   * visible as a standalone inline block (e.g. `<expand-media contained>`).
   */
  fillParent?: boolean;
  /** Tailwind classes passed to the outer wrapper. */
  className?: string;
  /** Override initial width/height/radius for the expand wrapper. */
  initialWidth?: string;
  initialHeight?: string;
  initialRadius?: string;
  pinHeight?: string;
  /**
   * When true, the underlying <Image> renders with next/image's `priority`
   * (preload + high fetchpriority). Use only for above-the-fold hero LCP
   * media — inline article media should stay lazy.
   */
  priority?: boolean;
}

function MediaInner({
  type,
  src,
  poster,
  component,
  alt,
  priority = false,
}: Pick<ExpandMediaProps, "type" | "src" | "poster" | "component" | "alt"> & {
  priority?: boolean;
}) {
  if (type === "video" && src) {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className="w-full h-full object-cover"
      />
    );
  }

  if (type === "component") {
    const Comp = getHeroComponent(component);
    if (!Comp) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[var(--essay-code-bg)] text-[var(--essay-muted)] text-sm">
          Missing hero component: <code className="ml-1">{component}</code>
        </div>
      );
    }
    return (
      <div className="w-full h-full">
        <Comp />
      </div>
    );
  }

  // default → image
  if (!src) return null;
  const isExternal = src.startsWith("http://") || src.startsWith("https://");
  if (isExternal) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full h-full object-cover"
        loading={priority ? "eager" : "lazy"}
        // The fetchpriority attribute matches what next/image emits when
        // `priority` is true — guides the browser to download the LCP image
        // ahead of other resources.
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill
      sizes="100vw"
      // `priority` triggers next/image's preload + high fetchpriority hints
      // — set true only for above-the-fold hero LCP images, never inline
      // article media (would force eager loading of every media block).
      priority={priority}
      className="object-cover"
    />
  );
}

export default function ExpandMedia({
  type = "image",
  src,
  poster,
  component,
  alt,
  contained = false,
  fillParent = false,
  className = "",
  initialWidth,
  initialHeight,
  initialRadius,
  pinHeight,
  priority = false,
}: ExpandMediaProps) {
  if (contained) {
    // Render as a static card. When fillParent is true (HeroCard's visual pane
    // already owns the box), just fill. Otherwise use a 16:9 aspect-ratio so
    // inline markdown `<expand-media contained>` renders as a visible block.
    return (
      <div
        className={`relative overflow-hidden ${fillParent ? "w-full h-full" : "w-full rounded-[20px] bg-[#0a0a0a]"} ${className}`}
        style={fillParent ? undefined : { aspectRatio: "16 / 9" }}
      >
        <MediaInner
          type={type}
          src={src}
          poster={poster}
          component={component}
          alt={alt}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <ExpandOnScroll
      className={className}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
      initialRadius={initialRadius}
      pinHeight={pinHeight}
      cardClassName="relative bg-[#0a0a0a]"
    >
      <MediaInner
        type={type}
        src={src}
        poster={poster}
        component={component}
        alt={alt}
        priority={priority}
      />
    </ExpandOnScroll>
  );
}
