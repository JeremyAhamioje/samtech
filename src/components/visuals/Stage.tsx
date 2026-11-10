"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export type Tone = "flame" | "cobalt" | "ink";
type Q = (selector: string) => Element[];
/** Builds one loop of the animation. `step(i)` marks storyboard step i as current. */
export type Build = (tl: gsap.core.Timeline, q: Q, step: (i: number) => void) => void;

const toneBg: Record<Tone, string> = { flame: "bg-flame", cobalt: "bg-cobalt", ink: "bg-ink" };
const toneNow: Record<Tone, string> = {
  flame: "data-[on=now]:text-flame",
  cobalt: "data-[on=now]:text-cobalt",
  ink: "data-[on=now]:text-ink",
};

/**
 * Shared frame for the service animations: a coloured stage that scales with its own width
 * (children size themselves in cqw), a storyboard bar along the bottom, and a looping GSAP
 * timeline that only runs while the stage is on screen.
 */
export default function Stage({
  tone,
  steps,
  label,
  build,
  children,
}: {
  tone: Tone;
  steps: string[];
  label: string;
  build: Build;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stepEls = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const step = (i: number) =>
      stepEls.forEach((s, j) => (s.dataset.on = j < i ? "done" : j === i ? "now" : "off"));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, paused: true });
      build(tl, gsap.utils.selector(el), step);
      if (prefersReducedMotion()) {
        // Show the finished story, still.
        tl.progress(0.97).pause();
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    }, el);
    return () => ctx.revert();
  }, [build]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`@container relative aspect-[5/4] w-full overflow-hidden rounded-[28px] text-cream ${toneBg[tone]}`}
    >
      {/* The scene: everything inside sizes in cqw so it scales with the stage */}
      <div className="absolute inset-x-0 top-0 bottom-[13cqw]" aria-hidden>
        {children}
      </div>

      {/* Storyboard */}
      <ol className="absolute inset-x-[4cqw] bottom-[4cqw] flex flex-wrap gap-[1.2cqw]" aria-hidden>
        {steps.map((s, i) => (
          <li
            key={s}
            data-step
            data-on={i === 0 ? "now" : "off"}
            className={`rounded-full border border-cream/35 px-[2cqw] py-[0.9cqw] text-[max(10px,1.9cqw)] font-semibold leading-none text-cream/50 transition-colors duration-300 data-[on=done]:text-cream/85 data-[on=now]:border-cream data-[on=now]:bg-cream ${toneNow[tone]}`}
          >
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
