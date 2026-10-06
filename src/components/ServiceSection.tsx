import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/content/site";
import ServiceVisual from "@/components/ServiceVisual";
import { Lines } from "@/components/ui";

/**
 * One service = one story = one visual. Readable on its own:
 * number → title → one sentence → short explanation → what's included →
 * a real example → next step. Alternates sides for rhythm.
 */
export default function ServiceSection({ service, reverse = false }: { service: Service; reverse?: boolean }) {
  return (
    <section id={service.id} aria-labelledby={`${service.id}-title`} className="scroll-mt-20 border-t border-[var(--line)] py-[clamp(72px,9vw,136px)]">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : ""}`}>
          <div className="flex items-center gap-4">
            <span className="font-display text-[64px] font-extrabold leading-none text-indigo md:text-[88px]">{service.number}</span>
            <span className="t-label muted max-w-[8rem]">{service.kicker}</span>
          </div>

          <Lines as="h3" id={`${service.id}-title`} lines={[service.title]} className="t-h2 mt-6" />

          <p className="t-lead mt-6 max-w-[30rem]" data-reveal>
            {service.summary}
          </p>
          <p className="t-body muted mt-5" data-reveal>
            {service.body}
          </p>

          <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2" data-reveal-stagger>
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px]">
                <Check size={16} className="mt-1 shrink-0 text-indigo" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <a href={service.cta.href} className="link-arrow mt-10">
            {service.cta.label} <ArrowRight size={15} aria-hidden />
          </a>
        </div>

        <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:col-start-6"} lg:pl-6`}>
          <div data-reveal>
            <ServiceVisual service={service} />
          </div>
          <aside className="mt-5 rounded-[20px] bg-paper-2 p-6 md:p-7" data-reveal>
            <p className="t-label text-indigo">{service.example.label}</p>
            <p className="mt-3 text-[15px] leading-relaxed">{service.example.text}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
