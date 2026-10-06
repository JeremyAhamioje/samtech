import { industries } from "@/content/site";
import { Lines, SectionLabel } from "@/components/ui";

/** 07 — answers "who can use this?", deliberately after the services are clear. */
export default function IndustrySection() {
  return (
    <section id="industries" className="section">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="05" className="muted mb-8">
              Who it&apos;s for
            </SectionLabel>
            <Lines lines={["Built for businesses", "that run on inquiries."]} className="t-h2" />
          </div>
          <p className="t-body muted lg:col-span-4 lg:col-start-9" data-reveal>
            If customers find you online and then call, message or fill in a form, the same building blocks apply.
            Here&apos;s what they look like in practice.
          </p>
        </div>

        <ul className="mt-14 grid border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
          {industries.map((ind, i) => (
            <li key={ind.name} className="flex min-h-[220px] flex-col justify-between border-b border-r border-[var(--line)] p-7 md:p-9">
              <div>
                <span className="t-label text-indigo">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-4">{ind.name}</h3>
                <p className="muted mt-3 max-w-[22rem] text-[15px]">{ind.text}</p>
              </div>
              <p className="t-label mt-6">
                {ind.proof ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-indigo" aria-hidden />
                    Built: {ind.proof}
                  </span>
                ) : (
                  <span className="muted">Use case</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
