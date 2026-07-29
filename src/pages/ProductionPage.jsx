import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ───────────────────────────────────────────────── */
const OFFERINGS = [
  { index: '01', title: 'Video Production',    desc: 'Brand films, product demos, testimonials, and social content. Scripted, shot, and edited in-house — no outsourcing.', tags: ['Brand Film', 'Product Demo', 'Testimonial', 'Social'] },
  { index: '02', title: 'Motion & Animation',  desc: '2D motion graphics, kinetic typography, and animated explainers that carry your message without a word.', tags: ['Motion Graphics', 'After Effects', 'Lottie', 'Explainer'] },
  { index: '03', title: 'Creative Direction',  desc: 'Visual language, shot lists, storyboards, and art direction. We set the tone so every frame feels intentional.', tags: ['Art Direction', 'Storyboard', 'Mood Board', 'Casting'] },
  { index: '04', title: 'Post-Production',      desc: 'Colour grading, audio mix, VFX, and delivery-ready exports across all platforms and aspect ratios.', tags: ['Colour Grade', 'Audio Mix', 'VFX', 'DaVinci Resolve'] },
];

const PROCESS = [
  { step: '01', heading: 'PRE-PRODUCTION',   body: 'Script analysis, storytelling, and technical blocking based on mathematical frame logic.' },
  { step: '02', heading: 'CAPTURE',          body: 'Principal photography with calibrated optics and synchronized lighting arrays.' },
  { step: '03', heading: 'POST-PRODUCTION',   body: 'High-precision color grading, visual effects, and sound design architecture.' },
  { step: '04', heading: 'DELIVERY',          body: 'Mastering for global distribution with automated quality control protocols.' },
];

const SPECS = [
  { value: '2.4 Gbps', label: 'RAW BITRATE' },
  { value: '16-Bit',   label: 'COLOR DEPTH' },
];

const PRODUCTION_ARSENAL = [
  {
    title: 'Pre-Production',
    description: 'Every production starts with a deliberate plan: the idea, the narrative, the people, and the path to set.',
    services: ['Creative Concept Development', 'Script Writing', 'Storyboarding', 'Mood Boards', 'Shot Planning', 'Location Scouting', 'Casting', 'Production Scheduling'],
  },
  {
    title: 'Video Production',
    description: 'From commercial campaigns to documentary stories, captured for the screen and the scroll.',
    services: ['Commercials', 'Brand Films', 'Corporate Videos', 'Product Videos', 'Social Media Content', 'Promotional Videos', 'Documentary Production', 'Event Coverage', 'Interviews & Testimonials', 'Music Videos', 'Short Films', 'Educational Videos'],
  },
  {
    title: 'Photography & Drone',
    description: 'Still and aerial imagery that gives brands, places, products, and people a sharper point of view.',
    services: ['Product Photography', 'Lifestyle Photography', 'Fashion Photography', 'Food Photography', 'Corporate Photography', 'Event Photography', 'Portrait Photography', 'E-commerce Photography', 'Real Estate Drone Shoots', 'Construction Progress Videos', 'Tourism & Landscape Filming'],
  },
  {
    title: 'Post-Production',
    description: 'Precision finishing for every format, from the first assembly through final delivery.',
    services: ['Video Editing', 'Color Grading', 'Motion Graphics', '2D & 3D Animation', 'Sound Design', 'Audio Mixing', 'Voice-over Recording', 'Subtitles & Captions'],
  },
  {
    title: 'Studio Production',
    description: 'A controlled environment for polished recordings, broadcasts, conversations, and stills.',
    services: ['Green Screen Production', 'Podcast Recording', 'Multi-Camera Production', 'Live Streaming', 'Studio Photography'],
  },
  {
    title: 'Digital Content',
    description: 'Always-on creative shaped around the places your audience actually spends time.',
    services: ['Reels & Shorts', 'YouTube Content', 'Instagram Content', 'Ad Creatives', 'Explainer Videos', 'Testimonial Videos'],
  },
  {
    title: 'Branding & Marketing',
    description: 'Campaign-led visual systems made to launch, position, and move a brand forward.',
    services: ['Brand Identity Videos', 'Product Launch Campaigns', 'Social Media Campaigns', 'Digital Advertisements', 'Creative Direction'],
  },
  {
    title: 'Specialized & Crew',
    description: 'The specialist craft, equipment, and on-set leadership that make ambitious work possible.',
    services: ['360° Video Production', 'Time-Lapse Photography', 'Hyperlapse Videos', 'Lighting Setup', 'Audio Recording', 'Production Management', 'Art Direction', 'Set Design'],
  },
];

/* ─── DESIGN TOKENS (LIGHT SYSTEM TO MATCH SCREENSHOT) ──── */
const T = {
  bg:         '#F7F8FA',       // Light background
  cardBg:     '#FFFFFF',       // Stark white cards
  cardBgAlt:  '#0C120C',       // Dark card highlight
  border:     '#E5E7EB',       // Subtle borders
  accent:     '#4A6B2F',       // Forest green marker
  textDark:   '#0C120C',       // Stark dark text
  textMuted:  '#5C645A',       // Soft grey-green body
  red:        '#E11D48',       // Streaming status dot
};

// A condensed editorial face gives the production page a title-card / film-poster feel.
// Manrope keeps body copy clean and highly legible beside the technical UI details.
const FD = "'Barlow Condensed', 'Arial Narrow', sans-serif";
const FB = "'Manrope', 'Helvetica Neue', sans-serif";
const FM = 'var(--font-mono)';

export default function ProductionPage() {
  const heroRef        = useRef(null);
  const heroBgRef      = useRef(null);
  const mainRef        = useRef(null);
  const videoRef       = useRef(null);
  const fitnessVidRef  = useRef(null);
  const anniversaryVidRef = useRef(null);

  const [logIndex, setLogIndex] = useState(0);
  const [activeWorkVideo, setActiveWorkVideo] = useState(null);
  const logLines = [
    'CAM_A_LOC: ONSTAGE...',
    '> TRANSMITTING sensor...',
    '> Reading dynamic range...',
    '> Overlord 8K RAW stream',
    '> Locking cam_config_v4.1',
    '> [ARRIRAW] Frame sync lock.'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Telemetry log simulator
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < logLines.length ? prev + 1 : 1));
    }, 2800);

    const ctx = gsap.context(() => {
      // Hero element reveals
      gsap.fromTo(heroRef.current?.querySelectorAll('.h-anim') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power2.out', delay: 0.15 }
      );

      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 18,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Section triggers
      gsap.fromTo(mainRef.current?.querySelectorAll('.sc-reveal') ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: mainRef.current, start: 'top 80%' }
        }
      );
    });

    return () => {
      clearInterval(logInterval);
      ctx.revert();
    };
  }, []);

  return (
    <div style={{ background: T.bg, color: T.textDark, fontFamily: FB, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Global CSS injections matching stylesheet design */}
      <style>{`
        .production-page h1, .production-page h2, .production-page h3, .production-page h4 {
          font-stretch: condensed;
          text-transform: uppercase;
        }
        .production-page h1 {
          letter-spacing: -0.045em !important;
          text-wrap: balance;
        }
        .production-page h2 {
          letter-spacing: -0.025em !important;
        }
        .production-page p {
          letter-spacing: -0.012em;
        }
        .prod-grid-overlay {
          background-image:
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .btn-black-prod {
          background: ${T.textDark}; color: ${T.bg};
          font-family: ${FM}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
          padding: 16px 32px; display: inline-block;
          transition: transform 0.2s, opacity 0.2s; border: none; cursor: pointer;
        }
        .btn-black-prod:hover { transform: translateY(-1px); opacity: 0.9; }
        .btn-outline-prod {
          background: transparent; color: ${T.textDark};
          border: 1px solid ${T.textDark};
          font-family: ${FM}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
          padding: 16px 32px; display: inline-block;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline-prod:hover { background: ${T.textDark}; color: ${T.bg}; }
        @keyframes prodPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .pulse-red { animation: prodPulse 1.8s ease-in-out infinite; }
        .campaign-delivery-card {
          width: calc(200% + 20px);
          margin-left: calc(-100% - 20px);
        }
        .campaign-delivery-content { margin: 0 auto; text-align: center; }
        @media (max-width: 860px) {
          .campaign-delivery-card { width: 100%; margin-left: 0; }
        }
      `}</style>

      <div className="prod-grid-overlay production-page" ref={mainRef}>
        
        {/* ══════════════════════════════════════════════════════ */}
        {/* 01. HERO                                              */}
        {/* ══════════════════════════════════════════════════════ */}
        <section ref={heroRef} style={{
          minHeight: '90vh',
          padding: '140px clamp(24px,6vw,80px) 80px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${T.border}`,
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
        }}>
          <div
            ref={heroBgRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              backgroundImage: `linear-gradient(110deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.64) 100%), url('/image3.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              willChange: 'transform',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', width: '100%', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Status Badge */}
              <div className="h-anim" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="pulse-red" style={{ width: '8px', height: '8px', borderRadius: '50%', background: T.red }} />
                <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>
                  STREAMING STATUS: LIVE
                </span>
              </div>

              {/* Title */}
              <h1 className="h-anim" style={{
                fontFamily: FD,
                fontSize: 'clamp(48px, 6vw, 92px)',
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                margin: 0,
                color: '#fff',
              }}>
                Cinematic<br />
                Production at Scale.
              </h1>

              {/* Body */}
              <p className="h-anim" style={{
                fontFamily: FB,
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.84)',
                maxWidth: '480px',
                margin: 0,
              }}>
                High-fidelity visual storytelling meets clinical engineering precision. We architect, capture, and refine high-stakes media content with zero-compromise post-production.
              </p>

              {/* KPI Badges */}
              <div className="h-anim" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {SPECS.map(({ value, label }) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 24px', flex: '1 1 180px', backdropFilter: 'blur(8px)' }}>
                    <span style={{ fontFamily: FM, fontSize: '8px', color: 'rgba(255,255,255,0.72)', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>{label}</span>
                    <span style={{ fontFamily: FD, fontSize: '22px', fontWeight: 700, color: '#fff' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-anim" style={{
              minHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }} />

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 02. ARSENAL (SERVICES)                                */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ width: '22px', height: '2px', background: T.accent }} />
            <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontWeight: 700 }}>
              ARSENAL
            </span>
          </div>

          <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 52px', color: T.textDark }}>
            Production Arsenal
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
            
            {/* Left Big Card - Pre-Production */}
            <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, padding: '48px 40px', minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.5">
                    <path d="M23 7l-7 5 7 5V7zM1 5h15v14H1z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: FD, fontSize: '28px', fontWeight: 700, margin: '0 0 16px', color: T.textDark }}>{PRODUCTION_ARSENAL[0].title}</h3>
                <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.8, color: T.textMuted, margin: 0 }}>
                  {PRODUCTION_ARSENAL[0].description}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
                {PRODUCTION_ARSENAL[0].services.map(st => (
                  <span key={st} style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textDark, border: `1px solid ${T.border}`, padding: '6px 12px' }}>{st}</span>
                ))}
              </div>
            </div>

            {/* Right Column (Stacked Cards + Bottom Wide Card) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Stacked Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Stacked Card 1 - Video Production */}
                <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, padding: '36px 30px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="2.5" />
                      <path d="M7 2v20M17 2v20M2 12h20" />
                    </svg>
                  </div>
                  <h4 style={{ fontFamily: FD, fontSize: '20px', fontWeight: 700, margin: '0 0 12px', color: T.textDark }}>{PRODUCTION_ARSENAL[1].title}</h4>
                  <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.7, color: T.textMuted, margin: 0 }}>
                    {PRODUCTION_ARSENAL[1].description}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '18px' }}>
                    {PRODUCTION_ARSENAL[1].services.map(service => <span key={service} style={{ fontFamily: FM, fontSize: '8px', letterSpacing: '0.06em', color: T.textDark, border: `1px solid ${T.border}`, padding: '5px 7px' }}>{service}</span>)}
                  </div>
                </div>

                {/* Stacked Card 2 - Photography & Drone */}
                <div style={{ background: T.cardBg, border: `1px solid ${T.border}`, padding: '36px 30px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.5">
                      <path d="M12 2L2 22h20Z" />
                    </svg>
                  </div>
                  <h4 style={{ fontFamily: FD, fontSize: '20px', fontWeight: 700, margin: '0 0 12px', color: T.textDark }}>{PRODUCTION_ARSENAL[2].title}</h4>
                  <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.7, color: T.textMuted, margin: 0 }}>
                    {PRODUCTION_ARSENAL[2].description}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '18px' }}>
                    {PRODUCTION_ARSENAL[2].services.map(service => <span key={service} style={{ fontFamily: FM, fontSize: '8px', letterSpacing: '0.06em', color: T.textDark, border: `1px solid ${T.border}`, padding: '5px 7px' }}>{service}</span>)}
                  </div>
                </div>
              </div>

              {/* Bottom Wide Card - Post, Studio & Campaign Delivery */}
              <div className="campaign-delivery-card" style={{ background: '#EAEAEA', border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden', padding: '40px', minHeight: '160px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Background video loop for 2D Fitness */}
                <video ref={fitnessVidRef} autoPlay muted loop playsInline preload="metadata"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, zIndex: 0 }}>
                  <source src="/2d%20fitness/2D%20VIDEO.mp4" type="video/mp4" />
                </video>
                <div className="campaign-delivery-content" style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontFamily: FD, fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: T.textDark }}>Post, Studio & Campaign Delivery</h3>
                  <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.7, color: T.textMuted, margin: 0, maxWidth: '440px' }}>
                    From finishing and studio execution to digital campaigns and specialist capture, every final asset is made ready for its audience.
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '18px', maxWidth: '520px' }}>
                    {PRODUCTION_ARSENAL.slice(3).flatMap(category => category.services).map(service => <span key={service} style={{ fontFamily: FM, fontSize: '8px', letterSpacing: '0.06em', color: T.textDark, border: `1px solid ${T.border}`, padding: '5px 7px', background: 'rgba(255,255,255,0.64)' }}>{service}</span>)}
                  </div>
                </div>
                <div style={{ position: 'relative', zIndex: 2, width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${T.textDark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={T.textDark}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 03. METHODOLOGY & WORKFLOW                            */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'end', marginBottom: '64px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ width: '22px', height: '2px', background: T.accent }} />
                <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontWeight: 700 }}>
                  METHODOLOGY
                </span>
              </div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: T.textDark }}>
                Production Workflow
              </h2>
            </div>
            <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.8, color: T.textMuted, margin: 0 }}>
              A clinical four-stage process designed to ensure absolute fidelity from script to screen.
            </p>
          </div>

          {/* Flow Cards */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '30px', left: 0, right: 0, height: '1px', background: T.border, zIndex: 0 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', position: 'relative', zIndex: 1 }}>
              {PROCESS.map(({ step, heading, body }) => (
                <div key={step} style={{ background: T.cardBg, border: `1px solid ${T.border}`, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ fontFamily: FM, fontSize: '11px', color: T.accent, fontWeight: 700 }}>{step}</div>
                  <h3 style={{ fontFamily: FD, fontSize: '18px', fontWeight: 700, color: T.textDark, margin: 0 }}>{heading}</h3>
                  <p style={{ fontFamily: FB, fontSize: '12px', lineHeight: 1.7, color: T.textMuted, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 04. STANDARDS (CHARTS)                                */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <div>
              <h2 style={{ fontFamily: FD, fontSize: '32px', fontWeight: 700, margin: 0, color: T.textDark }}>PRODUCTION STANDARDS</h2>
              <p style={{ fontFamily: FB, fontSize: '13px', color: T.textMuted, marginTop: '4px' }}>Real-time studio and render performance data.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: `1px solid ${T.border}`, padding: '8px 16px', fontFamily: FM, fontSize: '9px', color: T.textDark }}>
              <span className="pulse-red" style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.red }} />
              UPDATING LIVE
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {[
              { l: 'AVG FRAME RATE', v: '120 FPS', chart: [50, 70, 85, 60, 95] },
              { l: 'RENDER EFFICIENCY', v: '0.8s RT', chart: [35, 45, 30, 65, 80] },
              { l: 'COLOR ACCURACY', v: '99.9% CR', chart: [85, 90, 88, 92, 99.9] },
            ].map(({ l, v, chart }) => (
              <div key={l} style={{ background: T.cardBg, border: `1px solid ${T.border}`, padding: '28px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                  <span style={{ fontFamily: FM, fontSize: '9px', color: T.textMuted, letterSpacing: '0.05em' }}>{l}</span>
                  <span style={{ fontFamily: FM, fontSize: '10px', color: T.accent, fontWeight: 700 }}>{v}</span>
                </div>
                {/* CSS Bar Chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '60px', paddingBottom: '4px', borderBottom: `1px solid ${T.border}` }}>
                  {chart.map((val, i) => (
                    <div key={i} style={{
                      flex: 1,
                      height: `${val}%`,
                      background: T.accent,
                      opacity: 0.3 + (i * 0.15),
                      borderRadius: '1px',
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 05. PROOF OF WORK (VIDEO GALLERY)                    */}
        {/* ══════════════════════════════════════════════════════ */}
        {false && (
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ width: '22px', height: '2px', background: T.accent }} />
            <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontWeight: 700 }}>
              PORTFOLIO
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: T.textDark }}>
                Proof of Work
              </h2>
              <p style={{ fontFamily: FB, fontSize: '13px', color: T.textMuted, marginTop: '4px' }}>Explore seven raw production loops, brand reels, and motion sequences.</p>
            </div>
            <div style={{ fontFamily: FM, fontSize: '9px', color: T.textMuted }}>CLICK TO PLAY FULLSCREEN</div>
          </div>

          {/* Grid Layout of the 6 original production files (4 videos + 2 images) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { type: 'video', title: 'Creative Studio Reel', scope: 'Directing / Sound Design', src: '/crousel/30 Oct 2025.mp4', desc: 'Cinematic brand overview highlighting modern architectural spaces and lighting.' },
              { type: 'video', title: '2D Fitness Campaign', scope: 'Direction / Core Motion', src: '/2d fitness/2D VIDEO.mp4', desc: 'Commercial product launch visualising fitness routines and active tracking.' },
              { type: 'video', title: 'Precious Anniversary Film', scope: 'Story / Cinematic Capture', src: '/precious/Anniversary Main.mp4', desc: 'Narrative documentary capturing historical milestones and brand legacy.' },
              { type: 'video', title: 'Camera Test Motion Reel', scope: 'RAW Grade / Camera Test', src: '/crousel/IMG_9527.MOV', desc: 'Color grading calibration test footage focusing on lighting density.' },
              { type: 'image', title: 'Production Still 01', scope: 'On-Set Capture', src: '/crousel/IMG_1812.JPG', desc: 'High-fidelity portrait capture highlighting practical set lighting.' },
              { type: 'image', title: 'Production Still 02', scope: 'Set Architecture', src: '/crousel/IMG_1813.JPG', desc: 'On-location setup still documenting camera placement and rigging.' },
            ].map(({ type, title, scope, src, desc }) => {
              const [hovered, setHovered] = useState(false);
              const cardVidRef = useRef(null);

              useEffect(() => {
                if (type !== 'video') return;
                const vid = cardVidRef.current;
                if (!vid) return;
                if (hovered) {
                  vid.play().catch(() => {});
                } else {
                  vid.pause();
                  vid.currentTime = 0;
                }
              }, [hovered, type]);

              return (
                <div
                  key={title}
                  onClick={() => {
                    if (type === 'video') {
                      setActiveWorkVideo(src);
                    }
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    background: T.cardBg,
                    border: `1px solid ${T.border}`,
                    padding: '24px',
                    cursor: type === 'video' ? 'pointer' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '340px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    setHovered(true);
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    setHovered(false);
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Media wrapper slot */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#F0EFF1' }}>
                      {type === 'video' ? (
                        <>
                          <video
                            ref={cardVidRef}
                            src={src}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {/* Play indicator overlay */}
                          <div style={{
                            position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center',
                            alignItems: 'center', background: hovered ? 'rgba(0,0,0,0.1)' : 'transparent',
                            transition: 'background 0.3s',
                          }}>
                            <div style={{
                              width: '40px', height: '40px', borderRadius: '50%', background: 'white',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              opacity: hovered ? 1 : 0.8, transition: 'opacity 0.2s',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill={T.textDark}>
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={src}
                          alt={title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.08)' }}
                        />
                      )}
                    </div>

                    <div>
                      <span style={{ fontFamily: FM, fontSize: '8px', color: T.accent, letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>{scope}</span>
                      <h3 style={{ fontFamily: FD, fontSize: '20px', fontWeight: 700, color: T.textDark, margin: '0 0 8px', lineHeight: 1.15 }}>{title}</h3>
                      <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.6, color: T.textMuted, margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* 06. CTA WITH ANNIVERSARY VIDEO INTEGRATION            */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 140px', borderTop: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
          {/* Subtle loop of our main Anniversary video behind the CTA */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'black' }}>
            <video ref={anniversaryVidRef} autoPlay muted loop playsInline preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }}>
              <source src="/precious/Anniversary Main.mp4" type="video/mp4" />
            </video>
          </div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(255,255,255,0.92)',
            border: `1px solid ${T.border}`,
            padding: '80px 40px',
            textAlign: 'center',
            display: 'flex',
            backdropFilter: 'blur(10px)',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
          }}>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(32px,5.5vw,56px)', fontWeight: 700, margin: 0, color: T.textDark }}>
              Built for Experts.
            </h2>
            <p style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: T.textMuted, maxWidth: '520px', margin: 0 }}>
              Our production environment is a restricted airspace. We only capture content that passes our rigorous 400-point technical checklist. Zero compromise on fidelity, narrative, and visual stability.
            </p>
            <Link to="/consult" className="btn-outline-prod" style={{ display: 'inline-block' }}>
              VIEW STUDIO SPECS
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
