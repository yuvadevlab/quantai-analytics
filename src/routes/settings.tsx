import { createFileRoute } from "@tanstack/react-router";
import { SettingsWorkspace } from "@/components/quantai/settings";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — QuantAI" },
      {
        name: "description",
        content: "Review the illustrative display and notification preferences in the QuantAI workspace.",
      },
      { property: "og:title", content: "Settings — QuantAI" },
      {
        property: "og:description",
        content: "Workspace display and notification preferences for the QuantAI demo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return <SettingsWorkspace />;
}