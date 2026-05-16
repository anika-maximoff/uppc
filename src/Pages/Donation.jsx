import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const FUND_BALANCE = 184750;
const TOTAL_RECEIVED = 312400;
const TOTAL_DISBURSED = 127650;
const LIVES_HELPED = 43;

const DONATION_TREND = [
  { month: "Nov", amount: 28400 },
  { month: "Dec", amount: 41200 },
  { month: "Jan", amount: 35600 },
  { month: "Feb", amount: 29800 },
  { month: "Mar", amount: 52100 },
  { month: "Apr", amount: 48300 },
  { month: "May", amount: 77000 },
];

const FUND_MIX = [
  { name: "General Fund", value: 68, color: "#c9a84c" },
  { name: "Patient-Specific", value: 32, color: "#4a9fd4" },
];

const DONATIONS = [
  { id: "DON-1041", donor: "Md. Jahangir Alam",   email: "jahangir@gmail.com",  amount: 5000,  method: "bKash",         type: "General Fund",      date: "15 May 2025", status: "confirmed" },
  { id: "DON-1040", donor: "Mrs. Rashida Khatun",  email: "rashida@yahoo.com",   amount: 10000, method: "Bank Transfer",  type: "Patient-Specific",  date: "14 May 2025", status: "confirmed", patient: "UPPC-2024-0481" },
  { id: "DON-1039", donor: "Anonymous",             email: "",                    amount: 2000,  method: "Nagad",          type: "General Fund",      date: "13 May 2025", status: "confirmed" },
  { id: "DON-1038", donor: "Dr. Shamsul Huda",     email: "s.huda@bd.com",       amount: 15000, method: "Card",           type: "General Fund",      date: "12 May 2025", status: "confirmed" },
  { id: "DON-1037", donor: "Fatema Begum",          email: "fatema@live.com",     amount: 3000,  method: "Cash",           type: "Patient-Specific",  date: "11 May 2025", status: "pending",  patient: "UPPC-2024-0055" },
  { id: "DON-1036", donor: "Bashir Ahmed",          email: "bashir@gmail.com",    amount: 7500,  method: "bKash",          type: "General Fund",      date: "10 May 2025", status: "confirmed" },
];

const DISBURSEMENTS = [
  { id: "DIS-0091", patient: "Md. Hasan Ali",   patientId: "UPPC-2024-0055", amount: 8500,  reason: "Physiotherapy sessions — 3 months",     approvedBy: "Mr. Kamal (Accountant)", date: "14 May 2025", status: "completed" },
  { id: "DIS-0090", patient: "Sultana Begum",   patientId: "UPPC-2024-0312", amount: 12000, reason: "Spinal rehab equipment & sessions",       approvedBy: "Mr. Kamal (Accountant)", date: "09 May 2025", status: "completed" },
  { id: "DIS-0089", patient: "Abdul Karim",     patientId: "UPPC-2024-0561", amount: 6200,  reason: "Medication subsidy — April cycle",        approvedBy: "Ms. Nipa (Accountant)",  date: "02 May 2025", status: "completed" },
  { id: "DIS-0088", patient: "Rafiqul Islam",   patientId: "UPPC-2024-0198", amount: 4500,  reason: "Initial diagnostic & consultation fees",  approvedBy: "Mr. Kamal (Accountant)", date: "27 Apr 2025", status: "completed" },
  { id: "DIS-0087", patient: "Nasrin Akter",    patientId: "UPPC-2023-0874", amount: 9200,  reason: "Neuropathy treatment program — Q1",       approvedBy: "Ms. Nipa (Accountant)",  date: "15 Apr 2025", status: "completed" },
];

const ELIGIBLE_PATIENTS = [
  { id: "UPPC-2024-0055", name: "Md. Hasan Ali",   condition: "Post-stroke Hemiplegia",   outstanding: 24500 },
  { id: "UPPC-2024-0198", name: "Rafiqul Islam",    condition: "Ischemic Stroke Recovery",  outstanding: 18200 },
  { id: "UPPC-2024-0481", name: "Karim Uddin",      condition: "Post-stroke Hemiplegia",   outstanding: 12800 },
  { id: "UPPC-2023-0874", name: "Nasrin Akter",     condition: "Peripheral Neuropathy",    outstanding: 9600  },
];

const NAV = [
  { id: "portal",        label: "Public Portal",       icon: "◈" },
  { id: "donate",        label: "Make a Donation",     icon: "✦" },
  { id: "fund",          label: "General Fund",         icon: "⬡" },
  { id: "disburse",      label: "Disburse Funds",       icon: "◇" },
  { id: "ledger",        label: "Donation Ledger",      icon: "◉" },
  { id: "reports",       label: "Utilization Reports",  icon: "◎" },
];

const PAGE_TITLES = {
  portal:   ["Public",     "Donation Portal"],
  donate:   ["Make a",     "Donation"],
  fund:     ["General",    "Fund Balance"],
  disburse: ["Disburse",   "Funds"],
  ledger:   ["Donation",   "Ledger"],
  reports:  ["Utilization","Reports"],
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
  .ndot        { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); position: absolute; top: 5px; right: 5px; }

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
  .lnk { font-size: 11px; color: var(--gold); letter-spacing: .08em; background: none; border: none; padding: 0; opacity: .8; transition: opacity .2s; }
  .lnk:hover { opacity: 1; }

  .badge { display: inline-block; font-size: 10px; font-weight: 500; letter-spacing: .09em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; }
  .b-confirmed  { background: rgba(46,184,122,.14);  color: var(--ok);     }
  .b-pending    { background: rgba(232,160,48,.14);  color: var(--warn);   }
  .b-completed  { background: rgba(46,184,122,.14);  color: var(--ok);     }
  .b-general    { background: rgba(201,168,76,.18);  color: var(--gold);   }
  .b-specific   { background: rgba(74,159,212,.14);  color: var(--info);   }

  .btn-gold    { background: var(--gold); color: var(--navy); font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; padding: 10px 24px; border: none; border-radius: var(--r); transition: all .2s; }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(201,168,76,.2); }
  .btn-gold:disabled { opacity: .45; transform: none; box-shadow: none; cursor: not-allowed; }
  .btn-out { background: transparent; color: var(--gold); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; padding: 8px 18px; border: 1px solid var(--gbord); border-radius: var(--r); transition: all .2s; }
  .btn-out:hover { background: var(--gdim); }
  .btn-sm { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; padding: 6px 13px; border: 1px solid var(--bord); color: var(--text3); background: none; border-radius: var(--r); transition: all .2s; }
  .btn-sm:hover { border-color: var(--gbord); color: var(--gold); }

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
  .warn-box    { background: rgba(232,160,48,.06); border: 1px solid rgba(232,160,48,.22); border-radius: var(--rl); padding: 36px; text-align: center; }

  .fund-bar-wrap { background: var(--navy3); border-radius: 6px; height: 10px; overflow: hidden; margin: 10px 0; }
  .fund-bar      { height: 100%; border-radius: 6px; background: linear-gradient(90deg, var(--gold), var(--gold2)); transition: width .8s ease; }

  .mini-bar-wrap { background: var(--navy3); border-radius: 3px; height: 5px; width: 80px; overflow: hidden; margin-top: 5px; }
  .mini-bar { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--info), #7ec8ed); }

  .activity-pill { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: var(--navy3); border-radius: var(--r); border: 1px solid var(--bord); margin-bottom: 8px; }

  .method-btn { padding: 10px 14px; background: var(--navy3); border: 1px solid var(--bord); border-radius: var(--r); font-size: 12px; color: var(--text2); transition: all .2s; text-align: center; cursor: pointer; }
  .method-btn:hover { border-color: var(--gbord); color: var(--text); }
  .method-btn.selected { border-color: var(--gold); background: var(--gdim); color: var(--gold); }

  .receipt-box { background: var(--navy3); border: 1px solid var(--gbord); border-radius: var(--rl); padding: 26px; max-width: 440px; margin: 0 auto; }
  .receipt-row { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid var(--bord); font-size: 13px; }
  .receipt-row:last-child { border-bottom: none; }
  .receipt-row .key { color: var(--text3); font-size: 11px; letter-spacing: .08em; }
  .receipt-row .val { color: var(--text); font-weight: 500; }

  .public-hero { background: linear-gradient(135deg, rgba(201,168,76,.12), rgba(74,159,212,.06)); border: 1px solid var(--gbord); border-radius: var(--rl); padding: 36px 40px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
  .counter-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 22px; }
  .counter-card { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 20px; text-align: center; }
  .counter-val  { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: var(--gold); }
  .counter-lbl  { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--text3); margin-top: 4px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation: fadeUp .32s ease forwards; }

  .recharts-tooltip-wrapper { pointer-events: none !important; }
  .custom-tooltip { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--r); padding: 10px 14px; font-size: 12px; }
  .custom-tooltip .label { color: var(--text3); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px; }

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
    .ptbl thead { display: none; }
  }
`;

const fmt = (n) => "৳" + Number(n).toLocaleString("en-BD");

const CTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color || "var(--gold)", fontSize: 13, marginTop: 2 }}>
          {p.name}: <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Public Portal ────────────────────────────────────────────────────────────
function PublicPortal({ setPage }) {
  return (
    <div className="fade-in">
      <div className="public-hero">
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>UPPC Rehabilitation & Therapy Centre</div>
          <div className="serif" style={{ fontSize: 34, fontWeight: 300, marginBottom: 8 }}>Every gift <em style={{ color: "var(--gold)" }}>changes</em> a life</div>
          <div style={{ fontSize: 13, color: "var(--text2)", maxWidth: 460, lineHeight: 1.7 }}>
            Your donation directly funds therapy sessions, medications, and rehabilitation for patients who cannot afford treatment. Help us restore lives.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn-gold" style={{ padding: "13px 32px", fontSize: 13 }} onClick={() => setPage("donate")}>Donate Now ✦</button>
          <button className="btn-out" onClick={() => setPage("donate")}>Sponsor a Patient</button>
        </div>
      </div>

      {/* Live counters — anonymised */}
      <div className="counter-grid">
        <div className="counter-card">
          <div className="counter-val serif">{fmt(TOTAL_RECEIVED)}</div>
          <div className="counter-lbl">Total Donations Received</div>
        </div>
        <div className="counter-card">
          <div className="counter-val serif" style={{ color: "var(--info)" }}>{LIVES_HELPED}</div>
          <div className="counter-lbl">Lives Helped</div>
        </div>
        <div className="counter-card">
          <div className="counter-val serif" style={{ color: "var(--ok)" }}>{fmt(FUND_BALANCE)}</div>
          <div className="counter-lbl">Current Fund Balance</div>
        </div>
      </div>

      {/* Recent activity feed — anonymised */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <div className="card">
          <div className="sh"><div className="sh-title serif">Recent <span>Donation Activity</span></div></div>
          {DONATIONS.slice(0, 5).map((d) => (
            <div key={d.id} className="activity-pill">
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--gdim)", border: "1px solid var(--gbord)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--gold)", flexShrink: 0 }}>✦</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--text)" }}>{d.donor === "Anonymous" ? "Anonymous Donor" : "A generous donor"}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{d.type} · {d.date}</div>
              </div>
              <div className="serif" style={{ fontSize: 20, color: "var(--gold)" }}>{fmt(d.amount)}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="sh"><div className="sh-title serif">Fund <span>Utilisation</span></div></div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginBottom: 6 }}>
              <span>Disbursed</span>
              <span>{Math.round(TOTAL_DISBURSED / TOTAL_RECEIVED * 100)}%</span>
            </div>
            <div className="fund-bar-wrap">
              <div className="fund-bar" style={{ width: `${Math.round(TOTAL_DISBURSED / TOTAL_RECEIVED * 100)}%` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginTop: 4 }}>
              <span>{fmt(TOTAL_DISBURSED)} used</span>
              <span>{fmt(FUND_BALANCE)} remaining</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { lbl: "Total Received", val: TOTAL_RECEIVED, col: "var(--gold)" },
              { lbl: "Total Disbursed", val: TOTAL_DISBURSED, col: "var(--ok)" },
              { lbl: "Available Balance", val: FUND_BALANCE, col: "var(--info)" },
            ].map(r => (
              <div key={r.lbl} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", background: "var(--navy3)", borderRadius: "var(--r)", border: "1px solid var(--bord)" }}>
                <span style={{ fontSize: 11, color: "var(--text3)", letterSpacing: ".06em" }}>{r.lbl}</span>
                <span className="serif" style={{ fontSize: 18, color: r.col }}>{fmt(r.val)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Make a Donation ──────────────────────────────────────────────────────────
function MakeDonation() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmt, setCustomAmt] = useState("");
  const [fundType, setFundType] = useState("general");
  const [patientId, setPatientId] = useState("");
  const [method, setMethod] = useState("");
  const [txRef, setTxRef] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [saved, setSaved] = useState(false);
  const [donId] = useState("DON-" + (1000 + Math.floor(Math.random() * 999)));

  const PRESETS = [500, 1000, 2500, 5000, 10000];
  const METHODS = ["bKash", "Nagad", "Card", "Bank Transfer", "Cash"];

  const finalAmt = customAmt || amount;
  const canSubmit = finalAmt && method && (anonymous || donorName);

  if (saved) {
    const receiptData = {
      id: donId,
      donor: anonymous ? "Anonymous" : donorName,
      email: donorEmail,
      amount: finalAmt,
      fund: fundType === "general" ? "General Fund" : `Patient — ${patientId}`,
      method,
      ref: txRef || "N/A",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };
    return (
      <div className="fade-in" style={{ maxWidth: 520, margin: "0 auto", paddingTop: 20 }}>
        <div className="success-box" style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 34, marginBottom: 10, color: "var(--ok)" }}>✦</div>
          <div className="serif" style={{ fontSize: 26, color: "var(--ok)", marginBottom: 6 }}>Thank you, {receiptData.donor}!</div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>Your donation has been recorded. A receipt has been sent to <span style={{ color: "var(--text2)" }}>{donorEmail || "your email"}</span>.</div>
        </div>
        <div className="receipt-box">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div className="sb-logo-txt serif" style={{ fontSize: 22, marginBottom: 4 }}><span style={{ color: "var(--gold)" }}>UP</span>PC</div>
            <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--text3)" }}>Donation Receipt</div>
          </div>
          {[
            ["Receipt No", receiptData.id],
            ["Date", receiptData.date],
            ["Donor", receiptData.donor],
            ["Amount", fmt(receiptData.amount)],
            ["Fund", receiptData.fund],
            ["Method", receiptData.method],
            ["Reference", receiptData.ref],
          ].map(([k, v]) => (
            <div className="receipt-row" key={k}>
              <span className="key">{k}</span>
              <span className="val" style={k === "Amount" ? { fontSize: 18, fontFamily: "'Cormorant Garamond',serif", color: "var(--gold)" } : {}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "center" }}>
          <button className="btn-out" onClick={() => { setSaved(false); setDonorName(""); setAmount(""); setCustomAmt(""); setMethod(""); setTxRef(""); }}>New Donation</button>
          <button className="btn-sm" style={{ padding: "9px 18px" }}>↓ Download PDF</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: 700 }}>
      {/* Donor info */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Donor Information</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <input type="checkbox" id="anon" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} style={{ accentColor: "var(--gold)", width: 14, height: 14 }} />
          <label htmlFor="anon" style={{ fontSize: 12, color: "var(--text2)", cursor: "pointer" }}>Donate anonymously</label>
        </div>
        {!anonymous && (
          <div className="fg3">
            <div className="field">
              <label>Full Name *</label>
              <input placeholder="Your full name" value={donorName} onChange={e => setDonorName(e.target.value)} />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" placeholder="For receipt delivery" value={donorEmail} onChange={e => setDonorEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Phone</label>
              <input placeholder="+880…" value={donorPhone} onChange={e => setDonorPhone(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Donation details */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Donation Details</div>

        {/* Fund type toggle */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          {[{ val: "general", lbl: "General Fund", desc: "Supports any eligible patient" },
            { val: "specific", lbl: "Specific Patient", desc: "Targeted sponsorship" }].map(opt => (
            <div key={opt.val} onClick={() => setFundType(opt.val)} style={{ flex: 1, padding: "13px 16px", background: fundType === opt.val ? "var(--gdim)" : "var(--navy3)", border: `1px solid ${fundType === opt.val ? "var(--gold)" : "var(--bord)"}`, borderRadius: "var(--rl)", cursor: "pointer", transition: "all .2s" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: fundType === opt.val ? "var(--gold)" : "var(--text)", marginBottom: 3 }}>{opt.lbl}</div>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>{opt.desc}</div>
            </div>
          ))}
        </div>

        {fundType === "specific" && (
          <div className="fg2">
            <div className="field">
              <label>Patient ID or Name</label>
              <input placeholder="e.g. UPPC-2024-0481" value={patientId} onChange={e => setPatientId(e.target.value)} />
            </div>
            <div className="field">
              <label>Select Known Patient</label>
              <select value={patientId} onChange={e => setPatientId(e.target.value)}>
                <option value="">Choose from list…</option>
                {ELIGIBLE_PATIENTS.map(p => <option key={p.id} value={p.id}>{p.name} — {p.id}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Amount presets */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }}>Select Amount (BDT)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 10 }}>
            {PRESETS.map(p => (
              <button key={p} onClick={() => { setAmount(String(p)); setCustomAmt(""); }} style={{ padding: "9px 4px", background: amount === String(p) && !customAmt ? "var(--gdim)" : "var(--navy3)", border: `1px solid ${amount === String(p) && !customAmt ? "var(--gold)" : "var(--bord)"}`, borderRadius: "var(--r)", fontSize: 12, color: amount === String(p) && !customAmt ? "var(--gold)" : "var(--text2)", transition: "all .2s", cursor: "pointer" }}>
                ৳{p.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="field">
            <label>Or enter custom amount</label>
            <input type="number" placeholder="Enter amount in BDT" value={customAmt} onChange={e => { setCustomAmt(e.target.value); setAmount(""); }} min="1" />
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Payment Method</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 14 }}>
          {METHODS.map(m => (
            <div key={m} className={`method-btn ${method === m ? "selected" : ""}`} onClick={() => setMethod(m)}>{m}</div>
          ))}
        </div>
        {(method === "bKash" || method === "Nagad" || method === "Card" || method === "Bank Transfer") && (
          <div className="field">
            <label>Transaction Reference / ID</label>
            <input placeholder={method === "Card" ? "Last 4 digits or approval code" : "Transaction ID"} value={txRef} onChange={e => setTxRef(e.target.value)} />
          </div>
        )}
        {method === "Cash" && (
          <div style={{ padding: "10px 14px", background: "rgba(232,160,48,.06)", border: "1px solid rgba(232,160,48,.18)", borderRadius: "var(--r)", fontSize: 12, color: "var(--warn)" }}>
            Cash donations are recorded manually by the front desk. Please hand the amount to a staff member for official receipt issuance.
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button className="btn-gold" disabled={!canSubmit} onClick={() => setSaved(true)}>
          Confirm Donation ✦
        </button>
        <button className="btn-sm" style={{ padding: "10px 20px" }}>Save as Draft</button>
        {finalAmt && <span className="serif" style={{ fontSize: 22, color: "var(--gold)", marginLeft: 12 }}>Total: {fmt(finalAmt)}</span>}
      </div>
    </div>
  );
}

// ─── General Fund ─────────────────────────────────────────────────────────────
function GeneralFund({ setPage }) {
  const pct = Math.round(TOTAL_DISBURSED / TOTAL_RECEIVED * 100);
  return (
    <div className="fade-in">
      {/* Fund overview hero */}
      <div style={{ marginBottom: 24, padding: "24px 28px", background: "linear-gradient(135deg,rgba(201,168,76,.1),rgba(46,184,122,.05))", border: "1px solid var(--gbord)", borderRadius: "var(--rl)" }}>
        <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>Live Balance</div>
        <div className="serif" style={{ fontSize: 52, fontWeight: 300, color: "var(--gold)", marginBottom: 6 }}>{fmt(FUND_BALANCE)}</div>
        <div style={{ fontSize: 12, color: "var(--text3)" }}>Available in General Donation Fund · Updated just now</div>
        <div className="fund-bar-wrap" style={{ marginTop: 16, height: 8 }}>
          <div className="fund-bar" style={{ width: `${100 - pct}%` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
          <span>{fmt(FUND_BALANCE)} remaining ({100 - pct}%)</span>
          <span>{fmt(TOTAL_DISBURSED)} disbursed ({pct}%)</span>
        </div>
      </div>

      <div className="stats-row">
        {[
          { lbl: "Total Received", val: fmt(TOTAL_RECEIVED), sub: "All time" },
          { lbl: "Total Disbursed", val: fmt(TOTAL_DISBURSED), sub: "All time" },
          { lbl: "Active Donors", val: "94", sub: "This quarter" },
          { lbl: "Lives Helped", val: LIVES_HELPED, sub: "Patients assisted" },
        ].map(s => (
          <div className="stat" key={s.lbl}>
            <div className="stat-lbl">{s.lbl}</div>
            <div className="stat-val serif">{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
        {/* Trend chart */}
        <div className="card">
          <div className="sh"><div className="sh-title serif">Monthly <span>Donation Inflow</span></div></div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={DONATION_TREND}>
              <defs>
                <linearGradient id="goldGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#c9a84c" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(221,213,194,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(221,213,194,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} width={50} tickFormatter={v => "৳" + (v / 1000) + "k"} />
              <Tooltip content={<CTooltip />} cursor={{ stroke: "rgba(201,168,76,.15)" }} />
              <Area type="monotone" dataKey="amount" name="Donations" stroke="#c9a84c" strokeWidth={2} fill="url(#goldGrad2)" dot={{ fill: "#c9a84c", r: 4 }} activeDot={{ r: 6, fill: "#e8c97a" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fund split pie */}
        <div className="card">
          <div className="sh"><div className="sh-title serif">Fund <span>Split</span></div></div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={FUND_MIX} cx="50%" cy="50%" innerRadius={46} outerRadius={68} paddingAngle={3} dataKey="value">
                {FUND_MIX.map((e, i) => <Cell key={i} fill={e.color} opacity={0.9} />)}
              </Pie>
              <Tooltip formatter={v => [`${v}%`, ""]} contentStyle={{ background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: 6, fontSize: 12 }} itemStyle={{ color: "var(--text)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
            {FUND_MIX.map(c => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text3)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, display: "inline-block" }} />{c.name}
                </span>
                <span style={{ color: c.color, fontFamily: "'Cormorant Garamond',serif", fontSize: 18 }}>{c.value}%</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <button className="btn-gold" style={{ width: "100%", marginBottom: 8 }} onClick={() => setPage("disburse")}>Disburse Funds →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Disburse Funds ───────────────────────────────────────────────────────────
function DisburseFunds() {
  const [patient, setPatient] = useState("");
  const [disbAmt, setDisbAmt] = useState("");
  const [reason, setReason] = useState("");
  const [approver, setApprover] = useState("");
  const [saved, setSaved] = useState(false);
  const [disbId] = useState("DIS-" + (100 + Math.floor(Math.random() * 899)));

  const selectedPt = ELIGIBLE_PATIENTS.find(p => p.id === patient);
  const canSubmit = patient && disbAmt && reason && approver && Number(disbAmt) <= FUND_BALANCE;

  if (saved) {
    return (
      <div className="fade-in" style={{ maxWidth: 500, margin: "0 auto", paddingTop: 20 }}>
        <div className="success-box" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 30, marginBottom: 10, color: "var(--ok)" }}>◈</div>
          <div className="serif" style={{ fontSize: 24, color: "var(--ok)", marginBottom: 6 }}>Disbursement Approved</div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>
            {fmt(disbAmt)} has been disbursed to <strong style={{ color: "var(--text)" }}>{selectedPt?.name}</strong>'s bill. A disbursement receipt has been generated.
          </div>
        </div>
        <div className="receipt-box">
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div className="sb-logo-txt serif" style={{ fontSize: 18, marginBottom: 2 }}><span style={{ color: "var(--gold)" }}>UP</span>PC</div>
            <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--text3)" }}>Disbursement Record</div>
          </div>
          {[
            ["Disbursement ID", disbId],
            ["Date", new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })],
            ["Recipient", selectedPt?.name || ""],
            ["Patient ID", patient],
            ["Amount Disbursed", fmt(disbAmt)],
            ["Reason", reason],
            ["Approved By", approver],
          ].map(([k, v]) => (
            <div className="receipt-row" key={k}>
              <span className="key">{k}</span>
              <span className="val" style={k === "Amount Disbursed" ? { fontSize: 18, fontFamily: "'Cormorant Garamond',serif", color: "var(--ok)" } : {}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 18, justifyContent: "center" }}>
          <button className="btn-out" onClick={() => { setSaved(false); setPatient(""); setDisbAmt(""); setReason(""); setApprover(""); }}>New Disbursement</button>
          <button className="btn-sm" style={{ padding: "9px 18px" }}>↓ Download PDF</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      {/* Fund balance banner */}
      <div style={{ padding: "16px 22px", background: "var(--gdim)", border: "1px solid var(--gbord)", borderRadius: "var(--rl)", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 4 }}>Available Fund Balance</div>
          <div className="serif" style={{ fontSize: 34, fontWeight: 300, color: "var(--gold)" }}>{fmt(FUND_BALANCE)}</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", textAlign: "right" }}>
          <div>Accountant module — authorised access only</div>
          <div style={{ marginTop: 3, color: "var(--warn)" }}>All disbursements are permanently recorded</div>
        </div>
      </div>

      {/* Eligible patients */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Eligible Patients</div>
        <div style={{ marginBottom: 16 }}>
          {ELIGIBLE_PATIENTS.map(p => (
            <div key={p.id} onClick={() => setPatient(p.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", marginBottom: 6, background: patient === p.id ? "var(--gdim)" : "var(--navy3)", border: `1px solid ${patient === p.id ? "var(--gold)" : "var(--bord)"}`, borderRadius: "var(--r)", cursor: "pointer", transition: "all .2s" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: patient === p.id ? "var(--gold)" : "var(--navy4)", border: "1px solid var(--bord)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: patient === p.id ? "var(--navy)" : "var(--text3)", fontFamily: "'Cormorant Garamond',serif", flexShrink: 0 }}>
                {p.name.split(" ").map(w => w[0]).join("").slice(0,2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: patient === p.id ? "var(--gold)" : "var(--text)" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{p.id} · {p.condition}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>Outstanding</div>
                <div className="serif" style={{ fontSize: 18, color: patient === p.id ? "var(--gold)" : "var(--warn)" }}>{fmt(p.outstanding)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disbursement form */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Disbursement Details</div>
        <div className="fg2">
          <div className="field">
            <label>Amount to Disburse (BDT) *</label>
            <input type="number" placeholder="Enter amount" value={disbAmt} onChange={e => setDisbAmt(e.target.value)} min="1" max={FUND_BALANCE} />
            {disbAmt && Number(disbAmt) > FUND_BALANCE && (
              <span style={{ fontSize: 11, color: "var(--danger)" }}>Exceeds available fund balance</span>
            )}
            {disbAmt && selectedPt && Number(disbAmt) > selectedPt.outstanding && (
              <span style={{ fontSize: 11, color: "var(--warn)" }}>Exceeds patient's outstanding bill</span>
            )}
          </div>
          <div className="field">
            <label>Approving Accountant *</label>
            <select value={approver} onChange={e => setApprover(e.target.value)}>
              <option value="">Select accountant…</option>
              <option>Mr. Kamal (Accountant)</option>
              <option>Ms. Nipa (Accountant)</option>
              <option>Mr. Rafiqul (Senior Accountant)</option>
            </select>
          </div>
        </div>
        <div className="field" style={{ marginBottom: 14 }}>
          <label>Reason / Purpose *</label>
          <textarea rows={3} placeholder="Describe the purpose of this disbursement (e.g. physiotherapy sessions, medication subsidy…)" value={reason} onChange={e => setReason(e.target.value)} style={{ resize: "vertical" }} />
        </div>
        <div className="field">
          <label>Additional Notes (internal)</label>
          <input placeholder="Optional internal notes" />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-gold" disabled={!canSubmit} onClick={() => setSaved(true)}>
          Approve Disbursement ◈
        </button>
        <button className="btn-sm" style={{ padding: "10px 20px" }}>Save for Review</button>
        {disbAmt && canSubmit && (
          <span style={{ fontSize: 12, color: "var(--text3)", display: "flex", alignItems: "center", marginLeft: 8 }}>
            Remaining after: <span className="serif" style={{ fontSize: 20, color: "var(--info)", marginLeft: 8 }}>{fmt(FUND_BALANCE - Number(disbAmt))}</span>
          </span>
        )}
      </div>

      {/* Recent disbursements */}
      <div style={{ marginTop: 28 }}>
        <div className="sh"><div className="sh-title serif">Recent <span>Disbursements</span></div></div>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="ptbl">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Approved By</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DISBURSEMENTS.map(d => (
                <tr key={d.id}>
                  <td style={{ fontSize: 11, color: "var(--text3)" }}>{d.id}</td>
                  <td>
                    <div className="pt-name">{d.patient}</div>
                    <div className="pt-id">{d.patientId}</div>
                  </td>
                  <td><span className="serif" style={{ fontSize: 20, color: "var(--ok)" }}>{fmt(d.amount)}</span></td>
                  <td style={{ fontSize: 11, color: "var(--text2)", maxWidth: 200 }}>{d.reason}</td>
                  <td style={{ fontSize: 11, color: "var(--text3)" }}>{d.approvedBy}</td>
                  <td style={{ fontSize: 11, color: "var(--text3)" }}>{d.date}</td>
                  <td><span className={`badge b-${d.status}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Donation Ledger ──────────────────────────────────────────────────────────
function DonationLedger() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const statuses = ["all", "confirmed", "pending"];
  const list = DONATIONS.filter(d => {
    const matchF = filter === "all" || d.status === filter;
    const matchS = d.donor.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  return (
    <div className="fade-in">
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="Search donor, ID…" value={search} onChange={e => setSearch(e.target.value)} style={{ background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: "var(--r)", padding: "9px 14px", fontSize: 13, color: "var(--text)", width: 220, transition: "border-color .2s" }} onFocus={e => e.target.style.borderColor = "var(--gbord)"} onBlur={e => e.target.style.borderColor = "var(--bord)"} />
        <div style={{ display: "flex", gap: 8 }}>
          {statuses.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 16px", border: "1px solid", borderRadius: "var(--r)", fontSize: 11, letterSpacing: ".08em", textTransform: "capitalize", borderColor: filter === f ? "var(--gold)" : "var(--bord)", background: filter === f ? "var(--gdim)" : "transparent", color: filter === f ? "var(--gold)" : "var(--text3)", transition: "all .2s", cursor: "pointer" }}>
              {f === "all" ? `All (${DONATIONS.length})` : f}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <span style={{ padding: "6px 12px", background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: 20, fontSize: 11, color: "var(--text3)" }}>Total: {fmt(DONATIONS.reduce((s, d) => s + d.amount, 0))}</span>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="ptbl">
          <thead>
            <tr>
              <th>Receipt ID</th>
              <th>Donor</th>
              <th>Amount</th>
              <th>Fund Type</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map(d => (
              <tr key={d.id}>
                <td style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace" }}>{d.id}</td>
                <td>
                  <div className="pt-name">{d.donor}</div>
                  {d.email && <div className="pt-id">{d.email}</div>}
                  {d.patient && <div className="pt-id" style={{ color: "var(--info)" }}>→ {d.patient}</div>}
                </td>
                <td><span className="serif" style={{ fontSize: 20, color: "var(--gold)" }}>{fmt(d.amount)}</span></td>
                <td><span className={`badge ${d.type === "General Fund" ? "b-general" : "b-specific"}`}>{d.type === "General Fund" ? "General" : "Specific"}</span></td>
                <td style={{ fontSize: 12, color: "var(--text3)" }}>{d.method}</td>
                <td style={{ fontSize: 12, color: "var(--text3)" }}>{d.date}</td>
                <td><span className={`badge b-${d.status}`}>{d.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-sm">Receipt</button>
                    <button className="btn-sm">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)", fontSize: 14 }}>No donations found</div>
        )}
      </div>
    </div>
  );
}

// ─── Utilization Reports ──────────────────────────────────────────────────────
function UtilizationReports() {
  return (
    <div className="fade-in">
      <div className="stats-row" style={{ marginBottom: 20 }}>
        {[
          { lbl: "Total Received",  val: fmt(TOTAL_RECEIVED),  sub: "All donations, all time",  col: "var(--gold)" },
          { lbl: "Total Disbursed", val: fmt(TOTAL_DISBURSED), sub: "To patient bills",          col: "var(--ok)"   },
          { lbl: "Remaining Balance", val: fmt(FUND_BALANCE),  sub: "Available for disbursement", col: "var(--info)" },
          { lbl: "Utilization Rate",  val: `${Math.round(TOTAL_DISBURSED / TOTAL_RECEIVED * 100)}%`, sub: "Disbursed vs received", col: "var(--warn)" },
        ].map(s => (
          <div className="stat" key={s.lbl}>
            <div className="stat-lbl">{s.lbl}</div>
            <div className="stat-val serif" style={{ color: s.col }}>{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Monthly received vs disbursed */}
        <div className="card">
          <div className="sh"><div className="sh-title serif">Monthly <span>Flow Overview</span></div></div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={DONATION_TREND} barGap={4} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(221,213,194,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(221,213,194,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} width={48} tickFormatter={v => "৳" + v / 1000 + "k"} />
              <Tooltip content={<CTooltip />} cursor={{ fill: "rgba(201,168,76,.04)" }} />
              <Bar dataKey="amount" name="Received" fill="#c9a84c" radius={[3,3,0,0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Disbursement breakdown */}
        <div className="card">
          <div className="sh"><div className="sh-title serif">Disbursement <span>Breakdown</span></div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { cat: "Physiotherapy Sessions", amt: 42600, pct: 33 },
              { cat: "Medication Subsidies",   amt: 31200, pct: 24 },
              { cat: "Diagnostic Fees",        amt: 24800, pct: 19 },
              { cat: "Rehab Equipment",        amt: 18300, pct: 14 },
              { cat: "Consultation Fees",      amt: 10750, pct: 8  },
            ].map(r => (
              <div key={r.cat}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: "var(--text2)" }}>{r.cat}</span>
                  <span style={{ color: "var(--text3)" }}>{fmt(r.amt)} · {r.pct}%</span>
                </div>
                <div className="fund-bar-wrap" style={{ height: 6 }}>
                  <div style={{ height: "100%", borderRadius: 6, background: "linear-gradient(90deg,var(--info),#7ec8ed)", width: `${r.pct}%`, transition: "width .8s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full report table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--bord)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="sh-title serif">Disbursement <span>Audit Trail</span></div>
          <button className="btn-out">↓ Export Report</button>
        </div>
        <table className="ptbl">
          <thead>
            <tr>
              <th>Disbursement ID</th>
              <th>Recipient</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Approved By</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {DISBURSEMENTS.map(d => (
              <tr key={d.id}>
                <td style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace" }}>{d.id}</td>
                <td>
                  <div className="pt-name">{d.patient}</div>
                  <div className="pt-id">{d.patientId}</div>
                </td>
                <td><span className="serif" style={{ fontSize: 20, color: "var(--ok)" }}>{fmt(d.amount)}</span></td>
                <td style={{ fontSize: 11, color: "var(--text2)", maxWidth: 220 }}>{d.reason}</td>
                <td style={{ fontSize: 11, color: "var(--text3)" }}>{d.approvedBy}</td>
                <td style={{ fontSize: 11, color: "var(--text3)" }}>{d.date}</td>
                <td><span className={`badge b-${d.status}`}>{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DonationModule({ setPage: goHome }) {
  const [page, setPage] = useState("portal");
  const [t0, t1] = PAGE_TITLES[page];
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="shell">
      <style>{STYLES}</style>

      <aside className="sidebar">
        <div className="sb-logo">
          <div className="sb-logo-txt serif"><span style={{ color: "var(--gold)" }}>UP</span>PC</div>
          <div className="sb-logo-sub">Management Portal</div>
        </div>
        <div className="sb-module">
          <div className="sb-mod-lbl">Active Module</div>
          <div className="sb-mod-name">Donation Management</div>
        </div>
        <nav className="sb-nav">
          {NAV.map(item => (
            <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          <div style={{ padding: "10px 0 14px" }}>
            <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>Fund Balance</div>
            <div className="serif" style={{ fontSize: 22, color: "var(--gold)" }}>{fmt(FUND_BALANCE)}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>Available to disburse</div>
          </div>
          <div className="sb-status"><div className="online-dot" /><span>Donation Module · Live</span></div>
          {/* <button className="logout">⇤ Back to Portal</button> */}
          <button className="logout" onClick={() => goHome("home")}>⇤ Back to Home</button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <h1 className="pg-title serif">{t0} <span>{t1}</span></h1>
          <div className="tb-right">
            <span className="date-chip">{today}</span>
            <div style={{ position: "relative" }}>
              <button className="icon-btn">🔔</button>
              <div className="ndot" />
            </div>
            <div style={{ padding: "6px 14px", background: "var(--gdim)", border: "1px solid var(--gbord)", borderRadius: 20, fontSize: 12, color: "var(--gold)", fontFamily: "'Cormorant Garamond',serif" }}>
              {fmt(FUND_BALANCE)}
            </div>
          </div>
        </div>
        <div className="content">
          {page === "portal"   && <PublicPortal   setPage={setPage} />}
          {page === "donate"   && <MakeDonation />}
          {page === "fund"     && <GeneralFund    setPage={setPage} />}
          {page === "disburse" && <DisburseFunds />}
          {page === "ledger"   && <DonationLedger />}
          {page === "reports"  && <UtilizationReports />}
        </div>
      </main>
    </div>
  );
}