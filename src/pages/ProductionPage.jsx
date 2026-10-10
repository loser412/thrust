import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ───────────────────────────────────────────────── */
const SELECTED_PROJECTS = [
  {
    type: 'video',
    title: 'Creative Studio Reel',
    category: 'Commercial / Studio Reel',
    role: 'Directing & Cinematography',
    brief: 'Cinematic brand overview highlighting modern architectural spaces and lighting.',
    src: '/crousel/30 Oct 2025.mp4',
  },
  {
    type: 'video',
    title: '2D Fitness Campaign',
    category: 'Commercial / Product Demo',
    role: 'Direction & Core Motion',
    brief: 'Commercial product launch visualising fitness routines and active tracking.',
    src: '/2d fitness/2D VIDEO.mp4',
  },
  {
    type: 'video',
    title: 'Precious Anniversary Film',
    category: 'Brand Documentary',
    role: 'Story, Direction & Capture',
    brief: 'Narrative documentary capturing historical milestones and brand legacy.',
    src: '/precious/Anniversary Main.mp4',
  },
  {
    type: 'video',
    title: 'Camera Test Motion Reel',
    category: 'Technical Test & Grade',
    role: 'RAW Grade & Camera Test',
    brief: 'Color grading calibration test footage focusing on lighting density and dynamic range.',
    src: '/crousel/IMG_9527.MOV',
  },
  {
    type: 'image',
    title: 'Production Still 01',
    category: 'Commercial Photography',
    role: 'On-Set Capture',
    brief: 'High-fidelity portrait capture highlighting practical set lighting.',
    src: '/crousel/IMG_1812.JPG',
  },
  {
    type: 'image',
    title: 'Production Still 02',
    category: 'Set Photography',
    role: 'Set Architecture',
    brief: 'On-location setup still documenting camera placement and rigging.',
    src: '/crousel/IMG_1813.JPG',
  },
];

/* 6 Post-Production & Campaign Content Categories (Page 3 of PDF) */
const SERVICE_CATEGORIES = [
  {
    title: 'Editing & Finishing',
    tag: 'POST-PRODUCTION',
    desc: 'Cutting, assembling, and timing footage for emotional clarity and high viewer retention.',
    items: ['Video editing', 'Colour correction', 'Sound design', 'Subtitles & captions'],
  },
  {
    title: 'Motion & Visual Effects',
    tag: 'ANIMATION',
    desc: 'Dynamic text, 2D motion graphics, and visual enhancements that bring brand concepts to life.',
    items: ['2D animation', 'Green-screen compositing', 'Titles & graphics', 'Logo reveals'],
  },
  {
    title: 'Audio Production',
    tag: 'SOUND',
    desc: 'Studio-grade voiceovers, broadcast-level audio cleaning, and custom soundscapes.',
    items: ['Voice-over recording', 'Podcast audio editing', 'Sound effects', 'Audio mastering'],
  },
  {
    title: 'Studio & Photography',
    tag: 'STUDIO',
    desc: 'Controlled-environment captures, high-resolution product photography, and multi-cam recording.',
    items: ['Product photography', 'Studio shoots', 'Multi-camera recording', 'Commercial stills'],
  },
  {
    title: 'Social & Campaign Content',
    tag: 'DISTRIBUTION',
    desc: 'Fast-paced, hook-driven vertical and square content tailored to stop the scroll.',
    items: ['Instagram Reels', 'YouTube Shorts', 'TikTok videos', 'Video ad creatives'],
  },
  {
    title: 'Brand & Business Films',
    tag: 'NARRATIVE',
    desc: 'Flagship commercial films engineered to establish authority and explain complex products.',
    items: ['Brand films', 'Product launch videos', 'Explainer videos', 'Campaign films'],
  },
];

/* Production Standards (Page 2 of PDF) */
const PRODUCTION_STANDARDS = [
  {
    num: '01',
    label: 'VISUAL QUALITY',
    heading: 'Thoughtful framing. Consistent colour.',
    detail: 'We plan every composition with intention—calibrated lighting, deliberate camera movement, and balanced colour grading tailored to your brand identity.',
    deliverable: 'Cinema-grade lighting & colour science',
  },
  {
    num: '02',
    label: 'SOUND & FINISHING',
    heading: 'Clean audio. Polished edits.',
    detail: 'Pacing that holds audience attention, paired with pristine voice recording, custom sound design, and licensing-cleared music tracks.',
    deliverable: 'Pristine dialogue & broadcast mix',
  },
  {
    num: '03',
    label: 'DELIVERY',
    heading: 'Files prepared for your platforms.',
    detail: 'Clean exports in all required ratios and bitrates: 16:9 widescreen, 9:16 vertical reels, 1:1 feeds, and archival 4K master files.',
    deliverable: '16:9 • 9:16 • 1:1 • 4K UHD masters',
  },
];

/* Production Workflow (Page 2 of PDF) */
const PROCESS = [
  {
    step: '01',
    heading: 'PLAN',
    body: 'We understand your goals, audience and deliverables, then shape the concept, schedule and shoot plan.',
  },
  {
    step: '02',
    heading: 'SHOOT',
    body: 'We coordinate the shoot, capture the footage or photographs, and guide the production on set.',
  },
  {
    step: '03',
    heading: 'EDIT',
    body: 'We shape the story, refine the visuals, balance colour and complete the sound.',
  },
  {
    step: '04',
    heading: 'DELIVER',
    body: 'We provide the approved files in the formats and sizes agreed for your website and social channels.',
  },
];

/* ─── DESIGN TOKENS ──── */
const T = {
  bg:         '#F7F8FA',       // Light clean background
  cardBg:     '#FFFFFF',       // Stark white cards
  cardBgAlt:  '#0C120C',       // Dark card highlight
  border:     '#E5E7EB',       // Subtle borders
  accent:     '#4A6B2F',       // Forest green marker
  textDark:   '#0C120C',       // Stark dark text
  textMuted:  '#5C645A',       // Soft grey-green body
  red:        '#E11D48',       // Streaming status dot
};

const FD = "'Barlow Condensed', 'Arial Narrow', sans-serif";
const FB = "'Manrope', 'Helvetica Neue', sans-serif";
const FM = 'var(--font-mono)';

export default function ProductionPage() {
  const heroRef        = useRef(null);
  const heroBgRef      = useRef(null);
  const mainRef        = useRef(null);
  const anniversaryVidRef = useRef(null);

  const [activeWorkVideo, setActiveWorkVideo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: T.bg, color: T.textDark, fontFamily: FB, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Global CSS injections */}
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
          background: ${T.textDark}; color: #FFFFFF;
          font-family: ${FM}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          padding: 16px 32px; display: inline-flex; align-items: center; gap: 8px;
          transition: transform 0.2s, opacity 0.2s; border: none; cursor: pointer;
        }
        .btn-black-prod:hover { transform: translateY(-2px); opacity: 0.92; }
        .btn-outline-prod {
          background: transparent; color: ${T.textDark};
          border: 1px solid ${T.textDark};
          font-family: ${FM}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          padding: 16px 32px; display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .btn-outline-prod:hover { background: ${T.textDark}; color: #FFFFFF; transform: translateY(-2px); }
        .btn-whatsapp-prod {
          background: #25D366; color: #FFFFFF;
          font-family: ${FM}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          padding: 16px 32px; display: inline-flex; align-items: center; gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s; border: none; cursor: pointer;
        }
        .btn-whatsapp-prod:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,0.35); }
        @keyframes prodPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .pulse-red { animation: prodPulse 1.8s ease-in-out infinite; }
        .prod-work-card {
          background: ${T.cardBg};
          border: 1px solid ${T.border};
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .prod-work-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
          border-color: ${T.accent};
        }
        .prod-svc-card {
          background: ${T.cardBg};
          border: 1px solid ${T.border};
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .prod-svc-card:hover {
          transform: translateY(-3px);
          border-color: ${T.accent};
        }
      `}</style>

      <div className="prod-grid-overlay production-page" ref={mainRef}>
        
        {/* ══════════════════════════════════════════════════════ */}
        {/* 01. MAIN BANNER / HERO                                */}
        {/* ══════════════════════════════════════════════════════ */}
        <section ref={heroRef} style={{
          minHeight: '85vh',
          padding: '140px clamp(24px,6vw,80px) 90px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${T.border}`,
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
        }}>
          {/* Background image with cinematic gradient */}
          <div
            ref={heroBgRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              backgroundImage: `linear-gradient(110deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.72) 100%), url('/image3.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              willChange: 'transform',
            }}
          />

          <div className="prod-hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr', width: '100%', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              
              {/* Eyebrow Tag: Unified Thrust & Logic Positioning */}
              <div className="h-anim" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="pulse-red" style={{ width: '8px', height: '8px', borderRadius: '50%', background: T.red }} />
                <span style={{ fontFamily: FM, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>
                  THRUST &amp; LOGIC • PRODUCTION MEDIA
                </span>
              </div>

              {/* Heading from PDF: "MAKE YOUR BRAND SEEN." */}
              <h1 className="h-anim" style={{
                fontFamily: FD,
                fontSize: 'clamp(52px, 7vw, 102px)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                margin: 0,
                color: '#fff',
              }}>
                MAKE YOUR<br />BRAND SEEN.
              </h1>

              {/* Supporting copy from PDF */}
              <p className="h-anim" style={{
                fontFamily: FB,
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.88)',
                maxWidth: '540px',
                margin: 0,
              }}>
                From brand films and product shoots to social media videos and campaign content,
                we plan, produce and edit visuals that help your business communicate with clarity.
              </p>

              {/* Action Buttons: Discuss Project & View Work */}
              <div className="h-anim" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginTop: '6px' }}>
                <Link to="/consult" className="btn-black-prod" style={{ background: '#FFFFFF', color: T.textDark }}>
                  DISCUSS YOUR PROJECT <span>↗</span>
                </Link>
                <a href="#portfolio" className="btn-outline-prod" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.5)' }}>
                  VIEW OUR WORK ↓
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 02. SELECTED WORK (PROOF BEFORE PROCESS)              */}
        {/* ══════════════════════════════════════════════════════ */}
        <section id="portfolio" className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ width: '22px', height: '2px', background: T.accent }} />
            <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontWeight: 700 }}>
              PORTFOLIO &amp; PROOF
            </span>
          </div>

          <div className="production-heading-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '30px', alignItems: 'end', marginBottom: '56px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,68px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: T.textDark }}>
                Selected Projects
              </h2>
              <p style={{ fontFamily: FB, fontSize: '15px', color: T.textMuted, marginTop: '6px', maxWidth: '580px' }}>
                Real commercial campaigns, product videos, and brand reels produced for our clients.
              </p>
            </div>
            <div style={{ fontFamily: FM, fontSize: '10px', letterSpacing: '0.1em', color: T.textMuted, textTransform: 'uppercase' }}>
              HOVER TO PREVIEW • CLICK TO PLAY
            </div>
          </div>

          {/* 6 Projects Grid */}
          <div className="production-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {SELECTED_PROJECTS.map((item) => {
              const [hovered, setHovered] = useState(false);
              const [previewPlaying, setPreviewPlaying] = useState(false);
              const cardVidRef = useRef(null);

              useEffect(() => {
                if (item.type !== 'video') return;
                const vid = cardVidRef.current;
                if (!vid) return;
                if (hovered) {
                  vid.play().catch(() => {});
                } else {
                  vid.pause();
                  vid.currentTime = 0;
                }
              }, [hovered, item.type]);

              return (
                <div
                  key={item.title}
                  className="prod-work-card"
                  onClick={() => {
                    if (item.type === 'video') setActiveWorkVideo(item.src);
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    padding: '22px',
                    cursor: item.type === 'video' ? 'pointer' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '360px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Media Slot */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#F0EFF1' }}>
                      {item.type === 'video' ? (
                        <>
                          <video
                            ref={cardVidRef}
                            src={item.src}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            onPlay={() => setPreviewPlaying(true)}
                            onPause={() => setPreviewPlaying(false)}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{
                            position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center',
                            alignItems: 'center', background: hovered ? 'rgba(0,0,0,0.15)' : 'transparent',
                            transition: 'background 0.3s',
                          }}>
                            {!previewPlaying && (
                              <div style={{
                                width: '42px', height: '42px', borderRadius: '50%', background: '#FFFFFF',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                              }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill={T.textDark}>
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <img
                          src={item.src}
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontFamily: FM, fontSize: '9px', color: T.accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                          {item.category}
                        </span>
                        <span style={{ fontFamily: FM, fontSize: '9px', color: T.textMuted }}>
                          {item.role}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: FD, fontSize: '22px', fontWeight: 700, color: T.textDark, margin: '0 0 8px', lineHeight: 1.15 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.6, color: T.textMuted, margin: 0 }}>
                        {item.brief}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 03. POST-PRODUCTION & CAMPAIGN CONTENT (SERVICES)     */}
        {/* ══════════════════════════════════════════════════════ */}
        <section id="services" className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ width: '22px', height: '2px', background: T.accent }} />
            <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontWeight: 700 }}>
              DELIVERABLES
            </span>
          </div>

          <div className="production-heading-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,68px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: T.textDark }}>
                Post-Production &amp;<br />Campaign Content
              </h2>
            </div>
            <p style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: T.textMuted, margin: 0 }}>
              From the first edit to final platform-ready assets, we turn your footage into clear,
              engaging content for your brand.
            </p>
          </div>

          {/* 6 Grouped Service Categories (Page 3 of PDF) */}
          <div className="production-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {SERVICE_CATEGORIES.map((cat, i) => (
              <div key={cat.title} className="prod-svc-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontFamily: FM, fontSize: '9px', color: T.accent, letterSpacing: '0.14em', fontWeight: 700 }}>
                      0{i + 1} — {cat.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: FD, fontSize: '26px', fontWeight: 700, margin: '0 0 12px', color: T.textDark }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.7, color: T.textMuted, margin: '0 0 20px' }}>
                    {cat.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '16px', borderTop: `1px solid ${T.border}` }}>
                  {cat.items.map((svc) => (
                    <span
                      key={svc}
                      style={{
                        fontFamily: FM,
                        fontSize: '9px',
                        letterSpacing: '0.06em',
                        color: T.textDark,
                        background: '#F0F2F5',
                        border: `1px solid ${T.border}`,
                        padding: '6px 10px',
                      }}
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 04. PRODUCTION STANDARDS (Page 2 of PDF)              */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ width: '22px', height: '2px', background: T.accent }} />
            <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontWeight: 700 }}>
              STANDARDS
            </span>
          </div>

          <div className="production-heading-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end', marginBottom: '56px' }}>
            <div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,68px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: T.textDark }}>
                Quality in Every Frame.
              </h2>
            </div>
            <p style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: T.textMuted, margin: 0 }}>
              We plan every shoot with care and refine every edit with attention to detail—from
              framing and lighting to colour, sound and final delivery.
            </p>
          </div>

          {/* 3 Meaningful Cards replacing fake FPS metrics */}
          <div className="production-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {PRODUCTION_STANDARDS.map((std) => (
              <div
                key={std.num}
                style={{
                  background: T.cardBg,
                  border: `1px solid ${T.border}`,
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{ fontFamily: FM, fontSize: '10px', color: T.accent, letterSpacing: '0.15em', fontWeight: 700 }}>
                      CARD {std.num}
                    </span>
                    <span style={{ fontFamily: FM, fontSize: '9px', color: T.textMuted, letterSpacing: '0.1em' }}>
                      {std.label}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: FD, fontSize: '24px', fontWeight: 700, margin: '0 0 14px', color: T.textDark, lineHeight: 1.15 }}>
                    {std.heading}
                  </h3>
                  <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.75, color: T.textMuted, margin: 0 }}>
                    {std.detail}
                  </p>
                </div>
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: `1px solid ${T.border}` }}>
                  <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.1em', color: T.accent, fontWeight: 700, textTransform: 'uppercase' }}>
                    ✓ {std.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 05. PRODUCTION WORKFLOW (Page 2 of PDF)               */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 80px', borderBottom: `1px solid ${T.border}` }}>
          <div className="production-heading-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'end', marginBottom: '64px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ width: '22px', height: '2px', background: T.accent }} />
                <span style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', color: T.accent, textTransform: 'uppercase', fontWeight: 700 }}>
                  METHODOLOGY
                </span>
              </div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,68px)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: T.textDark }}>
                From First Idea<br />to Final Cut.
              </h2>
            </div>
            <p style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: T.textMuted, margin: 0 }}>
              A clear, collaborative process keeps your project organised at every stage.
            </p>
          </div>

          {/* 4 Flow Cards */}
          <div className="production-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {PROCESS.map(({ step, heading, body }) => (
              <div key={step} style={{ background: T.cardBg, border: `1px solid ${T.border}`, padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontFamily: FM, fontSize: '11px', color: T.accent, fontWeight: 700 }}>{step}</div>
                <h3 style={{ fontFamily: FD, fontSize: '22px', fontWeight: 700, color: T.textDark, margin: 0 }}>{heading}</h3>
                <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.75, color: T.textMuted, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* 06. CALL TO ACTION WITH WHATSAPP ENQUIRY               */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="sc-reveal" style={{ padding: '96px clamp(24px,6vw,80px) 140px', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle loop of Anniversary video behind the CTA */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#0C120C' }}>
            <video ref={anniversaryVidRef} autoPlay muted loop playsInline preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.14 }}>
              <source src="/precious/Anniversary Main.mp4" type="video/mp4" />
            </video>
          </div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(255,255,255,0.95)',
            border: `1px solid ${T.border}`,
            padding: '70px 40px',
            textAlign: 'center',
            display: 'flex',
            backdropFilter: 'blur(12px)',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}>
            <span style={{ fontFamily: FM, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: T.accent, fontWeight: 700 }}>
              START A PROJECT
            </span>

            <h2 style={{ fontFamily: FD, fontSize: 'clamp(38px,6vw,68px)', fontWeight: 700, margin: 0, color: T.textDark }}>
              Discuss Your Project.
            </h2>

            <p style={{ fontFamily: FB, fontSize: '16px', lineHeight: 1.8, color: T.textMuted, maxWidth: '580px', margin: 0 }}>
              Tell us what you're planning to shoot, produce, or edit. We'll provide a straightforward
              estimate, timeline, and creative approach—straight from the team doing the work.
            </p>

            {/* CTAs: Enquiry Form + WhatsApp Option (Page 5 of PDF) */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
              <Link to="/consult" className="btn-black-prod">
                DISCUSS YOUR PROJECT <span>↗</span>
              </Link>
              <a
                href="https://wa.me/917982056222?text=Hi%20Thrust%20%26%20Logic,%20I'd%20like%20to%20discuss%20a%20production%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-prod"
              >
                CHAT ON WHATSAPP <span>↗</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* VIDEO LIGHTBOX MODAL                                   */}
      {/* ══════════════════════════════════════════════════════ */}
      {activeWorkVideo && (
        <div
          onClick={() => setActiveWorkVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              aspectRatio: '16/9',
              background: '#000',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
          >
            <video
              src={activeWorkVideo}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <button
              onClick={() => setActiveWorkVideo(null)}
              style={{
                position: 'absolute',
                top: '-44px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontFamily: FM,
                fontSize: '13px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              ✕ CLOSE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
