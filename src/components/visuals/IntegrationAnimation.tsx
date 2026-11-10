"use client";

import { Bell, Globe, MessageCircle, Receipt, Users, type LucideIcon } from "lucide-react";
import type { Service } from "@/content/site";
import Stage, { type Build } from "@/components/visuals/Stage";

// Scene is 100 × 67 cqw; the SVG uses the same coordinates.
const nodes: { x: number; y: number; Icon: LucideIcon; event: string }[] = [
  { x: 12, y: 29, Icon: Globe, event: "Form sent" },
  { x: 31, y: 47, Icon: MessageCircle, event: "Reply sent" },
  { x: 50, y: 29, Icon: Users, event: "Contact added" },
  { x: 69, y: 47, Icon: Receipt, event: "Invoice created" },
  { x: 88, y: 29, Icon: Bell, event: "Team notified" },
];
const points = nodes.map((n) => `${n.x},${n.y}`).join(" ");

// Website → WhatsApp → CRM → Invoice → Notification: one pulse carries the lead through every tool.
const build: Build = (tl, q, step) => {
  const line = q("[data-progress]")[0] as SVGPolylineElement;
  const len = line.getTotalLength();
  const seg = len / (nodes.length - 1);

  tl.fromTo(q("[data-scene]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
    .set(line, { strokeDasharray: len, strokeDashoffset: len }, 0)
    .set(q("[data-pulse]"), { attr: { cx: nodes[0].x, cy: nodes[0].y } }, 0)
    .set(q("[data-lit]"), { autoAlpha: 0 }, 0)
    .set(q("[data-ev]"), { autoAlpha: 0, y: 6 }, 0);

  nodes.forEach((n, i) => {
    const at = i === 0 ? 0.5 : ">";
    tl.call(() => step(i), [], at)
      .to(q(`[data-lit='${i}']`), { autoAlpha: 1, duration: 0.25 })
      .fromTo(q(`[data-node='${i}']`), { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut" }, "<")
      .to(q(`[data-ev='${i}']`), { autoAlpha: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, "<0.1");
    if (i < nodes.length - 1) {
      const next = nodes[i + 1];
      tl.to(q("[data-pulse]"), { attr: { cx: next.x, cy: next.y }, duration: 0.7, ease: "power2.inOut" }, "+=0.35")
        .to(line, { strokeDashoffset: len - seg * (i + 1), duration: 0.7, ease: "power2.inOut" }, "<");
    }
  });

  tl.to(q("[data-scene]"), { autoAlpha: 0, duration: 0.5 }, "+=2.4");
};

export default function IntegrationAnimation({ service }: { service: Service }) {
  return (
    <Stage tone="flame" steps={service.storyboard} label={`Animation: ${service.storyboard.join(", then ")}`} build={build}>
      <div data-scene className="absolute inset-0">
        <svg viewBox="0 0 100 67" className="absolute inset-0 size-full" aria-hidden>
          <polyline points={points} fill="none" stroke="rgb(245 239 230 / 0.4)" strokeWidth="0.5" strokeDasharray="1.4 1.4" />
          <polyline data-progress points={points} fill="none" stroke="#f5efe6" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle data-pulse cx={nodes[0].x} cy={nodes[0].y} r="1.6" fill="#1406e6" stroke="#f5efe6" strokeWidth="0.6" />
        </svg>

        {nodes.map(({ x, y, Icon, event }, i) => (
          <div key={event} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}cqw`, top: `${y}cqw` }}>
            <div data-node={i} className="relative grid size-[12cqw] place-items-center rounded-[3cqw] border-[0.35cqw] border-cream/60 bg-flame">
              <Icon className="size-[5cqw] text-cream" strokeWidth={1.8} />
              <div data-lit={i} className="absolute inset-[-0.35cqw] grid place-items-center rounded-[3cqw] bg-cream">
                <Icon className="size-[5cqw] text-flame" strokeWidth={2.2} />
              </div>
            </div>
            {/* Top-row labels sit above the tile, bottom-row below, so the path never crosses them */}
            <p
              className={`absolute left-1/2 w-max -translate-x-1/2 text-[1.9cqw] font-bold ${
                i % 2 === 0 ? "bottom-[calc(100%+1.2cqw)]" : "top-[calc(100%+1.2cqw)]"
              }`}
            >
              {service.storyboard[i]}
            </p>
            <p
              data-ev={i}
              className={`absolute left-1/2 w-max -translate-x-1/2 rounded-full bg-cobalt px-[1.4cqw] py-[0.5cqw] text-[1.6cqw] font-semibold ${
                i % 2 === 0 ? "bottom-[calc(100%+4.6cqw)]" : "top-[calc(100%+4.6cqw)]"
              }`}
            >
              {event}
            </p>
          </div>
        ))}
      </div>
    </Stage>
  );
}
