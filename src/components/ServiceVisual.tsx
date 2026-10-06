import type { ComponentType } from "react";
import type { Service, VisualKey } from "@/content/site";
import ServiceVisualPlaceholder from "@/components/visuals/ServiceVisualPlaceholder";

/**
 * Registry of coded service animations. To ship a real one, build it in
 * components/visuals/ and map its key here, e.g.:
 *
 *   import WebsiteAnimation from "@/components/visuals/WebsiteAnimation";
 *   const animations = { website: WebsiteAnimation };
 *
 * Unmapped keys fall back to the placeholder, which keeps the same footprint.
 */
const animations: Partial<Record<VisualKey, ComponentType<{ service: Service }>>> = {};

/** The component name each slot is reserved for — shown on the placeholder. */
const plannedNames: Record<VisualKey, string> = {
  website: "WebsiteAnimation",
  systems: "SystemsAnimation",
  automation: "AutomationAnimation",
  integrations: "IntegrationAnimation",
  growth: "GrowthAnimation",
};

export default function ServiceVisual({ service }: { service: Service }) {
  const Animation = animations[service.visual];
  if (Animation) return <Animation service={service} />;
  return (
    <ServiceVisualPlaceholder
      visual={service.visual}
      componentName={plannedNames[service.visual]}
      storyboard={service.storyboard}
    />
  );
}
