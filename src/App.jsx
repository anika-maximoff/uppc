import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Services", "Doctors", "About", "Donate", "Contact"];

const SERVICES = [
  {
    icon: "🧠",
    title: "Neurological Rehabilitation",
    desc: "Advanced therapy programs for stroke, spinal cord injury, and brain trauma recovery.",
  },
  {
    icon: "🦾",
    title: "Physiotherapy",
    desc: "Personalised movement therapy to restore strength, balance, and motor function.",
  },
  {
    icon: "💬",
    title: "Speech & Language Therapy",
    desc: "Targeted programs for communication disorders caused by neurological conditions.",
  },
  {
    icon: "🧘",
    title: "Occupational Therapy",
    desc: "Helping patients regain independence in daily activities and quality of life.",
  },
  {
    icon: "⚡",
    title: "Electrotherapy",
    desc: "Cutting-edge electrical stimulation techniques to re-activate paralysed muscles.",
  },
  {
    icon: "🩺",
    title: "Doctor Consultation",
    desc: "Expert neurologists and rehabilitation specialists guiding every step of your journey.",
  },
];

const DOCTORS = [
  { name: "Dr. Amina Khanam", spec: "Neurology & Rehabilitation", exp: "18 yrs", patients: "2,400+" },
  { name: "Dr. Rafiq Hossain", spec: "Spinal Cord Injuries", exp: "14 yrs", patients: "1,800+" },
  { name: "Dr. Nusrat Jahan", spec: "Physiotherapy & Mobility", exp: "11 yrs", patients: "1,500+" },
];

const STATS = [
  { value: "3,200+", label: "Patients Treated" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15+", label: "Years of Service" },
  { value: "40+", label: "Specialist Staff" },
];

const TESTIMONIALS = [
  {
    quote: "After my stroke, I couldn't move my left side at all. The team at UPPC gave me my life back. I'm walking again.",
    name: "Karim Uddin",
    tag: "Stroke Recovery Patient",
  },
  {
    quote: "The doctors and therapists are extraordinarily compassionate. My son's progress in just 6 months has been remarkable.",
    name: "Fatema Begum",
    tag: "Parent of Paediatric Patient",
  },
  {
    quote: "World-class treatment right here in Dhaka. I cannot express enough gratitude for the care I received.",
    name: "Shahidul Islam",
    tag: "Spinal Cord Injury Patient",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#050d1a", color: "#e8e0d0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050d1a; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .gold { color: #c9a84c; }
        .gold-bg { background: #c9a84c; }
        a { text-decoration: none; color: inherit; }

        /* Nav */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 48px; display: flex; align-items: center; justify-content: space-between; transition: all 0.4s; }
        .nav.scrolled { background: rgba(5,13,26,0.95); backdrop-filter: blur(12px); padding: 14px 48px; border-bottom: 1px solid rgba(201,168,76,0.15); }
        .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: 0.05em; }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(232,224,208,0.7); transition: color 0.2s; }
        .nav-links a:hover { color: #c9a84c; }
        .btn-appt { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 22px; border: 1px solid #c9a84c; color: #c9a84c; background: transparent; cursor: pointer; transition: all 0.25s; border-radius: 2px; }
        .btn-appt:hover { background: #c9a84c; color: #050d1a; }

        /* Hero */
        .hero { min-height: 100vh; display: flex; align-items: center; position: relative; padding: 0 48px; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 70% at 20% 80%, rgba(15,60,120,0.3) 0%, transparent 60%); }
        .hero-lines { position: absolute; inset: 0; opacity: 0.04; background-image: repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,168,76,0.8) 80px); }
        .hero-content { position: relative; max-width: 700px; padding-top: 80px; }
        .hero-tag { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a84c; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
        .hero-tag::before { content: ''; display: block; width: 40px; height: 1px; background: #c9a84c; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 7vw, 88px); font-weight: 300; line-height: 1.05; letter-spacing: -0.01em; margin-bottom: 28px; }
        .hero-title em { font-style: italic; color: #c9a84c; }
        .hero-desc { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 300; line-height: 1.8; color: rgba(232,224,208,0.65); max-width: 480px; margin-bottom: 44px; }
        .hero-actions { display: flex; gap: 16px; align-items: center; }
        .btn-primary { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 16px 36px; background: #c9a84c; color: #050d1a; border: none; cursor: pointer; transition: all 0.25s; border-radius: 2px; }
        .btn-primary:hover { background: #dfc06a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.25); }
        .btn-secondary { font-family: 'DM Sans', sans-serif; font-size: 13px; letter-spacing: 0.08em; color: rgba(232,224,208,0.6); display: flex; align-items: center; gap: 8px; transition: color 0.2s; cursor: pointer; background: none; border: none; }
        .btn-secondary:hover { color: #e8e0d0; }
        .hero-scroll { position: absolute; bottom: 40px; left: 48px; display: flex; align-items: center; gap: 12px; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,224,208,0.35); }
        .hero-scroll-line { width: 1px; height: 48px; background: linear-gradient(to bottom, rgba(201,168,76,0.6), transparent); animation: scrollLine 2s ease-in-out infinite; }
        @keyframes scrollLine { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.5);opacity:0.4} }
        .hero-image-area { position: absolute; right: 0; top: 0; bottom: 0; width: 45%; display: flex; align-items: center; justify-content: center; }
        .hero-circle { width: 520px; height: 520px; border-radius: 50%; border: 1px solid rgba(201,168,76,0.12); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .hero-circle-2 { width: 400px; height: 400px; border-radius: 50%; border: 1px solid rgba(201,168,76,0.08); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: rotateSlow 20s linear infinite; }
        .hero-circle-dot { width: 8px; height: 8px; border-radius: 50%; background: #c9a84c; position: absolute; top: 0; left: 50%; transform: translateX(-50%) translateY(-50%); }
        @keyframes rotateSlow { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        .hero-card { position: relative; z-index: 2; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.15); border-radius: 4px; padding: 36px; backdrop-filter: blur(8px); text-align: center; width: 260px; }
        .hero-card-icon { font-size: 40px; margin-bottom: 16px; }
        .hero-card-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; line-height: 1.2; margin-bottom: 8px; }
        .hero-card-sub { font-family: 'DM Sans', sans-serif; font-size: 12px; color: rgba(232,224,208,0.45); letter-spacing: 0.05em; }

        /* Stats */
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(201,168,76,0.12); border-bottom: 1px solid rgba(201,168,76,0.12); }
        .stat-item { padding: 40px 32px; text-align: center; border-right: 1px solid rgba(201,168,76,0.12); }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; color: #c9a84c; line-height: 1; margin-bottom: 10px; }
        .stat-label { font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,224,208,0.45); }

        /* Section */
        section { padding: 100px 48px; }
        .section-label { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a84c; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .section-label::before { content: ''; display: block; width: 32px; height: 1px; background: #c9a84c; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 56px); font-weight: 300; line-height: 1.15; margin-bottom: 20px; }
        .section-sub { font-family: 'DM Sans', sans-serif; font-size: 15px; color: rgba(232,224,208,0.5); line-height: 1.7; max-width: 500px; }

        /* Services */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(201,168,76,0.1); margin-top: 60px; }
        .service-card { background: #050d1a; padding: 40px 32px; transition: background 0.3s; cursor: pointer; }
        .service-card:hover { background: rgba(201,168,76,0.04); }
        .service-icon { font-size: 28px; margin-bottom: 20px; }
        .service-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; margin-bottom: 12px; }
        .service-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.7; color: rgba(232,224,208,0.5); }
        .service-link { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a84c; margin-top: 20px; display: flex; align-items: center; gap: 6px; }

        /* Doctors */
        .doctors-section { background: rgba(201,168,76,0.02); border-top: 1px solid rgba(201,168,76,0.08); border-bottom: 1px solid rgba(201,168,76,0.08); }
        .doctors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 60px; }
        .doctor-card { border: 1px solid rgba(201,168,76,0.12); padding: 40px 32px; text-align: center; transition: border-color 0.3s, transform 0.3s; }
        .doctor-card:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-4px); }
        .doctor-avatar { width: 80px; height: 80px; border-radius: 50%; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 28px; }
        .doctor-name { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; margin-bottom: 8px; }
        .doctor-spec { font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 0.06em; color: #c9a84c; margin-bottom: 20px; }
        .doctor-meta { display: flex; justify-content: center; gap: 28px; border-top: 1px solid rgba(201,168,76,0.1); padding-top: 20px; }
        .doctor-meta-item label { display: block; font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,224,208,0.35); margin-bottom: 4px; }
        .doctor-meta-item span { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; }

        /* Testimonials */
        .testimonial-section { position: relative; overflow: hidden; }
        .testimonial-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%); pointer-events: none; }
        .testimonial-quote { font-family: 'Cormorant Garamond', serif; font-size: clamp(24px, 3vw, 38px); font-weight: 300; font-style: italic; line-height: 1.5; max-width: 780px; margin: 0 auto 40px; text-align: center; color: rgba(232,224,208,0.85); transition: opacity 0.4s; }
        .testimonial-author { text-align: center; }
        .testimonial-name { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; margin-bottom: 4px; }
        .testimonial-tag { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,224,208,0.35); }
        .testimonial-dots { display: flex; justify-content: center; gap: 10px; margin-top: 40px; }
        .testimonial-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(201,168,76,0.25); cursor: pointer; transition: background 0.2s; border: none; }
        .testimonial-dot.active { background: #c9a84c; }

        /* Donation */
        .donate-section { background: linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(5,13,26,1) 60%); border: 1px solid rgba(201,168,76,0.15); margin: 0 48px; border-radius: 4px; padding: 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .donate-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 3.5vw, 48px); font-weight: 300; line-height: 1.2; margin-bottom: 16px; }
        .donate-desc { font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.8; color: rgba(232,224,208,0.55); margin-bottom: 32px; }
        .donate-amounts { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
        .donate-amount { font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 10px 20px; border: 1px solid rgba(201,168,76,0.3); color: rgba(232,224,208,0.6); cursor: pointer; transition: all 0.2s; border-radius: 2px; background: none; }
        .donate-amount:hover, .donate-amount.active { border-color: #c9a84c; color: #c9a84c; background: rgba(201,168,76,0.05); }
        .donate-impact { border-left: 2px solid rgba(201,168,76,0.2); padding-left: 32px; }
        .donate-impact-item { margin-bottom: 24px; }
        .donate-impact-item .amount { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #c9a84c; }
        .donate-impact-item .detail { font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(232,224,208,0.5); margin-top: 4px; }

        /* CTA */
        .cta-section { text-align: center; padding: 120px 48px; }
        .cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 5vw, 68px); font-weight: 300; line-height: 1.15; margin-bottom: 24px; }
        .cta-sub { font-family: 'DM Sans', sans-serif; font-size: 16px; color: rgba(232,224,208,0.5); margin-bottom: 48px; }
        .cta-actions { display: flex; gap: 16px; justify-content: center; }

        /* Footer */
        .footer { border-top: 1px solid rgba(201,168,76,0.1); padding: 60px 48px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; margin-bottom: 16px; }
        .footer-desc { font-family: 'DM Sans', sans-serif; font-size: 13px; line-height: 1.7; color: rgba(232,224,208,0.4); max-width: 260px; }
        .footer-col-title { font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 20px; }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-links a { font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(232,224,208,0.45); transition: color 0.2s; }
        .footer-links a:hover { color: #c9a84c; }
        .footer-bottom { border-top: 1px solid rgba(201,168,76,0.08); padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; }
        .footer-copy { font-family: 'DM Sans', sans-serif; font-size: 12px; color: rgba(232,224,208,0.25); }

        @media (max-width: 768px) {
          .nav { padding: 16px 24px; }
          .nav.scrolled { padding: 12px 24px; }
          .nav-links, .btn-appt { display: none; }
          .hero { padding: 0 24px; }
          .hero-image-area { display: none; }
          section { padding: 70px 24px; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .services-grid { grid-template-columns: 1fr; }
          .doctors-grid { grid-template-columns: 1fr; }
          .donate-section { margin: 0 24px; padding: 48px 32px; grid-template-columns: 1fr; }
          .footer { grid-template-columns: 1fr 1fr; padding: 40px 24px; }
          .footer-bottom { padding: 20px 24px; flex-direction: column; gap: 8px; text-align: center; }
          .cta-section { padding: 80px 24px; }
          .cta-actions { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo serif">
          <span style={{ color: "#c9a84c" }}>UP</span>PC
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
          ))}
        </ul>
        <button className="btn-appt" onClick={() => {}}>Book Appointment</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-lines" />
        <div className="hero-content">
          <div className="hero-tag">Unique Pain & Paralysis Centre — Dhaka</div>
          <h1 className="hero-title serif">
            Restoring <em>Movement.</em><br />
            Renewing <em>Life.</em>
          </h1>
          <p className="hero-desc sans">
            Bangladesh's leading specialised centre for paralysis therapy, neurorehabilitation, and pain management — guided by compassion, driven by science.
          </p>
          <div className="hero-actions">
            <button className="btn-primary sans">Book a Consultation</button>
            <button className="btn-secondary sans">
              <span>Our Services</span>
              <span>→</span>
            </button>
          </div>
        </div>
        <div className="hero-image-area">
          <div className="hero-circle" />
          <div className="hero-circle-2">
            <div className="hero-circle-dot" />
          </div>
          <div className="hero-card">
            <div className="hero-card-icon">🌿</div>
            <div className="hero-card-title serif">Healing<br />Through Care</div>
            <div className="hero-card-sub sans">Expert therapy since 2009</div>
          </div>
        </div>
        <div className="hero-scroll sans">
          <div className="hero-scroll-line" />
          Scroll
        </div>
      </section>

      {/* STATS */}
      <AnimatedSection>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value serif">{s.value}</div>
              <div className="stat-label sans">{s.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* SERVICES */}
      <section id="services">
        <AnimatedSection>
          <div className="section-label sans">What we offer</div>
          <h2 className="section-title serif">
            Comprehensive Care<br />
            <em style={{ color: "#c9a84c" }}>for Every Patient</em>
          </h2>
          <p className="section-sub sans">
            From diagnosis to recovery, our multidisciplinary team delivers specialised therapy programs tailored to each patient's unique needs.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={150}>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-title serif">{s.title}</div>
                <p className="service-desc sans">{s.desc}</p>
                <div className="service-link sans">Learn more →</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* DOCTORS */}
      <section className="doctors-section" id="doctors">
        <AnimatedSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div className="section-label sans">Our specialists</div>
              <h2 className="section-title serif">
                Meet the<br />
                <em style={{ color: "#c9a84c" }}>Expert Team</em>
              </h2>
            </div>
            <button className="btn-appt sans" style={{ marginBottom: "20px" }}>View All Doctors</button>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="doctors-grid">
            {DOCTORS.map((d, i) => (
              <div className="doctor-card" key={i}>
                <div className="doctor-avatar">👨‍⚕️</div>
                <div className="doctor-name serif">{d.name}</div>
                <div className="doctor-spec sans">{d.spec}</div>
                <div className="doctor-meta">
                  <div className="doctor-meta-item">
                    <label className="sans">Experience</label>
                    <span className="serif">{d.exp}</span>
                  </div>
                  <div className="doctor-meta-item">
                    <label className="sans">Patients</label>
                    <span className="serif">{d.patients}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section" id="about">
        <div className="testimonial-bg" />
        <AnimatedSection>
          <div className="section-label sans" style={{ justifyContent: "center" }}>Patient stories</div>
          <div
            className="testimonial-quote serif"
            style={{ opacity: 1 }}
            key={activeTestimonial}
          >
            "{TESTIMONIALS[activeTestimonial].quote}"
          </div>
          <div className="testimonial-author">
            <div className="testimonial-name sans">{TESTIMONIALS[activeTestimonial].name}</div>
            <div className="testimonial-tag sans">{TESTIMONIALS[activeTestimonial].tag}</div>
          </div>
          <div className="testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === activeTestimonial ? "active" : ""}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* DONATION */}
      <section style={{ padding: "100px 0" }} id="donate">
        <AnimatedSection>
          <div className="donate-section">
            <div>
              <div className="section-label sans">Make a difference</div>
              <h2 className="donate-title serif">
                Help Someone<br />
                <em style={{ color: "#c9a84c" }}>Walk Again</em>
              </h2>
              <p className="donate-desc sans">
                Your donation directly funds therapy sessions for patients who cannot afford care. Every contribution changes a life and restores hope.
              </p>
              <div className="donate-amounts">
                {["৳500", "৳1,000", "৳2,500", "৳5,000", "Custom"].map((amt, i) => (
                  <button key={i} className={`donate-amount sans ${i === 1 ? "active" : ""}`}>{amt}</button>
                ))}
              </div>
              <button className="btn-primary sans">Donate Now</button>
            </div>
            <div className="donate-impact">
              <p className="sans" style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,224,208,0.35)", marginBottom: "32px" }}>Your impact</p>
              {[
                { amount: "৳500", detail: "Funds one physiotherapy session for a patient in need" },
                { amount: "৳1,000", detail: "Covers a full week of speech therapy for a stroke patient" },
                { amount: "৳5,000", detail: "Sponsors a complete monthly rehabilitation programme" },
              ].map((item, i) => (
                <div className="donate-impact-item" key={i}>
                  <div className="amount serif">{item.amount}</div>
                  <div className="detail sans">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <AnimatedSection>
          <div className="section-label sans" style={{ justifyContent: "center" }}>Begin your journey</div>
          <h2 className="cta-title serif">
            Ready to Start<br />
            <em style={{ color: "#c9a84c" }}>Your Recovery?</em>
          </h2>
          <p className="cta-sub sans">
            Our specialists are ready to create a personalised treatment plan for you. Take the first step today.
          </p>
          <div className="cta-actions">
            <button className="btn-primary sans">Book an Appointment</button>
            <button className="btn-appt sans">Call Us: +880 1700-000000</button>
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer">
          <div>
            <div className="footer-brand serif"><span style={{ color: "#c9a84c" }}>UP</span>PC</div>
            <p className="footer-desc sans">
              Unique Pain & Paralysis Centre — Dhaka's leading specialised rehabilitation centre, committed to restoring movement and renewing lives since 2009.
            </p>
          </div>
          <div>
            <div className="footer-col-title sans">Services</div>
            <ul className="footer-links">
              {["Physiotherapy", "Neurological Rehab", "Electrotherapy", "Speech Therapy", "Occupational Therapy"].map(l => (
                <li key={l}><a href="#services" className="sans">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title sans">Information</div>
            <ul className="footer-links">
              {["About Us", "Our Doctors", "Patient Stories", "Donate", "Careers"].map(l => (
                <li key={l}><a href="#" className="sans">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title sans">Contact</div>
            <ul className="footer-links">
              <li><a href="#" className="sans">📍 Dhaka, Bangladesh</a></li>
              <li><a href="tel:+8801700000000" className="sans">📞 +880 1700-000000</a></li>
              <li><a href="mailto:info@uppc.com.bd" className="sans">✉️ info@uppc.com.bd</a></li>
              <li><a href="#" className="sans">🕐 Sat–Thu: 8am – 8pm</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy sans">© 2025 Unique Pain & Paralysis Centre. All rights reserved.</span>
          <span className="footer-copy sans">Designed with care for our patients</span>
        </div>
      </footer>
    </div>
  );
}
