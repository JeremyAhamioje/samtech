import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/site";
import { BrowserFrame } from "@/components/ui";

const FRAME_RATIO = 10 / 16; // preview viewport height / width

/** Large, image-led case study. The tall screenshot scrolls inside the frame on hover. */
export default function CaseStudyCard({ study, index, reverse = false }: { study: CaseStudy; index: number; reverse?: boolean }) {
  const long = study.scrollImage;
  // How far the tall screenshot must travel so its bottom meets the frame's bottom.
  const shift = long ? -(1 - (long.width * FRAME_RATIO) / long.height) * 100 : 0;
  const host = study.link ? new URL(study.link.href).host : study.client;

  return (
    <article className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
      <div className={`min-w-0 lg:col-span-7 ${reverse ? "lg:order-2" : ""}`} data-reveal>
        <a href={study.link?.href} target="_blank" rel="noopener" className="group block" aria-label={`${study.client} — ${study.link?.label ?? "view"}`}>
          <BrowserFrame url={host}>
            <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
              <Image
                src={long ?? study.image}
                alt={study.imageAlt}
                sizes="(max-width: 1024px) 100vw, 58vw"
                placeholder="blur"
                className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[2600ms] ease-[cubic-bezier(.45,0,.2,1)] group-hover:translate-y-[var(--shift)]"
                style={{ ["--shift" as string]: `${shift}%` }}
              />
            </div>
          </BrowserFrame>
        </a>
      </div>

      <div className={`min-w-0 lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <p className="t-label flex flex-wrap gap-x-3 gap-y-1">
          <span className="text-volt">{String(index).padStart(2, "0")}</span>
          <span className="muted">{study.meta}</span>
        </p>
        <h3 className="t-h2 mt-5">{study.client}</h3>
        <p className="t-label mt-4 inline-flex rounded-full border border-[var(--line)] px-3 py-1.5 text-paper/80">{study.status}</p>
        <p className="t-lead mt-6 max-w-[30rem] text-paper/85">{study.summary}</p>

        <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]" data-reveal-stagger>
          {(
            [
              ["Problem", study.problem],
              ["What we changed", study.change],
              ["Result", study.result],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
              <dt className="t-label muted pt-0.5">{k}</dt>
              <dd className="text-[15px] leading-relaxed text-paper/85">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          {study.link && (
            <a href={study.link.href} target="_blank" rel="noopener" className="btn btn-volt h-11 px-5 text-[14px]">
              {study.link.label} <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
          <ul className="flex flex-wrap gap-2" aria-label="Scope">
            {study.tags.map((t) => (
              <li key={t} className="chip text-paper/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
