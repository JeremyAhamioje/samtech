import type { ReactNode } from "react";

/**
 * Laptop and phone shells built in CSS, no device images. Children fill the screen;
 * the screens clip their content, so tall screenshots can scroll inside them.
 */

export function Laptop({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Lid */}
      <div className="relative rounded-t-[clamp(10px,1.4vw,20px)] bg-[#17171a] p-[2.2%] pb-[3%] shadow-[0_40px_90px_-40px_rgba(12,13,16,0.55)] ring-1 ring-black/40">
        <span className="absolute left-1/2 top-[0.9%] size-[0.7%] min-h-1 min-w-1 -translate-x-1/2 rounded-full bg-[#3a3a40]" aria-hidden />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-white">{children}</div>
      </div>
      {/* Base: wider than the lid, with the thumb notch */}
      <div className="relative -mx-[7%] h-[clamp(10px,1.3vw,18px)] rounded-b-[clamp(8px,1.2vw,18px)] bg-gradient-to-b from-[#dcd9d3] via-[#c9c5be] to-[#9f9b94] shadow-[0_18px_30px_-14px_rgba(12,13,16,0.45)]">
        <span className="absolute left-1/2 top-0 h-[45%] w-[15%] -translate-x-1/2 rounded-b-[6px] bg-[#b3afa8]" aria-hidden />
      </div>
    </div>
  );
}

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Side buttons */}
      <span className="absolute -left-[2.2%] top-[18%] h-[6%] w-[2.4%] rounded-l-sm bg-[#2a2a2f]" aria-hidden />
      <span className="absolute -left-[2.2%] top-[27%] h-[10%] w-[2.4%] rounded-l-sm bg-[#2a2a2f]" aria-hidden />
      <span className="absolute -right-[2.2%] top-[24%] h-[14%] w-[2.4%] rounded-r-sm bg-[#2a2a2f]" aria-hidden />
      {/* Body */}
      <div className="relative rounded-[18%/8.4%] bg-[#17171a] p-[4.2%] shadow-[0_40px_70px_-25px_rgba(12,13,16,0.6)] ring-1 ring-black/40">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[13.5%/6.3%] bg-white">
          {children}
          {/* Dynamic island */}
          <span className="absolute left-1/2 top-[1.8%] z-10 h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0b0d]" aria-hidden />
        </div>
      </div>
    </div>
  );
}
