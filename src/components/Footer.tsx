import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { contact, nav } from "@/content/site";

/** Orange, like the hero: links up top, the wordmark huge along the bottom. */
export default function Footer() {
  return (
    <footer className="overflow-hidden bg-flame text-cream">
      <div className="wrap pt-16 md:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <p className="max-w-[22rem] text-[17px] font-medium leading-snug lg:col-span-6">
            Websites and digital systems for small &amp; medium businesses. Fixed price, no retainers, and you own
            everything we build.
          </p>
          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-cream/70">Sitemap</p>
            <ul className="space-y-2 text-[16px] font-medium">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={`/${n.href}`} className="hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-cream/70">Get in touch</p>
            <ul className="space-y-2 text-[16px] font-medium">
              <li>
                <Link href="/review" className="hover:underline">
                  Free website review
                </Link>
              </li>
              <li>
                <a href={contact.callHref} className="hover:underline">
                  Book a call
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-cream/40 pt-6 text-[14px] font-medium text-cream/80">
          <span>© {new Date().getFullYear()} Samtech Studio</span>
          <span>{contact.location}</span>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-cream">
            Back to top <ArrowUp size={15} aria-hidden />
          </a>
        </div>

        <p
          className="mt-8 whitespace-nowrap font-display text-[clamp(42px,13.6vw,220px)] font-extrabold uppercase leading-[0.78] tracking-tight"
          aria-label="Samtech Studio"
        >
          Samtech<span className="text-cobalt">.</span>studio
        </p>
      </div>
    </footer>
  );
}
