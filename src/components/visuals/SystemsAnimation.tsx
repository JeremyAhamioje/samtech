"use client";

import type { Service } from "@/content/site";
import Stage, { type Build } from "@/components/visuals/Stage";

const fields = [
  ["Name", "Dana Ruiz"],
  ["Email", "dana@ruizdental.com"],
  ["Need", "A new website"],
];
const rows = [
  ["Marcus Lee", "Contacted"],
  ["Priya Shah", "Quoted"],
  ["Tom Becker", "Won"],
];
const bars = [38, 55, 46, 64, 58, 72];

// Form submitted → Parsed → CRM record → Dashboard updates
const build: Build = (tl, q, step) => {
  const count = q("[data-count]")[0] as HTMLElement;
  const n = { v: 23 };

  tl.fromTo(q("[data-scene]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
    .set(q("[data-value]"), { clipPath: "inset(0 100% 0 0)" }, 0)
    .set(q("[data-packet]"), { left: "0%", autoAlpha: 0 }, 0)
    .set(q("[data-parsed]"), { autoAlpha: 0, y: 6, scale: 0.9 }, 0)
    .set(q("[data-newrow]"), { height: 0, autoAlpha: 0 }, 0)
    .set(q("[data-newrow-hl]"), { autoAlpha: 1 }, 0)
    .set(q("[data-lastbar]"), { scaleY: 0.55, transformOrigin: "bottom center" }, 0)
    .call(() => {
      n.v = 23;
      count.textContent = "23";
    }, [], 0)

    // 1. Form submitted
    .call(() => step(0), [], 0)
    .to(q("[data-value]"), { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(14)", stagger: 0.75 }, 0.4)
    .to(q("[data-submit]"), { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }, "+=0.3")

    // 2. Parsed
    .call(() => step(1))
    .set(q("[data-packet]"), { autoAlpha: 1 })
    .to(q("[data-packet]"), { left: "100%", duration: 0.9, ease: "power2.inOut" })
    .to(q("[data-parsed]"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }, "<0.3")
    .set(q("[data-packet]"), { autoAlpha: 0 })

    // 3. CRM record
    .call(() => step(2), [], "+=0.3")
    .to(q("[data-newrow]"), { height: "auto", autoAlpha: 1, duration: 0.6, ease: "expo.out" })
    .to(q("[data-newrow-hl]"), { autoAlpha: 0, duration: 1.2 }, "+=0.5")

    // 4. Dashboard updates
    .call(() => step(3), [], "<")
    .to(q("[data-lastbar]"), { scaleY: 1, duration: 0.8, ease: "back.out(1.6)" }, "<")
    .to(n, { v: 24, duration: 0.6, ease: "none", onUpdate: () => (count.textContent = String(Math.round(n.v))) }, "<0.2")
    .fromTo(q("[data-count]"), { scale: 1 }, { scale: 1.18, duration: 0.2, yoyo: true, repeat: 1 }, "<0.3")

    // Hold, then clear
    .to(q("[data-scene]"), { autoAlpha: 0, duration: 0.5 }, "+=2.4");
};

export default function SystemsAnimation({ service }: { service: Service }) {
  return (
    <Stage tone="cobalt" steps={service.storyboard} label={`Animation: ${service.storyboard.join(", then ")}`} build={build}>
      <div data-scene className="absolute inset-0">
        {/* Website form */}
        <div className="absolute left-[5cqw] top-[6cqw] w-[38cqw] rounded-[2cqw] bg-cream p-[3cqw] text-ink shadow-[0_3cqw_6cqw_-2cqw_rgba(0,0,0,0.4)]">
          <p className="text-[2.4cqw] font-bold">Get in touch</p>
          <div className="mt-[2cqw] space-y-[1.8cqw]">
            {fields.map(([k, v]) => (
              <div key={k}>
                <p className="text-[1.5cqw] font-semibold uppercase tracking-wider text-ink/45">{k}</p>
                <p className="mt-[0.6cqw] border-b border-ink/20 pb-[0.8cqw] text-[2cqw] font-medium">
                  <span data-value className="inline-block whitespace-nowrap">{v}</span>
                </p>
              </div>
            ))}
          </div>
          <span data-submit className="mt-[2.6cqw] inline-block rounded-full bg-cobalt px-[3cqw] py-[1.2cqw] text-[1.8cqw] font-bold text-cream">
            Send
          </span>
        </div>

        {/* Pipe from form to CRM */}
        <div className="absolute left-[43cqw] top-[22cqw] h-0 w-[9cqw] border-t-[0.4cqw] border-dashed border-cream/45">
          <span data-packet className="absolute top-[-1.6cqw] size-[2.8cqw] -translate-x-1/2 rounded-full bg-flame shadow-[0_0_2cqw_rgba(255,81,0,0.8)]" />
        </div>
        <span data-parsed className="absolute left-[37cqw] top-[1cqw] z-10 rounded-[1cqw] bg-ink px-[1.4cqw] py-[0.9cqw] font-mono text-[1.6cqw] text-[#8be28b]">
          {"{ name, email, need }"}
        </span>

        {/* CRM */}
        <div className="absolute left-[52cqw] top-[6cqw] w-[43cqw] rounded-[2cqw] bg-cream p-[2.4cqw] text-ink">
          <p className="flex items-center justify-between text-[1.9cqw] font-bold">
            CRM · Leads <span className="text-[1.5cqw] font-semibold text-ink/45">This week</span>
          </p>
          <div className="mt-[1.4cqw] overflow-hidden">
            <div data-newrow className="overflow-hidden">
              <div className="relative flex items-center justify-between rounded-[1cqw] px-[1.4cqw] py-[1.2cqw] text-[1.8cqw]">
                <span data-newrow-hl className="absolute inset-0 rounded-[1cqw] bg-flame/25" />
                <span className="relative font-semibold">Dana Ruiz</span>
                <span className="relative rounded-full bg-flame px-[1.4cqw] py-[0.4cqw] text-[1.5cqw] font-bold text-cream">New</span>
              </div>
            </div>
            {rows.map(([name, status]) => (
              <div key={name} className="flex items-center justify-between border-t border-ink/10 px-[1.4cqw] py-[1.2cqw] text-[1.8cqw]">
                <span>{name}</span>
                <span className="rounded-full bg-ink/[0.07] px-[1.4cqw] py-[0.4cqw] text-[1.5cqw] font-semibold text-ink/60">{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard */}
        <div className="absolute left-[52cqw] top-[39cqw] flex h-[22cqw] w-[43cqw] gap-[3cqw] rounded-[2cqw] bg-ink p-[2.4cqw]">
          <div className="flex flex-col justify-between">
            <p className="text-[1.6cqw] font-semibold text-cream/60">Leads this week</p>
            <p data-count className="origin-left font-display text-[9cqw] font-extrabold leading-none">23</p>
          </div>
          <div className="flex flex-1 items-end gap-[1cqw]">
            {bars.map((h, i) => (
              <span
                key={i}
                {...(i === bars.length - 1 ? { "data-lastbar": true } : {})}
                className={`flex-1 rounded-t-[0.6cqw] ${i === bars.length - 1 ? "bg-flame" : "bg-cream/30"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}
