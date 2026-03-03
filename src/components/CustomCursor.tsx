"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const mountedRef = useRef(false);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const isMouse = e.pointerType === "mouse";
    const isPenHover = e.pointerType === "pen" && e.buttons === 0;
    if (!isMouse && !isPenHover) return;
    const CURSOR_RADIUS = 6;
    const x = e.clientX - CURSOR_RADIUS;
    const y = e.clientY - CURSOR_RADIUS;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x, y });
      if (!mountedRef.current) {
        mountedRef.current = true;
        setMounted(true);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handlePointerMove]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ x: position.x, y: position.y, opacity: 0 }}
      animate={{ x: position.x, y: position.y, opacity: 1 }}
      transition={{
        x: { type: "spring", stiffness: 650, damping: 60, mass: 0.1 },
        y: { type: "spring", stiffness: 650, damping: 60, mass: 0.1 },
        opacity: { duration: 0.3, ease: "easeOut" },
      }}
      className="fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none"
    />
  );
}
