"use client";

import { useRef, useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  easeInOut,
} from "motion/react";
import { markTocBlocked } from "./expand-state";

interface ExpandOnScrollProps {
  children: ReactNode;
  /**
   * Total height of the scroll-pinned region. More = slower, more deliberate expand.
   * The child sticks for (pinHeight - visible height) of scroll. Default "110vh".
   */
  pinHeight?: string;
  /**
   * Normalized scroll-progress range [start, end] during which the expand happens.
   * 0 = element enters viewport from bottom, 1 = element leaves viewport at top.
   * The default is aligned so the expand finishes exactly at sticky release for
   * a seamless handoff to normal page scroll.
   */
  expandRange?: [number, number];
  /** Initial card width expression. Default "min(1100px, 92vw)". */
  initialWidth?: string;
  /** Initial card height expression. Default "min(620px, 78vh)". */
  initialHeight?: string;
  /** Initial corner radius. Default "28px". */
  initialRadius?: string;
  /**
   * Distance from viewport top reserved for the fixed navbar. The pinned card
   * pins immediately below this line so it touches the navbar's bottom border
   * with no visible gap. Default reads `--navbar-h` (set live by the navbar
   * via ResizeObserver) and falls back to 56px before the variable lands.
   */
  stickyOffset?: string;
  className?: string;
  cardClassName?: string;
}

export default function ExpandOnScroll({
  children,
  pinHeight = "160vh",
  expandRange = [0.18, 0.46],
  initialWidth = "min(1100px, 92vw)",
  initialHeight = "min(620px, 78vh)",
  initialRadius = "28px",
  stickyOffset = "var(--navbar-h, 56px)",
  className = "",
  cardClassName = "",
}: ExpandOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Four-stop curve: grow → hold → shrink. The card eases into full size,
  // holds through the sticky pin + hold phase, then eases back down to its
  // initial proportions as it scrolls out — mirroring the magnetic entry so
  // both the lock-in and release moments feel continuous instead of snapping
  // between "pinned full-size" and "scrolling tiny".
  const shrinkStart = Math.min(expandRange[1] + 0.17, 0.82); // ≈ sticky release
  const shrinkEnd = 0.875; //                                  ≈ TOC re-show
  const expand = useTransform(
    scrollYProgress,
    [expandRange[0], expandRange[1], shrinkStart, shrinkEnd],
    [0, 1, 1, 0],
    { clamp: true, ease: easeInOut },
  );

  // Gate the TOC: start hiding as soon as the expand begins intruding on the
  // viewport from the bottom; keep hidden through the approach, pin, hold,
  // and release; start showing again as the card's bottom edge leaves the
  // upper portion of the viewport. Matches Anthropic's glasswing behavior —
  // the TOC appears during prose before AND after the full-bleed element,
  // and only hides while the element overlaps its area.
  useEffect(() => {
    if (prefersReducedMotion) return;
    let isBlocking = false;
    const blockStart = 0.125; // ~card top entering upper-2/3 of viewport
    const blockEnd = 0.875; //   ~card bottom leaving upper 1/3 of viewport
    const handle = (p: number) => {
      const next = p >= blockStart && p <= blockEnd;
      if (next !== isBlocking) {
        isBlocking = next;
        markTocBlocked(next);
      }
    };
    handle(scrollYProgress.get());
    const unsub = scrollYProgress.on("change", handle);
    return () => {
      unsub();
      if (isBlocking) markTocBlocked(false);
    };
  }, [scrollYProgress, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <div
          className={`mx-auto overflow-hidden ${cardClassName}`}
          style={{
            width: initialWidth,
            height: initialHeight,
            borderRadius: initialRadius,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // The motion element is sized at its FINAL dimensions (viewport width and
  // viewport-minus-navbar height). It starts visually smaller via a pure
  // transform: scale() so the whole animation is GPU-composited and never
  // triggers layout. Content inside scales with the card, which matches the
  // Anthropic glasswing effect where the title grows alongside the card.
  //
  // --sx0 and --sy0 are the raw per-axis initial scales (final→initial ratio).
  // --s0 collapses them to a single uniform factor via max() so the card never
  // stretches non-uniformly — critical on mobile where the viewport aspect
  // (~0.5) diverges sharply from the authored initial aspect (~0.65), which
  // would otherwise squeeze content by ~30%. Using max() preserves the
  // authored width (92vw on mobile) exactly; the card just grows slightly
  // taller than the authored height rather than narrower than the authored
  // width, which reads better on phones.
  const motionStyle = {
    "--expand": expand,
    "--sx0": `calc(${initialWidth} / 100vw)`,
    "--sy0": `calc(${initialHeight} / (100dvh - ${stickyOffset}))`,
    "--s0": "max(var(--sx0), var(--sy0))",
    width: "100vw",
    height: `calc(100dvh - ${stickyOffset})`,
    transform:
      "translateZ(0) " +
      "scale(calc(var(--s0) + (1 - var(--s0)) * var(--expand)))",
    transformOrigin: "center center",
    borderRadius: `calc(${initialRadius} * (1 - var(--expand)))`,
    willChange: "transform, border-radius",
    backfaceVisibility: "hidden",
  } as CSSProperties;

  // Break out of the body's content area (which is narrowed by
  // `scrollbar-gutter: stable` reserving space on the right) AND any parent
  // padding/centering. The section is forced to true viewport width.
  //
  // `calc(50% - 50vw)` on its own gives correct breakout from a centered
  // padded parent, but on a layout where the parent is body-anchored at
  // x=0 (no padding) it pulls the section LEFT by half the scrollbar
  // gutter — leaving a thin gap on the right between the card and the
  // viewport's actual right edge. Adding `var(--scrollbar-w) / 2` cancels
  // that offset so the card always reaches viewport edge to viewport edge,
  // independent of the scrollbar.
  const breakout = "calc(50% - 50vw + var(--scrollbar-w, 0px) / 2)";
  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: pinHeight,
        width: "100vw",
        marginLeft: breakout,
      }}
    >
      <div
        className="sticky flex items-center justify-center overflow-hidden"
        style={{
          top: stickyOffset,
          height: `calc(100dvh - ${stickyOffset})`,
          width: "100vw",
        }}
      >
        <motion.div
          className={`overflow-hidden ${cardClassName}`}
          style={motionStyle}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
