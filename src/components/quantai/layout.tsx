import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  Command,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  TrendingUp,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { marketTicks, watchlist } from "./data";

type WorkspaceTab = "chat" | "predictions" | "settings";

export function QuantLayout({
  active,
  children,
}: {
  active: WorkspaceTab;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="quant-shell">
      <header className="quant-header">
        <Link to="/" className="brand-lockup" aria-label="QuantAI home">
          <span className="brand-mark"><TrendingUp size={17} strokeWidth={2.3} /></span>
          <span className="brand-name">QUANT<span>AI</span></span>
          <span className="market-live"><i />NSE LIVE</span>
        </Link>

        <nav aria-label="Main navigation" className="global-navigation">
          <Link to="/" activeOptions={{ exact: true }} className={`nav-link${active === "chat" ? " active" : ""}`}>
            <MessageSquare size={15} /> <span>Chat Intelligence</span>
          </Link>
          <Link to="/predictions" className={`nav-link${active === "predictions" || location.startsWith("/predictions/") ? " active" : ""}`}>
            <BarChart3 size={15} /> <span>Prediction Lab</span><span className="nav-count">4</span>
          </Link>
          <Link to="/predictions" className="nav-link screener-nav">
            <Activity size={15} /> <span>Market Screener</span>
          </Link>
          <Link to="/settings" className={`nav-link settings-nav${active === "settings" ? " active" : ""}`}>
            <Settings2 size={15} /><span>Settings</span>
          </Link>
        </nav>

        <div className="header-account">
          <span className="win-rate"><span className="win-label">WIN RATE</span><strong>74.6%</strong><span className="win-calls">142 calls</span></span>
          <span className="account-divider" />
          <span className="model-chip"><i />Gemini 2.0 <span>demo</span></span>
          <span className="user-avatar" aria-label="DevLab demo profile">D</span>
        </div>
      </header>

      <div className="ticker-ribbon" aria-label="Illustrative market prices">
        <span className="ticker-demo"><i />DEMO DATA</span>
        {marketTicks.map((tick) => (
          <div className="ticker-item" key={tick.name}>
            <span className="ticker-symbol">{tick.name}</span>
            <strong>{tick.price}</strong>
            <svg className={`ticker-spark${tick.positive ? " spark-up" : tick.isVix ? " spark-vix" : " spark-down"}`} viewBox="0 0 60 17" aria-hidden="true">
              <polyline points={tick.path} />
            </svg>
            <span className={`ticker-change${tick.positive ? " gain-text" : tick.isVix ? " neutral-text" : " loss-text"}`}>{tick.change}</span>
          </div>
        ))}
        <span className="ticker-time"><span className="session-dot" />MARKET OPEN · 10:30 IST</span>
      </div>

      <div className={`workspace-grid${sidebarOpen ? " sidebar-is-open" : " sidebar-is-closed"}`}>
        <aside className="workspace-sidebar" aria-label="Watchlist and saved sessions">
          <div className="sidebar-heading">
            <span>MARKET DESK</span>
            <Button aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"} title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"} variant="ghost" size="icon" className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
            </Button>
          </div>

          <Link to="/" className="new-analysis"><Command size={14} /><span>New market analysis</span><span className="shortcut">⌘ K</span></Link>

          <div className="sidebar-section">
            <div className="sidebar-section-heading"><span>WATCHLIST</span><span className="sidebar-section-action">5</span></div>
            <div className="watchlist-items">
              {watchlist.map((item) => (
                <Link to="/predictions" key={item.name} className="watchlist-item" title={`${item.name}: ${item.price} (${item.change})`}>
                  <span className={`watchlist-indicator${item.positive ? " is-gain" : " is-loss"}`} />
                  <span className="watchlist-name">{item.name}</span>
                  <span className="watchlist-values"><strong className="mono-text">{item.price}</strong><small className={item.positive ? "gain-text" : "loss-text"}>{item.change}</small></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="sidebar-section sessions-section">
            <div className="sidebar-section-heading"><span>SAVED ANALYSES</span><span className="sidebar-section-action">3</span></div>
            <Link className="session-item" to="/predictions"><span className="session-icon"><Activity size={14} /></span><span>BankNifty weekly expiry</span><ChevronRight size={13} /></Link>
            <Link className="session-item" to="/predictions"><span className="session-icon"><BarChart3 size={14} /></span><span>Nifty midcap breakouts</span><ChevronRight size={13} /></Link>
            <Link className="session-item" to="/predictions"><span className="session-icon"><TrendingUp size={14} /></span><span>IT pullback setups</span><ChevronRight size={13} /></Link>
          </div>

          <div className="sidebar-bottom"><span className="sidebar-user-icon">D</span><span className="sidebar-user-name">DevLab workspace<small>Sample account</small></span><Check size={14} className="account-check" /></div>
        </aside>

        <main className="workspace-main">
          <div className="workspace-content">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function ChangeArrow({ positive }: { positive: boolean }) {
  return positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />;
}
