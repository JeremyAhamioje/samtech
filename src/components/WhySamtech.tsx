import { reasons } from "@/content/site";
import { Lines, Pinwheel } from "@/components/ui";

/** Why Samtech: the headline holds still while the six practical reasons scroll past. */
export default function WhySamtech() {
  return (
    <section id="why" className="section scroll-mt-16">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-2.5 font-display text-[clamp(26px,2.2vw,34px)] font-extrabold uppercase leading-none">
              <Pinwheel className="spin-slow size-[1em] text-flame" hubClassName="fill-paper" />
              Why Samtech
            </p>
            <Lines
              lines={["We don't build", "a website", "and disappear."]}
              className="t-display mt-[clamp(32px,4vw,56px)] !text-[clamp(52px,6.1vw,104px)]"
            />
            <p className="mt-8 max-w-[28rem] text-[clamp(17px,1.35vw,20px)] leading-snug" data-reveal>
              Your website becomes the foundation for the rest of your digital workflow. When you&apos;re ready for CRM
              sync, WhatsApp replies or an AI agent, it plugs straight in — same people, same accounts, no starting
              over.
            </p>
          </div>
        </div>

        <ol className="border-t border-ink/15 lg:col-span-6 lg:mt-2" data-reveal-stagger>
          {reasons.map((r, i) => (
            <li key={r.title} className="grid grid-cols-[clamp(56px,6vw,96px)_1fr] gap-4 border-b border-ink/15 py-8 md:py-10">
              <span className="font-display text-[clamp(40px,4.4vw,72px)] font-extrabold leading-[0.85] text-flame">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[clamp(28px,2.6vw,42px)] font-extrabold uppercase leading-[0.95]">{r.title}</h3>
                <p className="mt-3 max-w-[30rem] text-[16px] leading-relaxed text-ink/65">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
