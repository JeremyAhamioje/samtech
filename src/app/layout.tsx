import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["700", "800"],
  adjustFontFallback: false, // no metric overrides exist for this family
});

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samtech.studio"),
  title: "Samtech Studio — Websites & digital systems for growing businesses",
  description:
    "Samtech designs and builds fast, modern websites for small and medium businesses — then connects them to the systems, automations and AI agents that run the business. Fixed price. You own everything.",
  openGraph: {
    title: "Samtech Studio — Websites that bring in customers",
    description:
      "Fast, modern websites for small and medium businesses, connected to the systems that run them.",
    url: "https://samtech.studio",
    siteName: "Samtech Studio",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2efe9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
