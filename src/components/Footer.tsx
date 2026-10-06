import { ArrowUp } from "lucide-react";
import { contact, nav } from "@/content/site";

export default function Footer() {
  return (
    <footer className="band-dark border-t border-white/10">
      <div className="wrap pb-10 pt-20">
        <p className="font-display text-[clamp(56px,13vw,220px)] font-extrabold uppercase leading-[0.8] tracking-tight" aria-label="Samtech Studio">
          Samtech<span className="text-indigo">.</span>studio
        </p>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <p className="max-w-[22rem] text-[15px] text-paper/60 lg:col-span-2">
            Websites and AI agents for small &amp; medium businesses. Fixed price, no retainers, and you own everything
            we build.
          </p>
          <nav aria-label="Footer">
            <p className="t-label muted mb-4">Sitemap</p>
            <ul className="space-y-2 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-volt">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="t-label muted mb-4">Get in touch</p>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a href="#contact" className="hover:text-volt">
                  Free review
                </a>
              </li>
              <li>
                <a href={contact.callHref} className="hover:text-volt">
                  Book a call
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-volt">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="t-label muted mt-16 flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Samtech Studio</span>
          <span>{contact.location}</span>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-volt">
            Back to top <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
