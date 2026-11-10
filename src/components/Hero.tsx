"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, INTRO_DONE, prefersReducedMotion } from "@/lib/gsap";
import { Pinwheel } from "@/components/ui";

const ROTATE = ["customers", "leads", "bookings", "sales"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const wordBox = useRef<HTMLSpanElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  // From lg up, the shape + button sit right after the rotating word, vertically centred on that line
  // (like the badge beside the last word in the reference). Below lg they flow under the headline.
  useLayoutEffect(() => {
    const place = () => {
      const b = bottom.current, w = wordBox.current, g = group.current;
      if (!b || !w || !g) return;
      if (window.innerWidth < 1024) return setPos(null);
      // Layout offsets, not getBoundingClientRect: the intro animation transforms the line while we measure.
      let left = 0, top = 0;
      for (let n: HTMLElement | null = w; n && n !== b; n = n.offsetParent as HTMLElement | null) {
        left += n.offsetLeft;
        top += n.offsetTop;
      }
      const gap = Math.max(16, w.offsetHeight * 0.12);
      setPos({ left: left + w.offsetWidth + gap, top: top + (w.offsetHeight - g.offsetHeight) / 2 });
    };
    place();
    const ro = new ResizeObserver(place);
    if (bottom.current) ro.observe(bottom.current);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    let onIntro: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll(".hero-line > span");
      const small = el.querySelector("[data-hero-small]");
      const shape = el.querySelector("[data-hero-shape]");
      const cta = el.querySelector("[data-hero-cta]");

      gsap.set(lines, { yPercent: 115 });
      gsap.set([small, cta], { autoAlpha: 0, y: 16 });
      gsap.set(shape, { scale: 0, rotate: -120 });

      const intro = () =>
        gsap
          .timeline()
          .to(lines, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.09 })
          .to(small, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.3)
          .to(shape, { scale: 1, rotate: 0, duration: 1.2, ease: "back.out(1.6)" }, 0.55)
          .to(cta, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.7);

      // Rotating word, directional fade: the current word drifts right and fades out,
      // the next one slides in from the left behind a soft gradient edge sweeping left → right.
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.set(words, { autoAlpha: 0 });
      gsap.set(words[0], { autoAlpha: 1, "--reveal": "130%" });
      const loop = gsap.timeline({ repeat: -1, delay: 3 });
      words.forEach((w, i) => {
        const next = words[(i + 1) % words.length];
        loop
          .to(w, { x: "0.35em", autoAlpha: 0, duration: 0.6, ease: "power2.in" }, "+=1.9")
          .fromTo(
            next,
            { x: "-0.35em", autoAlpha: 1, "--reveal": "-30%" },
            { x: 0, "--reveal": "130%", duration: 0.9, ease: "power3.out", immediateRender: false },
            "-=0.15",
          );
      });

      if ((window as unknown as { __samtechIntro?: boolean }).__samtechIntro) intro();
      else {
        onIntro = () => ctx.add(intro);
        window.addEventListener(INTRO_DONE, onIntro, { once: true });
      }
    }, el);

    return () => {
      if (onIntro) window.removeEventListener(INTRO_DONE, onIntro);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[640px] flex-col justify-between overflow-hidden bg-flame text-cream h-[100svh]"
    >
      <div className="wrap pt-[96px] md:pt-[104px]">
        <p data-hero-small className="max-w-[17rem] text-[15px] font-semibold leading-snug md:text-[17px]">
          Websites &amp; digital systems for small and medium businesses
        </p>
      </div>

      <div ref={bottom} className="wrap relative pb-[clamp(20px,3vw,40px)]">
        <h1
          className="t-display !text-[clamp(64px,11.5vw,196px)] !leading-[0.86]"
          aria-label={`Websites that bring in ${ROTATE[0]}.`}
        >
          <span className="hero-line line-mask" aria-hidden>
            <span>Websites that</span>
          </span>
          <span className="hero-line line-mask" aria-hidden>
            <span>bring in</span>
          </span>
          <span className="hero-line line-mask" aria-hidden>
            <span>
              <span ref={wordBox} className="relative inline-block">
                <span className="invisible">customers.</span>
                {ROTATE.map((w, i) => (
                  <span
                    key={w}
                    data-word
                    className="dir-fade absolute left-0 top-0 whitespace-nowrap"
                    // Only the first word shows without JS or with reduced motion.
                    style={i ? { opacity: 0, visibility: "hidden" } : undefined}
                  >
                    {w}.
                  </span>
                ))}
              </span>
            </span>
          </span>
        </h1>
        <div
          ref={group}
          className={`mt-6 flex items-center gap-4 md:gap-6 ${pos ? "absolute mt-0" : ""}`}
          style={pos ? { left: pos.left, top: pos.top } : undefined}
        >
          <span data-hero-shape className="group block">
            <Pinwheel className="spin-slow block size-[clamp(60px,9vw,150px)] text-cobalt group-hover:[animation-duration:3s]" />
          </span>
          <Link
            data-hero-cta
            href="/review"
            className="inline-flex h-[clamp(56px,5vw,72px)] items-center gap-3 whitespace-nowrap rounded-full bg-cobalt px-[clamp(20px,2.2vw,34px)] text-[clamp(15px,1.25vw,19px)] font-semibold text-cream transition-colors duration-300 hover:bg-cream hover:text-cobalt"
          >
            Get a free website review <ArrowUpRight size={20} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
