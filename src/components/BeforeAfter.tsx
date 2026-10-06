"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { beforeAfterChanges } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { BrowserFrame, Lines, PhoneFrame, SectionLabel } from "@/components/ui";
import oldDesktop from "@/assets/work/1st-texas-old-desktop.webp";
import newDesktop from "@/assets/work/1st-texas-new-desktop.webp";
import oldMobile from "@/assets/work/1st-texas-old-mobile-long.webp";
import newMobile from "@/assets/work/1st-texas-new-mobile-long.webp";

// Fraction of a tall mobile screenshot visible inside the 390×844 phone screen.
const phoneShift = (img: { width: number; height: number }) => -(1 - (img.width * 844) / 390 / img.height) * 100;

/** 06 — the transformation, using real screenshots of both live sites. */
export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const compare = useRef<HTMLDivElement>(null);

  // Sweep the divider across once when the comparison scrolls into view.
  useEffect(() => {
    const el = compare.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const state = { v: 96 };
      setPos(96);
      gsap.to(state, {
        v: 50,
        duration: 1.8,
        ease: "expo.inOut",
        onUpdate: () => setPos(state.v),
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="before-after" className="section bg-paper-2">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04" className="muted mb-8">
              Case study · 1st Texas Realtors
            </SectionLabel>
            <Lines lines={["The difference,", "side by side."]} className="t-h2" />
          </div>
          <p className="t-lead lg:col-span-4 lg:col-start-9" data-reveal>
            Same family brokerage, same listings, same Google rankings. A very different first impression.
          </p>
        </div>

        {/* Desktop: drag to compare */}
        <div ref={compare} className="mt-14 md:mt-20" data-reveal>
          <BrowserFrame url={pos > 50 ? "1sttexasrealtors.com" : "1sttexasrealtors-ten.vercel.app"}>
            <div className="relative aspect-[1440/900] select-none">
              <Image src={newDesktop} alt="After: the redesigned 1st Texas Realtors homepage" fill sizes="(max-width: 1520px) 100vw, 1520px" placeholder="blur" className="object-cover object-top" />
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Image src={oldDesktop} alt="Before: the original 1st Texas Realtors homepage" fill sizes="(max-width: 1520px) 100vw, 1520px" placeholder="blur" className="object-cover object-top" />
              </div>

              <span className="t-label pointer-events-none absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-paper backdrop-blur">Before</span>
              <span className="t-label pointer-events-none absolute right-4 top-4 rounded-full bg-indigo px-3 py-1.5 text-white">After · Samtech</span>

              <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(12,13,16,.15)]" style={{ left: `${pos}%` }} aria-hidden>
                <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
                  <MoveHorizontal size={20} />
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label="Drag to compare the old and new website"
                className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
          </BrowserFrame>
          <p className="t-label muted mt-4 text-center">Drag to compare · real screenshots of both live sites</p>
        </div>

        {/* Mobile: the phone is where the business is won or lost */}
        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Lines as="h3" lines={["Same business.", "Very different", "phone."]} className="t-h2" />
            <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]" data-reveal-stagger>
              {beforeAfterChanges.map((c) => (
                <li key={c.title} className="py-4">
                  <p className="font-semibold tracking-tight">{c.title}</p>
                  <p className="muted mt-1 text-[15px]">{c.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://1sttexasrealtors-ten.vercel.app/" target="_blank" rel="noopener" className="btn btn-primary">
                View the live concept <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href="https://1sttexasrealtors.com/" target="_blank" rel="noopener" className="btn btn-ghost">
                See the original
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:col-span-6 lg:col-start-7" data-reveal>
            {[
              { img: oldMobile, label: "Before", alt: "The original 1st Texas Realtors site on a phone" },
              { img: newMobile, label: "After", alt: "The redesigned 1st Texas Realtors site on a phone" },
            ].map(({ img, label, alt }, i) => (
              <figure key={label} className={i === 1 ? "sm:translate-y-10" : ""}>
                <PhoneFrame>
                  <Image
                    src={img}
                    alt={alt}
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    placeholder="blur"
                    className="absolute inset-x-0 top-0 h-auto w-full [animation:phone-scroll_16s_ease-in-out_infinite_alternate]"
                    style={{ ["--shift" as string]: `${phoneShift(img)}%`, animationDelay: `${i * 1.2}s` }}
                  />
                </PhoneFrame>
                <figcaption className="t-label mt-4 text-center">
                  <span className={i === 1 ? "text-indigo" : "muted"}>{label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes phone-scroll{0%,12%{transform:translateY(0)}88%,100%{transform:translateY(var(--shift))}}`}</style>
    </section>
  );
}
