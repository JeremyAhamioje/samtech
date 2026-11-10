import type { ComponentType } from "react";
import type { Service, VisualKey } from "@/content/site";
import WebsiteAnimation from "@/components/visuals/WebsiteAnimation";
import SystemsAnimation from "@/components/visuals/SystemsAnimation";
import AutomationAnimation from "@/components/visuals/AutomationAnimation";
import IntegrationAnimation from "@/components/visuals/IntegrationAnimation";
import GrowthAnimation from "@/components/visuals/GrowthAnimation";

/** Each service's coded animation, keyed by its `visual`. Each plays that service's storyboard. */
const animations: Record<VisualKey, ComponentType<{ service: Service }>> = {
  website: WebsiteAnimation,
  systems: SystemsAnimation,
  automation: AutomationAnimation,
  integrations: IntegrationAnimation,
  growth: GrowthAnimation,
};

export default function ServiceVisual({ service }: { service: Service }) {
  const Animation = animations[service.visual];
  return <Animation service={service} />;
}
