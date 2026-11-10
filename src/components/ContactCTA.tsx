import Link from "next/link";
import { ArrowUpRight, Clock, Mail, Phone } from "lucide-react";
import { contact } from "@/content/site";
import { Lines, Pinwheel } from "@/components/ui";

/** The closing ask, on blue. One action: the free review, which lives on its own onboarding page. */
export default function ContactCTA() {
  return (
    <section id="contact" className="section scroll-mt-16 bg-cobalt text-cream">
      <div className="wrap">
        <p className="flex items-center gap-2.5 font-display text-[clamp(26px,2.2vw,34px)] font-extrabold uppercase leading-none">
          <Pinwheel className="spin-slow size-[1em] text-flame" hubClassName="fill-cobalt" />
          Free website review
        </p>

        <Lines
          lines={["Send us your site.", "We'll show you", "a better one."]}
          className="t-display mt-[clamp(32px,4vw,56px)] !text-[clamp(60px,10vw,172px)] !leading-[0.86]"
        />

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-8 md:mt-16">
          <Pinwheel className="spin-slow size-[clamp(64px,7vw,112px)] text-flame" hubClassName="fill-cobalt" />
          <Link
            href="/review"
            className="inline-flex h-[clamp(56px,5vw,72px)] items-center gap-3 whitespace-nowrap rounded-full bg-flame px-[clamp(22px,2.2vw,34px)] text-[clamp(15px,1.25vw,19px)] font-semibold transition-colors duration-300 hover:bg-cream hover:text-cobalt"
          >
            Get a free website review <ArrowUpRight size={20} aria-hidden />
          </Link>
          <p className="max-w-[24rem] text-[16px] leading-snug text-cream/80">
            Tell us where your business is today. We&apos;ll reply with what we&apos;d change. No obligation.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 border-t border-cream/30 pt-8 text-[16px] font-medium sm:grid-cols-3 md:mt-24">
          <li className="flex items-center gap-3">
            <Clock size={18} className="text-flame" aria-hidden /> {contact.responseTime}
          </li>
          <li>
            <a href={contact.callHref} className="flex items-center gap-3 hover:underline">
              <Phone size={18} className="text-flame" aria-hidden /> Book a free 30-minute call
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:underline">
              <Mail size={18} className="text-flame" aria-hidden /> {contact.email}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
