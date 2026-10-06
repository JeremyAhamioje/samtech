import { services } from "@/content/site";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BuildsOverview from "@/components/BuildsOverview";
import SelectedWork from "@/components/SelectedWork";
import ServiceSection from "@/components/ServiceSection";
import BeforeAfter from "@/components/BeforeAfter";
import IndustrySection from "@/components/IndustrySection";
import ProcessSection from "@/components/ProcessSection";
import WhySamtech from "@/components/WhySamtech";
import Faq from "@/components/Faq";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ScrollReveals from "@/components/ScrollReveals";
import { Lines, SectionLabel } from "@/components/ui";

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

        {/* Service stories — one service, one story, one visual */}
        <div className="pt-[var(--section)]">
          <div className="wrap mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-20">
            <div>
              <SectionLabel index="03" className="muted mb-8">
                Services in detail
              </SectionLabel>
              <Lines lines={["Five services.", "One clear job each."]} className="t-h2" />
            </div>
            <p className="t-body muted max-w-[24rem]" data-reveal>
              Start with the website. Add the rest when it earns its place — each one is scoped and priced on its own.
            </p>
          </div>
          {services.map((s, i) => (
            <ServiceSection key={s.id} service={s} reverse={i % 2 === 1} />
          ))}
        </div>

        <BeforeAfter />
        <IndustrySection />
        <ProcessSection />
        <WhySamtech />
        <Faq />
        <ContactCTA />
      </main>
      <Footer />
      <ScrollReveals />
    </>
  );
}
