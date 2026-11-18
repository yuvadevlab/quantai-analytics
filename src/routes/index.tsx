import { createFileRoute } from "@tanstack/react-router";
import { ChatWorkspace } from "@/components/quantai/chat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuantAI — Indian Market Intelligence" },
      {
        name: "description",
        content: "Explore an illustrative AI-powered market intelligence workstation for NSE and BSE.",
      },
      { property: "og:title", content: "QuantAI — Indian Market Intelligence" },
      {
        property: "og:description",
        content: "An institutional-style workstation for market analysis and tracked trade ideas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return <ChatWorkspace />;
}