"use client";

import { Bell } from "lucide-react";
import type { Service } from "@/content/site";
import Stage, { type Build } from "@/components/visuals/Stage";

/** A page block: a dashed wireframe outline with its designed fill on top. */
function Block({ className, fill }: { className: string; fill: string }) {
  return (
    <div className={`relative ${className}`}>
      <div data-wire className="absolute inset-0 rounded-[0.8cqw] border border-dashed border-ink/40" />
      <div data-fill className={`absolute inset-0 rounded-[0.8cqw] ${fill}`} />
    </div>
  );
}

// Wireframe → Design → Code → Deploy → First inquiry
const build: Build = (tl, q, step) => {
  tl.set(q("[data-browser]"), { autoAlpha: 1 })
    .set(q("[data-wire]"), { scaleX: 0, autoAlpha: 1, transformOrigin: "left center" })
    .set(q("[data-fill]"), { autoAlpha: 0, y: 4 })
    .set(q("[data-code]"), { xPercent: 105 })
    .set(q("[data-code-line]"), { scaleX: 0, transformOrigin: "left center" })
    .set(q("[data-live]"), { scale: 0, autoAlpha: 0 })
    .set(q("[data-url-live]"), { autoAlpha: 0 })
    .set(q("[data-url-draft]"), { autoAlpha: 1 })
    .set(q("[data-deploy-bar]"), { scaleX: 0, transformOrigin: "left center" })
    .set(q("[data-toast]"), { yPercent: 140, autoAlpha: 0 })

    // 1. Wireframe
    .call(() => step(0))
    .to(q("[data-wire]"), { scaleX: 1, duration: 0.5, ease: "power2.out", stagger: 0.07 }, 0.2)

    // 2. Design
    .call(() => step(1), [], "+=0.5")
    .to(q("[data-fill]"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06 })
    .to(q("[data-wire]"), { autoAlpha: 0, duration: 0.3 }, "<0.3")

    // 3. Code
    .call(() => step(2), [], "+=0.6")
    .to(q("[data-code]"), { xPercent: 0, duration: 0.6, ease: "expo.out" })
    .to(q("[data-code-line]"), { scaleX: 1, duration: 0.35, ease: "power1.out", stagger: 0.12 }, "<0.2")
    .to(q("[data-code]"), { xPercent: 105, duration: 0.5, ease: "expo.in" }, "+=0.6")

    // 4. Deploy
    .call(() => step(3))
    .to(q("[data-deploy-bar]"), { scaleX: 1, duration: 0.9, ease: "power2.inOut" })
    .to(q("[data-url-draft]"), { autoAlpha: 0, duration: 0.2 })
    .to(q("[data-url-live]"), { autoAlpha: 1, duration: 0.2 })
    .to(q("[data-live]"), { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(2.4)" }, "<")
    .to(q("[data-deploy-bar]"), { autoAlpha: 0, duration: 0.3 }, "+=0.2")

    // 5. First inquiry
    .call(() => step(4), [], "+=0.4")
    .to(q("[data-toast]"), { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: "back.out(1.6)" })
    .fromTo(q("[data-bell]"), { rotate: -18 }, { rotate: 18, duration: 0.12, repeat: 5, yoyo: true, ease: "sine.inOut" }, "<0.3")
    .set(q("[data-bell]"), { rotate: 0 })

    // Hold, then clear for the next loop
    .to(q("[data-browser]"), { autoAlpha: 0, duration: 0.5 }, "+=2.4")
    .to(q("[data-deploy-bar]"), { autoAlpha: 1, duration: 0 });
};

export default function WebsiteAnimation({ service }: { service: Service }) {
  return (
    <Stage tone="flame" steps={service.storyboard} label={`Animation: ${service.storyboard.join(", then ")}`} build={build}>
      <div data-browser className="absolute left-[8cqw] top-[6cqw] w-[84cqw] overflow-hidden rounded-[1.8cqw] bg-cream text-ink shadow-[0_3cqw_6cqw_-2cqw_rgba(0,0,0,0.35)]">
        {/* Chrome */}
        <div className="relative flex h-[5.5cqw] items-center gap-[1.5cqw] border-b border-ink/10 px-[2cqw]">
          <span className="relative h-[3cqw] flex-1 rounded-full bg-ink/[0.06]">
            <span data-url-draft className="absolute inset-0 flex items-center px-[1.6cqw] font-mono text-[1.7cqw] text-ink/50">
              staging.preview
            </span>
            <span data-url-live className="absolute inset-0 flex items-center px-[1.6cqw] font-mono text-[1.7cqw] text-ink/70">
              yourbusiness.com
            </span>
          </span>
          <span data-live className="flex items-center gap-[0.8cqw] rounded-full bg-[#1f9d55] px-[1.4cqw] py-[0.5cqw] text-[1.5cqw] font-bold uppercase tracking-wider text-white">
            <i className="size-[1cqw] rounded-full bg-white" /> Live
          </span>
          <span data-deploy-bar className="absolute inset-x-0 bottom-0 h-[0.5cqw] bg-cobalt" />
        </div>

        {/* Page */}
        <div className="relative space-y-[2.4cqw] p-[3cqw]">
          <div className="flex items-center justify-between">
            <Block className="h-[2.6cqw] w-[11cqw]" fill="bg-ink" />
            <div className="flex gap-[1.6cqw]">
              <Block className="h-[1.6cqw] w-[6cqw]" fill="bg-ink/25" />
              <Block className="h-[1.6cqw] w-[6cqw]" fill="bg-ink/25" />
              <Block className="h-[1.6cqw] w-[6cqw]" fill="bg-ink/25" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr_30cqw] gap-[3cqw]">
            <div className="space-y-[1.6cqw] pt-[1cqw]">
              <Block className="h-[4cqw] w-[90%]" fill="bg-ink" />
              <Block className="h-[4cqw] w-[70%]" fill="bg-ink" />
              <Block className="h-[1.6cqw] w-[85%]" fill="bg-ink/20" />
              <Block className="h-[1.6cqw] w-[60%]" fill="bg-ink/20" />
              <Block className="mt-[2.4cqw] h-[4.4cqw] w-[20cqw]" fill="rounded-full bg-cobalt" />
            </div>
            <Block className="h-[21cqw]" fill="bg-[linear-gradient(135deg,var(--color-flame),#ff9a5c)]" />
          </div>
          <div className="grid grid-cols-3 gap-[2cqw]">
            <Block className="h-[7cqw]" fill="bg-ink/[0.08]" />
            <Block className="h-[7cqw]" fill="bg-ink/[0.08]" />
            <Block className="h-[7cqw]" fill="bg-ink/[0.08]" />
          </div>

          {/* Code pass */}
          <div data-code className="absolute inset-y-0 right-0 w-[48%] space-y-[1.6cqw] bg-[#14151a] p-[3cqw]">
            {[["w-[40%]", "bg-[#7aa2ff]"], ["w-[70%]", "bg-cream/40"], ["w-[55%]", "bg-[#ff9a5c]"], ["w-[80%]", "bg-cream/40"], ["w-[35%]", "bg-[#8be28b]"], ["w-[62%]", "bg-cream/40"], ["w-[48%]", "bg-[#7aa2ff]"]].map(([w, c], i) => (
              <span key={i} data-code-line className={`block h-[1.4cqw] rounded-full ${w} ${c}`} style={{ marginLeft: `${(i % 3) * 2.5}cqw` }} />
            ))}
          </div>
        </div>

        {/* First inquiry */}
        <div data-toast className="absolute bottom-[2.5cqw] right-[2.5cqw] flex w-[44cqw] items-start gap-[1.8cqw] rounded-[1.6cqw] bg-ink p-[2.2cqw] text-cream shadow-[0_2cqw_4cqw_-1cqw_rgba(0,0,0,0.4)]">
          <span data-bell className="grid size-[5cqw] shrink-0 place-items-center rounded-full bg-flame">
            <Bell className="size-[2.6cqw]" />
          </span>
          <span className="min-w-0">
            <span className="block text-[1.9cqw] font-bold">New inquiry</span>
            <span className="block text-[1.7cqw] leading-snug text-cream/75">&ldquo;Hi, can we book a viewing on Saturday?&rdquo;</span>
          </span>
        </div>
      </div>
    </Stage>
  );
}
