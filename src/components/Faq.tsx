import { Plus } from "lucide-react";
import { contact, faqs } from "@/content/site";
import { Lines, Pinwheel } from "@/components/ui";

/** Native <details> accordion: accessible and zero JS. */
export default function Faq() {
  return (
    <section id="faq" className="section scroll-mt-16 border-t border-ink/15">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2.5 font-display text-[clamp(26px,2.2vw,34px)] font-extrabold uppercase leading-none">
            <Pinwheel className="spin-slow size-[1em] text-cobalt" hubClassName="fill-paper" />
            FAQ
          </p>
          <Lines lines={["Questions", "owners", "actually ask."]} className="t-display mt-[clamp(32px,4vw,56px)] !text-[clamp(56px,7vw,118px)]" />
          <p className="mt-8 max-w-[24rem] text-[17px] leading-snug text-ink/65" data-reveal>
            Something not covered? Ask it on a free 30-minute call. You&apos;ll get a straight answer whether or not you
            hire us.{" "}
            <a href={contact.callHref} className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Book a call
            </a>
          </p>
        </div>

        <div className="lg:col-span-7 lg:pt-[clamp(58px,6.2vw,90px)]">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-ink/15 first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 md:py-7 [&::-webkit-details-marker]:hidden">
                <span className="text-[clamp(19px,1.6vw,24px)] font-semibold leading-snug tracking-tight transition-colors group-open:text-flame">
                  {f.q}
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/80 transition-[background,color,border-color,transform] duration-300 group-open:rotate-45 group-open:border-flame group-open:bg-flame group-open:text-cream">
                  <Plus size={20} aria-hidden />
                </span>
              </summary>
              <p className="max-w-[44rem] pb-8 pr-16 text-[16px] leading-relaxed text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
