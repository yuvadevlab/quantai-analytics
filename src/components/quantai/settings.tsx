import { Bell, Check, ChevronRight, CircleHelp, Monitor, Radio, ShieldCheck, SlidersHorizontal, Sparkles, User, Volume2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuantLayout } from "./layout";

export function SettingsWorkspace() {
  const [compact, setCompact] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [sound, setSound] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggle(setter: (value: boolean) => void, value: boolean) {
    setter(!value);
    setSaved(false);
  }

  return (
    <QuantLayout active="settings">
      <div className="page-heading settings-heading"><div><div className="eyebrow"><span className="eyebrow-dot" />WORKSPACE CONFIGURATION</div><h1>Settings</h1><p>Manage your local workspace display and alert preferences.</p></div><div className="heading-actions"><span className="demo-outline"><i />SAVED LOCALLY</span></div></div>
      <div className="settings-content"><aside className="settings-navigation"><span className="settings-nav-label">PREFERENCES</span><button type="button" className="settings-nav-item settings-nav-selected"><Monitor size={15} />Display & appearance<ChevronRight size={14} /></button><button type="button" className="settings-nav-item" onClick={() => document.getElementById("alert-settings")?.scrollIntoView({ behavior: "smooth" })}><Bell size={15} />Notifications<ChevronRight size={14} /></button><button type="button" className="settings-nav-item" onClick={() => document.getElementById("account-settings")?.scrollIntoView({ behavior: "smooth" })}><User size={15} />Account<ChevronRight size={14} /></button><div className="settings-nav-footer"><ShieldCheck size={14} /><span>Demo workspace<small>No account connected</small></span></div></aside>

        <div className="settings-sections"><section className="settings-section"><div className="settings-section-heading"><div className="settings-section-icon"><Monitor size={16} /></div><div><h2>Display & appearance</h2><p>Choose how market information is presented in your workspace.</p></div></div><div className="settings-row"><div className="settings-row-copy"><strong>Market time zone</strong><span>Applied to chart times and call timestamps.</span></div><span className="settings-value"><Radio size={13} />Asia/Kolkata <ChevronRight size={12} /></span></div><div className="settings-row"><div className="settings-row-copy"><strong>Number format</strong><span>Indian rupee with digit grouping.</span></div><span className="settings-value mono-text">₹1,23,456.78 <Check size={12} /></span></div><div className="settings-row"><div className="settings-row-copy"><strong>Compact data density</strong><span>Show more rows and information at a glance.</span></div><button role="switch" aria-checked={compact} aria-label="Compact data density" type="button" className={`switch-control${compact ? " switch-on" : ""}`} onClick={() => toggle(setCompact, compact)}><span /></button></div></section>

          <section className="settings-section" id="alert-settings"><div className="settings-section-heading"><div className="settings-section-icon alert-settings-icon"><Bell size={16} /></div><div><h2>Notifications</h2><p>Sample alert preferences. Live price alerts are not connected.</p></div></div><div className="settings-row"><div className="settings-row-copy"><strong>Call status notifications</strong><span>Be notified when a tracked call changes status.</span></div><button role="switch" aria-checked={notifications} aria-label="Call status notifications" type="button" className={`switch-control${notifications ? " switch-on" : ""}`} onClick={() => toggle(setNotifications, notifications)}><span /></button></div><div className="settings-row"><div className="settings-row-copy"><strong>Sound alerts</strong><span>Play a sound when a sample alert is shown.</span></div><button role="switch" aria-checked={sound} aria-label="Sound alerts" type="button" className={`switch-control${sound ? " switch-on" : ""}`} onClick={() => toggle(setSound, sound)}><span /></button></div></section>

          <section className="settings-section" id="account-settings"><div className="settings-section-heading"><div className="settings-section-icon ai-settings-icon"><Sparkles size={16} /></div><div><h2>Model & data</h2><p>This example workspace does not connect to a market feed or AI service.</p></div></div><div className="settings-row"><div className="settings-row-copy"><strong>Displayed model</strong><span>Shown for demonstration purposes only.</span></div><span className="settings-value settings-model-value"><Sparkles size={13} />Gemini 2.0 <span>SIMULATED</span></span></div><div className="settings-row settings-disclaimer-row"><span className="settings-disclaimer-icon"><CircleHelp size={15} /></span><div className="settings-row-copy"><strong>Illustrative content</strong><span>All prices, calls, metrics, and model responses are fictional demonstration content and are not investment advice.</span></div></div></section>

          <div className="settings-action-row"><span className="save-indicator">{saved ? <><Check size={13} />Changes saved locally</> : <><SlidersHorizontal size={13} />Preference preview</>}</span><Button size="sm" className="save-settings" onClick={() => setSaved(true)}>{saved ? <><Check size={14} />Saved</> : "Save preferences"}</Button></div>
          <div className="settings-build-note"><Volume2 size={13} /><span>Preferences apply to this browser session. Market connections, login, and live notifications are not configured.</span></div>
        </div>
      </div>
    </QuantLayout>
  );
}