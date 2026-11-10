import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { findService, serviceDetails, servicePath, services } from "@/content/site";
import SubPage from "@/components/SubPage";
import { Pinwheel } from "@/components/ui";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.id }));
}

export async function generateMetadata(props: PageProps<"/services/[service]">): Promise<Metadata> {
  const s = findService((await props.params).service);
  return s ? { title: `${s.title} — Samtech Studio`, description: s.summary } : {};
}

const sectionTitle = "font-display text-[clamp(36px,4vw,64px)] font-extrabold uppercase leading-[0.9]";

/** A service's own page: the short version, what's included, how it works, then one clear next step. */
export default async function ServicePage(props: PageProps<"/services/[service]">) {
  const s = findService((await props.params).service);
  if (!s) notFound();
  const details = serviceDetails[s.id];
  const next = services[(services.indexOf(s) + 1) % services.length];

  return (
    <SubPage
      back={{ href: "/#services", label: "All services" }}
      kicker={`Service ${s.number} · ${s.kicker}`}
      title={s.title}
      lead={s.summary}
      after={
        <>
          {/* Next step */}
          <section className="bg-cobalt py-[clamp(72px,9vw,136px)] text-cream">
            <div className="wrap">
              <h2 className="t-display !text-[clamp(52px,8vw,132px)]">
                Ready when
                <br />
                you are.
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-6">
                <Pinwheel className="spin-slow size-[clamp(56px,6vw,96px)] text-flame" hubClassName="fill-cobalt" />
                <Link
                  href={s.cta.href}
                  className="inline-flex h-[clamp(56px,5vw,68px)] items-center gap-3 whitespace-nowrap rounded-full bg-flame px-7 text-[clamp(15px,1.2vw,18px)] font-semibold transition-colors duration-300 hover:bg-cream hover:text-cobalt"
                >
                  {s.cta.label} <ArrowUpRight size={20} aria-hidden />
                </Link>
                <p className="max-w-[22rem] text-[16px] leading-snug text-cream/80">
                  Free review, fixed price, no obligation. We reply within 24 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Next service */}
          <Link href={servicePath(next)} className="group block bg-flame text-cream">
            <span className="wrap flex items-center justify-between gap-6 py-[clamp(40px,5vw,72px)]">
              <span>
                <span className="block text-[14px] font-semibold uppercase tracking-[0.12em] text-cream/75">Next service</span>
                <span className="mt-3 block font-display text-[clamp(44px,6vw,100px)] font-extrabold uppercase leading-[0.88]">
                  {next.title}
                </span>
              </span>
              <span className="grid size-[clamp(56px,6vw,96px)] shrink-0 place-items-center rounded-full bg-cream text-flame transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2">
                <ArrowRight className="size-[45%]" aria-hidden />
              </span>
            </span>
          </Link>
        </>
      }
    >
      {/* The short version + a real example */}
      <section className="mt-20 grid gap-12 border-t border-ink/15 pt-12 md:mt-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 className={sectionTitle}>The short version</h2>
          <p className="mt-8 max-w-[40rem] text-[clamp(18px,1.45vw,22px)] leading-relaxed">{s.body}</p>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9 lg:pt-3">
          <span className="mb-4 block h-[3px] w-10 rounded-full bg-flame" aria-hidden />
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/50">{s.example.label}</p>
          <p className="mt-3 text-[17px] leading-relaxed">{s.example.text}</p>
        </aside>
      </section>

      {/* What's included */}
      <section className="mt-20 border-t border-ink/15 pt-12 md:mt-28">
        <h2 className={sectionTitle}>What&apos;s included</h2>
        <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
          {s.includes.map((point, i) => (
            <li key={point} className="grid grid-cols-[clamp(48px,4.4vw,72px)_1fr] gap-4 border-b border-ink/15 py-8">
              <span className="font-display text-[clamp(34px,3.2vw,52px)] font-extrabold leading-[0.85] text-flame">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[clamp(26px,2.2vw,36px)] font-extrabold uppercase leading-[0.95]">{point}</h3>
                <p className="mt-3 max-w-[30rem] text-[16px] leading-relaxed text-ink/70">{details.includes[point]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* How it works */}
      <section className="mt-20 border-t border-ink/15 pt-12 md:mt-28">
        <h2 className={sectionTitle}>How it works</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
          {s.storyboard.map((step, i) => (
            <li key={step} className="flex flex-col rounded-[24px] bg-ink p-7 text-cream">
              <span className="grid size-11 place-items-center rounded-full bg-flame font-display text-[20px] font-extrabold">{i + 1}</span>
              <h3 className="mt-8 font-display text-[clamp(24px,1.9vw,30px)] font-extrabold uppercase leading-[0.95]">{step}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/70">{details.steps[i]}</p>
            </li>
          ))}
        </ol>
      </section>
    </SubPage>
  );
}
