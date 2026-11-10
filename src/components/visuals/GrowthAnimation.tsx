"use client";

import { Lightbulb, Rocket, TrendingUp } from "lucide-react";
import type { Service } from "@/content/site";
import Stage, { type Build } from "@/components/visuals/Stage";

const addOns = [
  { label: "AI agent", cls: "bg-flame text-cream" },
  { label: "New pages", cls: "bg-cream text-cobalt" },
  { label: "Integrations", cls: "border-[0.35cqw] border-cream text-cream" },
];

// Launch → Learn → Add → Improve
const build: Build = (tl, q, step) => {
  const line = q("[data-line]")[0] as SVGPathElement;
  const len = line.getTotalLength();

  tl.fromTo(q("[data-scene]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
    .set(q("[data-base]"), { yPercent: 120, autoAlpha: 0 }, 0)
    .set(q("[data-addon]"), { yPercent: -260, autoAlpha: 0 }, 0)
    .set(line, { strokeDasharray: len, strokeDashoffset: len }, 0)
    .set(q("[data-insight]"), { autoAlpha: 0, scale: 0.8 }, 0)
    .set(q("[data-end]"), { autoAlpha: 0, scale: 0 }, 0)
    .set(q("[data-up]"), { autoAlpha: 0, y: 8 }, 0)

    // 1. Launch
    .call(() => step(0), [], 0.3)
    .to(q("[data-base]"), { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "back.out(1.6)" }, 0.4)
    .fromTo(q("[data-rocket]"), { y: 0 }, { y: -6, duration: 0.2, yoyo: true, repeat: 3 }, "<0.4")

    // 2. Learn
    .call(() => step(1), [], "+=0.4")
    .to(line, { strokeDashoffset: len * 0.55, duration: 1.2, ease: "power1.inOut" })
    .to(q("[data-insight]"), { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.2")

    // 3. Add
    .call(() => step(2), [], "+=0.8")
    .to(q("[data-addon]"), { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "bounce.out", stagger: 0.45 })

    // 4. Improve
    .call(() => step(3), [], "+=0.3")
    .to(q("[data-insight]"), { autoAlpha: 0, duration: 0.3 })
    .to(line, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }, "<")
    .to(q("[data-end]"), { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, "-=0.2")
    .to(q("[data-up]"), { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.1")

    .to(q("[data-scene]"), { autoAlpha: 0, duration: 0.5 }, "+=2.4");
};

export default function GrowthAnimation({ service }: { service: Service }) {
  return (
    <Stage tone="cobalt" steps={service.storyboard} label={`Animation: ${service.storyboard.join(", then ")}`} build={build}>
      <div data-scene className="absolute inset-0">
        {/* The site, with add-ons stacking on as the business grows */}
        <div className="absolute bottom-[4cqw] left-[5cqw] flex w-[36cqw] flex-col gap-[1.2cqw]">
          {[...addOns].reverse().map((a) => (
            <div key={a.label} data-addon className={`flex h-[8cqw] items-center justify-between rounded-[1.6cqw] px-[2.4cqw] text-[2.2cqw] font-bold ${a.cls}`}>
              {a.label}
              <span className="text-[2.6cqw] leading-none">+</span>
            </div>
          ))}
          <div data-base className="flex h-[11cqw] items-center gap-[1.6cqw] rounded-[1.6cqw] bg-ink px-[2.4cqw]">
            <span data-rocket className="grid size-[6cqw] place-items-center rounded-full bg-flame">
              <Rocket className="size-[3.2cqw]" />
            </span>
            <span>
              <span className="block text-[2.4cqw] font-bold leading-tight">Your website</span>
              <span className="flex items-center gap-[0.8cqw] text-[1.6cqw] text-cream/65">
                <i className="size-[1.1cqw] rounded-full bg-[#4ade80]" /> Live
              </span>
            </span>
          </div>
        </div>

        {/* Inquiries over time */}
        <div className="absolute right-[5cqw] top-[6cqw] h-[57cqw] w-[50cqw] rounded-[2cqw] bg-cream/10 p-[2.4cqw] ring-1 ring-cream/15">
          <p className="text-[1.7cqw] font-semibold text-cream/70">Inquiries, month by month</p>
          <svg viewBox="0 0 100 92" className="absolute bottom-[3cqw] left-[2.4cqw] h-[42cqw] w-[45.2cqw] overflow-visible">
            {[23, 46, 69].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(245 239 230 / 0.12)" strokeWidth="0.5" />
            ))}
            <path
              data-line
              d="M0 83 L14 76 L28 79 L42 64 L56 60 L70 41 L84 30 L100 12"
              fill="none"
              stroke="#ff5100"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span data-end className="absolute right-[1.1cqw] top-[16.2cqw] size-[2.6cqw] rounded-full border-[0.5cqw] border-cream bg-flame" />
          <span data-up className="absolute right-[2.4cqw] top-[7cqw] flex items-center gap-[0.8cqw] rounded-full bg-cream px-[1.6cqw] py-[0.6cqw] text-[1.7cqw] font-bold text-cobalt">
            <TrendingUp className="size-[2cqw]" /> Inquiries up
          </span>
          <span data-insight className="absolute left-[14cqw] top-[12cqw] flex max-w-[30cqw] items-start gap-[1cqw] rounded-[1.4cqw] bg-ink px-[1.8cqw] py-[1.4cqw] text-[1.7cqw] leading-snug">
            <Lightbulb className="mt-[0.2cqw] size-[2.2cqw] shrink-0 text-flame" />
            Most inquiries arrive after 8pm. Time for an agent?
          </span>
        </div>
      </div>
    </Stage>
  );
}
