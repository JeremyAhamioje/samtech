import { Plus } from "lucide-react";
import { contact, faqs } from "@/content/site";
import { Lines, SectionLabel } from "@/components/ui";

/** Native <details> accordion — accessible and zero JS. */
export default function Faq() {
  return (
    <section id="faq" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="08" className="muted mb-8">
            FAQ
          </SectionLabel>
          <Lines lines={["Questions owners", "actually ask."]} className="t-h2" />
          <p className="t-body muted mt-8" data-reveal>
            Something not covered? Ask it on a free 30-minute call — you&apos;ll get a straight answer whether or not you
            hire us.{" "}
            <a href={contact.callHref} className="link-arrow text-ink">
              Book a call
            </a>
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-[var(--line)] first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] font-semibold tracking-tight md:text-[22px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="shrink-0 transition-transform duration-300 group-open:rotate-45" size={20} aria-hidden />
              </summary>
              <p className="t-body muted max-w-[44rem] pb-7">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
