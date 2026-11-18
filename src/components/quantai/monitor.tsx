import { Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Clock3, Dot, ExternalLink, Info, Layers3, Radio, ShieldCheck, Sparkles, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signals } from "./data";
import { QuantLayout } from "./layout";

type HoverPoint = { x: number; y: number; time: string; price: string; deviation: string };
const chartSamples = [
  { x: 4.7, y: 74.9, time: "09:48:00", price: "₹2,422.50", deviation: "0.00%" },
  { x: 16.8, y: 68.5, time: "09:55:12", price: "₹2,428.10", deviation: "+0.08%" },
  { x: 29, y: 73.2, time: "10:02:24", price: "₹2,424.70", deviation: "−0.05%" },
  { x: 41.1, y: 57.4, time: "10:09:36", price: "₹2,438.20", deviation: "+0.14%" },
  { x: 53.2, y: 46.6, time: "10:15:00", price: "₹2,449.60", deviation: "+0.28%" },
  { x: 65.3, y: 61.3, time: "10:22:48", price: "₹2,435.10", deviation: "−0.03%" },
  { x: 77.4, y: 57.4, time: "10:30:00", price: "₹2,431.20", deviation: "+0.06%" },
];

export function MonitorWorkspace({ signalId }: { signalId: string }) {
  const signal = signals.find((entry) => entry.id === signalId) ?? signals[0];
  const isActive = signal.status === "Active";
  const [chartHover, setChartHover] = useState<HoverPoint | null>(null);
  const [timeframe, setTimeframe] = useState("1m");

  function showPoint(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const nearest = chartSamples.reduce((best, point) => Math.abs(point.x - x) < Math.abs(best.x - x) ? point : best, chartSamples[0]);
    setChartHover({ x: Math.max(10, Math.min(89, nearest.x)), y: (nearest.y / 100) * 76 + 3, time: nearest.time, price: nearest.price, deviation: nearest.deviation });
  }

  return (
    <QuantLayout active="predictions">
      <div className="monitor-breadcrumb"><Link to="/predictions"><ArrowLeft size={14} />Prediction lab</Link><span>/</span><span>{signal.id}</span><span className="breadcrumb-demo"><i /> DEMO MONITOR</span></div>
      <div className="monitor-heading"><div className="monitor-title-block"><div className="eyebrow"><span className="eyebrow-dot" />TRAJECTORY MONITOR <span className="monitor-call-id">CALL #{signal.id}</span></div><h1>{signal.symbol} <span className="monitor-instrument">{signal.instrument.toUpperCase()}</span></h1><p>{signal.direction === "BUY" ? "Long" : "Short"} {signal.horizon} setup <span className="monitor-dot">·</span> Illustrative call, not a live signal</p></div><div className="monitor-heading-right">{isActive ? <span className="monitor-active-badge"><i />ACTIVE · SAMPLE TRACK</span> : <span className={`monitor-closed-badge ${signal.status === "Target hit" ? "closed-target" : "closed-stop"}`}><Check size={13} />{signal.status.toUpperCase()}</span>}<span className="engine-chip"><Sparkles size={13} />Gemini 2.0 <span>SIMULATED</span></span></div></div>

      <section className="monitor-quote-grid"><Quote label="ENTRY" value={signal.last === "₹2,431.20" ? "₹2,422.50" : signal.entry.split("–")[0]} caption="SAMPLE FILL" /><Quote label="SAMPLE LTP" value={signal.last} caption={signal.change} positive={signal.direction === "BUY"} /><Quote label="TARGET 01" value={signal.target1} caption="+1.34% FROM ENTRY" positive /><Quote label="STOP LOSS" value={signal.stop} caption="−0.84% FROM ENTRY" negative /><Quote label="CONFIDENCE" value={signal.confidence} caption="CALIBRATED SCORE" /></section>

      <section className="trajectory-panel"><div className="trajectory-panel-heading"><div className="chart-heading"><span className="chart-heading-icon"><Activity size={15} /></span><div><h2>Predictive trajectory</h2><span>Actual price path · Expected range · Illustrative sample</span></div><button className="chart-info" type="button" title="Sample chart. No live market data is connected." aria-label="Sample chart data information"><CircleHelp size={14} /></button></div><div className="chart-tools"><div className="chart-timeframes" aria-label="Chart timeframe">{["1m", "5m", "15m"].map((period) => <button key={period} type="button" aria-pressed={timeframe === period} onClick={() => setTimeframe(period)} className={`timeframe-button${timeframe === period ? " timeframe-active" : ""}`}>{period}</button>)}</div><span className="chart-tools-divider" /><Button variant="ghost" size="icon" aria-label="Chart options" title="Chart options" className="subtle-icon-button"><Layers3 size={15} /></Button><Button variant="ghost" size="icon" aria-label="More chart information" title="Chart information" className="subtle-icon-button"><ChevronDown size={15} /></Button></div></div>

        <div className="chart-legend"><span><i className="legend-dot actual-dot" />ACTUAL PRICE</span><span><i className="legend-dot expected-dot" />EXPECTED PATH</span><span><i className="legend-cone" />PREDICTION RANGE</span></div>
        <div className="trajectory-chart" onMouseMove={showPoint} onMouseLeave={() => setChartHover(null)} role="img" aria-label="Illustrative RELIANCE price chart with target, entry and stop levels, example actual price path, and projected range">
          <div className="chart-price-labels"><span>₹2,480</span><span>₹2,460</span><span>₹2,440</span><span>₹2,420</span><span>₹2,400</span></div>
          <svg className="trajectory-svg" viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="trajectory-cone-fill" x1="0" x2="1" y1="1" y2="0"><stop offset="0%" stopColor="var(--color-gain)" stopOpacity="0.02" /><stop offset="48%" stopColor="var(--color-brand)" stopOpacity="0.13" /><stop offset="100%" stopColor="var(--color-gain)" stopOpacity="0.04" /></linearGradient><filter id="price-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
            {[28, 81, 134, 187, 240, 293].map((y) => <line key={`grid-${y}`} className="chart-gridline" x1="0" y1={y} x2="1000" y2={y} />)}
            {[85, 205, 325, 445, 565, 685, 805, 925].map((x) => <line key={`vgrid-${x}`} className="chart-gridline vertical-gridline" x1={x} y1="18" x2={x} y2="294" />)}
            <line className="chart-level chart-level-target-two" x1="3" y1="49" x2="965" y2="49" /><line className="chart-level chart-level-target-one" x1="3" y1="107" x2="965" y2="107" /><line className="chart-level chart-level-entry" x1="3" y1="183" x2="965" y2="183" /><line className="chart-level chart-level-stop" x1="3" y1="238" x2="965" y2="238" />
            <path d="M774 153 C829 146 873 130 958 102 L958 179 C886 170 830 162 774 168 Z" fill="url(#trajectory-cone-fill)" />
            <path d="M774 158 C842 147 892 127 958 139" className="expected-centerline" />
            <path d="M47 219 L168 194 L289 211 L410 168 L531 131 L652 178 L773 160" className="actual-price-line" />
            {chartSamples.map((point) => <circle key={point.time} className="chart-sample-point" cx={point.x * 10} cy={(point.y / 100) * 250 + 27} r="3.1"><title>{point.time} · {point.price} · predicted-path deviation {point.deviation}</title></circle>)}
            {isActive && <g className="live-price-beacon" filter="url(#price-glow)"><circle className="beacon-halo" cx="773" cy="170" r="13" /><circle className="beacon-core" cx="773" cy="170" r="5.4" /></g>}
            <line className="chart-x-axis" x1="0" y1="294" x2="1000" y2="294" />
          </svg>
          <div className="chart-level-chip target-two-chip"><i />T2 <strong>{signal.target2}</strong></div><div className="chart-level-chip target-one-chip"><i />T1 <strong>{signal.target1}</strong></div><div className="chart-level-chip entry-chip"><i />ENTRY <strong>{signal.entryPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</strong></div><div className="chart-level-chip stop-chip"><i />SL <strong>{signal.stop}</strong></div>
          {chartHover && <div className="chart-hover-tooltip" style={{ left: `${chartHover.x}%`, top: `${Math.min(72, chartHover.y)}%` }}><span>{chartHover.time} IST</span><strong>{chartHover.price}</strong><small>PATH DEVIATION <b>{chartHover.deviation}</b></small></div>}
          <div className="chart-time-labels"><span>09:48</span><span>10:00</span><span>10:12</span><span>10:24</span><span>10:36</span><span>10:48</span><span>11:00</span><span>11:12</span><span>11:24</span><span>11:36</span></div>
          <div className="chart-live-quote"><i />{signal.last}<small>{signal.change}</small></div>
        </div>

        <div className="trajectory-telemetry"><Telemetry label="TRAJECTORY ALIGNMENT" value="92%" caption="On track" tone="green" icon={<TrendingUp size={14} />} /><Telemetry label="MAX FAVOURABLE (MFE)" value={signal.mfe} caption="₹2,449.60 peak" tone="green" icon={<ArrowUpRight size={14} />} /><Telemetry label="MAX ADVERSE (MAE)" value={signal.mae} caption="₹2,417.10 trough" tone="amber" icon={<Activity size={14} />} /><Telemetry label="TIME ELAPSED" value="45m / 120m" caption="37.5% of horizon" tone="neutral" icon={<Clock3 size={14} />} /><div className="target-progress"><div className="target-progress-text"><span>PROGRESS TO TARGET 01</span><strong>62%</strong></div><div className="progress-track"><span /></div><small>+0.36% <span>of +0.58% required</span></small></div></div>
      </section>

      <div className="monitor-lower-grid"><section className="monitor-evidence-panel"><div className="lower-panel-heading"><span className="lower-panel-icon evidence-icon"><Sparkles size={15} /></span><div><h2>Setup evidence</h2><span>Sample technical context</span></div><span className="evidence-score">3 FACTORS</span></div><div className="evidence-list"><EvidenceItem icon={<Activity size={14} />} title="Technical catalyst" detail="15-minute 20 EMA bounce with a sample 2.8× volume surge; bullish hammer at support." tone="cyan" /><EvidenceItem icon={<BarChart3Icon />} title="Derivative positioning" detail="Illustrative put writing at 2,400 PE (OI +34%); a potential support signal." tone="green" /><EvidenceItem icon={<TrendingUp size={14} />} title="Market regime" detail="Sample NIFTY trending-bull reading, shown as illustrative macro context." tone="amber" /></div><div className="invalidation-rule"><span className="invalidation-icon"><AlertTriangle size={13} /></span><span><strong>INVALIDATION RULE</strong><small>15m candle close below ₹2,400</small></span><span className="rule-arrow"><ArrowRight size={13} /></span></div></section>

        <section className="monitor-audit-panel"><div className="lower-panel-heading"><span className="lower-panel-icon audit-icon"><Radio size={15} /></span><div><h2>Audit trail</h2><span>Sample call events · IST</span></div><Button variant="ghost" size="icon" title="Audit trail information" aria-label="Audit trail information" className="subtle-icon-button"><Info size={14} /></Button></div><div className="audit-timeline"><AuditItem time="09:45:12" state="REGISTERED" detail="Sample prediction created" tone="blue" /><AuditItem time="09:48:00" state="ENTRY FILLED" detail={`Sample price reached ${signal.entryPrice.toLocaleString("en-IN")}`} tone="green" /><AuditItem time="10:15:00" state="MFE UPDATED" detail="Example peak reached ₹2,449.60" tone="amber" /><AuditItem time="10:30:00" state="SAMPLE · LIVE" detail={`Illustrative price at ${signal.last}`} tone="blue" last /></div></section></div>

      <div className="monitor-bottom-note"><ShieldCheck size={13} />All prices, predictions, performance statistics, and timestamps on this monitor are illustrative samples. This is not financial advice.<Link to="/predictions">Return to ledger <ArrowRight size={12} /></Link></div>
    </QuantLayout>
  );
}

function Quote({ label, value, caption, positive = false, negative = false }: { label: string; value: string; caption: string; positive?: boolean; negative?: boolean }) {
  return <div className="monitor-quote"><span className="quote-label">{label}</span><strong className={`quote-value mono-text${positive ? " gain-text" : negative ? " loss-text" : ""}`}>{value}</strong><span className={`quote-caption${positive ? " gain-text" : negative ? " loss-text" : ""}`}>{caption}</span></div>;
}

function Telemetry({ label, value, caption, tone, icon }: { label: string; value: string; caption: string; tone: string; icon: React.ReactNode }) {
  return <div className={`telemetry-item telemetry-${tone}`}><span className="telemetry-icon">{icon}</span><div className="telemetry-copy"><span>{label}</span><strong className="mono-text">{value}</strong><small>{caption}</small></div></div>;
}

function EvidenceItem({ icon, title, detail, tone }: { icon: React.ReactNode; title: string; detail: string; tone: string }) {
  return <div className="evidence-item"><span className={`evidence-item-icon evidence-tone-${tone}`}>{icon}</span><div><strong>{title}</strong><p>{detail}</p></div><span className={`evidence-factor evidence-factor-${tone}`}><Check size={11} />SAMPLE</span></div>;
}

function AuditItem({ time, state, detail, tone, last = false }: { time: string; state: string; detail: string; tone: string; last?: boolean }) {
  return <div className={`audit-item${last ? " audit-item-current" : ""}`}><div className="audit-rail"><span className={`audit-node node-${tone}`}>{last ? <Radio size={10} /> : <Dot size={14} />}</span><span className={`audit-connector${last ? " connector-hidden" : ""}`} /></div><div className="audit-copy"><span className="audit-topline"><time>{time} IST</time><strong className={`audit-tag audit-tag-${tone}`}>{state}</strong></span><p>{detail}</p></div></div>;
}

function BarChart3Icon() {
  return <Activity size={14} />;
}