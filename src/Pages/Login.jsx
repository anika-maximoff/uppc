

import { useState } from "react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fallback credentials for system managers
  const systemUsers = {
    doctor: { email: "doctor@gmail.com", password: "123456", name: "Dr. Mahade Hasan Faisal" },
    admin: { email: "admin@gmail.com", password: "123456", name: "System Administrator" },
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔒 STRATEGY A: LIVE PATIENT REAL-TIME VERIFICATION
      if (role === "patient") {
        const response = await fetch("http://localhost:5000/users/patients");
        
        if (!response.ok) {
          throw new Error("Could not contact authentication database cluster.");
        }

        const data = await response.json();
        const activePatients = data.patients || [];

        // Query cluster for matching dynamic user document attributes
        const foundPatient = activePatients.find(
          (p) => p.email?.toLowerCase().trim() === email.toLowerCase().trim() && 
                 p.password === password
        );

        if (foundPatient) {
          // Commit dynamic user info into localStorage state for downstream components like Bills
          // AFTER — saves everything the portal needs
        // SAVE EVERYTHING from the database record
const sessionUser = {
  _id: foundPatient._id,
  email: foundPatient.email,
  role: "patient",
  name: foundPatient.name || "Registered Patient",
  patientId: foundPatient.patientId,
  phone: foundPatient.phone || "",
  age: foundPatient.age || "",
  gender: foundPatient.gender || "",
  dob: foundPatient.dob || "",
  address: foundPatient.address || "",
  bloodGroup: foundPatient.bloodGroup || "",
  condition: foundPatient.condition || "",
  assignedDoctor: foundPatient.assignedDoctor || "",
  since: foundPatient.since || "",
  sessions: foundPatient.sessions || 0,
  status: foundPatient.status || "active",
  totalAmount: foundPatient.totalAmount || 0,
  paidAmount: foundPatient.paidAmount || 0,
  dueAmount: foundPatient.dueAmount || 0,
  emergencyContact: foundPatient.emergencyContact || "",
  imageUrl: foundPatient.imageUrl || "",
  avatar: (foundPatient.name || "P")
    .split(" ")
    .map(n => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
};
localStorage.setItem("user", JSON.stringify(sessionUser));
          
          // Trigger parental app structural redirection route switch
          onLogin("patient");
        } else {
          alert("Access Denied: No matching registered patient profile found with those credentials.");
        }
      } 
      
      // 🛠️ STRATEGY B: CORE MANAGERIAL FALLBACK ACCOUNTS
      else {
        const staticUser = systemUsers[role];
        if (email === staticUser.email && password === staticUser.password) {
          const sessionUser = {
            email: staticUser.email,
            role: role,
            name: staticUser.name
          };
          localStorage.setItem("user", JSON.stringify(sessionUser));
          onLogin(role);
        } else {
          alert("Wrong email, password, or administrative tier configuration.");
        }
      }
    } catch (err) {
      console.error("Authentication handshake failure:", err);
      alert("Network Error: Verification routine failed to communicate with cluster.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <style>{`
        .login-page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #112840, #07111f 60%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          color: #ddd5c2;
        }

        .login-card {
          width: 420px;
          background: #0d1f33;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }

        .brand {
          text-align: center;
          margin-bottom: 28px;
        }

        .brand h1 {
          font-family: Georgia, serif;
          font-size: 34px;
          font-weight: 300;
          margin-bottom: 6px;
        }

        .brand h1 span {
          color: #c9a84c;
          font-style: italic;
        }

        .brand p {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(221,213,194,0.4);
        }

        .field {
          margin-bottom: 16px;
        }

        .field label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(221,213,194,0.45);
          margin-bottom: 8px;
        }

        .field input,
        .field select {
          width: 100%;
          background: #112840;
          border: 1px solid rgba(201,168,76,0.14);
          border-radius: 8px;
          padding: 13px 14px;
          color: #ddd5c2;
          font-size: 14px;
          outline: none;
        }

        .field input:focus,
        .field select:focus {
          border-color: rgba(201,168,76,0.5);
        }

        .login-btn {
          width: 100%;
          margin-top: 10px;
          padding: 13px;
          border: none;
          border-radius: 8px;
          background: #c9a84c;
          color: #07111f;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .demo {
          margin-top: 22px;
          padding: 14px;
          border-radius: 8px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.16);
          font-size: 12px;
          line-height: 1.7;
          color: rgba(221,213,194,0.65);
        }

        .demo span {
          color: #c9a84c;
        }
      `}</style>

      <form className="login-card" onSubmit={handleSubmit}>
        <div className="brand">
          <h1><span>UP</span>PC Portal</h1>
          <p>Secure Medical Access</p>
        </div>

        <div className="field">
          <label>Login As</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient (Database Restricted)</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter account email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Login"}
        </button>

        <div className="demo">
          <div><span>Patient Info:</span> Must match email/password inside your MongoDB <code>/users/patients</code> records list.</div>
          <div style={{ marginTop: 6 }}><span>Staff Fallbacks:</span> doctor@gmail.com or admin@gmail.com</div>
        </div>
      </form>
    </div>
  );
}