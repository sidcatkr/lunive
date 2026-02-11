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
      // Wait for fonts to load
      document.fonts.ready.then(() => {
        if (!containerRef.current) return;

        // Make container visible
        containerRef.current.style.visibility = "visible";

        // Split and animate first line
        const firstLine = containerRef.current.querySelector(".first-line");
        if (firstLine) {
          const chars = splitText(firstLine, {
            type: "chars",
            preserveSpaces: true,
          });

          animateWithSpring(
            chars,
            {
              opacity: [0, 1],
              y: [20, 0],
              filter: ["blur(8px)", "blur(0px)"],
            },
            {
              stiffness: 60, // Lower stiffness for smoother animation
              damping: 18, // Higher damping for smoother animation
              bounce: 0,
              restSpeed: 0.01,
              restDelta: 0.01,
              delay: stagger(0.06), // Stagger each character
              duration: 1.8, // Longer duration for smoother animation
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
          src="/images/logo.svg"
          alt="Lunive Logo"
          fill
          className="object-contain rounded-xl"
        />
      </motion.div>

      <div
        ref={containerRef}
        className="text-center max-w-3xl"
        style={{ visibility: "hidden" }}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="first-line blur-transition">
            Welcome to <br className="block md:hidden" /> Lunive
          </span>
        </h1>

        <p className="text-xl md:text-2xl mt-4">
          Be <span className="wavy text-yellow-300">flexible</span>.
        </p>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-yellow-300/5 blur-xl will-change-transform"
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
          className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-yellow-300/10 blur-xl will-change-transform"
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
