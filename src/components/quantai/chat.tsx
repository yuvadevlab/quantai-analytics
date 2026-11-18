import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, CircleHelp, Command, CornerDownLeft, MoreHorizontal, Plus, Send, ShieldCheck, Sparkles, Target, WandSparkles, Zap } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signals } from "./data";
import { QuantLayout } from "./layout";

const quickPrompts = [
  { icon: Zap, label: "Scan Nifty 50 breakouts" },
  { icon: Target, label: "BankNifty expiry setups" },
  { icon: ArrowUpRight, label: "Reliance 15m outlook" },
  { icon: ShieldCheck, label: "Show call accuracy report" },
];

type ConversationItem = { type: "user" | "assistant"; text: string; id: number };

export function ChatWorkspace() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ConversationItem[]>([]);
  const featured = signals[0];

  function submitPrompt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = prompt.trim();
    if (!question) return;
    const messageId = Date.now();
    setMessages((current) => [
      ...current,
      { type: "user", text: question, id: messageId },
      {
        type: "assistant",
        text: `Demo analysis for “${question}”: this sample workspace has no live market feed or AI model connected. RELIANCE is shown at ₹2,431.20 in the illustrative example; check the prediction ledger for sample call levels.`,
        id: messageId + 1,
      },
    ]);
    setPrompt("");
  }

  return (
    <QuantLayout active="chat">
      <div className="page-heading chat-heading">
        <div><div className="eyebrow"><span className="eyebrow-dot" />QUANT RESEARCH WORKSPACE</div><h1>Market intelligence</h1><p>Explore a sample market conversation and tracked trade ideas.</p></div>
        <div className="heading-actions"><span className="demo-outline"><i />ILLUSTRATIVE DATA</span><Button variant="outline" size="sm" className="heading-utility"><MoreHorizontal size={16} /><span>Actions</span></Button></div>
      </div>

      <div className="chat-session-bar"><span className="session-active-mark" /><span>RELIANCE · Intraday technical outlook</span><span className="chat-session-time">Today, 09:45</span><Button variant="ghost" size="icon" aria-label="Conversation options" title="Conversation options" className="subtle-icon-button"><MoreHorizontal size={16} /></Button></div>

      <section className="chat-stream" aria-label="Illustrative market conversation">
        <div className="chat-message-row assistant-row">
          <span className="assistant-mark"><Sparkles size={15} /></span>
          <div className="message-main"><div className="message-byline"><strong>QuantAI</strong><span>DEMO RESPONSE</span><time>09:45 AM</time></div>
            <p className="message-paragraph">Reliance is holding above its 20 EMA after a strong opening range. The sample setup shows expanding volume and positive sector breadth. Here are the key levels in this illustrative call:</p>
            <article className="signal-card">
              <div className="signal-topline"><div className="signal-symbol-lockup"><span className="signal-brand-icon">R</span><span><strong>{featured.symbol}</strong><small>NSE CASH <i /> {featured.id}</small></span></div><span className="signal-buy-tag">BUY / LONG</span><span className="signal-horizon-tag">INTRADAY</span><span className="signal-confidence">CONFIDENCE <strong>{featured.confidence}</strong></span></div>
              <div className="signal-levels"><Level label="ENTRY RANGE" value={featured.entry} /><Level label="TARGET 01" value={featured.target1} positive /><Level label="TARGET 02" value={featured.target2} positive /><Level label="STOP LOSS" value={featured.stop} negative /><Level label="RISK / REWARD" value="1 : 2.5" /></div>
              <div className="signal-catalysts"><span className="catalysts-title">SETUP</span>{featured.catalysts.map((catalyst) => <span key={catalyst} className="catalyst-chip">{catalyst}</span>)}</div>
              <div className="signal-status-row"><span className="status-live"><i />ACTIVE · DEMO TRACKING</span><span className="signal-ltp">SAMPLE LTP <strong>{featured.last}</strong> <span className="gain-text">{featured.change}</span></span><Link to="/predictions/$id" params={{ id: featured.id }} className="signal-open-link">Open trajectory <ArrowRight size={14} /></Link></div>
            </article>
            <div className="assistant-footnote"><CircleHelp size={13} />Illustrative example only · Not investment advice</div>
          </div>
        </div>

        <div className="user-message-row"><div className="user-message-copy"><div className="message-byline user-byline"><time>09:46 AM</time><strong>You</strong></div><div className="user-message-bubble">What would invalidate this setup?</div></div><span className="user-message-avatar">D</span></div>
        <div className="chat-message-row assistant-row response-row"><span className="assistant-mark assistant-mark-subtle"><Sparkles size={14} /></span><div className="message-main"><div className="message-byline"><strong>QuantAI</strong><span>DEMO RESPONSE</span><time>09:46 AM</time></div><p className="message-paragraph">In this illustrative scenario, a 15-minute close below ₹2,400 would invalidate the bullish structure. The ₹2,402 sample stop defines the preset risk level. Confirm prices independently before making any decisions.</p><div className="response-reference"><span className="reference-icon"><ShieldCheck size={14} /></span><span><strong>Invalidation level</strong><small>Sample 15-minute close below ₹2,400</small></span><span className="reference-rule">SETUP RULE</span></div></div></div>

        {messages.map((message) => message.type === "user" ? (
          <div className="user-message-row" key={message.id}><div className="user-message-copy"><div className="message-byline user-byline"><time>Just now</time><strong>You</strong></div><div className="user-message-bubble">{message.text}</div></div><span className="user-message-avatar">D</span></div>
        ) : (
          <div className="chat-message-row assistant-row response-row" key={message.id}><span className="assistant-mark assistant-mark-subtle"><Sparkles size={14} /></span><div className="message-main"><div className="message-byline"><strong>QuantAI</strong><span>DEMO RESPONSE</span><time>Just now</time></div><p className="message-paragraph">{message.text}</p></div></div>
        ))}
      </section>

      <div className="chat-bottom-zone"><div className="prompt-suggestions-label">QUICK ANALYSIS <ChevronDown size={12} /></div><div className="prompt-suggestions">{quickPrompts.map(({ icon: Icon, label }) => <Button key={label} size="sm" variant="outline" className="suggestion-chip" onClick={() => setPrompt(label)}><Icon size={13} />{label}</Button>)}</div><form className="prompt-composer" onSubmit={submitPrompt}><span className="composer-orb"><WandSparkles size={16} /></span><Input aria-label="Ask QuantAI for a sample market analysis" placeholder="Ask about a market, symbol, or setup…" value={prompt} onChange={(event) => setPrompt(event.target.value)} /><span className="composer-hint"><Command size={12} /> Enter to send</span><Button type="submit" size="icon" aria-label="Send message" title="Send message" className="composer-send"><Send size={15} /></Button></form><div className="composer-disclaimer"><ShieldCheck size={12} />Sample workspace · AI responses and prices are illustrative only<span className="composer-disclaimer-spacer" /><Button variant="ghost" size="sm" className="add-analysis"><Plus size={13} />New analysis</Button><span className="composition-key"><CornerDownLeft size={11} /><ArrowDown size={10} /></span></div></div>

      <div className="chat-footer"><span><span className="footer-status-dot" /> Sample session</span><span>Market data and performance figures shown are illustrative, not live.</span></div>
    </QuantLayout>
  );
}

function Level({ label, value, positive = false, negative = false }: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return <div className="signal-level"><span>{label}</span><strong className={positive ? "gain-text" : negative ? "loss-text" : ""}>{value}</strong></div>;
}