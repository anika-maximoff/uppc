import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PATIENT = {
  name: "Karim Uddin",
  id: "UPPC-2024-0481",
  phone: "+880 1711-234567",
  email: "karim.uddin@email.com",
  dob: "12 March 1978",
  address: "House 14, Road 5, Dhanmondi, Dhaka",
  bloodGroup: "B+",
  condition: "Post-stroke Hemiplegia",
  since: "January 2024",
  avatar: "KU",
};

const APPOINTMENTS = [
  { id: "APT-001", doctor: "Dr. Amina Khanam", spec: "Neurologist", date: "15 May 2025", time: "10:00 AM", status: "upcoming", type: "Follow-up" },
  { id: "APT-002", doctor: "Dr. Rafiq Hossain", spec: "Physiotherapist", date: "18 May 2025", time: "2:30 PM", status: "upcoming", type: "Therapy Session" },
  { id: "APT-003", doctor: "Dr. Nusrat Jahan", spec: "Physiotherapist", date: "28 Apr 2025", time: "11:00 AM", status: "completed", type: "Consultation" },
  { id: "APT-004", doctor: "Dr. Amina Khanam", spec: "Neurologist", date: "10 Apr 2025", time: "9:30 AM", status: "completed", type: "Follow-up" },
  { id: "APT-005", doctor: "Dr. Rafiq Hossain", spec: "Physiotherapist", date: "02 Mar 2025", time: "3:00 PM", status: "cancelled", type: "Therapy Session" },
];

const PRESCRIPTIONS = [
  {
    id: "RX-2025-041",
    doctor: "Dr. Amina Khanam",
    date: "28 Apr 2025",
    diagnosis: "Post-Stroke Left Hemiplegia — Ongoing Recovery",
    medicines: [
      { name: "Aspirin", dose: "75mg", freq: "Once daily", duration: "Ongoing" },
      { name: "Atorvastatin", dose: "20mg", freq: "Once at night", duration: "Ongoing" },
      { name: "Baclofen", dose: "10mg", freq: "Twice daily", duration: "3 months" },
    ],
    therapy: "Continue physiotherapy 3x per week. Focus on left-side grip exercises.",
    followUp: "15 May 2025",
  },
  {
    id: "RX-2025-018",
    doctor: "Dr. Amina Khanam",
    date: "10 Apr 2025",
    diagnosis: "Spasticity in Left Arm — Moderate",
    medicines: [
      { name: "Tizanidine", dose: "4mg", freq: "Three times daily", duration: "6 weeks" },
      { name: "Vitamin B12", dose: "1000mcg", freq: "Once daily", duration: "Ongoing" },
    ],
    therapy: "Stretching exercises twice daily. Heat therapy before sessions.",
    followUp: "28 Apr 2025",
  },
];

const BILLS = [
  { id: "BILL-2025-031", date: "28 Apr 2025", services: ["Neurology Consultation", "Physiotherapy Session x2"], total: 3500, paid: 3500, status: "paid" },
  { id: "BILL-2025-019", date: "10 Apr 2025", services: ["Neurology Consultation", "Electrotherapy"], total: 2800, paid: 1500, status: "partial" },
  { id: "BILL-2025-007", date: "02 Mar 2025", services: ["Physiotherapy Session x3", "Occupational Therapy"], total: 4200, paid: 4200, status: "paid" },
];

const DOCTORS_BOOK = [
  { id: 1, name: "Dr. Amina Khanam", spec: "Neurology & Rehabilitation", slots: ["9:00 AM", "10:30 AM", "2:00 PM"] },
  { id: 2, name: "Dr. Rafiq Hossain", spec: "Spinal Cord & Physiotherapy", slots: ["10:00 AM", "11:30 AM", "3:30 PM"] },
  { id: 3, name: "Dr. Nusrat Jahan", spec: "Physiotherapy & Mobility", slots: ["9:30 AM", "1:00 PM", "4:00 PM"] },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "appointments", label: "Appointments", icon: "◈" },
  { id: "book", label: "Book Appointment", icon: "✦" },
  { id: "prescriptions", label: "Prescriptions", icon: "◎" },
  { id: "bills", label: "Bills & Receipts", icon: "◇" },
  { id: "profile", label: "My Profile", icon: "◉" },
];

// ─── Shared Styles ─────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #07111f;
    --navy2: #0d1f33;
    --navy3: #112840;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-dim: rgba(201,168,76,0.15);
    --gold-border: rgba(201,168,76,0.2);
    --text: #ddd5c2;
    --text2: rgba(221,213,194,0.6);
    --text3: rgba(221,213,194,0.35);
    --border: rgba(201,168,76,0.12);
    --success: #2eb87a;
    --warning: #e8a030;
    --danger: #e85555;
    --info: #4a9fd4;
    --radius: 6px;
    --radius-lg: 12px;
  }
  body { background: var(--navy); color: var(--text); font-family: 'DM Sans', sans-serif; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .sans { font-family: 'DM Sans', sans-serif; }
  button { cursor: pointer; }
  input, select, textarea { outline: none; font-family: 'DM Sans', sans-serif; }

  /* Layout */
  .portal-shell { display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar { width: 260px; min-height: 100vh; background: var(--navy2); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
  .sidebar-logo { padding: 28px 28px 20px; border-bottom: 1px solid var(--border); }
  .logo-text { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: 0.04em; }
  .logo-sub { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text3); margin-top: 3px; }
  .sidebar-patient { padding: 20px 28px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
  .patient-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--gold-dim); border: 1px solid var(--gold-border); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 15px; color: var(--gold); flex-shrink: 0; }
  .patient-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .patient-id { font-size: 10px; color: var(--text3); letter-spacing: 0.06em; margin-top: 2px; }
  .sidebar-nav { flex: 1; padding: 16px 0; overflow-y: auto; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 28px; font-size: 13px; color: var(--text2); cursor: pointer; transition: all 0.2s; border-left: 2px solid transparent; }
  .nav-item:hover { color: var(--text); background: rgba(201,168,76,0.04); }
  .nav-item.active { color: var(--gold); border-left-color: var(--gold); background: var(--gold-dim); }
  .nav-icon { font-size: 14px; width: 18px; text-align: center; }
  .sidebar-footer { padding: 20px 28px; border-top: 1px solid var(--border); }
  .logout-btn { display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--text3); background: none; border: none; padding: 0; transition: color 0.2s; letter-spacing: 0.06em; }
  .logout-btn:hover { color: var(--danger); }

  /* Main */
  .main-content { margin-left: 260px; flex: 1; min-height: 100vh; background: var(--navy); }
  .top-bar { padding: 20px 40px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: rgba(7,17,31,0.8); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 40; }
  .page-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; }
  .page-title span { color: var(--gold); font-style: italic; }
  .top-actions { display: flex; align-items: center; gap: 16px; }
  .notif-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--navy2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--text2); transition: all 0.2s; }
  .notif-btn:hover { border-color: var(--gold-border); color: var(--gold); }
  .content-area { padding: 36px 40px; }

  /* Cards */
  .card { background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; }
  .card-sm { background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 22px; }

  /* Stats Row */
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 22px 24px; transition: border-color 0.2s; }
  .stat-card:hover { border-color: var(--gold-border); }
  .stat-card-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text3); margin-bottom: 10px; }
  .stat-card-value { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 4px; }
  .stat-card-sub { font-size: 12px; color: var(--text3); }
  .stat-card-icon { font-size: 20px; float: right; opacity: 0.4; }

  /* Grid layouts */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  /* Section headers */
  .section-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-hd-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; }
  .section-hd-title span { color: var(--gold); font-style: italic; }
  .link-btn { font-size: 12px; color: var(--gold); letter-spacing: 0.08em; background: none; border: none; padding: 0; transition: opacity 0.2s; }
  .link-btn:hover { opacity: 0.7; }

  /* Status badges */
  .badge { display: inline-block; font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
  .badge-upcoming { background: rgba(74,159,212,0.15); color: var(--info); }
  .badge-completed { background: rgba(46,184,122,0.15); color: var(--success); }
  .badge-cancelled { background: rgba(232,85,85,0.12); color: var(--danger); }
  .badge-paid { background: rgba(46,184,122,0.15); color: var(--success); }
  .badge-partial { background: rgba(232,160,48,0.15); color: var(--warning); }
  .badge-overdue { background: rgba(232,85,85,0.12); color: var(--danger); }

  /* Appointment list */
  .appt-item { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--border); }
  .appt-item:last-child { border-bottom: none; padding-bottom: 0; }
  .appt-item:first-child { padding-top: 0; }
  .appt-date-box { min-width: 52px; text-align: center; background: var(--gold-dim); border: 1px solid var(--gold-border); border-radius: var(--radius); padding: 8px 6px; }
  .appt-date-day { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: var(--gold); line-height: 1; }
  .appt-date-mon { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text3); margin-top: 2px; }
  .appt-info { flex: 1; }
  .appt-doctor { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
  .appt-meta { font-size: 12px; color: var(--text3); }
  .appt-time { font-size: 12px; color: var(--text2); text-align: right; }

  /* Progress tracker */
  .progress-track { display: flex; align-items: center; gap: 0; margin: 20px 0; }
  .progress-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
  .progress-step-circle { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--border); background: var(--navy2); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--text3); position: relative; z-index: 2; }
  .progress-step.done .progress-step-circle { border-color: var(--success); background: rgba(46,184,122,0.12); color: var(--success); }
  .progress-step.active .progress-step-circle { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }
  .progress-step-label { font-size: 10px; color: var(--text3); margin-top: 6px; letter-spacing: 0.06em; text-align: center; }
  .progress-step.done .progress-step-label, .progress-step.active .progress-step-label { color: var(--text2); }
  .progress-line { flex: 1; height: 1px; background: var(--border); margin-top: -20px; }
  .progress-line.done { background: var(--success); opacity: 0.4; }

  /* Prescription card */
  .rx-card { background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; margin-bottom: 16px; transition: border-color 0.2s; }
  .rx-card:hover { border-color: var(--gold-border); }
  .rx-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
  .rx-id { font-size: 11px; letter-spacing: 0.12em; color: var(--gold); margin-bottom: 6px; }
  .rx-diagnosis { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; line-height: 1.3; }
  .rx-doctor { font-size: 12px; color: var(--text3); margin-top: 4px; }
  .rx-meds { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 16px; }
  .med-item { background: var(--navy3); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; }
  .med-name { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 4px; }
  .med-detail { font-size: 11px; color: var(--text3); line-height: 1.6; }
  .rx-therapy { background: rgba(201,168,76,0.04); border: 1px solid var(--gold-border); border-radius: var(--radius); padding: 12px 14px; font-size: 13px; color: var(--text2); line-height: 1.6; }
  .rx-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
  .rx-followup { font-size: 12px; color: var(--text3); }
  .rx-followup span { color: var(--gold); font-weight: 500; }

  /* Bill table */
  .bill-table { width: 100%; border-collapse: collapse; }
  .bill-table th { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); padding: 10px 16px; text-align: left; border-bottom: 1px solid var(--border); font-weight: 400; }
  .bill-table td { padding: 16px; font-size: 13px; color: var(--text2); border-bottom: 1px solid rgba(201,168,76,0.06); vertical-align: top; }
  .bill-table tr:last-child td { border-bottom: none; }
  .bill-table tr:hover td { background: rgba(201,168,76,0.02); }
  .bill-id { font-size: 11px; color: var(--gold); letter-spacing: 0.08em; margin-bottom: 4px; }
  .bill-services { font-size: 12px; color: var(--text3); margin-top: 2px; }
  .bill-amount { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: var(--text); }
  .bill-paid { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .download-btn { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 7px 14px; border: 1px solid var(--border); color: var(--text3); background: none; border-radius: var(--radius); transition: all 0.2s; }
  .download-btn:hover { border-color: var(--gold-border); color: var(--gold); }

  /* Book form */
  .book-step { display: flex; gap: 12px; align-items: center; margin-bottom: 32px; }
  .book-step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--gold-dim); border: 1px solid var(--gold-border); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--gold); flex-shrink: 0; font-family: 'Cormorant Garamond', serif; }
  .book-step-label { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); }
  .field-group { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .field { display: flex; flex-direction: column; gap: 7px; }
  .field label { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text3); }
  .field input, .field select, .field textarea { background: var(--navy3); border: 1px solid var(--border); border-radius: var(--radius); padding: 11px 14px; font-size: 13px; color: var(--text); transition: border-color 0.2s; }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--gold-border); }
  .field input::placeholder, .field select::placeholder { color: var(--text3); }
  .field select option { background: var(--navy2); }
  .slot-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
  .slot-btn { padding: 9px 18px; border: 1px solid var(--border); border-radius: var(--radius); font-size: 13px; color: var(--text2); background: var(--navy3); transition: all 0.2s; }
  .slot-btn:hover { border-color: var(--gold-border); color: var(--gold); }
  .slot-btn.selected { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }
  .doctor-select-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
  .doctor-select-card { background: var(--navy3); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; cursor: pointer; transition: all 0.2s; }
  .doctor-select-card:hover { border-color: var(--gold-border); }
  .doctor-select-card.selected { border-color: var(--gold); background: var(--gold-dim); }
  .doctor-select-name { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
  .doctor-select-spec { font-size: 11px; color: var(--text3); }

  /* Profile */
  .profile-header { display: flex; align-items: center; gap: 24px; padding: 28px; background: var(--navy2); border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: 24px; }
  .profile-avatar { width: 72px; height: 72px; border-radius: 50%; background: var(--gold-dim); border: 2px solid var(--gold-border); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 28px; color: var(--gold); flex-shrink: 0; }
  .profile-name { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; margin-bottom: 4px; }
  .profile-condition { font-size: 12px; color: var(--gold); letter-spacing: 0.06em; }
  .profile-since { font-size: 12px; color: var(--text3); margin-top: 4px; }
  .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .info-item { padding: 14px 18px; background: var(--navy3); border: 1px solid var(--border); border-radius: var(--radius); }
  .info-item label { display: block; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); margin-bottom: 5px; }
  .info-item span { font-size: 14px; color: var(--text); }

  /* Buttons */
  .btn-gold { background: var(--gold); color: var(--navy); font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 12px 28px; border: none; border-radius: var(--radius); transition: all 0.2s; }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,0.2); }
  .btn-outline { background: transparent; color: var(--gold); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; padding: 11px 24px; border: 1px solid var(--gold-border); border-radius: var(--radius); transition: all 0.2s; }
  .btn-outline:hover { background: var(--gold-dim); }

  /* Divider label */
  .divider-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text3); display: flex; align-items: center; gap: 12px; margin: 24px 0 16px; }
  .divider-label::before, .divider-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  /* Empty state */
  .empty-state { text-align: center; padding: 60px 20px; color: var(--text3); }
  .empty-state-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.3; }
  .empty-state-text { font-size: 14px; }

  /* Notification dot */
  .notif-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); position: absolute; top: 6px; right: 6px; }

  /* Recovery progress bar */
  .recovery-bar-wrap { background: var(--navy3); border-radius: 4px; height: 6px; overflow: hidden; margin-top: 8px; }
  .recovery-bar { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); transition: width 1s ease; }

  /* Toast-like success */
  .confirm-box { background: rgba(46,184,122,0.08); border: 1px solid rgba(46,184,122,0.25); border-radius: var(--radius-lg); padding: 24px; text-align: center; }
  .confirm-icon { font-size: 36px; margin-bottom: 12px; }
  .confirm-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; margin-bottom: 8px; color: var(--success); }
  .confirm-sub { font-size: 13px; color: var(--text3); }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.35s ease forwards; }

  @media (max-width: 900px) {
    .sidebar { width: 220px; }
    .main-content { margin-left: 220px; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .grid-2, .doctor-select-grid { grid-template-columns: 1fr; }
    .content-area { padding: 24px 20px; }
    .top-bar { padding: 16px 20px; }
  }
  @media (max-width: 640px) {
    .sidebar { display: none; }
    .main-content { margin-left: 0; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .bill-table thead { display: none; }
    .field-group { grid-template-columns: 1fr; }
  }
`;

// ─── Sub-pages ─────────────────────────────────────────────────────────────

function Dashboard({ setPage }) {
  const upcoming = APPOINTMENTS.filter((a) => a.status === "upcoming");
  return (
    <div className="fade-in">
      {/* Welcome */}
      <div style={{ marginBottom: 28, padding: "24px 28px", background: "linear-gradient(135deg, rgba(201,168,76,0.08), transparent)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Good morning</div>
          <div className="serif" style={{ fontSize: 30, fontWeight: 300, marginBottom: 4 }}>Welcome back, <em style={{ color: "var(--gold)" }}>Karim</em></div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>Patient ID: {PATIENT.id} · Condition: {PATIENT.condition}</div>
        </div>
        <button className="btn-gold sans" onClick={() => setPage("book")}>+ Book Appointment</button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {[
          { label: "Upcoming", value: "2", sub: "Appointments", icon: "◈" },
          { label: "Sessions Done", value: "14", sub: "This year", icon: "✓" },
          { label: "Prescriptions", value: "2", sub: "Active", icon: "◎" },
          { label: "Outstanding", value: "৳1,300", sub: "Balance due", icon: "◇" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div className="stat-card-label sans">{s.label}</div>
              <span style={{ fontSize: 18, opacity: 0.25, color: "var(--gold)" }}>{s.icon}</span>
            </div>
            <div className="stat-card-value serif">{s.value}</div>
            <div className="stat-card-sub sans">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 20 }}>
        {/* Upcoming appointments */}
        <div className="card">
          <div className="section-hd">
            <div className="section-hd-title serif">Upcoming <span>Appointments</span></div>
            <button className="link-btn sans" onClick={() => setPage("appointments")}>View all →</button>
          </div>
          {upcoming.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">◈</div><div className="empty-state-text sans">No upcoming appointments</div></div>
          ) : (
            upcoming.map((a) => {
              const [day, mon] = a.date.split(" ");
              return (
                <div className="appt-item" key={a.id}>
                  <div className="appt-date-box">
                    <div className="appt-date-day serif">{day}</div>
                    <div className="appt-date-mon sans">{mon}</div>
                  </div>
                  <div className="appt-info">
                    <div className="appt-doctor sans">{a.doctor}</div>
                    <div className="appt-meta sans">{a.type} · {a.spec}</div>
                  </div>
                  <div className="appt-time sans">{a.time}</div>
                </div>
              );
            })
          )}
        </div>

        {/* Recovery progress */}
        <div className="card">
          <div className="section-hd">
            <div className="section-hd-title serif">Recovery <span>Progress</span></div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }} className="sans">Left-side Motor Function</span>
              <span style={{ fontSize: 13, color: "var(--gold)" }} className="sans">68%</span>
            </div>
            <div className="recovery-bar-wrap"><div className="recovery-bar" style={{ width: "68%" }} /></div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }} className="sans">Speech Clarity</span>
              <span style={{ fontSize: 13, color: "var(--gold)" }} className="sans">84%</span>
            </div>
            <div className="recovery-bar-wrap"><div className="recovery-bar" style={{ width: "84%" }} /></div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }} className="sans">Balance & Coordination</span>
              <span style={{ fontSize: 13, color: "var(--gold)" }} className="sans">52%</span>
            </div>
            <div className="recovery-bar-wrap"><div className="recovery-bar" style={{ width: "52%" }} /></div>
          </div>
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }} className="sans">Grip Strength</span>
              <span style={{ fontSize: 13, color: "var(--gold)" }} className="sans">45%</span>
            </div>
            <div className="recovery-bar-wrap"><div className="recovery-bar" style={{ width: "45%" }} /></div>
          </div>
          <div style={{ marginTop: 18, padding: "12px 14px", background: "var(--navy3)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }} className="sans">
            📋 Last updated by Dr. Amina Khanam · 28 Apr 2025
          </div>
        </div>
      </div>

      {/* Recent prescription */}
      <div style={{ marginTop: 20 }}>
        <div className="card">
          <div className="section-hd">
            <div className="section-hd-title serif">Latest <span>Prescription</span></div>
            <button className="link-btn sans" onClick={() => setPage("prescriptions")}>View all →</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {PRESCRIPTIONS[0].medicines.map((m, i) => (
              <div key={i} className="med-item" style={{ minWidth: 180 }}>
                <div className="med-name sans">{m.name} — {m.dose}</div>
                <div className="med-detail sans">{m.freq} · {m.duration}</div>
              </div>
            ))}
          </div>
          <div className="rx-therapy sans" style={{ marginTop: 14 }}>
            🌿 {PRESCRIPTIONS[0].therapy}
          </div>
        </div>
      </div>
    </div>
  );
}

function Appointments({ setPage }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? APPOINTMENTS : APPOINTMENTS.filter((a) => a.status === filter);
  return (
    <div className="fade-in">
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {["all", "upcoming", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 18px", border: "1px solid", borderRadius: "var(--radius)",
              fontSize: 12, letterSpacing: "0.08em", textTransform: "capitalize",
              borderColor: filter === f ? "var(--gold)" : "var(--border)",
              background: filter === f ? "var(--gold-dim)" : "transparent",
              color: filter === f ? "var(--gold)" : "var(--text3)",
              transition: "all 0.2s",
            }}
            className="sans"
          >{f}</button>
        ))}
        <button className="btn-gold sans" style={{ marginLeft: "auto" }} onClick={() => setPage("book")}>+ New Appointment</button>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">◈</div><div className="empty-state-text sans">No appointments found</div></div>
        ) : (
          filtered.map((a) => {
            const [day, mon, yr] = a.date.split(" ");
            return (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="appt-date-box">
                  <div className="appt-date-day serif">{day}</div>
                  <div className="appt-date-mon sans">{mon}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 4 }} className="sans">{a.doctor}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }} className="sans">{a.type} · {a.spec} · {a.time}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }} className="sans">Ref: {a.id}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <span className={`badge badge-${a.status}`}>{a.status}</span>
                  {a.status === "upcoming" && (
                    <button className="download-btn sans">Reschedule</button>
                  )}
                  {a.status === "completed" && (
                    <button className="download-btn sans">View Notes</button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function BookAppointment() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);

  const doctor = DOCTORS_BOOK.find((d) => d.id === selectedDoctor);

  if (booked) {
    return (
      <div className="fade-in" style={{ maxWidth: 500, margin: "0 auto", paddingTop: 40 }}>
        <div className="confirm-box">
          <div className="confirm-icon">✦</div>
          <div className="confirm-title serif">Appointment Booked!</div>
          <div className="confirm-sub sans" style={{ marginBottom: 20 }}>
            Your appointment with <strong style={{ color: "var(--text)" }}>{doctor?.name}</strong> on <strong style={{ color: "var(--text)" }}>{date}</strong> at <strong style={{ color: "var(--text)" }}>{selectedSlot}</strong> has been confirmed. A confirmation will be sent to your phone and email.
          </div>
          <button className="btn-outline sans" onClick={() => { setBooked(false); setStep(1); setSelectedDoctor(null); setSelectedSlot(null); setDate(""); }}>
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      {/* Step indicator */}
      <div className="progress-track" style={{ marginBottom: 36 }}>
        {["Select Doctor", "Choose Date", "Confirm"].map((label, i) => (
          <>
            <div className={`progress-step ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`} key={label}>
              <div className="progress-step-circle">{step > i + 1 ? "✓" : i + 1}</div>
              <div className="progress-step-label sans">{label}</div>
            </div>
            {i < 2 && <div className={`progress-line ${step > i + 1 ? "done" : ""}`} />}
          </>
        ))}
      </div>

      {step === 1 && (
        <div className="fade-in">
          <div className="book-step">
            <div className="book-step-num serif">1</div>
            <div className="book-step-label sans">Select a Specialist</div>
          </div>
          <div className="doctor-select-grid">
            {DOCTORS_BOOK.map((d) => (
              <div
                key={d.id}
                className={`doctor-select-card ${selectedDoctor === d.id ? "selected" : ""}`}
                onClick={() => setSelectedDoctor(d.id)}
              >
                <div style={{ fontSize: 24, marginBottom: 10 }}>👨‍⚕️</div>
                <div className="doctor-select-name sans">{d.name}</div>
                <div className="doctor-select-spec sans">{d.spec}</div>
              </div>
            ))}
          </div>
          <div className="field" style={{ marginBottom: 20 }}>
            <label className="sans">Appointment Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select type…</option>
              <option>New Consultation</option>
              <option>Follow-up</option>
              <option>Therapy Session</option>
              <option>Emergency</option>
            </select>
          </div>
          <button
            className="btn-gold sans"
            disabled={!selectedDoctor || !type}
            style={{ opacity: !selectedDoctor || !type ? 0.5 : 1 }}
            onClick={() => setStep(2)}
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in">
          <div className="book-step">
            <div className="book-step-num serif">2</div>
            <div className="book-step-label sans">Choose Date & Time</div>
          </div>
          <div style={{ padding: "16px 20px", background: "var(--gold-dim)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius)", marginBottom: 24, fontSize: 13, color: "var(--text2)" }} className="sans">
            📋 Booking with: <strong style={{ color: "var(--gold)" }}>{doctor?.name}</strong> — {type}
          </div>
          <div className="field" style={{ marginBottom: 20 }}>
            <label className="sans">Preferred Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
          </div>
          {date && (
            <div className="field" style={{ marginBottom: 24 }}>
              <label className="sans">Available Time Slots</label>
              <div className="slot-grid">
                {doctor?.slots.map((s) => (
                  <button key={s} className={`slot-btn sans ${selectedSlot === s ? "selected" : ""}`} onClick={() => setSelectedSlot(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
          <div className="field" style={{ marginBottom: 24 }}>
            <label className="sans">Notes for Doctor (optional)</label>
            <textarea rows={3} placeholder="Describe your current symptoms or reason for visit…" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-outline sans" onClick={() => setStep(1)}>← Back</button>
            <button
              className="btn-gold sans"
              disabled={!date || !selectedSlot}
              style={{ opacity: !date || !selectedSlot ? 0.5 : 1 }}
              onClick={() => setStep(3)}
            >
              Review →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fade-in">
          <div className="book-step">
            <div className="book-step-num serif">3</div>
            <div className="book-step-label sans">Confirm Appointment</div>
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            {[
              ["Doctor", doctor?.name],
              ["Specialisation", doctor?.spec],
              ["Type", type],
              ["Date", date],
              ["Time", selectedSlot],
              ["Patient", PATIENT.name],
              ["Patient ID", PATIENT.id],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", padding: "12px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                <span style={{ color: "var(--text3)", width: 140, flexShrink: 0 }} className="sans">{k}</span>
                <span style={{ color: "var(--text)" }} className="sans">{v}</span>
              </div>
            ))}
            {notes && (
              <div style={{ display: "flex", padding: "12px 0", fontSize: 13 }}>
                <span style={{ color: "var(--text3)", width: 140, flexShrink: 0 }} className="sans">Notes</span>
                <span style={{ color: "var(--text2)" }} className="sans">{notes}</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-outline sans" onClick={() => setStep(2)}>← Back</button>
            <button className="btn-gold sans" onClick={() => setBooked(true)}>Confirm Booking ✦</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Prescriptions() {
  const [expanded, setExpanded] = useState(0);
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20, padding: "12px 18px", background: "rgba(201,168,76,0.04)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--text3)" }} className="sans">
        ⚕️ Prescriptions are issued by your treating doctor and linked to your appointment. Only your assigned doctor or an administrator may edit them.
      </div>
      {PRESCRIPTIONS.map((rx, i) => (
        <div className="rx-card" key={rx.id}>
          <div className="rx-header">
            <div>
              <div className="rx-id sans">{rx.id}</div>
              <div className="rx-diagnosis serif">{rx.diagnosis}</div>
              <div className="rx-doctor sans">{rx.doctor} · {rx.date}</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <button className="download-btn sans" onClick={() => setExpanded(expanded === i ? -1 : i)}>
                {expanded === i ? "Collapse" : "View Details"}
              </button>
              <button className="download-btn sans">↓ PDF</button>
            </div>
          </div>

          {expanded === i && (
            <div className="fade-in">
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }} className="sans">Prescribed Medicines</div>
              <div className="rx-meds">
                {rx.medicines.map((m, j) => (
                  <div className="med-item" key={j}>
                    <div className="med-name sans">{m.name}</div>
                    <div className="med-detail sans">
                      Dose: {m.dose}<br />
                      {m.freq} · {m.duration}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", margin: "16px 0 8px" }} className="sans">Therapy Instructions</div>
              <div className="rx-therapy sans">{rx.therapy}</div>
              <div className="rx-footer">
                <div className="rx-followup sans">Follow-up date: <span>{rx.followUp}</span></div>
                <button className="btn-outline sans" style={{ fontSize: 11 }}>Book Follow-up</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Bills() {
  return (
    <div className="fade-in">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Billed", value: "৳10,500", sub: "2025 to date", color: "var(--text)" },
          { label: "Total Paid", value: "৳9,200", sub: "Across all bills", color: "var(--success)" },
          { label: "Outstanding", value: "৳1,300", sub: "Balance due", color: "var(--warning)" },
        ].map((s) => (
          <div className="card-sm" key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }} className="sans">{s.label}</div>
            <div className="serif" style={{ fontSize: 36, fontWeight: 300, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text3)" }} className="sans">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <div className="section-hd-title serif">Bills & <span>Receipts</span></div>
        </div>
        <table className="bill-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="sans">Bill</th>
              <th className="sans">Date</th>
              <th className="sans">Amount</th>
              <th className="sans">Status</th>
              <th className="sans">Action</th>
            </tr>
          </thead>
          <tbody>
            {BILLS.map((b) => (
              <tr key={b.id}>
                <td>
                  <div className="bill-id sans">{b.id}</div>
                  <div className="bill-services sans">{b.services.join(" · ")}</div>
                </td>
                <td className="sans">{b.date}</td>
                <td>
                  <div className="bill-amount serif">৳{b.total.toLocaleString()}</div>
                  {b.status === "partial" && (
                    <div className="bill-paid sans">Paid: ৳{b.paid.toLocaleString()} · Due: ৳{(b.total - b.paid).toLocaleString()}</div>
                  )}
                </td>
                <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="download-btn sans">↓ Receipt</button>
                    {b.status === "partial" && <button className="btn-gold sans" style={{ fontSize: 11, padding: "7px 14px" }}>Pay Now</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, padding: "14px 18px", background: "var(--navy2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--text3)", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="sans">
        <span>💳 Pay outstanding balance securely via bKash, Nagad, or card</span>
        <button className="btn-gold sans" style={{ fontSize: 11, padding: "9px 20px" }}>Pay ৳1,300 Now</button>
      </div>
    </div>
  );
}

function Profile() {
  const [editing, setEditing] = useState(false);
  return (
    <div className="fade-in">
      <div className="profile-header">
        <div className="profile-avatar serif">{PATIENT.avatar}</div>
        <div style={{ flex: 1 }}>
          <div className="profile-name serif">{PATIENT.name}</div>
          <div className="profile-condition sans">{PATIENT.condition}</div>
          <div className="profile-since sans">Patient since {PATIENT.since} · {PATIENT.id}</div>
        </div>
        <button className="btn-outline sans" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid-2" style={{ gap: 20 }}>
        <div className="card">
          <div className="section-hd-title serif" style={{ marginBottom: 16 }}>Personal <span>Information</span></div>
          {editing ? (
            <div>
              <div className="field-group">
                <div className="field"><label className="sans">Full Name</label><input defaultValue={PATIENT.name} /></div>
                <div className="field"><label className="sans">Date of Birth</label><input defaultValue={PATIENT.dob} /></div>
              </div>
              <div className="field-group">
                <div className="field"><label className="sans">Phone</label><input defaultValue={PATIENT.phone} /></div>
                <div className="field"><label className="sans">Email</label><input defaultValue={PATIENT.email} /></div>
              </div>
              <div className="field" style={{ marginBottom: 16 }}>
                <label className="sans">Address</label>
                <textarea rows={2} defaultValue={PATIENT.address} style={{ resize: "vertical" }} />
              </div>
              <button className="btn-gold sans" onClick={() => setEditing(false)}>Save Changes</button>
            </div>
          ) : (
            <div className="info-grid">
              {[
                ["Full Name", PATIENT.name],
                ["Date of Birth", PATIENT.dob],
                ["Blood Group", PATIENT.bloodGroup],
                ["Phone", PATIENT.phone],
                ["Email", PATIENT.email],
                ["Address", PATIENT.address],
              ].map(([k, v]) => (
                <div className="info-item" key={k} style={k === "Address" || k === "Email" ? { gridColumn: "span 2" } : {}}>
                  <label className="sans">{k}</label>
                  <span className="sans">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="section-hd-title serif" style={{ marginBottom: 16 }}>Medical <span>Summary</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Primary Condition", PATIENT.condition],
                ["Treating Doctor", "Dr. Amina Khanam"],
                ["Patient Since", PATIENT.since],
                ["Total Sessions", "14 completed"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                  <span style={{ color: "var(--text3)" }} className="sans">{k}</span>
                  <span style={{ color: "var(--text)" }} className="sans">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="section-hd-title serif" style={{ marginBottom: 16 }}>Account <span>Security</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="btn-outline sans" style={{ justifyContent: "flex-start" }}>🔒 Change Password</button>
              <button className="btn-outline sans" style={{ justifyContent: "flex-start" }}>📱 Update Phone / OTP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page titles ───────────────────────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: ["Patient", "Dashboard"],
  appointments: ["My", "Appointments"],
  book: ["Book an", "Appointment"],
  prescriptions: ["My", "Prescriptions"],
  bills: ["Bills &", "Receipts"],
  profile: ["My", "Profile"],
};

// ─── Root component ─────────────────────────────────────────────────────────
export default function PatientPortal({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [title0, title1] = PAGE_TITLES[page];

  return (
    <div className="portal-shell">
      <style>{STYLES}</style>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-text serif"><span style={{ color: "var(--gold)" }}>UP</span>PC</div>
          <div className="logo-sub sans">Patient Portal</div>
        </div>
        <div className="sidebar-patient">
          <div className="patient-avatar serif">{PATIENT.avatar}</div>
          <div>
            <div className="patient-name sans">{PATIENT.name}</div>
            <div className="patient-id sans">{PATIENT.id}</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`nav-item sans ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn sans" onClick={onLogout}>Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="top-bar">
          <h1 className="page-title serif">{title0} <span>{title1}</span></h1>
          <div className="top-actions">
            <div style={{ position: "relative" }}>
              <button className="notif-btn">🔔</button>
              <div className="notif-dot" />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--gold-dim)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif" }}>
              {PATIENT.avatar}
            </div>
          </div>
        </div>
        <div className="content-area">
          {page === "dashboard" && <Dashboard setPage={setPage} />}
          {page === "appointments" && <Appointments setPage={setPage} />}
          {page === "book" && <BookAppointment />}
          {page === "prescriptions" && <Prescriptions />}
          {page === "bills" && <Bills />}
          {page === "profile" && <Profile />}
        </div>
      </main>
    </div>
  );
}
