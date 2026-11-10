import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/Navbar";
import { Pinwheel } from "@/components/ui";

/**
 * Shell for service pages: minimal header, big orange title, the page body,
 * then optional full-bleed bands (`after`) before the footer.
 */
export default function SubPage({
  back,
  kicker,
  title,
  lead,
  children,
  after,
}: {
  back: { href: string; label: string };
  kicker: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  after?: ReactNode;
}) {
  return (
    <div className="flex min-h-[100svh] flex-col">
      <header className="shadow-[0_1px_0_var(--line)]">
        <div className="wrap flex h-[68px] items-center justify-between">
          <Link href="/" aria-label="Samtech Studio — home">
            <Wordmark />
          </Link>
          <Link href="/review" className="btn btn-primary h-10 px-5 text-[14px]">
            Free website review <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="wrap py-[clamp(40px,7vw,104px)]">
          <Link href={back.href} className="inline-flex items-center gap-2 text-[15px] font-medium opacity-70 hover:opacity-100">
            <ArrowLeft size={16} aria-hidden /> {back.label}
          </Link>

          <p className="mt-12 flex items-center gap-2.5 font-display text-[clamp(22px,1.8vw,28px)] font-extrabold uppercase leading-none">
            <Pinwheel className="spin-slow size-[1em] text-ink" hubClassName="fill-paper" />
            {kicker}
          </p>
          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(56px,9vw,150px)] font-extrabold uppercase leading-[0.88] text-flame">
            {title}
          </h1>
          {lead && <p className="mt-8 max-w-[38rem] text-[clamp(18px,1.5vw,22px)] leading-snug">{lead}</p>}

          {children}
        </div>
        {after}
      </main>
    </div>
  );
}
