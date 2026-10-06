"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "@/content/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono text-[15px] font-medium tracking-tight ${className}`}>
      samtech<span className="text-indigo">.studio</span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled || open ? "bg-paper/85 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : ""
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <a href="#top" aria-label="Samtech Studio — home" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-[14px] font-medium text-ink/70 transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary hidden h-10 px-5 text-[14px] sm:inline-flex">
            Free website review <ArrowUpRight size={16} aria-hidden />
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full ring-1 ring-[var(--line)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="wrap flex h-[calc(100svh-68px)] flex-col justify-between pb-10 pt-6 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="t-h2 flex items-baseline gap-4 border-b border-[var(--line)] py-4"
              >
                <span className="t-label text-indigo">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary justify-center">
            Get a free website review <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      )}
    </header>
  );
}
