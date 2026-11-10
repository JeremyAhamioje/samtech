import { industries } from "@/content/site";
import { Lines, Pinwheel } from "@/components/ui";

/** Who it's for: a big typographic list on orange. Real builds get a "Built" tag. */
export default function IndustrySection() {
  return (
    <section id="industries" className="section scroll-mt-16 bg-flame text-cream">
      <div className="wrap">
        <p className="flex items-center gap-2.5 font-display text-[clamp(26px,2.2vw,34px)] font-extrabold uppercase leading-none">
          <Pinwheel className="spin-slow size-[1em] text-cobalt" hubClassName="fill-flame" />
          Who it&apos;s for
        </p>
        <div className="mt-[clamp(32px,4vw,56px)] flex flex-wrap items-end justify-between gap-8">
          <Lines lines={["Businesses that", "run on inquiries."]} className="t-display !text-[clamp(56px,8.4vw,140px)]" />
          <p className="max-w-[22rem] text-[17px] leading-snug text-cream/85" data-reveal>
            If customers find you online and then call, message or fill in a form, the same building blocks apply.
          </p>
        </div>

        <ul className="mt-16 border-t border-cream/40 md:mt-24" data-reveal-stagger>
          {industries.map((ind) => (
            <li
              key={ind.name}
              className="group grid gap-x-10 gap-y-3 border-b border-cream/40 py-7 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center md:py-9"
            >
              <h3 className="flex items-center font-display text-[clamp(40px,5vw,84px)] font-extrabold uppercase leading-[0.9]">
                {/* The pinwheel grows in from zero width on hover, nudging the name along */}
                <span className="hidden w-0 shrink-0 overflow-hidden transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-[0.85em] md:block" aria-hidden>
                  <Pinwheel className="spin-slow block size-[0.6em] text-cobalt" hubClassName="fill-flame" />
                </span>
                {ind.name}
              </h3>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <p className="max-w-[26rem] text-[clamp(16px,1.25vw,19px)] leading-snug">{ind.text}</p>
                {ind.proof && (
                  <span className="shrink-0 rounded-full bg-cobalt px-4 py-2 text-[14px] font-semibold leading-tight">
                    Built: {ind.proof}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
