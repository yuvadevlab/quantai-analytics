# QuantAI Market Intelligence Workstation

## Screens and interactions
- Replace the blank home page with the requested compact QuantAI terminal: market ribbon, watchlist, analysis chat, sample recommendation, and prompt composer.
- Add the prediction ledger at `/predictions`, with summary metrics, filters, search, and links into individual calls.
- Add a trajectory monitor at `/predictions/$id`, with price levels, an interactive chart, evidence, and event history.
- Add the Settings screen from the requested navigation; keep every screen within the same shared shell.
- Mark provided prices, performance figures, and generated responses as illustrative demo data, not real-time market or AI output.

## Visual approach
- Build a dense, responsive dark-market terminal using the supplied obsidian, cyan, emerald, crimson, and amber palette, with sans-serif interface text and tabular monospace financial figures.
- Use shared semantic CSS tokens and clear reusable layout classes; retain the existing TanStack Start routing and Shadcn button/input controls.

## Technical details
- Implement client-side interactions and clearly labeled sample data; no external market feed, AI service, sign-in, or persistent backend was requested.
- Give each content route its own specific title, description, Open Graph title/description/type, and Twitter card metadata.
- Verify the home-to-predictions-to-monitor flow, run relevant routing tests, check preview errors, and commit the finished changes.