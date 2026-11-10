"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicePath, services } from "@/content/site";
import { Pinwheel } from "@/components/ui";
import { Laptop, Phone } from "@/components/Devices";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import txOldDesktop from "@/assets/work/1st-texas-old-desktop.webp";
import txNewDesktop from "@/assets/work/1st-texas-new-desktop.webp";
import txOldMobile from "@/assets/work/1st-texas-old-mobile.webp";
import txNewMobile from "@/assets/work/1st-texas-new-mobile.webp";

/**
 * Before/after inside a device screen. The "after" layer is clipped to the left of --split,
 * and a line rides the seam. GSAP drives --split on the parent.
 */
function BeforeAfterScreen({ before, after, sizes, alt, small }: {
  before: StaticImageData; after: StaticImageData; sizes: string; alt: string; small?: boolean;
}) {
  const pill = `absolute top-[7%] z-10 rounded-full font-semibold uppercase tracking-[0.1em] ${
    small ? "px-1.5 py-0.5 text-[7px]" : "px-2.5 py-1 text-[10px]"
  }`;
  return (
    <div data-split className="absolute inset-0" style={{ ["--split" as string]: "0%" }}>
      <Image src={before} alt={`${alt} — before`} sizes={sizes} placeholder="blur" className="absolute inset-0 size-full object-cover object-top" />
      <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--split)) 0 0)" }}>
        <Image src={after} alt={`${alt} — after`} sizes={sizes} placeholder="blur" className="absolute inset-0 size-full object-cover object-top" />
      </div>
      {/* Labels fade with the split: "Before" while mostly old, "After" while mostly new */}
      <span data-label-before className={`${pill} right-[5%] bg-ink/80 text-paper`}>Before</span>
      <span data-label-after className={`${pill} left-[5%] bg-flame text-cream opacity-0`}>After</span>
      {/* The seam */}
      <span data-seam className="absolute inset-y-0 z-10 w-[2px] -translate-x-1/2 bg-cream opacity-0 shadow-[0_0_12px_rgba(0,0,0,0.35)]" style={{ left: "var(--split)" }} aria-hidden>
        <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-md ring-2 ring-flame ${small ? "size-3" : "size-5"}`} />
      </span>
    </div>
  );
}

/**
 * Services as an accordion: the open service is orange with its summary and what's included;
 * the rest sit as large muted titles. On the right, 1st Texas Realtors before/after on a laptop and a phone.
 */
export default function BuildsOverview() {
  const [active, setActive] = useState(0);
  const devices = useRef<HTMLDivElement>(null);

  // Auto before/after: the seam sweeps across to reveal the new site, holds, then sweeps back.
  useEffect(() => {
    const el = devices.current;
    if (!el) return;
    const splits = el.querySelectorAll<HTMLElement>("[data-split]");
    if (prefersReducedMotion()) {
      splits.forEach((n) => n.style.setProperty("--split", "100%"));
      return;
    }
    const ctx = gsap.context(() => {
      // One sweep per screen, scoped to that screen's own labels.
      const sweep = (n: HTMLElement, to: "0%" | "100%") => {
        const showAfter = to === "100%";
        const seam = n.querySelector("[data-seam]");
        return gsap
          .timeline()
          .to(seam, { opacity: 1, duration: 0.25 })
          .to(n, { "--split": to, duration: 2, ease: "power2.inOut" }, 0)
          .to(seam, { opacity: 0, duration: 0.3 }, 1.8)
          .to(n.querySelector("[data-label-before]"), { opacity: showAfter ? 0 : 1, duration: 0.35 }, 0.8)
          .to(n.querySelector("[data-label-after]"), { opacity: showAfter ? 1 : 0, duration: 0.35 }, 0.8);
      };
      // Sequenced, never simultaneous: laptop → phone → hold → laptop back → phone back.
      const [laptop, phone] = Array.from(splits);
      gsap
        .timeline({ repeat: -1, delay: 1.2 })
        .add(sweep(laptop, "100%"))
        .add(sweep(phone, "100%"), "+=0.5")
        .add(sweep(laptop, "0%"), "+=2.2")
        .add(sweep(phone, "0%"), "+=0.5")
        .to({}, { duration: 1.6 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section scroll-mt-16">
      <div className="wrap">
        <h2 className="mb-[clamp(40px,5vw,72px)] flex items-center gap-2.5 font-display text-[clamp(26px,2.2vw,34px)] font-extrabold uppercase leading-none">
          <Pinwheel className="spin-slow size-[1em] text-ink" hubClassName="fill-paper" />
          Services
        </h2>

        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-10">
          <ul className="lg:col-span-7 lg:pl-[6%]">
            {services.map((s, i) => {
              const open = i === active;
              return (
                <li key={s.id} className="py-[clamp(6px,0.9vw,14px)]">
                  <h3 className="flex items-center gap-[0.25em] font-display text-[clamp(40px,4.6vw,78px)] font-extrabold uppercase leading-[0.9]">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`svc-${s.id}`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
                      className={`text-left uppercase transition-colors duration-500 ${
                        open ? "text-flame" : "text-[#c6bcb2] hover:text-[#a99d92]"
                      }`}
                    >
                      {s.title}
                    </button>
                    {/* Arrow to the service's own page, on every title */}
                    <Link
                      href={servicePath(s)}
                      aria-label={`${s.title} — read more`}
                      className={`grid size-[0.62em] shrink-0 place-items-center rounded-full text-cream transition-colors duration-500 hover:bg-ink ${
                        open ? "bg-flame" : "bg-[#c6bcb2]"
                      }`}
                    >
                      <ArrowUpRight className="size-[0.36em]" aria-hidden />
                    </Link>
                  </h3>
                  {/* 0fr → 1fr grid rows: a smooth height transition without measuring */}
                  <div
                    id={`svc-${s.id}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-expo)] ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!open}>
                      <p className="pt-4 text-[clamp(17px,1.3vw,20px)] leading-snug">{s.summary}</p>
                      <ul className="flex flex-wrap gap-2.5 pb-3 pt-6">
                        {s.includes.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-ink/80 px-4 py-2 text-[15px] leading-tight md:px-5 md:py-2.5 md:text-[16px]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div ref={devices} className="relative mx-auto w-full max-w-[640px] pb-[10%] pr-[8%] lg:col-span-5" data-reveal>
            <Laptop>
              <BeforeAfterScreen
                before={txOldDesktop}
                after={txNewDesktop}
                sizes="(max-width: 1024px) 90vw, 560px"
                alt="1st Texas Realtors website on a laptop"
              />
            </Laptop>
            <Phone className="!absolute bottom-0 right-0 w-[29%]">
              <BeforeAfterScreen
                small
                before={txOldMobile}
                after={txNewMobile}
                sizes="200px"
                alt="1st Texas Realtors website on a phone"
              />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
