import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ADMIN = { name: "Dr. Fahmida Islam", role: "Administrator", avatar: "FI" };

const STAFF = [
  { id: "STF-001", name: "Dr. Amina Khanam", role: "Neurologist", dept: "Neurology", status: "active", joined: "Jan 2022", patients: 38, salary: 95000, shift: "Morning", phone: "+880 1711-001122" },
  { id: "STF-002", name: "Dr. Rafiq Hossain", role: "Physiotherapist", dept: "Physiotherapy", status: "active", joined: "Mar 2021", patients: 52, salary: 72000, shift: "Morning", phone: "+880 1711-002233" },
  { id: "STF-003", name: "Dr. Nusrat Jahan", role: "Physiotherapist", dept: "Physiotherapy", status: "active", joined: "Aug 2023", patients: 29, salary: 68000, shift: "Evening", phone: "+880 1711-003344" },
  { id: "STF-004", name: "Tariq Mahmud", role: "Occupational Therapist", dept: "OT", status: "active", joined: "Jun 2022", patients: 21, salary: 60000, shift: "Morning", phone: "+880 1711-004455" },
  { id: "STF-005", name: "Sadia Rahman", role: "Receptionist", dept: "Admin", status: "active", joined: "Nov 2023", patients: 0, salary: 28000, shift: "Morning", phone: "+880 1711-005566" },
  { id: "STF-006", name: "Milon Chandra", role: "Nurse", dept: "Neurology", status: "on-leave", joined: "Feb 2020", patients: 0, salary: 35000, shift: "Night", phone: "+880 1711-006677" },
  { id: "STF-007", name: "Ariful Islam", role: "Lab Technician", dept: "Diagnostics", status: "active", joined: "May 2023", patients: 0, salary: 40000, shift: "Morning", phone: "+880 1711-007788" },
  { id: "STF-008", name: "Kohinoor Begum", role: "Physiotherapist", dept: "Physiotherapy", status: "inactive", joined: "Sep 2019", patients: 0, salary: 70000, shift: "—", phone: "+880 1711-008899" },
];

const PATIENTS_ALL = [
  { id: "UPPC-2024-0481", name: "Karim Uddin", condition: "Post-stroke Hemiplegia", doctor: "Dr. Amina Khanam", status: "active", since: "Jan 2024", balance: 1300, sessions: 14 },
  { id: "UPPC-2024-0392", name: "Fatema Begum", condition: "Lumbar Disc Herniation", doctor: "Dr. Rafiq Hossain", status: "active", since: "Mar 2024", balance: 0, sessions: 9 },
  { id: "UPPC-2024-0310", name: "Shahidul Haq", condition: "Shoulder Impingement", doctor: "Dr. Nusrat Jahan", status: "active", since: "Apr 2024", balance: 2400, sessions: 6 },
  { id: "UPPC-2023-1198", name: "Rokeya Sultana", condition: "Parkinson's Disease", doctor: "Dr. Amina Khanam", status: "discharged", since: "Aug 2023", balance: 0, sessions: 31 },
  { id: "UPPC-2024-0501", name: "Mizanur Rahman", condition: "Cerebral Palsy (Adult)", doctor: "Dr. Rafiq Hossain", status: "active", since: "Feb 2024", balance: 500, sessions: 20 },
  { id: "UPPC-2024-0558", name: "Sumaiya Akter", condition: "Traumatic Brain Injury", doctor: "Dr. Amina Khanam", status: "critical", since: "May 2024", balance: 8800, sessions: 3 },
];

const APPOINTMENTS_TODAY = [
  { time: "9:00 AM", patient: "Karim Uddin", doctor: "Dr. Amina Khanam", type: "Follow-up", room: "101", status: "confirmed" },
  { time: "9:30 AM", patient: "Sumaiya Akter", doctor: "Dr. Amina Khanam", type: "Assessment", room: "101", status: "confirmed" },
  { time: "10:00 AM", patient: "Fatema Begum", doctor: "Dr. Rafiq Hossain", type: "Therapy", room: "PT-1", status: "confirmed" },
  { time: "11:30 AM", patient: "Mizanur Rahman", doctor: "Dr. Rafiq Hossain", type: "Therapy", room: "PT-1", status: "confirmed" },
  { time: "1:00 PM", patient: "Shahidul Haq", doctor: "Dr. Nusrat Jahan", type: "Consultation", room: "PT-2", status: "pending" },
  { time: "2:30 PM", patient: "New Patient", doctor: "Dr. Amina Khanam", type: "First Visit", room: "102", status: "pending" },
  { time: "4:00 PM", patient: "Fatema Begum", doctor: "Dr. Nusrat Jahan", type: "Therapy", room: "PT-2", status: "confirmed" },
];

const REVENUE_MONTHLY = [
  { month: "Nov", revenue: 142000, expenses: 98000 },
  { month: "Dec", revenue: 158000, expenses: 102000 },
  { month: "Jan", revenue: 134000, expenses: 99000 },
  { month: "Feb", revenue: 171000, expenses: 105000 },
  { month: "Mar", revenue: 189000, expenses: 108000 },
  { month: "Apr", revenue: 204000, expenses: 112000 },
];

const LEAVE_REQUESTS = [
  { id: "LV-001", staff: "Milon Chandra", role: "Nurse", from: "10 May", to: "20 May", reason: "Medical", status: "approved" },
  { id: "LV-002", staff: "Sadia Rahman", role: "Receptionist", from: "22 May", to: "24 May", reason: "Personal", status: "pending" },
  { id: "LV-003", staff: "Ariful Islam", role: "Lab Technician", from: "28 May", to: "30 May", reason: "Family", status: "pending" },
  { id: "LV-004", staff: "Kohinoor Begum", role: "Physiotherapist", from: "1 Jun", to: "15 Jun", reason: "Maternity", status: "approved" },
];

const ANNOUNCEMENTS = [
  { id: 1, title: "Staff Meeting — May 20", body: "Monthly review meeting in Conference Room A at 3:00 PM. Attendance mandatory.", date: "Today", priority: "high" },
  { id: 2, title: "New EMR System Rollout", body: "Training sessions for new Electronic Medical Records software scheduled for 25–27 May.", date: "2 days ago", priority: "medium" },
  { id: 3, title: "Ramadan Shift Adjustments", body: "Revised shift timings effective from next week. Check updated schedules.", date: "4 days ago", priority: "low" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Overview", icon: "⬡" },
  { id: "patients", label: "Patients", icon: "◉" },
  { id: "appointments", label: "Appointments", icon: "◈" },
  { id: "staff", label: "Staff & HR", icon: "◎" },
  { id: "finance", label: "Finance", icon: "◇" },
  { id: "reports", label: "Reports", icon: "▣" },
  { id: "settings", label: "Settings", icon: "✦" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #07111f;
    --navy2: #0d1f33;
    --navy3: #112840;
    --navy4: #0a1928;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-dim: rgba(201,168,76,0.12);
    --gold-border: rgba(201,168,76,0.22);
    --text: #ddd5c2;
    --text2: rgba(221,213,194,0.65);
    --text3: rgba(221,213,194,0.38);
    --border: rgba(201,168,76,0.11);
    --border2: rgba(255,255,255,0.05);
    --success: #2eb87a;
    --warning: #e8a030;
    --danger: #e85555;
    --info: #4a9fd4;
    --purple: #9b72d4;
    --radius: 6px;
    --radius-lg: 12px;
    --sidebar-w: 230px;
  }
  body { background: var(--navy); color: var(--text); font-family: 'DM Sans', sans-serif; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
  input, select, textarea { outline: none; font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  /* Shell */
  .shell { display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar { width: var(--sidebar-w); min-height: 100vh; background: var(--navy2); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
  .sidebar-brand { padding: 22px 24px 18px; border-bottom: 1px solid var(--border); }
  .brand-tag { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 4px; }
  .brand-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; letter-spacing: 0.04em; }
  .brand-name span { color: var(--gold); }
  .brand-sub { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text3); margin-top: 2px; }
  .sidebar-admin { padding: 16px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .admin-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.08)); border: 1px solid var(--gold-border); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 14px; color: var(--gold); flex-shrink: 0; }
  .admin-name { font-size: 13px; font-weight: 500; color: var(--text); }
  .admin-role { font-size: 10px; color: var(--gold); letter-spacing: 0.06em; margin-top: 1px; }
  .sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-section { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text3); padding: 10px 24px 6px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 24px; font-size: 12.5px; color: var(--text2); cursor: pointer; transition: all 0.2s; border-left: 2px solid transparent; position: relative; }
  .nav-item:hover { color: var(--text); background: rgba(201,168,76,0.04); }
  .nav-item.active { color: var(--gold); border-left-color: var(--gold); background: var(--gold-dim); }
  .nav-badge { position: absolute; right: 18px; background: var(--danger); color: #fff; font-size: 9px; padding: 1px 6px; border-radius: 10px; }
  .sidebar-footer { padding: 16px 24px; border-top: 1px solid var(--border); }
  .logout-btn { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text3); background: none; border: none; padding: 0; transition: color 0.2s; }
  .logout-btn:hover { color: var(--danger); }

  /* Main */
  .main { margin-left: var(--sidebar-w); flex: 1; min-height: 100vh; }
  .topbar { padding: 16px 36px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: rgba(7,17,31,0.9); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 40; }
  .page-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; }
  .page-title em { color: var(--gold); font-style: italic; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .icon-btn { width: 34px; height: 34px; border-radius: 50%; background: var(--navy2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--text2); position: relative; transition: all 0.2s; }
  .icon-btn:hover { border-color: var(--gold-border); color: var(--gold); }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--danger); position: absolute; top: 5px; right: 5px; border: 1.5px solid var(--navy); }
  .date-chip { font-size: 11px; color: var(--text3); padding: 6px 12px; background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius); }
  .content { padding: 28px 36px; }

  /* Cards */
  .card { background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .card-pad { padding: 24px; }
  .card-sm { padding: 18px 20px; }

  /* Section header */
  .sec-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .sec-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; }
  .sec-title em { color: var(--gold); font-style: italic; }
  .sec-action { font-size: 11px; color: var(--gold); background: none; border: none; padding: 0; letter-spacing: 0.08em; transition: opacity 0.2s; }
  .sec-action:hover { opacity: 0.7; }

  /* Stat cards */
  .stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat { background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px 22px; transition: border-color 0.25s; position: relative; overflow: hidden; }
  .stat::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent-color, var(--gold)); opacity: 0.5; }
  .stat:hover { border-color: var(--gold-border); }
  .stat-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text3); margin-bottom: 10px; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 300; line-height: 1; margin-bottom: 4px; }
  .stat-sub { font-size: 11px; color: var(--text3); }
  .stat-icon { position: absolute; bottom: 14px; right: 16px; font-size: 22px; opacity: 0.12; }

  /* Grid layouts */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .g-7-5 { display: grid; grid-template-columns: 7fr 5fr; gap: 20px; }
  .g-6-6 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  /* Badges */
  .badge { display: inline-block; font-size: 9px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; }
  .b-active { background: rgba(46,184,122,0.14); color: var(--success); }
  .b-inactive { background: rgba(255,255,255,0.05); color: var(--text3); }
  .b-leave { background: rgba(232,160,48,0.14); color: var(--warning); }
  .b-critical { background: rgba(232,85,85,0.14); color: var(--danger); }
  .b-discharged { background: rgba(74,159,212,0.14); color: var(--info); }
  .b-confirmed { background: rgba(46,184,122,0.14); color: var(--success); }
  .b-pending { background: rgba(232,160,48,0.14); color: var(--warning); }
  .b-approved { background: rgba(46,184,122,0.14); color: var(--success); }
  .b-high { background: rgba(232,85,85,0.12); color: var(--danger); }
  .b-medium { background: rgba(232,160,48,0.12); color: var(--warning); }
  .b-low { background: rgba(46,184,122,0.1); color: var(--success); }

  /* Table */
  .tbl { width: 100%; border-collapse: collapse; }
  .tbl th { font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text3); padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border); font-weight: 400; }
  .tbl td { padding: 13px 14px; font-size: 12.5px; color: var(--text2); border-bottom: 1px solid var(--border2); vertical-align: middle; }
  .tbl tr:last-child td { border-bottom: none; }
  .tbl tbody tr { transition: background 0.15s; }
  .tbl tbody tr:hover td { background: rgba(201,168,76,0.025); }
  .tbl-name { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 2px; }
  .tbl-sub { font-size: 11px; color: var(--text3); }
  .tbl-id { font-size: 10px; color: var(--gold); letter-spacing: 0.1em; }

  /* Revenue bar chart */
  .bar-chart { display: flex; align-items: flex-end; gap: 10px; height: 140px; margin-top: 8px; }
  .bar-group { flex: 1; display: flex; gap: 3px; align-items: flex-end; position: relative; }
  .bar-rev { border-radius: 3px 3px 0 0; background: linear-gradient(180deg, var(--gold) 0%, rgba(201,168,76,0.5) 100%); transition: height 0.6s ease; min-height: 4px; }
  .bar-exp { border-radius: 3px 3px 0 0; background: rgba(255,255,255,0.07); transition: height 0.6s ease; min-height: 4px; }
  .bar-label { position: absolute; bottom: -20px; left: 0; right: 0; text-align: center; font-size: 10px; color: var(--text3); }

  /* Today schedule */
  .sched-row { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--border2); }
  .sched-row:last-child { border-bottom: none; }
  .sched-time { font-family: 'Cormorant Garamond', serif; font-size: 15px; color: var(--gold); min-width: 68px; }
  .sched-info { flex: 1; }
  .sched-patient { font-size: 13px; color: var(--text); margin-bottom: 2px; }
  .sched-meta { font-size: 11px; color: var(--text3); }
  .sched-room { font-size: 11px; color: var(--text3); text-align: right; white-space: nowrap; }

  /* Staff row */
  .staff-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--gold-dim); border: 1px solid var(--gold-border); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 13px; color: var(--gold); flex-shrink: 0; }

  /* Leave row */
  .leave-item { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid var(--border2); }
  .leave-item:last-child { border-bottom: none; }
  .leave-info { flex: 1; }
  .leave-name { font-size: 13px; color: var(--text); margin-bottom: 2px; }
  .leave-dates { font-size: 11px; color: var(--text3); }
  .leave-actions { display: flex; gap: 6px; }
  .btn-approve { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; background: rgba(46,184,122,0.12); border: 1px solid rgba(46,184,122,0.3); color: var(--success); border-radius: var(--radius); transition: all 0.2s; }
  .btn-approve:hover { background: rgba(46,184,122,0.22); }
  .btn-reject { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; background: rgba(232,85,85,0.08); border: 1px solid rgba(232,85,85,0.2); color: var(--danger); border-radius: var(--radius); transition: all 0.2s; }
  .btn-reject:hover { background: rgba(232,85,85,0.16); }

  /* Buttons */
  .btn-gold { background: var(--gold); color: var(--navy); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 22px; border: none; border-radius: var(--radius); transition: all 0.2s; }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 5px 18px rgba(201,168,76,0.2); }
  .btn-outline { background: transparent; color: var(--gold); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 9px 20px; border: 1px solid var(--gold-border); border-radius: var(--radius); transition: all 0.2s; }
  .btn-outline:hover { background: var(--gold-dim); }
  .btn-ghost { background: transparent; color: var(--text3); font-size: 11px; letter-spacing: 0.08em; padding: 8px 14px; border: 1px solid var(--border); border-radius: var(--radius); transition: all 0.2s; }
  .btn-ghost:hover { border-color: var(--gold-border); color: var(--text2); }

  /* Announcement */
  .ann-item { padding: 14px 0; border-bottom: 1px solid var(--border2); }
  .ann-item:last-child { border-bottom: none; }
  .ann-hd { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; }
  .ann-title { font-size: 13px; font-weight: 500; color: var(--text); }
  .ann-body { font-size: 12px; color: var(--text3); line-height: 1.6; margin-bottom: 5px; }
  .ann-date { font-size: 10px; color: var(--text3); }

  /* Input */
  .search-box { background: var(--navy3); border: 1px solid var(--border); border-radius: var(--radius); padding: 8px 14px; font-size: 12px; color: var(--text); width: 220px; transition: border-color 0.2s; }
  .search-box::placeholder { color: var(--text3); }
  .search-box:focus { border-color: var(--gold-border); }
  .filter-select { background: var(--navy3); border: 1px solid var(--border); border-radius: var(--radius); padding: 8px 12px; font-size: 12px; color: var(--text2); transition: border-color 0.2s; }
  .filter-select:focus { border-color: var(--gold-border); }
  .filter-select option { background: var(--navy2); }

  /* Progress ring placeholder */
  .mini-stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .mini-stat { background: var(--navy3); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; text-align: center; }
  .mini-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: var(--gold); }
  .mini-stat-lbl { font-size: 10px; color: var(--text3); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3px; }

  /* Occupancy bar */
  .occ-row { margin-bottom: 14px; }
  .occ-hd { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 12px; color: var(--text2); }
  .occ-bar-bg { background: var(--navy3); border-radius: 3px; height: 5px; overflow: hidden; }
  .occ-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); }

  /* Finance summary row */
  .fin-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border2); font-size: 13px; }
  .fin-row:last-child { border-bottom: none; }
  .fin-label { color: var(--text3); }
  .fin-value { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 300; }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fade { animation: fadeIn 0.3s ease forwards; }

  /* Responsive */
  @media (max-width: 1200px) {
    .stats-grid { grid-template-columns: repeat(3, 1fr); }
    .g-7-5, .g-6-6, .g2 { grid-template-columns: 1fr; }
  }
  @media (max-width: 900px) {
    :root { --sidebar-w: 56px; }
    .brand-name, .brand-sub, .brand-tag, .admin-name, .admin-role, .nav-item span:not(.nav-icon) { display: none; }
    .nav-item { justify-content: center; padding: 12px; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .content { padding: 20px 16px; }
    .topbar { padding: 14px 16px; }
  }
`;

// ─── Overview page ────────────────────────────────────────────────────────────
function Overview() {
  const maxRev = Math.max(...REVENUE_MONTHLY.map((r) => r.revenue));
  return (
    <div className="fade">
      {/* Welcome Banner */}
      <div style={{ marginBottom: 24, padding: "20px 26px", background: "linear-gradient(135deg, rgba(201,168,76,0.09), rgba(13,31,51,0))", border: "1px solid var(--gold-border)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 5 }}>Administration Panel</div>
          <div className="serif" style={{ fontSize: 26, fontWeight: 300, marginBottom: 4 }}>Good Morning, <em style={{ color: "var(--gold)" }}>Dr. Fahmida</em></div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>Sunday, 17 May 2026 · UPPC Medical Centre</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-outline">↓ Export Report</button>
          <button className="btn-gold">+ New Patient</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { label: "Total Patients", val: "124", sub: "6 critical", color: "var(--gold)", icon: "◉" },
          { label: "Today's Appointments", val: "7", sub: "2 pending", color: "var(--info)", icon: "◈" },
          { label: "Active Staff", val: "6", sub: "1 on leave", color: "var(--success)", icon: "◎" },
          { label: "Monthly Revenue", val: "৳2.04L", sub: "Apr 2025", color: "var(--gold)", icon: "◇" },
          { label: "Outstanding Dues", val: "৳13.0K", sub: "Across 4 patients", color: "var(--warning)", icon: "▲" },
        ].map((s, i) => (
          <div className="stat" key={s.label} style={{ "--accent-color": s.color }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
            <div className="stat-icon">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Row 1 */}
      <div className="g-7-5" style={{ marginBottom: 20 }}>
        {/* Revenue Chart */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Revenue <em>vs Expenses</em></div>
            <div style={{ display: "flex", gap: 14, fontSize: 10, color: "var(--text3)", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--gold)", display: "inline-block" }} /> Revenue</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.1)", display: "inline-block" }} /> Expenses</span>
            </div>
          </div>
          <div className="bar-chart" style={{ paddingBottom: 28 }}>
            {REVENUE_MONTHLY.map((m) => (
              <div className="bar-group" key={m.month}>
                <div className="bar-rev" style={{ height: `${(m.revenue / maxRev) * 130}px`, flex: 1 }} title={`Revenue: ৳${m.revenue.toLocaleString()}`} />
                <div className="bar-exp" style={{ height: `${(m.expenses / maxRev) * 130}px`, flex: 1 }} title={`Expenses: ৳${m.expenses.toLocaleString()}`} />
                <div className="bar-label">{m.month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 8 }}>
            {[
              { label: "Total Revenue (6 Mo)", val: "৳9.98L", color: "var(--gold)" },
              { label: "Total Expenses (6 Mo)", val: "৳6.24L", color: "var(--text2)" },
              { label: "Net Profit", val: "৳3.74L", color: "var(--success)" },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "10px 14px" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 5 }}>{s.label}</div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 300, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card card-pad" style={{ overflow: "hidden" }}>
          <div className="sec-hd">
            <div className="sec-title serif">Today's <em>Schedule</em></div>
            <button className="sec-action">Full →</button>
          </div>
          <div style={{ overflowY: "auto", maxHeight: 300 }}>
            {APPOINTMENTS_TODAY.slice(0, 6).map((a, i) => (
              <div className="sched-row" key={i}>
                <div className="sched-time">{a.time}</div>
                <div className="sched-info">
                  <div className="sched-patient">{a.patient}</div>
                  <div className="sched-meta">{a.doctor} · {a.type}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span className={`badge b-${a.status}`}>{a.status}</span>
                  <div className="sched-room">Rm {a.room}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="g-6-6" style={{ marginBottom: 20 }}>
        {/* Department Occupancy */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Department <em>Load</em></div>
          </div>
          {[
            { dept: "Neurology", current: 38, capacity: 50 },
            { dept: "Physiotherapy", current: 81, capacity: 100 },
            { dept: "Occupational Therapy", current: 21, capacity: 30 },
            { dept: "Diagnostics", current: 12, capacity: 40 },
          ].map((d) => (
            <div className="occ-row" key={d.dept}>
              <div className="occ-hd">
                <span>{d.dept}</span>
                <span style={{ color: "var(--gold)" }}>{d.current}/{d.capacity} patients</span>
              </div>
              <div className="occ-bar-bg">
                <div className="occ-bar-fill" style={{ width: `${(d.current / d.capacity) * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="mini-stat-row" style={{ marginTop: 16 }}>
            {[{ val: "124", lbl: "Total Patients" }, { val: "14", lbl: "Avg Sessions" }].map((m) => (
              <div className="mini-stat" key={m.lbl}>
                <div className="mini-stat-val">{m.val}</div>
                <div className="mini-stat-lbl">{m.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Requests */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Leave <em>Requests</em></div>
            <span style={{ fontSize: 10, color: "var(--warning)", background: "rgba(232,160,48,0.1)", padding: "2px 8px", borderRadius: 10 }}>2 Pending</span>
          </div>
          {LEAVE_REQUESTS.map((l) => (
            <div className="leave-item" key={l.id}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)", flexShrink: 0 }}>
                {l.staff.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="leave-info">
                <div className="leave-name">{l.staff}</div>
                <div className="leave-dates">{l.from} – {l.to} · {l.reason}</div>
              </div>
              {l.status === "pending" ? (
                <div className="leave-actions">
                  <button className="btn-approve">✓</button>
                  <button className="btn-reject">✕</button>
                </div>
              ) : (
                <span className="badge b-approved">Approved</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 */}
      <div className="g-6-6">
        {/* Recent Patients */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Recent <em>Patients</em></div>
            <button className="sec-action">All patients →</button>
          </div>
          {PATIENTS_ALL.slice(0, 4).map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid var(--border2)" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--navy3)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "'Cormorant Garamond', serif", color: "var(--text3)", flexShrink: 0 }}>
                {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{p.condition}</div>
              </div>
              <span className={`badge b-${p.status}`}>{p.status}</span>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Announcements</div>
            <button className="btn-gold" style={{ fontSize: 10, padding: "7px 14px" }}>+ Post</button>
          </div>
          {ANNOUNCEMENTS.map((a) => (
            <div className="ann-item" key={a.id}>
              <div className="ann-hd">
                <span className={`badge b-${a.priority}`}>{a.priority}</span>
                <div className="ann-title">{a.title}</div>
              </div>
              <div className="ann-body">{a.body}</div>
              <div className="ann-date">{a.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Patients page ────────────────────────────────────────────────────────────
function Patients() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = PATIENTS_ALL.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });
  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input className="search-box" placeholder="Search patient name or ID…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="critical">Critical</option>
          <option value="discharged">Discharged</option>
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button className="btn-outline">↓ Export</button>
          <button className="btn-gold">+ Add Patient</button>
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Condition</th>
              <th>Treating Doctor</th>
              <th>Sessions</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="tbl-name">{p.name}</div>
                  <div className="tbl-id">{p.id}</div>
                  <div className="tbl-sub">Since {p.since}</div>
                </td>
                <td style={{ color: "var(--text2)", fontSize: 12 }}>{p.condition}</td>
                <td style={{ fontSize: 12, color: "var(--text2)" }}>{p.doctor}</td>
                <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--gold)" }}>{p.sessions}</td>
                <td>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: p.balance > 0 ? "var(--warning)" : "var(--success)" }}>
                    ৳{p.balance.toLocaleString()}
                  </div>
                </td>
                <td><span className={`badge b-${p.status}`}>{p.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-ghost">View</button>
                    {p.balance > 0 && <button className="btn-approve" style={{ fontSize: 10 }}>Pay</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Staff/HR page ────────────────────────────────────────────────────────────
function StaffHR() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const depts = ["all", ...new Set(STAFF.map((s) => s.dept))];
  const filtered = STAFF.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "all" || s.dept === dept;
    return matchSearch && matchDept;
  });
  return (
    <div className="fade">
      {/* HR Stats */}
      <div className="g3" style={{ marginBottom: 20 }}>
        {[
          { label: "Total Staff", val: STAFF.length, sub: "All departments", color: "var(--gold)" },
          { label: "Active Today", val: STAFF.filter((s) => s.status === "active").length, sub: "On duty", color: "var(--success)" },
          { label: "On Leave", val: STAFF.filter((s) => s.status === "on-leave").length, sub: "Current", color: "var(--warning)" },
        ].map((s) => (
          <div className="card card-sm" key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>{s.label}</div>
            <div className="serif" style={{ fontSize: 38, fontWeight: 300, color: s.color, marginBottom: 3 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input className="search-box" placeholder="Search staff…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="filter-select" value={dept} onChange={(e) => setDept(e.target.value)}>
          {depts.map((d) => <option key={d} value={d}>{d === "all" ? "All Departments" : d}</option>)}
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button className="btn-outline">↓ Payroll Export</button>
          <button className="btn-gold">+ Add Staff</button>
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Department</th>
              <th>Shift</th>
              <th>Patients</th>
              <th>Salary (৳)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="staff-avatar">{s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
                    <div>
                      <div className="tbl-name">{s.name}</div>
                      <div className="tbl-sub">{s.role} · {s.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 12, color: "var(--text2)" }}>{s.dept}</td>
                <td style={{ fontSize: 12, color: "var(--text2)" }}>{s.shift}</td>
                <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: s.patients > 0 ? "var(--gold)" : "var(--text3)" }}>{s.patients || "—"}</td>
                <td>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--text)" }}>৳{s.salary.toLocaleString()}</div>
                </td>
                <td><span className={`badge b-${s.status === "on-leave" ? "leave" : s.status}`}>{s.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-ghost">Edit</button>
                    <button className="btn-ghost">Schedule</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Appointments page ────────────────────────────────────────────────────────
function AppointmentsAdmin() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? APPOINTMENTS_TODAY : APPOINTMENTS_TODAY.filter((a) => a.status === filter);
  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {["all", "confirmed", "pending"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", border: "1px solid", borderRadius: "var(--radius)", fontSize: 11, letterSpacing: "0.08em", textTransform: "capitalize", borderColor: filter === f ? "var(--gold)" : "var(--border)", background: filter === f ? "var(--gold-dim)" : "transparent", color: filter === f ? "var(--gold)" : "var(--text3)", transition: "all 0.2s" }}>
            {f}
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <button className="btn-gold">+ Book Appointment</button>
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Type</th>
              <th>Room</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={i}>
                <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--gold)" }}>{a.time}</td>
                <td><div className="tbl-name">{a.patient}</div></td>
                <td style={{ fontSize: 12, color: "var(--text2)" }}>{a.doctor}</td>
                <td style={{ fontSize: 12, color: "var(--text2)" }}>{a.type}</td>
                <td style={{ fontSize: 12, color: "var(--text3)" }}>Room {a.room}</td>
                <td><span className={`badge b-${a.status}`}>{a.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-ghost">Edit</button>
                    <button className="btn-reject" style={{ fontSize: 10 }}>Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Finance page ─────────────────────────────────────────────────────────────
function Finance() {
  return (
    <div className="fade">
      <div className="g3" style={{ marginBottom: 24 }}>
        {[
          { label: "Monthly Revenue", val: "৳2,04,000", sub: "April 2025", color: "var(--gold)" },
          { label: "Monthly Expenses", val: "৳1,12,000", sub: "April 2025", color: "var(--text2)" },
          { label: "Net Profit", val: "৳92,000", sub: "+8.5% vs Mar", color: "var(--success)" },
          { label: "Total Outstanding", val: "৳13,000", sub: "4 patients", color: "var(--warning)" },
          { label: "Total Collected YTD", val: "৳9,98,000", sub: "2025 to date", color: "var(--gold)" },
          { label: "Payroll This Month", val: "৳4,68,000", sub: "8 staff members", color: "var(--info)" },
        ].map((s) => (
          <div className="card card-sm" key={s.label}>
            <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>{s.label}</div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 300, color: s.color, marginBottom: 3 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        {/* Patients with outstanding */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Outstanding <em>Balances</em></div>
          </div>
          <table className="tbl">
            <thead>
              <tr><th>Patient</th><th>Balance</th><th>Action</th></tr>
            </thead>
            <tbody>
              {PATIENTS_ALL.filter((p) => p.balance > 0).map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="tbl-name">{p.name}</div>
                    <div className="tbl-id">{p.id}</div>
                  </td>
                  <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--warning)" }}>৳{p.balance.toLocaleString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-approve" style={{ fontSize: 10 }}>Collect</button>
                      <button className="btn-ghost">Invoice</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payroll overview */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Payroll <em>Summary</em></div>
            <button className="btn-outline" style={{ fontSize: 10, padding: "7px 14px" }}>Process Payroll</button>
          </div>
          {STAFF.filter((s) => s.status !== "inactive").map((s) => (
            <div className="fin-row" key={s.id}>
              <div>
                <div style={{ fontSize: 13, color: "var(--text)" }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.role}</div>
              </div>
              <div className="fin-value" style={{ color: s.status === "on-leave" ? "var(--text3)" : "var(--text)" }}>
                ৳{s.salary.toLocaleString()}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: "12px 0", borderTop: "1px solid var(--gold-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Total Payroll</div>
            <div className="serif" style={{ fontSize: 26, fontWeight: 300, color: "var(--gold)" }}>৳{STAFF.filter(s => s.status !== "inactive").reduce((a, s) => a + s.salary, 0).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reports placeholder ──────────────────────────────────────────────────────
function Reports() {
  return (
    <div className="fade">
      <div className="g3" style={{ marginBottom: 24 }}>
        {[
          { title: "Patient Report", desc: "Full patient registry with history, diagnosis, billing", icon: "◉" },
          { title: "Staff Performance", desc: "Session count, attendance, patient load per doctor", icon: "◎" },
          { title: "Financial Report", desc: "Revenue, expenses, outstanding, payroll breakdown", icon: "◇" },
          { title: "Appointment Log", desc: "All appointments with status and completion rates", icon: "◈" },
          { title: "Discharge Summary", desc: "Discharged patients and outcome assessments", icon: "▣" },
          { title: "Leave & Attendance", desc: "Staff leave history and attendance records", icon: "✦" },
        ].map((r) => (
          <div className="card card-pad" key={r.title} style={{ cursor: "pointer", transition: "border-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--gold-border)"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
            <div style={{ fontSize: 28, color: "var(--gold)", opacity: 0.5, marginBottom: 12 }}>{r.icon}</div>
            <div style={{ fontSize: 15, fontFamily: "'Cormorant Garamond', serif", marginBottom: 6 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6, marginBottom: 16 }}>{r.desc}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-gold" style={{ fontSize: 10, padding: "7px 14px" }}>↓ Download</button>
              <button className="btn-ghost">Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page titles ──────────────────────────────────────────────────────────────
const TITLES = {
  dashboard: ["Admin", "Overview"],
  patients: ["Patient", "Registry"],
  appointments: ["Appointment", "Manager"],
  staff: ["Staff & HR", "Management"],
  finance: ["Finance &", "Billing"],
  reports: ["Reports &", "Analytics"],
  settings: ["System", "Settings"],
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [t0, t1] = TITLES[page] || ["", ""];

  return (
    <div className="shell">
      <style>{STYLES}</style>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-tag">Admin Panel</div>
          <div className="brand-name serif"><span>UP</span>PC</div>
          <div className="brand-sub">Medical Centre</div>
        </div>
        <div className="sidebar-admin">
          <div className="admin-avatar serif">{ADMIN.avatar}</div>
          <div>
            <div className="admin-name">{ADMIN.name}</div>
            <div className="admin-role">{ADMIN.role}</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">Main</div>
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
              <span style={{ fontSize: 14, minWidth: 16, textAlign: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "appointments" && <span className="nav-badge">2</span>}
            </div>
          ))}
          <div className="nav-section" style={{ marginTop: 8 }}>System</div>
          {NAV_ITEMS.slice(5).map((item) => (
            <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
              <span style={{ fontSize: 14, minWidth: 16, textAlign: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <span>⬡</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="topbar">
          <h1 className="page-title serif">{t0} <em>{t1}</em></h1>
          <div className="topbar-right">
            <span className="date-chip">Sun, 17 May 2026</span>
            <div style={{ position: "relative" }}>
              <button className="icon-btn">🔔</button>
              <div className="dot" />
            </div>
            <button className="icon-btn">⚙</button>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif" }}>
              {ADMIN.avatar}
            </div>
          </div>
        </div>
        <div className="content">
          {page === "dashboard" && <Overview />}
          {page === "patients" && <Patients />}
          {page === "appointments" && <AppointmentsAdmin />}
          {page === "staff" && <StaffHR />}
          {page === "finance" && <Finance />}
          {page === "reports" && <Reports />}
          {page === "settings" && (
            <div className="fade" style={{ color: "var(--text3)", padding: "60px 0", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.3 }}>⚙</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}>System Settings</div>
              <div style={{ fontSize: 13, marginTop: 8 }}>Coming soon — clinic configuration, roles & permissions</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}