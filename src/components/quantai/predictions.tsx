import { Link } from "@tanstack/react-router";
import { Activity, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Radio, Search, Target, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signals, type SignalHorizon, type SignalStatus } from "./data";
import { QuantLayout } from "./layout";

type LedgerFilter = "All calls" | "Active" | "Completed";

export function PredictionsWorkspace() {
  const [activeFilter, setActiveFilter] = useState<LedgerFilter>("All calls");
  const [horizonFilter, setHorizonFilter] = useState("All styles");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [search, setSearch] = useState("");

  const filteredSignals = useMemo(() => signals.filter((signal) => {
    const isCompleted = signal.status !== "Active";
    return (activeFilter === "All calls" || (activeFilter === "Active" ? !isCompleted : isCompleted))
      && (horizonFilter === "All styles" || signal.horizon.toLowerCase() === horizonFilter.toLowerCase())
      && (statusFilter === "All statuses" || signal.status.toLowerCase() === statusFilter.toLowerCase())
      && (!search.trim() || `${signal.symbol} ${signal.instrument} ${signal.id}`.toLowerCase().includes(search.trim().toLowerCase()));
  }), [activeFilter, horizonFilter, statusFilter, search]);

  const tabs: { label: LedgerFilter; count: number }[] = [
    { label: "All calls", count: 142 },
    { label: "Active", count: 4 },
    { label: "Completed", count: 138 },
  ];

  return (
    <QuantLayout active="predictions">
      <div className="page-heading ledger-heading"><div><div className="eyebrow"><span className="eyebrow-dot" />MARKET INTELLIGENCE</div><h1>Prediction lab <span className="active-calls-heading"><i />4 ACTIVE</span></h1><p>Research ideas, tracked outcomes, and illustrative performance history.</p></div><div className="heading-actions"><span className="demo-outline"><i />ILLUSTRATIVE DATA</span><Button variant="outline" size="sm" className="heading-utility" onClick={() => window.print()}><Download size={15} /><span>Export</span></Button></div></div>

      <section className="metric-grid" aria-label="Illustrative system call performance">
        <MetricCard icon={<Activity size={16} />} label="TRACKED CALLS" value="142" hint={<><span className="gain-text">4 active</span><span className="metric-divider">·</span>138 closed</>} badge="ALL TIME" />
        <MetricCard icon={<Target size={16} />} label="WIN RATE" value="74.6%" hint={<><span className="gain-text">106 target hits</span><span className="metric-divider">·</span><span className="loss-text">32 stops</span></>} badge="+3.2% THIS MONTH" valueTone="gain-text" />
        <MetricCard icon={<BarChart3 size={16} />} label="PROFIT FACTOR" value="2.38" hint={<><span className="gain-text">+3.6%</span> average gain<span className="metric-divider">·</span><span className="loss-text">−1.3%</span> average loss</>} badge="RISK ADJUSTED" />
        <MetricCard icon={<TrendingUp size={16} />} label="DIRECTIONAL EXPECTANCY" value="+1.82R" hint={<>Average return per tracked call</>} badge="POSITIVE EDGE" valueTone="gain-text" />
      </section>

      <div className="ledger-toolbar"><div className="ledger-tabs" role="tablist" aria-label="Filter prediction calls">{tabs.map((tab) => <button key={tab.label} type="button" role="tab" aria-selected={activeFilter === tab.label} className={`ledger-tab${activeFilter === tab.label ? " ledger-tab-active" : ""}`} onClick={() => setActiveFilter(tab.label)}>{tab.label}<span>{tab.count}</span></button>)}</div><div className="ledger-toolbar-utility"><span className="showing-demo"><i />Sample records</span><Button variant="ghost" size="icon" aria-label="Filter records" title="Filter records" className="subtle-icon-button"><Filter size={15} /></Button></div></div>

      <div className="filter-toolbar"><div className="filter-selects"><div className="select-wrap"><BarChart3 size={13} /><select aria-label="Filter by trading style" value={horizonFilter} onChange={(event) => setHorizonFilter(event.target.value)}><option>All styles</option><option>Intraday</option><option>Swing</option><option>Options</option></select><ChevronDown size={12} /></div><div className="select-wrap"><Radio size={13} /><select aria-label="Filter by call status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Active</option><option>Target hit</option><option>Stop loss hit</option><option>Expired</option></select><ChevronDown size={12} /></div><span className="filter-keyline"><Filter size={13} />FILTERS</span></div><label className="table-search"><Search size={14} /><Input aria-label="Search prediction calls" placeholder="Search symbol…" value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label></div>

      <section className="ledger-panel"><div className="ledger-panel-head"><div className="ledger-title"><span className="ledger-title-icon"><BarChart3 size={15} /></span><strong>System call ledger</strong><span className="ledger-count">{filteredSignals.length} SAMPLE ROWS</span></div><div className="ledger-updated"><span className="ledger-as-of">As of 10:30 IST</span><span className="ledger-refresh"><i /> DEMO</span></div></div>
        <div className="prediction-table-wrap"><table className="prediction-table"><thead><tr><th>GENERATED</th><th>SYMBOL / INSTRUMENT</th><th>STANCE</th><th>ENTRY RANGE</th><th>TARGET LEVELS</th><th>STOP LOSS</th><th>CURRENT STATUS</th><th>MFE / MAE</th><th aria-label="Action" /></tr></thead><tbody>{filteredSignals.map((signal) => <PredictionRow key={signal.id} signal={signal} />)}</tbody></table>{filteredSignals.length === 0 && <div className="table-empty-state"><Search size={19} /><strong>No sample calls match these filters.</strong><span>Try a different symbol, style, or status.</span></div>}</div>
        <div className="table-pagination"><span>Showing <strong>{filteredSignals.length === 0 ? 0 : 1}–{filteredSignals.length}</strong> of <strong>{filteredSignals.length === signals.length && activeFilter === "All calls" && horizonFilter === "All styles" && statusFilter === "All statuses" && !search ? "142" : filteredSignals.length}</strong> sample calls</span><div className="pagination-controls"><Button variant="outline" size="icon" aria-label="Previous page" disabled className="pagination-arrow"><ChevronLeft size={14} /></Button><Button variant="outline" size="sm" className="pagination-page">1</Button><Button variant="outline" size="icon" aria-label="Next page" disabled className="pagination-arrow"><ChevronRight size={14} /></Button><span>Rows per page <strong>10</strong><ArrowDown size={11} /></span></div></div>
      </section>
      <div className="ledger-disclaimer"><span className="footer-status-dot" /><span>Demo data · Illustrative figures are not verified historical results, live market data, or investment advice.</span><Link to="/" className="back-to-chat">Return to chat <ArrowRight size={12} /></Link></div>
    </QuantLayout>
  );
}

function MetricCard({ icon, label, value, hint, badge, valueTone = "" }: { icon: React.ReactNode; label: string; value: string; hint: React.ReactNode; badge: string; valueTone?: string }) {
  return <article className="metric-card"><div className="metric-top"><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span><span className="metric-menu">•••</span></div><div className={`metric-value mono-text ${valueTone}`}>{value}</div><div className="metric-hint">{hint}</div><span className="metric-badge">{badge}</span></article>;
}

function PredictionRow({ signal }: { signal: (typeof signals)[number] }) {
  const positive = signal.direction === "BUY";
  const tone = signal.status === "Active" ? "active" : signal.status === "Target hit" ? "target" : signal.status === "Stop loss hit" ? "stopped" : "expired";

  return <tr><td><span className="table-time">{signal.time}</span><span className="table-id">{signal.id}</span></td><td><span className="table-symbol">{signal.symbol}</span><span className="table-instrument">{signal.instrument}</span></td><td><span className={`stance-badge ${positive ? "stance-buy" : "stance-sell"}`}><i />{positive ? "LONG" : "SHORT"}</span><span className="table-horizon">{signal.horizon}</span></td><td><span className="table-entry mono-text">{signal.entry}</span></td><td><span className="table-target mono-text">T1 <strong>{signal.target1.replace("₹", "")}</strong></span><span className="table-target mono-text">T2 <strong>{signal.target2.replace("₹", "")}</strong></span></td><td><span className="table-stop mono-text">{signal.stop}</span></td><td><span className={`status-badge status-${tone}`}><i />{signal.status === "Target hit" ? "TARGET HIT" : signal.status === "Stop loss hit" ? "STOP HIT" : signal.status.toUpperCase()}</span><span className={signal.direction === "BUY" ? "table-last gain-text mono-text" : "table-last loss-text mono-text"}>{signal.last} ({signal.change})</span></td><td><span className="table-mfe mono-text gain-text">{signal.mfe}</span><span className="table-mae mono-text loss-text">{signal.mae}</span></td><td><Link to="/predictions/$id" params={{ id: signal.id }} className="table-action">Monitor <ArrowRight size={13} /></Link></td></tr>;
}