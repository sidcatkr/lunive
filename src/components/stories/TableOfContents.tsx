"use client";

import { useEffect, useState, useCallback } from "react";
import type { TocItem } from "@/lib/stories";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const offsetTop = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        history.pushState(null, "", `#${id}`);
      }
    },
    [],
  );

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "0.75rem" : 0 }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block text-[13px] transition-all duration-300 max-w-[180px] leading-snug ${
                activeId === item.id
                  ? "text-[var(--essay-text)] font-medium"
                  : "text-[var(--essay-muted)] hover:text-[var(--essay-text)]"
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
