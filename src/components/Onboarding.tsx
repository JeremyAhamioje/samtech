"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { contact, needOptions } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Wordmark } from "@/components/Navbar";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Data = { website: string; noSite: boolean; need: string; name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

const STEPS = [
  { title: ["Where does your", "business live online?"], hint: "Paste your current website. No site yet? That's fine." },
  { title: ["What do you", "need most?"], hint: "Pick the closest one. We can talk through the rest." },
  { title: ["Who should we", "send it to?"], hint: "We reply within 24 hours with our honest read on your site." },
];

const field =
  "w-full border-0 border-b-2 border-cream/40 bg-transparent py-3 text-[clamp(20px,2.2vw,30px)] font-medium text-cream outline-none transition-colors placeholder:text-cream/45 focus:border-cream";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({ website: "", noSite: false, need: "", name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const panel = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));

  // Directional fade on every step change: content drifts in from the left behind a sweeping gradient edge.
  useEffect(() => {
    const el = panel.current;
    if (!el || prefersReducedMotion()) return;
    const items = el.querySelectorAll("[data-step-in]");
    const tween = gsap.fromTo(
      items,
      { "--reveal": "-30%", x: -36 },
      { "--reveal": "130%", x: 0, duration: 1, ease: "power3.out", stagger: 0.08 },
    );
    return () => {
      tween.kill();
    };
  }, [step, status]);

  function validate(s: number) {
    if (s === 0 && !data.noSite && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+\S*$/i.test(data.website.trim()))
      return "Add your website address, or tick “I don't have one yet”.";
    if (s === 1 && !data.need) return "Choose the option that fits best.";
    if (s === 2) {
      if (!data.name.trim()) return "Add your name.";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Add a valid email so we can reply.";
    }
    return "";
  }

  function next() {
    const msg = validate(step);
    setError(msg);
    if (!msg) setStep((s) => s + 1);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    const msg = validate(step);
    setError(msg);
    if (msg) return;

    const payload = {
      website: data.noSite ? "No website yet" : data.website.trim(),
      need: data.need,
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };

    if (!ENDPOINT) {
      // No form backend configured yet: hand off to the visitor's email app.
      const body = Object.entries(payload)
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
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const current = STEPS[step];

  return (
    <div className="flex min-h-[100svh] flex-col bg-flame text-cream">
      <header className="shadow-[0_1px_0_rgb(245_239_230/0.45)]">
        <div className="wrap flex h-[68px] items-center justify-between">
          <Link href="/" aria-label="Samtech Studio — home">
            <Wordmark onColor />
          </Link>
          <Link
            href="/"
            aria-label="Close and go back to the homepage"
            className="grid size-11 place-items-center rounded-full bg-cream text-flame transition-colors hover:bg-cobalt hover:text-cream"
          >
            <X size={20} aria-hidden />
          </Link>
        </div>
      </header>

      <main ref={panel} className="wrap flex flex-1 flex-col justify-between gap-12 py-[clamp(32px,6vh,72px)]">
        {status === "sent" ? (
          <div className="my-auto" role="status">
            <h1 data-step-in className="dir-fade t-display !text-[clamp(56px,9vw,150px)]">
              Thanks, {data.name.split(" ")[0] || "friend"}.
              <br />
              That&apos;s in.
            </h1>
            <p data-step-in className="dir-fade mt-8 max-w-[34rem] text-[clamp(17px,1.4vw,21px)] font-medium">
              We&apos;ll come back within 24 hours with our read on your site. If it&apos;s urgent, email{" "}
              <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                {contact.email}
              </a>
              .
            </p>
            <Link
              data-step-in
              href="/"
              className="dir-fade mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-cobalt px-7 font-semibold transition-colors hover:bg-cream hover:text-cobalt"
            >
              <ArrowLeft size={18} aria-hidden /> Back to the site
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 text-[14px] font-semibold">
              <span>
                Step {step + 1} of {STEPS.length}
              </span>
              <div className="flex flex-1 gap-1.5" aria-hidden>
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-cream" : "bg-cream/25"}`}
                  />
                ))}
              </div>
            </div>

            <form key={step} onSubmit={onSubmit} noValidate className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <h1 className="t-display !text-[clamp(52px,7.4vw,124px)] !leading-[0.88]">
                  {current.title.map((l) => (
                    <span key={l} data-step-in className="dir-fade block">
                      {l}
                    </span>
                  ))}
                </h1>
                <p data-step-in className="dir-fade mt-6 max-w-[26rem] text-[17px] font-medium opacity-85">
                  {current.hint}
                </p>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                {step === 0 && (
                  <div data-step-in className="dir-fade space-y-6">
                    <label className="block">
                      <span className="sr-only">Your current website</span>
                      <input
                        autoFocus
                        type="url"
                        inputMode="url"
                        placeholder="yourbusiness.com"
                        value={data.website}
                        disabled={data.noSite}
                        onChange={(e) => set("website", e.target.value)}
                        className={`${field} disabled:opacity-40`}
                      />
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-[16px] font-medium">
                      <input
                        type="checkbox"
                        checked={data.noSite}
                        onChange={(e) => set("noSite", e.target.checked)}
                        className="size-5 accent-[var(--color-cobalt)]"
                      />
                      I don&apos;t have one yet
                    </label>
                  </div>
                )}

                {step === 1 && (
                  <fieldset data-step-in className="dir-fade">
                    <legend className="sr-only">What do you need?</legend>
                    <div className="flex flex-col gap-2.5">
                      {needOptions.map((opt) => (
                        <label key={opt} className="cursor-pointer">
                          <input
                            type="radio"
                            name="need"
                            value={opt}
                            checked={data.need === opt}
                            onChange={() => set("need", opt)}
                            className="peer sr-only"
                          />
                          <span className="flex items-center justify-between rounded-2xl border-2 border-cream/40 px-5 py-4 text-[17px] font-semibold transition-colors hover:border-cream peer-checked:border-cobalt peer-checked:bg-cobalt peer-focus-visible:ring-2 peer-focus-visible:ring-cream">
                            {opt}
                            <ArrowRight size={18} aria-hidden className="opacity-60" />
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <div data-step-in className="dir-fade space-y-7">
                    <label className="block">
                      <span className="text-[13px] font-semibold uppercase tracking-[0.12em] opacity-75">Name *</span>
                      <input
                        autoFocus
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={field}
                      />
                    </label>
                    <label className="block">
                      <span className="text-[13px] font-semibold uppercase tracking-[0.12em] opacity-75">Email *</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={field}
                      />
                    </label>
                    <label className="block">
                      <span className="text-[13px] font-semibold uppercase tracking-[0.12em] opacity-75">
                        Anything we should know?
                      </span>
                      <textarea
                        rows={2}
                        value={data.message}
                        onChange={(e) => set("message", e.target.value)}
                        className={`${field} resize-none !text-[18px]`}
                      />
                    </label>
                  </div>
                )}

                {(error || status === "error") && (
                  <p role="alert" className="mt-6 rounded-xl bg-cream px-4 py-3 text-[15px] font-semibold text-flame">
                    {error || `Something went wrong. Email ${contact.email} and we'll pick it up.`}
                  </p>
                )}

                <div className="mt-10 flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setStep((s) => s - 1);
                      }}
                      className="inline-flex items-center gap-2 text-[16px] font-semibold opacity-85 hover:opacity-100"
                    >
                      <ArrowLeft size={18} aria-hidden /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-14 items-center gap-3 rounded-full bg-cobalt px-7 text-[17px] font-semibold transition-colors hover:bg-cream hover:text-cobalt disabled:opacity-60"
                  >
                    {step < STEPS.length - 1 ? (
                      <>
                        Continue <ArrowRight size={18} aria-hidden />
                      </>
                    ) : status === "sending" ? (
                      "Sending…"
                    ) : (
                      <>
                        Get my free review <ArrowUpRight size={18} aria-hidden />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
