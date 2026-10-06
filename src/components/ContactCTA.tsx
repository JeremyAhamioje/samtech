"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Clock, Mail, Phone } from "lucide-react";
import { contact, needOptions } from "@/content/site";
import { Lines, SectionLabel } from "@/components/ui";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

/** 10 — the natural next step, after the visitor has seen the work and the services. */
export default function ContactCTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? "") || !data.need) {
      setError("Please add your name, a valid email and what you need.");
      return;
    }
    setError("");

    if (!ENDPOINT) {
      // No form backend configured yet — hand off to the visitor's email app.
      const body = Object.entries(data)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("Free website review")}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full border-0 border-b border-white/20 bg-transparent py-3 text-[16px] text-paper outline-none transition-colors placeholder:text-paper/35 focus:border-volt";

  return (
    <section id="contact" className="band-dark section scroll-mt-16">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel index="09" className="muted mb-8">
            Free website review
          </SectionLabel>
          <Lines lines={["Send us your site.", "We'll show you", "a better one."]} className="t-h2" />
          <p className="t-lead mt-10 max-w-[30rem] text-paper/80" data-reveal>
            Tell us where your business is today. We&apos;ll reply with what we&apos;d change — or book a free 30-minute call
            if you&apos;d rather talk it through first.
          </p>
          <ul className="mt-10 space-y-4 text-[15px]" data-reveal-stagger>
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-volt" aria-hidden /> {contact.responseTime}
            </li>
            <li>
              <a href={contact.callHref} className="flex items-center gap-3 hover:text-volt">
                <Phone size={18} className="text-volt" aria-hidden /> Prefer talking? Book a free 30-minute call
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-volt">
                <Mail size={18} className="text-volt" aria-hidden /> {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {status === "sent" ? (
            <div className="rounded-[24px] bg-ink-2 p-8 md:p-10" role="status">
              <p className="t-h3">Thanks — that&apos;s in.</p>
              <p className="mt-4 text-paper/70">
                We&apos;ll come back within 24 hours with our read on your site. If it&apos;s urgent, email{" "}
                <a href={`mailto:${contact.email}`} className="text-volt underline">
                  {contact.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-7 rounded-[24px] bg-ink-2 p-7 md:p-10" data-reveal>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block">
                  <span className="t-label text-paper/50">Name *</span>
                  <input name="name" autoComplete="name" required className={field} />
                </label>
                <label className="block">
                  <span className="t-label text-paper/50">Email *</span>
                  <input name="email" type="email" autoComplete="email" required className={field} />
                </label>
              </div>
              <label className="block">
                <span className="t-label text-paper/50">Your current website</span>
                <input name="website" type="url" inputMode="url" placeholder="https://" className={field} />
              </label>
              <fieldset>
                <legend className="t-label mb-3 text-paper/50">What do you need? *</legend>
                <div className="flex flex-wrap gap-2">
                  {needOptions.map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" name="need" value={opt} className="peer sr-only" />
                      <span className="chip border-white/20 text-paper/75 transition-colors peer-checked:border-volt peer-checked:bg-volt peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-volt">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="t-label text-paper/50">Tell us about your business</span>
                <textarea name="message" rows={3} className={`${field} resize-none`} />
              </label>

              {(error || status === "error") && (
                <p className="text-[14px] text-coral" role="alert">
                  {error || `Something went wrong. Email ${contact.email} and we'll pick it up.`}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button type="submit" disabled={status === "sending"} className="btn btn-volt disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Get my free review"} <ArrowUpRight size={17} aria-hidden />
                </button>
                <p className="text-[13px] text-paper/45">No obligation.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
