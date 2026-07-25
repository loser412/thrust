import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── COLOR PALETTE — VIBRANT, LUXURIOUS MULTI-TONE LIGHT DESIGN ─── */
const BG_PAGE         = '#FDFCF7';       // soft warm porcelain
const BG_LIGHT        = '#F4F2EB';       // warm sand grey
const BG_DARK         = '#130F26';       // deep midnight violet for CTA
const ACCENT_INDIGO   = '#5046E5';       // royal indigo
const ACCENT_CORAL    = '#FF5938';       // energetic sunset coral
const TEXT_DARK       = '#1C1613';       // rich dark espresso
const TEXT_MID        = '#4B433E';       // warm charcoal
const TEXT_MUTED      = '#857B74';       // soft earth grey
const BORDER          = 'rgba(28,22,19,0.06)';

/* Alternating premium pastel colors for cards */
const BG_PASTELS = [
  '#E3ECE8', // Soft Sage Green
  '#F7EBE0', // Soft Peach
  '#E6E4F0', // Soft Lavender
  '#E2ECF2', // Soft Sky Blue
];

const TEXT_PASTELS = [
  '#2C5243',
  '#6B4423',
  '#3C376B',
  '#27475A',
];

const FD = 'var(--font-display)';
const FB = 'var(--font-body)';
const FM = 'var(--font-mono)';

/* ─── DATA ─── */
const VALUES = [
  {
    index: '/01',
    title: 'CLARITY OVER COMPLEXITY',
    body: "We don't add process for process's sake. Simple, direct, and well-reasoned beats elaborate and slow every time.",
  },
  {
    index: '/02',
    title: 'SENIOR TALENT ONLY',
    body: 'Every engagement is run by people who have done it before — not managed by them. No juniors learning on your dime.',
  },
  {
    index: '/03',
    title: 'RADICAL TRANSPARENCY',
    body: "You know what we're doing, why we're doing it, and how it's tracking — in real time, always.",
  },
  {
    index: '/04',
    title: 'OUTCOMES OVER OUTPUTS',
    body: "Deliverables matter less than results. We don't ship things. We move needles.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: '⬡',
    title: 'No Account Managers',
    desc: 'The people who pitch are the people who deliver.',
  },
  {
    icon: '◈',
    title: 'Flat Retainer Model',
    desc: 'No hourly billing. Predictable cost, unlimited thinking.',
  },
  {
    icon: '⬢',
    title: 'Embedded Working',
    desc: 'We operate like an internal team — in your Slack, on your calls.',
  },
  {
    icon: '✦',
    title: 'Honest Scope',
    desc: "If we can't do something well, we'll tell you before you find out.",
  },
];

const TEAM = [
  {
    name: 'Damien Holt',
    role: 'Founder / Strategy',
    bio: '12 years scaling digital products for VC-backed startups and Fortune 500 brands.',
    img: '/about/team_damien.png',
  },
  {
    name: 'Priya Mathur',
    role: 'Head of Development',
    bio: "Ex-Shopify engineer. Builds systems that handle 10× the traffic you think you'll ever get.",
    img: '/about/team_priya.png',
  },
  {
    name: 'Jordan Reef',
    role: 'Creative Director',
    bio: 'Former agency CD. Cuts creative briefs to the bone and shoots with surgical precision.',
    img: '/about/team_marcus.png',
  },
  {
    name: 'Nadia Kovács',
    role: 'Head of Performance',
    bio: '8 years in paid media. Has managed $40M+ in ad spend with consistent ROAS above 3x.',
    img: '/about/team_elena.png',
  },
];

export default function AboutPage() {
  const heroRef  = useRef(null);
  const storyRef = useRef(null);
  const princRef = useRef(null);
  const valRef   = useRef(null);
  const teamRef  = useRef(null);
  const ctaRef   = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.ha') ?? [],
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.1 }
      );

      /* Story section */
      gsap.fromTo(
        storyRef.current?.querySelectorAll('.sa') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%', once: true } }
      );

      /* Principles cards */
      gsap.fromTo(
        princRef.current?.querySelectorAll('.pc') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: princRef.current, start: 'top 80%', once: true } }
      );

      /* Values cards */
      gsap.fromTo(
        valRef.current?.querySelectorAll('.vc') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: valRef.current, start: 'top 80%', once: true } }
      );

      /* Team cards */
      gsap.fromTo(
        teamRef.current?.querySelectorAll('.tc') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: teamRef.current, start: 'top 80%', once: true } }
      );

      /* CTA */
      gsap.fromTo(ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', once: true } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: BG_PAGE, color: TEXT_DARK, fontFamily: FB, overflowX: 'hidden' }}>

      {/* ── Global styles ── */}
      <style>{`
        .abt-btn-primary {
          display: inline-block; text-decoration: none;
          background: linear-gradient(135deg, ${ACCENT_INDIGO} 0%, ${ACCENT_CORAL} 100%);
          color: #FFFFFF;
          font-family: ${FB}; font-size: 14px; font-weight: 600;
          padding: 14px 30px; border-radius: 6px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .abt-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(80,70,229,0.3); }
        .abt-btn-outline {
          display: inline-block; text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.2); color: #FFFFFF;
          font-family: ${FB}; font-size: 14px; font-weight: 600;
          padding: 14px 30px; border-radius: 6px; background: transparent;
          transition: border-color 0.2s, background 0.2s;
        }
        .abt-btn-outline:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }
        .princ-card { transition: transform 0.25s, box-shadow 0.25s; }
        .princ-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(28,22,19,0.05); }
        .val-card { transition: transform 0.25s, box-shadow 0.25s; }
        .val-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.04); }
        .team-card { transition: transform 0.25s, box-shadow 0.25s; }
        .team-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.05); }
      `}</style>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 01. HERO — split layout                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          padding: '140px clamp(24px,6vw,80px) 100px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '60px',
          alignItems: 'center',
          borderBottom: `1px solid ${BORDER}`,
          boxSizing: 'border-box',
          background: BG_PAGE,
        }}
      >
        {/* Left: text */}
        <div>
          <div className="ha" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT_CORAL, display: 'inline-block' }} />
            <span style={{ fontFamily: FM, fontSize: '10px', letterSpacing: '0.18em', color: ACCENT_CORAL, textTransform: 'uppercase', fontWeight: 700 }}>ABOUT THE AGENCY</span>
          </div>

          <h1 className="ha" style={{ fontFamily: FD, fontSize: 'clamp(42px,5.5vw,76px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 28px', color: TEXT_DARK }}>
            Precision in Motion.<br />
            <span style={{
              background: `linear-gradient(90deg, ${ACCENT_INDIGO} 0%, ${ACCENT_CORAL} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Full-Service</span> Digital<br />
            Excellence.
          </h1>

          <p className="ha" style={{ fontFamily: FB, fontSize: '16px', lineHeight: 1.75, color: TEXT_MID, maxWidth: '460px', margin: 0 }}>
            We translate complex technological challenges into elegant digital solutions through rigorous logic and creative momentum.
          </p>
        </div>

        {/* Right: hero video (autoplay, muted, loop) */}
        <div className="ha" style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 12px 32px rgba(28,22,19,0.06)' }}>
          <video
            src="/Thrust_and_logic_animating_colors_202607250556.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Animated hero background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 02. STORY — original text left, image right        */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        ref={storyRef}
        style={{
          padding: '100px clamp(24px,6vw,80px)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '80px',
          alignItems: 'center',
          borderBottom: `1px solid ${BORDER}`,
          boxSizing: 'border-box',
          background: BG_PAGE,
        }}
      >
        {/* Left: text */}
        <div>
          <h2 className="sa" style={{ fontFamily: FD, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 24px', color: TEXT_DARK }}>
            Born from a Need for<br />Technical Clarity
          </h2>
          <p className="sa" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: TEXT_MID, margin: '0 0 20px' }}>
            We started Thrust &amp; Logic because we were frustrated. Frustrated with agencies that staffed accounts with juniors, padded timelines, and measured success in decks delivered rather than problems solved.
          </p>
          <p className="sa" style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.8, color: TEXT_MID, margin: '0 0 28px' }}>
            So we built the agency we wanted to hire. Senior-only. Flat. Transparent. Embedded in your world rather than billing by the hour from a distance. Six years later, the model works — for us and the brands we work with.
          </p>
          <div className="sa">
            <Link
              to="/consult"
              style={{ fontFamily: FM, fontSize: '11px', letterSpacing: '0.14em', color: ACCENT_CORAL, textTransform: 'uppercase', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', borderBottom: `1.5px solid ${ACCENT_CORAL}`, paddingBottom: '2px' }}
            >
              — ESTABLISHED 2019
            </Link>
          </div>
        </div>

        {/* Right: architectural image */}
        <div className="sa" style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 12px 32px rgba(28,22,19,0.06)' }}>
          <img
            src="/about/office.png"
            alt="Technical clarity"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(0.25) brightness(0.95)' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 03. PRINCIPLES — 4 columns using periwinkle cards   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        ref={princRef}
        style={{
          padding: '100px clamp(24px,6vw,80px)',
          background: BG_LIGHT,
          borderBottom: `1px solid ${BORDER}`,
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontFamily: FD, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 12px', color: TEXT_DARK }}>
          Governed by Principles
        </h2>
        <p style={{ fontFamily: FB, fontSize: '15px', color: TEXT_MUTED, margin: '0 0 56px', lineHeight: 1.7 }}>
          The pillars that sustain our momentum.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'left' }}>
          {DIFFERENTIATORS.map(({ icon, title, desc }, i) => {
            const cardBg = BG_PASTELS[i % BG_PASTELS.length];
            const iconColor = TEXT_PASTELS[i % TEXT_PASTELS.length];
            return (
              <div
                key={title}
                className="pc princ-card"
                style={{
                  background: cardBg,
                  borderRadius: '8px',
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  border: '1px solid rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: iconColor }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: FD, fontSize: '22px', fontWeight: 700, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.75, color: TEXT_MID, margin: 0 }}>{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 04. VALUES — styled grid of the original 4 values   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        ref={valRef}
        style={{
          padding: '100px clamp(24px,6vw,80px)',
          background: BG_PAGE,
          borderBottom: `1px solid ${BORDER}`,
          boxSizing: 'border-box',
        }}
      >
        <div className="vc" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT_INDIGO, display: 'inline-block' }} />
          <span style={{ fontFamily: FM, fontSize: '10px', letterSpacing: '0.18em', color: ACCENT_INDIGO, textTransform: 'uppercase', fontWeight: 700 }}>VALUES</span>
        </div>
        <h2 className="vc" style={{ fontFamily: FD, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 52px', color: TEXT_DARK }}>
          What We<br /><span style={{ fontStyle: 'italic', fontFamily: FD }}>Stand For.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {VALUES.map(({ index, title, body }, i) => {
            const dotColor = TEXT_PASTELS[i % TEXT_PASTELS.length];
            return (
              <div
                key={index}
                className="vc val-card"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '8px',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  borderLeft: `4px solid ${dotColor}`,
                }}
              >
                <span style={{ fontFamily: FM, fontSize: '11px', letterSpacing: '0.1em', color: dotColor, fontWeight: 700 }}>{index}</span>
                <h3 style={{ fontFamily: FD, fontSize: '20px', fontWeight: 700, color: TEXT_DARK, margin: 0 }}>{title}</h3>
                <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.7, color: TEXT_MID, margin: 0 }}>{body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 05. TEAM — original 4 team members                 */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        ref={teamRef}
        style={{
          padding: '100px clamp(24px,6vw,80px)',
          background: BG_LIGHT,
          borderBottom: `1px solid ${BORDER}`,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '52px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 10px', color: TEXT_DARK }}>
              The Collective Intelligence
            </h2>
            <p style={{ fontFamily: FB, fontSize: '15px', color: TEXT_MUTED, margin: 0 }}>
              Led by industry specialists with a passion for precision.
            </p>
          </div>
          <Link
            to="/team"
            style={{ fontFamily: FM, fontSize: '11px', letterSpacing: '0.12em', color: ACCENT_INDIGO, textTransform: 'uppercase', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
          >
            View All Team →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '28px' }}>
          {TEAM.slice(0, 2).map(({ name, role, bio, img }, i) => {
            const accentColor = TEXT_PASTELS[i % TEXT_PASTELS.length];
            return (
              <div key={name} className="tc team-card" style={{ background: '#FFFFFF', padding: '24px', borderRadius: '8px', border: `1px solid ${BORDER}` }}>
                {/* Photo */}
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', borderRadius: '4px', marginBottom: '20px', background: '#E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <img
                    src={img}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: 'grayscale(0.1)' }}
                  />
                </div>
                <div style={{ fontFamily: FD, fontSize: '20px', fontWeight: 700, color: TEXT_DARK, marginBottom: '4px', letterSpacing: '-0.01em' }}>{name}</div>
                <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.14em', color: accentColor, textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px' }}>{role}</div>
                <p style={{ fontFamily: FB, fontSize: '13px', lineHeight: 1.6, color: TEXT_MID, margin: 0 }}>{bio}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 06. CTA — deep violet navy band                    */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        style={{
          background: BG_DARK,
          padding: '80px clamp(24px,6vw,80px)',
          textAlign: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft glowing ambient circle */}
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(80,70,229,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50%', right: '-20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,89,56,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: FD, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 16px', color: '#FFFFFF' }}>
            Ready to apply some logic to your next project?
          </h2>
          <p style={{ fontFamily: FB, fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto 36px' }}>
            Let's discuss how our precision-engineered digital strategies can propel your brand forward.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/consult" className="abt-btn-primary">START A PROJECT</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
