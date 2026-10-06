import { process } from "@/content/site";
import { Lines, SectionLabel } from "@/components/ui";

/** 08 — Discovery → Strategy → Design → Development → Launch → Growth. */
export default function ProcessSection() {
  return (
    <section id="process" className="section border-t border-[var(--line)]">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="06" className="muted mb-8">
              How it works
            </SectionLabel>
            <Lines lines={["You see your new site", "before you pay for it."]} className="t-h2" />
          </div>
          <p className="t-body muted lg:col-span-3 lg:col-start-10" data-reveal>
            No commitment until the build. If the concept doesn&apos;t convince you, you walk away owing nothing.
          </p>
        </div>

        <ol className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6" data-reveal-stagger>
          {process.map((p, i) => (
            <li key={p.step} className="relative pt-8">
              {/* progress rail */}
              <span className="absolute left-0 right-0 top-0 h-px bg-[var(--line)]" aria-hidden />
              <span className={`absolute left-0 top-[-4px] size-[9px] rounded-full ${i === 2 ? "bg-indigo ring-4 ring-indigo/20" : "bg-ink"}`} aria-hidden />
              <span className="t-label text-indigo">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3 mt-3">{p.step}</h3>
              <p className="muted mt-3 text-[15px] leading-relaxed">{p.text}</p>
              {i === 2 && <p className="t-label mt-4 inline-block rounded-full bg-indigo/10 px-3 py-1.5 text-indigo">Free — before you commit</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
