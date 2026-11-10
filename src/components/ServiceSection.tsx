import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicePath, type Service } from "@/content/site";
import ServiceVisual from "@/components/ServiceVisual";
import { Lines } from "@/components/ui";

/**
 * One service, one story, one animation. Number + kicker → big title → one sentence →
 * short explanation → what's included as chips → a real example → next step.
 * Alternates sides for rhythm.
 */
export default function ServiceSection({ service, reverse = false }: { service: Service; reverse?: boolean }) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="scroll-mt-20 border-t border-[var(--line)] py-[clamp(72px,9vw,136px)]"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className={`min-w-0 lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium text-ink/60">
            <span className="font-display text-[22px] font-extrabold text-flame">{service.number}</span>
            {service.kicker}
          </p>

          <Lines
            as="h3"
            id={`${service.id}-title`}
            lines={[service.title]}
            className="mt-4 font-display text-[clamp(48px,5.4vw,92px)] font-extrabold uppercase leading-[0.88]"
          />

          <p className="mt-6 max-w-[30rem] text-[clamp(18px,1.4vw,21px)] font-medium leading-snug" data-reveal>
            {service.summary}
          </p>
          <p className="mt-4 max-w-[32rem] text-[16px] leading-relaxed text-ink/65" data-reveal>
            {service.body}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5" data-reveal-stagger>
            {service.includes.map((item) => (
              <li key={item} className="rounded-full border border-ink/80 px-4 py-2 text-[15px] leading-tight">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-[32rem]" data-reveal>
            <span className="mb-3 block h-[3px] w-8 rounded-full bg-flame" aria-hidden />
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/50">{service.example.label}</p>
            <p className="mt-2 text-[15px] leading-relaxed">{service.example.text}</p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href={service.cta.href}
              className="inline-flex h-14 items-center gap-3 rounded-full bg-ink px-7 text-[16px] font-semibold text-cream transition-colors duration-300 hover:bg-flame"
            >
              {service.cta.label} <ArrowUpRight size={18} aria-hidden />
            </Link>
            <Link href={servicePath(service)} className="text-[15px] font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              More about {service.title}
            </Link>
          </div>
        </div>

        <div className={`min-w-0 lg:col-span-7 ${reverse ? "lg:order-1" : ""}`} data-reveal>
          <ServiceVisual service={service} />
        </div>
      </div>
    </section>
  );
}
