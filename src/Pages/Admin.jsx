
import { useState, useEffect } from "react";

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

//   .modal-backdrop {
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.65);
//   z-index: 999;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

.modal-backdrop {
  position: fixed;
  top: 0;
  left: var(--sidebar-w);
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.65);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 20px;
}

// .modal-box {
//   width: 620px;
//   max-height: 90vh;
//   overflow-y: auto;
//   background: var(--navy2);
//   border: 1px solid var(--gold-border);
//   border-radius: var(--radius-lg);
//   padding: 26px;
// }


.modal-box {
  width: 620px;
  max-width: 95%;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--navy2);
  border: 1px solid var(--gold-border);
  border-radius: var(--radius-lg);
  padding: 26px;
  margin: auto;
  flex-shrink: 0;
}

.modal-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.modal-form input,
.modal-form select,
.modal-form textarea {
  background: var(--navy3);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 12px;
  border-radius: var(--radius);
  font-size: 12px;
}

.modal-form textarea {
  grid-column: span 2;
  min-height: 80px;
}


/* ── Staff Form Registration Modal Canvas ── */
  .hr-modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(7, 17, 31, 0.9);
    backdrop-filter: blur(8px);
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: modalPop 0.22s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
  }
  .hr-modal-window {
    background: var(--navy2);
    border: 1px solid var(--gbord);
    border-radius: var(--rl);
    width: 95%;
    max-width: 620px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 26px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  }
  .form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

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
  // ─── 1. Reactive Component State Bundles ───
  const [livePatients, setLivePatients] = useState([]);
  const [liveAppointments, setLiveAppointments] = useState([]);
  const [liveStaff, setLiveStaff] = useState([]);
  const [financeMetrics, setFinanceMetrics] = useState({ totalRevenue: 0, totalExpenses: 0, netProfit: 0, outstandingDues: 0 });
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000";

  // ─── 2. Parallel Processing Resource Core Sync ───
  useEffect(() => {
    const fetchSystemStateData = async () => {
      try {
        const [resPts, resAppts, resStaff, resFinance] = await Promise.all([
          fetch(`${API_BASE}/users/patients`).catch(() => null),
          fetch(`${API_BASE}/api/appointments`).catch(() => null),
          fetch(`${API_BASE}/api/staff`).catch(() => null),
          fetch(`${API_BASE}/api/finance/summary`).catch(() => null) // Fallback handled below if route missing
        ]);

        // Parse collection pipelines safely
        const ptsData = resPts && resPts.ok ? await resPts.json() : [];
        const apptsData = resAppts && resAppts.ok ? await resAppts.json() : [];
        const staffData = resStaff && resStaff.ok ? await resStaff.json() : [];
        
        setLivePatients(Array.isArray(ptsData) ? ptsData : (ptsData.patients || []));
        setLiveAppointments(Array.isArray(apptsData) ? apptsData : (apptsData.appointments || apptsData.data || []));
        setLiveStaff(Array.isArray(staffData) ? staffData : (staffData.data || []));

        // Parse or dynamically compile structural financial summaries if route missing
        if (resFinance && resFinance.ok) {
          const finJson = await resFinance.json();
          setFinanceMetrics(finJson.data || finJson);
        } else {
          // Fallback Auto-Aggregation Engine from existing databases
          const calculatedRevenue = (Array.isArray(apptsData) ? apptsData : []).reduce((sum, a) => sum + (Number(a.fee) || 1500), 0);
          const calculatedExpenses = (Array.isArray(staffData) ? staffData : []).reduce((sum, s) => sum + (Number(s.salary) || 0), 0);
          setFinanceMetrics({
            totalRevenue: calculatedRevenue || 998000,
            totalExpenses: calculatedExpenses || 624000,
            netProfit: (calculatedRevenue || 998000) - (calculatedExpenses || 624000),
            outstandingDues: 13000
          });
        }
      } catch (error) {
        console.error("Core Admin Pipeline mapping failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemStateData();
  }, []);

  // ─── 3. Dynamic Calculation Sub-systems ───
  
  // Real-time calculated structural values
  const totalPatientCount = livePatients.length || 124;
  const criticalCasesCount = livePatients.filter(p => p.condition?.toLowerCase().includes("critical") || p.status === "critical").length || 6;
  
  const todayAppts = liveAppointments.length || 7;
  const pendingAppts = liveAppointments.filter(a => a.status === "pending" || a.status === "waiting").length || 2;
  
  const activeStaffCount = liveStaff.filter(s => s.status === "active").length || 6;
  const leaveStaffCount = liveStaff.filter(s => s.status === "on-leave" || s.status === "leave").length || 1;

  // ─── 4. Fallback Default Datasets for Unprovisioned Pipelines ───
  const mockRevenueMonthly = typeof REVENUE_MONTHLY !== "undefined" ? REVENUE_MONTHLY : [
    { month: "Dec", revenue: 140000, expenses: 95000 },
    { month: "Jan", revenue: 180000, expenses: 110000 },
    { month: "Feb", revenue: 165000, expenses: 105000 },
    { month: "Mar", revenue: 210000, expenses: 115000 },
    { month: "Apr", revenue: 204000, expenses: 100000 },
    { month: "May", revenue: 199000, expenses: 99000 }
  ];
  const maxRev = Math.max(...mockRevenueMonthly.map((r) => r.revenue));

  const mockLeaveRequests = typeof LEAVE_REQUESTS !== "undefined" ? LEAVE_REQUESTS : [
    { id: 1, staff: "Nusrat Jahan", from: "12 Jun", to: "15 Jun", reason: "Family Event", status: "pending" },
    { id: 2, staff: "Dr. Asif Rahman", from: "18 Jun", to: "19 Jun", reason: "Medical Seminar", status: "pending" }
  ];

  const mockAnnouncements = typeof ANNOUNCEMENTS !== "undefined" ? ANNOUNCEMENTS : [
    { id: 1, priority: "high", title: "System Maintenance Window", body: "Server clusters running core EMR pipelines will undergo schema migration at midnight.", date: "Today" },
    { id: 2, priority: "normal", title: "Eid Holiday Roster", body: "Please submit all emergency shifts adjustments to the HR department panel.", date: "Yesterday" }
  ];

  if (loading) {
    return (
      <div className="card" style={{ padding: "80px 0", textAlign: "center", color: "var(--text3)" }}>
        Assembling clinical administration summary vectors...
      </div>
    );
  }

  // Formatting currency safely to crisp South Asian formats (Lakh/Thousands)
  const formatBDT = (num) => {
    if (num >= 100000) return `৳${(num / 100000).toFixed(2)}L`;
    if (num >= 1000) return `৳${(num / 1000).toFixed(1)}K`;
    return `৳${num}`;
  };

  // Generate systemic local dynamic time logs matching system requirements
  const systemLiveDateStr = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="fade">
      {/* Dynamic Welcome Heading Banner */}
      <div style={{ marginBottom: 24, padding: "20px 26px", background: "linear-gradient(135deg, rgba(201,168,76,0.09), rgba(13,31,51,0))", border: "1px solid var(--gold-border)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 5 }}>Administration Panel</div>
          <div className="serif" style={{ fontSize: 26, fontWeight: 300, marginBottom: 4 }}>Good Morning, <em style={{ color: "var(--gold)" }}>Dr. Fahmida</em></div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>{systemLiveDateStr} · UPPC Medical Centre</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-outline">↓ Export Report</button>
          <button className="btn-gold">+ New Patient</button>
        </div>
      </div>

      {/* Real-time Dynamic Statistics Metrics Grid Grid */}
      <div className="stats-grid">
        {[
          { label: "Total Patients", val: totalPatientCount, sub: `${criticalCasesCount} critical entries`, color: "var(--gold)", icon: "◉" },
          { label: "Today's Appointments", val: todayAppts, sub: `${pendingAppts} pending tracking`, color: "var(--info)", icon: "◈" },
          { label: "Active Staff", val: liveStaff.length || activeStaffCount, sub: `${leaveStaffCount} on scheduled leave`, color: "var(--success)", icon: "◎" },
          { label: "Monthly Revenue", val: formatBDT(financeMetrics.totalRevenue), sub: "Live accounting data", color: "var(--gold)", icon: "◇" },
          { label: "Outstanding Dues", val: formatBDT(financeMetrics.outstandingDues), sub: "Across current patient tracking", color: "var(--warning)", icon: "▲" },
        ].map((s) => (
          <div className="stat" key={s.label} style={{ "--accent-color": s.color }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
            <div className="stat-icon">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Row 1 Layout Split Frame: Financial Graph Tracking & Live Action Queue */}
      <div className="g-7-5" style={{ marginBottom: 20 }}>
        
        {/* Dynamic Financial Vector Graph Visualizer */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Revenue <em>vs Expenses</em></div>
            <div style={{ display: "flex", gap: 14, fontSize: 10, color: "var(--text3)", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--gold)", display: "inline-block" }} /> Revenue</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.1)", display: "inline-block" }} /> Expenses</span>
            </div>
          </div>
          <div className="bar-chart" style={{ paddingBottom: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 160 }}>
            {mockRevenueMonthly.map((m) => (
              <div className="bar-group" key={m.month} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", width: "100%", alignItems: "flex-end", gap: 3, height: 130 }}>
                  <div className="bar-rev" style={{ height: `${(m.revenue / maxRev) * 130}px`, flex: 1, background: "var(--gold)", borderRadius: "2px 2px 0 0" }} title={`Revenue: ৳${m.revenue.toLocaleString()}`} />
                  <div className="bar-exp" style={{ height: `${(m.expenses / maxRev) * 130}px`, flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: "2px 2px 0 0" }} title={`Expenses: ৳${m.expenses.toLocaleString()}`} />
                </div>
                <div className="bar-label" style={{ fontSize: 10, color: "var(--text3)", marginTop: 6 }}>{m.month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 8 }}>
            {[
              { label: "Total Revenue", val: formatBDT(financeMetrics.totalRevenue), color: "var(--gold)" },
              { label: "Total Expenses", val: formatBDT(financeMetrics.totalExpenses), color: "var(--text2)" },
              { label: "Net Margin Profit", val: formatBDT(financeMetrics.netProfit), color: "var(--success)" },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--navy3)", border: "1px solid var(--bord)", borderRadius: "var(--radius)", padding: "10px 14px" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 5 }}>{s.label}</div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 300, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Active Patient Appointments Tracker Itinerary */}
        <div className="card card-pad" style={{ overflow: "hidden" }}>
          <div className="sec-hd">
            <div className="sec-title serif">Today's <em>Schedule</em></div>
            <button className="sec-action">Full →</button>
          </div>
          <div style={{ overflowY: "auto", maxHeight: 290 }}>
            {liveAppointments.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "var(--text3)", fontSize: 12 }}>No appointments scheduled inside database records today.</div>
            ) : (
              liveAppointments.slice(0, 6).map((a, i) => (
                <div className="sched-row" key={a._id || i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <div className="sched-time" style={{ fontSize: 12, color: "var(--gold)", width: 55 }}>{a.time || "Slots"}</div>
                  <div className="sched-info" style={{ flex: 1, paddingLeft: 10 }}>
                    <div className="sched-patient" style={{ fontSize: 13, color: "var(--text)" }}>{a.name || a.patientName || "Profile Record"}</div>
                    <div className="sched-meta" style={{ fontSize: 11, color: "var(--text3)" }}>{a.assignedDoctor || a.doctorName || "Staff Physician"} · {a.type || "Checkup"}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span className={`badge b-${a.status || "upcoming"}`}>{a.status || "upcoming"}</span>
                    <div className="sched-room" style={{ fontSize: 10, color: "var(--text3)" }}>Rm {a.room || "B3"}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Row 2 Layout Split Frame: Load Densities & Resource Leave Panels */}
      <div className="g-7-5" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 20 }}>
        
        {/* Department Operational Loading Capacity Progress Bars */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Department <em>Load</em></div>
          </div>
          {[
            { dept: "Neurology", current: livePatients.filter(p => p.department === "Neurology").length || 18, capacity: 40 },
            { dept: "Physiotherapy", current: livePatients.filter(p => p.department === "Physiotherapy").length || 32, capacity: 50 },
            { dept: "Occupational Therapy", current: livePatients.filter(p => p.department === "Occupational Therapy").length || 9, capacity: 20 },
            { dept: "Diagnostics Unit", current: livePatients.filter(p => p.department === "Diagnostics").length || 4, capacity: 15 },
          ].map((d) => (
            <div className="occ-row" key={d.dept} style={{ marginBottom: 12 }}>
              <div className="occ-hd" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                <span style={{ color: "var(--text2)" }}>{d.dept}</span>
                <span style={{ color: "var(--gold)" }}>{d.current}/{d.capacity} patients</span>
              </div>
              <div className="occ-bar-bg" style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                <div className="occ-bar-fill" style={{ height: "100%", background: "var(--gold)", width: `${Math.min((d.current / d.capacity) * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Workflow Leave Requests Monitoring Desk */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Leave <em>Requests</em></div>
            <span style={{ fontSize: 10, color: "var(--warning)", background: "rgba(232,160,48,0.1)", padding: "2px 8px", borderRadius: 10 }}>Pending Action</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockLeaveRequests.map((l) => {
              const initials = (l.staff || "ST").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div className="leave-item" key={l.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)", flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div className="leave-info" style={{ flex: 1 }}>
                    <div className="leave-name" style={{ fontSize: 13, fontWeight: 500 }}>{l.staff}</div>
                    <div className="leave-dates" style={{ fontSize: 11, color: "var(--text3)" }}>{l.from} – {l.to} · <span style={{ fontStyle: "italic" }}>{l.reason}</span></div>
                  </div>
                  <div className="leave-actions" style={{ display: "flex", gap: 4 }}>
                    <button className="btn-approve" style={{ background: "rgba(46,204,113,0.15)", border: "none", color: "#2ecc71", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}>✓</button>
                    <button className="btn-reject" style={{ background: "rgba(232,85,85,0.15)", border: "none", color: "#e85555", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3 Layout Split Frame: Patient Registries & Clinic Bulletin Board */}
      <div className="g-7-5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        
        {/* Dynamic Real-time Recent Patients Admittance List */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Recent <em>Patients</em></div>
            <button className="sec-action">All patients →</button>
          </div>
          {livePatients.length === 0 ? (
            <div style={{ padding: 20, color: "var(--text3)", textAlign: "center", fontSize: 12 }}>No patient data populated in target collection pipeline.</div>
          ) : (
            livePatients.slice(0, 4).map((p, index) => {
              const initials = (p.name || "PT").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div key={p._id || index} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--navy3)", border: "1px solid var(--bord)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "'Cormorant Garamond', serif", color: "var(--text3)", flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{p.condition || "General Checkup Case"}</div>
                  </div>
                  <span className={`badge b-${p.status || "active"}`}>{p.status || "active"}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Central Communications Bulletin Announcements Section */}
        <div className="card card-pad">
          <div className="sec-hd">
            <div className="sec-title serif">Announcements</div>
            <button className="btn-gold" style={{ fontSize: 10, padding: "6px 12px" }}>+ Post</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {mockAnnouncements.map((a) => (
              <div className="ann-item" key={a.id} style={{ borderBottom: "1px dashed rgba(255,255,255,0.04)", paddingBottom: 8 }}>
                <div className="ann-hd" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className={`badge b-${a.priority}`} style={{ fontSize: 9, padding: "1px 5px" }}>{a.priority}</span>
                  <div className="ann-title" style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{a.title}</div>
                </div>
                <div className="ann-body" style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.4 }}>{a.body}</div>
                <div className="ann-date" style={{ fontSize: 9, color: "var(--gold)", textAlign: "right", marginTop: 2 }}>{a.date}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}





function AddPatientModal({ onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", age: "", gender: "",
    condition: "", assignedDoctor: "", sessions: 0, status: "active",
    totalAmount: 0, paidAmount: 0, address: "", emergencyContact: "", userType: "patient", imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/users/add-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || data.message || "Failed to add patient"); return; }
      alert("Patient added successfully");
      onClose();
    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="modal-backdrop mb-60">
      <div className="modal-box pt-20">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
          <div className="sec-title serif">Add <em>Patient</em></div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 18, lineHeight: 1 }}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="age" type="number" placeholder="Age" onChange={handleChange} />
          <select name="gender" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input name="condition" placeholder="Medical Condition" onChange={handleChange} required />
          <input name="assignedDoctor" placeholder="Assigned Doctor" onChange={handleChange} />
          <input name="sessions" type="number" placeholder="Total Sessions" onChange={handleChange} />
          <select name="status" onChange={handleChange}>
            <option value="active">Active</option>
            <option value="released">Released</option>
            <option value="critical">Critical</option>
          </select>
          <input name="totalAmount" type="number" placeholder="Total Amount (৳)" onChange={handleChange} />
          <input name="paidAmount" type="number" placeholder="Paid Amount (৳)" onChange={handleChange} />
          <textarea name="address" placeholder="Address" onChange={handleChange} />
          <input name="emergencyContact" placeholder="Emergency Contact" onChange={handleChange} />
          <input name="imageUrl" placeholder="Patient photo URL (e.g. https://...)"
            onChange={handleChange}
          />
          <div style={{ gridColumn: "span 2", display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-gold">Register Patient</button>
          </div>
        </form>
      </div>
    </div>
  );
}


function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:5000/users/patients");
      const data = await res.json();
      if (data.success) setPatients(data.patients);
    } catch (error) {
      console.error("Failed to connect to server:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  const filtered = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.patientId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="search-box"
          placeholder="Search patient name or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          {/* <button className="btn-outline">↓ Export</button> */}


          <button className="btn-outline" onClick={() => {
            if (!patients || patients.length === 0) { alert("No patient data to export."); return; }
            const headers = ["Patient ID", "Name", "Email", "Phone", "Age", "Gender", "Condition", "Assigned Doctor", "Sessions", "Status", "Total Amount", "Paid Amount", "Due Amount", "Address", "Emergency Contact"];
            const rows = patients.map((p) => [
              p.patientId || "N/A",
              p.name || "",
              p.email || "",
              p.phone || "",
              p.age || "",
              p.gender || "",
              p.condition || "",
              p.assignedDoctor || "",
              p.sessions ?? "",
              p.status || "active",
              p.totalAmount || 0,
              p.paidAmount || 0,
              p.dueAmount || 0,
              `"${(p.address || "").replace(/"/g, '""')}"`,
              p.emergencyContact || "",
            ]);
            const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `UPPC_Patients_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}>↓ Export</button>
          <button className="btn-gold" onClick={() => setIsAddModalOpen(true)}>+ Add Patient</button>
        </div>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
            Loading patient database…
          </div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Condition</th>
                <th>Assigned Doctor</th>
                <th>Sessions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((patient) => (
                  <tr key={patient._id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                       
                        <div>
                          {/* <div className="tbl-name">{patient.name}</div> */}
                          {/* <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                            {patient.imageUrl ? (
                              <img src={patient.imageUrl} alt={patient.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <div className="staff-avatar">
                                {patient.name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </div>
                            )}
                            <div className="staff-avatar">
                              {patient.name}
                            </div>
                          
                          </div> */}
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            {/* 1. AVATAR CONTAINER */}
                            <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                              {patient.imageUrl ? (
                                <img 
                                  src={patient.imageUrl} 
                                  alt={patient.name}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                />
                              ) : (
                                <div className="staff-avatar" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {patient.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>

                            {/* 2. TEXT CONTAINER */}
                            <div>
                              <div className="tbl-name" style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
                                {patient.name || "Unknown Patient"}
                              </div>
                              {patient.patientId && (
                                <div style={{ fontSize: 11, color: "var(--text3)" }}>
                                  {patient.patientId}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <div className="tbl-id">{patient.patientId || "N/A"}</div> */}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: "var(--text2)" }}>{patient.condition}</td>
                    <td style={{ fontSize: 12, color: "var(--text2)" }}>{patient.assignedDoctor || "—"}</td>
                    <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--gold)" }}>
                      {patient.sessions ?? "—"}
                    </td>
                    <td>
                      <span className={`badge b-${patient.status === "released" ? "discharged" : patient.status || "active"}`}>
                        {patient.status || "active"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-ghost"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isAddModalOpen && (
        <AddPatientModal onClose={() => { setIsAddModalOpen(false); fetchPatients(); }} />
      )}
      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => { setSelectedPatient(null); fetchPatients(); }}
        />
      )}
    </div>
  );
}


// ==========================================================
// ALL-IN-ONE DETAILS PROFILE MODAL WITH IN-LINE EDIT ENGINES
// ==========================================================


function PatientDetailsModal({ patient, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/users/patients/${patient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) { alert("Patient updated successfully!"); onClose(); }
    } catch { alert("Network error."); }
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove ${patient.name} permanently?`)) {
      try {
        const res = await fetch(`http://localhost:5000/users/patients/${patient._id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) { alert("Patient deleted."); onClose(); }
      } catch { alert("Deletion failed."); }
    }
  };

  const Field = ({ label, value, color }) => (
    <div>
      <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: color || "var(--text)" }}>{value || "N/A"}</div>
    </div>
  );

  return (
    <div className="modal-backdrop ">
      <div className="modal-box">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
          <div className="sec-title serif">
            {isEditing ? <>Edit <em>Record</em></> : <>Patient <em>Profile</em></>}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 18, lineHeight: 1 }}>✕</button>
        </div>

        {!isEditing ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px", marginBottom: 24 }}>
              <Field label="Patient ID" value={patient.patientId} color="var(--gold)" />
              <Field label="Full Name" value={patient.name} />
              <Field label="Email" value={patient.email} />
              <Field label="Phone" value={patient.phone} />
              <Field label="Age / Gender" value={`${patient.age || "—"} yrs / ${patient.gender || "—"}`} />
              <Field label="Condition" value={patient.condition} />
              <Field label="Assigned Doctor" value={patient.assignedDoctor} />
              <Field label="Sessions" value={patient.sessions} />
              <Field label="Total Amount" value={patient.totalAmount ? `৳${Number(patient.totalAmount).toLocaleString()}` : null} color="var(--text)" />
              <Field label="Paid" value={patient.paidAmount ? `৳${Number(patient.paidAmount).toLocaleString()}` : null} color="var(--success)" />
              <Field label="Due Balance" value={patient.dueAmount ? `৳${Number(patient.dueAmount).toLocaleString()}` : null} color="var(--warning)" />
              <div>
                <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 4 }}>Status</div>
                <span className={`badge b-${patient.status === "released" ? "discharged" : patient.status || "active"}`}>
                  {patient.status || "active"}
                </span>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <Field label="Address" value={patient.address} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <Field label="Emergency Contact" value={patient.emergencyContact} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
              <button className="btn-ghost" onClick={() => setIsEditing(true)}>Edit Record</button>
              <button className="btn-reject" style={{ fontSize: 11, letterSpacing: "0.08em" }} onClick={handleDelete}>Delete Patient</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdateSubmit} className="modal-form">
            <div style={{ gridColumn: "span 2" }}>
              <input name="name" value={form.name || ""} placeholder="Full Name" onChange={handleChange} required />
            </div>
            <input name="email" type="email" value={form.email || ""} placeholder="Email" onChange={handleChange} required />
            <input name="phone" value={form.phone || ""} placeholder="Phone" onChange={handleChange} />
            <input name="condition" value={form.condition || ""} placeholder="Condition" onChange={handleChange} required />
            <input name="assignedDoctor" value={form.assignedDoctor || ""} placeholder="Assigned Doctor" onChange={handleChange} />
            <input name="sessions" type="number" value={form.sessions || 0} placeholder="Sessions" onChange={handleChange} />
            <select name="status" value={form.status || "active"} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="released">Released</option>
              <option value="critical">Critical</option>
            </select>
            <input name="totalAmount" type="number" value={form.totalAmount || 0} placeholder="Total Amount (৳)" onChange={handleChange} />
            <input name="paidAmount" type="number" value={form.paidAmount || 0} placeholder="Paid Amount (৳)" onChange={handleChange} />
            <textarea name="address" value={form.address || ""} placeholder="Address" onChange={handleChange} />
            <input name="emergencyContact" value={form.emergencyContact || ""} placeholder="Emergency Contact" onChange={handleChange} />
            <div style={{ gridColumn: "span 2", display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>← Back</button>
              <button type="submit" className="btn-gold">Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}



// ==========================================
// NEW DETACHED EDIT PATIENT MODAL COMPONENT
// ==========================================
function EditPatientModal({ patient, onClose }) {
  const [form, setForm] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/users/patients/${patient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Patient updated successfully");
        onClose();
      } else {
        alert(data.message || "Failed to update record");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection failure");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2 className="serif" style={{ marginBottom: 18, color: "#fff" }}>
          Edit <em style={{ color: "var(--gold, #cfa153)" }}>Patient Records</em>
        </h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input name="name" value={form.name || ""} placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" value={form.email || ""} placeholder="Email" onChange={handleChange} required />
          <input name="phone" value={form.phone || ""} placeholder="Phone Number" onChange={handleChange} />
          <input name="condition" value={form.condition || ""} placeholder="Medical Condition" onChange={handleChange} required />
          <input name="assignedDoctor" value={form.assignedDoctor || ""} placeholder="Assigned Doctor" onChange={handleChange} />
          
          <select name="status" value={form.status || "active"} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="released">Released</option>
            <option value="critical">Critical</option>
          </select>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: "15px" }}>
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-gold" style={{ background: "#cfa153", color: "#000", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}






function StaffHR() {
  // Data management hook collections
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");

  // Modal Visibility control wrappers
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Modular Multi-Property Managed Input States
  const [formData, setFormData] = useState({
    name: "", role: "", dept: "", shift: "Day Shift",
    salary: "", status: "active", email: "", phone: "",
    joinsDate: "", bmdcRegistration: ""
  });

  const API_BASE = "http://localhost:5000";

  // 1. FETCH LIVE STAFF LOGS FROM ATLAS DB ON MOUNT
  const fetchStaffData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/staff`);
      if (response.ok) {
        const json = await response.json();
        setStaffList(json.data || []);
      }
    } catch (error) {
      console.error("Error communicating with HR server layer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  // 2. SUBMIT HOOK: POST COMPLETED LOG MATRIX INTO STORAGE NODES
  const handleSubmitStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await response.json();
      if (json.success) {
        alert("Success: Employee record committed safely into cluster infrastructure.");
        setIsFormOpen(false);
        // Clear forms array template
        setFormData({
          name: "", role: "", dept: "", shift: "Day Shift",
          salary: "", status: "active", email: "", phone: "",
          joinsDate: "", bmdcRegistration: ""
        });
        fetchStaffData(); // Dynamic roster redraw re-fetch query trigger
      } else {
        alert("Database transaction rejected payload layout: " + json.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network timeout writing structural execution trace packet.");
    }
  };

  // Compute filtering lists from live active data models dynamically
  const depts = ["all", ...new Set(staffList.map((s) => s.dept).filter(Boolean))];

  const filtered = staffList.filter((s) => {
    const matchSearch = (s.name || "").toLowerCase().includes(search.toLowerCase()) || 
                        (s.role || "").toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "all" || s.dept === dept;
    return matchSearch && matchDept;
  });

  if (loading) return <div style={{ padding: 40, color: "var(--text3)" }}>Assembling HR staff panels...</div>;

  return (
    <div className="fade">
      {/* Dynamic Calculated HR Stats KPIs */}
      <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Staff", val: staffList.length, sub: "All departments", color: "var(--gold)" },
          { label: "Active Today", val: staffList.filter((s) => s.status === "active").length, sub: "On duty", color: "var(--success)" },
          { label: "On Leave", val: staffList.filter((s) => s.status === "on-leave").length, sub: "Current profiles", color: "var(--warning)" },
        ].map((s) => (
          <div className="card card-sm" key={s.label} style={{ textAlign: "center", padding: 15, background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: "var(--rl)" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>{s.label}</div>
            <div className="serif" style={{ fontSize: 38, fontWeight: 300, color: s.color, marginBottom: 3 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Controller Bars layout elements */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input 
          placeholder="Search staff members…" value={search} onChange={(e) => setSearch(e.target.value)} 
          style={{ background: "var(--navy2)", border: "1px solid var(--bord)", padding: "8px 12px", color: "var(--text)", borderRadius: 4, width: 220 }}
        />
        <select 
          value={dept} onChange={(e) => setDept(e.target.value)}
          style={{ background: "var(--navy2)", border: "1px solid var(--bord)", padding: "8px 12px", color: "var(--text)", borderRadius: 4 }}
        >
          {depts.map((d) => <option key={d} value={d}>{d === "all" ? "All Departments" : d}</option>)}
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button className="btn-outline" style={{ background: "transparent", border: "1px solid var(--bord)", color: "var(--text)", padding: "8px 14px", borderRadius: 4 }}>↓ Payroll Export</button>
          {/* Active Modal trigger event registration key linkage click handler hook */}
          <button className="btn-gold" onClick={() => setIsFormOpen(true)} style={{ background: "var(--gold)", color: "var(--navy)", padding: "8px 16px", border: "none", borderRadius: 4, fontWeight: 500 }}>+ Add Staff</button>
        </div>
      </div>

      {/* Main Employee Roster Database Output Table View */}
      <div className="card" style={{ background: "var(--navy2)", border: "1px solid var(--bord)", borderRadius: "var(--rl)", overflow: "hidden" }}>
        <table className="tbl" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--bord)", color: "var(--text3)", fontSize: 11 }}>
              <th style={{ padding: 12 }}>Staff Member</th>
              <th>Department</th>
              <th>Shift</th>
              <th>Patients</th>
              <th>Salary (৳)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const avatarInitials = (s.name || "ST").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              return (
                <tr key={s._id || s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="staff-avatar" style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--navy3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--gold)", border: "1px solid var(--bord)" }}>
                        {avatarInitials}
                      </div>
                      <div>
                        <div className="tbl-name" style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                        <div className="tbl-sub" style={{ fontSize: 11, color: "var(--text3)" }}>{s.role} · ID: {s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text2)" }}>{s.dept}</td>
                  <td style={{ fontSize: 12, color: "var(--text2)" }}>{s.shift}</td>
                  <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: s.patients > 0 ? "var(--gold)" : "var(--text3)" }}>{s.patients || "—"}</td>
                  <td>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--text)" }}>৳{(s.salary || 0).toLocaleString()}</div>
                  </td>
                  <td><span className={`badge b-${s.status === "on-leave" ? "leave" : s.status}`}>{s.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-ghost" style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 11 }}>Edit</button>
                      <button className="btn-ghost" style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 11 }}>Schedule</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "var(--text3)" }}>No employee profile entries stored inside database collection logs.</div>
        )}
      </div>

      {/* ─── OVERLAY: ADD NEW STAFF PROFILE COMPLEX DIALOG OVERLAY VIEW FRAME ─── */}
      {isFormOpen && (
        <div className="hr-modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="hr-modal-window" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--bord)", paddingBottom: 12, marginBottom: 16 }}>
              <h3 className="serif" style={{ fontSize: 22, margin: 0 }}>Register New Staff Employee Document</h3>
              <button onClick={() => setIsFormOpen(false)} style={{ background: "none", border: "none", color: "var(--text3)", cursor: "pointer" }}>✕</button>
            </div>
            
            <form onSubmit={handleSubmitStaff}>
              <div className="form-grid-2">
                <div className="field">
                  <label>Full Name</label>
                  <input type="text" required placeholder="e.g. Dr. Asif Rahman" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="field">
                  <label>Contact Email</label>
                  <input type="email" required placeholder="name@uppc.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="field">
                  <label>Role Assignment Title</label>
                  <input type="text" required placeholder="e.g. Consultant Neurologist, Nurse" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                </div>
                <div className="field">
                  <label>Department Unit</label>
                  <input type="text" required placeholder="e.g. Neurology, ICU, Admin" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})} />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="field">
                  <label>Assigned Schedule Shift</label>
                  <select value={formData.shift} onChange={e => setFormData({...formData, shift: e.target.value})}>
                    <option>Day Shift</option>
                    <option>Night Shift</option>
                    <option>Rounds Evening</option>
                    <option>On-Call Weekend</option>
                  </select>
                </div>
                <div className="field">
                  <label>Base Gross Salary (৳ Monthly)</label>
                  <input type="number" required placeholder="Gross wage in BDT" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="field">
                  <label>Contact Phone Number</label>
                  <input type="text" placeholder="+880 1XXX-XXXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="field">
                  <label>BMDC Medical Council Registration No. (Optional)</label>
                  <input type="text" placeholder="BMDC-XXXXX (For Physicians)" value={formData.bmdcRegistration} onChange={e => setFormData({...formData, bmdcRegistration: e.target.value})} />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="field">
                  <label>Joining Effective Date</label>
                  <input type="date" value={formData.joinsDate} onChange={e => setFormData({...formData, joinsDate: e.target.value})} />
                </div>
                <div className="field">
                  <label>Initial Resource HR Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="active">Active On Duty</option>
                    <option value="on-leave">On Medical Leave</option>
                    <option value="suspended">Suspended Registry</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 22, borderTop: "1px solid var(--bord)", paddingTop: 14 }}>
                <button type="button" className="btn-out" onClick={() => setIsFormOpen(false)} style={{ padding: "8px 16px" }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ padding: "8px 22px" }}>Save to Database ✦</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



// ─── Appointments page ────────────────────────────────────────────────────────
function AppointmentsAdmin() {
  const [filter, setFilter] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch all requests from the backend database on initial view mount
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments");
      if (response.ok) {
        const result = await response.json();
        setAppointments(result.data);
      }
    } catch (error) {
      console.error("Admin Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔥 Function to dispatch live status modification updates
  const handleStatusUpdate = async (dbId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${dbId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Optimize local UI rendering immediately without demanding a full heavy collection reload
        setAppointments((prev) =>
          prev.map((apt) => (apt._id === dbId ? { ...apt, status: newStatus } : apt))
        );
      } else {
        alert("Failed to update status on the server.");
      }
    } catch (error) {
      console.error("Status resolution transmission crash:", error);
    }
  };

  // Adjusted filtering matches: all, pending, confirmed, or rejected strings
  const filtered = filter === "all" 
    ? appointments 
    : appointments.filter((a) => (a.status || "pending") === filter);

  if (loading) {
    return <div className="sans" style={{ padding: 40, textAlign: "center", color: "var(--text3)" }}>Loading administration queues...</div>;
  }

  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        {["all", "pending", "confirmed", "rejected"].map((f) => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            style={{ 
              padding: "8px 18px", border: "1px solid", borderRadius: "var(--radius)", 
              fontSize: 11, letterSpacing: "0.08em", textTransform: "capitalize", 
              borderColor: filter === f ? "var(--gold)" : "var(--border)", 
              background: filter === f ? "var(--gold-dim)" : "transparent", 
              color: filter === f ? "var(--gold)" : "var(--text3)", 
              transition: "all 0.2s" 
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Type</th>
              <th>Room</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "24px", color: "var(--text3)" }} className="sans">
                  No appointments found inside this queue.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a._id}>
                  {/* Combines Date + Slot into the Time column cleanly */}
                  <td style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "var(--gold)" }}>
                    {a.date} <span style={{ fontSize: 12, color: "var(--text3)" }}>({a.timeSlot})</span>
                  </td>
                  <td><div className="tbl-name">{a.patientName} <span style={{fontSize: 10, color: 'var(--text3)', display:'block'}}>ID: {a.patientId}</span></div></td>
                  <td style={{ fontSize: 12, color: "var(--text2)" }}>{a.doctorName}</td>
                  <td style={{ fontSize: 12, color: "var(--text2)" }}>{a.type}</td>
                  <td style={{ fontSize: 12, color: "var(--text3)" }}>Room {a.room || "N/A"}</td>
                  <td>
                    {/* Maps class conditional naming conventions safely matching native classes */}
                    <span className={`badge b-${a.status || 'pending'}`}>{a.status || 'pending'}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      {a.status === "pending" && (
                        <>
                          <button 
                            className="btn-ghost" 
                            style={{ color: "green", borderColor: "green" }}
                            onClick={() => handleStatusUpdate(a._id, "confirmed")}
                          >
                            Accept
                          </button>
                          <button 
                            className="btn-reject" 
                            style={{ fontSize: 10 }}
                            onClick={() => handleStatusUpdate(a._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {a.status !== "pending" && (
                        <span style={{ fontSize: 11, color: "var(--text3)", fontStyle: "italic" }}>
                          Resolved
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
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
// export default function AdminDashboard({ onLogout }) {
//   const [page, setPage] = useState("dashboard");
//   const [t0, t1] = TITLES[page] || ["", ""];

//   return (
//     <div className="shell">
//       <style>{STYLES}</style>

//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="sidebar-brand">
//           <div className="brand-tag">Admin Panel</div>
//           <div className="brand-name serif"><span>UP</span>PC</div>
//           <div className="brand-sub">Medical Centre</div>
//         </div>
//         <div className="sidebar-admin">
//           <div className="admin-avatar serif">{ADMIN.avatar}</div>
//           <div>
//             <div className="admin-name">{ADMIN.name}</div>
//             <div className="admin-role">{ADMIN.role}</div>
//           </div>
//         </div>
//         <nav className="sidebar-nav">
//           <div className="nav-section">Main</div>
//           {NAV_ITEMS.slice(0, 5).map((item) => (
//             <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
//               <span style={{ fontSize: 14, minWidth: 16, textAlign: "center" }}>{item.icon}</span>
//               <span>{item.label}</span>
//               {item.id === "appointments" && <span className="nav-badge">2</span>}
//             </div>
//           ))}
//           <div className="nav-section" style={{ marginTop: 8 }}>System</div>
//           {NAV_ITEMS.slice(5).map((item) => (
//             <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
//               <span style={{ fontSize: 14, minWidth: 16, textAlign: "center" }}>{item.icon}</span>
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </nav>
//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>
//             <span>⬡</span>
//             <span>Sign Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="main">
//         <div className="topbar">
//           <h1 className="page-title serif">{t0} <em>{t1}</em></h1>
//           <div className="topbar-right">
//             <span className="date-chip">Sun, 17 May 2026</span>
//             <div style={{ position: "relative" }}>
//               <button className="icon-btn">🔔</button>
//               <div className="dot" />
//             </div>
//             <button className="icon-btn">⚙</button>
//             <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif" }}>
//               {ADMIN.avatar}
//             </div>
//           </div>
//         </div>
//         <div className="content">
//           {page === "dashboard" && <Overview />}
//           {page === "patients" && <Patients />}
//           {page === "appointments" && <AppointmentsAdmin />}
//           {page === "staff" && <StaffHR />}
//           {page === "finance" && <Finance />}
//           {page === "reports" && <Reports />}
//           {page === "settings" && (
//             <div className="fade" style={{ color: "var(--text3)", padding: "60px 0", textAlign: "center" }}>
//               <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.3 }}>⚙</div>
//               <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}>System Settings</div>
//               <div style={{ fontSize: 13, marginTop: 8 }}>Coming soon — clinic configuration, roles & permissions</div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }




export default function AdminDashboard({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [t0, t1] = TITLES[page] || ["", ""];

  // ─── Dynamic Live Date Tokenizer ───
  // Automatically calculates and formats the current local date cleanly
  const formattedSystemDate = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  }); // Output template match example: "Wed, 10 Jun 2026"

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

      {/* Main Panel Body Canvas */}
      <main className="main">
        <div className="topbar">
          <h1 className="page-title serif">{t0} <em>{t1}</em></h1>
          <div className="topbar-right">
            
            {/* 🔥 FIXED DYNAMIC DATE CHIP */}
            <span className="date-chip">{formattedSystemDate}</span>
            
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