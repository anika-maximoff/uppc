import { useState } from "react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const users = {
    patient: { email: "patient@gmail.com", password: "123456" },
    doctor: { email: "doctor@gmail.com", password: "123456" },
    admin: { email: "admin@gmail.com", password: "123456" },
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (email === users[role].email && password === users[role].password) {
      onLogin(role);
    } else {
      alert("Wrong email, password, or role");
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
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>

        <div className="demo">
          <div><span>Patient:</span> patient@gmail.com / 123456</div>
          <div><span>Doctor:</span> doctor@gmail.com / 123456</div>
          <div><span>Admin:</span> admin@gmail.com / 123456</div>
        </div>
      </form>
    </div>
  );
}