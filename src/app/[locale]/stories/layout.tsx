import type { ReactNode } from "react";

// Stories pages share the essay-themed surface. The theme toggle now lives in
// the root [locale]/layout.tsx so every page gets it; this layout just gives
// stories pages the essay class hook (stories-layout).
export default function StoriesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="stories-layout">{children}</div>;
}
