import { ArrowUpRight, Bot, LayoutDashboard, Search } from "lucide-react";
import { automationWork, featuredWork } from "@/content/site";
import CaseStudyCard from "@/components/CaseStudyCard";
import { Lines, SectionLabel } from "@/components/ui";

const automationIcons = [Bot, LayoutDashboard, Search];

/** 04 — evidence before claims: real builds, shown large, early in the page. */
export default function SelectedWork() {
  return (
    <section id="work" className="band-dark section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="02" className="muted mb-8">
              Selected work
            </SectionLabel>
            <Lines lines={["Real builds.", "Judge for yourself."]} className="t-h2" />
          </div>
          <p className="t-body muted max-w-[22rem]" data-reveal>
            Websites we&apos;ve designed and built, and the automation behind the scenes. Click through — they&apos;re live.
          </p>
        </div>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
          {featuredWork.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i + 1} reverse={i % 2 === 1} />
          ))}
        </div>

        {/* Automation work */}
        <div className="mt-24 border-t border-[var(--line)] pt-14 md:mt-32">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="t-h3">Automation work</h3>
            <p className="t-label muted">Client names withheld by agreement</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal-stagger>
            {automationWork.map((c, i) => {
              const Icon = automationIcons[i];
              return (
                <article key={c.title} className="flex flex-col rounded-[20px] bg-ink-2 p-7 ring-1 ring-white/5">
                  <Icon className="text-indigo" size={22} aria-hidden />
                  <p className="t-label muted mt-6">{c.sector}</p>
                  <h4 className="mt-2 text-[20px] font-semibold leading-tight tracking-tight">{c.title}</h4>
                  <dl className="mt-6 space-y-3 text-[14px] leading-relaxed">
                    <div>
                      <dt className="sr-only">Problem</dt>
                      <dd className="text-paper/55">{c.problem}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">What changed</dt>
                      <dd className="text-paper/85">{c.change}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Result</dt>
                      <dd className="text-volt">{c.result}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
            <a
              href="#contact"
              className="group flex flex-col justify-between rounded-[20px] border border-dashed border-white/20 p-7 transition-colors hover:border-volt"
            >
              <p className="t-label muted">Next</p>
              <div>
                <p className="t-h3">Your business could be the next one here.</p>
                <p className="mt-3 text-[14px] text-paper/60">
                  Every free review comes with a homepage concept of your own site, on a live link.
                </p>
                <span className="link-arrow mt-6 text-volt">
                  Request my concept <ArrowUpRight size={15} aria-hidden />
                </span>
              </div>
            </a>
          </div>
          <p className="muted mt-6 text-[14px]">Happy to walk through any of these on a call.</p>
        </div>
      </div>
    </section>
  );
}
