import type { ReactNode } from "react";

/** Heading whose lines slide up out of a mask on scroll (see ScrollReveals). */
export function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  id,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-lines>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Four half-disc blades around a hub. The brand's spinning mark (hero, section labels). */
export function Pinwheel({ className = "", hubClassName = "fill-flame" }: { className?: string; hubClassName?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d="M50 50 L50 2 A24 24 0 0 1 50 50 Z" transform={`rotate(${r} 50 50)`} fill="currentColor" />
      ))}
      <circle cx="50" cy="50" r="6" className={hubClassName} />
    </svg>
  );
}
