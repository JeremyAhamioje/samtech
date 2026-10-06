import type { VisualKey } from "@/content/site";

const accents: Record<VisualKey, string> = {
  website: "from-indigo/25 via-violet/15 to-coral/20",
  systems: "from-coral/20 via-violet/10 to-indigo/25",
  automation: "from-violet/25 via-indigo/15 to-volt/20",
  integrations: "from-indigo/20 via-coral/10 to-violet/25",
  growth: "from-volt/25 via-indigo/10 to-violet/20",
};

/**
 * Stand-in for a coded service animation. It reserves the final footprint and
 * shows the storyboard the animation must communicate, so the swap later is
 * purely visual. A single dot travels the flow to signal "this moves".
 */
export default function ServiceVisualPlaceholder({
  visual,
  componentName,
  storyboard,
}: {
  visual: VisualKey;
  componentName: string;
  storyboard: string[];
}) {
  return (
    <div
      className="relative flex aspect-[5/4] w-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-black/5"
      role="img"
      aria-label={`Illustration placeholder: ${storyboard.join(", then ")}`}
    >
      {/* soft Stripe-style colour field + dotted grid */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accents[visual]}`} aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(rgb(12 13 16 / .25) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        aria-hidden
      />

      <div className="relative flex items-center justify-between p-5">
        <span className="t-label rounded-full bg-white/80 px-3 py-1.5 backdrop-blur">Animation slot</span>
        <code className="rounded-md bg-ink px-2.5 py-1 font-mono text-[11px] text-volt">&lt;{componentName} /&gt;</code>
      </div>

      {/* Storyboard: the steps the final animation needs to make obvious */}
      <ol className="relative mx-auto my-auto flex w-full max-w-[560px] flex-wrap items-center justify-center gap-y-6 px-6">
        {storyboard.map((step, i) => (
          <li key={step} className="flex items-center">
            <span className="relative rounded-xl bg-white px-3.5 py-2.5 text-[13px] font-medium shadow-[0_8px_24px_-12px_rgba(12,13,16,.35)] ring-1 ring-black/5">
              <span className="t-label mr-2 text-indigo">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </span>
            {i < storyboard.length - 1 && (
              <span className="relative mx-2 h-px w-6 bg-ink/25 md:w-8" aria-hidden>
                <span className="absolute -top-[3px] left-0 size-[7px] rounded-full bg-indigo [animation:flow_2.4s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.35}s` }} />
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="t-label relative p-5 text-ink/45">Placeholder · final coded animation validated separately</p>
      <style>{`@keyframes flow{0%{transform:translateX(0);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:translateX(calc(100% + 24px));opacity:0}}`}</style>
    </div>
  );
}
