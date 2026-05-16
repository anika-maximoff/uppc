import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, LineChart, Line
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Therapy Aids", "Medical Devices", "Supplements", "Mobility", "Orthotics"];

const PRODUCTS = [
  { id: "PRD-001", name: "TENS Unit (Portable)", category: "Medical Devices",  price: 3800,  stock: 12, threshold: 5,  status: "active",   sold: 34, description: "Portable transcutaneous electrical nerve stimulation unit for pain relief.", supplier: "MedTech BD" },
  { id: "PRD-002", name: "Resistance Band Set", category: "Therapy Aids",      price: 650,   stock: 3,  threshold: 8,  status: "active",   sold: 91, description: "5-level resistance band set for physiotherapy and rehabilitation exercises.", supplier: "PhysioSupply Co." },
  { id: "PRD-003", name: "Omega-3 Fish Oil",    category: "Supplements",        price: 420,   stock: 48, threshold: 10, status: "active",   sold: 120, description: "High-potency omega-3 supplement supporting nerve and joint health.", supplier: "NutriCare BD" },
  { id: "PRD-004", name: "Cervical Collar (Soft)", category: "Orthotics",      price: 980,   stock: 7,  threshold: 5,  status: "active",   sold: 22, description: "Soft foam cervical collar for neck support and immobilization.", supplier: "OrthoMed Ltd." },
  { id: "PRD-005", name: "Wheelchair (Standard)", category: "Mobility",        price: 12500, stock: 4,  threshold: 3,  status: "active",   sold: 8,  description: "Foldable steel-frame standard wheelchair with armrests.", supplier: "MobiLife BD" },
  { id: "PRD-006", name: "Ultrasound Gel (500ml)", category: "Therapy Aids",   price: 280,   stock: 2,  threshold: 15, status: "active",   sold: 200, description: "Water-soluble conductive gel for ultrasound therapy sessions.", supplier: "PhysioSupply Co." },
  { id: "PRD-007", name: "Lumbar Support Belt",  category: "Orthotics",        price: 1200,  stock: 9,  threshold: 6,  status: "active",   sold: 45, description: "Adjustable lumbar support belt for lower back pain management.", supplier: "OrthoMed Ltd." },
  { id: "PRD-008", name: "Vitamin D3 (1000 IU)", category: "Supplements",      price: 180,   stock: 60, threshold: 20, status: "active",   sold: 310, description: "Vitamin D3 softgels for bone health and muscle function.", supplier: "NutriCare BD" },
  { id: "PRD-009", name: "Hot/Cold Gel Pack",    category: "Therapy Aids",     price: 350,   stock: 0,  threshold: 10, status: "inactive", sold: 77, description: "Reusable gel pack for hot and cold therapy applications.", supplier: "PhysioSupply Co." },
  { id: "PRD-010", name: "Quad Cane",            category: "Mobility",         price: 1800,  stock: 6,  threshold: 4,  status: "active",   sold: 18, description: "Four-point base quad cane for stability and balance assistance.", supplier: "MobiLife BD" },
];

const TRANSACTIONS = [
  { id: "SL-2041", product: "Omega-3 Fish Oil",      productId: "PRD-003", qty: 3, unitPrice: 420,  total: 1260,  buyer: "Karim Uddin",    buyerId: "UPPC-2024-0481", date: "15 May 2025", method: "Cash",   status: "completed" },
  { id: "SL-2040", product: "TENS Unit (Portable)",   productId: "PRD-001", qty: 1, unitPrice: 3800, total: 3800,  buyer: "Sultana Begum",  buyerId: "UPPC-2024-0312", date: "15 May 2025", method: "bKash",  status: "completed" },
  { id: "SL-2039", product: "Resistance Band Set",    productId: "PRD-002", qty: 2, unitPrice: 650,  total: 1300,  buyer: "Rafiqul Islam",  buyerId: "UPPC-2024-0198", date: "14 May 2025", method: "Card",   status: "completed" },
  { id: "SL-2038", product: "Lumbar Support Belt",    productId: "PRD-007", qty: 1, unitPrice: 1200, total: 1200,  buyer: "Walk-in Customer", buyerId: "",             date: "14 May 2025", method: "Cash",   status: "completed" },
  { id: "SL-2037", product: "Vitamin D3 (1000 IU)",  productId: "PRD-008", qty: 4, unitPrice: 180,  total: 720,   buyer: "Nasrin Akter",   buyerId: "UPPC-2023-0874", date: "13 May 2025", method: "Nagad",  status: "completed" },
  { id: "SL-2036", product: "Cervical Collar (Soft)", productId: "PRD-004", qty: 1, unitPrice: 980,  total: 980,   buyer: "Abdul Karim",    buyerId: "UPPC-2024-0561", date: "12 May 2025", method: "Cash",   status: "completed" },
  { id: "SL-2035", product: "Ultrasound Gel (500ml)", productId: "PRD-006", qty: 5, unitPrice: 280,  total: 1400,  buyer: "Walk-in Customer", buyerId: "",             date: "11 May 2025", method: "Card",   status: "completed" },
  { id: "SL-2034", product: "Wheelchair (Standard)",  productId: "PRD-005", qty: 1, unitPrice: 12500,total: 12500, buyer: "Md. Hasan Ali",  buyerId: "UPPC-2024-0055", date: "10 May 2025", method: "Bank Transfer", status: "completed" },
];

const RESTOCK_LOG = [
  { id: "RST-041", product: "Vitamin D3 (1000 IU)",  productId: "PRD-008", qty: 100, supplier: "NutriCare BD",    unitCost: 120, total: 12000, date: "10 May 2025", invoiceNo: "NUT-8821" },
  { id: "RST-040", product: "Resistance Band Set",    productId: "PRD-002", qty: 30,  supplier: "PhysioSupply Co.", unitCost: 420, total: 12600, date: "08 May 2025", invoiceNo: "PSC-4412" },
  { id: "RST-039", product: "Omega-3 Fish Oil",       productId: "PRD-003", qty: 60,  supplier: "NutriCare BD",    unitCost: 280, total: 16800, date: "05 May 2025", invoiceNo: "NUT-8790" },
  { id: "RST-038", product: "Ultrasound Gel (500ml)", productId: "PRD-006", qty: 50,  supplier: "PhysioSupply Co.", unitCost: 180, total: 9000,  date: "01 May 2025", invoiceNo: "PSC-4380" },
];

const MONTHLY_SALES = [
  { month: "Nov", revenue: 88400,  transactions: 42 },
  { month: "Dec", revenue: 112600, transactions: 61 },
  { month: "Jan", revenue: 95200,  transactions: 50 },
  { month: "Feb", revenue: 78800,  transactions: 38 },
  { month: "Mar", revenue: 134500, transactions: 74 },
  { month: "Apr", revenue: 118900, transactions: 65 },
  { month: "May", revenue: 23160,  transactions: 15 },
];

const PATIENTS = [
  { id: "UPPC-2024-0481", name: "Karim Uddin" },
  { id: "UPPC-2024-0312", name: "Sultana Begum" },
  { id: "UPPC-2024-0198", name: "Rafiqul Islam" },
  { id: "UPPC-2023-0874", name: "Nasrin Akter" },
  { id: "UPPC-2024-0561", name: "Abdul Karim" },
  { id: "UPPC-2024-0055", name: "Md. Hasan Ali" },
];

const NAV = [
  { id: "catalog",    label: "Product Catalog",    icon: "⬡" },
  { id: "sell",       label: "Record a Sale",       icon: "✦" },
  { id: "inventory",  label: "Inventory",           icon: "◈" },
  { id: "restock",    label: "Restock Products",    icon: "◇" },
  { id: "ledger",     label: "Sales Ledger",        icon: "◉" },
  { id: "reports",    label: "Monthly Reports",     icon: "◎" },
];

const PAGE_TITLES = {
  catalog:   ["Product",  "Catalog"],
  sell:      ["Record a", "Sale"],
  inventory: ["Stock",    "Inventory"],
  restock:   ["Restock",  "Products"],
  ledger:    ["Sales",    "Ledger"],
  reports:   ["Monthly",  "Reports"],
};

// ─── Shared CSS ───────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy:   #07111f;
    --navy2:  #0d1f33;
    --navy3:  #112840;
    --navy4:  #162f48;
    --gold:   #c9a84c;
    --gold2:  #e8c97a;
    --gdim:   rgba(201,168,76,0.13);
    --gbord:  rgba(201,168,76,0.22);
    --text:   #ddd5c2;
    --text2:  rgba(221,213,194,0.6);
    --text3:  rgba(221,213,194,0.33);
    --bord:   rgba(201,168,76,0.11);
    --ok:     #2eb87a;
    --warn:   #e8a030;
    --danger: #e85555;
    --info:   #4a9fd4;
    --r:      6px;
    --rl:     12px;
  }
  body { background: var(--navy); color: var(--text); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
  input, select, textarea { font-family: 'DM Sans', sans-serif; outline: none; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  .shell   { display: flex; min-height: 100vh; }
  .sidebar { width: 256px; min-height: 100vh; background: var(--navy2); border-right: 1px solid var(--bord); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
  .main    { margin-left: 256px; flex: 1; background: var(--navy); }
  .topbar  { padding: 18px 36px; border-bottom: 1px solid var(--bord); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; background: rgba(7,17,31,0.92); backdrop-filter: blur(10px); }
  .content { padding: 32px 36px; }

  .sb-logo     { padding: 26px 26px 18px; border-bottom: 1px solid var(--bord); }
  .sb-logo-txt { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 600; }
  .sb-logo-sub { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--text3); margin-top: 2px; }
  .sb-module   { padding: 12px 26px 16px; border-bottom: 1px solid var(--bord); }
  .sb-mod-lbl  { font-size: 9px; letter-spacing: .22em; text-transform: uppercase; color: var(--text3); margin-bottom: 5px; }
  .sb-mod-name { font-size: 12px; color: var(--gold); font-weight: 500; }
  .sb-nav      { flex: 1; padding: 14px 0; overflow-y: hidden; }
  .nav-item    { display: flex; align-items: center; gap: 11px; padding: 10px 26px; font-size: 13px; color: var(--text2); cursor: pointer; transition: all .18s; border-left: 2px solid transparent; }
  .nav-item:hover  { color: var(--text); background: rgba(201,168,76,0.04); }
  .nav-item.active { color: var(--gold); border-left-color: var(--gold); background: var(--gdim); }
  .nav-icon    { font-size: 13px; width: 16px; text-align: center; opacity: .75; }
  .nav-item.active .nav-icon { opacity: 1; }
  .sb-foot     { padding: 18px 26px; border-top: 1px solid var(--bord); }
  .sb-status   { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text3); margin-bottom: 12px; }
  .online-dot  { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
  .logout      { font-size: 12px; color: var(--text3); background: none; border: none; padding: 0; display: flex; align-items: center; gap: 8px; transition: color .2s; letter-spacing: .05em; }
  .logout:hover { color: var(--danger); }

  .pg-title    { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; }
  .pg-title span { color: var(--gold); font-style: italic; }
  .tb-right    { display: flex; align-items: center; gap: 14px; }
  .date-chip   { font-size: 11px; letter-spacing: .1em; color: var(--text3); padding: 6px 14px; border: 1px solid var(--bord); border-radius: 20px; }
  .icon-btn    { width: 36px; height: 36px; border-radius: 50%; background: var(--navy2); border: 1px solid var(--bord); display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--text2); transition: all .2s; position: relative; }
  .icon-btn:hover { border-color: var(--gbord); color: var(--gold); }
  .ndot        { width: 7px; height: 7px; border-radius: 50%; background: var(--danger); position: absolute; top: 5px; right: 5px; }

  .card   { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 24px; }
  .card-s { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 18px 20px; }
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 20px 22px; transition: border-color .2s; }
  .stat:hover { border-color: var(--gbord); }
  .stat-lbl { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--text3); margin-bottom: 8px; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 3px; }
  .stat-sub { font-size: 11px; color: var(--text3); }

  .sh { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .sh-title { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 400; }
  .sh-title span { color: var(--gold); font-style: italic; }
  .lnk { font-size: 11px; color: var(--gold); letter-spacing: .08em; background: none; border: none; padding: 0; opacity: .8; transition: opacity .2s; cursor: pointer; }
  .lnk:hover { opacity: 1; }

  .badge { display: inline-block; font-size: 10px; font-weight: 500; letter-spacing: .09em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; }
  .b-active     { background: rgba(46,184,122,.14);  color: var(--ok);     }
  .b-inactive   { background: rgba(221,213,194,.08); color: var(--text3);  }
  .b-low        { background: rgba(232,85,85,.14);   color: var(--danger); }
  .b-ok         { background: rgba(46,184,122,.14);  color: var(--ok);     }
  .b-warn       { background: rgba(232,160,48,.14);  color: var(--warn);   }
  .b-completed  { background: rgba(46,184,122,.14);  color: var(--ok);     }
  .b-therapy    { background: rgba(201,168,76,.18);  color: var(--gold);   }
  .b-medical    { background: rgba(74,159,212,.14);  color: var(--info);   }
  .b-supplement { background: rgba(46,184,122,.12);  color: var(--ok);     }
  .b-mobility   { background: rgba(232,160,48,.14);  color: var(--warn);   }
  .b-orthotics  { background: rgba(150,120,200,.18); color: #b89ee0;       }

  .btn-gold  { background: var(--gold); color: var(--navy); font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; padding: 10px 24px; border: none; border-radius: var(--r); transition: all .2s; }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(201,168,76,.2); }
  .btn-gold:disabled { opacity: .45; transform: none; box-shadow: none; cursor: not-allowed; }
  .btn-out { background: transparent; color: var(--gold); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; padding: 8px 18px; border: 1px solid var(--gbord); border-radius: var(--r); transition: all .2s; }
  .btn-out:hover { background: var(--gdim); }
  .btn-sm  { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; padding: 6px 13px; border: 1px solid var(--bord); color: var(--text3); background: none; border-radius: var(--r); transition: all .2s; }
  .btn-sm:hover { border-color: var(--gbord); color: var(--gold); }
  .btn-danger { background: rgba(232,85,85,.1); color: var(--danger); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; padding: 6px 13px; border: 1px solid rgba(232,85,85,.25); border-radius: var(--r); transition: all .2s; }
  .btn-danger:hover { background: rgba(232,85,85,.18); }

  .ptbl { width: 100%; border-collapse: collapse; }
  .ptbl th { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--text3); padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--bord); font-weight: 400; }
  .ptbl td { padding: 13px 14px; font-size: 13px; color: var(--text2); border-bottom: 1px solid rgba(201,168,76,.055); vertical-align: middle; }
  .ptbl tr:last-child td { border-bottom: none; }
  .ptbl tr:hover td { background: rgba(201,168,76,.025); }
  .pt-name { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 2px; }
  .pt-id   { font-size: 10px; color: var(--text3); letter-spacing: .06em; }

  .field { display: flex; flex-direction: column; gap: 6px; }
  .field label { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--text3); }
  .field input, .field select, .field textarea { background: var(--navy3); border: 1px solid var(--bord); border-radius: var(--r); padding: 10px 13px; font-size: 13px; color: var(--text); transition: border-color .2s; }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--gbord); }
  .field select option { background: var(--navy2); }
  .fg2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .fg3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 14px; }

  .dvd { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--text3); display: flex; align-items: center; gap: 10px; margin: 20px 0 14px; }
  .dvd::before, .dvd::after { content:''; flex:1; height:1px; background:var(--bord); }

  .success-box { background: rgba(46,184,122,.07); border: 1px solid rgba(46,184,122,.22); border-radius: var(--rl); padding: 36px; text-align: center; }
  .alert-box   { background: rgba(232,85,85,.06);  border: 1px solid rgba(232,85,85,.22);  border-radius: var(--r); padding: 12px 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--danger); margin-bottom: 14px; }
  .warn-alert  { background: rgba(232,160,48,.06); border: 1px solid rgba(232,160,48,.22); border-radius: var(--r); padding: 10px 14px; display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--warn); margin-bottom: 10px; }

  .product-card { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 18px; transition: border-color .2s, transform .2s; cursor: pointer; }
  .product-card:hover { border-color: var(--gbord); transform: translateY(-2px); }
  .product-card.low-stock { border-color: rgba(232,85,85,.3); }
  .product-icon { width: 44px; height: 44px; border-radius: var(--r); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 12px; }
  .stock-bar-wrap { background: var(--navy3); border-radius: 3px; height: 4px; overflow: hidden; margin-top: 6px; }
  .stock-bar { height: 100%; border-radius: 3px; transition: width .6s; }

  .receipt-box { background: var(--navy3); border: 1px solid var(--gbord); border-radius: var(--rl); padding: 26px; max-width: 440px; margin: 0 auto; }
  .receipt-row { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid var(--bord); font-size: 13px; }
  .receipt-row:last-child { border-bottom: none; }
  .receipt-row .rkey { color: var(--text3); font-size: 11px; letter-spacing: .08em; }
  .receipt-row .rval { color: var(--text); font-weight: 500; }

  .mini-bar-wrap { background: var(--navy3); border-radius: 3px; height: 5px; width: 80px; overflow: hidden; margin-top: 5px; }
  .mini-bar { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--gold), var(--gold2)); }

  .cat-pill { padding: 6px 14px; border: 1px solid var(--bord); border-radius: 20px; font-size: 11px; color: var(--text3); background: transparent; transition: all .2s; cursor: pointer; }
  .cat-pill:hover { border-color: var(--gbord); color: var(--text); }
  .cat-pill.active { border-color: var(--gold); background: var(--gdim); color: var(--gold); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(7,17,31,.82); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal-box { background: var(--navy2); border: 1px solid var(--gbord); border-radius: var(--rl); padding: 28px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation: fadeUp .32s ease forwards; }

  .recharts-tooltip-wrapper { pointer-events: none !important; }
  .custom-tooltip { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--r); padding: 10px 14px; font-size: 12px; }
  .custom-tooltip .clabel { color: var(--text3); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px; }

  @media (max-width: 960px) {
    .sidebar { width: 210px; }
    .main { margin-left: 210px; }
    .stats-row { grid-template-columns: repeat(2,1fr); }
    .content { padding: 22px 20px; }
    .topbar { padding: 14px 20px; }
  }
  @media (max-width: 640px) {
    .sidebar { display: none; }
    .main { margin-left: 0; }
    .fg2, .fg3 { grid-template-columns: 1fr; }
  }
`;

const fmt = n => "৳" + Number(n).toLocaleString("en-BD");

const CAT_ICONS = {
  "Therapy Aids":    { icon: "🩺", bg: "rgba(201,168,76,.15)"  },
  "Medical Devices": { icon: "⚡", bg: "rgba(74,159,212,.15)"  },
  "Supplements":     { icon: "💊", bg: "rgba(46,184,122,.15)"  },
  "Mobility":        { icon: "♿", bg: "rgba(232,160,48,.15)"  },
  "Orthotics":       { icon: "🦴", bg: "rgba(150,120,200,.15)" },
};

const catBadge = cat => {
  const map = { "Therapy Aids":"therapy", "Medical Devices":"medical", "Supplements":"supplement", "Mobility":"mobility", "Orthotics":"orthotics" };
  return map[cat] || "therapy";
};

const CTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="clabel">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color || "var(--gold)", fontSize: 13, marginTop: 2 }}>
          {p.name}: <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>
            {p.dataKey === "revenue" ? fmt(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const lowStockItems = PRODUCTS.filter(p => p.stock <= p.threshold && p.status === "active");

// ─── Product Catalog ──────────────────────────────────────────────────────────
function ProductCatalog({ setPage }) {
  const [cat, setCat]       = useState("All");
  const [search, setSearch] = useState("");
  const [editProd, setEditProd] = useState(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [products, setProducts] = useState(PRODUCTS);

  const [form, setForm] = useState({ name:"", category:"Therapy Aids", price:"", stock:"", threshold:"", description:"", supplier:"", status:"active" });

  const filtered = products.filter(p => {
    const matchC = cat === "All" || p.category === cat;
    const matchS = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    return matchC && matchS;
  });

  const saveEdit = () => {
    setProducts(ps => ps.map(p => p.id === editProd.id ? { ...editProd } : p));
    setEditProd(null);
  };

  const addProduct = () => {
    const newP = { ...form, id: "PRD-0" + (products.length + 11), price: Number(form.price), stock: Number(form.stock), threshold: Number(form.threshold), sold: 0 };
    setProducts(ps => [...ps, newP]);
    setShowAdd(false);
    setForm({ name:"", category:"Therapy Aids", price:"", stock:"", threshold:"", description:"", supplier:"", status:"active" });
  };

  const toggleStatus = id => setProducts(ps => ps.map(p => p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p));

  return (
    <div className="fade-in">
      {/* Low stock alerts */}
      {lowStockItems.length > 0 && (
        <div className="alert-box" style={{ marginBottom: 16 }}>
          <span>⚠</span>
          <span><strong>{lowStockItems.length} products</strong> are below their low-stock threshold: {lowStockItems.map(p => p.name).join(", ")}</span>
          <button className="btn-sm" style={{ marginLeft: "auto" }} onClick={() => setPage("inventory")}>View Inventory</button>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ background:"var(--navy2)", border:"1px solid var(--bord)", borderRadius:"var(--r)", padding:"9px 14px", fontSize:13, color:"var(--text)", width:220, transition:"border-color .2s" }}
          onFocus={e => e.target.style.borderColor="var(--gbord)"} onBlur={e => e.target.style.borderColor="var(--bord)"} />
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-pill ${cat===c?"active":""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <button className="btn-gold" style={{ marginLeft:"auto" }} onClick={() => setShowAdd(true)}>+ Add Product</button>
      </div>

      {/* Product grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px,1fr))", gap:14, marginBottom:20 }}>
        {filtered.map(p => {
          const ci = CAT_ICONS[p.category] || CAT_ICONS["Therapy Aids"];
          const stockPct = Math.min(100, Math.round(p.stock / (p.threshold * 3) * 100));
          const isLow = p.stock <= p.threshold;
          return (
            <div key={p.id} className={`product-card ${isLow && p.status==="active" ? "low-stock":""}`}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div className="product-icon" style={{ background:ci.bg }}>{ci.icon}</div>
                <div style={{ display:"flex", gap:6, flexDirection:"column", alignItems:"flex-end" }}>
                  <span className={`badge b-${p.status}`}>{p.status}</span>
                  {isLow && p.status==="active" && <span className="badge b-low">Low Stock</span>}
                </div>
              </div>
              <div style={{ fontSize:13, fontWeight:500, color:"var(--text)", marginBottom:3, lineHeight:1.3 }}>{p.name}</div>
              <div style={{ fontSize:10, color:"var(--text3)", marginBottom:8 }}>{p.id} · <span className={`badge b-${catBadge(p.category)}`} style={{ fontSize:9 }}>{p.category}</span></div>
              <div style={{ fontSize:11, color:"var(--text2)", marginBottom:12, lineHeight:1.5 }}>{p.description}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8 }}>
                <span className="serif" style={{ fontSize:22, color:"var(--gold)" }}>{fmt(p.price)}</span>
                <span style={{ fontSize:11, color: isLow ? "var(--danger)" : "var(--text3)" }}>Stock: <strong style={{ color: isLow ? "var(--danger)" : "var(--text)" }}>{p.stock}</strong></span>
              </div>
              <div className="stock-bar-wrap">
                <div className="stock-bar" style={{ width:`${stockPct}%`, background: isLow ? "var(--danger)" : "linear-gradient(90deg,var(--gold),var(--gold2))" }} />
              </div>
              <div style={{ fontSize:10, color:"var(--text3)", marginTop:6, marginBottom:12 }}>Threshold: {p.threshold} · Sold total: {p.sold}</div>
              <div style={{ display:"flex", gap:7 }}>
                <button className="btn-sm" style={{ flex:1 }} onClick={() => setEditProd({...p})}>Edit</button>
                <button className={p.status==="active"?"btn-danger":"btn-sm"} style={{ flex:1 }} onClick={() => toggleStatus(p.id)}>
                  {p.status==="active"?"Deactivate":"Activate"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit modal */}
      {editProd && (
        <div className="modal-overlay" onClick={e => { if(e.target === e.currentTarget) setEditProd(null); }}>
          <div className="modal-box">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div className="sh-title serif">Edit <span>Product</span></div>
              <button className="btn-sm" onClick={() => setEditProd(null)}>✕ Close</button>
            </div>
            <div className="fg2">
              <div className="field"><label>Product Name</label><input value={editProd.name} onChange={e => setEditProd({...editProd, name:e.target.value})} /></div>
              <div className="field"><label>Category</label>
                <select value={editProd.category} onChange={e => setEditProd({...editProd, category:e.target.value})}>
                  {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="fg3">
              <div className="field"><label>Unit Price (৳)</label><input type="number" value={editProd.price} onChange={e => setEditProd({...editProd, price:Number(e.target.value)})} /></div>
              <div className="field"><label>Current Stock</label><input type="number" value={editProd.stock} onChange={e => setEditProd({...editProd, stock:Number(e.target.value)})} /></div>
              <div className="field"><label>Alert Threshold</label><input type="number" value={editProd.threshold} onChange={e => setEditProd({...editProd, threshold:Number(e.target.value)})} /></div>
            </div>
            <div className="field" style={{ marginBottom:14 }}><label>Description</label><textarea rows={3} value={editProd.description} onChange={e => setEditProd({...editProd, description:e.target.value})} style={{ resize:"vertical" }} /></div>
            <div className="fg2">
              <div className="field"><label>Supplier</label><input value={editProd.supplier} onChange={e => setEditProd({...editProd, supplier:e.target.value})} /></div>
              <div className="field"><label>Status</label>
                <select value={editProd.status} onChange={e => setEditProd({...editProd, status:e.target.value})}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:6 }}>
              <button className="btn-gold" onClick={saveEdit}>Save Changes</button>
              <button className="btn-sm" style={{ padding:"10px 18px" }} onClick={() => setEditProd(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add product modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={e => { if(e.target === e.currentTarget) setShowAdd(false); }}>
          <div className="modal-box">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div className="sh-title serif">Add <span>New Product</span></div>
              <button className="btn-sm" onClick={() => setShowAdd(false)}>✕ Close</button>
            </div>
            <div className="fg2">
              <div className="field"><label>Product Name *</label><input placeholder="e.g. Ankle Brace" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
              <div className="field"><label>Category *</label>
                <select value={form.category} onChange={e => setForm({...form, category:e.target.value})}>
                  {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="fg3">
              <div className="field"><label>Unit Price (৳) *</label><input type="number" placeholder="0" value={form.price} onChange={e => setForm({...form, price:e.target.value})} /></div>
              <div className="field"><label>Opening Stock *</label><input type="number" placeholder="0" value={form.stock} onChange={e => setForm({...form, stock:e.target.value})} /></div>
              <div className="field"><label>Alert Threshold *</label><input type="number" placeholder="5" value={form.threshold} onChange={e => setForm({...form, threshold:e.target.value})} /></div>
            </div>
            <div className="field" style={{ marginBottom:14 }}><label>Description</label><textarea rows={2} placeholder="Brief product description…" value={form.description} onChange={e => setForm({...form, description:e.target.value})} style={{ resize:"vertical" }} /></div>
            <div className="fg2">
              <div className="field"><label>Supplier</label><input placeholder="Supplier name" value={form.supplier} onChange={e => setForm({...form, supplier:e.target.value})} /></div>
              <div className="field"><label>Status</label>
                <select value={form.status} onChange={e => setForm({...form, status:e.target.value})}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <button className="btn-gold" disabled={!form.name || !form.price || !form.stock} onClick={addProduct}>Add to Catalog ✦</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Record a Sale ────────────────────────────────────────────────────────────
function RecordSale() {
  const [productId, setProductId]   = useState("");
  const [qty, setQty]               = useState(1);
  const [buyerType, setBuyerType]   = useState("patient");
  const [patientId, setPatientId]   = useState("");
  const [walkin, setWalkin]         = useState("");
  const [method, setMethod]         = useState("");
  const [saved, setSaved]           = useState(false);
  const [txId]                      = useState("SL-" + (2000 + Math.floor(Math.random() * 999)));

  const product  = PRODUCTS.find(p => p.id === productId);
  const patient  = PATIENTS.find(p => p.id === patientId);
  const total    = product ? product.price * qty : 0;
  const METHODS  = ["Cash", "bKash", "Nagad", "Card", "Bank Transfer"];
  const canSave  = productId && qty >= 1 && method && (buyerType === "walkin" ? walkin : patientId) && product && product.stock >= qty;

  if (saved) {
    return (
      <div className="fade-in" style={{ maxWidth:520, margin:"0 auto", paddingTop:20 }}>
        <div className="success-box" style={{ marginBottom:22 }}>
          <div style={{ fontSize:32, marginBottom:10, color:"var(--ok)" }}>✦</div>
          <div className="serif" style={{ fontSize:26, color:"var(--ok)", marginBottom:6 }}>Sale Recorded</div>
          <div style={{ fontSize:13, color:"var(--text3)" }}>Stock updated and receipt generated for <strong style={{ color:"var(--text)" }}>{product?.name}</strong>.</div>
        </div>
        <div className="receipt-box">
          <div style={{ textAlign:"center", marginBottom:18 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, marginBottom:3 }}><span style={{ color:"var(--gold)" }}>UP</span>PC</div>
            <div style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", color:"var(--text3)" }}>Sales Receipt</div>
          </div>
          {[
            ["Receipt No",  txId],
            ["Date",        new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })],
            ["Product",     product?.name],
            ["Qty",         qty],
            ["Unit Price",  fmt(product?.price)],
            ["Total",       fmt(total)],
            ["Buyer",       buyerType === "patient" ? (patient?.name || patientId) : walkin],
            ["Payment",     method],
          ].map(([k,v]) => (
            <div className="receipt-row" key={k}>
              <span className="rkey">{k}</span>
              <span className="rval" style={k==="Total"?{fontSize:20, fontFamily:"'Cormorant Garamond',serif", color:"var(--gold)"}:{}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, marginTop:20, justifyContent:"center" }}>
          <button className="btn-out" onClick={() => { setSaved(false); setProductId(""); setQty(1); setMethod(""); setPatientId(""); setWalkin(""); }}>New Sale</button>
          <button className="btn-sm" style={{ padding:"9px 18px" }}>↓ Print Receipt</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth:680 }}>
      {/* Product selection */}
      <div className="card" style={{ marginBottom:16 }}>
        <div className="dvd" style={{ marginTop:0 }}>Select Product</div>
        <div className="fg2">
          <div className="field">
            <label>Product *</label>
            <select value={productId} onChange={e => { setProductId(e.target.value); setQty(1); }}>
              <option value="">Choose product…</option>
              {PRODUCTS.filter(p => p.status==="active").map(p => (
                <option key={p.id} value={p.id} disabled={p.stock===0}>{p.name} — {fmt(p.price)} {p.stock===0?"(Out of Stock)":""}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Quantity *</label>
            <input type="number" min="1" max={product?.stock || 99} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} />
          </div>
        </div>

        {/* Product preview */}
        {product && (
          <div style={{ padding:"14px 16px", background:"var(--navy3)", border:`1px solid ${product.stock < qty ? "rgba(232,85,85,.35)" : "var(--bord)"}`, borderRadius:"var(--r)", display:"flex", alignItems:"center", gap:14 }}>
            <div className="product-icon" style={{ background:CAT_ICONS[product.category]?.bg, marginBottom:0, width:40, height:40, fontSize:18 }}>
              {CAT_ICONS[product.category]?.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:500, color:"var(--text)" }}>{product.name}</div>
              <div style={{ fontSize:11, color:"var(--text3)", marginTop:2 }}>{product.category} · {product.id}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:"var(--text3)" }}>Available: <span style={{ color: product.stock <= product.threshold ? "var(--danger)" : "var(--ok)" }}>{product.stock}</span></div>
              <div className="serif" style={{ fontSize:22, color:"var(--gold)" }}>{fmt(product.price)} <span style={{ fontSize:13, color:"var(--text3)" }}>/ unit</span></div>
            </div>
          </div>
        )}
        {product && product.stock < qty && (
          <div className="alert-box" style={{ marginTop:10, marginBottom:0 }}>
            <span>⚠</span> Insufficient stock. Only {product.stock} units available.
          </div>
        )}
      </div>

      {/* Buyer details */}
      <div className="card" style={{ marginBottom:16 }}>
        <div className="dvd" style={{ marginTop:0 }}>Buyer Information</div>
        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          {[["patient","Registered Patient"],["walkin","Walk-in Customer"]].map(([v,l]) => (
            <div key={v} onClick={() => setBuyerType(v)} style={{ flex:1, padding:"11px 16px", background:buyerType===v?"var(--gdim)":"var(--navy3)", border:`1px solid ${buyerType===v?"var(--gold)":"var(--bord)"}`, borderRadius:"var(--r)", cursor:"pointer", transition:"all .2s", fontSize:13, color:buyerType===v?"var(--gold)":"var(--text2)", textAlign:"center" }}>
              {l}
            </div>
          ))}
        </div>
        {buyerType === "patient" ? (
          <div className="field">
            <label>Select Patient *</label>
            <select value={patientId} onChange={e => setPatientId(e.target.value)}>
              <option value="">Choose patient…</option>
              {PATIENTS.map(p => <option key={p.id} value={p.id}>{p.name} — {p.id}</option>)}
            </select>
          </div>
        ) : (
          <div className="field">
            <label>Customer Name *</label>
            <input placeholder="Walk-in customer name" value={walkin} onChange={e => setWalkin(e.target.value)} />
          </div>
        )}
      </div>

      {/* Payment */}
      <div className="card" style={{ marginBottom:16 }}>
        <div className="dvd" style={{ marginTop:0 }}>Payment Method</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
          {METHODS.map(m => (
            <div key={m} onClick={() => setMethod(m)} style={{ padding:"10px 4px", background:method===m?"var(--gdim)":"var(--navy3)", border:`1px solid ${method===m?"var(--gold)":"var(--bord)"}`, borderRadius:"var(--r)", fontSize:12, color:method===m?"var(--gold)":"var(--text2)", transition:"all .2s", textAlign:"center", cursor:"pointer" }}>
              {m}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", gap:12, alignItems:"center" }}>
        <button className="btn-gold" disabled={!canSave} onClick={() => setSaved(true)}>Confirm Sale ✦</button>
        <button className="btn-sm" style={{ padding:"10px 18px" }}>Cancel</button>
        {total > 0 && <span className="serif" style={{ fontSize:24, color:"var(--gold)", marginLeft:12 }}>Total: {fmt(total)}</span>}
      </div>
    </div>
  );
}

// ─── Inventory ────────────────────────────────────────────────────────────────
function Inventory({ setPage }) {
  const [filter, setFilter] = useState("all");

  const getStockStatus = p => {
    if (p.stock === 0) return "out";
    if (p.stock <= p.threshold) return "low";
    return "ok";
  };

  const list = PRODUCTS.filter(p => {
    if (filter === "all") return true;
    if (filter === "low") return getStockStatus(p) === "low";
    if (filter === "out") return p.stock === 0;
    if (filter === "ok")  return getStockStatus(p) === "ok";
    return true;
  });

  const outCount  = PRODUCTS.filter(p => p.stock === 0).length;
  const lowCount  = PRODUCTS.filter(p => p.stock > 0 && p.stock <= p.threshold).length;
  const okCount   = PRODUCTS.filter(p => p.stock > p.threshold).length;
  const totalVal  = PRODUCTS.reduce((s,p) => s + p.price * p.stock, 0);

  return (
    <div className="fade-in">
      <div className="stats-row">
        {[
          { lbl:"Total Products",     val:PRODUCTS.length,  sub:"In catalog",          col:"var(--gold)" },
          { lbl:"Well Stocked",       val:okCount,           sub:"Above threshold",     col:"var(--ok)"   },
          { lbl:"Low Stock Alert",    val:lowCount,          sub:"Below threshold",     col:"var(--warn)" },
          { lbl:"Out of Stock",       val:outCount,          sub:"Needs restocking",    col:"var(--danger)"},
        ].map(s => (
          <div className="stat" key={s.lbl}>
            <div className="stat-lbl">{s.lbl}</div>
            <div className="stat-val serif" style={{ color:s.col }}>{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Inventory value banner */}
      <div style={{ padding:"16px 22px", background:"var(--gdim)", border:"1px solid var(--gbord)", borderRadius:"var(--rl)", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:"var(--text3)", marginBottom:4 }}>Total Inventory Value</div>
          <div className="serif" style={{ fontSize:34, color:"var(--gold)" }}>{fmt(totalVal)}</div>
        </div>
        <button className="btn-gold" onClick={() => setPage("restock")}>+ Record Restock</button>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[["all","All Products"],["ok","Well Stocked"],["low","Low Stock"],["out","Out of Stock"]].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{ padding:"7px 16px", border:"1px solid", borderRadius:"var(--r)", fontSize:11, borderColor:filter===v?"var(--gold)":"var(--bord)", background:filter===v?"var(--gdim)":"transparent", color:filter===v?"var(--gold)":"var(--text3)", transition:"all .2s", cursor:"pointer" }}>
            {l}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding:0, overflow:"hidden" }}>
        <table className="ptbl">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>Current Stock</th>
              <th>Threshold</th>
              <th>Stock Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map(p => {
              const ss = getStockStatus(p);
              const pct = Math.min(100, Math.round(p.stock / Math.max(p.threshold * 3, 1) * 100));
              return (
                <tr key={p.id}>
                  <td>
                    <div className="pt-name">{p.name}</div>
                    <div className="pt-id">{p.id} · {p.supplier}</div>
                  </td>
                  <td><span className={`badge b-${catBadge(p.category)}`}>{p.category}</span></td>
                  <td className="serif" style={{ fontSize:18, color:"var(--gold)" }}>{fmt(p.price)}</td>
                  <td>
                    <div className="serif" style={{ fontSize:26, fontWeight:300, color: ss==="out"?"var(--danger)":ss==="low"?"var(--warn)":"var(--ok)" }}>{p.stock}</div>
                  </td>
                  <td style={{ fontSize:12, color:"var(--text3)" }}>{p.threshold}</td>
                  <td>
                    <div className="mini-bar-wrap" style={{ width:90 }}>
                      <div className="mini-bar" style={{ width:`${pct}%`, background: ss==="out"?"var(--danger)":ss==="low"?"var(--warn)":"linear-gradient(90deg,var(--ok),#5de0a4)" }} />
                    </div>
                    <div style={{ fontSize:10, color:"var(--text3)", marginTop:4 }}>{pct}% of normal</div>
                  </td>
                  <td>
                    <span className={`badge ${ss==="ok"?"b-ok":ss==="low"?"b-warn":"b-low"}`}>
                      {ss==="ok"?"In Stock":ss==="low"?"Low Stock":"Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <button className="btn-sm" onClick={() => setPage("restock")}>Restock</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Restock Products ─────────────────────────────────────────────────────────
function RestockProducts() {
  const [productId, setProductId] = useState("");
  const [qty, setQty]             = useState("");
  const [supplier, setSupplier]   = useState("");
  const [unitCost, setUnitCost]   = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate]           = useState("");
  const [saved, setSaved]         = useState(false);
  const [rstId]                   = useState("RST-0" + (42 + Math.floor(Math.random() * 10)));

  const product = PRODUCTS.find(p => p.id === productId);
  const canSave = productId && qty && supplier && unitCost;

  if (saved) {
    return (
      <div className="fade-in" style={{ maxWidth:500, margin:"0 auto", paddingTop:20 }}>
        <div className="success-box" style={{ marginBottom:22 }}>
          <div style={{ fontSize:32, marginBottom:10, color:"var(--ok)" }}>◈</div>
          <div className="serif" style={{ fontSize:24, color:"var(--ok)", marginBottom:6 }}>Restock Recorded</div>
          <div style={{ fontSize:13, color:"var(--text3)" }}>
            <strong style={{ color:"var(--text)" }}>{qty} units</strong> of <strong style={{ color:"var(--text)" }}>{product?.name}</strong> added to inventory.
          </div>
        </div>
        <div className="receipt-box">
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, marginBottom:2 }}><span style={{ color:"var(--gold)" }}>UP</span>PC</div>
            <div style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", color:"var(--text3)" }}>Restock Record</div>
          </div>
          {[
            ["Restock ID",   rstId],
            ["Product",      product?.name],
            ["Qty Added",    qty + " units"],
            ["Supplier",     supplier],
            ["Unit Cost",    fmt(unitCost)],
            ["Total Cost",   fmt(Number(qty) * Number(unitCost))],
            ["Invoice No",   invoiceNo || "N/A"],
            ["Date",         date || new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})],
          ].map(([k,v]) => (
            <div className="receipt-row" key={k}>
              <span className="rkey">{k}</span>
              <span className="rval" style={k==="Total Cost"?{fontSize:18,fontFamily:"'Cormorant Garamond',serif",color:"var(--gold)"}:{}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, marginTop:18, justifyContent:"center" }}>
          <button className="btn-out" onClick={() => { setSaved(false); setProductId(""); setQty(""); setSupplier(""); setUnitCost(""); setInvoiceNo(""); setDate(""); }}>Record Another</button>
          <button className="btn-sm" style={{ padding:"9px 18px" }}>↓ Print Record</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth:680 }}>
      <div className="card" style={{ marginBottom:16 }}>
        <div className="dvd" style={{ marginTop:0 }}>Product & Quantity</div>
        <div className="fg2">
          <div className="field">
            <label>Product *</label>
            <select value={productId} onChange={e => setProductId(e.target.value)}>
              <option value="">Select product to restock…</option>
              {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name} (Current: {p.stock})</option>)}
            </select>
          </div>
          <div className="field">
            <label>Quantity to Add *</label>
            <input type="number" min="1" placeholder="e.g. 50" value={qty} onChange={e => setQty(e.target.value)} />
          </div>
        </div>
        {product && (
          <div style={{ padding:"12px 16px", background:"var(--navy3)", border:"1px solid var(--bord)", borderRadius:"var(--r)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:13, color:"var(--text)" }}>{product.name}</div>
            <div style={{ fontSize:12, color:"var(--text3)" }}>
              Current stock: <span style={{ color: product.stock <= product.threshold ? "var(--warn)" : "var(--ok)" }}>{product.stock}</span>
              {qty && <span style={{ color:"var(--gold)", marginLeft:10 }}>→ After restock: {product.stock + Number(qty)}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom:16 }}>
        <div className="dvd" style={{ marginTop:0 }}>Supplier Details</div>
        <div className="fg2">
          <div className="field"><label>Supplier Name *</label><input placeholder="e.g. PhysioSupply Co." value={supplier} onChange={e => setSupplier(e.target.value)} /></div>
          <div className="field"><label>Unit Cost (৳) *</label><input type="number" placeholder="Cost per unit" value={unitCost} onChange={e => setUnitCost(e.target.value)} /></div>
        </div>
        <div className="fg2">
          <div className="field"><label>Invoice / Reference No</label><input placeholder="e.g. PSC-4413" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} /></div>
          <div className="field"><label>Delivery Date</label><input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
        </div>
        <div className="field"><label>Notes (optional)</label><input placeholder="Any remarks about this shipment" /></div>
      </div>

      {qty && unitCost && (
        <div style={{ padding:"12px 18px", background:"var(--gdim)", border:"1px solid var(--gbord)", borderRadius:"var(--r)", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:"var(--text3)" }}>Total restock cost</span>
          <span className="serif" style={{ fontSize:26, color:"var(--gold)" }}>{fmt(Number(qty)*Number(unitCost))}</span>
        </div>
      )}

      <button className="btn-gold" disabled={!canSave} onClick={() => setSaved(true)}>Save Restock Record ◈</button>

      {/* Recent restock log */}
      <div style={{ marginTop:28 }}>
        <div className="sh"><div className="sh-title serif">Recent <span>Restock Log</span></div></div>
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <table className="ptbl">
            <thead>
              <tr><th>ID</th><th>Product</th><th>Qty Added</th><th>Supplier</th><th>Total Cost</th><th>Invoice</th><th>Date</th></tr>
            </thead>
            <tbody>
              {RESTOCK_LOG.map(r => (
                <tr key={r.id}>
                  <td style={{ fontSize:11, color:"var(--text3)" }}>{r.id}</td>
                  <td><div className="pt-name">{r.product}</div><div className="pt-id">{r.productId}</div></td>
                  <td className="serif" style={{ fontSize:22, color:"var(--info)" }}>+{r.qty}</td>
                  <td style={{ fontSize:12, color:"var(--text2)" }}>{r.supplier}</td>
                  <td className="serif" style={{ fontSize:18, color:"var(--text2)" }}>{fmt(r.total)}</td>
                  <td style={{ fontSize:11, color:"var(--text3)", fontFamily:"monospace" }}>{r.invoiceNo}</td>
                  <td style={{ fontSize:11, color:"var(--text3)" }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Sales Ledger ─────────────────────────────────────────────────────────────
function SalesLedger() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const list = TRANSACTIONS.filter(t => {
    const matchF = filter === "all" || t.method.toLowerCase() === filter;
    const matchS = t.product.toLowerCase().includes(search.toLowerCase()) ||
                   t.buyer.toLowerCase().includes(search.toLowerCase()) ||
                   t.id.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const totalRev = list.reduce((s,t) => s + t.total, 0);

  return (
    <div className="fade-in">
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
        <input placeholder="Search product, buyer, ID…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ background:"var(--navy2)", border:"1px solid var(--bord)", borderRadius:"var(--r)", padding:"9px 14px", fontSize:13, color:"var(--text)", width:240, transition:"border-color .2s" }}
          onFocus={e => e.target.style.borderColor="var(--gbord)"} onBlur={e => e.target.style.borderColor="var(--bord)"} />
        <div style={{ display:"flex", gap:6 }}>
          {[["all","All"],["cash","Cash"],["bkash","bKash"],["nagad","Nagad"],["card","Card"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{ padding:"7px 14px", border:"1px solid", borderRadius:"var(--r)", fontSize:11, borderColor:filter===v?"var(--gold)":"var(--bord)", background:filter===v?"var(--gdim)":"transparent", color:filter===v?"var(--gold)":"var(--text3)", transition:"all .2s", cursor:"pointer" }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ marginLeft:"auto", padding:"6px 16px", background:"var(--gdim)", border:"1px solid var(--gbord)", borderRadius:20 }}>
          <span style={{ fontSize:11, color:"var(--text3)" }}>Showing: </span>
          <span className="serif" style={{ fontSize:18, color:"var(--gold)" }}>{fmt(totalRev)}</span>
        </div>
      </div>

      <div className="card" style={{ padding:0, overflow:"hidden" }}>
        <table className="ptbl">
          <thead>
            <tr><th>TX ID</th><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th><th>Buyer</th><th>Method</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {list.map(t => (
              <tr key={t.id}>
                <td style={{ fontSize:11, color:"var(--text3)", fontFamily:"monospace" }}>{t.id}</td>
                <td>
                  <div className="pt-name">{t.product}</div>
                  <div className="pt-id">{t.productId}</div>
                </td>
                <td className="serif" style={{ fontSize:20, color:"var(--text2)" }}>{t.qty}</td>
                <td style={{ fontSize:12, color:"var(--text3)" }}>{fmt(t.unitPrice)}</td>
                <td className="serif" style={{ fontSize:20, color:"var(--gold)" }}>{fmt(t.total)}</td>
                <td>
                  <div style={{ fontSize:13, color:"var(--text)" }}>{t.buyer}</div>
                  {t.buyerId && <div style={{ fontSize:10, color:"var(--text3)" }}>{t.buyerId}</div>}
                </td>
                <td style={{ fontSize:12, color:"var(--text3)" }}>{t.method}</td>
                <td style={{ fontSize:12, color:"var(--text3)" }}>{t.date}</td>
                <td><span className="badge b-completed">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div style={{ textAlign:"center", padding:"48px 20px", color:"var(--text3)", fontSize:14 }}>No transactions found</div>
        )}
      </div>
    </div>
  );
}

// ─── Monthly Reports ──────────────────────────────────────────────────────────
function MonthlyReports() {
  const thisMonth = MONTHLY_SALES[MONTHLY_SALES.length - 1];
  const lastMonth = MONTHLY_SALES[MONTHLY_SALES.length - 2];
  const growth    = Math.round((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue * 100);

  const INVENTORY_REPORT = [
    { product:"TENS Unit (Portable)",  opening:18, sold:6,  restocked:0,  closing:12 },
    { product:"Resistance Band Set",   opening:22, sold:19, restocked:0,  closing:3  },
    { product:"Omega-3 Fish Oil",      opening:51, sold:63, restocked:60, closing:48 },
    { product:"Cervical Collar",       opening:9,  sold:2,  restocked:0,  closing:7  },
    { product:"Wheelchair (Standard)", opening:5,  sold:1,  restocked:0,  closing:4  },
    { product:"Ultrasound Gel",        opening:7,  sold:55, restocked:50, closing:2  },
    { product:"Lumbar Support Belt",   opening:12, sold:3,  restocked:0,  closing:9  },
    { product:"Vitamin D3 (1000 IU)",  opening:70, sold:110,restocked:100,closing:60 },
  ];

  return (
    <div className="fade-in">
      <div className="stats-row">
        {[
          { lbl:"May Revenue",      val:fmt(thisMonth.revenue),  sub:`${growth < 0 ? "▼":"▲"} ${Math.abs(growth)}% vs Apr`, col:"var(--gold)"  },
          { lbl:"Transactions",     val:thisMonth.transactions,  sub:"This month",                                           col:"var(--info)"  },
          { lbl:"Avg Sale Value",   val:fmt(Math.round(thisMonth.revenue/thisMonth.transactions)), sub:"Per transaction",     col:"var(--text)"  },
          { lbl:"Best Month",       val:"Mar",                   sub:fmt(134500) + " revenue",                              col:"var(--ok)"    },
        ].map(s => (
          <div className="stat" key={s.lbl}>
            <div className="stat-lbl">{s.lbl}</div>
            <div className="stat-val serif" style={{ color:s.col, fontSize:32 }}>{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:16, marginBottom:20 }}>
        {/* Revenue trend */}
        <div className="card">
          <div className="sh"><div className="sh-title serif">Monthly <span>Revenue Trend</span></div></div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_SALES} barGap={4} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="month" tick={{ fill:"rgba(221,213,194,0.4)", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"rgba(221,213,194,0.3)", fontSize:10 }} axisLine={false} tickLine={false} width={52} tickFormatter={v => "৳"+(v/1000)+"k"} />
              <Tooltip content={<CTooltip />} cursor={{ fill:"rgba(201,168,76,.04)" }} />
              <Bar dataKey="revenue" name="Revenue" fill="#c9a84c" radius={[3,3,0,0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions line */}
        <div className="card">
          <div className="sh"><div className="sh-title serif">Transaction <span>Volume</span></div></div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY_SALES}>
              <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="month" tick={{ fill:"rgba(221,213,194,0.4)", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"rgba(221,213,194,0.3)", fontSize:10 }} axisLine={false} tickLine={false} width={26} />
              <Tooltip content={<CTooltip />} cursor={{ stroke:"rgba(74,159,212,.2)" }} />
              <Line type="monotone" dataKey="transactions" name="Transactions" stroke="var(--info)" strokeWidth={2} dot={{ fill:"var(--info)", r:4 }} activeDot={{ r:6, fill:"#7ec8ed" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly inventory report table */}
      <div className="card" style={{ padding:0, overflow:"hidden" }}>
        <div style={{ padding:"16px 22px", borderBottom:"1px solid var(--bord)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div className="sh-title serif">May 2025 — Inventory <span>Movement Report</span></div>
          <button className="btn-out">↓ Export Report</button>
        </div>
        <table className="ptbl">
          <thead>
            <tr>
              <th>Product</th>
              <th>Opening Stock</th>
              <th>Units Sold</th>
              <th>Restocked</th>
              <th>Closing Stock</th>
              <th>Movement</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY_REPORT.map(r => {
              const net = r.restocked - r.sold;
              return (
                <tr key={r.product}>
                  <td><div className="pt-name">{r.product}</div></td>
                  <td className="serif" style={{ fontSize:20, color:"var(--text2)" }}>{r.opening}</td>
                  <td className="serif" style={{ fontSize:20, color:"var(--danger)" }}>-{r.sold}</td>
                  <td className="serif" style={{ fontSize:20, color:"var(--ok)" }}>{r.restocked > 0 ? `+${r.restocked}` : "—"}</td>
                  <td className="serif" style={{ fontSize:20, color: r.closing <= 3 ? "var(--danger)" : r.closing <= 8 ? "var(--warn)" : "var(--text)" }}>{r.closing}</td>
                  <td>
                    <span style={{ fontSize:12, color: net >= 0 ? "var(--ok)" : "var(--danger)", fontWeight:500 }}>
                      {net >= 0 ? `▲ +${net}` : `▼ ${net}`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function ShoppingModule({ setPage: goHome }) {
  const [page, setPage] = useState("catalog");
  const [t0, t1] = PAGE_TITLES[page];
  const today = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" });
  const lowCount = lowStockItems.length;

  return (
    <div className="shell">
      <style>{STYLES}</style>

      <aside className="sidebar">
        <div className="sb-logo">
          <div className="sb-logo-txt serif"><span style={{ color:"var(--gold)" }}>UP</span>PC</div>
          <div className="sb-logo-sub">Management Portal</div>
        </div>
        <div className="sb-module">
          <div className="sb-mod-lbl">Active Module</div>
          <div className="sb-mod-name">Shopping & Product Sales</div>
        </div>
        <nav className="sb-nav">
          {NAV.map(item => (
            <div key={item.id} className={`nav-item ${page===item.id?"active":""}`} onClick={() => setPage(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.id === "inventory" && lowCount > 0 && (
                <span style={{ marginLeft:"auto", background:"var(--danger)", color:"#fff", fontSize:10, borderRadius:20, padding:"2px 7px", fontWeight:500 }}>{lowCount}</span>
              )}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          <div style={{ paddingBottom:14 }}>
            <div style={{ fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"var(--text3)", marginBottom:4 }}>Monthly Revenue</div>
            <div className="serif" style={{ fontSize:22, color:"var(--gold)" }}>{fmt(MONTHLY_SALES[MONTHLY_SALES.length-1].revenue)}</div>
            <div style={{ fontSize:10, color:"var(--text3)", marginTop:2 }}>May 2025 (partial)</div>
          </div>
          <div className="sb-status"><div className="online-dot" /><span>Sales Module · Live</span></div>
          {/* <button className="logout">⇤ Back to Portal</button> */}
          <button className="logout" onClick={() => goHome("home")}>⇤ Back to Home</button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <h1 className="pg-title serif">{t0} <span>{t1}</span></h1>
          <div className="tb-right">
            <span className="date-chip">{today}</span>
            {lowCount > 0 && (
              <div style={{ position:"relative" }}>
                <button className="icon-btn" onClick={() => setPage("inventory")}>⚠</button>
                <div className="ndot" style={{ background:"var(--danger)" }} />
              </div>
            )}
            <div style={{ padding:"6px 14px", background:"var(--gdim)", border:"1px solid var(--gbord)", borderRadius:20, fontSize:12, color:"var(--gold)", fontFamily:"'Cormorant Garamond',serif" }}>
              {fmt(MONTHLY_SALES[MONTHLY_SALES.length-1].revenue)}
            </div>
          </div>
        </div>
        <div className="content">
          {page === "catalog"   && <ProductCatalog setPage={setPage} />}
          {page === "sell"      && <RecordSale />}
          {page === "inventory" && <Inventory setPage={setPage} />}
          {page === "restock"   && <RestockProducts />}
          {page === "ledger"    && <SalesLedger />}
          {page === "reports"   && <MonthlyReports />}
        </div>
      </main>
    </div>
  );
}