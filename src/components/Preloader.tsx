"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, INTRO_DONE, prefersReducedMotion } from "@/lib/gsap";

const WORD = "samtech";
const SUFFIX = ".studio";
const SEEN_KEY = "samtech-intro-seen";

/**
 * The wordmark types itself like code, a progress rule fills, then the panel
 * wipes upward into the hero. Repeat visits in a session get a 0.4s fade.
 * Server-rendered so there's no flash of the page; a CSS failsafe hides it
 * if JavaScript never runs.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const finish = () => {
      document.documentElement.style.overflow = "";
      (window as unknown as { __samtechIntro?: boolean }).__samtechIntro = true;
      window.dispatchEvent(new Event(INTRO_DONE));
      setGone(true);
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage blocked */
    }

    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    if (prefersReducedMotion() || seen) {
      const t = gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.1, onComplete: finish });
      return () => {
        t.kill();
      };
    }

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll("[data-char]");
      const suffix = el.querySelector("[data-suffix]");
      const caret = el.querySelector("[data-caret]");
      const bar = el.querySelector("[data-bar]");
      const meta = el.querySelectorAll("[data-meta]");

      gsap
        .timeline({ onComplete: finish })
        .set(chars, { autoAlpha: 0 })
        .set(suffix, { autoAlpha: 0, x: -6 })
        .from(meta, { autoAlpha: 0, duration: 0.5, stagger: 0.08 })
        .to(chars, { autoAlpha: 1, duration: 0.01, stagger: 0.075 }, 0.15)
        .to(bar, { scaleX: 0.7, duration: 0.6, ease: "power2.out" }, 0.15)
        .to(suffix, { autoAlpha: 1, x: 0, duration: 0.45, ease: "expo.out" }, ">-0.05")
        .to(bar, { scaleX: 1, duration: 0.35, ease: "power2.inOut" }, "<")
        .to(caret, { autoAlpha: 0, duration: 0.01, repeat: 3, yoyo: true, repeatDelay: 0.12 }, "<")
        .to(el.querySelector("[data-stage]"), { yPercent: -40, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "-=0.35");
    }, el);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <noscript>
        <style>{`.preloader{display:none!important}`}</style>
      </noscript>
      <div
        ref={root}
        className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-ink text-paper"
        style={{ clipPath: "inset(0% 0% 0% 0%)", animation: "preloader-failsafe 0s 6s forwards" }}
        aria-hidden="true"
      >
        <style>{`@keyframes preloader-failsafe{to{visibility:hidden;opacity:0}}`}</style>
        <div data-stage className="flex flex-col items-center gap-6">
          <p className="font-mono text-[clamp(28px,4vw,52px)] tracking-tight">
            {WORD.split("").map((c, i) => (
              <span key={i} data-char>
                {c}
              </span>
            ))}
            <span data-suffix className="text-indigo">
              {SUFFIX}
            </span>
            <span data-caret className="ml-1 inline-block h-[0.9em] w-[0.08em] translate-y-[0.12em] bg-volt" />
          </p>
          <span className="block h-px w-[min(240px,50vw)] bg-white/15">
            <span data-bar className="block h-px w-full origin-left scale-x-0 bg-paper" />
          </span>
        </div>
        <p data-meta className="t-label absolute bottom-8 left-[var(--gutter)] text-mute-dark">
          Websites &amp; digital systems
        </p>
        <p data-meta className="t-label absolute bottom-8 right-[var(--gutter)] text-mute-dark">
          Remote · Worldwide
        </p>
      </div>
    </>
  );
}
