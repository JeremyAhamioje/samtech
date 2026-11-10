import { services } from "@/content/site";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BuildsOverview from "@/components/BuildsOverview";
import SelectedWork from "@/components/SelectedWork";
import ServiceSection from "@/components/ServiceSection";
import IndustrySection from "@/components/IndustrySection";
import WhySamtech from "@/components/WhySamtech";
import Faq from "@/components/Faq";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ScrollReveals from "@/components/ScrollReveals";
import { Lines, Pinwheel } from "@/components/ui";

/**
 * Narrative: what Samtech does → what it has built → how each service works →
 * proof of transformation → who it's for → how → why → contact.
 */
export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <BuildsOverview />
        <SelectedWork />

        {/* Service stories — one service, one story, one animation */}
        <div className="pt-[var(--section)]">
          <div className="wrap mb-16 md:mb-20">
            <p className="flex items-center gap-2.5 font-display text-[clamp(26px,2.2vw,34px)] font-extrabold uppercase leading-none">
              <Pinwheel className="spin-slow size-[1em] text-flame" hubClassName="fill-paper" />
              In detail
            </p>
            <div className="mt-[clamp(32px,4vw,56px)] flex flex-wrap items-end justify-between gap-8">
              <Lines lines={["Five services.", "One clear job each."]} className="t-display !text-[clamp(56px,8.4vw,140px)]" />
              <p className="max-w-[22rem] text-[17px] leading-snug text-ink/65" data-reveal>
                Start with the website. Add the rest when it earns its place — each one is scoped and priced on its own.
              </p>
            </div>
          </div>
          {services.map((s, i) => (
            <ServiceSection key={s.id} service={s} reverse={i % 2 === 1} />
          ))}
        </div>

        <IndustrySection />
        <WhySamtech />
        <Faq />
        <ContactCTA />
      </main>
      <Footer />
      <ScrollReveals />
    </>
  );
}
