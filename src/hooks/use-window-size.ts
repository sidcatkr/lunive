"use client";

import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    let rafId = 0;

    function handleResize() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        rafId = 0;
      });
    }

    // Set initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return windowSize;
}
