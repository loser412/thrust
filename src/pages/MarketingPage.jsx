import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── DESIGN TOKENS ──────────────────────────────────────── */
const T = {
  cream:    '#F7F0E3',
  darkCream:'#EDE4CF',
  amber:    '#E8860A',
  amberL:   '#FFB347',
  burgundy: '#2C0A0A',
  darkWarm: '#1A0C06',
  rust:     '#C44A1E',
  sand:     '#D4B896',
  offBlack: '#110905',
};

const FONT_DISPLAY = "'Syne', sans-serif";
const FONT_BODY    = "'Outfit', sans-serif";
const FONT_MONO    = "'Space Mono', monospace";

/* ─── DATA ───────────────────────────────────────────────── */
const SERVICES = [
  { title: 'Paid Media Architecture',      desc: 'Thoughtful campaign frameworks across search, social, and display. We architect setups focused on high-intent relevance, capital efficiency, and customer retention.',      metric: '+142% avg CTR'    },
  { title: 'Organic Search Optimization',  desc: 'Search visibility built around modern brand signals, clear content design, and long-term keyword authority. No hacks, just high-relevance visibility.',                    metric: 'Top-3 rankings'   },
  { title: 'Content & Narrative Systems',  desc: 'A creative framework for brand stories, strategic product launches, and editorial rhythms that make your brand feel premium and distinct.',                               metric: 'Multi-channel'    },
  { title: 'Conversion Experience Design', desc: 'Polished digital touchpoints and user journeys optimized to eliminate friction, respect visitor attention, and maximize organic action.',                                  metric: '3.8% → 7.2% CR'  },
  { title: 'Integrated Growth Strategy',   desc: 'Market positioning, audience mapping, and campaign narratives that align product values with real-world customer expectations.',                                          metric: 'Strategic clarity' },
];

const PROCESS = [
  { step: '01', title: 'DISCOVER & AUDIT',   desc: 'We dissect your audience, current metrics, and market category. A deep analysis reveals exactly where capital is wasted.' },
  { step: '02', title: 'GROWTH PLAN',        desc: 'A clear, measurable campaign roadmap details the pathways, media allocations, and measurement goals.' },
  { step: '03', title: 'CREATIVE BUILD',     desc: 'We design high-fidelity visual assets, copywriting frameworks, and digital touchpoints that command attention.' },
  { step: '04', title: 'LAUNCH & STAGE',     desc: 'Rollouts are staged and monitored in real-time. We direct resources to high-performing subsets without delay.' },
  { step: '05', title: 'MEASURE & EXPAND',   desc: 'Continuous optimization cycles. We refine messaging, double-down on winners, and consistently scale.' },
];

const TESTIMONIALS = [{
  name: 'Gurnam Saini',
  role: 'Founder, Ayurveda Organics',
  quote: 'They transformed our organic story into a highly premium social footprint. The creative direction and consistent rhythm brought stronger audience engagement and brand authority than anything we had launched previously.',
}];

const AYURVEDA_WHAT_WE_DID = [
  'Social Media Account Direction',
  'Content Rhythm & Scheduling',
  'High-Fidelity Visual Design',
  'Unified Brand Identity Systems',
  'Organic Reach Optimization',
];

const AYURVEDA_OUTCOME = [
  'Elevated Brand Trust & Profile',
  'Consistent Audience Retention',
  'Deepened Platform Reach',
  'Stabilized Posting Cadence',
];

/* ─── COMPONENT ──────────────────────────────────────────── */
export default function MarketingPage() {
  const heroBgRef       = useRef(null);
  const heroVideoRef    = useRef(null);
  const heroOverRef     = useRef(null);
  const heroTextRef     = useRef(null);
  const graphPathRef    = useRef(null);
  const graphSectionRef = useRef(null);
  const servicesRef     = useRef(null);
  const processRef      = useRef(null);
  const workRef         = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef          = useRef(null);
  const marqueeRef      = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Auto-play hero video
    const vid = heroVideoRef.current;
    if (vid) {
      vid.muted = true;
      vid.loop  = true;
      vid.playsInline = true;
      vid.play().catch(() => {});
    }

    const ctx = gsap.context(() => {

      /* ── HERO PARALLAX */
      gsap.to(heroBgRef.current, {
        y: '28%', scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: heroBgRef.current?.parentElement, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
      gsap.to(heroOverRef.current, {
        opacity: 0.85, ease: 'none',
        scrollTrigger: { trigger: heroBgRef.current?.parentElement, start: 'top top', end: '60% top', scrub: true },
      });
      gsap.to(heroTextRef.current, {
        y: -60, opacity: 0.05, ease: 'none',
        scrollTrigger: { trigger: heroBgRef.current?.parentElement, start: '20% top', end: '70% top', scrub: 1.2 },
      });

      /* ── HERO TEXT ENTRANCE */
      gsap.fromTo(heroTextRef.current?.querySelectorAll('.anim') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );

      /* ── MARQUEE TICKER */
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50, ease: 'none', repeat: -1,
          duration: 22,
        });
      }

      /* ── SVG GRAPH DRAW */
      if (graphPathRef.current && graphSectionRef.current) {
        const path = graphPathRef.current;
        const len  = path.getTotalLength();
        path.style.strokeDasharray  = len;
        path.style.strokeDashoffset = len;
        gsap.to(path, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: graphSectionRef.current, start: 'top 70%', end: 'bottom 40%', scrub: 1.2 },
        });
        gsap.fromTo(graphSectionRef.current.querySelectorAll('.grid-line'),
          { opacity: 0 },
          { opacity: 0.12, duration: 1, stagger: 0.05, scrollTrigger: { trigger: graphSectionRef.current, start: 'top 75%' } }
        );
        gsap.fromTo(graphSectionRef.current.querySelectorAll('.metric-box'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: graphSectionRef.current, start: 'top 65%' } }
        );
      }

      /* ── SERVICES STAGGER */
      gsap.fromTo(servicesRef.current?.querySelectorAll('.srv-row') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: servicesRef.current, start: 'top 72%' } }
      );

      /* ── PROCESS CARDS */
      gsap.fromTo(processRef.current?.querySelectorAll('.proc-card') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: processRef.current, start: 'top 72%' } }
      );

      /* ── WORK FADE */
      gsap.fromTo(workRef.current?.querySelectorAll('.work-fade') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: workRef.current, start: 'top 75%' } }
      );

      /* ── CTA */
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
      );

    });

    return () => ctx.revert();
  }, []);

  /* ─── RENDER ─────────────────────────────────────────────── */
  return (
    <div style={{
      background: T.cream,
      color: T.offBlack,
      fontFamily: FONT_BODY,
      '--font-display': FONT_DISPLAY,
      '--font-body':    FONT_BODY,
      '--font-mono':    FONT_MONO,
      overflowX: 'hidden',
    }}>

      {/* ══════════════════════════════════════════════════════ */}
      {/* HERO — full-bleed yellow photo + editorial overlay     */}
      {/* ══════════════════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', background: T.darkWarm }}>
        {/* Full-bleed background video */}
        <div ref={heroBgRef} style={{
          position: 'absolute', inset: '-15% -5%',
          willChange: 'transform', zIndex: 0, overflow: 'hidden',
        }}>
          <video
            ref={heroVideoRef}
            autoPlay muted loop playsInline preload="auto"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.72) saturate(1.1)',
            }}
          >
            <source src="/15681911_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient vignette */}
        <div ref={heroOverRef} style={{
          position: 'absolute', inset: 0, zIndex: 1, opacity: 0.5,
          background: `
            linear-gradient(to right,  ${T.darkWarm}DD 0%, ${T.darkWarm}66 50%, transparent 100%),
            linear-gradient(to top,    ${T.darkWarm}F0 0%, ${T.darkWarm}55 55%, transparent 100%)
          `,
        }} />

        {/* Diagonal amber stripe */}
        <div style={{
          position: 'absolute', top: '8%', right: '-4%',
          width: '40vw', height: '4px', background: T.amber,
          transform: 'rotate(-8deg)', zIndex: 2, opacity: 0.9,
        }} />

        {/* Text content */}
        <div ref={heroTextRef} style={{
          position: 'relative', zIndex: 3,
          padding: 'clamp(120px,14vw,200px) clamp(24px,6vw,80px) clamp(56px,7vw,90px)',
        }}>
          {/* Label */}
          <div className="anim" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <span style={{ width: '48px', height: '3px', background: T.amber, display: 'inline-block' }} />
            <span style={{
              fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: T.amberL, fontWeight: 700,
            }}>Growth Architecture</span>
          </div>

          {/* Big editorial heading */}
          <h1 className="anim" style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 'clamp(64px, 9.5vw, 128px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            textTransform: 'uppercase', lineHeight: 0.88,
            margin: '0 0 40px', color: T.cream,
            textShadow: '0 4px 48px rgba(0,0,0,0.5)',
          }}>
            WE BUILD<br />
            MOMENTUM<br />
            <em style={{ color: T.amber, fontStyle: 'italic' }}>THAT LASTS.</em>
          </h1>

          {/* Sub-row */}
          <div className="anim" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
            <p style={{
              fontFamily: FONT_BODY, fontSize: 'clamp(15px,1.6vw,19px)',
              lineHeight: 1.75, color: 'rgba(247,240,227,0.85)',
              maxWidth: '540px', margin: 0,
              textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            }}>
              High-performance marketing engineered for strategic clarity, modern distribution, and organic velocity. We strip away the fluff to build systems that scale.
            </p>
            <Link to="/consult" style={{
              fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 700,
              color: T.offBlack, background: T.amber,
              padding: '18px 40px', textDecoration: 'none',
              transition: 'all 0.25s ease', display: 'inline-block',
              boxShadow: `0 0 0 3px ${T.amberL}66`,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.amberL; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = T.amber;  e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              ARCHITECT YOUR GROWTH →
            </Link>
          </div>
        </div>

        {/* Bottom editorial corner tag */}
        <div style={{
          position: 'absolute', bottom: 32, right: 40, zIndex: 3,
          fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.2em',
          color: 'rgba(247,240,227,0.4)', textTransform: 'uppercase',
        }}>
          THRUST & LOGIC / MARKETING
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* AMBER TICKER STRIP                                    */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{
        background: T.amber, overflow: 'hidden',
        padding: '14px 0', borderTop: `3px solid ${T.rust}`,
        borderBottom: `3px solid ${T.rust}`,
      }}>
        <div ref={marqueeRef} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array(8).fill(['PAID MEDIA', 'SEO', 'CONTENT SYSTEMS', 'GROWTH STRATEGY', 'BRAND AUTHORITY', 'CONVERSION CRO']).flat().map((t, i) => (
            <span key={i} style={{
              fontFamily: FONT_MONO, fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: T.offBlack, padding: '0 48px',
            }}>
              {t} <span style={{ color: T.burgundy, margin: '0 8px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* GROWTH CHART — deep warm dark                        */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={graphSectionRef} style={{
        background: T.darkWarm,
        color: T.cream,
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', right: '-8vw', top: '50%', transform: 'translateY(-50%)',
          width: '36vw', height: '36vw', borderRadius: '50%',
          border: `1px solid ${T.amber}22`, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: '-4vw', top: '50%', transform: 'translateY(-50%)',
          width: '24vw', height: '24vw', borderRadius: '50%',
          border: `1px solid ${T.amber}33`, pointerEvents: 'none',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '36px', height: '3px', background: T.amber, display: 'inline-block' }} />
              <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.amberL }}>
                Growth Trajectory
              </span>
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(32px,4.5vw,60px)',
              fontWeight: 800, letterSpacing: '-0.03em',
              textTransform: 'uppercase', lineHeight: 0.9,
              margin: '0 0 24px', color: T.cream,
            }}>
              DATA-DRIVEN<br />
              VISIBILITY.<br />
              <em style={{ color: T.amber, fontStyle: 'italic' }}>ZERO ACCIDENT.</em>
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: '15px', lineHeight: 1.8, color: `${T.sand}CC`, margin: 0, maxWidth: '400px' }}>
              We map search behaviors, keyword gaps, and media efficiency markers to drive predictable curves, not short-term spikes.
            </p>

            {/* Metrics */}
            <div style={{ display: 'flex', gap: '40px', marginTop: '48px' }}>
              <div className="metric-box">
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: '48px', fontWeight: 800, color: T.amber, lineHeight: 1 }}>3.4x</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.14em', color: T.sand, marginTop: '8px', textTransform: 'uppercase' }}>Avg ROI Increase</div>
              </div>
              <div className="metric-box">
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: '48px', fontWeight: 800, color: T.cream, lineHeight: 1 }}>12M+</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.14em', color: T.sand, marginTop: '8px', textTransform: 'uppercase' }}>Organic Impressions</div>
              </div>
            </div>
          </div>

          {/* Right — SVG chart */}
          <div style={{
            position: 'relative', height: '320px', width: '100%',
            background: `${T.burgundy}33`,
            border: `1px solid ${T.amber}22`,
            padding: '24px',
          }}>
            {/* Grid lines */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 0', pointerEvents: 'none' }}>
              {[1,2,3,4].map(i => <div key={i} className="grid-line" style={{ width: '100%', height: '1px', background: T.cream, opacity: 0 }} />)}
            </div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', padding: '0 48px', pointerEvents: 'none' }}>
              {[1,2,3,4,5].map(i => <div key={i} className="grid-line" style={{ height: '100%', width: '1px', background: T.cream, opacity: 0 }} />)}
            </div>

            <svg style={{ width: '100%', height: '100%', overflow: 'visible', position: 'relative', zIndex: 2 }}>
              <path ref={graphPathRef}
                d="M 0 280 C 120 280, 180 200, 300 180 C 420 160, 480 80, 680 20"
                fill="none" stroke={T.amber} strokeWidth="4" strokeLinecap="round"
                style={{ vectorEffect: 'non-scaling-stroke' }}
              />
              <circle cx="300" cy="180" r="6" fill={T.amber} />
              <circle cx="680" cy="20" r="8" fill={T.cream} stroke={T.amber} strokeWidth="4" />
            </svg>

            <div style={{ position: 'absolute', bottom: '24px', left: '24px', fontFamily: FONT_MONO, fontSize: '10px', color: `${T.sand}88` }}>Q1 AUDIT</div>
            <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: FONT_MONO, fontSize: '11px', color: T.amber, fontWeight: 700 }}>SCALED GROWTH</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SERVICES — warm cream with amber row accents          */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={servicesRef} style={{
        background: T.cream,
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
        borderBottom: `1px solid ${T.sand}66`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '80px', alignItems: 'start' }}>
          {/* Left sticky head */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '36px', height: '3px', background: T.amber, display: 'inline-block' }} />
              <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.rust, fontWeight: 700 }}>
                Capabilities
              </span>
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(36px,4.5vw,64px)',
              fontWeight: 800, letterSpacing: '-0.04em',
              textTransform: 'uppercase', margin: '0 0 24px',
              lineHeight: 0.9, color: T.burgundy,
            }}>
              GROWTH<br />
              <em style={{ color: T.rust, fontStyle: 'italic' }}>CAPABILITIES.</em>
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: '14px', lineHeight: 1.9, color: '#5C3A28', margin: 0, maxWidth: '300px' }}>
              We build custom pipelines tailored to your business profile. No pre-packaged packages — just conversion engines that perform.
            </p>

            {/* Big decorative number */}
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: '160px', fontWeight: 900,
              color: `${T.amber}12`, lineHeight: 1, marginTop: '16px',
              letterSpacing: '-0.06em', userSelect: 'none',
            }}>05</div>
          </div>

          {/* Right rows */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `2px solid ${T.darkWarm}` }}>
            {SERVICES.map(({ title, desc, metric }, idx) => (
              <div key={title} className="srv-row"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  display: 'grid', gridTemplateColumns: '52px 1.5fr 1fr',
                  gap: '28px', padding: '32px 0',
                  borderBottom: `1px solid ${T.sand}88`,
                  alignItems: 'start',
                  background: hoveredService === idx ? `${T.amber}0C` : 'transparent',
                  paddingLeft:  hoveredService === idx ? '16px' : '0',
                  paddingRight: hoveredService === idx ? '16px' : '0',
                  transition: 'all 0.25s ease', cursor: 'default',
                }}
              >
                <span style={{
                  fontFamily: FONT_MONO, fontSize: '13px', fontWeight: 700,
                  color: hoveredService === idx ? T.amber : `${T.burgundy}55`,
                  marginTop: '4px', transition: 'color 0.25s ease',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: FONT_DISPLAY, fontSize: 'clamp(18px,2vw,26px)',
                    fontWeight: 700, color: T.burgundy, margin: '0 0 10px', lineHeight: 1.1,
                  }}>{title}</h3>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '14px', lineHeight: 1.8, color: '#6B4030', margin: 0 }}>{desc}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                  <span style={{
                    fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.12em',
                    color: hoveredService === idx ? T.cream : T.burgundy,
                    background: hoveredService === idx ? T.rust : `${T.amber}22`,
                    border: `1px solid ${T.amber}55`,
                    padding: '8px 16px', textTransform: 'uppercase', fontWeight: 700,
                    transition: 'all 0.25s ease',
                  }}>{metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* CASE STUDY — deep burgundy dark                       */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={workRef} style={{
        background: T.burgundy,
        color: T.cream,
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
        borderBottom: `1px solid ${T.rust}44`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative oversized text */}
        <div style={{
          position: 'absolute', bottom: '-4vw', right: '-2vw',
          fontFamily: FONT_DISPLAY, fontSize: 'clamp(100px,16vw,220px)',
          fontWeight: 900, color: `${T.rust}18`, lineHeight: 1,
          pointerEvents: 'none', textTransform: 'uppercase', letterSpacing: '-0.05em',
          userSelect: 'none',
        }}>WORK</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div className="work-fade" style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <span style={{ width: '36px', height: '3px', background: T.amber, display: 'inline-block' }} />
              <span style={{ fontFamily: FONT_MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.amberL, fontWeight: 700 }}>
                CASE STUDY
              </span>
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(36px,5vw,72px)',
              fontWeight: 800, letterSpacing: '-0.04em',
              textTransform: 'uppercase', lineHeight: 0.88,
              margin: '0 0 20px', color: T.cream,
            }}>
              AYURVEDA ORGANICS.<br />
              <em style={{ color: T.amber, fontStyle: 'italic' }}>AUDIENCE EVOLUTION.</em>
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: '16px', lineHeight: 1.8, color: `${T.sand}BB`, margin: 0 }}>
              A holistic brand positioning and creative execution program that aligned product authenticity with modern social distributions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'start' }}>
            {/* Left content */}
            <div className="work-fade" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.amberL, fontWeight: 700, marginBottom: '12px' }}>THE CHALLENGE</div>
                <p style={{ fontFamily: FONT_BODY, fontSize: '15px', lineHeight: 1.8, color: `${T.sand}CC`, margin: 0 }}>
                  Ayurveda Organics needed a consistent, premium online presence that reflected organic product values while establishing platform visibility.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.amberL, fontWeight: 700, marginBottom: '16px' }}>THE INTERVENTION</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  {AYURVEDA_WHAT_WE_DID.map((item, idx) => (
                    <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: T.amber, fontWeight: 700 }}>0{idx + 1}</span>
                      <span style={{ fontFamily: FONT_BODY, fontSize: '14px', color: T.sand }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.amberL, fontWeight: 700, marginBottom: '16px' }}>THE VELOCITY OUTCOME</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {AYURVEDA_OUTCOME.map(item => (
                    <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.amber, flexShrink: 0 }} />
                      <span style={{ fontFamily: FONT_BODY, fontSize: '14px', color: T.cream, fontWeight: 600 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right screenshots */}
            <div className="work-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['smm%20ss.PNG', 'smm%20ss%202.PNG'].map((file, i) => (
                <div key={file} style={{
                  background: `${T.darkWarm}CC`,
                  border: `1px solid ${T.amber}22`,
                  padding: '12px',
                  boxShadow: `0 24px 60px rgba(0,0,0,0.5)`,
                }}>
                  <img
                    src={`/devpage/propertymsters/mm/${file}`}
                    alt={`Screenshot ${i + 1}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontFamily: FONT_MONO, fontSize: '9px', color: `${T.sand}66` }}>
                    <span>{i === 0 ? 'IG METRIC OVERVIEW' : 'FB ENGAGEMENT OVERVIEW'}</span>
                    <span>VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* PROCESS — warm sand/cream alternating cards          */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={processRef} style={{
        background: T.darkCream,
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
        borderBottom: `1px solid ${T.sand}55`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <span style={{ width: '36px', height: '3px', background: T.rust, display: 'inline-block' }} />
          <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.rust, fontWeight: 700 }}>
            Execution Sequence
          </span>
        </div>
        <h2 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 'clamp(32px,4.5vw,68px)',
          fontWeight: 800, letterSpacing: '-0.04em',
          textTransform: 'uppercase', margin: '0 0 60px',
          lineHeight: 0.88, color: T.burgundy,
        }}>
          THE CONVERSION<br />
          <em style={{ color: T.rust, fontStyle: 'italic' }}>FRAMEWORK.</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {PROCESS.map(({ step, title, desc }, idx) => (
            <div key={step} className="proc-card" style={{
              background: idx % 2 === 0 ? T.cream : T.burgundy,
              padding: '28px 20px',
              minHeight: '280px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              borderTop: `3px solid ${idx % 2 === 0 ? T.amber : T.rust}`,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.15)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{
                fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '0.12em',
                color: idx % 2 === 0 ? T.rust : T.amberL, fontWeight: 700,
              }}>{step}</span>
              <div>
                <h3 style={{
                  fontFamily: FONT_DISPLAY, fontSize: '17px', fontWeight: 800,
                  textTransform: 'uppercase', lineHeight: 1.1,
                  color: idx % 2 === 0 ? T.burgundy : T.cream,
                  margin: '0 0 10px',
                }}>{title}</h3>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: '13px', lineHeight: 1.75, margin: 0,
                  color: idx % 2 === 0 ? '#6B4030' : `${T.sand}BB`,
                }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS — amber accent on cream                 */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={testimonialsRef} style={{
        background: T.amber,
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative bg quote mark */}
        <div style={{
          position: 'absolute', top: '-2vw', left: '-1vw',
          fontFamily: FONT_DISPLAY, fontSize: 'clamp(200px,28vw,380px)',
          fontWeight: 900, color: `${T.rust}22`, lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none',
        }}>"</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'start', position: 'relative', zIndex: 2 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ width: '36px', height: '3px', background: T.burgundy, display: 'inline-block' }} />
              <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.burgundy, fontWeight: 700 }}>
                Partnerships
              </span>
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(28px,4vw,52px)',
              fontWeight: 800, letterSpacing: '-0.03em',
              textTransform: 'uppercase', lineHeight: 0.92,
              margin: 0, color: T.burgundy,
            }}>
              VERIFIED<br />REVIEWS.
            </h2>
          </div>
          <div>
            {TESTIMONIALS.map(item => (
              <div key={item.name}>
                <p style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(20px,2.5vw,34px)',
                  fontWeight: 600, fontStyle: 'italic',
                  lineHeight: 1.4, color: T.burgundy, margin: '0 0 36px',
                }}>
                  "{item.quote}"
                </p>
                <div style={{ fontFamily: FONT_BODY, fontSize: '16px', fontWeight: 700, color: T.burgundy }}>{item.name}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.14em', color: `${T.burgundy}88`, marginTop: '4px', textTransform: 'uppercase' }}>{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* CTA — deep dark with amber action                    */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        background: T.offBlack,
        padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '40px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative amber line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '4px', background: `linear-gradient(to right, ${T.amber}, ${T.rust})`,
        }} />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <span style={{ width: '36px', height: '3px', background: T.amber, display: 'inline-block' }} />
            <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.amberL, fontWeight: 700 }}>
              Get Started
            </span>
          </div>
          <h2 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 'clamp(40px,6vw,88px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            textTransform: 'uppercase', lineHeight: 0.88,
            margin: 0, color: T.cream,
          }}>
            READY TO STAGE<br />
            <em style={{ color: T.amber, fontStyle: 'italic' }}>YOUR SCALE?</em>
          </h2>
        </div>

        <Link to="/consult" style={{
          fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '0.22em',
          textTransform: 'uppercase', fontWeight: 700,
          color: T.offBlack, background: T.amber,
          padding: '22px 48px', textDecoration: 'none',
          transition: 'all 0.25s ease', display: 'inline-block',
          boxShadow: `0 0 0 3px ${T.amberL}44`,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.amberL; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = T.amber;  e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          LAUNCH CONSULTATION →
        </Link>
      </section>
    </div>
  );
}
