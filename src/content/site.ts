/**
 * All page copy lives here so sections stay data-driven.
 * Source: the existing samtech.studio content, restructured for clarity.
 * Rule: no invented statistics, clients, testimonials or results.
 */
import type { StaticImageData } from "next/image";

import txNewDesktop from "@/assets/work/1st-texas-new-desktop.webp";
import txNewDesktopLong from "@/assets/work/1st-texas-new-desktop-long.webp";
import zelDesktop from "@/assets/work/zelemeraki-desktop.webp";

export const contact = {
  email: "hello@samtech.studio",
  callHref:
    "mailto:hello@samtech.studio?subject=Book%20a%20free%2030-minute%20call",
  location: "Remote · working across time zones",
  responseTime: "Within 24 hours, every time",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

/* ───────────── Services ───────────── */

/** Each key maps to a visual component. Swap placeholders in ServiceVisual.tsx. */
export type VisualKey =
  | "website"
  | "systems"
  | "automation"
  | "integrations"
  | "growth";

export type Service = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  summary: string;
  body: string;
  includes: string[];
  visual: VisualKey;
  /** Storyboard for the eventual coded animation — shown in the placeholder. */
  storyboard: string[];
  example: { label: string; text: string };
  cta: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: "websites",
    number: "01",
    kicker: "The core",
    title: "Websites",
    summary:
      "Fast, modern websites for small and medium businesses — built to turn visitors into customers.",
    body:
      "Most small-business sites were built once and left alone. Customers bounce on slow phones, can't find the call button and fill in forms that land nowhere. We design for the phone your customers are holding, keep the rankings you've already earned, and make every inquiry arrive.",
    includes: [
      "Mobile-first design",
      "Built for speed",
      "SEO kept and improved",
      "Forms that actually arrive",
      "Edit it yourself",
      "You own everything",
    ],
    visual: "website",
    storyboard: ["Wireframe", "Design", "Code", "Deploy", "First inquiry"],
    example: {
      label: "Fixed-price packages",
      text: "Launch — one-page site, $700 · Business — up to 5 pages with SEO migration and CRM-wired forms, $1,500 · Growth — everything in Business plus an AI agent, from $2,500.",
    },
    cta: { label: "Get a free website review", href: "#contact" },
  },
  {
    id: "systems",
    number: "02",
    kicker: "Extends the website",
    title: "Business systems",
    summary:
      "Your website, wired into how the business actually runs.",
    body:
      "A lead form is only useful if the lead reaches the right place. We connect your site to your inbox, CRM, spreadsheets and dashboards — so inquiries, orders and sales land where your team already works, without anyone copying them across by hand.",
    includes: [
      "Lead forms to email and CRM",
      "Analytics you can actually read",
      "Orders copied into sheets",
      "Records updated across tools",
      "Live dashboards",
    ],
    visual: "systems",
    storyboard: ["Form submitted", "Parsed", "CRM record", "Dashboard updates"],
    example: {
      label: "In practice — e-commerce resale",
      text: "Every sale confirmation email is parsed automatically into a live dashboard tracking 10,000+ sales, revenue trends and top venues. No more manual spreadsheets at the end of the month.",
    },
    cta: { label: "Talk about your workflow", href: "#contact" },
  },
  {
    id: "automation",
    number: "03",
    kicker: "Extends the website",
    title: "AI & automation",
    summary:
      "An assistant that answers, qualifies and follows up — day and night.",
    body:
      "Not a chatbot bolted onto your website. A worker built around your actual workflows: it watches your channels, qualifies inquiries, nudges quiet leads and sends polite invoice reminders — all written in your voice and timed to when people actually reply.",
    includes: [
      "Never miss a lead",
      "Follow-ups that send themselves",
      "Invoice reminders",
      "WhatsApp, email or SMS",
      "Hands over to a human when needed",
    ],
    visual: "automation",
    storyboard: [
      "Inquiry at 11 pm",
      "Assistant replies",
      "Lead qualified",
      "Warm lead in your inbox",
    ],
    example: {
      label: "In practice — a private school, Lagos",
      text: "The school was losing parent inquiries after hours. Now a WhatsApp assistant answers admissions and fee questions around the clock and hands over to staff the moment a human is needed.",
    },
    cta: { label: "Add an agent to your site", href: "#contact" },
  },
  {
    id: "integrations",
    number: "04",
    kicker: "Extends the website",
    title: "Integrations",
    summary: "The tools you already use, finally talking to each other.",
    body:
      "Website, WhatsApp, CRM, invoicing and notifications usually live in separate tabs. We connect them into one flow, deployed in your own accounts and documented — so there's no new software for your team to learn and no black box to keep alive.",
    includes: [
      "Website → WhatsApp → CRM",
      "Leads synced to your CRM or sheet",
      "Invoices and notifications",
      "Deployed in your accounts",
      "Documented and handed over",
    ],
    visual: "integrations",
    storyboard: ["Website", "WhatsApp", "CRM", "Invoice", "Notification"],
    example: {
      label: "Under the hood",
      text: "n8n · Claude · OpenAI · custom Python — you never have to touch any of it.",
    },
    cta: { label: "Map your tools with us", href: "#contact" },
  },
  {
    id: "growth",
    number: "05",
    kicker: "After launch",
    title: "Growth & support",
    summary:
      "Launch is the start. We stay on hand as the business grows — never locked in.",
    body:
      "Once the site is live you can add an agent, new pages or new integrations whenever you need them. If you'd rather not handle updates yourself, a small care plan keeps things maintained — but you own everything and can part ways any time.",
    includes: [
      "Add an agent any time",
      "New pages and features",
      "Optional care plan",
      "Recorded handover for your team",
      "No retainers, no lock-in",
    ],
    visual: "growth",
    storyboard: ["Launch", "Learn", "Add", "Improve"],
    example: {
      label: "How it usually goes",
      text: "Plenty of clients start with just the website. When leads arrive faster than they can answer them — or after-hours inquiries start slipping — an agent is added. The site is built ready for it either way.",
    },
    cta: { label: "Ask about ongoing support", href: "#contact" },
  },
];

/* ───────────── Work ───────────── */

export type CaseStudy = {
  id: string;
  client: string;
  meta: string;
  status: string;
  image: StaticImageData;
  imageAlt: string;
  /** Optional tall screenshot that scrolls inside the frame on hover. */
  scrollImage?: StaticImageData;
  summary: string;
  problem: string;
  change: string;
  result: string;
  tags: string[];
  link?: { label: string; href: string };
};

export const featuredWork: CaseStudy[] = [
  {
    id: "1st-texas",
    client: "1st Texas Realtors",
    meta: "Website · Real estate · Clear Lake, TX",
    status: "Redesign concept — live link",
    image: txNewDesktop,
    scrollImage: txNewDesktopLong,
    imageAlt: "The redesigned 1st Texas Realtors homepage with home search",
    summary:
      "A family brokerage's WordPress site rebuilt around home search, a free-valuation lead funnel and one-tap calling.",
    problem:
      "A dated site that buried home search and listings, and made calling the office hard on a phone.",
    change:
      "Home search up front, a free-valuation lead funnel and one-tap calling — while keeping every city and community page they already rank for.",
    result:
      "Buyers can search and call in seconds on mobile, and the SEO the brokerage had earned carries straight over.",
    tags: ["SEO migration", "Lead funnel", "Mobile-first"],
    link: {
      label: "View the live concept",
      href: "https://1sttexasrealtors-ten.vercel.app/",
    },
  },
  {
    id: "zelemeraki",
    client: "Zelemeraki Studio",
    meta: "Website · E-commerce · Art & design · Lagos",
    status: "Live site",
    image: zelDesktop,
    imageAlt: "The Zelemeraki Studio online store homepage",
    summary:
      "An online store for a Lagos art and design studio selling plaster art, furniture and interior objects worldwide.",
    problem:
      "A studio selling to buyers in Nigeria and abroad needed one store that worked for both.",
    change:
      "Online store with prices in naira or dollars, worldwide shipping, commission requests and a mailing list built in.",
    result:
      "One storefront serves local and international buyers, with commissions and mailing-list sign-ups captured in the same place.",
    tags: ["Online store", "NGN / USD pricing", "Worldwide shipping"],
    link: { label: "Visit the live site", href: "https://zelemeraki.studio/" },
  },
];

export type AutomationCase = {
  title: string;
  sector: string;
  problem: string;
  change: string;
  result: string;
};

export const automationWork: AutomationCase[] = [
  {
    title: "WhatsApp admissions assistant",
    sector: "Education · Lagos",
    problem: "Parent inquiries were being lost after hours.",
    change:
      "An assistant answers admissions and fee questions around the clock.",
    result: "Hands over to staff the moment a human is needed.",
  },
  {
    title: "Sales email to live dashboard",
    sector: "E-commerce · Resale",
    problem: "Sales were reconciled in manual spreadsheets every month.",
    change: "Every sale confirmation is parsed automatically.",
    result: "A live dashboard tracking 10,000+ sales, revenue and top venues.",
  },
  {
    title: "Job-matching agents",
    sector: "Career services",
    problem: "Matching candidates to openings by hand, one board at a time.",
    change:
      "Agents scan boards daily and score every match against each profile.",
    result:
      "Personalised outreach drafted for one-click review — nothing sends without a human.",
  },
];

/* ───────────── Before / after ───────────── */

export const beforeAfterChanges = [
  {
    title: "Home search, front and centre",
    text: "Buy, rent and commercial search on the first screen instead of a rotating banner.",
  },
  {
    title: "A lead funnel that works",
    text: "A free home-valuation offer that turns sellers into inquiries.",
  },
  {
    title: "One-tap calling",
    text: "Call and browse buttons right where a thumb lands on mobile.",
  },
  {
    title: "Rankings kept",
    text: "Every city and community page they rank for, carried over and redirected.",
  },
];

/* ───────────── Industries ───────────── */

export const industries = [
  {
    name: "Real estate",
    text: "Home search, valuation funnels and one-tap calling that keep buyers on your site.",
    proof: "1st Texas Realtors",
  },
  {
    name: "Education",
    text: "Admissions sites and assistants that answer parents after hours.",
    proof: "Admissions assistant",
  },
  {
    name: "E-commerce & retail",
    text: "Stores with local and international pricing, plus sales flowing into live dashboards.",
    proof: "Zelemeraki Studio",
  },
  {
    name: "Career services",
    text: "Agents that find, score and draft outreach for every candidate match.",
    proof: "Job-matching agents",
  },
  {
    name: "Home services",
    text: "Tap-to-call, quote requests and follow-ups for plumbers, cleaners and trades.",
  },
  {
    name: "Professional services",
    text: "Clear service pages, booking forms and inquiries that reach your inbox and CRM.",
  },
];

/* ───────────── Process ───────────── */

export const process = [
  {
    step: "Discovery",
    text: "Send your URL or book a 30-minute call. We tell you what's costing you leads — and say so if nothing needs fixing.",
  },
  {
    step: "Strategy",
    text: "We scope the work and agree a fixed price up front. No hourly meters, no surprise bills.",
  },
  {
    step: "Design",
    text: "We redesign your homepage for real, on a live link you click through on your phone — before you pay anything.",
  },
  {
    step: "Development",
    text: "We build, migrate your content and SEO, and test every form before launch.",
  },
  {
    step: "Launch",
    text: "Go live, with a recorded handover so your team can edit text, photos and listings.",
  },
  {
    step: "Growth",
    text: "Add an agent, pages or integrations whenever you're ready. The site is built for it.",
  },
];

/* ───────────── Why Samtech ───────────── */

export const reasons = [
  {
    title: "Fixed price, no retainers",
    text: "Quoted after a free review and agreed before any work starts.",
  },
  {
    title: "You see it before you pay",
    text: "A homepage concept on a live link. Don't like it? Walk away, owing nothing.",
  },
  {
    title: "You own everything",
    text: "Domain, hosting, code and docs in your name. Part ways tomorrow and it keeps running.",
  },
  {
    title: "Rankings travel with you",
    text: "Old pages redirected, metadata carried over, sitemap submitted.",
  },
  {
    title: "Forms that actually arrive",
    text: "Tested before launch and after, with a fallback if email ever fails.",
  },
  {
    title: "Ready for what's next",
    text: "Built so CRM sync, WhatsApp or an AI agent can plug straight in later.",
  },
];

/* ───────────── FAQ ───────────── */

export const faqs = [
  {
    q: "What does a website cost?",
    a: "Every project is a fixed price, quoted after the free review and agreed before any work starts. Packages start at $700, $1,500, or from $2,500 with an AI agent included. You'll know the full number before you commit to anything.",
  },
  {
    q: "How long until it's live?",
    a: "Most sites launch in two to four weeks from the day you approve the concept. A one-page Launch site can be done in under a week. You'll get the exact timeline in writing before you commit.",
  },
  {
    q: "Will I lose my Google rankings?",
    a: "Not if it's done properly. We map every existing page and redirect it, carry over your metadata, and keep the URLs that already earn traffic. Where a page has to change, it redirects to the closest match rather than a 404.",
  },
  {
    q: "Can I update it myself?",
    a: "Yes. You get a simple way to edit text, photos and listings without touching code, plus a recorded handover session. If you'd rather not, we can keep a small care plan — but you're never locked into one.",
  },
  {
    q: "Do I need an AI agent too?",
    a: "No. Plenty of clients start with just the website. If leads start arriving faster than you can answer them — or you're losing after-hours inquiries — an agent can be added later.",
  },
  {
    q: "What if I don't like the concept?",
    a: "Then you don't proceed, and you owe nothing. The concept is genuinely free — we'd rather lose the project than build something you don't believe in.",
  },
  {
    q: "Do you work with businesses outside your city?",
    a: "Yes. We work remotely across time zones, with calls at hours that suit you. Everything is shared on live links you can click through on your phone.",
  },
];

export const needOptions = [
  "A redesign of my current site",
  "A brand-new website",
  "Website + AI agent",
  "An AI agent only",
  "Just exploring",
];
