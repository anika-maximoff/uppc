import React, { useState, useEffect } from "react";

function PatientRecords({ patientId, onBack }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = "https://medicare-backend-psi.vercel.app";

  useEffect(() => {
    const fetchPrescriptionHistory = async () => {
      if (!patientId) return;
      try {
        const response = await fetch(`${API_BASE}/api/prescriptions?patientId=${patientId}`);
        const result = await response.json();
        if (result.success) {
          setHistory(result.data || []);
        }
      } catch (err) {
        console.error("Error loading historical medical files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptionHistory();
  }, [patientId]);

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--text3)" }}>Loading medical archives...</div>;
  }

  return (
    <div className="fade-in" style={{ maxWidth: 760 }}>
      {/* Header and Back navigation button */}
      <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h3 className="serif" style={{ margin: 0, fontSize: 22 }}>Clinical History Archives</h3>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>Patient Reference Key: {patientId}</span>
        </div>
        <button className="btn-out" style={{ marginLeft: "auto", padding: "6px 14px", fontSize: 12 }} onClick={onBack}>
          ← Back to Roster
        </button>
      </div>

      {history.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "40px 20px", color: "var(--text3)" }}>
          ⚠️ No historical prescription documents found on record for this case profile.
        </div>
      ) : (
        history.map((record) => (
          <div className="card" key={record.prescriptionId} style={{ marginBottom: 16, borderLeft: "4px solid var(--gold)" }}>
            {/* Timeline Header Row */}
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--bord)", paddingBottom: 8, marginBottom: 12 }}>
              <div>
                <strong style={{ fontSize: 14, color: "var(--text)" }}>{record.diagnosis}</strong>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>
                  Prescribed by: {record.prescribedBy}
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: 12, color: "var(--text2)" }}>
                {new Date(record.createdAt).toLocaleDateString()}
                <div style={{ fontSize: 10, color: "var(--text3)" }}>ID: {record.prescriptionId}</div>
              </div>
            </div>

            {/* List of Meds */}
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "var(--gold)", fontWeight: 600, display: "block", marginBottom: 6 }}>Rx (Prescribed Medications):</span>
              <table style={{ width: "100%", fontSize: 12, background: "var(--navy2)", borderRadius: 4 }}>
                <thead>
                  <tr style={{ color: "var(--text3)", textAlign: "left" }}>
                    <th style={{ padding: "6px 8px" }}>Medicine</th>
                    <th>Dose</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {record.medications.map((med, idx) => (
                    <tr key={idx} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={{ padding: "6px 8px", color: "var(--text)" }}><strong>{med.name}</strong></td>
                      <td style={{ color: "var(--text2)" }}>{med.dose}</td>
                      <td style={{ color: "var(--text2)" }}>{med.freq}</td>
                      <td style={{ color: "var(--text2)" }}>{med.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Therapy instructions & internal observations panel */}
            {record.therapyInstructions && (
              <div style={{ marginBottom: 8, fontSize: 12 }}>
                <span style={{ color: "var(--text3)" }}>Therapy Notes: </span>
                <span style={{ color: "var(--text2)" }}>{record.therapyInstructions}</span>
              </div>
            )}

            <div style={{ display: "flex", gap: 20, fontSize: 11, color: "var(--text3)", borderTop: "1px dotted var(--bord)", paddingTop: 8, marginTop: 10 }}>
              {record.followUpDate && (
                <div>📅 Follow-up Scheduled: <strong style={{ color: "var(--text)" }}>{record.followUpDate}</strong></div>
              )}
              {record.internalNotes && (
                <div>🔑 Internal Memo: <em>{record.internalNotes}</em></div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PatientRecords;