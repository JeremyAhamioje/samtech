import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";

/** Section label: mono number + name, like a chapter marker. */
export function SectionLabel({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`t-label flex items-center gap-3 ${className}`}>
      {index && <span className="text-indigo">{index}</span>}
      <span className="h-px w-8 bg-current opacity-30" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** Heading split into masked lines; ScrollReveals slides each line up. */
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

/** Minimal browser chrome around a real screenshot. Preserves the image's proportions. */
export function BrowserFrame({
  src,
  alt,
  url,
  priority,
  sizes = "(max-width: 900px) 100vw, 60vw",
  className = "",
  children,
}: {
  src?: StaticImageData;
  alt?: string;
  url: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`overflow-hidden rounded-[14px] bg-white shadow-[0_30px_80px_-30px_rgba(12,13,16,0.35)] ring-1 ring-black/5 ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-black/5 bg-[#f6f5f2] px-4">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-white px-3 py-0.5 font-mono text-[11px] text-black/50 ring-1 ring-black/5">
          {url}
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="relative">
        {children ?? (src && <Image src={src} alt={alt ?? ""} sizes={sizes} priority={priority} className="block h-auto w-full" placeholder="blur" />)}
      </div>
    </div>
  );
}

/** Phone bezel; children render inside the 390-wide screen area. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[42px] bg-ink p-[10px] shadow-[0_40px_80px_-30px_rgba(12,13,16,0.5)] ${className}`}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[32px] bg-white">
        {children}
        <span className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
      </div>
    </div>
  );
}
