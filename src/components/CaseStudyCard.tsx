import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/site";
import { Laptop } from "@/components/Devices";

const SCREEN_RATIO = 10 / 16; // laptop screen height / width

/** One real build: the site on a laptop (scrolls on hover), then a short, minimal caption. */
export default function CaseStudyCard({ study, index, reverse = false }: { study: CaseStudy; index: number; reverse?: boolean }) {
  const long = study.scrollImage;
  // How far the tall screenshot must travel so its bottom meets the screen's bottom.
  const shift = long ? -(1 - (long.width * SCREEN_RATIO) / long.height) * 100 : 0;

  return (
    <article className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className={`min-w-0 px-[4%] lg:col-span-7 ${reverse ? "lg:order-2" : ""}`} data-reveal>
        <a
          href={study.link?.href}
          target="_blank"
          rel="noopener"
          className="group block transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-1.5"
          aria-label={`${study.client} — ${study.link?.label ?? "view"}`}
        >
          <Laptop>
            <Image
              src={long ?? study.image}
              alt={study.imageAlt}
              sizes="(max-width: 1024px) 92vw, 54vw"
              placeholder="blur"
              className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[2600ms] ease-[cubic-bezier(.45,0,.2,1)] group-hover:translate-y-[var(--shift)]"
              style={{ ["--shift" as string]: `${shift}%` }}
            />
          </Laptop>
        </a>
      </div>

      <div className={`min-w-0 lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium text-cream/70">
          <span className="font-display text-[22px] font-extrabold text-cream">{String(index).padStart(2, "0")}</span>
          {study.meta}
        </p>
        <h3 className="mt-4 font-display text-[clamp(48px,5.4vw,92px)] font-extrabold uppercase leading-[0.88]">{study.client}</h3>
        <p className="mt-6 max-w-[30rem] text-[clamp(17px,1.35vw,20px)] leading-snug">{study.summary}</p>

        <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Scope">
          {study.tags.map((t) => (
            <li key={t} className="rounded-full border border-cream/70 px-4 py-2 text-[15px] leading-tight">
              {t}
            </li>
          ))}
        </ul>

        {study.link && (
          <a
            href={study.link.href}
            target="_blank"
            rel="noopener"
            className="mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-flame px-7 text-[16px] font-semibold text-cream transition-colors duration-300 hover:bg-cream hover:text-cobalt"
          >
            {study.link.label} <ArrowUpRight size={18} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}
