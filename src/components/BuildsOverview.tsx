import { ArrowDownRight } from "lucide-react";
import { services } from "@/content/site";
import { Lines, SectionLabel } from "@/components/ui";

/**
 * 03 — establishes the hierarchy: the website is the core, everything else
 * extends from it. The stack on the right is the page's table of contents
 * for the service stories further down.
 */
export default function BuildsOverview() {
  const [core, ...extensions] = services;

  return (
    <section id="services" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionLabel index="01" className="muted mb-8">
            What we build
          </SectionLabel>
          <Lines lines={["Websites first.", "Everything else", "plugs into them."]} className="t-h2" />
          <div className="mt-10 space-y-5" data-reveal>
            <p className="t-lead max-w-[32rem]">
              Every project starts with the thing your customers actually see: a fast, modern website.
            </p>
            <p className="t-body muted">
              Once it&apos;s live, it becomes the front door to the rest of the business — the systems, automations
              and tools that turn a visitor into a lead and a lead into a customer. You can add each layer when
              you need it, not before.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {/* The core */}
          <a
            href={`#${core.id}`}
            data-reveal
            className="group relative block overflow-hidden rounded-[20px] bg-ink p-7 text-paper md:p-9"
          >
            <span
              aria-hidden
              className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,var(--color-indigo),transparent_65%)] opacity-60"
            />
            <span className="t-label relative text-volt">The core · {core.number}</span>
            <span className="t-h2 relative mt-4 block">{core.title}</span>
            <span className="relative mt-3 block max-w-[24rem] text-[15px] text-paper/70">{core.summary}</span>
            <ArrowDownRight className="absolute bottom-7 right-7 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>

          {/* What it extends into */}
          <p className="t-label muted mb-3 mt-8 flex items-center gap-3">
            <span className="h-6 w-px bg-current opacity-30" aria-hidden />
            Extends into
          </p>
          <ol data-reveal-stagger className="border-t border-[var(--line)]">
            {extensions.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group grid grid-cols-[44px_1fr_auto] items-baseline gap-3 border-b border-[var(--line)] py-5"
                >
                  <span className="t-label text-indigo">{s.number}</span>
                  <span>
                    <span className="t-h3 block transition-colors group-hover:text-indigo">{s.title}</span>
                    <span className="muted mt-1 block text-[14px]">{s.summary}</span>
                  </span>
                  <ArrowDownRight size={18} className="muted transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
