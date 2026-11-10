import type { Metadata } from "next";
import Onboarding from "@/components/Onboarding";

export const metadata: Metadata = {
  title: "Free website review — Samtech Studio",
  description:
    "Tell us about your business and your current website. We'll come back within 24 hours with what we'd change.",
};

export default function ReviewPage() {
  return <Onboarding />;
}
