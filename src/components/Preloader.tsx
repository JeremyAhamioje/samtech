"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, INTRO_DONE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Minimal: an off-white screen, "samtech" fades in, then "studio" fades in
 * underneath it; both fade out and the panel wipes upward into the hero.
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

    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) {
      const t = gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.1, onComplete: finish });
      return () => {
        t.kill();
      };
    }

    const ctx = gsap.context(() => {
      const marks = el.querySelectorAll("[data-mark]");
      gsap
        .timeline({ onComplete: finish })
        // The fade-ins are CSS (they run at first paint, before JS); GSAP holds, then fades both out.
        .to(marks, { autoAlpha: 0, y: -8, duration: 0.5, ease: "power2.in", stagger: 0.06 },
          // Counted from first paint, so a slow hydration doesn't stretch the hold.
          Math.max(0.3, 2.2 - performance.now() / 1000))
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "-=0.1");
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
        className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-[#f4efe9]"
        style={{ clipPath: "inset(0% 0% 0% 0%)", animation: "preloader-failsafe 0s 6s forwards" }}
        aria-hidden="true"
      >
        <style>{`@keyframes preloader-failsafe{to{visibility:hidden;opacity:0}}@keyframes preloader-mark{from{opacity:0;transform:translateY(12px)}}`}</style>
        <div className="flex flex-col items-center text-[clamp(32px,2.6vw,44px)] font-medium leading-[1.05] tracking-[-0.03em]">
          {/* samtech first, then studio fades in underneath it */}
          <span data-mark className="text-[#4a4744]" style={{ animation: "preloader-mark 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both" }}>
            samtech
          </span>
          <span data-mark className="text-[#a29d97]" style={{ animation: "preloader-mark 0.9s 0.85s cubic-bezier(0.16,1,0.3,1) both" }}>
            studio
          </span>
        </div>
      </div>
    </>
  );
}
