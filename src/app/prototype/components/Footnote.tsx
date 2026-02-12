"use client";

interface FootnoteProps {
  number: number;
}

export default function Footnote({ number }: FootnoteProps) {
  return (
    <sup 
      className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-medium text-[var(--essay-accent)] rounded-full ml-0.5 cursor-help transition-colors"
      style={{ 
        backgroundColor: 'var(--essay-code-bg)'
      }}
    >
      {number}
    </sup>
  );
}
