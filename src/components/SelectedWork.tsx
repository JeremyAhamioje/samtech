import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { automationWork, featuredWork } from "@/content/site";
import CaseStudyCard from "@/components/CaseStudyCard";
import { Lines, Pinwheel } from "@/components/ui";

/** Real builds on the hero-button blue: each site on a laptop, then the automation work. */
export default function SelectedWork() {
  return (
    <section id="work" className="section scroll-mt-16 bg-cobalt text-cream">
      <div className="wrap">
        <p className="flex items-center gap-2.5 font-display text-[clamp(26px,2.2vw,34px)] font-extrabold uppercase leading-none">
          <Pinwheel className="spin-slow size-[1em] text-flame" hubClassName="fill-cobalt" />
          Work
        </p>
        <div className="mt-[clamp(32px,4vw,56px)] flex flex-wrap items-end justify-between gap-8">
          <Lines lines={["Real builds.", "Judge for yourself."]} className="t-display !text-[clamp(56px,8.4vw,140px)]" />
          <p className="max-w-[22rem] text-[17px] leading-snug text-cream/80" data-reveal>
            Websites we&apos;ve designed and built. Hover a screen to scroll it, or click through — they&apos;re live.
          </p>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-36">
          {featuredWork.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i + 1} reverse={i % 2 === 1} />
          ))}
        </div>

        {/* Automation work */}
        <div className="mt-28 border-t border-cream/25 pt-14 md:mt-36">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-display text-[clamp(36px,3.6vw,60px)] font-extrabold uppercase leading-none">Automation work</h3>
            <p className="text-[14px] font-medium text-cream/60">Client names withheld by agreement</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal-stagger>
            {automationWork.map((c) => (
              <article key={c.title} className="flex flex-col rounded-[24px] border border-cream/25 p-7">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cream/60">{c.sector}</p>
                <h4 className="mt-3 text-[21px] font-semibold leading-tight tracking-tight">{c.title}</h4>
                <p className="mt-5 text-[15px] leading-relaxed text-cream/75">{c.change}</p>
                <p className="mt-auto pt-6 text-[15px] font-semibold leading-snug">
                  <span className="mb-2 block h-[3px] w-8 rounded-full bg-flame" aria-hidden />
                  {c.result}
                </p>
              </article>
            ))}
            <Link
              href="/review"
              className="group flex flex-col justify-between gap-10 rounded-[24px] bg-flame p-7 transition-colors duration-300 hover:bg-cream hover:text-cobalt"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] opacity-75">Next</p>
              <div>
                <p className="font-display text-[clamp(30px,2.4vw,40px)] font-extrabold uppercase leading-[0.92]">
                  Your business could be the next one here.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold">
                  Get a free website review
                  <ArrowUpRight size={17} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
