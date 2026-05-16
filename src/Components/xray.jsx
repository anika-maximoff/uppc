import { useState } from "react";

export default function Xray() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult(null);
  };

  const analyzeXray = () => {
    if (!image) return;

    setLoading(true);

    setTimeout(() => {
      setResult({
        status: "Possible Abnormality Detected",
        confidence: "78%",
        findings: [
          "Possible lung opacity detected",
          "Chest area may show infection-related pattern",
          "Further doctor review is required",
        ],
        possibleDisease: "Possible Pneumonia / Chest Infection",
        advice:
          "This is not a confirmed diagnosis. Please consult a qualified doctor or radiologist for final confirmation.",
      });

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="fade-in">
      <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="sh">
          <div className="sh-title serif">
            Chest <span>X-Ray Analysis</span>
          </div>
        </div>

        <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>
          Upload a chest X-ray image from your PC. The system will show an AI-style
          analysis result for possible chest problems.
        </p>

        <div className="field" style={{ marginBottom: 20 }}>
          <label>Upload Chest X-Ray</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {image && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div>
              <div className="dvd" style={{ marginTop: 0 }}>
                Uploaded X-Ray
              </div>

              <img
                src={image}
                alt="Uploaded X-Ray"
                style={{
                  width: "100%",
                  maxHeight: 420,
                  objectFit: "contain",
                  borderRadius: "var(--rl)",
                  border: "1px solid var(--bord)",
                  background: "var(--navy3)",
                  padding: 10,
                }}
              />

              <button
                className="btn-gold"
                onClick={analyzeXray}
                style={{ marginTop: 18 }}
              >
                {loading ? "Analyzing..." : "Analyze X-Ray"}
              </button>
            </div>

            <div>
              <div className="dvd" style={{ marginTop: 0 }}>
                AI Feedback
              </div>

              {!result && !loading && (
                <div className="card-s">
                  <p style={{ fontSize: 13, color: "var(--text3)" }}>
                    Click analyze to generate feedback.
                  </p>
                </div>
              )}

              {loading && (
                <div className="card-s">
                  <p style={{ fontSize: 13, color: "var(--gold)" }}>
                    Scanning X-ray image...
                  </p>
                </div>
              )}

              {result && (
                <div className="card-s">
                  <div
                    className="serif"
                    style={{
                      fontSize: 24,
                      color: "var(--gold)",
                      marginBottom: 10,
                    }}
                  >
                    {result.status}
                  </div>

                  <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 10 }}>
                    Confidence: <strong>{result.confidence}</strong>
                  </p>

                  <p style={{ fontSize: 13, color: "var(--text)", marginBottom: 8 }}>
                    Possible Disease:
                  </p>

                  <div
                    style={{
                      padding: "10px 12px",
                      border: "1px solid var(--gbord)",
                      borderRadius: "var(--r)",
                      color: "var(--gold)",
                      marginBottom: 14,
                    }}
                  >
                    {result.possibleDisease}
                  </div>

                  <p style={{ fontSize: 13, color: "var(--text)", marginBottom: 8 }}>
                    Findings:
                  </p>

                  <ul style={{ paddingLeft: 18, marginBottom: 14 }}>
                    {result.findings.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          fontSize: 12,
                          color: "var(--text2)",
                          marginBottom: 6,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: "var(--danger)",
                    }}
                  >
                    {result.advice}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}