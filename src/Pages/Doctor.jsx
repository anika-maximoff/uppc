


// import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DOCTOR = {
  name: "Mahade Hasan Faisal",
  id: "DOC-UPPC-003",
  spec: "Neurology & Rehabilitation",
  license: "BMDC-45892",
  exp: "18 years",
  avatar: "AK",
  email: "mahade.hasan@uppc.com.bd",
  phone: "+880 1711-998877",
  nextPatient: { name: "Karim Uddin", time: "10:00 AM", type: "Follow-up" },
};

const MONTHLY_PATIENTS = [
  { month: "Nov", patients: 38, sessions: 62 },
  { month: "Dec", patients: 42, sessions: 70 },
  { month: "Jan", patients: 45, sessions: 74 },
  { month: "Feb", patients: 39, sessions: 65 },
  { month: "Mar", patients: 52, sessions: 88 },
  { month: "Apr", patients: 48, sessions: 79 },
  { month: "May", patients: 31, sessions: 51 },
];

const WEEKLY_APPTS = [
  { day: "Sat", appts: 7 },
  { day: "Sun", appts: 9 },
  { day: "Mon", appts: 6 },
  { day: "Tue", appts: 11 },
  { day: "Wed", appts: 8 },
  { day: "Thu", appts: 10 },
];

const CONDITION_MIX = [
  { name: "Post-stroke", value: 38, color: "#c9a84c" },
  { name: "Spinal Injury", value: 24, color: "#4a9fd4" },
  { name: "Hemiplegia", value: 18, color: "#2eb87a" },
  { name: "Neuropathy", value: 12, color: "#e8a030" },
  { name: "Other", value: 8, color: "#6b7fa3" },
];

const TODAY_SCHEDULE = [
  { id: "APT-081", time: "9:00 AM",  name: "Rafiqul Islam",  type: "New Consultation", status: "done",     age: 54 },
  { id: "APT-082", time: "9:45 AM",  name: "Sultana Begum",  type: "Follow-up",         status: "done",     age: 47 },
  { id: "APT-083", time: "10:30 AM", name: "Karim Uddin",    type: "Follow-up",         status: "active",   age: 46 },
  { id: "APT-084", time: "11:15 AM", name: "Md. Hasan Ali",  type: "Therapy Review",    status: "waiting",  age: 61 },
  { id: "APT-085", time: "12:00 PM", name: "Nasrin Akter",   type: "New Consultation",  status: "waiting",  age: 39 },
  { id: "APT-086", time: "2:00 PM",  name: "Abdul Karim",    type: "Follow-up",         status: "upcoming", age: 58 },
  { id: "APT-087", time: "2:45 PM",  name: "Fatema Noor",    type: "Prescription",      status: "upcoming", age: 33 },
  { id: "APT-088", time: "3:30 PM",  name: "Zahir Hossain",  type: "Follow-up",         status: "upcoming", age: 65 },
];

const PATIENTS = [
  { id: "UPPC-2024-0481", name: "Karim Uddin",    age: 46, condition: "Post-stroke Hemiplegia",    sessions: 14, lastVisit: "28 Apr", status: "active",   progress: 68 },
  { id: "UPPC-2024-0312", name: "Sultana Begum",  age: 47, condition: "Spinal Cord Injury L3-L4",   sessions: 22, lastVisit: "28 Apr", status: "active",   progress: 52 },
  { id: "UPPC-2024-0198", name: "Rafiqul Islam",   age: 54, condition: "Ischemic Stroke Recovery",  sessions: 8,  lastVisit: "15 May", status: "new",      progress: 20 },
  { id: "UPPC-2023-0874", name: "Nasrin Akter",    age: 39, condition: "Peripheral Neuropathy",     sessions: 31, lastVisit: "02 May", status: "active",   progress: 81 },
  { id: "UPPC-2023-0561", name: "Abdul Karim",     age: 58, condition: "Cervical Myelopathy",       sessions: 19, lastVisit: "01 May", status: "active",   progress: 44 },
  { id: "UPPC-2024-0055", name: "Md. Hasan Ali",   age: 61, condition: "Post-stroke Hemiplegia",    sessions: 6,  lastVisit: "10 Apr", status: "critical", progress: 15 },
];

const ALL_APPOINTMENTS = [
  { id: "APT-081", patient: "Rafiqul Islam",  date: "15 May 2025", time: "9:00 AM",  type: "New Consultation", status: "completed" },
  { id: "APT-082", patient: "Sultana Begum",  date: "15 May 2025", time: "9:45 AM",  type: "Follow-up",        status: "completed" },
  { id: "APT-083", patient: "Karim Uddin",    date: "15 May 2025", time: "10:30 AM", type: "Follow-up",        status: "in-progress" },
  { id: "APT-084", patient: "Md. Hasan Ali",  date: "15 May 2025", time: "11:15 AM", type: "Therapy Review",   status: "upcoming" },
  { id: "APT-089", patient: "Karim Uddin",    date: "18 May 2025", time: "10:00 AM", type: "Follow-up",        status: "scheduled" },
  { id: "APT-090", patient: "Nasrin Akter",   date: "18 May 2025", time: "2:30 PM",  type: "Review",           status: "scheduled" },
  { id: "APT-076", patient: "Abdul Karim",    date: "10 May 2025", time: "11:00 AM", type: "Follow-up",        status: "completed" },
  { id: "APT-071", patient: "Sultana Begum",  date: "05 May 2025", time: "9:00 AM",  type: "Therapy Review",   status: "completed" },
];

// ─── Medicine Ads Data ────────────────────────────────────────────────────────
const SIDE_MEDICINES = [
  {
    id: 1,
    badge: "NEW",
    badgeColor: "#2eb87a",
    name: "Seclo 40",
    tagline: "Proton Pump Inhibitor",
    conditions: ["Gastric Ulcer", "GERD"],
    desc: "Seclo 40 contains omeprazole, reduces stomach acid production, heals ulcers, and prevents acid-related problems.",
    accent: "#2eb87a",
    icon: "💊",
  },
  {
    id: 2,
    badge: "FEATURED",
    badgeColor: "#c9a84c",
    name: "Neurotop 400",
    tagline: "Anticonvulsant",
    conditions: ["Epilepsy", "Neuropathic Pain"],
    desc: "Neurotop 400 (Carbamazepine) stabilizes neural membranes, effective for seizure disorders and trigeminal neuralgia.",
    accent: "#c9a84c",
    icon: "🧠",
  },
  {
    id: 3,
    badge: "POPULAR",
    badgeColor: "#4a9fd4",
    name: "Actavis 10mg",
    tagline: "Muscle Relaxant",
    conditions: ["Spasticity", "MS"],
    desc: "Baclofen-based relaxant reduces spasticity in spinal cord injuries, post-stroke patients, and multiple sclerosis.",
    accent: "#4a9fd4",
    icon: "⚕️",
  },
];

const BOTTOM_MEDICINE = {
  badge: "OLD MEDICINE",
  badgeColor: "#6b7fa3",
  name: "Losec 20 mg",
  tagline: "Omeprazole — Proton Pump Inhibitor",
  conditions: ["Gastric Ulcer", "Duodenal Ulcer"],
  desc: "Losec 20 mg contains omeprazole, which reduces stomach acid production, helping relieve heartburn, heal ulcers, and manage acid-related digestive conditions effectively.",
  accent: "#6b7fa3",
  icon: "💉",
};

const NAV = [
  { id: "dashboard",    label: "Dashboard",       icon: "⬡" },
  { id: "schedule",     label: "Today's Schedule", icon: "◈" },
  { id: "patients",     label: "My Patients",      icon: "◉" },
  { id: "appointments", label: "Appointments",     icon: "◇" },
  { id: "prescribe",    label: "Write Prescription", icon: "✦" },
  { id: "profile",      label: "My Profile",        icon: "◎" },
];

const PAGE_TITLES = {
  dashboard:    ["Doctor", "Dashboard"],
  schedule:     ["Today's", "Schedule"],
  patients:     ["My", "Patients"],
  appointments: ["All", "Appointments"],
  prescribe:    ["Write", "Prescription"],
  profile:      ["My", "Profile"],
};

// ─── L-Panel Width Constants ──────────────────────────────────────────────────
const L_LEFT_W  = 172; // px — left medicine strip
const L_BOTTOM_H = 110; // px — bottom medicine strip

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
    --l-left: ${L_LEFT_W}px;
    --l-bottom: ${L_BOTTOM_H}px;
  }
  body { background: var(--navy); color: var(--text); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
  input, select, textarea { font-family: 'DM Sans', sans-serif; outline: none; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  /* ── L-Panel Layout ── */
  /*  Fixed left strip: runs full height from top to (bottom + L_BOTTOM_H) */
  .l-left {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--l-left);
    bottom: var(--l-bottom);
    background: var(--navy2);
    border-right: 1px solid var(--bord);
    z-index: 60;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  /* Fixed bottom strip: runs from left-strip right edge all the way to right edge */
  .l-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--l-bottom);
    background: var(--navy2);
    border-top: 1px solid var(--bord);
    z-index: 60;
    display: flex;
    align-items: center;
    gap: 0;
    overflow: hidden;
  }
  /* L-corner fill so the junction looks seamless */
  .l-corner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: var(--l-left);
    height: var(--l-bottom);
    background: var(--navy2);
    border-top: 1px solid var(--bord);
    border-right: 1px solid var(--bord);
    z-index: 62;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Main shell shifts right by L_LEFT_W ── */
  .shell   { display: flex; min-height: 100vh; padding-left: var(--l-left); }
  .sidebar { width: 256px; min-height: 100vh; background: var(--navy2); border-right: 1px solid var(--bord); display: flex; flex-direction: column; position: fixed; top: 0; left: var(--l-left); bottom: 0; z-index: 50; }
  .main    { margin-left: 256px; flex: 1; background: var(--navy); padding-bottom: var(--l-bottom); }
  .topbar  { padding: 18px 36px; border-bottom: 1px solid var(--bord); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; background: rgba(7,17,31,0.92); backdrop-filter: blur(10px); }
  .content { padding: 32px 36px; }

  /* ── Sidebar ── */
  .sb-logo     { padding: 26px 26px 18px; border-bottom: 1px solid var(--bord); }
  .sb-logo-txt { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 600; }
  .sb-logo-sub { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--text3); margin-top: 2px; }
  .sb-doc      { padding: 18px 26px; border-bottom: 1px solid var(--bord); display: flex; align-items: center; gap: 11px; }
  .sb-av       { width: 40px; height: 40px; border-radius: 50%; background: var(--gdim); border: 1px solid var(--gbord); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 15px; color: var(--gold); flex-shrink: 0; }
  .sb-name     { font-size: 13px; font-weight: 500; }
  .sb-spec     { font-size: 10px; color: var(--text3); margin-top: 2px; }
  // .sb-nav { flex: 1; padding: 6px 0; }
  // .sb-nav { overflow-y: auto; padding: 6px 0; flex-shrink: 1; min-height: 0; }
  .nav-item    { display: flex; align-items: center; gap: 11px; padding: 8px 40px; font-size: 13px; color: var(--text2); cursor: pointer; transition: all .18s; border-left: 2px solid transparent; }
  .nav-item:hover  { color: var(--text); background: rgba(201,168,76,0.04); }
  .nav-item.active { color: var(--gold); border-left-color: var(--gold); background: var(--gdim); }
  .nav-icon    { font-size: 13px; width: 16px; text-align: center; opacity: .75; }
  .nav-item.active .nav-icon { opacity: 1; }
  // .sb-foot     { padding: 18px 26px; border-top: 1px solid var(--bord); }
  // .sb-foot { padding: 12px 26px; border-top: 1px solid var(--bord); flex-shrink: 0; }
  .sb-status   { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text3); margin-bottom: 12px; }
  .online-dot  { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
  .logout      { font-size: 12px; color: var(--text3); background: none; border: none; padding: 0; display: flex; align-items: center; gap: 8px; transition: color .2s; letter-spacing: .05em; }
  .logout:hover { color: var(--danger); }

  /* ── Topbar ── */
  .pg-title    { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; }
  .pg-title span { color: var(--gold); font-style: italic; }
  .tb-right    { display: flex; align-items: center; gap: 14px; }
  .icon-btn    { width: 36px; height: 36px; border-radius: 50%; background: var(--navy2); border: 1px solid var(--bord); display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--text2); transition: all .2s; position: relative; }
  .icon-btn:hover { border-color: var(--gbord); color: var(--gold); }
  .ndot        { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); position: absolute; top: 5px; right: 5px; }
  .date-chip   { font-size: 11px; letter-spacing: .1em; color: var(--text3); padding: 6px 14px; border: 1px solid var(--bord); border-radius: 20px; }

  /* ── Cards ── */
  .card   { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 24px; }
  .card-s { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 18px 20px; }

  /* ── Stat cards ── */
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); padding: 20px 22px; transition: border-color .2s; }
  .stat:hover { border-color: var(--gbord); }
  .stat-lbl { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--text3); margin-bottom: 8px; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 3px; }
  .stat-sub { font-size: 11px; color: var(--text3); }

  /* ── Section headers ── */
  .sh { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .sh-title { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 400; }
  .sh-title span { color: var(--gold); font-style: italic; }
  .lnk { font-size: 11px; color: var(--gold); letter-spacing: .08em; background: none; border: none; padding: 0; opacity: .8; transition: opacity .2s; }
  .lnk:hover { opacity: 1; }

  /* ── Badges ── */
  .badge { display: inline-block; font-size: 10px; font-weight: 500; letter-spacing: .09em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; }
  .b-done        { background: rgba(46,184,122,.14);  color: var(--ok);     }
  .b-active      { background: rgba(201,168,76,.18);  color: var(--gold);   }
  .b-waiting     { background: rgba(74,159,212,.14);  color: var(--info);   }
  .b-upcoming    { background: rgba(221,213,194,.08); color: var(--text2);  }
  .b-scheduled   { background: rgba(221,213,194,.08); color: var(--text2);  }
  .b-completed   { background: rgba(46,184,122,.14);  color: var(--ok);     }
  .b-in-progress { background: rgba(201,168,76,.18);  color: var(--gold);   }
  .b-new         { background: rgba(74,159,212,.14);  color: var(--info);   }
  .b-critical    { background: rgba(232,85,85,.14);   color: var(--danger); }

  /* ── Buttons ── */
  .btn-gold    { background: var(--gold); color: var(--navy); font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; padding: 10px 24px; border: none; border-radius: var(--r); transition: all .2s; }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(201,168,76,.2); }
  .btn-out { background: transparent; color: var(--gold); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; padding: 8px 18px; border: 1px solid var(--gbord); border-radius: var(--r); transition: all .2s; }
  .btn-out:hover { background: var(--gdim); }
  .btn-sm { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; padding: 6px 13px; border: 1px solid var(--bord); color: var(--text3); background: none; border-radius: var(--r); transition: all .2s; }
  .btn-sm:hover { border-color: var(--gbord); color: var(--gold); }

  /* ── Today schedule ── */
  .sched-item { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid var(--bord); transition: background .15s; }
  .sched-item:last-child { border-bottom: none; padding-bottom: 0; }
  .sched-item:first-child { padding-top: 0; }
  .sched-item.active-row { background: rgba(201,168,76,.04); margin: 0 -24px; padding: 13px 24px; border-radius: 0; }
  .time-pill { min-width: 64px; font-size: 12px; color: var(--text3); text-align: right; }
  .sched-av { width: 34px; height: 34px; border-radius: 50%; background: var(--navy3); border: 1px solid var(--bord); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--text3); flex-shrink: 0; font-family: 'Cormorant Garamond', serif; }
  .sched-name { font-size: 13px; font-weight: 500; color: var(--text); }
  .sched-type { font-size: 11px; color: var(--text3); margin-top: 2px; }

  /* ── Patient table ── */
  .ptbl { width: 100%; border-collapse: collapse; }
  .ptbl th { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--text3); padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--bord); font-weight: 400; }
  .ptbl td { padding: 14px; font-size: 13px; color: var(--text2); border-bottom: 1px solid rgba(201,168,76,.055); vertical-align: middle; }
  .ptbl tr:last-child td { border-bottom: none; }
  .ptbl tr:hover td { background: rgba(201,168,76,.025); }
  .pt-name { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 2px; }
  .pt-id   { font-size: 10px; color: var(--text3); letter-spacing: .06em; }
  .mini-bar-wrap { background: var(--navy3); border-radius: 3px; height: 5px; width: 80px; overflow: hidden; margin-top: 5px; }
  .mini-bar { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--gold), var(--gold2)); }

  /* ── Prescription form ── */
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field label { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--text3); }
  .field input, .field select, .field textarea { background: var(--navy3); border: 1px solid var(--bord); border-radius: var(--r); padding: 10px 13px; font-size: 13px; color: var(--text); transition: border-color .2s; }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--gbord); }
  .field select option { background: var(--navy2); }
  .fg2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .fg4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; align-items: flex-end; margin-bottom: 10px; }
  .med-row { background: var(--navy3); border: 1px solid var(--bord); border-radius: var(--r); padding: 12px 14px; margin-bottom: 8px; display: grid; grid-template-columns: 1.5fr 1fr 1.5fr 1.2fr auto; gap: 10px; align-items: center; font-size: 13px; }
  .del-btn { width: 26px; height: 26px; border-radius: 50%; background: none; border: 1px solid rgba(232,85,85,.3); color: rgba(232,85,85,.5); font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all .2s; }
  .del-btn:hover { background: rgba(232,85,85,.1); color: var(--danger); }
  .success-box { background: rgba(46,184,122,.07); border: 1px solid rgba(46,184,122,.22); border-radius: var(--rl); padding: 36px; text-align: center; }

  /* ── Chart tooltips ── */
  .custom-tooltip { background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--r); padding: 10px 14px; font-size: 12px; }
  .custom-tooltip .label { color: var(--text3); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px; }

  /* ── Profile ── */
  .prof-hd { display: flex; align-items: center; gap: 22px; padding: 26px; background: var(--navy2); border: 1px solid var(--bord); border-radius: var(--rl); margin-bottom: 22px; }
  .prof-av { width: 68px; height: 68px; border-radius: 50%; background: var(--gdim); border: 2px solid var(--gbord); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 26px; color: var(--gold); flex-shrink: 0; }
  .prof-name { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; margin-bottom: 3px; }
  .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .ii { padding: 12px 16px; background: var(--navy3); border: 1px solid var(--bord); border-radius: var(--r); }
  .ii label { display: block; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--text3); margin-bottom: 4px; }
  .ii span { font-size: 13px; color: var(--text); }

  /* ── System Modal Overlay Window ── */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(7, 17, 31, 0.85);
    backdrop-filter: blur(6px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: modalFadeIn 0.2s ease-out forwards;
  }
  .modal-window {
    background: var(--navy2);
    border: 1px solid var(--gbord);
    border-radius: var(--rl);
    width: 90%;
    max-width: 650px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 24px;
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }

  /* ── L-Panel Medicine Cards ── */
  .med-ad-card {
    padding: 12px;
    border-bottom: 1px solid var(--bord);
    flex-shrink: 0;
    cursor: pointer;
    transition: background .18s;
    position: relative;
  }
  .med-ad-card:hover { background: rgba(201,168,76,.04); }
  .med-ad-card:last-child { border-bottom: none; }
  .med-ad-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .med-ad-icon {
    font-size: 22px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .med-ad-badge {
    font-size: 8px;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 10px;
  }
  .med-ad-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 1px;
    line-height: 1.1;
  }
  .med-ad-tagline {
    font-size: 9px;
    color: var(--text3);
    letter-spacing: .07em;
    margin-bottom: 6px;
  }
  .med-ad-conditions {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin-bottom: 6px;
  }
  .med-ad-cond-tag {
    font-size: 8px;
    padding: 2px 6px;
    border-radius: 10px;
    border: 1px solid;
    letter-spacing: .06em;
    text-transform: uppercase;
  }
  .med-ad-desc {
    font-size: 9.5px;
    color: var(--text3);
    line-height: 1.45;
    margin-bottom: 7px;
  }
  .med-ad-link {
    font-size: 9px;
    letter-spacing: .1em;
    text-transform: uppercase;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 3px;
    transition: opacity .2s;
    opacity: .75;
  }
  .med-ad-link:hover { opacity: 1; }

  /* ── L strip header ── */
  .l-strip-header {
    padding: 10px 12px;
    border-bottom: 1px solid var(--bord);
    font-size: 8px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--text3);
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
  .l-strip-header::before {
    content: '';
    width: 14px;
    height: 1px;
    background: var(--gold);
    opacity: .5;
    flex-shrink: 0;
  }

  /* ── Bottom banner medicine ── */
  .l-bottom-corner-spacer {
    width: var(--l-left);
    height: 100%;
    flex-shrink: 0;
  }
  .l-bottom-content {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 22px;
    border-left: 1px solid var(--bord);
    overflow: hidden;
  }
  .l-bottom-badge {
    font-size: 8px;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 10px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .l-bottom-icon { font-size: 28px; flex-shrink: 0; }
  .l-bottom-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 2px;
  }
  .l-bottom-tagline { font-size: 10px; color: var(--text3); margin-bottom: 4px; }
  .l-bottom-tags { display: flex; gap: 5px; }
  .l-bottom-tag {
    font-size: 8px;
    padding: 2px 6px;
    border-radius: 10px;
    border: 1px solid;
    letter-spacing: .06em;
    text-transform: uppercase;
  }
  .l-bottom-desc {
    font-size: 11px;
    color: var(--text3);
    line-height: 1.5;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .l-bottom-link {
    font-size: 9px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--text3);
    background: none;
    border: none;
    padding: 0;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color .2s;
  }
  .l-bottom-link:hover { color: var(--gold); }
  .l-bottom-sep { width: 1px; height: 50px; background: var(--bord); flex-shrink: 0; }
  .sponsored-tag {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 8px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--text3);
    opacity: .5;
    padding: 8px 0;
    flex-shrink: 0;
  }

  /* ── Animate ── */
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation: fadeUp .32s ease forwards; }

  /* ── Divider ── */
  .dvd { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--text3); display: flex; align-items: center; gap: 10px; margin: 20px 0 14px; }
  .dvd::before, .dvd::after { content:''; flex:1; height:1px; background:var(--bord); }

  /* ── Scrollable left strip ── */
  .l-left-ads {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .l-left-ads::-webkit-scrollbar { display: none; }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    :root { --l-left: 148px; }
    .sidebar { width: 210px; }
    .main { margin-left: 210px; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .content { padding: 22px 20px; }
    .topbar { padding: 14px 20px; }
    .fg4 { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 760px) {
    :root { --l-left: 0px; --l-bottom: 80px; }
    .l-left { display: none; }
    .shell { padding-left: 0; }
    .sidebar { left: 0; display: none; }
    .main { margin-left: 0; }
    .l-bottom-corner-spacer { display: none; }
    .l-bottom-content { border-left: none; }
    .fg2, .fg4 { grid-template-columns: 1fr; }
    .ptbl thead { display: none; }
  }
`;

// ─── Custom Chart Tooltip ────────────────────────────────────────────────────
const CTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, fontSize: 13, marginTop: 2 }}>
          {p.name}: <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Medicine Ad Card (Left Strip) ───────────────────────────────────────────
function MedAdCard({ med }) {
  return (
    <div className="med-ad-card">
      <div className="med-ad-header">
        <span className="med-ad-icon">{med.icon}</span>
        <span
          className="med-ad-badge"
          style={{ background: `${med.badgeColor}22`, color: med.badgeColor, border: `1px solid ${med.badgeColor}44` }}
        >
          {med.badge}
        </span>
      </div>
      <div className="med-ad-name serif" style={{ color: med.accent }}>{med.name}</div>
      <div className="med-ad-tagline">{med.tagline}</div>
      <div className="med-ad-conditions">
        {med.conditions.map(c => (
          <span
            key={c}
            className="med-ad-cond-tag"
            style={{ color: med.accent, borderColor: `${med.accent}44`, background: `${med.accent}11` }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="med-ad-desc">{med.desc}</div>
      <button className="med-ad-link" style={{ color: med.accent }}>
        Learn more <span style={{ opacity: .6 }}>→</span>
      </button>
    </div>
  );
}

// ─── L-shaped Medicine Panel ─────────────────────────────────────────────────
function LMedicinePanel() {
  return (
    <>
      {/* Left vertical strip */}
      <div className="l-left">
        <div className="l-strip-header">Sponsored</div>
        <div className="l-left-ads">
          {SIDE_MEDICINES.map(med => (
            <MedAdCard key={med.id} med={med} />
          ))}
        </div>
      </div>

      {/* Bottom horizontal strip + corner fill */}
      <div className="l-corner">
        <div style={{ fontSize: 8, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--text3)", opacity: .6, textAlign: "center", lineHeight: 1.4 }}>
          Med<br/>Ads
        </div>
      </div>

      <div className="l-bottom">
        {/* spacer matching the left strip width (corner covers it) */}
        <div className="l-bottom-corner-spacer" />

        {/* Bottom ad content */}
        <div className="l-bottom-content">
          <span
            className="l-bottom-badge"
            style={{
              background: `${BOTTOM_MEDICINE.badgeColor}22`,
              color: BOTTOM_MEDICINE.badgeColor,
              border: `1px solid ${BOTTOM_MEDICINE.badgeColor}44`,
            }}
          >
            {BOTTOM_MEDICINE.badge}
          </span>

          <div className="l-bottom-icon">{BOTTOM_MEDICINE.icon}</div>

          <div style={{ flexShrink: 0, minWidth: 130 }}>
            <div className="l-bottom-name serif" style={{ color: BOTTOM_MEDICINE.accent }}>
              {BOTTOM_MEDICINE.name}
            </div>
            <div className="l-bottom-tagline">{BOTTOM_MEDICINE.tagline}</div>
            <div className="l-bottom-tags">
              {BOTTOM_MEDICINE.conditions.map(c => (
                <span
                  key={c}
                  className="l-bottom-tag"
                  style={{ color: BOTTOM_MEDICINE.accent, borderColor: `${BOTTOM_MEDICINE.accent}44`, background: `${BOTTOM_MEDICINE.accent}11` }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="l-bottom-sep" />

          <div className="l-bottom-desc">{BOTTOM_MEDICINE.desc}</div>

          <button className="l-bottom-link" style={{ color: BOTTOM_MEDICINE.accent }}>
            Learn more →
          </button>

          <div className="sponsored-tag">Sponsored</div>
        </div>
      </div>
    </>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
// function Dashboard({ setPage }) {
//   return (
//     <div className="fade-in">
//       <div style={{ marginBottom: 24, padding: "20px 26px", background: "linear-gradient(135deg,rgba(201,168,76,.09),transparent)", border: "1px solid var(--gbord)", borderRadius: "var(--rl)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
//         <div>
//           <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 5 }}>Thursday, 15 May 2025</div>
//           <div className="serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 3 }}>Good morning, <em style={{ color: "var(--gold)" }}>Dr. Khanam</em></div>
//           <div style={{ fontSize: 12, color: "var(--text3)" }}>Next patient: <span style={{ color: "var(--text2)" }}>{DOCTOR.nextPatient.name}</span> at <span style={{ color: "var(--gold)" }}>{DOCTOR.nextPatient.time}</span> — {DOCTOR.nextPatient.type}</div>
//         </div>
//         <div style={{ display: "flex", gap: 10 }}>
//           <button className="btn-out" onClick={() => setPage("schedule")}>View Schedule</button>
//           <button className="btn-gold" onClick={() => setPage("prescribe")}>+ Prescription</button>
//         </div>
//       </div>

//       <div className="stats-row">
//         {[
//           { lbl: "Today's Patients",  val: "8",   sub: "3 completed · 1 active" },
//           { lbl: "This Month",        val: "31",  sub: "Patients seen" },
//           { lbl: "Active Cases",      val: "48",  sub: "Under my care" },
//           { lbl: "Avg Sessions/pt",   val: "5.8", sub: "Monthly average" },
//         ].map((s) => (
//           <div className="stat" key={s.lbl}>
//             <div className="stat-lbl">{s.lbl}</div>
//             <div className="stat-val serif">{s.val}</div>
//             <div className="stat-sub">{s.sub}</div>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 20 }}>
//         <div className="card">
//           <div className="sh">
//             <div className="sh-title serif">Monthly <span>Patient Volume</span></div>
//             <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text3)" }}>
//               <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--gold)", display: "inline-block" }} /> Patients</span>
//               <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--info)", display: "inline-block" }} /> Sessions</span>
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={210}>
//             <BarChart data={MONTHLY_PATIENTS} barGap={4} barCategoryGap="28%">
//               <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.07)" />
//               <XAxis dataKey="month" tick={{ fill: "rgba(221,213,194,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
//               <YAxis tick={{ fill: "rgba(221,213,194,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
//               <Tooltip content={<CTooltip />} cursor={{ fill: "rgba(201,168,76,0.04)" }} />
//               <Bar dataKey="patients" name="Patients" fill="#c9a84c" radius={[3,3,0,0]} maxBarSize={22} />
//               <Bar dataKey="sessions" name="Sessions"  fill="#4a9fd4" radius={[3,3,0,0]} maxBarSize={22} opacity={0.75} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="card">
//           <div className="sh">
//             <div className="sh-title serif">Patient <span>Condition Mix</span></div>
//           </div>
//           <ResponsiveContainer width="100%" height={160}>
//             <PieChart>
//               <Pie data={CONDITION_MIX} cx="50%" cy="50%" innerRadius={46} outerRadius={70} paddingAngle={3} dataKey="value">
//                 {CONDITION_MIX.map((entry, i) => (
//                   <Cell key={i} fill={entry.color} opacity={0.85} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: 6, fontSize: 12 }} itemStyle={{ color: "var(--text)" }} />
//             </PieChart>
//           </ResponsiveContainer>
//           <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
//             {CONDITION_MIX.map((c) => (
//               <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11 }}>
//                 <span style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text3)" }}>
//                   <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, display: "inline-block", flexShrink: 0 }} />{c.name}
//                 </span>
//                 <span style={{ color: c.color, fontFamily: "'Cormorant Garamond',serif", fontSize: 15 }}>{c.value}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//         <div className="card">
//           <div className="sh">
//             <div className="sh-title serif">This Week's <span>Appointments</span></div>
//           </div>
//           <ResponsiveContainer width="100%" height={190}>
//             <AreaChart data={WEEKLY_APPTS}>
//               <defs>
//                 <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="10%" stopColor="#c9a84c" stopOpacity={0.25} />
//                   <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.06)" />
//               <XAxis dataKey="day" tick={{ fill: "rgba(221,213,194,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
//               <YAxis tick={{ fill: "rgba(221,213,194,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} width={24} />
//               <Tooltip content={<CTooltip />} cursor={{ stroke: "rgba(201,168,76,0.15)" }} />
//               <Area type="monotone" dataKey="appts" name="Appointments" stroke="#c9a84c" strokeWidth={2} fill="url(#goldGrad)" dot={{ fill: "#c9a84c", strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: "#e8c97a" }} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="card">
//           <div className="sh">
//             <div className="sh-title serif">Today's <span>Queue</span></div>
//             <button className="lnk" onClick={() => setPage("schedule")}>Full view →</button>
//           </div>
//           {TODAY_SCHEDULE.slice(0, 5).map((s) => {
//             const initials = s.name.split(" ").map(w => w[0]).join("").slice(0, 2);
//             return (
//               <div key={s.id} className={`sched-item ${s.status === "active" ? "active-row" : ""}`}>
//                 <span className="time-pill">{s.time}</span>
//                 <div className="sched-av serif">{initials}</div>
//                 <div style={{ flex: 1 }}>
//                   <div className="sched-name">{s.name}</div>
//                   <div className="sched-type">{s.type}</div>
//                 </div>
//                 <span className={`badge b-${s.status}`}>{s.status}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

function Dashboard({ setPage, onSelectPatient }) {
  // ─── 1. Core Reactive States ───
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const DOCTOR_NAME = "Mahade Hasan Faisal";
  const API_BASE = "http://localhost:5000";

  // ─── 2. Fetch Authentic Datasets in Parallel ───
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resAppts, resPts, resPresc] = await Promise.all([
          fetch(`${API_BASE}/api/appointments`),
          fetch(`${API_BASE}/users/patients`),
          fetch(`${API_BASE}/api/prescriptions`)
        ]);

        let apptsData = resAppts.ok ? await resAppts.json() : [];
        let ptsData = resPts.ok ? await resPts.json() : {};
        let prescData = resPresc.ok ? await resPresc.json() : [];

        // Normalize variations in wrapper formats from the server safely
        apptsData = Array.isArray(apptsData) ? apptsData : (apptsData.data || apptsData.appointments || []);
        const actualPatients = Array.isArray(ptsData) ? ptsData : (ptsData.patients || []);
        prescData = Array.isArray(prescData) ? prescData : (prescData.data || prescData.prescriptions || []);

        // Filter everything dynamically to match your logged-in doctor profile context
        const filteredAppts = apptsData.filter(a => a.assignedDoctor === DOCTOR_NAME || a.doctorName === DOCTOR_NAME);
        const filteredPts = actualPatients.filter(p => p.assignedDoctor === DOCTOR_NAME);
        const filteredPresc = prescData.filter(r => r.doctorName === DOCTOR_NAME || r.assignedDoctor === DOCTOR_NAME);

        setAppointments(filteredAppts);
        setPatients(filteredPts);
        setPrescriptions(filteredPresc);
      } catch (error) {
        console.error("Dashboard database sync interrupt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ─── 3. Compute Real-Time Analytical Layout Metrics ───
  
  // A. Top Header Banner "Next Patient" Calculations
  const activeQueue = appointments.filter(a => a.status === "active" || a.status === "waiting");
  const nextPatientObj = activeQueue[0] || { name: "No remaining queue", time: "--:--", type: "Rounds Finished" };

  // B. Counter Grid Calculation Blocks
  const doneToday = appointments.filter(a => a.status === "done" || a.status === "completed").length;
  const activeToday = appointments.filter(a => a.status === "active").length;
  
  // Total patients seen ever or this month matching clinical history entries
  const historicUniqueIds = new Set(prescriptions.map(p => p.patientId));
  
  const avgSessions = patients.length > 0 
    ? (patients.reduce((acc, p) => acc + (Number(p.sessions) || 0), 0) / patients.length).toFixed(1) 
    : "0.0";

  // C. Dynamic Chart Mapping: Monthly Patient Volume
  const monthsLayout = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dynamicMonthlyVolume = monthsLayout.map((m, index) => {
    // Count matches based on timestamp logs inside database items
    const ptsInMonth = patients.filter(p => p.createdAt && new Date(p.createdAt).getMonth() === index).length;
    const sessionsInMonth = patients.filter(p => p.createdAt && new Date(p.createdAt).getMonth() === index)
                                     .reduce((sum, p) => sum + (Number(p.sessions) || 0), 0);
    return { month: m, patients: ptsInMonth || 1, sessions: sessionsInMonth || ptsInMonth * 2 }; 
  });

  // D. Dynamic Chart Mapping: Patient Condition Mix Pie Chart
  const conditionsGroup = patients.reduce((acc, p) => {
    const cName = p.condition || "General Checkup";
    acc[cName] = (acc[cName] || 0) + 1;
    return acc;
  }, {});

  const colorPalette = ["#c9a84c", "#4a9fd4", "#e85555", "#2ecc71", "#9b59b6"];
  const dynamicConditionMix = Object.keys(conditionsGroup).map((key, i) => ({
    name: key,
    value: Math.round((conditionsGroup[key] / patients.length) * 100),
    color: colorPalette[i % colorPalette.length]
  }));

  // E. Dynamic Chart Mapping: This Week's Appointments Area Tracker
  const daysLayout = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dynamicWeeklyAppts = daysLayout.map((d, index) => {
    const matches = appointments.filter(a => {
      if (!a.date) return false;
      const dayNum = new Date(a.date).getDay(); // 0 is Sun, 1 is Mon...
      const normalizedDayNum = dayNum === 0 ? 6 : dayNum - 1;
      return normalizedDayNum === index;
    }).length;
    return { day: d, appts: matches };
  });

  if (loading) {
    return (
      <div className="card" style={{ padding: "60px 0", textAlign: "center" }}>
        <div style={{ color: "var(--text3)", fontSize: 14 }}>Aggregating live hospital database analytics...</div>
      </div>
    );
  }

  // Get current matching timeline date stamp layout
  const todayStr = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="fade-in">
      {/* ─── Top Dynamic Welcome Greeting Banner ─── */}
      <div style={{ marginBottom: 24, padding: "20px 26px", background: "linear-gradient(135deg,rgba(201,168,76,.09),transparent)", border: "1px solid var(--gbord)", borderRadius: "var(--rl)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 5 }}>{todayStr}</div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 3 }}>Good morning, <em style={{ color: "var(--gold)" }}>Dr. Mahade</em></div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>Next patient: <span style={{ color: "var(--text2)" }}>{nextPatientObj.name || nextPatientObj.patientName}</span> at <span style={{ color: "var(--gold)" }}>{nextPatientObj.time}</span> — {nextPatientObj.type || nextPatientObj.appointmentType}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-out" onClick={() => setPage("schedule")}>View Schedule</button>
          <button className="btn-gold" onClick={() => setPage("prescribe")}>+ Prescription</button>
        </div>
      </div>

      {/* ─── Live Dynamic Statistics Grid Counter Rows ─── */}
      <div className="stats-row">
        {[
          { lbl: "Today's Patients",  val: appointments.length, sub: `${doneToday} completed · ${activeToday} active` },
          { lbl: "Total Case Volume",  val: historicUniqueIds.size || patients.length, sub: "Patients treated logs" },
          { lbl: "Active Caseload",   val: patients.length,  sub: "Under my direct care" },
          { lbl: "Avg Sessions/pt",   val: avgSessions,      sub: "Active metrics index" },
        ].map((s) => (
          <div className="stat" key={s.lbl}>
            <div className="stat-lbl">{s.lbl}</div>
            <div className="stat-val serif">{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ─── Center Analytics Block: Bar Graph and Condition Mix Pie Chart ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 20 }}>
        
        {/* Monthly Volume Bar Chart Frame */}
        <div className="card">
          <div className="sh">
            <div className="sh-title serif">Monthly <span>Patient Volume</span></div>
            <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text3)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--gold)", display: "inline-block" }} /> Patients</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--info)", display: "inline-block" }} /> Sessions</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={dynamicMonthlyVolume} barGap={4} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.07)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(221,213,194,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(221,213,194,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<CTooltip />} cursor={{ fill: "rgba(201,168,76,0.04)" }} />
              <Bar dataKey="patients" name="Patients" fill="#c9a84c" radius={[3,3,0,0]} maxBarSize={22} />
              <Bar dataKey="sessions" name="Sessions"  fill="#4a9fd4" radius={[3,3,0,0]} maxBarSize={22} opacity={0.75} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dynamic Patient Condition Mix Pie Chart Frame */}
        <div className="card">
          <div className="sh">
            <div className="sh-title serif">Patient <span>Condition Mix</span></div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={dynamicConditionMix.length > 0 ? dynamicConditionMix : [{ name: "General Checkup", value: 100, color: "#c9a84c" }]} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value">
                {(dynamicConditionMix.length > 0 ? dynamicConditionMix : [{ color: "#c9a84c" }]).map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: 6, fontSize: 12 }} itemStyle={{ color: "var(--text)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4, maxHeight: "110px", overflowY: "auto" }}>
            {(dynamicConditionMix.length > 0 ? dynamicConditionMix : [{ name: "General Checkup", value: 100, color: "#c9a84c" }]).map((c) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text3)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, display: "inline-block", flexShrink: 0 }} />{c.name}
                </span>
                <span style={{ color: c.color, fontFamily: "'Cormorant Garamond',serif", fontSize: 15 }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Footer Layout Section: Weekly Activity Area Map & Real-time Live Queue list ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        
        {/* Weekly Area Distribution Spline Area Map Component */}
        <div className="card">
          <div className="sh">
            <div className="sh-title serif">This Week's <span>Appointments</span></div>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={dynamicWeeklyAppts}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#c9a84c" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(221,213,194,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(221,213,194,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} width={24} />
              <Tooltip content={<CTooltip />} cursor={{ stroke: "rgba(201,168,76,0.15)" }} />
              <Area type="monotone" dataKey="appts" name="Appointments" stroke="#c9a84c" strokeWidth={2} fill="url(#goldGrad)" dot={{ fill: "#c9a84c", strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: "#e8c97a" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Live Active Patient Itinerary Queue Component */}
        <div className="card">
          <div className="sh">
            <div className="sh-title serif">Today's <span>Queue</span></div>
            <button className="lnk" onClick={() => setPage("schedule")}>Full view →</button>
          </div>
          
          {appointments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text3)", fontSize: 13 }}>
              No appointments scheduled for today.
            </div>
          ) : (
            appointments.slice(0, 5).map((s, index) => {
              const pName = s.name || s.patientName || "Patient Profile";
              const initials = pName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div key={s._id || s.id || index} className={`sched-item ${s.status === "active" ? "active-row" : ""}`}>
                  <span className="time-pill">{s.time || "Slots"}</span>
                  <div className="sched-av serif" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{initials}</div>
                  <div style={{ flex: 1 }}>
                    <div className="sched-name" style={{ color: "var(--text)" }}>{pName}</div>
                    <div className="sched-type">{s.type || s.appointmentType || "General Consultation"}</div>
                  </div>
                  <span className={`badge b-${s.status || "upcoming"}`}>{s.status || "upcoming"}</span>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Today's Schedule ────────────────────────────────────────────────────────
// function TodaySchedule({ setPage }) {
//   const done    = TODAY_SCHEDULE.filter(s => s.status === "done").length;
//   const waiting = TODAY_SCHEDULE.filter(s => s.status === "waiting").length;
//   return (
//     <div className="fade-in">
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
//         {[
//           { lbl: "Total Today",  val: TODAY_SCHEDULE.length, color: "var(--text)" },
//           { lbl: "Completed",    val: done,                  color: "var(--ok)"   },
//           { lbl: "In Queue",     val: waiting,               color: "var(--info)" },
//           { lbl: "Remaining",    val: TODAY_SCHEDULE.filter(s => s.status === "upcoming").length, color: "var(--text2)" },
//         ].map(s => (
//           <div className="card-s" key={s.lbl} style={{ textAlign: "center" }}>
//             <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 7 }}>{s.lbl}</div>
//             <div className="serif" style={{ fontSize: 34, fontWeight: 300, color: s.color }}>{s.val}</div>
//           </div>
//         ))}
//       </div>
//       <div className="card" style={{ padding: 0, overflow: "hidden" }}>
//         <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--bord)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div className="sh-title serif">Thursday <span>15 May 2025</span></div>
//           <button className="btn-gold" onClick={() => setPage("prescribe")}>+ Write Prescription</button>
//         </div>
//         {TODAY_SCHEDULE.map((s, i) => {
//           const initials = s.name.split(" ").map(w => w[0]).join("").slice(0, 2);
//           return (
//             <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderBottom: i < TODAY_SCHEDULE.length - 1 ? "1px solid var(--bord)" : "none", background: s.status === "active" ? "rgba(201,168,76,.04)" : "transparent" }}>
//               <div style={{ minWidth: 72, textAlign: "right" }}>
//                 <div style={{ fontSize: 13, color: s.status === "active" ? "var(--gold)" : "var(--text3)" }}>{s.time}</div>
//               </div>
//               <div className="sched-av serif" style={{ width: 38, height: 38, fontSize: 13 }}>{initials}</div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 3 }}>{s.name}</div>
//                 <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.type} · Age {s.age} · {s.id}</div>
//               </div>
//               <span className={`badge b-${s.status}`}>{s.status}</span>
//               <div style={{ display: "flex", gap: 8 }}>
//                 {(s.status === "active" || s.status === "waiting") && (
//                   <button className="btn-gold" style={{ fontSize: 10, padding: "6px 14px" }} onClick={() => setPage("prescribe")}>Prescribe</button>
//                 )}
//                 <button className="btn-sm">View History</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

function TodaySchedule({ setPage, onSelectPatient }) {
  // ─── 1. Core State Hooks for Dynamic Loading ───
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(true);

  const DOCTOR_NAME = "Mahade Hasan Faisal"; 
  const API_BASE = "http://localhost:5000";

  // ─── 2. Fetch Authentic Data from Database ───
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Query your database endpoint for schedules or appointments
        const response = await fetch(`${API_BASE}/api/appointments`);
        if (response.ok) {
          const result = await response.json();
          
          // Format data array wrapper safely depending on your backend schema structure
          const rawData = Array.isArray(result) 
            ? result 
            : result.data || result.appointments || [];

          // Filter dynamically for your logged-in doctor identity context
          const mySchedule = rawData.filter(
            (item) => item.assignedDoctor === DOCTOR_NAME || item.doctorName === DOCTOR_NAME
          );
          
          setScheduleList(mySchedule);
        } else {
          console.error("Failed to fetch schedule data from backend router.");
        }
      } catch (error) {
        console.error("Error communicating with schedule backend server API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // ─── 3. Dynamic Live Metric KPI Recalculations ───
  const done      = scheduleList.filter(s => s.status === "done" || s.status === "completed").length;
  const waiting   = scheduleList.filter(s => s.status === "waiting" || s.status === "queue").length;
  const remaining = scheduleList.filter(s => s.status === "upcoming" || s.status === "scheduled").length;

  // Render a clean fallback spinner wireframe card while fetching data
  if (loading) {
    return (
      <div className="card" style={{ padding: "40px 0", textAlign: "center" }}>
        <div style={{ color: "var(--text3)", fontSize: 14 }}>Retrieving live diagnostic schedule calendars...</div>
      </div>
    );
  }

  // Fallback date calculations if your database fields do not supply a unique timestamp string
  const formattedToday = new Date().toLocaleDateString("en-GB", { 
    weekday: "long", 
    day: "numeric", 
    month: "short", 
    year: "numeric" 
  });

  return (
    <div className="fade-in">
      {/* ─── Metric KPI Row Matrix ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
        {[
          { lbl: "Total Today",  val: scheduleList.length, color: "var(--text)" },
          { lbl: "Completed",    val: done,                 color: "var(--ok)"   },
          { lbl: "In Queue",     val: waiting,              color: "var(--info)" },
          { lbl: "Remaining",    val: remaining,            color: "var(--text2)" },
        ].map(s => (
          <div className="card-s" key={s.lbl} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 7 }}>{s.lbl}</div>
            <div className="serif" style={{ fontSize: 34, fontWeight: 300, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* ─── Main Schedule List Context Card ─── */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--bord)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="sh-title serif">
            {/* Dynamically reads timeline markers from your backend database if available */}
            {scheduleList[0]?.date ? new Date(scheduleList[0].date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric" }) : formattedToday}
          </div>
          <button className="btn-gold" onClick={() => setPage("prescribe")}>+ Write Prescription</button>
        </div>

        {scheduleList.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--text3)", fontSize: 14 }}>
            No clinical consultations or rounds logged on your itinerary today.
          </div>
        ) : (
          scheduleList.map((s, i) => {
            // Safe fallback logic if name properties are missing from the backend schema object
            const patientName = s.name || s.patientName || "Unknown Patient";
            const initials = patientName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
            const patientId = s.patientId || s.id || s._id;

            return (
              <div key={s._id || s.id || i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderBottom: i < scheduleList.length - 1 ? "1px solid var(--bord)" : "none", background: s.status === "active" ? "rgba(201,168,76,.04)" : "transparent" }}>
                
                {/* 1. Timeline Timestamp */}
                <div style={{ minWidth: 72, textAlign: "right" }}>
                  <div style={{ fontSize: 13, color: s.status === "active" ? "var(--gold)" : "var(--text3)" }}>
                    {s.time || "Slots"}
                  </div>
                </div>

                {/* 2. Initials Avatar Shield Component */}
                <div className="sched-av serif" style={{ width: 38, height: 38, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {initials}
                </div>

                {/* 3. Patient Metadata Indexing Block */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 3 }}>
                    {patientName}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>
                    {s.type || s.appointmentType || "Consultation"} · Age {s.age || "N/A"} · ID: {patientId}
                  </div>
                </div>

                {/* 4. Status Indicator Tag */}
                <span className={`badge b-${s.status || "upcoming"}`}>{s.status || "upcoming"}</span>

                {/* 5. Interactive Action Event Buttons */}
                <div style={{ display: "flex", gap: 8 }}>
                  {(s.status === "active" || s.status === "waiting") && (
                    <button 
                      className="btn-gold" 
                      style={{ fontSize: 10, padding: "6px 14px" }} 
                      onClick={() => {
                        if (onSelectPatient) onSelectPatient(patientId);
                        setPage("prescribe");
                      }}
                    >
                      Prescribe
                    </button>
                  )}
                  <button 
                    className="btn-sm"
                    onClick={() => {
                      if (onSelectPatient) onSelectPatient(patientId);
                      // This safely targets the records modal framework we connected to your layout shell earlier
                      setPage("patients"); 
                    }}
                  >
                    View History
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}



import React, { useState, useEffect } from "react";




// function PatientRecordsModalView({ patient, onClose }) {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_BASE = "http://localhost:5000";

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const pid = patient.patientId || patient._id;
//       try {
//         const res = await fetch(`${API_BASE}/api/prescriptions?patientId=${pid}`);
//         const json = await res.json();
//         if (json.success) setHistory(json.data || []);
//       } catch (err) {
//         console.error("Error reading history logs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (patient) fetchHistory();
//   }, [patient]);

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--bord)", paddingBottom: 16, marginBottom: 20 }}>
//         <div>
//           <span style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--gold)" }}>Clinical History File</span>
//           <h2 className="serif" style={{ fontSize: 26, fontWeight: 300, color: "var(--text)", marginTop: 2 }}>{patient.name}</h2>
//           <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>
//             <span>Age: {patient.age}</span> · <span>ID: {patient.patientId || patient._id}</span> · <span style={{ color: "var(--info)" }}>{patient.condition}</span>
//           </div>
//         </div>
//         <button className="btn-out" style={{ padding: "6px 12px", fontSize: 11 }} onClick={onClose}>✕ Close</button>
//       </div>

//       {loading ? (
//         <div style={{ padding: "30px 0", color: "var(--text3)", textAlign: "center", fontSize: 13 }}>Retrieving historical clinical charts...</div>
//       ) : history.length === 0 ? (
//         <div style={{ padding: "40px 0", textAlign: "center" }}>
//           <div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
//           <div style={{ fontSize: 13, color: "var(--text3)" }}>No prescription records indexed for this case context profile.</div>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           {history.map((rec) => (
//             <div key={rec._id} style={{ background: "var(--navy3)", border: "1px solid var(--bord)", borderRadius: "var(--r)", padding: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//                 <span style={{ fontSize: 13, fontWeight: 500, color: "var(--gold)" }}>Diagnosis: {rec.diagnosis}</span>
//                 <span style={{ fontSize: 11, color: "var(--text3)" }}>{new Date(rec.createdAt).toLocaleDateString("en-GB")}</span>
//               </div>
//               <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5, background: "rgba(0,0,0,0.15)", padding: 10, borderRadius: 4 }}>
//                 <strong>Therapy / Prescribed Instructions:</strong>
//                 <p style={{ marginTop: 4, fontStyle: "italic", color: "var(--text)" }}>{rec.therapyInstructions || "None provided"}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


function PatientRecordsModalView({ patient, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const targetId = patient.patientId || patient._id;
        // Query target database matching specific route parameter specs
        const res = await fetch(`${API_BASE}/api/prescriptions?patientId=${targetId}`);
        const json = await res.json();
        
        // Handle variations in array data responses across different backends
        if (Array.isArray(json)) {
          setHistory(json);
        } else if (json.success && Array.isArray(json.data)) {
          setHistory(json.data);
        } else if (json.prescriptions && Array.isArray(json.prescriptions)) {
          setHistory(json.prescriptions);
        }
      } catch (err) {
        console.error("Error connecting with prescription api logs:", err);
      } finally {
        setLoading(false);
      }
    };
    if (patient) fetchHistory();
  }, [patient]);

  return (
    <div>
      {/* Header Profile Info View block */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--bord)", paddingBottom: 16, marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold)" }}>Comprehensive Medical Case Dossier</span>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 300, color: "var(--text)", marginTop: 2 }}>{patient.name}</h2>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>
            <span>Age: {patient.age || "N/A"}</span> · <span>Reference ID: {patient.patientId || patient._id}</span> · <span style={{ color: "var(--info)" }}>{patient.condition}</span>
          </div>
        </div>
        <button className="btn-out" style={{ padding: "6px 14px", fontSize: 11 }} onClick={onClose}>✕ Close Window</button>
      </div>

      {/* Main Historical List View Port */}
      {loading ? (
        <div style={{ padding: "40px 0", color: "var(--text3)", textAlign: "center", fontSize: 13 }}>Syncing files from /api/prescriptions...</div>
      ) : history.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>No structured data logs matched this patient reference ID inside /api/prescriptions.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>Showing {history.length} indexed historical records:</div>
          
          {history.map((rec, index) => (
            <div key={rec._id || index} className="record-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed rgba(255,255,255,0.08)", paddingBottom: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--gold)" }}>
                  ⚕️ Diagnosis: {rec.diagnosis || "Not Stated"}
                </span>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>
                  📅 {rec.createdAt ? new Date(rec.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Historical"}
                </span>
              </div>

              {/* Dynamic Information Display Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12, lineHeight: 1.5 }}>
                
                {/* 1. Therapy Instructions Block */}
                <div>
                  <strong style={{ color: "var(--text2)" }}>Clinical Instructions & Advice:</strong>
                  <p style={{ margin: "4px 0 0 0", color: "var(--text)", fontStyle: "italic" }}>
                    {rec.therapyInstructions || rec.instructions || "No custom therapy annotations recorded for this session."}
                  </p>
                </div>

                {/* 2. Embedded Pharmacological Treatments Object Map Array */}
                {(rec.medicines && rec.medicines.length > 0) || (rec.medications && rec.medications.length > 0) ? (
                  <div style={{ marginTop: 6 }}>
                    <strong style={{ color: "var(--text2)", display: "block", marginBottom: 4 }}>Prescribed Pharmacotherapy:</strong>
                    {/* Render from whatever array array structure keys your backend outputs */}
                    {(rec.medicines || rec.medications || []).map((med, mIdx) => (
                      <span key={mIdx} className="med-pill">
                        💊 {typeof med === 'string' ? med : `${med.name || med.medicineName || "Medicine"} (${med.dosage || med.frequency || "As Directed"})`}
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* 3. Session Diagnostics Metadata Footer */}
                <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text3)", marginTop: 8, background: "rgba(0,0,0,0.1)", padding: "6px 10px", borderRadius: 4 }}>
                  <div>Recorded By: <span style={{ color: "var(--text2)" }}>{rec.doctorName || rec.assignedDoctor || "Attending Physician"}</span></div>
                  {rec.sessionNumber && <div>Session Count: <span style={{ color: "var(--text2)" }}>#{rec.sessionNumber}</span></div>}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MyPatients({ onNavigate, onSelectPatient, onOpenModalWithData }) {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); 

  const DOCTOR_NAME = "Mahade Hasan Faisal"; 
  const API_BASE = "http://localhost:5000";

  // 1. FETCH LIVE PATIENTS FROM BACKEND
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE}/users/patients`);
        if (response.ok) {
          const result = await response.json();
          
          // Filter dynamically on the frontend for this specific doctor
          const myAssignedPatients = (result.patients || []).filter(
            (p) => p.assignedDoctor === DOCTOR_NAME
          );
          setPatients(myAssignedPatients);
        } else {
          console.error("Failed to fetch patient roster.");
        }
      } catch (error) {
        console.error("Error communicating with backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // 2. LIVE DATABASE UPDATE FOR PROGRESS BAR
  const handleProgressChange = async (id, newProgress) => {
    const clampedProgress = Math.min(100, Math.max(0, Number(newProgress) || 0));
    setUpdatingId(id);

    setPatients(prev =>
      prev.map(p => (p._id === id ? { ...p, progress: clampedProgress } : p))
    );

    try {
      const response = await fetch(`${API_BASE}/users/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: clampedProgress }),
      });

      if (!response.ok) {
        throw new Error("Update rejected by server");
      }
    } catch (error) {
      console.error("Failed to sync progress to database:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // 3. FILTER BY SEARCH KEYWORD
  const filtered = patients.filter(p => {
    const patientName = p.name || "";
    const patientCondition = p.condition || "";
    return (
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      patientCondition.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="card" style={{ padding: "40px 0", textAlign: "center" }}>
        <div className="sans" style={{ color: "var(--text3)", fontSize: 14 }}>Loading your patient panel...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Search Bar & Micro KPI Badges */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input 
          placeholder="Search your patients…" 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          style={{ background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: "var(--r)", padding: "9px 14px", fontSize: 13, color: "var(--text)", width: 240 }}
        />
        <div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text3)", marginLeft: "auto" }}>
          <span style={{ padding: "6px 12px", background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: 20 }}>
            {patients.filter(p => p.status === "active").length} Active
          </span>
          <span style={{ padding: "6px 12px", background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: 20 }}>
            {patients.filter(p => p.status === "new").length} New
          </span>
          <span style={{ padding: "6px 12px", background: "rgba(232,85,85,.1)", border: "1px solid rgba(232,85,85,.2)", borderRadius: 20, color: "var(--danger)" }}>
            {patients.filter(p => p.status === "critical").length} Critical
          </span>
        </div>
      </div>

      {/* Main Roster Table Grid */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="ptbl">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Condition</th>
              <th>Sessions</th>
              <th style={{ width: "180px" }}>Progress Controller</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const currentProgress = p.progress || 0;
              const uniqueId = p._id; 
              
              return (
                <tr key={uniqueId}>
                  <td>
                    <div className="pt-name">{p.name || "Unnamed Patient"}</div>
                    <div className="pt-id">{p.patientId || "No Alt Ref ID"} · Age {p.age || "N/A"}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.4 }}>{p.condition || "General Checkup"}</div>
                  </td>
                  <td>
                    <div className="serif" style={{ fontSize: 22, fontWeight: 300, color: "var(--gold)" }}>{p.sessions || 0}</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <input 
                        type="number" 
                        value={currentProgress} 
                        min="0" max="100"
                        disabled={updatingId === uniqueId}
                        onChange={(e) => handleProgressChange(uniqueId, e.target.value)}
                        style={{ width: "45px", background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 11, textAlign: "center", borderRadius: 4, padding: "2px" }}
                      />
                      <span style={{ fontSize: 11, color: "var(--text3)" }}>
                        {updatingId === uniqueId ? "⏳ saving..." : "%"}
                      </span>
                    </div>
                    <div className="mini-bar-wrap">
                      <div className="mini-bar" style={{ width: `${currentProgress}%`, transition: "width 0.3s ease-in-out" }} />
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text3)" }}>
                    {p.lastVisit || (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "---")}
                  </td>
                  <td>
                    <span className={`badge b-${p.status || "active"}`}>{p.status || "active"}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 7 }}>
                      {/* Open the modal with full dataset info */}
                      <button 
                        className="btn-sm" 
                        onClick={() => {
                          if (onSelectPatient) onSelectPatient(p.patientId || p._id);
                          if (onOpenModalWithData) onOpenModalWithData(p);
                        }}
                      >
                        Records
                      </button>

                      <button 
                        className="btn-sm"
                        onClick={() => {
                          if (onSelectPatient) onSelectPatient(p.patientId || p._id);
                          if (onNavigate) onNavigate("prescribe");
                        }}
                      >
                        Prescribe
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)", fontSize: 14 }}>
            No assigned clinical profiles found matching criteria.
          </div>
        )}
      </div>
    </div>
  );
}


function Appointments() {
  const [filter, setFilter] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const DOCTOR_NAME = "Mahade Hasan Faisal";

  // 1. FETCH LIVE APPOINTMENTS FROM BACKEND MONGO COLLECTION
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments");
        if (response.ok) {
          const result = await response.json();
          
          // Filter dynamically on the frontend to match Dr. Mahade's name
          const myAppointments = (result.data || []).filter(
            (appt) => appt.doctorName === DOCTOR_NAME
          );
          setAppointments(myAppointments);
        } else {
          console.error("Failed to retrieve appointment logs.");
        }
      } catch (error) {
        console.error("Network error communicating with appointments DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 2. FILTER BY STATUS TAB BUTTONS
  // Note: Standardizes 'pending', 'confirmed', or 'rejected' values from your backend schema
  const list = filter === "all" 
    ? appointments 
    : appointments.filter(a => (a.status || "pending") === filter);

  // Status mapping matching your backend schema rules ('pending', 'confirmed', 'rejected')
  const statuses = ["all", "pending", "confirmed", "rejected"];

  if (loading) {
    return (
      <div className="card" style={{ padding: "40px 0", textAlign: "center" }}>
        <div className="sans" style={{ color: "var(--text3)", fontSize: 14 }}>Loading scheduling book...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Status Filter Buttons Row */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {statuses.map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            style={{ 
              padding: "7px 16px", border: "1px solid", borderRadius: "var(--r)", 
              fontSize: 11, letterSpacing: ".08em", textTransform: "capitalize", 
              borderColor: filter === f ? "var(--gold)" : "var(--bord)", 
              background: filter === f ? "var(--gdim)" : "transparent", 
              color: filter === f ? "var(--gold)" : "var(--text3)", 
              transition: "all .2s" 
            }}
          >
            {f === "all" ? `All (${appointments.length})` : f}
          </button>
        ))}
      </div>

      {/* Main Appointments Feed Card */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {list.map((a, i) => {
          // Fallback parsing for initials generation safely handling empty slots
          const patientName = a.patientName || "Unknown Patient";
          const initials = patientName
            .split(" ")
            .map(w => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          const currentStatus = a.status || "pending";
          const recordId = a._id || a.appointmentId;

          return (
            <div 
              key={recordId} 
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 22px", borderBottom: i < list.length - 1 ? "1px solid var(--bord)" : "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,.025)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Initials Avatar Box */}
              <div className="sched-av serif" style={{ width: 36, height: 36, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--navy2)", color: "var(--gold)" }}>
                {initials}
              </div>

              {/* Patient and Slot Summary Info Block */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>
                  {patientName}
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>
                  {a.type || "Consultation"} · {a.date} at {a.timeSlot || a.time || "N/A"} · Ref: {a.appointmentId || "N/A"}
                </div>
                {a.notes && (
                  <div style={{ fontSize: 11, color: "var(--text2)", fontStyle: "italic", marginTop: 2 }}>
                    "{a.notes}"
                  </div>
                )}
              </div>

              {/* Status Indicator Pill Token */}
              <span className={`badge b-${currentStatus.replace(" ", "-")}`}>
                {currentStatus}
              </span>
              
              <button className="btn-sm">Notes</button>
            </div>
          );
        })}

        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text3)", fontSize: 14 }}>
            No scheduled slots found for this filter tier.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Write Prescription ──────────────────────────────────────────────────────
// function WritePrescription() {
//   const [patient, setPatient] = useState("");
//   const [appt,    setAppt]    = useState("");
//   const [diag,    setDiag]    = useState("");
//   const [therapy, setTherapy] = useState("");
//   const [followUp,setFollowUp]= useState("");
//   const [meds,    setMeds]    = useState([{ name: "", dose: "", freq: "", duration: "" }]);
//   const [saved,   setSaved]   = useState(false);

//   const addMed    = () => setMeds(m => [...m, { name: "", dose: "", freq: "", duration: "" }]);
//   const delMed    = i  => setMeds(m => m.filter((_, j) => j !== i));
//   const updateMed = (i, field, val) => setMeds(m => m.map((med, j) => j === i ? { ...med, [field]: val } : med));

//   if (saved) return (
//     <div className="fade-in" style={{ maxWidth: 480, margin: "0 auto", paddingTop: 40 }}>
//       <div className="success-box">
//         <div style={{ fontSize: 38, marginBottom: 14 }}>✦</div>
//         <div className="serif" style={{ fontSize: 26, color: "var(--ok)", marginBottom: 8 }}>Prescription Saved</div>
//         <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 22 }}>Prescription for <strong style={{ color: "var(--text)" }}>{patient}</strong> has been saved.</div>
//         <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
//           <button className="btn-out" onClick={() => { setSaved(false); setPatient(""); setDiag(""); setMeds([{ name:"",dose:"",freq:"",duration:"" }]); }}>New Prescription</button>
//           <button className="btn-sm" style={{ padding: "9px 18px" }}>↓ Download PDF</button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="fade-in" style={{ maxWidth: 760 }}>
//       <div className="card" style={{ marginBottom: 16 }}>
//         <div className="dvd" style={{ marginTop: 0 }}>Patient & Appointment</div>
//         <div className="fg2">
//           <div className="field"><label>Patient</label>
//             <select value={patient} onChange={e => setPatient(e.target.value)}>
//               <option value="">Select patient…</option>
//               {PATIENTS.map(p => <option key={p.id} value={p.name}>{p.name} — {p.id}</option>)}
//             </select>
//           </div>
//           <div className="field"><label>Linked Appointment</label>
//             <select value={appt} onChange={e => setAppt(e.target.value)}>
//               <option value="">Select appointment…</option>
//               {TODAY_SCHEDULE.map(s => <option key={s.id} value={s.id}>{s.id} — {s.name} · {s.time}</option>)}
//             </select>
//           </div>
//         </div>
//         <div className="field"><label>Chief Complaint / Diagnosis</label>
//           <textarea rows={2} placeholder="Primary clinical finding…" value={diag} onChange={e => setDiag(e.target.value)} style={{ resize: "vertical" }} />
//         </div>
//       </div>
//       <div className="card" style={{ marginBottom: 16 }}>
//         <div className="dvd" style={{ marginTop: 0 }}>Prescribed Medicines</div>
//         {meds.map((med, i) => (
//           <div className="fg4" key={i} style={{ alignItems: "flex-end", marginBottom: 10 }}>
//             <div className="field">{i === 0 && <label>Medicine Name</label>}<input placeholder="e.g. Aspirin" value={med.name} onChange={e => updateMed(i,"name",e.target.value)} /></div>
//             <div className="field">{i === 0 && <label>Dose</label>}<input placeholder="e.g. 75mg" value={med.dose} onChange={e => updateMed(i,"dose",e.target.value)} /></div>
//             <div className="field">{i === 0 && <label>Frequency</label>}
//               <select value={med.freq} onChange={e => updateMed(i,"freq",e.target.value)}>
//                 <option value="">Frequency…</option>
//                 <option>Once daily</option><option>Twice daily</option><option>Three times daily</option><option>Once at night</option><option>Every 8 hours</option><option>As needed</option>
//               </select>
//             </div>
//             <div className="field">{i === 0 && <label>Duration</label>}<input placeholder="e.g. 4 weeks" value={med.duration} onChange={e => updateMed(i,"duration",e.target.value)} /></div>
//             <button className="del-btn" onClick={() => delMed(i)} style={{ marginBottom: 1 }}>×</button>
//           </div>
//         ))}
//         <button className="btn-out" style={{ fontSize: 11, marginTop: 4 }} onClick={addMed}>+ Add Medicine</button>
//       </div>
//       <div className="card" style={{ marginBottom: 20 }}>
//         <div className="dvd" style={{ marginTop: 0 }}>Therapy & Follow-up</div>
//         <div className="field" style={{ marginBottom: 14 }}>
//           <label>Therapy Instructions</label>
//           <textarea rows={3} placeholder="Exercise regimen, physiotherapy notes, dietary advice…" value={therapy} onChange={e => setTherapy(e.target.value)} style={{ resize: "vertical" }} />
//         </div>
//         <div className="fg2">
//           <div className="field"><label>Follow-up Date</label><input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)} /></div>
//           <div className="field"><label>Session Notes (internal)</label><input placeholder="Internal note (not visible to patient)" /></div>
//         </div>
//       </div>
//       <div style={{ display: "flex", gap: 12 }}>
//         <button className="btn-gold" disabled={!patient || !diag} style={{ opacity: !patient || !diag ? 0.5 : 1 }} onClick={() => setSaved(true)}>Save Prescription ✦</button>
//         <button className="btn-sm" style={{ padding: "10px 20px" }}>Save as Draft</button>
//       </div>
//     </div>
//   );
// }



function WritePrescription() {
  const [patientsList, setPatientsList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Core Form Binding Hooks
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [appt, setAppt] = useState("");
  const [diag, setDiag] = useState("");
  const [therapy, setTherapy] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [meds, setMeds] = useState([{ name: "", dose: "", freq: "", duration: "" }]);
  const [internalNotes, setInternalNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const DOCTOR_NAME = "Mahade Hasan Faisal";
  const API_BASE = "http://localhost:5000"; 

  useEffect(() => {
    const fetchCoreSystemData = async () => {
      try {
        const patientRes = await fetch(`${API_BASE}/users/patients`);
        const patientData = await patientRes.json();
        
        // Match string exactly to isolate assigned files
        const filtered = (patientData.patients || []).filter(
          p => p.assignedDoctor === DOCTOR_NAME
        );
        setPatientsList(filtered);

        const apptRes = await fetch(`${API_BASE}/api/appointments`);
        const apptData = await apptRes.json();
        setAppointmentsList(apptData.data || []);
      } catch (err) {
        console.error("Data tracking layer load exception:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoreSystemData();
  }, []);

  const handlePatientSelectionChange = (e) => {
    const pId = e.target.value;
    setSelectedPatientId(pId);
    setAppt("");
    setDiag("");

    if (!pId) return;

    const matchedPatient = patientsList.find(p => p.patientId === pId || p._id === pId);
    if (matchedPatient) {
      // Pull condition directly from profile metadata 
      setDiag(matchedPatient.condition || "");
    }
  };

  // Only render slots mapped to selected file that have been explicitly confirmed
 const activePatientAppointments = appointmentsList.filter(
  a => a.patientId === selectedPatientId
);

  const addMed = () => setMeds(m => [...m, { name: "", dose: "", freq: "", duration: "" }]);
  const delMed = i => setMeds(m => m.filter((_, j) => j !== i));
  const updateMed = (i, field, val) => setMeds(m => m.map((med, j) => j === i ? { ...med, [field]: val } : med));

  const handleSavePrescription = async () => {
    const targetPatient = patientsList.find(p => p.patientId === selectedPatientId || p._id === selectedPatientId);
    if (!targetPatient) return alert("Validation Error: Please select an active patient account.");

    const payload = {
      patientName: targetPatient.name,
      patientEmail: targetPatient.email || "no-email@medicare.com",
      patientId: targetPatient.patientId || targetPatient._id,
      linkedAppointmentId: appt,
      diagnosis: diag,
      medications: meds,
      therapyInstructions: therapy,
      followUpDate: followUp,
      internalNotes: internalNotes,
      prescribedBy: DOCTOR_NAME
    };

    try {
      const response = await fetch(`${API_BASE}/api/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setSaved(true);
      } else {
        alert("Server returned submission failure structural error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network timeout tracking interface record pipe generation error.");
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--text3)" }}>Connecting to Clinical Database Node...</div>;

  if (saved) {
    const currentPatient = patientsList.find(p => p.patientId === selectedPatientId || p._id === selectedPatientId);
    return (
      <div className="fade-in" style={{ maxWidth: 480, margin: "0 auto", paddingTop: 40 }}>
        <div className="success-box">
          <div style={{ fontSize: 38, marginBottom: 14 }}>✦</div>
          <div className="serif" style={{ fontSize: 26, color: "var(--ok)", marginBottom: 8 }}>Prescription Processed</div>
          <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 22 }}>
            Data for <strong style={{ color: "var(--text)" }}>{currentPatient?.name}</strong> ({currentPatient?.email}) has been permanently saved inside the cloud record store.
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="btn-out" onClick={() => { setSaved(false); setSelectedPatientId(""); setAppt(""); setDiag(""); setTherapy(""); setFollowUp(""); setInternalNotes(""); setMeds([{ name: "", dose: "", freq: "", duration: "" }]); }}>New Prescription</button>
            <button className="btn-sm" style={{ padding: "9px 18px" }}>↓ Download PDF</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: 760 }}>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Patient & Timetable Alignment</div>
        <div className="fg2">
          <div className="field"><label>Patient (Filtered for Dr. Mahade Hasan Faisal)</label>
            <select value={selectedPatientId} onChange={handlePatientSelectionChange}>
              <option value="">Select case file…</option>
              {patientsList.map(p => (
                <option key={p._id} value={p.patientId || p._id}>{p.name} — ID: {p.patientId || "N/A"}</option>
              ))}
            </select>
          </div>
          <div className="field"><label>Linked Appointment Booking Time</label>
            <select value={appt} onChange={e => setAppt(e.target.value)} disabled={!selectedPatientId}>
              <option value="">Select slot timing…</option>
              {activePatientAppointments.map(s => (
                <option key={s.appointmentId} value={s.appointmentId}>{s.date} · {s.timeSlot} ({s.type})</option>
              ))}
            </select>
          </div>
        </div>
        <div className="field"><label>Chief Complaint / Diagnosis (Synced Medical Condition)</label>
          <textarea rows={2} placeholder="Primary clinical finding…" value={diag} onChange={e => setDiag(e.target.value)} style={{ resize: "vertical" }} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Prescribed Medicines</div>
        {meds.map((med, i) => (
          <div className="fg4" key={i} style={{ alignItems: "flex-end", marginBottom: 10 }}>
            <div className="field">{i === 0 && <label>Medicine Name</label>}<input placeholder="e.g. Aspirin" value={med.name} onChange={e => updateMed(i, "name", e.target.value)} /></div>
            <div className="field">{i === 0 && <label>Dose</label>}<input placeholder="e.g. 75mg" value={med.dose} onChange={e => updateMed(i, "dose", e.target.value)} /></div>
            <div className="field">{i === 0 && <label>Frequency</label>}
              <select value={med.freq} onChange={e => updateMed(i, "freq", e.target.value)}>
                <option value="">Frequency…</option>
                <option>Once daily</option><option>Twice daily</option><option>Three times daily</option><option>Once at night</option><option>Every 8 hours</option><option>As needed</option>
              </select>
            </div>
            <div className="field">{i === 0 && <label>Duration</label>}<input placeholder="e.g. 4 weeks" value={med.duration} onChange={e => updateMed(i, "duration", e.target.value)} /></div>
            <button className="del-btn" onClick={() => delMed(i)} style={{ marginBottom: 1 }}>×</button>
          </div>
        ))}
        <button className="btn-out" style={{ fontSize: 11, marginTop: 4 }} onClick={addMed}>+ Add Medicine</button>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="dvd" style={{ marginTop: 0 }}>Therapy & Follow-up</div>
        <div className="field" style={{ marginBottom: 14 }}>
          <label>Therapy Instructions</label>
          <textarea rows={3} placeholder="Dietary restrictions or rehabilitation instructions..." value={therapy} onChange={e => setTherapy(e.target.value)} style={{ resize: "vertical" }} />
        </div>
        <div className="fg2">
          <div className="field"><label>Follow-up Date</label><input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)} /></div>
          <div className="field"><label>Session Notes (internal)</label><input placeholder="Internal charting notation references..." value={internalNotes} onChange={e => setInternalNotes(e.target.value)} /></div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-gold" disabled={!selectedPatientId || !diag} style={{ opacity: !selectedPatientId || !diag ? 0.5 : 1 }} onClick={handleSavePrescription}>Save Prescription ✦</button>
        <button className="btn-sm" style={{ padding: "10px 20px" }}>Save as Draft</button>
      </div>
    </div>
  );
}



// ─── Profile ─────────────────────────────────────────────────────────────────
function Profile() {
  const [editing, setEditing] = useState(false);
  return (
    <div className="fade-in">
      <div className="prof-hd">
        <div className="prof-av serif">{DOCTOR.avatar}</div>
        <div style={{ flex: 1 }}>
          <div className="prof-name serif">{DOCTOR.name}</div>
          <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: ".06em", marginBottom: 3 }}>{DOCTOR.spec}</div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>License: {DOCTOR.license} · {DOCTOR.exp} experience · {DOCTOR.id}</div>
        </div>
        <button className="btn-out" onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit Profile"}</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card">
          <div className="sh-title serif" style={{ marginBottom: 16 }}>Personal <span>Details</span></div>
          {editing ? (
            <>
              <div className="fg2"><div className="field"><label>Full Name</label><input defaultValue={DOCTOR.name} /></div><div className="field"><label>Phone</label><input defaultValue={DOCTOR.phone} /></div></div>
              <div className="fg2" style={{ marginBottom: 14 }}><div className="field"><label>Email</label><input defaultValue={DOCTOR.email} /></div><div className="field"><label>Specialisation</label><input defaultValue={DOCTOR.spec} /></div></div>
              <button className="btn-gold" onClick={() => setEditing(false)}>Save Changes</button>
            </>
          ) : (
            <div className="info-grid">
              {[["Full Name", DOCTOR.name],["Specialisation", DOCTOR.spec],["License No", DOCTOR.license],["Experience", DOCTOR.exp],["Phone", DOCTOR.phone],["Email", DOCTOR.email]].map(([k,v]) => (
                <div className="ii" key={k} style={k==="Email"?{gridColumn:"span 2"}:{}}><label>{k}</label><span>{v}</span></div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div className="sh-title serif" style={{ marginBottom: 16 }}>This Month's <span>Summary</span></div>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={MONTHLY_PATIENTS.slice(-4)} barGap={4} barCategoryGap="30%">
                <CartesianGrid vertical={false} stroke="rgba(201,168,76,0.06)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(221,213,194,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(221,213,194,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} width={22} />
                <Tooltip content={<CTooltip />} cursor={{ fill: "rgba(201,168,76,0.04)" }} />
                <Bar dataKey="patients" name="Patients" fill="#c9a84c" radius={[3,3,0,0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="sh-title serif" style={{ marginBottom: 14 }}>Account <span>Security</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <button className="btn-out" style={{ textAlign: "left" }}>🔒 Change Password</button>
              <button className="btn-out" style={{ textAlign: "left" }}>📱 Update Contact</button>
              <button className="btn-out" style={{ textAlign: "left" }}>🗓 Manage Availability</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
// export default function DoctorDashboard({ onLogout }) {
//   const [page, setPage] = useState("dashboard");
//   // ─── Added State: Keeps track of which patient is actively selected across components ───
//   const [selectedPatientId, setSelectedPatientId] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [t0, t1] = PAGE_TITLES[page] || ["Doctor", "Dashboard"];
//   const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

//   return (
//     <div className="shell">
//       <style>{STYLES}</style>

//       {/* ── L-shaped Medicine Panel ── */}
//       <LMedicinePanel />

//       {/* Sidebar (positioned after L-left strip) */}
//       <aside className="sidebar">
//         <div className="sb-logo">
//           <div className="sb-logo-txt serif"><span style={{ color: "var(--gold)" }}>UP</span>PC</div>
//           <div className="sb-logo-sub">Doctor Portal</div>
//         </div>
//         <div className="sb-doc">
//           <div className="sb-av serif">{DOCTOR.avatar}</div>
//           <div>
//             <div className="sb-name">{DOCTOR.name}</div>
//             <div className="sb-spec">{DOCTOR.spec}</div>
//           </div>
//         </div>
//         <nav className="sb-nav">
//           {NAV.map(item => (
//             <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
//               <span className="nav-icon">{item.icon}</span>
//               {item.label}
//             </div>
//           ))}
//         </nav>
//         <div className="sb-foot">
//           <div className="sb-status"><div className="online-dot" /><span>On Duty · Ward B</span></div>
//           {onLogout && (
//             <button className="logout" onClick={onLogout}>⇤ Sign Out</button>
//           )}
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="main">
//         <div className="topbar">
//           <h1 className="pg-title serif">{t0} <span>{t1}</span></h1>
//           <div className="tb-right">
//             <span className="date-chip">{today}</span>
//             <div style={{ position: "relative" }}>
//               <button className="icon-btn">🔔</button>
//               <div className="ndot" />
//             </div>
//             <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--gdim)", border: "1px solid var(--gbord)", display: "flex", alignItems: "center", justifycontent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "var(--gold)" }}>
//               {DOCTOR.avatar}
//             </div>
//           </div>
//         </div>
        
//         <div className="content">
//           {/* ─── Page View Dispatcher with Handlers Attached ─── */}
//           {page === "dashboard"    && <Dashboard setPage={setPage} />}
//           {page === "schedule"     && <TodaySchedule setPage={setPage} />}
          
//           {page === "patients"     && (
//             <MyPatients
//               setPage={setPage}
//               onViewRecords={(id) => {
//                 setSelectedPatientId(id);
//                 setIsModalOpen(true);
//               }}
//               onSelectPatientForPrescription={(id) => {
//                 setSelectedPatientId(id);
//                 setPage("prescribe");
//               }}
//             />
//           )}
          
//           {page === "appointments" && <Appointments />}
          
//           {page === "prescribe"    && (
//             <WritePrescription
//               preSelectedId={selectedPatientId}
//               clearSelectedId={() => setSelectedPatientId("")}
//             />
//           )}
          
//           {page === "profile"      && <Profile />}
//         </div>
//       </main>

//       {/* ─── Global Overlap Modal Component Box ─── */}
//       {isModalOpen && (
//         <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
//           <div className="modal-window" onClick={(e) => e.stopPropagation()}>
//             <PatientRecordsView
//               patientId={selectedPatientId}
//               onBack={() => setIsModalOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



export default function DoctorDashboard({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [selectedPatientId, setSelectedPatientId] = useState("");
  
  // Modal controllers
  const [activeModalPatient, setActiveModalPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [t0, t1] = PAGE_TITLES[page] || ["Doctor", "Dashboard"];
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="shell">
      <style>{STYLES}</style>

      {/* ── L-shaped Medicine Panel ── */}
      <LMedicinePanel />

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sb-logo">
          <div className="sb-logo-txt serif"><span style={{ color: "var(--gold)" }}>UP</span>PC</div>
          <div className="sb-logo-sub">Doctor Portal</div>
        </div>
        <div className="sb-doc">
          <div className="sb-av serif">{DOCTOR.avatar}</div>
          <div>
            <div className="sb-name">{DOCTOR.name}</div>
            <div className="sb-spec">{DOCTOR.spec}</div>
          </div>
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
          <div className="sb-status"><div className="online-dot" /><span>On Duty · Ward B</span></div>
          {onLogout && (
            <button className="logout" onClick={onLogout}>⇤ Sign Out</button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="topbar">
          <h1 className="pg-title serif">{t0} <span>{t1}</span></h1>
          <div className="tb-right">
            <span className="date-chip">{today}</span>
            <div style={{ position: "relative" }}>
              <button className="icon-btn">🔔</button>
              <div className="ndot" />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--gdim)", border: "1px solid var(--gbord)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "var(--gold)" }}>
              {DOCTOR.avatar}
            </div>
          </div>
        </div>
        
        <div className="content">
          {page === "dashboard"    && <Dashboard setPage={setPage} />}
          {page === "schedule"     && <TodaySchedule setPage={setPage} />}
          
          {page === "patients"     && (
            <MyPatients 
              onNavigate={(targetPage) => setPage(targetPage)}
              onSelectPatient={(id) => setSelectedPatientId(id)}
              onOpenModalWithData={(patientObj) => {
                setActiveModalPatient(patientObj);
                setIsModalOpen(true);
              }}
            />
          )}
          
          {page === "appointments" && <Appointments />}
          
          {page === "prescribe"    && (
            <WritePrescription 
              preSelectedId={selectedPatientId} 
              clearSelectedId={() => setSelectedPatientId("")}
            />
          )}
          
          {page === "profile"      && <Profile />}
        </div>
      </main>

      {/* ─── Global Overlap Modal Component Box ─── */}
      {isModalOpen && activeModalPatient && (
        <div className="modal-overlay" onClick={() => { setIsModalOpen(false); setActiveModalPatient(null); }}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <PatientRecordsModalView 
              patient={activeModalPatient} 
              onClose={() => { setIsModalOpen(false); setActiveModalPatient(null); }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}