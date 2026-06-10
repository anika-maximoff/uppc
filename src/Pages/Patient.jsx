import React, { useState, useEffect } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PATIENT = JSON.parse(localStorage.getItem("user")) || {
  name: "Guest", id: "N/A", phone: "", email: "",
  dob: "", address: "", bloodGroup: "", condition: "", since: "", avatar: "GU"
};


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
  { id: 1, name: "Mahade Hasan Faisal", spec: "Neurology & Rehabilitation", slots: ["9:00 AM", "10:30 AM", "2:00 PM"] },
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

// function Dashboard({ setPage }) {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Read the logged-in patient from localStorage
//   const PATIENT = JSON.parse(localStorage.getItem("user")) || {};

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Filter appointments by this patient's ID only
//         const response = await fetch(
//           `http://localhost:5000/api/appointments?patientId=${PATIENT.patientId}`
//         );
//         if (response.ok) {
//           const result = await response.json();
//           setAppointments(result.data || []);
//         }
//       } catch (error) {
//         console.error("Dashboard fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   // Derive counts from real appointment data
//   const confirmedAppointments = appointments.filter(a => a.status === "confirmed");
//   const pendingCount = appointments.filter(a => a.status === "pending").length;
//   const upcomingAppointments = [...confirmedAppointments]
//     .sort((a, b) => new Date(a.date) - new Date(b.date))
//     .slice(0, 3);

//   // Due amount comes directly from localStorage (saved at login)
//   const dueAmount = Number(PATIENT.dueAmount) || 0;
//   const totalAmount = Number(PATIENT.totalAmount) || 0;
//   const paidAmount = Number(PATIENT.paidAmount) || 0;

//   if (loading) {
//     return (
//       <div style={{ padding: 60, textAlign: "center", color: "var(--text3)", fontFamily: "DM Sans, sans-serif" }}>
//         Loading overview…
//       </div>
//     );
//   }

//   return (
//     <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>

//       {/* ── Welcome Banner ── */}
//       <div style={{
//         background: "var(--navy3)", border: "1px solid var(--gold-border)",
//         borderRadius: "var(--radius-lg)", padding: "24px 28px",
//         display: "flex", alignItems: "center", justifyContent: "space-between"
//       }}>
//         <div>
//           <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }} className="sans">
//             Welcome back
//           </div>
//           <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, fontWeight: 300 }}>
//             {PATIENT.name?.split(" ")[0]} <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
//               {PATIENT.name?.split(" ").slice(1).join(" ")}
//             </span>
//           </div>
//           <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }} className="sans">
//             {PATIENT.condition || "Patient"} · ID: {PATIENT.patientId || "N/A"}
//           </div>
//         </div>

//         {/* Avatar */}
//         <div style={{
//           width: 64, height: 64, borderRadius: "50%", overflow: "hidden",
//           border: "2px solid var(--gold-border)", flexShrink: 0,
//           background: "var(--gold-dim)", display: "flex", alignItems: "center",
//           justifyContent: "center", fontFamily: "Cormorant Garamond, serif",
//           fontSize: 24, color: "var(--gold)"
//         }}>
//           {PATIENT.imageUrl ? (
//             <img src={PATIENT.imageUrl} alt={PATIENT.name}
//               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//           ) : (
//             PATIENT.avatar || "P"
//           )}
//         </div>
//       </div>

//       {/* ── 4 KPI Cards ── */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
//         {[
//           { label: "Total Appointments", value: appointments.length, color: "var(--gold)" },
//           { label: "Confirmed", value: confirmedAppointments.length, color: "var(--success)" },
//           { label: "Pending Approval", value: pendingCount, color: "var(--warning)" },
//           { label: "Amount Due", value: `৳${dueAmount.toLocaleString()}`, color: dueAmount > 0 ? "var(--danger)" : "var(--success)" },
//         ].map((s, i) => (
//           <div key={i} className="card" style={{ transition: "border-color 0.2s" }}
//             onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold-border)"}
//             onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
//           >
//             <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }} className="sans">
//               {s.label}
//             </div>
//             <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 300, color: s.color, lineHeight: 1 }}>
//               {s.value}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ── Bottom Row: Upcoming Appointments + Billing Summary ── */}
//       <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>

//         {/* Upcoming / Confirmed Appointments */}
//         <div className="card">
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
//             <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20 }}>
//               Upcoming <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Appointments</span>
//             </div>
//             <button className="link-btn sans" onClick={() => setPage("appointments")}>
//               View all →
//             </button>
//           </div>

//           {upcomingAppointments.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-state-icon">◈</div>
//               <div className="empty-state-text sans">No confirmed appointments yet</div>
//             </div>
//           ) : (
//             upcomingAppointments.map((a) => {
//               const dateParts = a.date?.includes("-")
//                 ? (() => {
//                     const [, m, d] = a.date.split("-");
//                     const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//                     return { day: d, mon: months[parseInt(m) - 1] };
//                   })()
//                 : { day: a.date?.split(" ")[0], mon: a.date?.split(" ")[1] };

//               return (
//                 <div key={a._id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
//                   <div className="appt-date-box">
//                     <div className="appt-date-day serif">{dateParts.day}</div>
//                     <div className="appt-date-mon sans">{dateParts.mon}</div>
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }} className="sans">
//                       {a.doctorName}
//                     </div>
//                     <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 3 }} className="sans">
//                       {a.type} · {a.timeSlot}
//                     </div>
//                   </div>
//                   <span className="badge badge-confirmed">confirmed</span>
//                 </div>
//               );
//             })
//           )}

//           <button className="btn-outline sans" style={{ width: "100%", marginTop: 16, fontSize: 11 }}
//             onClick={() => setPage("book")}>
//             + Book New Appointment
//           </button>
//         </div>

//         {/* Billing Summary */}
//         <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//           <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, marginBottom: 2 }}>
//             Billing <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Summary</span>
//           </div>

//           {[
//             { label: "Total Billed", value: totalAmount, color: "var(--text)" },
//             { label: "Amount Paid", value: paidAmount, color: "var(--success)" },
//             { label: "Balance Due", value: dueAmount, color: dueAmount > 0 ? "var(--danger)" : "var(--success)" },
//           ].map((b, i) => (
//             <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
//               <span style={{ fontSize: 13, color: "var(--text3)" }} className="sans">{b.label}</span>
//               <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: b.color }}>
//                 ৳{Number(b.value).toLocaleString()}
//               </span>
//             </div>
//           ))}

//           {/* Progress bar showing how much is paid */}
//           <div>
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginBottom: 6 }} className="sans">
//               <span>Payment progress</span>
//               <span>{totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0}%</span>
//             </div>
//             <div style={{ background: "var(--navy3)", borderRadius: 4, height: 5, overflow: "hidden" }}>
//               <div style={{
//                 height: "100%", borderRadius: 4,
//                 width: totalAmount > 0 ? `${Math.round((paidAmount / totalAmount) * 100)}%` : "0%",
//                 background: dueAmount > 0
//                   ? "linear-gradient(90deg, var(--warning), var(--danger))"
//                   : "var(--success)",
//                 transition: "width 1s ease"
//               }} />
//             </div>
//           </div>

//           {dueAmount > 0 && (
//             <button className="btn-gold sans" style={{ width: "100%", marginTop: 4 }}
//               onClick={() => setPage("bills")}>
//               Pay ৳{dueAmount.toLocaleString()} Now
//             </button>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


function Sparkline({ data, color = "#c9a84c", height = 36, width = 90 }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const fillPts = `0,${height} ${pts} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`sg${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#sg${color.replace(/[^a-z0-9]/gi, "")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
 
// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimCount({ to, duration = 900 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to]);
  return <>{val}</>;
}
 
// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ setPage }) {
  const [appointments, setAppointments] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Read stored user — used as fallback while API loads
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
 
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setError(null);
 
        // Run both requests in parallel
        const [patientRes, apptRes] = await Promise.all([
          fetch(`http://localhost:5000/users/patient-by-email?email=${encodeURIComponent(storedUser.email || "")}`),
          fetch(`http://localhost:5000/api/appointments?patientId=${encodeURIComponent(storedUser.patientId || "")}`),
        ]);
 
        const patientJson = await patientRes.json();
        const apptJson = await apptRes.json();
 
        // Debug logs — remove once confirmed working
        console.log("PATIENT FROM API:", patientJson);
        console.log("APPOINTMENTS FROM API:", apptJson);
 
        if (patientJson.success && patientJson.patient) {
          setPatientData(patientJson.patient);
          // Refresh localStorage so other pages also get fresh data
          const refreshed = {
            ...storedUser,
            ...patientJson.patient,
            role: "patient",
            avatar: (patientJson.patient.name || "P")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
          };
          localStorage.setItem("user", JSON.stringify(refreshed));
        }
 
        if (apptJson.success) {
          setAppointments(apptJson.data || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Could not connect to server. Showing cached data.");
      } finally {
        setLoading(false);
      }
    };
 
    fetchAll();
  }, []);
 
  // Always prefer live API data, fall back to localStorage
  const PATIENT = patientData || storedUser;
 
  // ── Appointment calculations (from API) ──────────────────────────────────
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter((a) => a.status === "confirmed");
  const pendingAppointments = appointments.filter((a) => a.status === "pending");
  const upcomingAppointments = [...confirmedAppointments]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
 
  // ── Billing calculations (from live patient record) ──────────────────────
  const totalAmount = Number(PATIENT.totalAmount) || 0;
  const paidAmount = Number(PATIENT.paidAmount) || 0;
  const dueAmount = Number(PATIENT.dueAmount) || 0;
  const paymentPercent = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;
 
  // ── Parse date string to { day, mon } ────────────────────────────────────
  const parseDate = (dateStr) => {
    if (!dateStr) return { day: "--", mon: "---" };
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if (dateStr.includes("-")) {
      const [, m, d] = dateStr.split("-");
      return { day: d, mon: months[parseInt(m, 10) - 1] || "---" };
    }
    const parts = dateStr.split(" ");
    return { day: parts[0] || "--", mon: parts[1] || "---" };
  };
 
  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        padding: 60, textAlign: "center",
        color: "var(--text3)", fontFamily: "DM Sans, sans-serif", fontSize: 14,
      }}>
        Loading your dashboard…
      </div>
    );
  }
 
  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
 
      {/* ── Error banner (shows if API failed, using cached data) ── */}
      {error && (
        <div style={{
          padding: "12px 18px", borderRadius: "var(--radius)",
          background: "rgba(232,160,48,0.08)", border: "1px solid rgba(232,160,48,0.25)",
          fontSize: 12, color: "var(--warning)", fontFamily: "DM Sans, sans-serif",
        }}>
          ⚠ {error}
        </div>
      )}
 
      {/* ── Welcome Banner ── */}
      <div style={{
        background: "var(--navy3)", border: "1px solid var(--gold-border)",
        borderRadius: "var(--radius-lg)", padding: "26px 30px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative rings */}
        <div style={{ position: "absolute", right: 160, top: -50, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 90, top: -30, width: 290, height: 290, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.03)", pointerEvents: "none" }} />
 
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 8, fontFamily: "DM Sans, sans-serif" }}>
            Welcome back
          </div>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 300, lineHeight: 1.15 }}>
            {PATIENT.name?.split(" ")[0]}{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              {PATIENT.name?.split(" ").slice(1).join(" ")}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 5, fontFamily: "DM Sans, sans-serif" }}>
            {PATIENT.condition || "Patient"} · ID: {PATIENT.patientId || "N/A"}
          </div>
          {PATIENT.assignedDoctor && (
            <div style={{ fontSize: 12, color: "var(--gold)", marginTop: 3, fontFamily: "DM Sans, sans-serif" }}>
              Care by {PATIENT.assignedDoctor}
            </div>
          )}
        </div>
 
        {/* Avatar */}
        <div style={{
          width: 70, height: 70, borderRadius: "50%", overflow: "hidden",
          border: "2px solid var(--gold-border)", flexShrink: 0,
          background: "var(--gold-dim)", display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: "Cormorant Garamond, serif",
          fontSize: 26, color: "var(--gold)",
        }}>
          {PATIENT.imageUrl ? (
            <img src={PATIENT.imageUrl} alt={PATIENT.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            PATIENT.avatar || "P"
          )}
        </div>
      </div>
 
      {/* ── 4 KPI Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          {
            label: "Total Appointments",
            value: totalAppointments,
            sub: "All time",
            color: "var(--gold)",
            spark: [2, 3, 2, 4, 3, 4, totalAppointments],
          },
          {
            label: "Confirmed",
            value: confirmedAppointments.length,
            sub: "Approved by admin",
            color: "var(--success)",
            spark: [1, 2, 1, 3, 2, 3, confirmedAppointments.length],
          },
          {
            label: "Pending Approval",
            value: pendingAppointments.length,
            sub: "Awaiting admin",
            color: "var(--warning)",
            spark: [1, 1, 2, 1, 2, 1, pendingAppointments.length],
          },
          {
            label: "Amount Due",
            value: `৳${dueAmount.toLocaleString()}`,
            sub: dueAmount > 0 ? "Payment pending" : "All clear!",
            color: dueAmount > 0 ? "var(--danger)" : "var(--success)",
            spark: null,
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "var(--navy2)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "20px 22px",
              transition: "border-color 0.2s", cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold-border)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text3)", fontFamily: "DM Sans, sans-serif", marginBottom: 10 }}>
              {s.label}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 38, fontWeight: 300, color: s.color, lineHeight: 1 }}>
                {typeof s.value === "number" ? <AnimCount to={s.value} /> : s.value}
              </div>
              {s.spark && <Sparkline data={s.spark} color={s.color} />}
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Sans, sans-serif", marginTop: 6 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>
 
      {/* ── Bottom Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
 
        {/* Upcoming / Confirmed Appointments */}
        <div style={{ background: "var(--navy2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "24px 26px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20 }}>
              Upcoming <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Appointments</span>
            </div>
            <button
              className="link-btn sans"
              onClick={() => setPage("appointments")}
              style={{ fontSize: 11 }}
            >
              View all →
            </button>
          </div>
 
          {upcomingAppointments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">◈</div>
              <div className="empty-state-text sans">
                {pendingAppointments.length > 0
                  ? `${pendingAppointments.length} appointment(s) awaiting confirmation`
                  : "No confirmed appointments yet"}
              </div>
            </div>
          ) : (
            upcomingAppointments.map((a) => {
              const { day, mon } = parseDate(a.date);
              return (
                <div key={a._id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                  <div className="appt-date-box">
                    <div className="appt-date-day serif">{day}</div>
                    <div className="appt-date-mon sans">{mon}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", fontFamily: "DM Sans, sans-serif", marginBottom: 3 }}>
                      {a.doctorName || "Doctor"}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "DM Sans, sans-serif" }}>
                      {a.type} · {a.specialisation} · {a.timeSlot}
                    </div>
                    {a.notes && (
                      <div style={{ fontSize: 11, color: "var(--text2)", fontStyle: "italic", marginTop: 3, fontFamily: "DM Sans, sans-serif" }}>
                        "{a.notes}"
                      </div>
                    )}
                  </div>
                  <span className="badge badge-confirmed">confirmed</span>
                </div>
              );
            })
          )}
 
          {/* Pending notice */}
          {pendingAppointments.length > 0 && (
            <div style={{
              marginTop: 14, padding: "10px 14px",
              background: "rgba(232,160,48,0.06)", border: "1px solid rgba(232,160,48,0.2)",
              borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 12, color: "var(--warning)", fontFamily: "DM Sans, sans-serif" }}>
                {pendingAppointments.length} appointment(s) awaiting admin approval
              </span>
              <button
                className="link-btn sans"
                onClick={() => setPage("appointments")}
                style={{ fontSize: 11, color: "var(--warning)" }}
              >
                View →
              </button>
            </div>
          )}
 
          <button
            className="btn-outline sans"
            style={{ width: "100%", marginTop: 16, fontSize: 11 }}
            onClick={() => setPage("book")}
          >
            + Book New Appointment
          </button>
        </div>
 
        {/* Billing Summary */}
        <div style={{ background: "var(--navy2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "24px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20 }}>
            Billing <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Summary</span>
          </div>
 
          {[
            { label: "Total Billed", value: totalAmount, color: "var(--text)" },
            { label: "Amount Paid", value: paidAmount, color: "var(--success)" },
            { label: "Balance Due", value: dueAmount, color: dueAmount > 0 ? "var(--danger)" : "var(--success)" },
          ].map((b, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "11px 0", borderBottom: "1px solid var(--border)",
            }}>
              <span style={{ fontSize: 13, color: "var(--text3)", fontFamily: "DM Sans, sans-serif" }}>{b.label}</span>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: b.color }}>
                ৳{Number(b.value).toLocaleString()}
              </span>
            </div>
          ))}
 
          {/* Payment progress */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginBottom: 6, fontFamily: "DM Sans, sans-serif" }}>
              <span>Payment progress</span>
              <span>{paymentPercent}%</span>
            </div>
            <div style={{ background: "var(--navy3)", borderRadius: 4, height: 5, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 4,
                width: `${paymentPercent}%`,
                background: dueAmount > 0
                  ? "linear-gradient(90deg, var(--warning), var(--danger))"
                  : "var(--success)",
                transition: "width 1.2s ease",
              }} />
            </div>
          </div>
 
          {/* Sessions */}
          {PATIENT.sessions !== undefined && (
            <div style={{
              padding: "10px 14px", background: "var(--navy3)",
              border: "1px solid var(--border)", borderRadius: "var(--radius)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "DM Sans, sans-serif" }}>Total Sessions</span>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, color: "var(--gold)" }}>
                {PATIENT.sessions}
              </span>
            </div>
          )}
 
          {dueAmount > 0 ? (
            <button className="btn-gold sans" style={{ width: "100%", marginTop: 4 }} onClick={() => setPage("bills")}>
              Pay ৳{dueAmount.toLocaleString()} Now
            </button>
          ) : (
            <div style={{
              padding: "10px 14px", background: "rgba(46,184,122,0.06)",
              border: "1px solid rgba(46,184,122,0.2)", borderRadius: "var(--radius)",
              fontSize: 12, color: "var(--success)", fontFamily: "DM Sans, sans-serif", textAlign: "center",
            }}>
              ✓ No outstanding balance
            </div>
          )}
        </div>
 
      </div>
 
      {/* ── Quick Actions ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Book Appointment", icon: "✦", page: "book", desc: "Schedule a new visit" },
          { label: "My Appointments", icon: "◈", page: "appointments", desc: `${totalAppointments} total records` },
          { label: "Prescriptions", icon: "◎", page: "prescriptions", desc: "View medications" },
          { label: "Bills & Receipts", icon: "◇", page: "bills", desc: dueAmount > 0 ? `৳${dueAmount.toLocaleString()} due` : "All paid" },
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => setPage(q.page)}
            style={{
              background: "var(--navy2)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "16px 18px",
              textAlign: "left", cursor: "pointer", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 12,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold-border)";
              e.currentTarget.style.background = "var(--gold-dim)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--navy2)";
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: "rgba(201,168,76,0.07)", border: "1px solid var(--gold-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, color: "var(--gold)",
            }}>
              {q.icon}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", fontFamily: "DM Sans, sans-serif", marginBottom: 2 }}>
                {q.label}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Sans, sans-serif" }}>
                {q.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
 
    </div>
  );
}
 

function Appointments({ setPage }) {
  const [filter, setFilter] = useState("all");
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments");
        if (response.ok) {
          const result = await response.json();
          // Safety fallback: Ensure we always have an array even if backend database is completely empty
          setAppointments(result.data || []); 
        } else {
          console.error("Failed to retrieve appointments.");
        }
      } catch (error) {
        console.error("Network error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 🔄 Fix 2: Standardize old 'upcoming' records into 'pending' status so they show up under filters
  const filtered = filter === "all" 
    ? appointments 
    : appointments.filter((a) => {
        let currentStatus = a.status || "pending";
        if (currentStatus === "upcoming") currentStatus = "pending"; // Convert old data layout structures
        return currentStatus === filter;
      });

  const parseAppointmentDate = (dateString) => {
    if (!dateString) return { day: "--", mon: "---" };
    
    if (dateString.includes("-")) {
      const [year, month, day] = dateString.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        day: day,
        mon: monthNames[parseInt(month, 10) - 1] || "Mon"
      };
    }
    
    const parts = dateString.split(" ");
    return {
      day: parts[0] || "--",
      mon: parts[1] || "---"
    };
  };

  if (loading) {
    return (
      <div className="card" style={{ padding: "40px 0", textAlign: "center" }}>
        <div className="sans" style={{ color: "var(--text3)", fontSize: 14 }}>Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {["all", "pending", "confirmed", "rejected"].map((f) => (
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
          <div className="empty-state">
            <div className="empty-state-icon">◈</div>
            <div className="empty-state-text sans">No appointments found</div>
          </div>
        ) : (
          filtered.map((a) => {
            // Normalize status strings safely
            let currentStatus = a.status || "pending";
            if (currentStatus === "upcoming") currentStatus = "pending";

            const { day, mon } = parseAppointmentDate(a.date);

            return (
              <div key={a._id || a.appointmentId} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="appt-date-box">
                  <div className="appt-date-day serif">{day}</div>
                  <div className="appt-date-mon sans">{mon}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 4 }} className="sans">
                    {a.doctorName || "Unknown Doctor"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }} className="sans">
                    {a.type} · {a.specialisation} · {a.timeSlot}
                  </div>
                  {a.notes && (
                    <div style={{ fontSize: 12, color: "var(--text2)", fontStyle: "italic", marginTop: 4 }} className="sans">
                      "{a.notes}"
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }} className="sans">
                    Ref: {a.appointmentId || "N/A"}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  {/* Class names updated to safely style your badges */}
                  <span className={`badge badge-${currentStatus} b-${currentStatus}`}>{currentStatus}</span>
                  
                  {/* 🔄 Fix 3: Show Action options dynamically for active/pending requests */}
                  {currentStatus === "pending" && (
                    <button className="download-btn sans" style={{opacity: 0.6}}>Awaiting Admin</button>
                  )}
                  {currentStatus === "confirmed" && (
                    <button className="download-btn sans">View Details</button>
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



// import React, { useState } from "react";

function BookAppointment() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false); // Added for UX during network requests

  const doctor = DOCTORS_BOOK.find((d) => d.id === selectedDoctor);

  // Function to handle sending data to the backend
  const handleConfirmBooking = async () => {
    setLoading(true);
    
    // Construct payload matching data pulled from current state and globals
    const appointmentData = {
      doctorId: selectedDoctor,
      doctorName: doctor?.name,
      specialisation: doctor?.spec,
      type: type,
      date: date,
      timeSlot: selectedSlot,
      patientName: PATIENT.name,
      patientId: PATIENT.patientId,
      notes: notes || ""
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking successful:", result);
        setBooked(true);
      } else {
        const errorData = await response.json();
        alert(`Failed to book appointment: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Network error. Could not connect to the booking server.");
    } finally {
      setLoading(false);
    }
  };

  if (booked) {
    return (
      <div className="fade-in" style={{ maxWidth: 500, margin: "0 auto", paddingTop: 40 }}>
        <div className="confirm-box">
          <div className="confirm-icon">✦</div>
          <div className="confirm-title serif">Appointment Booked!</div>
          <div className="confirm-sub sans" style={{ marginBottom: 20 }}>
            Your appointment with <strong style={{ color: "var(--text)" }}>{doctor?.name}</strong> on <strong style={{ color: "var(--text)" }}>{date}</strong> at <strong style={{ color: "var(--text)" }}>{selectedSlot}</strong> has been confirmed. A confirmation will be sent to your phone and email.
          </div>
          <button className="btn-outline sans" onClick={() => { setBooked(false); setStep(1); setSelectedDoctor(null); setSelectedSlot(null); setDate(""); setNotes(""); setType(""); }}>
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>
      {/* Step indicator */}
      {/* Step indicator */}
      <div className="progress-track" style={{ marginBottom: 36 }}>
        {["Select Doctor", "Choose Date", "Confirm"].map((label, i) => {
          return (
            <React.Fragment key={label}>
              <div className={`progress-step ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`}>
                <div className="progress-step-circle">{step > i + 1 ? "✓" : i + 1}</div>
                <div className="progress-step-label sans">{label}</div>
              </div>
              {i < 2 && <div className={`progress-line ${step > i + 1 ? "done" : ""}`} />}
            </React.Fragment>
          );
        })}
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
            <button className="btn-outline sans" disabled={loading} onClick={() => setStep(2)}>← Back</button>
            <button className="btn-gold sans" disabled={loading} onClick={handleConfirmBooking}>
              {loading ? "Booking..." : "Confirm Booking ✦"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// function Prescriptions() {
//   const [expanded, setExpanded] = useState(0);
//   return (
//     <div className="fade-in">
//       <div style={{ marginBottom: 20, padding: "12px 18px", background: "rgba(201,168,76,0.04)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--text3)" }} className="sans">
//         ⚕️ Prescriptions are issued by your treating doctor and linked to your appointment. Only your assigned doctor or an administrator may edit them.
//       </div>
//       {PRESCRIPTIONS.map((rx, i) => (
//         <div className="rx-card" key={rx.id}>
//           <div className="rx-header">
//             <div>
//               <div className="rx-id sans">{rx.id}</div>
//               <div className="rx-diagnosis serif">{rx.diagnosis}</div>
//               <div className="rx-doctor sans">{rx.doctor} · {rx.date}</div>
//             </div>
//             <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
//               <button className="download-btn sans" onClick={() => setExpanded(expanded === i ? -1 : i)}>
//                 {expanded === i ? "Collapse" : "View Details"}
//               </button>
//               <button className="download-btn sans">↓ PDF</button>
//             </div>
//           </div>

//           {expanded === i && (
//             <div className="fade-in">
//               <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }} className="sans">Prescribed Medicines</div>
//               <div className="rx-meds">
//                 {rx.medicines.map((m, j) => (
//                   <div className="med-item" key={j}>
//                     <div className="med-name sans">{m.name}</div>
//                     <div className="med-detail sans">
//                       Dose: {m.dose}<br />
//                       {m.freq} · {m.duration}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", margin: "16px 0 8px" }} className="sans">Therapy Instructions</div>
//               <div className="rx-therapy sans">{rx.therapy}</div>
//               <div className="rx-footer">
//                 <div className="rx-followup sans">Follow-up date: <span>{rx.followUp}</span></div>
//                 <button className="btn-outline sans" style={{ fontSize: 11 }}>Book Follow-up</button>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }



// function Prescriptions() {
//   // ─── 1. Core States for Data Management ───
//   const [prescriptionsList, setPrescriptionsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(0); // Keeps first item expanded by default as requested

//   const API_BASE = "http://localhost:5000";

//   // ─── 2. Fetch Personal Treatment Data Log ───
//   useEffect(() => {
//     const fetchPatientPrescriptions = async () => {
//       try {
//         /*
//           NOTE: Replace 'CURRENT_PATIENT_ID' with your authenticated user context indicator tracking ID 
//           e.g., localStorage.getItem("patientId") or your global Auth context hook state reference values.
//         */
//         const patientId = localStorage.getItem("patientId") || "CURRENT_PATIENT_ID";
        
//         const response = await fetch(`${API_BASE}/api/prescriptions?patientId=${patientId}`);
//         if (response.ok) {
//           const result = await response.json();
          
//           // Normalize responses (safely fallback whether your router returns a plain array or data object wrapper)
//           let rawData = Array.isArray(result) 
//             ? result 
//             : result.data || result.prescriptions || [];
          
//           // Sort items dynamically so that newest prescriptions are displayed at the top
//           rawData.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

//           setPrescriptionsList(rawData);
//         } else {
//           console.error("Failed to fetch prescriptions dataset from backend database api router.");
//         }
//       } catch (error) {
//         console.error("Error communicating with prescription logs server framework:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientPrescriptions();
//   }, []);

//   if (loading) {
//     return (
//       <div className="card" style={{ padding: "40px 0", textAlign: "center" }}>
//         <div style={{ color: "var(--text3)", fontSize: 13 }}>Retrieving your official clinical prescription history logs...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="fade-in">
//       {/* Informative Security Callout Badge */}
//       <div style={{ marginBottom: 20, padding: "12px 18px", background: "rgba(201,168,76,0.04)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--text3)" }} className="sans">
//         ⚕️ Prescriptions are issued by your treating doctor and linked to your appointment. Only your assigned doctor or an administrator may edit them.
//       </div>

//       {prescriptionsList.length === 0 ? (
//         <div className="card" style={{ padding: "48px 20px", textAlign: "center", color: "var(--text3)", fontSize: 14 }}>
//           📁 No historical pharmaceutical prescriptions have been indexed to your profile account history.
//         </div>
//       ) : (
//         prescriptionsList.map((rx, i) => {
//           // Fallback parsing variables mapping backend variations safely to your layout variables
//           const recordId = rx.prescriptionId || rx._id || `RX-${1000 + i}`;
//           const diagnosisStr = rx.diagnosis || "General Medical Checkup Consultation";
//           const providerName = rx.doctorName || rx.assignedDoctor || "Attending Clinical Physician";
          
//           const issueDate = rx.createdAt 
//             ? new Date(rx.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) 
//             : (rx.date || "---");

//           const therapyInstructions = rx.therapyInstructions || rx.therapy || rx.instructions || "Take all medical dosages precisely as designated.";
//           const followUpDateStr = rx.followUpDate || rx.followUp || "Not Scheduled";

//           // Normalize parsing the medicines data array shape whether strings or objects exist in database collections
//           const activeMedicines = Array.isArray(rx.medicines) ? rx.medicines : (rx.medications || []);

//           return (
//             <div className="rx-card" key={rx._id || recordId} style={{ marginBottom: 16 }}>
//               {/* Card Header Section Layout */}
//               <div className="rx-header">
//                 <div>
//                   <div className="rx-id sans" style={{ color: "var(--text3)", fontSize: 11 }}>{recordId}</div>
//                   <div className="rx-diagnosis serif" style={{ fontSize: 18, color: "var(--gold)", margin: "2px 0 4px" }}>{diagnosisStr}</div>
//                   <div className="rx-doctor sans" style={{ fontSize: 12, color: "var(--text2)" }}>{providerName} · <span style={{ color: "var(--text3)" }}>{issueDate}</span></div>
//                 </div>
//                 <div style={{ display: "flex", gap: 10, flexShrink: 0, alignItems: "center" }}>
//                   <button className="download-btn sans" onClick={() => setExpanded(expanded === i ? -1 : i)}>
//                     {expanded === i ? "Collapse" : "View Details"}
//                   </button>
//                   <button className="download-btn sans">↓ PDF</button>
//                 </div>
//               </div>

//               {/* Collapsible Expansion Section Layout Container */}
//               {expanded === i && (
//                 <div className="fade-in" style={{ borderTop: "1px solid var(--bord)", marginTop: 14, paddingTop: 14 }}>
//                   <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }} className="sans">Prescribed Medicines</div>
                  
//                   {activeMedicines.length === 0 ? (
//                     <div style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic", marginBottom: 14 }}>No explicit items listed. Refer to custom therapy instructions below.</div>
//                   ) : (
//                     <div className="rx-meds" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
//                       {activeMedicines.map((m, j) => {
//                         const isStringFormat = typeof m === "string";
//                         return (
//                           <div className="med-item" key={j} style={{ background: "rgba(0,0,0,0.15)", padding: "10px 14px", borderRadius: 4, border: "1px solid var(--bord)" }}>
//                             <div className="med-name sans" style={{ fontWeight: 500, color: "var(--text)", fontSize: 13 }}>
//                               {isStringFormat ? m : (m.name || m.medicineName || "Prescription item")}
//                             </div>
//                             {!isStringFormat && (
//                               <div className="med-detail sans" style={{ fontSize: 11, color: "var(--text3)", marginTop: 4, lineHeight: 1.4 }}>
//                                 <span>Dose: {m.dose || m.dosage || "As Directed"}</span><br />
//                                 <span>{m.freq || m.frequency || "1-0-1"} · {m.duration || "Days Course"}</span>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Therapy Instructions Details Block */}
//                   <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", margin: "16px 0 8px" }} className="sans">Therapy Instructions</div>
//                   <div className="rx-therapy sans" style={{ fontSize: 13, background: "rgba(0,0,0,0.1)", padding: 12, borderRadius: 4, borderLeft: "2px solid var(--gold)", color: "var(--text2)", fontStyle: "italic", lineHeight: 1.5 }}>
//                     {therapyInstructions}
//                   </div>

//                   {/* Card Footer Action Block */}
//                   <div className="rx-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, borderTop: "1px dashed var(--bord)", paddingTop: 12 }}>
//                     <div className="rx-followup sans" style={{ fontSize: 12, color: "var(--text3)" }}>
//                       Follow-up date: <span style={{ color: "var(--info)", fontWeight: 500 }}>{followUpDateStr}</span>
//                     </div>
//                     <button className="btn-outline sans" style={{ fontSize: 11, padding: "6px 12px", background: "transparent", border: "1px solid var(--bord)", color: "var(--text)" }}>
//                       Book Follow-up
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

function Prescriptions() {
  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(0);
  const [debugError, setDebugError] = useState("");

  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    const fetchPatientPrescriptions = async () => {
      try {
        // 🔍 DEBUG STEP 1: Look for any available logged-in patient session identifiers
        const patientId = 
          localStorage.getItem("patientId") || 
          localStorage.getItem("userId") || 
          sessionStorage.getItem("patientId") ||
          ""; // Fallback to empty string if none found to check total collections

        console.log("📌 [Frontend Debug] Attempting to fetch prescriptions for Patient ID:", patientId);

        // Build route URL safely
        const targetUrl = patientId 
          ? `${API_BASE}/api/prescriptions?patientId=${patientId}`
          : `${API_BASE}/api/prescriptions`;

        const response = await fetch(targetUrl);
        
        console.log("📌 [Frontend Debug] Server response status code:", response.status);

        if (response.ok) {
          const result = await response.json();
          console.log("📌 [Frontend Debug] Raw data payload received from backend:", result);
          
          // 🔍 DEBUG STEP 2: Normalize array extraction depending on your server controller configuration
          let extractedArray = [];
          if (Array.isArray(result)) {
            extractedArray = result;
          } else if (result.data && Array.isArray(result.data)) {
            extractedArray = result.data;
          } else if (result.prescriptions && Array.isArray(result.prescriptions)) {
            extractedArray = result.prescriptions;
          } else if (result.success && Array.isArray(result.data)) {
            extractedArray = result.data;
          }

          console.log("📌 [Frontend Debug] Successfully processed active records array count:", extractedArray.length);

          // Sort records to display the newest first
          extractedArray.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setPrescriptionsList(extractedArray);
        } else {
          const errText = await response.text();
          setDebugError(`Server responded with code ${response.status}: ${errText}`);
          console.error("Failed to fetch prescriptions from backend.");
        }
      } catch (error) {
        setDebugError(`Network error communicating with server: ${error.message}`);
        console.error("Error communicating with prescription logs framework:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientPrescriptions();
  }, []);

  // ─── Render Handling States ───
  if (loading) {
    return (
      <div className="card" style={{ padding: "40px 0", textAlign: "center" }}>
        <div style={{ color: "var(--text3)", fontSize: 13 }}>Retrieving your official clinical prescription records...</div>
      </div>
    );
  }

  if (debugError) {
    return (
      <div className="card" style={{ padding: "24px", border: "1px solid rgba(232,85,85,.2)", background: "rgba(232,85,85,.05)", color: "var(--danger)" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>⚠️ Database Connection Alert</h4>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>{debugError}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Informative Security Callout Badge */}
      <div style={{ marginBottom: 20, padding: "12px 18px", background: "rgba(201,168,76,0.04)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--text3)" }} className="sans">
        ⚕️ Prescriptions are issued by your treating doctor and linked to your appointment. Only your assigned doctor or an administrator may edit them.
      </div>

      {prescriptionsList.length === 0 ? (
        <div className="card" style={{ padding: "48px 20px", textAlign: "center", color: "var(--text3)", fontSize: 14 }}>
          📁 No historical pharmaceutical prescriptions have been indexed to your profile account history.
          <div style={{ fontSize: 11, color: "var(--text4)", marginTop: 8 }}>
            Check your browser console (F12 Key) to verify network stream details.
          </div>
        </div>
      ) : (
        prescriptionsList.map((rx, i) => {
          const recordId = rx.prescriptionId || rx._id || `RX-${1000 + i}`;
          const diagnosisStr = rx.diagnosis || "General Consultation Case Study";
          const providerName = rx.doctorName || rx.assignedDoctor || "Attending Clinical Physician";
          
          const issueDate = rx.createdAt 
            ? new Date(rx.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) 
            : (rx.date || "---");

          const therapyInstructions = rx.therapyInstructions || rx.therapy || rx.instructions || "Take all medical dosages precisely as designated.";
          const followUpDateStr = rx.followUpDate || rx.followUp || "Not Scheduled";
          const activeMedicines = Array.isArray(rx.medicines) ? rx.medicines : (rx.medications || []);

          return (
            <div className="rx-card" key={rx._id || recordId} style={{ marginBottom: 16 }}>
              {/* Card Header Section Layout */}
              <div className="rx-header">
                <div>
                  <div className="rx-id sans" style={{ color: "var(--text3)", fontSize: 11 }}>{recordId}</div>
                  <div className="rx-diagnosis serif" style={{ fontSize: 18, color: "var(--gold)", margin: "2px 0 4px" }}>{diagnosisStr}</div>
                  <div className="rx-doctor sans" style={{ fontSize: 12, color: "var(--text2)" }}>{providerName} · <span style={{ color: "var(--text3)" }}>{issueDate}</span></div>
                </div>
                <div style={{ display: "flex", gap: 10, flexShrink: 0, alignItems: "center" }}>
                  <button className="download-btn sans" onClick={() => setExpanded(expanded === i ? -1 : i)}>
                    {expanded === i ? "Collapse" : "View Details"}
                  </button>
                  <button className="download-btn sans">↓ PDF</button>
                </div>
              </div>

              {/* Collapsible Expansion Section Layout Container */}
              {expanded === i && (
                <div className="fade-in" style={{ borderTop: "1px solid var(--bord)", marginTop: 14, paddingTop: 14 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }} className="sans">Prescribed Medicines</div>
                  
                  {activeMedicines.length === 0 ? (
                    <div style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic", marginBottom: 14 }}>No explicit items listed. Refer to custom therapy instructions below.</div>
                  ) : (
                    <div className="rx-meds" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                      {activeMedicines.map((m, j) => {
                        const isStringFormat = typeof m === "string";
                        return (
                          <div className="med-item" key={j} style={{ background: "rgba(0,0,0,0.15)", padding: "10px 14px", borderRadius: 4, border: "1px solid var(--bord)" }}>
                            <div className="med-name sans" style={{ fontWeight: 500, color: "var(--text)", fontSize: 13 }}>
                              {isStringFormat ? m : (m.name || m.medicineName || m.medicine || "Prescription item")}
                            </div>
                            {!isStringFormat && (
                              <div className="med-detail sans" style={{ fontSize: 11, color: "var(--text3)", marginTop: 4, lineHeight: 1.4 }}>
                                <span>Dose: {m.dose || m.dosage || "As Directed"}</span><br />
                                <span>{m.freq || m.frequency || "1-0-1"} · {m.duration || "Days Course"}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Therapy Instructions Details Block */}
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", margin: "16px 0 8px" }} className="sans">Therapy Instructions</div>
                  <div className="rx-therapy sans" style={{ fontSize: 13, background: "rgba(0,0,0,0.1)", padding: 12, borderRadius: 4, borderLeft: "2px solid var(--gold)", color: "var(--text2)", fontStyle: "italic", lineHeight: 1.5 }}>
                    {therapyInstructions}
                  </div>

                  {/* Card Footer Action Block */}
                  <div className="rx-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, borderTop: "1px dashed var(--bord)", paddingTop: 12 }}>
                    <div className="rx-followup sans" style={{ fontSize: 12, color: "var(--text3)" }}>
                      Follow-up date: <span style={{ color: "var(--info)", fontWeight: 500 }}>{followUpDateStr}</span>
                    </div>
                    <button className="btn-outline sans" style={{ fontSize: 11, padding: "6px 12px", background: "transparent", border: "1px solid var(--bord)", color: "var(--text)" }}>
                      Book Follow-up
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}


function Bills() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. EXTRACT LOGGED-IN USER SESSION CONTEXT
  // Safely handles whatever authentication structure your app uses
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {
    email: "patient@example.com", // Fallback example if no active session
    role: "patient", 
    name: "Regular Patient"
  };

  const DOCTOR_NAME = "Dr. Mahade Hasan Faisal";

  // 2. FETCH LIVE FINANCIAL DATA FROM BACKEND PIPELINE
  useEffect(() => {
    const fetchBillingRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/patients");
        if (response.ok) {
          const result = await response.json();
          const allPatients = result.patients || [];

          // 🔒 USER-SPECIFIC SECURITY FILTERS
          if (loggedInUser.role === "doctor" || loggedInUser.email === "mahade@example.com") {
            // Doctors see all financial records for patients under their care
            const doctorCohort = allPatients.filter(p => p.assignedDoctor === DOCTOR_NAME);
            setPatients(doctorCohort);
          } else {
            // Patients only see their own personal statement matching their account email
            const personalRecord = allPatients.filter(p => p.email === loggedInUser.email);
            setPatients(personalRecord);
          }
        }
      } catch (error) {
        console.error("Failed to parse financial database clusters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingRecords();
  }, [loggedInUser.email, loggedInUser.role]);

  // 3. AGGREGATE CALCULATIONS SPECIFIC TO THE VIEWING ACCOUNT
  const totalBilled = patients.reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0);
  const totalPaid = patients.reduce((sum, p) => sum + (Number(p.paidAmount) || 0), 0);
  const totalOutstanding = patients.reduce((sum, p) => sum + (Number(p.dueAmount) || 0), 0);

  if (loading) {
    return (
      <div className="sans" style={{ padding: 40, textAlign: "center", color: "var(--text3)" }}>
        Verifying user credentials & isolating statements...
      </div>
    );
  }

  return (
    <div className="fade-in">
      
      {/* SCOPED CONTEXT BANNER */}
      <div style={{ marginBottom: 20 }} className="sans">
        <span style={{ fontSize: 12, color: "var(--text3)" }}>
          Showing financial statements securely isolated for:{" "}
          <strong style={{ color: "var(--gold)" }}>{loggedInUser.name}</strong> ({loggedInUser.role})
        </span>
      </div>

      {/* RE-CALCULATED CARD METRICS ACCORDING TO VIEWING USER */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: loggedInUser.role === "doctor" ? "Total Patient Billings" : "Your Total Bill", value: `৳${totalBilled.toLocaleString()}`, color: "var(--text)" },
          { label: loggedInUser.role === "doctor" ? "Total Revenue Settled" : "Your Total Paid", value: `৳${totalPaid.toLocaleString()}`, color: "var(--success)" },
          { label: "Outstanding Dues", value: `৳${totalOutstanding.toLocaleString()}`, color: "var(--warning)" },
        ].map((s) => (
          <div className="card-sm" key={s.label} style={{ textAlign: "center", padding: "20px 14px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }} className="sans">{s.label}</div>
            <div className="serif" style={{ fontSize: 32, fontWeight: 300, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }} className="sans">Synced live via Database context</div>
          </div>
        ))}
      </div>

      {/* FILTERED STATEMENT LISTING */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <div className="section-hd-title serif">
            {loggedInUser.role === "doctor" ? "Practice Financial Log" : "My Personal Receipts"}
          </div>
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table className="bill-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th className="sans" style={{ padding: "12px 24px" }}>Statement Target</th>
                <th className="sans" style={{ padding: "12px 24px" }}>Treatment Scope</th>
                <th className="sans" style={{ padding: "12px 24px" }}>Breakdown</th>
                <th className="sans" style={{ padding: "12px 24px" }}>Status</th>
                <th className="sans" style={{ padding: "12px 24px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "var(--text3)" }} className="sans">
                    No matching structural billing data linked to this account context.
                  </td>
                </tr>
              ) : (
                patients.map((p) => {
                  const due = Number(p.dueAmount) || 0;
                  const total = Number(p.totalAmount) || 0;
                  const paid = Number(p.paidAmount) || 0;
                  
                  let paymentStatus = "paid";
                  if (paid === 0 && total > 0) paymentStatus = "unpaid";
                  else if (due > 0) paymentStatus = "partial";

                  return (
                    <tr key={p._id || p.patientId} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "16px 24px" }}>
                        <div className="bill-id sans" style={{ fontWeight: 500, color: "var(--text)" }}>
                          {p.name || "Anonymous User Record"}
                        </div>
                        <div className="bill-services sans" style={{ color: "var(--text3)", fontSize: 11, marginTop: 2 }}>
                          ID Ref: {p.patientId || "N/A"} · Sessions: {p.sessions || 0}
                        </div>
                      </td>
                      <td className="sans" style={{ padding: "16px 24px", fontSize: 13, color: "var(--text2)" }}>
                        {p.condition || "Clinical Therapy"}
                        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>Care Provider: {p.assignedDoctor || DOCTOR_NAME}</div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div className="bill-amount serif" style={{ fontSize: 15, color: "var(--text)" }}>৳{total.toLocaleString()}</div>
                        {paymentStatus !== "paid" && (
                          <div className="bill-paid sans" style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>
                            Settled: ৳{paid.toLocaleString()} · Remainder: ৳{due.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span className={`badge badge-${paymentStatus}`} style={{ textTransform: "capitalize" }}>
                          {paymentStatus}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="download-btn sans" style={{ padding: "6px 12px", fontSize: 11 }}>
                            ↓ PDF
                          </button>
                          {due > 0 && loggedInUser.role === "patient" && (
                            <button className="btn-gold sans" style={{ fontSize: 11, padding: "6px 12px" }}>
                              Pay Due
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTEXTUAL CALL TO ACTION BANNER FOR OUTSTANDING DEBTS */}
      {totalOutstanding > 0 && loggedInUser.role === "patient" && (
        <div style={{ marginTop: 20, padding: "14px 18px", background: "var(--navy2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: 12, color: "var(--text3)", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="sans">
          <span>💳 Settle your remaining account balance securely via financial portal gateways</span>
          <button className="btn-gold sans" style={{ fontSize: 11, padding: "9px 20px" }}>
            Pay Outstanding ৳{totalOutstanding.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  );
}

function Profile() {
  const [editing, setEditing] = useState(false);
  return (
          <div className="fade-in">
            <div className="profile-header">
              {/* <div className="profile-avatar serif">{PATIENT.avatar}</div> */}
              <div className="patient-avatar serif" style={{ overflow: "hidden", padding: 0 }}>
        {PATIENT.imageUrl ? (
          <img src={PATIENT.imageUrl} alt={PATIENT.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
        ) : (
          PATIENT.avatar
        )}
      </div>
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
                    {/* <div className="patient-avatar serif">{PATIENT.avatar}</div> */}
                    <div className="patient-avatar serif" style={{ overflow: "hidden", padding: 0 }}>
            {PATIENT.imageUrl ? (
              <img src={PATIENT.imageUrl} alt={PATIENT.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            ) : (
              PATIENT.avatar
            )}
          </div>
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
