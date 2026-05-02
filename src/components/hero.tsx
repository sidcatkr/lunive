"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, animate, stagger } from "motion/react";
import { splitText } from "@/utils/split-text";
import { animateWithSpring } from "@/utils/spring-animations";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Respect prefers-reduced-motion: skip the entry animation entirely.
      // The text is already visible from SSR, so this is a true no-op.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // Wait for fonts to load before splitting characters — splitText reads
      // the rendered glyph widths, and Korean/Inter fallback metrics differ
      // enough that splitting before fonts settle leaves the layout subtly
      // off. Important: we no longer flip `visibility` here. The text renders
      // visible from SSR (good for LCP attribution + crawler indexing); the
      // entry animation only nudges `y` and `filter`, which are pure
      // transforms and therefore don't gate the LCP "rendered" timestamp.
      document.fonts.ready.then(() => {
        if (!containerRef.current) return;

        // Split and animate first line. Skip `opacity` in the keyframes so
        // characters never go transparent — Chrome attributes LCP only once
        // the element is painted with non-zero opacity, so animating
        // opacity from 0 was the entire reason desktop /ko had a 2.6s LCP
        // render-delay even though TTFB was 14ms.
        const firstLine = containerRef.current.querySelector(".first-line");
        if (firstLine) {
          const chars = splitText(firstLine, {
            type: "chars",
            preserveSpaces: true,
          });

          animateWithSpring(
            chars,
            {
              y: [16, 0],
              filter: ["blur(6px)", "blur(0px)"],
            },
            {
              stiffness: 60, // Lower stiffness for smoother animation
              damping: 18, // Higher damping for smoother animation
              bounce: 0,
              restSpeed: 0.01,
              restDelta: 0.01,
              delay: stagger(0.04), // Slightly tighter stagger
              duration: 1.2, // Shorter — full reveal completes quicker
            },
          );
        }

        // Split and animate wavy text
        const wavyElement = containerRef.current.querySelector(".wavy");
        if (wavyElement) {
          const chars = splitText(wavyElement, { type: "chars" });

          // Animate each character with wavy effect using spring physics
          chars.forEach((char, i) => {
            animate(
              char,
              { y: [-15, 15] },
              {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                ease: "easeInOut",
                duration: 3.5, // Slower wave animation
                delay: i * 0.1, // Delay between characters
              },
            );
          });
        }
      });
    }
  }, []);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        className="relative w-16 h-16 rounded-md overflow-hidden mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 150, // Lower stiffness
          damping: 30, // Higher damping
          duration: 2, // Longer duration
        }}
      >
        <Image
          src="/web-app-manifest-192x192.png"
          alt="Lunive Logo"
          fill
          priority
          sizes="64px"
          className="object-contain rounded-xl"
        />
      </motion.div>

      {/* Text is rendered visible from SSR — important for LCP attribution
          (Chrome counts the H1 as "rendered" only once it's painted with
          non-zero opacity), and for crawlers / reduced-motion users that
          never run the entry animation. The character-by-character reveal
          (handled in the useEffect above) animates only `y` and `filter`,
          neither of which gate LCP. */}
      <div
        ref={containerRef}
        className="hero-text-container text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="first-line blur-transition">
            Welcome to <br className="block md:hidden" /> Lunive
          </span>
        </h1>

        <p className="text-xl md:text-2xl mt-4">
          Be <span className="wavy hero-accent-text">flexible</span>.
        </p>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="hero-blob-soft absolute top-1/4 left-10 w-64 h-64 rounded-full blur-xl will-change-transform"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18, // Slower background animation
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hero-blob-soft-strong absolute bottom-1/4 right-10 w-80 h-80 rounded-full blur-xl will-change-transform"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 22, // Slower background animation
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
}
