import { createFileRoute } from "@tanstack/react-router";
import { PredictionsWorkspace } from "@/components/quantai/predictions";

export const Route = createFileRoute("/predictions")({
  head: () => ({
    meta: [
      { title: "Prediction Lab — QuantAI" },
      {
        name: "description",
        content: "Review illustrative NSE and BSE trade ideas, outcomes, and performance metrics.",
      },
      { property: "og:title", content: "Prediction Lab — QuantAI" },
      {
        property: "og:description",
        content: "Browse the QuantAI demo prediction ledger and monitor example trade setups.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PredictionsPage,
});

function PredictionsPage() {
  return <PredictionsWorkspace />;
}