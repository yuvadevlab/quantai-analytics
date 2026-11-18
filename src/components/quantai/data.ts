export type SignalStatus = "Active" | "Target hit" | "Stop loss hit" | "Expired";
export type SignalHorizon = "Intraday" | "Swing" | "Options";

export interface Signal {
  id: string;
  symbol: string;
  instrument: string;
  direction: "BUY" | "SELL";
  horizon: SignalHorizon;
  entry: string;
  entryPrice: number;
  target1: string;
  target2: string;
  stop: string;
  last: string;
  change: string;
  mfe: string;
  mae: string;
  status: SignalStatus;
  time: string;
  confidence: string;
  catalysts: string[];
}

export const signals: Signal[] = [
  {
    id: "PRED-8942",
    symbol: "RELIANCE",
    instrument: "NSE · Cash",
    direction: "BUY",
    horizon: "Intraday",
    entry: "₹2,420–2,425",
    entryPrice: 2422.5,
    target1: "₹2,455",
    target2: "₹2,480",
    stop: "₹2,402",
    last: "₹2,431.20",
    change: "+0.36%",
    mfe: "+1.12%",
    mae: "−0.22%",
    status: "Active",
    time: "Today 09:45",
    confidence: "78%",
    catalysts: ["20 EMA Bounce", "Volume Expansion +42%", "Call Unwinding"],
  },
  {
    id: "PRED-8941",
    symbol: "BANKNIFTY",
    instrument: "NSE · 51,000 CE",
    direction: "BUY",
    horizon: "Options",
    entry: "₹386–392",
    entryPrice: 389,
    target1: "₹428",
    target2: "₹461",
    stop: "₹361",
    last: "₹407.60",
    change: "+1.84%",
    mfe: "+2.06%",
    mae: "−0.34%",
    status: "Active",
    time: "Today 09:38",
    confidence: "82%",
    catalysts: ["Expiry Momentum", "Put Writing", "VWAP Reclaim"],
  },
  {
    id: "PRED-8939",
    symbol: "HDFCBANK",
    instrument: "NSE · Cash",
    direction: "SELL",
    horizon: "Intraday",
    entry: "₹1,742–1,747",
    entryPrice: 1744.5,
    target1: "₹1,718",
    target2: "₹1,704",
    stop: "₹1,760",
    last: "₹1,738.50",
    change: "−0.28%",
    mfe: "+0.62%",
    mae: "−0.12%",
    status: "Active",
    time: "Today 09:32",
    confidence: "74%",
    catalysts: ["Resistance Rejection", "Banking Weakness", "Below VWAP"],
  },
  {
    id: "PRED-8937",
    symbol: "TATASTEEL",
    instrument: "NSE · Cash",
    direction: "BUY",
    horizon: "Swing",
    entry: "₹158.60–159.20",
    entryPrice: 158.9,
    target1: "₹164.50",
    target2: "₹169.00",
    stop: "₹155.80",
    last: "₹160.05",
    change: "+0.73%",
    mfe: "+0.91%",
    mae: "−0.18%",
    status: "Active",
    time: "Today 09:18",
    confidence: "76%",
    catalysts: ["Sector Rotation", "Range Breakout", "Volume +31%"],
  },
  {
    id: "PRED-8928",
    symbol: "NIFTY 50",
    instrument: "NSE · Index",
    direction: "BUY",
    horizon: "Intraday",
    entry: "24,102–24,118",
    entryPrice: 24110,
    target1: "24,185",
    target2: "24,220",
    stop: "24,068",
    last: "24,185.00",
    change: "+0.31%",
    mfe: "+0.36%",
    mae: "−0.09%",
    status: "Target hit",
    time: "Today 09:06",
    confidence: "81%",
    catalysts: ["Opening Range", "Futures Premium", "Broad Participation"],
  },
  {
    id: "PRED-8913",
    symbol: "TCS",
    instrument: "NSE · Cash",
    direction: "BUY",
    horizon: "Swing",
    entry: "₹3,814–3,826",
    entryPrice: 3820,
    target1: "₹3,875",
    target2: "₹3,910",
    stop: "₹3,785",
    last: "₹3,785.00",
    change: "−0.91%",
    mfe: "+0.18%",
    mae: "−0.91%",
    status: "Stop loss hit",
    time: "Yesterday 14:12",
    confidence: "69%",
    catalysts: ["Pullback Entry", "IT Breadth", "Risk Defined"],
  },
  {
    id: "PRED-8908",
    symbol: "ICICIBANK",
    instrument: "NSE · Cash",
    direction: "BUY",
    horizon: "Swing",
    entry: "₹1,312–1,320",
    entryPrice: 1316,
    target1: "₹1,355",
    target2: "₹1,378",
    stop: "₹1,296",
    last: "₹1,355.00",
    change: "+1.56%",
    mfe: "+1.74%",
    mae: "−0.16%",
    status: "Target hit",
    time: "Yesterday 13:44",
    confidence: "79%",
    catalysts: ["Higher High", "Put OI Support", "Relative Strength"],
  },
  {
    id: "PRED-8872",
    symbol: "INFY",
    instrument: "NSE · Cash",
    direction: "SELL",
    horizon: "Intraday",
    entry: "₹1,509–1,513",
    entryPrice: 1511,
    target1: "₹1,492",
    target2: "₹1,481",
    stop: "₹1,521",
    last: "₹1,506.20",
    change: "−0.19%",
    mfe: "+0.44%",
    mae: "−0.20%",
    status: "Expired",
    time: "18 Nov 14:26",
    confidence: "72%",
    catalysts: ["Lower High", "Supply Zone", "Weak IT Breadth"],
  },
];

export const marketTicks = [
  { name: "NIFTY 50", price: "24,180.50", change: "+0.45%", positive: true, path: "0,14 12,11 24,13 36,5 48,9 60,2" },
  { name: "BANKNIFTY", price: "51,200.10", change: "−0.12%", positive: false, path: "0,4 12,8 24,3 36,12 48,9 60,15" },
  { name: "MIDCPNIFTY", price: "12,850.30", change: "+0.82%", positive: true, path: "0,15 12,12 24,9 36,11 48,5 60,1" },
  { name: "INDIA VIX", price: "13.82", change: "−2.10%", positive: false, path: "0,3 12,6 24,4 36,11 48,9 60,14", isVix: true },
];

export const watchlist = [
  { name: "NIFTY 50", price: "24,180.50", change: "+0.45%", positive: true },
  { name: "BANKNIFTY", price: "51,200.10", change: "−0.12%", positive: false },
  { name: "RELIANCE", price: "2,431.20", change: "+0.36%", positive: true },
  { name: "HDFCBANK", price: "1,738.50", change: "−0.28%", positive: false },
  { name: "TATASTEEL", price: "160.05", change: "+0.73%", positive: true },
];