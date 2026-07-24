import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomePage.css';

gsap.registerPlugin(ScrollTrigger);

// Icon shapes as inline SVG for each capability
const SHAPES = {
  square: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="2" width="24" height="24" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),
  circle: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),
  diamond: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2 L26 14 L14 26 L2 14 Z" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),
  triangle: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3 L26 25 L2 25 Z" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),
  hexagon: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2 L24 8 L24 20 L14 26 L4 20 L4 8 Z" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),
};

const CAPABILITIES = [
  {
    index: '01',
    title: 'DEVELOPMENT',
    subtitle: 'Code That Scales.',
    desc: 'Full-stack systems engineered for scale. Web apps, APIs, headless commerce, and bespoke platforms built to last.',
    to: '/development',
    shape: 'square',
    accent: '#4A6B2F',
  },
  {
    index: '02',
    title: 'BRAND & MARKETING',
    subtitle: 'Science That Converts.',
    desc: 'Performance marketing with creative precision. Paid media, SEO, and conversion systems tuned to your growth curve.',
    to: '/marketing',
    shape: 'circle',
    accent: '#4FC3F7',
  },
  {
    index: '03',
    title: 'PRODUCTION',
    subtitle: 'Frames That Speak.',
    desc: 'Video, motion, and content that earns attention. Concept through delivery — no agency markup, no creative lag.',
    to: '/production',
    shape: 'diamond',
    accent: '#FF6B8A',
  },
  {
    index: '04',
    title: 'THINK TANK',
    subtitle: 'Strategy at Target.',
    desc: 'Strategic clarity for complex problems. Fractional leadership, audits, and roadmaps that unlock real momentum.',
    to: '/about',
    shape: 'triangle',
    accent: '#4A6B2F',
  },
  {
    index: '05',
    title: 'BLACK PRAXIS',
    subtitle: 'Technology Advisory.',
    desc: 'Bespoke technology consultation and systems architecture to align your software stack with business goals.',
    to: '/development',
    shape: 'hexagon',
    accent: '#4FC3F7',
  },
];

const PROCESS_STEPS = [
  {
    index: '01',
    title: 'Discover',
    desc: 'We map the terrain — business model, constraints, competitors, and the exact problem worth solving.',
    shape: 'square',
    accent: '#1A1A1A',
    bg: '#C8E6B0',      // sage green
    textColor: '#1A1A1A',
    labelColor: '#4A7A3A',
  },
  {
    index: '02',
    title: 'Strategise',
    desc: 'A focused brief becomes a measurable plan. No bloat, no scope creep — just clear next moves.',
    shape: 'circle',
    accent: '#1A1A1A',
    bg: '#E8C9A0',      // warm sand / mustard
    textColor: '#1A1A1A',
    labelColor: '#8B6914',
  },
  {
    index: '03',
    title: 'Execute',
    desc: 'We build, test, and ship in rapid cycles. Senior talent only. You always know where things stand.',
    shape: 'diamond',
    accent: '#F5F2EB',
    bg: '#C4604A',      // terracotta brick
    textColor: '#F5F2EB',
    labelColor: 'rgba(245,242,235,0.6)',
  },
  {
    index: '04',
    title: 'Measure',
    desc: 'Post-launch we tune, optimise, and grow. The relationship doesn\'t end at delivery.',
    shape: 'triangle',
    accent: '#1A1A1A',
    bg: '#A8C4D4',      // dusty sky blue
    textColor: '#1A1A1A',
    labelColor: '#2E5F7A',
  },
  {
    index: '05',
    title: 'Scale',
    desc: 'Systematic growth. We find the inflection points and push them — hard.',
    shape: 'hexagon',
    accent: '#F5F2EB',
    bg: '#4A3728',      // espresso brown
    textColor: '#F5F2EB',
    labelColor: 'rgba(245,242,235,0.5)',
  },
];

export default function HomePage() {
  const heroRef      = useRef(null);
  const videoRef     = useRef(null);
  const statsRef     = useRef(null);
  const capsRef      = useRef(null);
  const capsStageRef = useRef(null);
  const capsCardsRef = useRef([]);
  const operateRef   = useRef(null);
  const ctaRef       = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content fade in
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.anim-hero') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // Slow cinematic video zoom
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.08 },
          {
            scale: 1.25,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            },
          }
        );
      }

      // Stats
      gsap.fromTo(
        statsRef.current?.querySelectorAll('.home-stats-col') ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
        }
      );

      // Stats count-up animation
      statsRef.current?.querySelectorAll('.home-stat-number').forEach((el) => {
        const targetVal = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const countObj = { val: 0 };
        gsap.to(countObj, {
          val: targetVal,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
          },
          onUpdate: () => {
            el.innerText = Math.floor(countObj.val) + suffix;
          },
        });
      });

      // ── Capability cards: centre-locked stage, cards swap on scroll ──
      const stage = capsStageRef.current;
      const cards = capsCardsRef.current.filter(Boolean);
      if (stage && cards.length) {
        const CARD_W  = cards[0].offsetWidth;
        const SPACING = CARD_W + 60; // centre-to-centre distance
        // Total pinned scroll: give ~600px of scroll per card transition
        const PX_PER_CARD = 600;
        const totalScroll = PX_PER_CARD * (cards.length - 1);

        // Place every card initially: card 0 at centre, rest stacked to the right
        cards.forEach((card, i) => {
          gsap.set(card, {
            x:       i * SPACING,
            scale:   i === 0 ? 1    : 0.78,
            opacity: i === 0 ? 1    : i === 1 ? 0.5 : 0,
            zIndex:  i === 0 ? 10   : 5,
          });
        });

        // Single update fn — called every scroll frame via onUpdate
        const update = (progress) => {
          // activeProgress floats from 0 → cards.length-1
          const activeProgress = progress * (cards.length - 1);

          cards.forEach((card, i) => {
            const offset = i - activeProgress;         // -N → +N (negative = left)
            const dist   = Math.abs(offset);           // distance from focus

            // scale: 1 at centre, 0.78 one card away
            const t     = Math.max(0, 1 - dist);
            const scale = 0.78 + 0.22 * t;

            // opacity: fully visible at centre, dim at 1 away, invisible beyond 1.6
            const opacity = dist > 1.6 ? 0 : Math.max(0, 1 - dist * 0.65);

            gsap.set(card, {
              x:       offset * SPACING,
              scale,
              opacity,
              zIndex:  Math.round(10 - dist * 3),
            });
          });
        };

        // Pin the section and drive update via onUpdate
        ScrollTrigger.create({
          trigger: capsRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => update(self.progress),
        });
      }

      // Process cells
      gsap.fromTo(
        operateRef.current?.querySelectorAll('.home-grid-cell, .home-grid-cell-dark') ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: operateRef.current, start: 'top 82%' },
        }
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#0A0A0A' }}>

      {/* ── HERO: Dark full-screen with car video background ──────────────── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Video Background */}
        <div className="hero-video-bg" aria-hidden="true">
          <video
            ref={videoRef}
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/home-hero/Car_moving_at_high_speed_202606170747.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.75) 80%, rgba(10,10,10,0.98) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Hero Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            padding: '120px 60px clamp(60px, 8vw, 100px)',
            boxSizing: 'border-box',
          }}
        >
          {/* Top label */}
          <div
            className="anim-hero"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#4A6B2F',
              textTransform: 'uppercase',
              marginBottom: '24px',
              fontWeight: 600,
            }}
          >
            Full Service Digital Agency // Est. 2018
          </div>

          {/* Main heading */}
          <h1
            className="anim-hero"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 9vw, 120px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              margin: '0 0 36px',
              color: '#FFFFFF',
              maxWidth: '900px',
            }}
          >
            We Build<br />
            <span style={{ color: '#4A6B2F', fontStyle: 'italic' }}>Digital</span><br />
            Engines.
          </h1>

          {/* Subtext + buttons row */}
          <div
            className="anim-hero"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '48px',
              alignItems: 'end',
              maxWidth: '900px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.65)',
                margin: 0,
              }}
            >
              Formulating systemized structures for digital presence, optimizing growth, and streamlining operations for ambitious brands.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link
                  to="/consult"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: '#4A6B2F',
                    color: '#0A0A0A',
                    padding: '14px 32px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  START PROJECT
                </Link>
                <Link
                  to="/development"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#FFFFFF',
                    padding: '14px 32px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Our Services
                </Link>
              </div>

              {/* Cap labels */}
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                <span>/ DEVELOPMENT</span>
                <span>/ MARKETING</span>
                <span>/ PRODUCTION</span>
                <span>/ STRATEGY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ──────────────────────────────────────────────── */}
      {(() => {
        // Clients with logos
        const LOGO_CLIENTS = [
          { name: 'Easy Life Home Care', logo: '/icons/ELHC.png',              height: 36 },
          { name: 'Ayurveda Organics',   logo: '/icons/ayurveda organics.png', height: 34 },
          { name: 'HopUp',              logo: '/icons/image.png',             height: 38 },
          { name: 'Property Masters',   logo: '/icons/property masters.png',  height: 42 },
        ];

        // Divider dot
        const Dot = () => (
          <div style={{
            width: '4px', height: '4px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.15)', flexShrink: 0, margin: '0 48px',
          }} />
        );

        // Logo-based client item
        const LogoItem = ({ name, logo, height }) => (
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 48px', flexShrink: 0 }}>
            <img
              src={logo}
              alt={name}
              style={{
                height: `${height}px`,
                width: 'auto',
                objectFit: 'contain',
                filter: 'none',
                opacity: 0.85,
                transition: 'opacity 0.35s ease',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
              }}
            />
          </div>
        );

        // Text wordmark for SVS Infra (no logo)
        const WordmarkItem = ({ name }) => (
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 48px', flexShrink: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'rgba(10,10,10,0.7)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                transition: 'color 0.35s ease',
                lineHeight: 1,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(10,10,10,0.7)'; }}
            >
              {name}
            </span>
          </div>
        );

        // All items in one ordered list
        const allItems = [
          ...LOGO_CLIENTS.map((c) => ({ type: 'logo', ...c })),
          { type: 'wordmark', name: 'SVS Infra' },
        ];

        return (
          <section
            style={{
              background: '#FFFFFF',
              borderTop: '1px solid rgba(0,0,0,0.07)',
              borderBottom: '1px solid rgba(0,0,0,0.07)',
              padding: '0',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Left fade — white */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '140px',
              background: 'linear-gradient(to right, #FFFFFF, transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />
            {/* Right fade — white */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '140px',
              background: 'linear-gradient(to left, #FFFFFF, transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />

            {/* Ghost label */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.24em',
              color: 'rgba(0,0,0,0.1)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              zIndex: 3, pointerEvents: 'none',
            }}>
              TRUSTED BY OUR CLIENTS
            </div>

            {/* Scrolling track — duplicated for seamless loop */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '108px',
                width: 'max-content',
                animation: 'marquee 32s linear infinite',
                willChange: 'transform',
              }}
            >
              {[0, 1].map((setIdx) => (
                <div key={setIdx} style={{ display: 'flex', alignItems: 'center' }}>
                  {allItems.map((item, i) => (
                    <div key={`${setIdx}-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
                      {item.type === 'logo'
                        ? <LogoItem name={item.name} logo={item.logo} height={item.height} />
                        : <WordmarkItem name={item.name} />
                      }
                      <Dot />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        );
      })()}



      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} style={{ background: '#F5F2EB' }}>
        {/* Tab labels */}
        <div className="home-stats-tabs">
          {['01 / Development', '02 / Production', '03 / Creative', '04 / Marketing', '05 / Consulting'].map((tab) => {
            const [num, label] = tab.split(' / ');
            return (
              <span
                key={tab}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.65)',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: '#4A6B2F' }}>{num}</span> / {label}
              </span>
            );
          })}
        </div>

        {/* 4-column stats */}
        <div className="home-stats-grid">
          {[
            { target: 120, suffix: '+', label: 'Projects Delivered' },
            { target: 40,  suffix: '+', label: 'Happy Clients' },
            { target: 6,   suffix: '+', label: 'Years Operating' },
            { target: 98,  suffix: '%', label: 'Client Retention' },
          ].map(({ target, suffix, label }) => (
            <div key={label} className="home-stats-col">
              <div
                className="home-stat-number"
                data-target={target}
                data-suffix={suffix}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}
              >
                0{suffix}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#777777',
                  lineHeight: 1.5,
                }}
              >
                // {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE DO BEST: Centre-locked card stage ────────────────────── */}
      <section
        ref={capsRef}
        style={{ background: '#F5F2EB', overflow: 'hidden' }}
      >
        {/* Section header */}
        <div style={{ padding: '80px 60px 0', boxSizing: 'border-box' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 700,
                color: '#0A0A0A',
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              What We<br />
              <span style={{ color: '#4A6B2F', fontStyle: 'italic' }}>Do Best.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#666666',
                maxWidth: '380px',
                margin: 0,
              }}
            >
              Crafting digital experiences, branding, and strategies that build enterprise value and drive lasting growth.
            </p>
          </div>

          {/* Scroll indicator row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '0',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              color: '#AAAAAA',
            }}
          >
            <span style={{ width: '28px', height: '1px', background: '#AAAAAA', display: 'inline-block' }} />
            SCROLL TO EXPLORE
          </div>
        </div>

        {/* —— Card Stage: fixed height, cards sit here absolutely centered —— */}
        <div
          ref={capsStageRef}
          style={{
            position: 'relative',
            height: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {[...CAPABILITIES, {
            index: '06',
            title: 'ALL IN',
            subtitle: 'Every brief is a new problem worth solving.',
            desc: 'We bring senior-level thinking to every engagement. No juniors, no hand-offs, no excuses.',
            to: '/consult',
            shape: 'square',
            accent: '#4A6B2F',
            isDark: true,
          }].map(({ index, title, subtitle, desc, to, shape, accent, isDark }, i) => {
            const CARD_W = 380;
            return (
              <Link
                key={index}
                to={to}
                ref={(el) => (capsCardsRef.current[i] = el)}
                style={{
                  position: 'absolute',
                  width: `${CARD_W}px`,
                  height: '440px',
                  /* centre the card on the stage origin */
                  left: `calc(50% - ${CARD_W / 2}px)`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: isDark ? '#0A0A0A' : '#FFFFFF',
                  border: isDark ? 'none' : '1px solid rgba(0,0,0,0.08)',
                  padding: '44px 40px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                  /* GSAP owns transform — don't set transition on it */
                }}
              >
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    {SHAPES[shape](isDark ? '#4A6B2F' : accent)}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: isDark ? '#555' : '#AAAAAA',
                      letterSpacing: '0.14em',
                      display: 'block',
                      marginBottom: '12px',
                    }}
                  >
                    /{index} // {title}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      fontWeight: 600,
                      margin: '0 0 14px',
                      color: isDark ? '#FFFFFF' : '#0A0A0A',
                      lineHeight: 1.1,
                    }}
                  >
                    {subtitle}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      lineHeight: 1.7,
                      color: isDark ? 'rgba(255,255,255,0.5)' : '#777',
                    }}
                  >
                    {desc}
                  </p>
                </div>

                {isDark ? (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      background: '#4A6B2F',
                      color: '#0A0A0A',
                      padding: '10px 20px',
                      display: 'inline-block',
                      fontWeight: 700,
                      alignSelf: 'flex-start',
                    }}
                  >
                    CONTACT US →
                  </span>
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      color: '#AAAAAA',
                      fontWeight: 600,
                      display: 'inline-block',
                    }}
                  >
                    EXPLORE →
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            paddingBottom: '60px',
          }}
        >
          {[...CAPABILITIES, { index: '06' }].map((_, i) => (
            <span
              key={i}
              style={{
                width: i === 0 ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === 0 ? '#0A0A0A' : 'rgba(0,0,0,0.15)',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── HOW WE OPERATE ──────────────────────────────────────────────── */}
      <section
        ref={operateRef}
        className="home-grid-section"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              fontWeight: 700,
              color: '#0A0A0A',
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            How We<br />
            <span style={{ color: '#4A6B2F', fontStyle: 'italic' }}>Operate.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.65,
              color: '#666666',
              maxWidth: '380px',
              margin: 0,
            }}
          >
            We don't slide into templates. Every engagement starts with a clean slate and focused execution.
          </p>
        </div>

        {/* Retro-coloured 3×2 grid */}
        <div className="home-grid-layout">
          {PROCESS_STEPS.map(({ index, title, desc, shape, accent, bg, textColor, labelColor }) => (
            <div
              key={index}
              style={{
                padding: '52px',
                borderRight: '1px solid rgba(0,0,0,0.08)',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '320px',
                boxSizing: 'border-box',
                background: bg,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.93)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              {/* subtle noise texture */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '128px',
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ marginBottom: '28px' }}>{SHAPES[shape](accent)}</div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: labelColor,
                    letterSpacing: '0.14em',
                    display: 'block',
                    marginBottom: '12px',
                    fontWeight: 600,
                  }}
                >
                  /{index}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.5vw, 30px)',
                    fontWeight: 600,
                    margin: '0 0 14px',
                    color: textColor,
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: textColor,
                    opacity: 0.72,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}

          {/* Dark Promise CTA */}
          <div className="home-grid-cell-dark">
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: '#666666',
                  letterSpacing: '0.15em',
                  display: 'block',
                  marginBottom: '20px',
                }}
              >
                // PROMISE
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  margin: 0,
                  color: '#FFFFFF',
                }}
              >
                Focused progress.<br />Measurable results.
              </h3>
            </div>
            <Link
              to="/consult"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: '#4A6B2F',
                color: '#0A0A0A',
                padding: '12px 24px',
                textDecoration: 'none',
                fontWeight: 700,
                alignSelf: 'flex-start',
                marginTop: '32px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              WORK WITH US →
            </Link>
          </div>
        </div>
      </section>


      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="home-cta-section">
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: '#4A6B2F',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 600,
            }}
          >
            Get in touch
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 5vw, 64px)',
              fontWeight: 600,
              lineHeight: 1.05,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Ready to build<br />
            something worth<br />
            <span style={{ fontStyle: 'italic', color: '#4A6B2F' }}>remembering?</span>
          </h2>
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '36px',
            }}
          >
            We align our capabilities with your growth objectives. Let's design, code, and execute systems that establish lasting value for your brand.
          </p>
          <Link
            to="/consult"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: '#4A6B2F',
              color: '#0A0A0A',
              padding: '16px 36px',
              textDecoration: 'none',
              fontWeight: 700,
              display: 'inline-block',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            START PROJECT →
          </Link>
        </div>
      </section>

    </div>
  );
}

