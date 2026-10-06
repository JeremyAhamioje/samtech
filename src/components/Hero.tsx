"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, INTRO_DONE, prefersReducedMotion } from "@/lib/gsap";
import { BrowserFrame } from "@/components/ui";
import txLong from "@/assets/work/1st-texas-new-desktop-long.webp";

const ROTATE = ["customers", "leads", "bookings", "sales"];

const facts = [
  { k: "Engagement", v: "Fixed price, no retainers" },
  { k: "Ownership", v: "Yours, fully" },
  { k: "Review", v: "Free, within 24 hours" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    let onIntro: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll(".hero-line > span");
      const fade = el.querySelectorAll("[data-hero-fade]");
      const frame = el.querySelector("[data-hero-frame]");
      gsap.set(lines, { yPercent: 115 });
      gsap.set(fade, { autoAlpha: 0, y: 18 });
      gsap.set(frame, { autoAlpha: 0, y: 80 });

      const intro = () =>
        gsap
          .timeline()
          .to(lines, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.09 })
          .to(fade, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0.35)
          .to(frame, { autoAlpha: 1, y: 0, duration: 1.4, ease: "expo.out" }, 0.5);

      if ((window as unknown as { __samtechIntro?: boolean }).__samtechIntro) intro();
      else {
        onIntro = () => ctx.add(intro);
        window.addEventListener(INTRO_DONE, onIntro, { once: true });
      }

      // Rotating last word: each word slides up out of a mask.
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.set(words, { yPercent: 105 });
      gsap.set(words[0], { yPercent: 0 });
      const loop = gsap.timeline({ repeat: -1, delay: 3.2 });
      words.forEach((w, i) => {
        const next = words[(i + 1) % words.length];
        loop
          .to(w, { yPercent: -105, duration: 0.7, ease: "expo.inOut" }, "+=1.8")
          // immediateRender:false — otherwise building the last step would hide word 0 up front
          .fromTo(next, { yPercent: 105 }, { yPercent: 0, duration: 0.7, ease: "expo.inOut", immediateRender: false }, "<");
      });

      // The showcase: the real build scrolls inside its browser as you scroll the page.
      const shot = el.querySelector("[data-hero-shot]");
      gsap.to(shot, {
        yPercent: -58,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top 70%", end: "bottom top", scrub: 0.6 },
      });
      gsap.fromTo(
        frame,
        { scale: 0.94 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "top 30%", scrub: true } },
      );
    }, el);

    return () => {
      if (onIntro) window.removeEventListener(INTRO_DONE, onIntro);
      ctx.revert();
    };
  }, []);

  return (
    <section id="top" ref={root} className="relative overflow-hidden pt-[112px] md:pt-[136px]">
      <div className="wrap">
        <p data-hero-fade className="t-label muted mb-8 flex flex-wrap gap-x-3 md:mb-12">
          <span className="text-indigo">Samtech Studio</span>
          <span aria-hidden>/</span>
          <span>Websites &amp; digital systems for small and medium businesses</span>
        </p>

        <h1 className="t-display" aria-label={`Websites that bring in ${ROTATE[0]}.`}>
          <span className="hero-line line-mask" aria-hidden>
            <span>Websites that</span>
          </span>
          <span className="hero-line line-mask" aria-hidden>
            <span>
              bring in{" "}
              <span className="relative inline-block overflow-hidden align-bottom text-indigo">
                <span className="invisible">customers.</span>
                {ROTATE.map((w) => (
                  <span key={w} data-word className="absolute left-0 top-0">
                    {w}.
                  </span>
                ))}
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p data-hero-fade className="t-lead max-w-[34rem]">
              We design and build fast, modern websites for small and medium businesses — then connect them to the
              systems that run the business, so every visitor has a clear way to become a customer.
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn btn-primary">
                Get a free website review <ArrowUpRight size={17} aria-hidden />
              </a>
              <a href="#work" className="btn btn-ghost">
                See the work <ArrowDown size={16} aria-hidden />
              </a>
            </div>
          </div>
          <dl data-hero-fade className="md:col-span-5 md:col-start-8">
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-3.5">
                <dt className="t-label muted">{f.k}</dt>
                <dd className="text-right text-[15px] font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="mt-16 md:mt-24">
          <div data-hero-frame className="origin-top">
            <BrowserFrame url="1sttexasrealtors-ten.vercel.app">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  data-hero-shot
                  src={txLong}
                  alt="The 1st Texas Realtors website Samtech redesigned, scrolling from the home search to listings"
                  priority
                  sizes="(max-width: 1520px) 100vw, 1520px"
                  className="absolute inset-x-0 top-0 h-auto w-full will-change-transform"
                  placeholder="blur"
                />
              </div>
            </BrowserFrame>
          </div>
          <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[14px]">
            <span className="muted">
              <span className="t-label text-indigo">Recent build</span>&nbsp;&nbsp;1st Texas Realtors — Clear Lake, Texas
            </span>
            <a href="#before-after" className="link-arrow">
              See the before &amp; after <ArrowDown size={14} aria-hidden />
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
