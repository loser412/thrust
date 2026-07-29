import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── COLOR PALETTE (DARK RETRO WITH VINTAGE GROWTH ACCENTS) ─── */
const BG_DARK   = '#12100E';       // deep vintage bronze-charcoal
const BG_LIGHT  = '#EFEADF';       // warm retro cream
const BG_ACCENT = '#1C1916';       // deep warm mahogany highlights
const ACCENT    = '#2DCC70';       // retro phosphor mint green (growth)
const AMBER     = '#E59A3B';       // retro amber gold (trajectory)
const RUST      = '#C25942';       // retro terracotta/rust
const WHITE     = '#EFEADF';       // warm cream-white text on dark
const DARK_TXT  = '#1D1714';       // stark dark brown-black text on cream
const MUTED_D   = '#9E938B';       // warm muted text on dark
const MUTED_L   = '#7C7066';       // warm muted text on light
const BORDER_D  = 'rgba(239,234,223,0.06)';
const BORDER_L  = 'rgba(29,23,20,0.08)';

/* ─── FONTS ─── */
const FD = 'var(--font-display)';   // Cormorant Garamond
const FB = 'var(--font-body)';      // Plus Jakarta Sans
const FM = 'var(--font-mono)';      // monospace

/* ─── DATA ─── */
const WHAT_WE_DID = [
  'Social Media Account Direction',
  'Content Rhythm & Scheduling',
  'High-Fidelity Visual Design',
  'Unified Brand Identity Systems',
  'Organic Reach Optimisation',
];

const CAPS = [
  { n:'01', t:'Social Media',     d:'Always-on creative, community management, and channel direction that earns attention.' },
  { n:'02', t:'SEO',              d:'Search strategy and content built to turn intent into sustained organic demand.' },
  { n:'03', t:'Content Systems',  d:'A repeatable creative engine for campaigns, launch moments, and daily publishing.' },
  { n:'04', t:'Web Architecture', d:'Conversion-led landing pages and journeys that make every visit work harder.' },
  { n:'05', t:'Brand Identity',   d:'A distinct visual and verbal system that gives every growth channel a clear point of view.' },
  { n:'06', t:'Paid Media',       d:'Testing, targeting, and optimisation designed to compound efficient acquisition.' },
];

const SS = ['smm%20ss.PNG','smm%20ss%202.PNG'];

function GrowthCapabilities({ sectionPad }) {
  return (
    <section style={{ background: BG_LIGHT, ...sectionPad, color: DARK_TXT, borderBottom: `1px solid ${BORDER_L}` }}>
      <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <span style={{ width: '22px', height: '2px', background: RUST }} />
        <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: RUST, textTransform: 'uppercase', fontWeight: 700 }}>Growth Capabilities</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, .9fr) minmax(0, 2.1fr)', gap: 'clamp(36px, 7vw, 100px)', alignItems: 'end', marginBottom: '46px' }}>
        <div>
          <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(38px,5.2vw,68px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 18px', color: DARK_TXT }}>
            Growth<br />capabilities.
          </h2>
          <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.8, color: MUTED_L, margin: 0, maxWidth: '340px' }}>
            The services that connect brand, distribution, and conversion into one momentum engine.
          </p>
        </div>
        <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: DARK_TXT, margin: 0, maxWidth: '560px' }}>
          Choose one capability or connect them all. Every engagement is shaped around the work that will create the clearest next move for your business.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        {CAPS.map(({ n, t, d }, index) => (
          <article key={n} className="mkt-reveal" style={{ minHeight: '210px', background: index === 5 ? BG_DARK : '#FFFFFF', color: index === 5 ? WHITE : DARK_TXT, border: `1px solid ${index === 5 ? BORDER_D : BORDER_L}`, padding: '28px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ fontFamily: FM, fontSize: '9px', color: index === 5 ? ACCENT : RUST, letterSpacing: '0.12em', fontWeight: 700 }}>{n}</span>
              <span style={{ width: '22px', height: '1px', background: index === 5 ? ACCENT : RUST }} />
            </div>
            <div>
              <h3 style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(23px,2.2vw,31px)', letterSpacing: '-0.01em', lineHeight: 1, color: 'inherit', margin: '0 0 13px' }}>{t}</h3>
              <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.7, color: index === 5 ? MUTED_D : MUTED_L, margin: 0 }}>{d}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function MarketingPage() {
  const heroRef     = useRef(null);
  const caseRef     = useRef(null);
  const p1Ref       = useRef(null);
  const p2Ref       = useRef(null);
  const f1Ref       = useRef(null);
  const f2Ref       = useRef(null);
  const heroPathRef = useRef(null);
  const hc1Ref      = useRef(null);
  const hc2Ref      = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {

      /* Hero text entrance */
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.ha') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );

      /* Animate hero growth bar (draw path) */
      if (heroPathRef.current) {
        try {
          const len = heroPathRef.current.getTotalLength();
          heroPathRef.current.style.strokeDasharray = len;
          heroPathRef.current.style.strokeDashoffset = len;
          
          const tl = gsap.timeline({ delay: 0.6 });
          tl.to(heroPathRef.current, {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: 'power2.inOut',
          });

          if (hc1Ref.current) {
            tl.fromTo(hc1Ref.current, 
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
              '-=1.2'
            );
          }
          if (hc2Ref.current) {
            tl.fromTo(hc2Ref.current,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
              '-=0.4'
            );
          }
        } catch (_) {}
      }

      /* Scroll-linked chart path draw (Case Study) */
      [p1Ref.current, p2Ref.current].filter(Boolean).forEach((path, i) => {
        try {
          const len = path.getTotalLength();
          path.style.strokeDasharray = len;
          path.style.strokeDashoffset = len;
          gsap.to(path, {
            strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', delay: i * 0.35,
            scrollTrigger: { trigger: caseRef.current, start: 'top 72%', once: true },
          });
        } catch (_) {}
      });
      [f1Ref.current, f2Ref.current].filter(Boolean).forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 1, duration: 1.5, delay: 0.9 + i * 0.3,
          scrollTrigger: { trigger: caseRef.current, start: 'top 72%', once: true },
        });
      });

      /* Cine reveals (staggered scroll-reveals) */
      document.querySelectorAll('.mkt-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
        );
      });

      /* Floating aura animation */
      gsap.to('.mkt-aura', { y: 15, duration: 4, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    });
    return () => ctx.revert();
  }, []);

  /* ── SHARED STYLES ── */
  const sectionPad = { padding: '96px clamp(24px,6vw,80px)', boxSizing: 'border-box' };
  const label = (color = ACCENT) => ({
    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px',
  });
  const labelLine = (color = ACCENT) => ({ width: '22px', height: '2px', background: color, flexShrink: 0 });
  const labelText = (color = ACCENT) => ({
    fontFamily: FM, fontSize: '10px', letterSpacing: '0.2em',
    color, textTransform: 'uppercase', fontWeight: 700,
  });

  return (
    <div style={{ background: BG_DARK, color: WHITE, fontFamily: FB, overflowX: 'hidden' }}>

      {/* ── Injected global styles ─────────────────────────── */}
      <style>{`
        .mkt-bg-grid {
          background-image:
            linear-gradient(rgba(45,204,112,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,204,112,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .mkt-btn-fill {
          display: inline-block; text-decoration: none;
          background: ${ACCENT};
          color: ${BG_DARK};
          font-family: ${FM}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 16px 32px; border-radius: 2px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mkt-btn-fill:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(45,204,112,0.25); }
        .mkt-btn-ghost {
          display: inline-block; text-decoration: none;
          border: 1px solid rgba(239,234,223,0.18); color: ${WHITE};
          font-family: ${FM}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 16px 32px; background: transparent; border-radius: 2px;
          transition: border-color 0.2s, color 0.2s;
        }
        .mkt-btn-ghost:hover { border-color: ${ACCENT}; color: ${ACCENT}; }
        .mkt-cap-row {
          display: flex; flex-direction: column; gap: 3px;
          padding: 18px 0; border-bottom: 1px solid ${BORDER_L};
        }
        .mkt-cap-row:first-child { border-top: 1px solid ${BORDER_L}; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 01. HERO (CENTERED, RETRO PHOSPHOR GROWTH VISUAL)      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="mkt-bg-grid"
        style={{
          minHeight: '100vh',
          padding: '140px clamp(24px,6vw,80px) 100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          borderBottom: `1px solid ${BORDER_D}`,
        }}
      >
        {/* Soft phosphor green glow sphere */}
        <div className="mkt-aura" style={{ position:'absolute', top:'25%', left:'50%', transform:'translate(-50%,-50%)', width:'480px', height:'480px', borderRadius:'50%', background:`radial-gradient(circle, ${ACCENT}08 0%, ${AMBER}02 60%, transparent 80%)`, pointerEvents:'none', zIndex: 0 }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', width: '100%', maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          
          {/* Eyebrow tag */}
          <div className="ha" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '16px', height: '2px', background: AMBER }} />
            <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.22em', color: AMBER, textTransform: 'uppercase', fontWeight: 700 }}>
              CONVERSION ARCHITECTURE
            </span>
            <span style={{ width: '16px', height: '2px', background: AMBER }} />
          </div>

          {/* Heading */}
          <h1 className="ha" style={{
            fontFamily: FD,
            fontSize: 'clamp(52px, 7.5vw, 114px)',
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: 0,
            color: WHITE,
          }}>
            Systems built to<br />
            hold at <span style={{ color: ACCENT, fontStyle: 'italic', textShadow: `0 0 30px ${ACCENT}15` }}>altitude.</span>
          </h1>

          {/* Body Text */}
          <p className="ha" style={{
            fontFamily: FB,
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            lineHeight: 1.8,
            color: MUTED_D,
            maxWidth: '560px',
            margin: 0,
          }}>
            We design, scale, and optimize customer acquisition channels. Our conversion pipelines are built with vintage precision to ensure predictability, traffic velocity, and enterprise growth.
          </p>

          {/* CTAs */}
          <div className="ha" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/consult" className="mkt-btn-fill">
              SCALE ACQUISITION →
            </Link>
            <a href="#flight-plan" className="mkt-btn-ghost">
              VIEW FLIGHT PLAN
            </a>
          </div>

          {/* Minimalist Graphic representation of growth curve inline */}
          <div className="ha" style={{ width: '100%', maxWidth: '640px', marginTop: '20px', opacity: 0.8 }}>
            <svg viewBox="0 0 600 120" width="100%" height="120" style={{ overflow: 'visible' }}>
              <line x1="0" y1="110" x2="600" y2="110" stroke="rgba(239,234,223,0.02)" strokeWidth="1" />
              <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(239,234,223,0.02)" strokeWidth="1" />
              {/* Path line with custom amber-to-mint gradient */}
              <defs>
                <linearGradient id="retroGrowthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={AMBER} />
                  <stop offset="100%" stopColor={ACCENT} />
                </linearGradient>
              </defs>
              <path ref={heroPathRef} d="M 0,110 C 120,105 240,75 360,55 S 480,20 600,10" fill="none" stroke="url(#retroGrowthGrad)" strokeWidth="3" />
              <circle ref={hc1Ref} cx="360" cy="55" r="4" fill={AMBER} style={{ transformOrigin: '360px 55px' }} />
              <circle ref={hc2Ref} cx="600" cy="10" r="5" fill="#EFEADF" stroke={ACCENT} strokeWidth="2.5" style={{ transformOrigin: '600px 10px' }} />
            </svg>
          </div>

        </div>
      </section>

      {/* 02. GROWTH CAPABILITIES */}
      <GrowthCapabilities sectionPad={sectionPad} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 03. THE FLIGHT PLAN — cream bg                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="flight-plan" style={{ background: BG_LIGHT, ...sectionPad, color: DARK_TXT }}>
        <div className="mkt-reveal" style={label(RUST)}>
          <span style={labelLine(RUST)} />
          <span style={labelText(RUST)}>The Strategy</span>
        </div>
        <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(38px,5.5vw,72px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 52px', color: DARK_TXT }}>
          The flight plan.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Card 1 — light */}
          <div className="mkt-reveal" style={{ background: '#FFFFFF', border: `1px solid ${BORDER_L}`, padding: '44px 40px' }}>
            <div style={{ fontFamily: FM, fontSize: '9px', color: RUST, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '20px' }}>STEP 01</div>
            <h3 style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(24px,2.8vw,34px)', margin: '0 0 16px', color: DARK_TXT, lineHeight: 1 }}>Discover & Audit</h3>
            <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: MUTED_L, margin: 0 }}>
              We dissect your audience, current metrics, and market category. A deep analysis reveals exactly where capital is wasted and where growth is being left on the table.
            </p>
          </div>

          {/* Card 2 — dark with grid */}
          <div className="mkt-reveal" style={{ background: BG_DARK, border: `1px solid ${BORDER_D}`, padding: '44px 40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(45,204,112,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(45,204,112,0.015) 1px,transparent 1px)`, backgroundSize: '32px 32px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontFamily: FM, fontSize: '9px', color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>STEP 02</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="mkt-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
                  <span style={{ fontFamily: FM, fontSize: '8px', color: ACCENT }}>LIVE</span>
                </div>
              </div>
              <h3 style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(24px,2.8vw,34px)', margin: '0 0 16px', color: WHITE, lineHeight: 1 }}>Growth Plan</h3>
              <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: MUTED_D, margin: 0 }}>
                A clear, measurable revenue roadmap details the channels, media allocations, and performance targets. You'll know exactly what happens next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 03. TESTIMONIAL — deep mahogany highlight section      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ background: BG_ACCENT, ...sectionPad, borderTop: `1px solid ${BORDER_D}`, borderBottom: `1px solid ${BORDER_D}` }}>
        <div style={{ maxWidth: '840px' }}>
          <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            <span style={{ width: '22px', height: '2px', background: AMBER }} />
            <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: AMBER, textTransform: 'uppercase', fontWeight: 700 }}>
              GURNAM SAINI / AYURVEDA ORGANICS
            </span>
          </div>
          <blockquote className="mkt-reveal" style={{ fontFamily: FD, fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(30px,4.2vw,58px)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 36px', color: WHITE }}>
            "The results outperformed anything we had launched previously."
          </blockquote>
          <p className="mkt-reveal" style={{ fontFamily: FM, fontSize: '10px', letterSpacing: '0.14em', color: MUTED_D, textTransform: 'uppercase' }}>
            Gurnam Saini — Founder, Ayurveda Organics
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 04. CASE STUDY — cream bg                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section ref={caseRef} style={{ background: BG_LIGHT, ...sectionPad, color: DARK_TXT }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ width: '22px', height: '2px', background: RUST }} />
                <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: RUST, textTransform: 'uppercase', fontWeight: 700 }}>CASE STUDY #001</span>
              </div>
              <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(28px,3.5vw,48px)', lineHeight: 1, letterSpacing: '-0.02em', margin: 0, color: DARK_TXT }}>
                Ayurveda Organics —<br />audience evolution.
              </h2>
            </div>
            <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: MUTED_L, margin: 0 }}>
              A holistic brand positioning and creative execution program that aligned organic product authenticity with modern social media distribution to drive consistent audience engagement and deeper platform reach.
            </p>
            <div className="mkt-reveal">
              <div style={{ fontFamily: FM, fontSize: '9px', color: RUST, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>WHAT WE DID</div>
              {WHAT_WE_DID.map((w) => (
                <div key={w} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: `1px solid ${BORDER_L}` }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: RUST, flexShrink: 0 }} />
                  <span style={{ fontFamily: FB, fontSize: '13px', color: DARK_TXT }}>{w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — chart + screenshots */}
          <div className="mkt-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Chart panel */}
            <div style={{ background: BG_DARK, padding: '28px', border: `1px solid ${BORDER_D}` }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span style={{ fontFamily: FM, fontSize: '9px', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>AUDIENCE GROWTH</span>
                <div style={{ display: 'flex', gap: '14px' }}>
                  {[{c:ACCENT,l:'Organic'},{c:`${AMBER}`,l:'Followers'}].map(({c,l}) => (
                    <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: FM, fontSize: '8px', color: c }}>
                      <span style={{ width: '14px', height: '2px', background: c, display: 'inline-block' }} />{l}
                    </span>
                  ))}
                </div>
              </div>

              {/* SVG chart */}
              <svg viewBox="0 0 540 180" width="100%" style={{ display: 'block', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={AMBER} stopOpacity="0.1" />
                    <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="540" y2={y} stroke="rgba(239,234,223,0.02)" strokeWidth="1" />)}
                <path ref={f1Ref} d="M0,165 C90,155 180,118 270,82 S450,28 540,10 L540,180 L0,180 Z" fill="url(#mg1)" opacity="0" />
                <path ref={f2Ref} d="M0,172 C90,165 180,155 270,138 S450,105 540,78 L540,180 L0,180 Z" fill="url(#mg2)" opacity="0" />
                <path ref={p1Ref} d="M0,165 C90,155 180,118 270,82 S450,28 540,10" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
                <path ref={p2Ref} d="M0,172 C90,165 180,155 270,138 S450,105 540,78" fill="none" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" />
                <circle cx="270" cy="82" r="4" fill={ACCENT} />
                <circle cx="540" cy="10" r="5" fill="#EFEADF" stroke={ACCENT} strokeWidth="2.5" />
              </svg>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: '18px', paddingTop: '16px', borderTop: `1px solid ${BORDER_D}` }}>
                {[{l:'REACH / MO',v:'144.3k'},{l:'SAVES AVG',v:'4.5k'},{l:'IMPRESSIONS',v:'134.1k'}].map(({l,v}) => (
                  <div key={l}>
                    <div style={{ fontFamily: FM, fontSize: '8px', color: MUTED_D, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{l}</div>
                    <div style={{ fontFamily: FD, fontSize: '22px', fontWeight: 700, color: WHITE, letterSpacing: '-0.01em' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {SS.map((f,i) => (
                <div key={f} style={{ border: `1px solid ${BORDER_D}`, overflow: 'hidden' }}>
                  <img src={`/devpage/propertymsters/mm/${f}`} alt={`Campaign ${i+1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 05. DATA VISIBILITY — dark                            */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ background: BG_DARK, ...sectionPad, borderTop: `1px solid ${BORDER_D}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '22px', height: '2px', background: ACCENT }} />
              <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: ACCENT, textTransform: 'uppercase', fontWeight: 700 }}>Performance Metrics</span>
            </div>
            <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(34px,4.5vw,64px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: 0, color: WHITE }}>
              Data-driven<br />visibility.<br />
              <em style={{ fontStyle: 'italic', color: ACCENT }}>Zero accident.</em>
            </h2>
            <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: MUTED_D, maxWidth: '360px', margin: 0 }}>
              We map conversion bottlenecks, find high-efficiency clusters in your data, and run efficiency audits. We trust data — always.
            </p>
          </div>

          {/* Right — circular metric cards */}
          <div className="mkt-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { v: '3.4×',  l: 'AVG RETURN\nON AD SPEND',     big: true  },
              { v: '13M+',  l: 'ORGANIC\nIMPRESSIONS / MO',   big: false },
              { v: '+142%', l: 'AVERAGE CTR\nIMPROVEMENT',    big: true  },
              { v: '7.2%',  l: 'AVERAGE\nCONVERSION RATE',   big: false },
            ].map(({v,l,big}) => (
              <div key={v} style={{
                border: `1px solid ${BORDER_D}`,
                borderRadius: '4px',
                padding: '32px 24px',
                display: 'flex', flexDirection: 'column', gap: '10px',
                background: 'rgba(255,255,255,0.005)',
              }}>
                <div style={{ fontFamily: FD, fontSize: 'clamp(34px,3.8vw,52px)', fontWeight: 700, color: big ? ACCENT : WHITE, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
                <div style={{ fontFamily: FM, fontSize: '8px', color: MUTED_D, textTransform: 'uppercase', letterSpacing: '0.12em', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 06. GROWTH CAPABILITIES — cream bg                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section hidden style={{ background: BG_LIGHT, ...sectionPad, color: DARK_TXT }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
          {/* Left */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={{ width: '22px', height: '2px', background: RUST }} />
              <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: RUST, textTransform: 'uppercase', fontWeight: 700 }}>Capabilities</span>
            </div>
            <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(34px,4.5vw,60px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 20px', color: DARK_TXT }}>
              Growth<br />capabilities.
            </h2>
            <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.8, color: MUTED_L, margin: 0 }}>
              We build custom-system solutions aligned to your business profile. Pre-advantage strategies — just momentum engines that flow.
            </p>
          </div>

          {/* Right — 3×2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
            {CAPS.map(({n,t}) => (
              <div key={n} className="mkt-cap-row mkt-reveal">
                <span style={{ fontFamily: FM, fontSize: '9px', color: RUST, letterSpacing: '0.1em', fontWeight: 700 }}>{n} —</span>
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '-0.01em', color: DARK_TXT }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 07. CTA — dark                                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="mkt-bg-grid" style={{ background: BG_DARK, ...sectionPad, paddingBottom: '140px', borderTop: `1px solid ${BORDER_D}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }} className="mkt-reveal">
          <span style={{ width: '22px', height: '2px', background: ACCENT }} />
          <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: ACCENT, textTransform: 'uppercase', fontWeight: 700 }}>Ready to Scale</span>
        </div>

        <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(52px,8vw,112px)', lineHeight: 0.87, letterSpacing: '-0.03em', margin: '0 0 32px', color: WHITE, maxWidth: '800px' }}>
          We build momentum<br />that <em style={{ fontStyle: 'italic', color: ACCENT }}>lasts.</em>
        </h2>

        <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: MUTED_D, maxWidth: '440px', margin: '0 0 40px' }}>
          High-performance marketing engineered for strategic vision, media distribution, and the only way to get it to work at scale.
        </p>

        <Link to="/consult" className="mkt-btn-fill mkt-reveal" style={{ fontSize: '11px', padding: '18px 36px' }}>
          ARCHITECT YOUR GROWTH →
        </Link>
      </section>

    </div>
  );
}
