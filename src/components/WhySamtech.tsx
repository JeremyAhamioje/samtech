import { reasons } from "@/content/site";
import { Lines, SectionLabel } from "@/components/ui";

/** 09 — the practical difference, not agency adjectives. */
export default function WhySamtech() {
  return (
    <section id="why" className="band-dark section">
      <div className="wrap">
        <SectionLabel index="07" className="muted mb-8">
          Why Samtech
        </SectionLabel>
        <div className="grid gap-12 lg:grid-cols-12">
          <Lines
            lines={["We don't build a website", "and disappear."]}
            className="t-display text-[clamp(52px,7.4vw,128px)] lg:col-span-8"
          />
          <div className="space-y-5 lg:col-span-4 lg:pt-4" data-reveal>
            <p className="t-lead">
              Your website becomes the foundation for the rest of your digital workflow.
            </p>
            <p className="t-body muted">
              When you&apos;re ready for CRM sync, WhatsApp replies or an AI agent, it plugs straight in — built by the
              same people, in the same accounts, without starting over.
            </p>
          </div>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
          {reasons.map((r, i) => (
            <li key={r.title} className="bg-ink p-8 md:p-10">
              <span className="t-label text-volt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[22px] font-semibold leading-tight tracking-tight">{r.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/60">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
