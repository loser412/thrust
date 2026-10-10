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
  ['Platform Engineering', 'Designed and developed a custom, high-speed Shopify store with seamless multi-currency integration.'],
  ['Content Production', 'Transitioned their social feed to high-quality Organic & AI-assisted video and visual assets, ensuring consistency.'],
  ['Brand Consistency', 'Unified their visual identity across web and social channels.'],
  ['Operational Support', 'Managed end-to-end posting schedules and copywriting to free up their team’s time.'],
];

const CASE_STUDY_SCREENSHOTS = [
  { src: '/AO,%20facebook,%20ss.PNG', label: 'Facebook — 135.9K Views', platform: 'Facebook' },
  { src: '/AO,%20instagram%20,%20ss.PNG', label: 'Instagram — 87.9K Views', platform: 'Instagram' },
];

const CAPS = [
  { n:'01', t:'Organic Social & Community', d:'We build your brand’s daily voice. We create strategic, high-value content designed to build a loyal following and establish absolute authority in your market.' },
  { n:'02', t:'Search Architecture (SEO)', d:'We engineer your site to dominate search results. We target high-intent keywords—capturing customers when they are holding a credit card and ready to buy.' },
  { n:'03', t:'Performance Creative', d:'We produce the assets that actually convert. From high-retention video hooks to persuasive ad copy, we create the media that stops the scroll and drives real action.' },
  { n:'04', t:'High-Converting Funnels', d:'We design landing pages focused entirely on conversion. Fast-loading, distraction-free funnels that make it incredibly easy for visitors to contact you or buy.' },
  { n:'05', t:'Brand Positioning', d:'We build trust at a glance. Professional identity systems and sharp guidelines that make your business look like the undisputed category leader.' },
  { n:'06', t:'Performance Advertising', d:'We run surgical, data-driven ad campaigns across Meta, Google, and LinkedIn. We put your business directly in front of people who are already looking for what you sell.' },
];

const ROADMAP = [
  {
    title: 'Research & Audit',
    description: 'We tear down your current metrics, audit your competitors, and find the exact bottlenecks where you are losing money and the easiest gaps to drive rapid growth.',
  },
  {
    title: 'Growth Roadmap',
    description: 'We deliver a crystal-clear action plan. You’ll know exactly which platforms to push, how much budget to allocate, and the precise ROI you should expect before we spend a dime.',
  },
  {
    title: 'Execution & Testing',
    description: 'We launch rapid, low-budget tests to find the winning ad creatives and audiences before we scale your spending.',
  },
  {
    title: 'Scale & Optimize',
    description: 'Once we hit profitability, we pour fuel on the fire. We continuously refine campaigns to lower your costs as you scale.',
  },
];

function GrowthCapabilities({ sectionPad }) {
  return (
    <section style={{ background: BG_LIGHT, ...sectionPad, color: DARK_TXT, borderBottom: `1px solid ${BORDER_L}` }}>
      <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <span style={{ width: '22px', height: '2px', background: RUST }} />
        <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: RUST, textTransform: 'uppercase', fontWeight: 700 }}>Our Services</span>
      </div>
      <div className="mkt-services-intro" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, .9fr) minmax(0, 2.1fr)', gap: 'clamp(36px, 7vw, 100px)', alignItems: 'end', marginBottom: '46px' }}>
        <div>
          <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(38px,5.2vw,68px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 18px', color: DARK_TXT }}>
            How we help<br />you grow.
          </h2>
          <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.8, color: MUTED_L, margin: 0, maxWidth: '340px' }}>
            A precision-targeted suite of capabilities built to reach more customers and close more sales.
          </p>
        </div>
        <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: DARK_TXT, margin: 0, maxWidth: '560px' }}>
          Choose a single service to start, or connect them into one seamless growth machine.
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
              <h3 style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(23px,2.2vw,31px)', letterSpacing: '-0.01em', lineHeight: 1.1, color: 'inherit', margin: '0 0 13px' }}>{t}</h3>
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
        } catch {
          heroPathRef.current.style.strokeDashoffset = 0;
        }
      }

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
  const label = () => ({
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
        @media (max-width: 760px) {
          .mkt-roadmap-grid, .mkt-case-grid, .mkt-data-grid, .mkt-services-intro { grid-template-columns: 1fr !important; }
          .mkt-case-grid { gap: 40px !important; }
        }
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
              GROWTH MARKETING
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
            PERFORMANCE<br />
            BUILT TO<br />
            <span style={{ color: ACCENT, fontStyle: 'italic', textShadow: `0 0 30px ${ACCENT}15` }}>SCALE REVENUE.</span>
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
            We don't run generic campaigns or report on vanity metrics. We build high-converting funnels and organic growth engines that lower your customer acquisition cost and turn raw attention into loyal buyers.
          </p>

          {/* CTAs */}
          <div className="ha" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/consult" className="mkt-btn-fill">
              GROW YOUR SALES ↗
            </Link>
            <a href="#flight-plan" className="mkt-btn-ghost">
              OUR STRATEGY ↘
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
        <div className="mkt-reveal" style={label()}>
          <span style={labelLine(RUST)} />
          <span style={labelText(RUST)}>The Strategy</span>
        </div>
        <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(38px,5.5vw,72px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 52px', color: DARK_TXT }}>
          Our strategy roadmap.
        </h2>

        <div className="mkt-roadmap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '20px' }}>
          {ROADMAP.map(({ title, description }, index) => {
            const isDark = index % 2 === 1;
            return (
              <article key={title} className="mkt-reveal" style={{
                background: isDark ? BG_DARK : '#FFFFFF',
                border: `1px solid ${isDark ? BORDER_D : BORDER_L}`,
                padding: 'clamp(28px,4vw,44px)',
              }}>
                <div style={{ fontFamily: FM, fontSize: '9px', color: isDark ? ACCENT : RUST, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '20px' }}>
                  STEP {String(index + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(24px,2.8vw,34px)', margin: '0 0 16px', color: isDark ? WHITE : DARK_TXT, lineHeight: 1 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: isDark ? MUTED_D : MUTED_L, margin: 0 }}>
                  {description}
                </p>
              </article>
            );
          })}
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
            "The results were much better than anything we had tried before."
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
        <div className="mkt-case-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ width: '22px', height: '2px', background: RUST }} />
                <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: RUST, textTransform: 'uppercase', fontWeight: 700 }}>REAL-WORLD EXAMPLE</span>
              </div>
              <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(28px,3.5vw,48px)', lineHeight: 1, letterSpacing: '-0.02em', margin: 0, color: DARK_TXT }}>
                Ayurveda Organics:<br />Building a Global-Standard Foundation.
              </h2>
            </div>
            <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: MUTED_L, margin: 0 }}>
              We partnered with Ayurveda Organics to modernize their digital infrastructure. Our goal was to build a high-performance e-commerce platform capable of handling global traffic and establish a consistent, high-quality content engine.
            </p>
            <div className="mkt-reveal">
              <div style={{ fontFamily: FM, fontSize: '9px', color: RUST, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>HOW WE HELPED</div>
              {WHAT_WE_DID.map(([title, description]) => (
                <div key={title} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', padding: '9px 0', borderBottom: `1px solid ${BORDER_L}` }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: RUST, flexShrink: 0 }} />
                  <span style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.7, color: DARK_TXT }}><strong>{title}:</strong> {description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — client-provided case-study results */}
          <div className="mkt-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: BG_DARK, padding: 'clamp(22px,3vw,32px)', border: `1px solid ${BORDER_D}` }}>
              <div style={{ fontFamily: FM, fontSize: '9px', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, marginBottom: '22px' }}>
                Client-provided case-study results
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '12px' }}>
                {[
                  { value: '125.5K', label: 'Facebook views' },
                  { value: '65.8K', label: 'Instagram views' },
                  { value: '294.8%', label: 'Instagram reach growth' },
                  { value: '100%', label: 'Content consistency' },
                ].map(({ value, label }) => (
                  <div key={label} style={{ minHeight: '120px', padding: '20px', border: `1px solid ${BORDER_D}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: FD, fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: WHITE, letterSpacing: '-0.02em' }}>{value}</div>
                    <div style={{ fontFamily: FM, fontSize: '8px', color: MUTED_D, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.6 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '10px' }}>
              {CASE_STUDY_SCREENSHOTS.map(({ src, label, platform }) => (
                <figure key={src} style={{ minWidth: 0, margin: 0, overflow: 'hidden', border: `1px solid ${BORDER_D}` }}>
                  <img
                    src={src}
                    alt={`Ayurveda Organics ${platform} campaign results`}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <figcaption style={{ padding: '8px 12px', background: 'rgba(45,204,112,0.04)', borderTop: `1px solid ${BORDER_D}`, fontFamily: FM, fontSize: '8px', color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 05. DATA VISIBILITY — dark                            */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{ background: BG_DARK, ...sectionPad, borderTop: `1px solid ${BORDER_D}` }}>
        <div className="mkt-data-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            <div className="mkt-reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '22px', height: '2px', background: ACCENT }} />
              <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: ACCENT, textTransform: 'uppercase', fontWeight: 700 }}>How We Measure Success</span>
            </div>
            <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(34px,4.5vw,64px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: 0, color: WHITE }}>
              We don’t guess.<br />We track.
            </h2>
            <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: MUTED_D, maxWidth: '360px', margin: 0 }}>
              Most agencies stop at “likes” and “impressions.” We use those metrics as a starting point to focus on the numbers that actually impact your bottom line: Revenue, Leads, and Cost Per Acquisition. Here is exactly how we measure our work.
            </p>
          </div>

          {/* Right — the core growth metrics */}
          <div className="mkt-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { v: 'CAC',  l: 'Customer acquisition cost · We lower this' },
              { v: 'ROAS', l: 'Return on ad spend · We maximize this' },
              { v: 'LTV',  l: 'Lifetime value · We increase this' },
              { v: 'CTR',  l: 'Click-through rate · We optimize this' },
            ].map(({v,l}) => (
              <div key={v} style={{
                border: `1px solid ${BORDER_D}`,
                borderRadius: '4px',
                padding: '32px 24px',
                display: 'flex', flexDirection: 'column', gap: '10px',
                background: 'rgba(255,255,255,0.005)',
              }}>
                <div style={{ fontFamily: FD, fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 700, color: ACCENT, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
                <div style={{ fontFamily: FM, fontSize: '8px', color: MUTED_D, textTransform: 'uppercase', letterSpacing: '0.12em', lineHeight: 1.6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 06. CTA — dark                                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="mkt-bg-grid" style={{ background: BG_DARK, ...sectionPad, paddingBottom: '140px', borderTop: `1px solid ${BORDER_D}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }} className="mkt-reveal">
          <span style={{ width: '22px', height: '2px', background: ACCENT }} />
          <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: ACCENT, textTransform: 'uppercase', fontWeight: 700 }}>Start Growing</span>
        </div>

        <h2 className="mkt-reveal" style={{ fontFamily: FD, fontWeight: 700, fontSize: 'clamp(52px,8vw,112px)', lineHeight: 0.87, letterSpacing: '-0.03em', margin: '0 0 32px', color: WHITE, maxWidth: '800px' }}>
          We help build growth that lasts.
        </h2>

        <p className="mkt-reveal" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: MUTED_D, maxWidth: '440px', margin: '0 0 40px' }}>
          Stop burning budget on generic campaigns that don’t convert. Tell us about your business, and we’ll design a clear, professional marketing strategy that makes your brand stand out and drives serious sales.
        </p>

        <Link to="/consult" className="mkt-btn-fill mkt-reveal" style={{ fontSize: '11px', padding: '18px 36px' }}>
          TALK TO A GROWTH EXPERT ↗
        </Link>
      </section>

    </div>
  );
}
