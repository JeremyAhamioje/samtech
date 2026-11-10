"use client";

import { BadgeCheck, Moon, Sun } from "lucide-react";
import type { Service } from "@/content/site";
import Stage, { type Build } from "@/components/visuals/Stage";

const bubble = "max-w-[80%] rounded-[1.8cqw] px-[2cqw] py-[1.3cqw] text-[1.85cqw] leading-snug";

// Inquiry at 11 pm → Assistant replies → Lead qualified → Warm lead in your inbox
const build: Build = (tl, q, step) => {
  tl.fromTo(q("[data-scene]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
    .set(q("[data-msg]"), { autoAlpha: 0, y: 10 }, 0)
    .set(q("[data-typing]"), { autoAlpha: 0 }, 0)
    .set(q("[data-stamp]"), { autoAlpha: 0, scale: 1.6, rotate: -14 }, 0)
    .set(q("[data-inbox]"), { autoAlpha: 0, x: 30 }, 0)

    // 1. Inquiry at 11 pm
    .call(() => step(0), [], 0)
    .to(q("[data-msg='1']"), { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(1.8)" }, 0.5)

    // 2. Assistant replies
    .call(() => step(1), [], "+=0.6")
    .to(q("[data-typing]"), { autoAlpha: 1, duration: 0.2 })
    .fromTo(q("[data-dot]"), { y: 0 }, { y: -5, duration: 0.25, yoyo: true, repeat: 3, stagger: 0.1, ease: "sine.inOut" })
    .to(q("[data-typing]"), { autoAlpha: 0, duration: 0.15 })
    .to(q("[data-msg='2']"), { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(1.8)" }, "<")
    .to(q("[data-msg='3']"), { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(1.8)" }, "+=0.9")
    .to(q("[data-msg='4']"), { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(1.8)" }, "+=0.8")

    // 3. Lead qualified
    .call(() => step(2), [], "+=0.4")
    .to(q("[data-stamp]"), { autoAlpha: 1, scale: 1, rotate: -6, duration: 0.45, ease: "back.out(2.2)" })

    // 4. Warm lead in your inbox
    .call(() => step(3), [], "+=0.7")
    .to(q("[data-inbox]"), { autoAlpha: 1, x: 0, duration: 0.7, ease: "expo.out" })

    // Hold, then clear
    .to(q("[data-scene]"), { autoAlpha: 0, duration: 0.5 }, "+=2.6");
};

export default function AutomationAnimation({ service }: { service: Service }) {
  return (
    <Stage tone="ink" steps={service.storyboard} label={`Animation: ${service.storyboard.join(", then ")}`} build={build}>
      <div data-scene className="absolute inset-0">
        {/* WhatsApp-style chat, late at night */}
        <div className="absolute left-[5cqw] top-[5cqw] flex h-[57cqw] w-[54cqw] flex-col rounded-[2.4cqw] bg-ink-3 ring-1 ring-cream/10">
          <div className="flex items-center gap-[1.6cqw] border-b border-cream/10 px-[2.4cqw] py-[1.8cqw]">
            <span className="grid size-[4.6cqw] place-items-center rounded-full bg-flame font-display text-[2.4cqw] font-extrabold">A</span>
            <span className="flex-1">
              <span className="block text-[1.9cqw] font-bold">Admissions</span>
              <span className="block text-[1.5cqw] text-cream/55">Assistant · online</span>
            </span>
            <span className="flex items-center gap-[0.8cqw] rounded-full bg-cream/10 px-[1.6cqw] py-[0.6cqw] text-[1.6cqw] font-semibold">
              <Moon className="size-[1.8cqw]" /> 11:04 PM
            </span>
          </div>

          <div className="relative flex flex-1 flex-col justify-start gap-[1.4cqw] p-[2.4cqw]">
            <p data-msg="1" className={`${bubble} self-start bg-white/10`}>
              Hi! Is there still space in Year 7 for September?
            </p>
            {/* Reply, with the typing dots shown in its place first */}
            <div className="relative flex flex-col items-end">
              <p data-msg="2" className={`${bubble} bg-flame`}>
                Yes, 4 places left. Would you like to visit the school this week?
              </p>
              <span data-typing className="absolute right-0 top-0 flex gap-[0.7cqw] rounded-[1.8cqw] bg-flame px-[2cqw] py-[1.6cqw]">
                {[0, 1, 2].map((i) => (
                  <i key={i} data-dot className="size-[1.1cqw] rounded-full bg-cream" />
                ))}
              </span>
            </div>
            <p data-msg="3" className={`${bubble} self-start bg-white/10`}>Thursday morning works.</p>
            <p data-msg="4" className={`${bubble} self-end bg-flame`}>Booked: Thursday, 10am. See you then!</p>
          </div>

          <span data-stamp className="absolute bottom-[6cqw] left-[4cqw] flex items-center gap-[1cqw] rounded-[1.2cqw] border-[0.4cqw] border-cream bg-cobalt px-[2cqw] py-[1.2cqw] text-[2cqw] font-extrabold uppercase tracking-wider">
            <BadgeCheck className="size-[2.6cqw]" /> Lead qualified
          </span>
        </div>

        {/* Your inbox, next morning */}
        <div data-inbox className="absolute left-[62cqw] top-[24cqw] w-[33cqw] rounded-[2cqw] bg-cream p-[2.4cqw] text-ink shadow-[0_3cqw_6cqw_-2cqw_rgba(0,0,0,0.5)]">
          <p className="flex items-center justify-between text-[1.6cqw] font-semibold text-ink/55">
            Your inbox
            <span className="flex items-center gap-[0.6cqw]">
              <Sun className="size-[1.8cqw] text-flame" /> 7:30 AM
            </span>
          </p>
          <p className="mt-[1.6cqw] inline-block rounded-full bg-flame px-[1.4cqw] py-[0.4cqw] text-[1.5cqw] font-bold text-cream">Warm lead</p>
          <p className="mt-[1.2cqw] text-[2.3cqw] font-bold leading-tight">Mrs Adeyemi</p>
          <p className="mt-[0.6cqw] text-[1.7cqw] leading-snug text-ink/65">Year 7 · Visit booked Thursday 10am · Asked about fees</p>
        </div>
      </div>
    </Stage>
  );
}
