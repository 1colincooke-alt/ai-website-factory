import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = {
  obsidian: "#0A0A0B",
  charcoal: "#111114",
  graphite: "#1A1A1F",
  smoke: "#2A2A32",
  mist: "#E8E4DC",
  cream: "#F4F0E8",
  ivory: "#FAF8F4",
  gold: "#C9A96E",
  goldLight: "#E4C98A",
  goldDark: "#9B7A45",
  rose: "#D4A0A0",
  roseLight: "#EDD5D5",
  sage: "#8BA89A",
};

const testimonials = [
  {
    name: "Tammy Camarillo",
    role: "Local Guide",
    text: "Amy is incredibly knowledgeable, professional, and truly takes the time to understand your skin and aesthetic goals. The most amazing experience — I left feeling radiant.",
    stars: 5,
    highlight: "gentle hand",
  },
  {
    name: "Averey Lee",
    role: "Verified Client",
    text: "She was so patient and answered every single question we had. Truly impressive how strategic she was in mapping out treatment areas — you can tell she genuinely cares.",
    stars: 5,
    highlight: "personalized visits",
  },
  {
    name: "Vicky Liang",
    role: "Verified Client",
    text: "Amy is a true perfectionist — she triple-checked all markings before injecting, which immediately put me at ease. The spotless space and warm atmosphere made it exceptional.",
    stars: 5,
    highlight: "spotless space",
  },
  {
    name: "Sarah M.",
    role: "Repeat Client",
    text: "Amazing prices, amazing skills, and such a friendly vibe every visit. I wouldn't trust anyone else with my face. Amy has truly transformed my confidence.",
    stars: 5,
    highlight: "friendly vibe",
  },
];

const services = [
  {
    id: "neuromodulators",
    title: "Neuromodulators",
    subtitle: "Botox · Dysport · Xeomin",
    desc: "Precision-placed relaxing injections that soften dynamic lines and restore youthful expression — never frozen, always naturally you.",
    icon: "✦",
    price: "Starting at $11/unit",
    color: COLORS.gold,
  },
  {
    id: "fillers",
    title: "Dermal Fillers",
    subtitle: "Lip · Cheek · Jawline · Tear Trough",
    desc: "Hyaluronic acid artistry to sculpt, lift, and restore volume with a light touch that honors your unique facial architecture.",
    icon: "◈",
    price: "Starting at $650/syringe",
    color: COLORS.rose,
  },
  {
    id: "skin",
    title: "Skin Rejuvenation",
    subtitle: "Chemical Peels · Microneedling",
    desc: "Medical-grade treatments that resurface, brighten, and rebuild collagen for skin that genuinely glows from within.",
    icon: "❋",
    price: "Starting at $150",
    color: COLORS.sage,
  },
  {
    id: "prp",
    title: "PRP Therapy",
    subtitle: "Vampire Facial · Hair Restoration",
    desc: "Harness your body's own regenerative power. Platelet-rich plasma treatments for skin renewal and hair revitalization.",
    icon: "◉",
    price: "Starting at $450",
    color: COLORS.goldLight,
  },
  {
    id: "kybella",
    title: "Body Contouring",
    subtitle: "Kybella · Sculptra",
    desc: "Non-surgical sculpting solutions that define and refine — from dissolving submental fullness to stimulating collagen throughout.",
    icon: "◇",
    price: "Custom pricing",
    color: COLORS.rose,
  },
  {
    id: "wellness",
    title: "Wellness IV & Skin Care",
    subtitle: "IV Drips · Medical-Grade Facials",
    desc: "Comprehensive wellness protocols combining intravenous nutrient therapy with corrective skincare for total radiance.",
    icon: "✧",
    price: "Starting at $125",
    color: COLORS.sage,
  },
];

const differentiators = [
  { icon: "◈", title: "5.0 Stars", sub: "19 verified reviews — perfect rating" },
  { icon: "✦", title: "Women-Owned", sub: "Asian & women-led practice" },
  { icon: "❋", title: "LGBTQ+ Welcoming", sub: "Affirming care for everyone" },
  { icon: "◉", title: "Precision Approach", sub: "Triple-checked markings, always" },
];

function StarRating({ count = 5 }) {
  return (
    <span style={{ color: COLORS.gold, letterSpacing: 2, fontSize: 14 }}>
      {"★".repeat(count)}
    </span>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimateIn({ children, delay = 0, y = 32, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.9s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Animated orbs canvas
function OrbCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;
    const orbs = [
      { x: 0.2, y: 0.3, r: 280, color: "rgba(201,169,110,0.08)", speed: 0.0003 },
      { x: 0.8, y: 0.6, r: 350, color: "rgba(212,160,160,0.06)", speed: 0.0002 },
      { x: 0.5, y: 0.8, r: 200, color: "rgba(139,168,154,0.07)", speed: 0.0004 },
    ];
    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach((o) => {
        const x = (o.x + Math.sin(t * o.speed * 1000) * 0.08) * canvas.width;
        const y = (o.y + Math.cos(t * o.speed * 800) * 0.06) * canvas.height;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, o.r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

// Floating particles
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      life: Math.random(),
      size: Math.random() * 1.5 + 0.5,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.003;
        if (p.y < 0 || p.life > 1) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.life = 0;
        }
        const alpha = Math.sin(p.life * Math.PI) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

function GoldLine({ width = "100%", style = {} }) {
  return (
    <div style={{
      width, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
      margin: "0 auto", ...style
    }} />
  );
}

function CTAButton({ children, primary = false, onClick, href, style = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: primary ? "16px 40px" : "14px 36px",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: primary ? 17 : 15,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    transition: "all 0.3s ease",
    ...style,
  };
  const styles = primary
    ? { ...base, background: COLORS.gold, color: COLORS.obsidian }
    : { ...base, background: "transparent", color: COLORS.gold, border: `1px solid ${COLORS.gold}` };

  const [hovered, setHovered] = useState(false);
  const hoverStyles = primary
    ? { background: COLORS.goldLight, transform: "translateY(-2px)", boxShadow: `0 8px 32px rgba(201,169,110,0.3)` }
    : { background: `rgba(201,169,110,0.08)`, transform: "translateY(-2px)" };

  const el = href ? "a" : "button";
  const props = { href, onClick, style: { ...styles, ...(hovered ? hoverStyles : {}) }, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) };

  if (el === "a") return <a {...props}>{children} <span style={{ fontSize: 18 }}>→</span></a>;
  return <button {...props}>{children} <span style={{ fontSize: 18 }}>→</span></button>;
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Results", href: "#results" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? "14px 48px" : "24px 48px",
      background: scrolled ? `rgba(10,10,11,0.95)` : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(201,169,110,0.15)` : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: COLORS.cream, letterSpacing: "0.15em", fontWeight: 600 }}>
        ONE <span style={{ color: COLORS.gold }}>MED SPA</span>
      </div>

      <div style={{ display: "flex", gap: 40, alignItems: "center" }} className="nav-desktop">
        {navLinks.map(l => (
          <a key={l.label} href={l.href} style={{
            color: COLORS.mist, fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15, letterSpacing: "0.1em", textDecoration: "none",
            textTransform: "uppercase", opacity: 0.8, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.color = COLORS.gold; e.target.style.opacity = 1; }}
            onMouseLeave={e => { e.target.style.color = COLORS.mist; e.target.style.opacity = 0.8; }}
          >{l.label}</a>
        ))}
        <CTAButton href="tel:9169009434" style={{ padding: "10px 24px", fontSize: 13 }}>
          Book Now
        </CTAButton>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.gold, fontSize: 24, display: "none" }}
        className="nav-mobile-btn"
        aria-label="Menu"
      >≡</button>

      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: COLORS.obsidian, zIndex: 999,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: COLORS.gold, fontSize: 32, cursor: "pointer" }}>×</button>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: COLORS.cream, fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase",
            }}>{l.label}</a>
          ))}
          <CTAButton href="tel:9169009434" primary>Book Your Consultation</CTAButton>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
      justifyContent: "center", overflow: "hidden", background: COLORS.obsidian,
    }}>
      <OrbCanvas />
      <ParticleField />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, backgroundImage:
          `linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
           linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
          display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 40,
          padding: "10px 24px", border: `1px solid rgba(201,169,110,0.3)`,
          borderRadius: 100,
        }}>
          <StarRating />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: COLORS.mist, letterSpacing: "0.1em" }}>
            5.0 · 19 Reviews · Sacramento, CA
          </span>
        </div>

        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 8vw, 108px)",
            fontWeight: 300,
            lineHeight: 0.95,
            color: COLORS.cream,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}>
            Where Artistry
          </h1>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 8vw, 108px)",
            fontWeight: 600,
            lineHeight: 0.95,
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundImage: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight}, ${COLORS.gold})`,
            margin: "0 0 24px",
            letterSpacing: "-0.02em",
          }}>
            Meets Medicine
          </h1>
        </div>

        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s ease 0.5s",
        }}>
          <GoldLine width={80} style={{ marginBottom: 32 }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 300,
            color: COLORS.mist,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 48px",
            opacity: 0.85,
          }}>
            Sacramento's premier medical spa where precision injection artistry and evidence-based skincare converge to reveal your most radiant self.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton href="#contact" primary>Book Consultation</CTAButton>
            <CTAButton href="#services">Explore Services</CTAButton>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.5s",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: COLORS.gold, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{
            width: 1, height: 48, background: `linear-gradient(${COLORS.gold}, transparent)`,
            animation: "scrollPulse 2s ease infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}

function DifferentiatorsBar() {
  return (
    <section style={{ background: COLORS.charcoal, padding: "0", borderTop: `1px solid rgba(201,169,110,0.15)`, borderBottom: `1px solid rgba(201,169,110,0.15)` }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 0,
      }}>
        {differentiators.map((d, i) => (
          <div key={i} style={{
            padding: "36px 32px", textAlign: "center",
            borderRight: i < differentiators.length - 1 ? `1px solid rgba(201,169,110,0.15)` : "none",
          }}>
            <div style={{ fontSize: 22, color: COLORS.gold, marginBottom: 12 }}>{d.icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: COLORS.cream, fontWeight: 600, marginBottom: 4 }}>{d.title}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: COLORS.mist, opacity: 0.6, letterSpacing: "0.05em" }}>{d.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="services" style={{ background: COLORS.charcoal, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimateIn>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              Our Offerings
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", color: COLORS.cream, fontWeight: 300, margin: "0 0 24px", lineHeight: 1.1 }}>
              Treatments Crafted<br /><em style={{ fontStyle: "italic", color: COLORS.gold }}>For You</em>
            </h2>
            <GoldLine width={60} />
          </div>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 2 }}>
          {services.map((s, i) => (
            <AnimateIn key={s.id} delay={i * 0.08}>
              <div
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                style={{
                  padding: "48px 40px",
                  background: active === s.id ? COLORS.graphite : "transparent",
                  border: `1px solid ${active === s.id ? `rgba(201,169,110,0.3)` : `rgba(201,169,110,0.1)`}`,
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  transform: active === s.id ? "translateY(-4px)" : "none",
                  position: "relative", overflow: "hidden",
                }}
              >
                {active === s.id && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                  }} />
                )}
                <div style={{ fontSize: 24, color: s.color, marginBottom: 20, transition: "transform 0.3s", transform: active === s.id ? "scale(1.1)" : "scale(1)" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: COLORS.cream, fontWeight: 600, margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: s.color, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px", opacity: 0.8 }}>{s.subtitle}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: COLORS.mist, lineHeight: 1.7, margin: "0 0 24px", opacity: 0.75 }}>{s.desc}</p>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: COLORS.gold, fontStyle: "italic" }}>{s.price}</div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3} style={{ textAlign: "center", marginTop: 64 }}>
          <CTAButton href="tel:9169009434" primary>Schedule Your Consultation</CTAButton>
        </AnimateIn>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ background: COLORS.obsidian, padding: "120px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", right: -200, top: "50%", transform: "translateY(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <AnimateIn>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
              About Amy & One Med Spa
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 56px)", color: COLORS.cream, fontWeight: 300, margin: "0 0 32px", lineHeight: 1.15 }}>
              A New Standard<br />of <em style={{ fontStyle: "italic", color: COLORS.gold }}>Aesthetic Excellence</em>
            </h2>
            <GoldLine width={60} style={{ marginLeft: 0, marginBottom: 32 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: COLORS.mist, lineHeight: 1.8, marginBottom: 24, opacity: 0.8 }}>
              Located in the heart of Sacramento, One Med Spa was founded on a singular belief: that aesthetic medicine is an art form that demands both clinical precision and deep compassion.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: COLORS.mist, lineHeight: 1.8, marginBottom: 40, opacity: 0.8 }}>
              Amy, our lead injector and founder, brings an obsessive attention to detail — triple-checking every marking, studying every angle, honoring every individual's unique facial anatomy. You won't leave here looking "done." You'll leave looking like yourself, elevated.
            </p>
            <div style={{ display: "flex", gap: 48, marginBottom: 40 }}>
              {[["19", "5-Star Reviews"], ["100%", "Satisfaction Rate"], ["5+", "Years Experience"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, color: COLORS.gold, fontWeight: 300, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: COLORS.mist, opacity: 0.6, letterSpacing: "0.08em", marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
            <CTAButton href="#contact">Meet Amy</CTAButton>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: "100%", paddingBottom: "120%",
              background: COLORS.graphite,
              border: `1px solid rgba(201,169,110,0.2)`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 24,
              }}>
                <div style={{
                  width: 120, height: 120, borderRadius: "50%",
                  border: `2px solid rgba(201,169,110,0.3)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: COLORS.gold }}>✦</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: COLORS.cream, textAlign: "center", letterSpacing: "0.1em" }}>One Med Spa</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: COLORS.gold, letterSpacing: "0.2em", textTransform: "uppercase" }}>Sacramento, CA</div>
                <div style={{ textAlign: "center", padding: "0 40px" }}>
                  <StarRating />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: COLORS.mist, opacity: 0.6, marginTop: 8 }}>Perfect 5.0 Rating</div>
                </div>
              </div>
              {/* Decorative corner lines */}
              {[
                { top: 20, left: 20, borderTop: `1px solid ${COLORS.gold}`, borderLeft: `1px solid ${COLORS.gold}`, width: 40, height: 40 },
                { top: 20, right: 20, borderTop: `1px solid ${COLORS.gold}`, borderRight: `1px solid ${COLORS.gold}`, width: 40, height: 40 },
                { bottom: 20, left: 20, borderBottom: `1px solid ${COLORS.gold}`, borderLeft: `1px solid ${COLORS.gold}`, width: 40, height: 40 },
                { bottom: 20, right: 20, borderBottom: `1px solid ${COLORS.gold}`, borderRight: `1px solid ${COLORS.gold}`, width: 40, height: 40 },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", opacity: 0.5, ...s }} />
              ))}
            </div>
            {/* Floating badge */}
            <div style={{
              position: "absolute", bottom: -24, right: -24,
              background: COLORS.gold, padding: "20px 28px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.obsidian, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Women-Owned</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: COLORS.obsidian, opacity: 0.7, marginTop: 2 }}>Asian-Owned · LGBTQ+ Welcoming</div>
            </div>
          </div>
        </AnimateIn>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .grid-2col { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { n: "01", title: "Consultation", desc: "We begin with an in-depth conversation about your goals, concerns, and facial anatomy. No rushing. No sales pressure. Just careful listening." },
    { n: "02", title: "Personalized Plan", desc: "Amy maps a strategic treatment plan unique to your structure — studying proportions, asymmetries, and opportunities to harmonize your features." },
    { n: "03", title: "Precision Treatment", desc: "With triple-checked markings and a gentle hand, every injection is placed with surgical intention. Comfort and safety are always paramount." },
    { n: "04", title: "Aftercare & Follow-up", desc: "You'll leave with detailed aftercare instructions and a follow-up appointment. We're with you every step of your transformation journey." },
  ];

  return (
    <section id="results" style={{ background: COLORS.graphite, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimateIn style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>The Experience</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 56px)", color: COLORS.cream, fontWeight: 300, lineHeight: 1.1, margin: "0 0 24px" }}>
            Your Journey to<br /><em style={{ color: COLORS.gold, fontStyle: "italic" }}>Radiance</em>
          </h2>
          <GoldLine width={60} />
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2, position: "relative" }}>
          {steps.map((s, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div style={{ padding: "48px 32px", borderTop: `2px solid rgba(201,169,110,0.15)`, position: "relative" }}>
                <div style={{ position: "absolute", top: -1, left: 32, width: 48, height: 2, background: COLORS.gold }} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, color: `rgba(201,169,110,0.12)`, fontWeight: 700, lineHeight: 1, marginBottom: 20, position: "absolute", top: 24, right: 24 }}>{s.n}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Step {s.n}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: COLORS.cream, fontWeight: 600, margin: "0 0 16px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: COLORS.mist, lineHeight: 1.7, opacity: 0.7 }}>{s.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section id="testimonials" style={{ background: COLORS.obsidian, padding: "120px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        width: 700, height: 700, borderRadius: "50%",
        border: `1px solid rgba(201,169,110,0.05)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        width: 500, height: 500, borderRadius: "50%",
        border: `1px solid rgba(201,169,110,0.08)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <AnimateIn style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>Client Stories</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 56px)", color: COLORS.cream, fontWeight: 300, lineHeight: 1.1 }}>
            Real Results,<br /><em style={{ color: COLORS.gold, fontStyle: "italic" }}>Real People</em>
          </h2>
        </AnimateIn>

        <div style={{ position: "relative", minHeight: 320 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              position: i === 0 ? "relative" : "absolute", top: 0, left: 0, right: 0,
              opacity: active === i ? 1 : 0,
              transform: active === i ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: active === i ? "auto" : "none",
            }}>
              <div style={{ textAlign: "center", padding: "0 40px" }}>
                <div style={{ fontSize: 60, color: `rgba(201,169,110,0.2)`, fontFamily: "Georgia", lineHeight: 0.8, marginBottom: 24 }}>"</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: COLORS.cream, lineHeight: 1.65, fontStyle: "italic", fontWeight: 300, marginBottom: 40 }}>
                  {t.text}
                </p>
                <GoldLine width={40} style={{ marginBottom: 24 }} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.cream, fontWeight: 600, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: COLORS.gold, letterSpacing: "0.1em" }}>{t.role}</div>
                <div style={{ marginTop: 8 }}><StarRating /></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 48 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => { setActive(i); clearInterval(timerRef.current); }} style={{
              width: active === i ? 32 : 8, height: 8,
              background: active === i ? COLORS.gold : `rgba(201,169,110,0.3)`,
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: 4,
            }} />
          ))}
        </div>

        <AnimateIn delay={0.2} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 2, marginTop: 80 }}>
          {[
            { label: "\"Amazing prices, amazing skills\"", attr: "— Google Review" },
            { label: "\"Exceptional from start to finish\"", attr: "— Google Review" },
            { label: "\"I highly recommend Amy\"", attr: "— Google Review" },
          ].map((q, i) => (
            <div key={i} style={{ padding: "28px 24px", border: `1px solid rgba(201,169,110,0.12)`, textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: COLORS.mist, fontStyle: "italic", margin: "0 0 12px", lineHeight: 1.5 }}>{q.label}</p>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, opacity: 0.7 }}>{q.attr}</span>
            </div>
          ))}
        </AnimateIn>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section style={{ background: COLORS.graphite, padding: "80px 24px", borderTop: `1px solid rgba(201,169,110,0.15)`, borderBottom: `1px solid rgba(201,169,110,0.15)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <AnimateIn>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", color: COLORS.cream, fontWeight: 300, margin: "0 0 20px", lineHeight: 1.15 }}>
            Ready to Begin Your<br /><em style={{ color: COLORS.gold, fontStyle: "italic" }}>Transformation?</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: COLORS.mist, opacity: 0.7, marginBottom: 40, lineHeight: 1.6 }}>
            Your complimentary consultation includes a full facial assessment and personalized treatment roadmap.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton href="tel:9169009434" primary>Call (916) 900-9434</CTAButton>
            <CTAButton href="https://onemedspa.co" style={{ color: COLORS.mist, borderColor: `rgba(255,255,255,0.2)` }}>Visit Website</CTAButton>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email) setSubmitted(true);
  };

  return (
    <section id="contact" style={{ background: COLORS.charcoal, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
        <AnimateIn>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>Book Your Visit</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", color: COLORS.cream, fontWeight: 300, lineHeight: 1.15, marginBottom: 32 }}>
              Begin Your<br /><em style={{ color: COLORS.gold, fontStyle: "italic" }}>Journey</em>
            </h2>
            <GoldLine width={60} style={{ marginLeft: 0, marginBottom: 40 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { icon: "📍", label: "Location", value: "950 Fulton Ave, Ste 260\nSacramento, CA 95825" },
                { icon: "📞", label: "Phone", value: "(916) 900-9434" },
                { icon: "🕐", label: "Hours", value: "Tue–Sat: 7:30 AM – 6 PM\nClosed Sun & Mon" },
                { icon: "🌐", label: "Website", value: "onemedspa.co" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: 2 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.mist, lineHeight: 1.6, whiteSpace: "pre-line", opacity: 0.8 }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, padding: 32, border: `1px solid rgba(201,169,110,0.2)`, background: `rgba(201,169,110,0.03)` }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}><StarRating /></div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.cream, fontStyle: "italic", margin: "0 0 12px", lineHeight: 1.6 }}>
                "From the start to finish, the experience was exceptional."
              </p>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: COLORS.gold }}>— Verified Google Review</span>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", gap: 24 }}>
              <div style={{ width: 80, height: 80, border: `2px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>✓</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: COLORS.cream }}>Message Received</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.mist, opacity: 0.7 }}>Amy will be in touch within 24 hours to confirm your consultation.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { key: "name", placeholder: "Your Full Name", type: "text" },
                { key: "email", placeholder: "Email Address", type: "email" },
                { key: "phone", placeholder: "Phone Number", type: "tel" },
              ].map(f => (
                <input key={f.key} type={f.type} placeholder={f.placeholder} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{
                    background: COLORS.graphite, border: `1px solid rgba(201,169,110,0.2)`,
                    padding: "18px 24px", color: COLORS.cream, fontSize: 17,
                    fontFamily: "'Cormorant Garamond', serif", outline: "none", width: "100%",
                    boxSizing: "border-box", letterSpacing: "0.03em",
                  }}
                  onFocus={e => e.target.style.borderColor = COLORS.gold}
                  onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.2)"}
                />
              ))}
              <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{
                background: COLORS.graphite, border: `1px solid rgba(201,169,110,0.2)`,
                padding: "18px 24px", color: form.service ? COLORS.cream : `rgba(248,244,236,0.4)`,
                fontSize: 17, fontFamily: "'Cormorant Garamond', serif", outline: "none",
              }}>
                <option value="" disabled>Area of Interest</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
              <textarea placeholder="Tell us about your goals (optional)" value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={4}
                style={{
                  background: COLORS.graphite, border: `1px solid rgba(201,169,110,0.2)`,
                  padding: "18px 24px", color: COLORS.cream, fontSize: 17,
                  fontFamily: "'Cormorant Garamond', serif", outline: "none",
                  resize: "vertical",
                }}
                onFocus={e => e.target.style.borderColor = COLORS.gold}
                onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.2)"}
              />
              <CTAButton primary onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>
                Request My Consultation
              </CTAButton>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.mist, opacity: 0.5, textAlign: "center", lineHeight: 1.5 }}>
                Complimentary consultation · No commitment required · Response within 24 hours
              </p>
            </div>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: COLORS.obsidian, padding: "60px 24px 40px", borderTop: `1px solid rgba(201,169,110,0.15)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: COLORS.cream, letterSpacing: "0.15em", fontWeight: 600, marginBottom: 8 }}>
              ONE <span style={{ color: COLORS.gold }}>MED SPA</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: COLORS.mist, opacity: 0.5 }}>Sacramento's Premier Medical Spa</div>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { title: "Services", links: ["Neuromodulators", "Dermal Fillers", "Skin Rejuvenation", "PRP Therapy"] },
              { title: "Company", links: ["About Amy", "Our Approach", "Testimonials", "Book Now"] },
              { title: "Connect", links: ["(916) 900-9434", "onemedspa.co", "Instagram", "Google Maps"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: COLORS.mist, opacity: 0.5, marginBottom: 10, cursor: "pointer" }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <GoldLine style={{ marginBottom: 32 }} />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.mist, opacity: 0.4 }}>
            © 2025 One Med Spa · 950 Fulton Ave Ste 260, Sacramento, CA 95825
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: COLORS.mist, opacity: 0.4 }}>
            Women-Owned · Asian-Owned · LGBTQ+ Welcoming
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function OneMedSpa() {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", background: COLORS.obsidian, minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        input::placeholder, textarea::placeholder { color: rgba(248,244,236,0.35); font-family: 'Cormorant Garamond', serif; font-style: italic; }
        select option { background: #1A1A1F; color: #E8E4DC; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0B; }
        ::-webkit-scrollbar-thumb { background: #C9A96E; }
        @media (max-width: 768px) {
          nav { padding: 16px 24px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          .grid-2col-about { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <NavBar />
      <HeroSection />
      <DifferentiatorsBar />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaBanner />
      <ContactSection />
      <Footer />
    </div>
  );
}
