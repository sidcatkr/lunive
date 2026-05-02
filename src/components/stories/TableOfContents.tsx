"use client";

import { useEffect, useState, useCallback } from "react";
import type { TocItem } from "@/lib/stories";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items: rawItems }: TableOfContentsProps) {
  // Defensive: drop items without a usable id and dedupe by id so React never
  // sees duplicate keys, even if a markdown heading slugifies to "".
  const items = (() => {
    const seen = new Set<string>();
    const out: TocItem[] = [];
    for (const item of rawItems) {
      if (!item.id) continue;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      out.push(item);
    }
    return out;
  })();
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
    <nav
      data-toc
      className="hidden xl:block fixed left-10 top-1/2 -translate-y-1/2 z-40 font-[family-name:var(--font-inter)] transition-opacity duration-300"
    >
      <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--essay-muted)] mb-4">
        Contents
      </p>
      <ul className="space-y-2.5 border-l border-[var(--essay-border)] pl-4">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? "0.75rem" : 0 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`group relative block text-[13px] leading-snug max-w-[200px] transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--essay-text)] font-medium"
                    : "text-[var(--essay-muted)] hover:text-[var(--essay-text)]"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-[17px] top-[7px] w-[3px] h-4 bg-[var(--essay-text)] rounded-full"
                  />
                )}
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
