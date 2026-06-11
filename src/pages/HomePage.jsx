import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import SectionLabel from '../components/SectionLabel';
import Marquee from '../components/Marquee';
import './HomePage.css';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 150, suffix: '+', label: '// Projects Delivered' },
  { value: 8,   suffix: '+', label: '// Years Operating'   },
  { value: 40,  suffix: '+', label: '// Happy Clients'     },
  { value: 3,   suffix: 'x', label: '// Avg ROI Uplift'    },
];

const SERVICES = [
  {
    index: '01',
    title: 'DEVELOPMENT',
    to: '/development',
    description:
      'Full-stack systems engineered for scale. Web apps, APIs, headless commerce, and bespoke platforms built to last.',
    tags: ['React', 'Node', 'Postgres', 'AWS'],
    color: '#0D1A2E',
    accentLine: 'var(--accent)',
  },
  {
    index: '02',
    title: 'MARKETING',
    to: '/marketing',
    description:
      'Performance marketing with creative precision. Paid media, SEO, and conversion systems tuned to your growth curve.',
    tags: ['Paid Media', 'SEO', 'Analytics', 'CRO'],
    color: '#0E1A0B',
    accentLine: '#A0D929',
  },
  {
    index: '03',
    title: 'PRODUCTION',
    to: '/production',
    description:
      'Video, motion, and content that earns attention. Concept through delivery — no agency markup, no creative lag.',
    tags: ['Video', 'Motion', 'Direction', 'Post'],
    color: '#1A0D0D',
    accentLine: '#F13535',
  },
  {
    index: '04',
    title: 'CONSULTING',
    to: '/consult',
    description:
      'Strategic clarity for complex problems. Fractional leadership, audits, and roadmaps that unlock real momentum.',
    tags: ['Strategy', 'Audits', 'Roadmaps', 'OKRs'],
    color: '#150F1A',
    accentLine: '#A035F1',
  },
];

const PROCESS = [
  {
    step: '/01',
    heading: 'DISCOVERY',
    body: 'We map the terrain — business model, constraints, competitors, and the exact problem worth solving.',
  },
  {
    step: '/02',
    heading: 'STRATEGY',
    body: 'A focused brief becomes a measurable plan. No bloat, no scope creep — just clear next moves.',
  },
  {
    step: '/03',
    heading: 'EXECUTION',
    body: 'We build, test, and ship in rapid cycles. Senior talent only. You always know where things stand.',
  },
  {
    step: '/04',
    heading: 'SCALE',
    body: 'Post-launch we tune, optimise, and grow. The relationship doesn\'t end at delivery.',
  },
];

const MARQUEE_ITEMS = [
  'DEVELOPMENT', 'MARKETING', 'PRODUCTION', 'CONSULTING',
  'STRATEGY', 'EXECUTION', 'CLARITY', 'MOMENTUM',
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function HomePage() {
// Hero section refs
const heroHeadRef = useRef(null);
const heroSubRef = useRef(null);
const heroBgRef = useRef(null);
    // Scroll indicator ref
    const scrollIndicatorRef = useRef(null);
// Store background tween for pause/resume
const heroBgTween = useRef(null);
const statsRef = useRef(null);
const servicesRef = useRef(null);
const servicesCardsRef = useRef(null);
const processRef = useRef(null);
const missionRef = useRef(null);
const ctaRef = useRef(null);

  // ── Animate hero on mount ─────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      heroHeadRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1 }
    ).fromTo(
      heroSubRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    );
  }, []);

  // ── ScrollTrigger animations ──────────────────────────────────────────────
  useEffect(() => {
    // Cinematic scroll-based background image deep zoom & scale
    const bg = heroBgRef.current;
    if (bg) {
      // Smooth fade-in on mount — start very slightly zoomed in
      gsap.set(bg, { scale: 1.05 });
      gsap.to(bg, { opacity: 0.35, duration: 1.2, ease: 'power2.out' });

      // Cinematic slow zoom that lasts the ENTIRE page scroll — ends just above footer
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom', // runs all the way to the very last pixel of the page
        scrub: 2,             // heavier scrub = slower, more cinematic feel
        animation: gsap.fromTo(
          bg,
          { scale: 1.05, yPercent: 0 },
          { scale: 1.35, yPercent: 12, ease: 'none' } // subtle total zoom & gentle parallax
        ),
      });

      // Store custom pause/resume controller to disable/enable CSS blobs during pinned sections
      heroBgTween.current = {
        pause: () => {
          document.body.classList.add('paused-blobs');
        },
        resume: () => {
          document.body.classList.remove('paused-blobs');
        },
      };
    }

    // Mission statement
    const missionLines = missionRef.current?.querySelectorAll('.mission-line');
    if (missionLines?.length) {
      gsap.fromTo(
        missionLines,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: missionRef.current, start: 'top 75%' },
        }
      );
    }

    // Stats — counter animation
    const statEls = statsRef.current?.querySelectorAll('.stat-number');
    statEls?.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(
            { val: 0 },
            { val: target, duration: 1.6, ease: 'power2.out',
              onUpdate: function () { el.textContent = Math.round(this.targets()[0].val); }
            }
          );
        },
      });
    });

    // Stat blocks fade-in
    const statBlocks = statsRef.current?.querySelectorAll('.stat-block');
    if (statBlocks?.length) {
      gsap.fromTo(
        statBlocks,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 75%' },
        }
      );
    }

    // Service cards - stacked overlay reveal animation with pinning
    if (servicesRef.current && servicesCardsRef.current) {
      const cards = servicesCardsRef.current.querySelectorAll('.service-card');
      if (cards?.length) {
        // Set GSAP center translations and initial states
        gsap.set(cards, { xPercent: -50, yPercent: -50, left: '50%', top: '50%' });
        
        // Card 1 starts slightly faded and scaled down, then reveals immediately as we enter the pinned section
        gsap.set(cards[0], { autoAlpha: 0, y: 0, scale: 0.9 });
        
        // Cards 2, 3, 4 are initially below the viewport (y: '100vh')
        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], { autoAlpha: 1, y: '100vh', scale: 1 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            markers: false,
            onEnter: () => {
              if (heroBgTween.current) heroBgTween.current.pause();
              document.body.classList.add('paused-blobs');
            },
            onLeave: () => {
              if (heroBgTween.current) heroBgTween.current.resume();
              document.body.classList.remove('paused-blobs');
            },
            onEnterBack: () => {
              if (heroBgTween.current) heroBgTween.current.pause();
              document.body.classList.add('paused-blobs');
            },
            onLeaveBack: () => {
              if (heroBgTween.current) heroBgTween.current.resume();
              document.body.classList.remove('paused-blobs');
            },
          },
        });

        // 1. Reveal Card 1
        tl.to(cards[0], { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power1.out' });
        tl.to({}, { duration: 0.3 }); // brief pause

        // 2. Stack cards 2, 3, and 4
        cards.forEach((card, index) => {
          if (index === 0) return;
          
          // Scale down and fade all previous cards in the stack to create beautiful 3D layered depth
          for (let j = 0; j < index; j++) {
            tl.to(
              cards[j],
              {
                scale: 0.94 - (index - j) * 0.04,
                y: -30 * (index - j),
                autoAlpha: 0.6 / (index - j), // fade more for deeper cards
                duration: 1,
                ease: 'power1.inOut',
              },
              `card-${index}`
            );
          }

          // Slide current card up from below the viewport to center
          tl.fromTo(
            card,
            { y: '100vh' },
            {
              y: 0,
              duration: 1,
              ease: 'power1.inOut',
            },
            `card-${index}`
          );

          // Add a pause to keep card visible before next card slide
          tl.to({}, { duration: 0.5 });
        });
      }
    }


    // Process steps — individual scroll-scrubbed right-to-left reveal
    const steps = processRef.current?.querySelectorAll('.process-step');
    if (steps?.length) {
      // Set all steps initially off-screen to the right & invisible
      gsap.set(steps, { x: 120, opacity: 0, clipPath: 'inset(0 0% 0 0)' });

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.8,
          animation: gsap.fromTo(
            step,
            { x: 120, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
            { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', ease: 'power2.out' }
          ),
        });
      });
    }

    // CTA
    gsap.fromTo(
      ctaRef.current,
      { scale: 0.97, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ 
      background: 'var(--bg)',
      position: 'relative',
    }}>

      {/* ── Full page cinematic scroll-based background image ── */}
      <div
        ref={heroBgRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `
            linear-gradient(135deg, rgba(200, 241, 53, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%),
            url('/generate_it_according_landscape_202606100851.jpeg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          opacity: 0, // smoothly faded in via GSAP
          pointerEvents: 'none',
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      />

      {/* ── Content wrapper with proper z-index ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '640px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 40px 72px',
          overflow: 'hidden',
        }}
      >
        {/* Abstract blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        {/* Subtle grid */}
        <div className="hero-grid" />

        {/* ── Hero content ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SectionLabel index="001" label="DIGITAL AGENCY" />

          <h1
            ref={heroHeadRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 10vw, 136px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: '20px 0 0',
              color: 'var(--fg)',
            }}
          >
            WE BUILD<br />
            DIGITAL<br />
            <span style={{ color: 'var(--accent)' }}>ENGINES.</span>
          </h1>

          <div
            ref={heroSubRef}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: '48px',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                letterSpacing: '0.1em',
                color: 'var(--fg)',
                margin: 0,
                maxWidth: '340px',
                lineHeight: 1.9,
              }}
            >
              Development · Marketing · Production · Consulting
              <br />
              Systems that move fast. Thinking that stays sharp.
            </p>

            <Link
              to="/consult"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                background: 'var(--accent)',
                padding: '14px 28px',
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              START A PROJECT
              <span style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: 'var(--fg)',
              writingMode: 'vertical-rl',
            }}
          >
            SCROLL
          </span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <Marquee items={MARQUEE_ITEMS} speed={35} />
      <Marquee items={[...MARQUEE_ITEMS].reverse()} speed={28} />

      {/* ── MISSION STATEMENT ────────────────────────────────────────────── */}
      <section
        ref={missionRef}
        data-section="about"
        style={{
          padding: 'clamp(80px, 10vw, 140px) 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div>
          <SectionLabel index="001" label="ABOUT" />
          <div style={{ marginTop: '28px' }}>
            {[
              'MOST AGENCIES',
              'SELL YOU A TEAM.',
              'WE BUILD YOU',
              <><span style={{ color: 'var(--accent)' }}>A MACHINE.</span></>,
            ].map((line, i) => (
              <div
                key={i}
                className="mission-line"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 60px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  lineHeight: 1.0,
                  color: 'var(--fg)',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="mission-line">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--fg)',
              margin: '0 0 32px',
            }}
          >
            Thrust & Logic is a full-service digital agency that operates without the fat.
            No account managers buffering between you and the people doing the work. No
            opaque timelines. Just senior talent, clear thinking, and results you can measure.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--fg)',
              margin: 0,
            }}
          >
            We operate across development, marketing, production, and consulting — often all
            four simultaneously — for brands that can't afford to move slowly.
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        data-section="stats"
        style={{
          padding: 'clamp(80px, 10vw, 120px) 40px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <SectionLabel index="002" label="NUMBERS" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            marginTop: '48px',
          }}
        >
          {STATS.map(({ value, suffix, label }) => (
            <div
              key={label}
              className="stat-block"
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '28px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 5vw, 80px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: 'var(--fg)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                }}
              >
                <span
                  className="stat-number"
                  data-target={value}
                  style={{ display: 'inline-block', minWidth: '2ch' }}
                >
                  0
                </span>
                <span style={{ color: 'var(--accent)' }}>{suffix}</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'var(--fg)',
                  marginTop: '12px',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section
        ref={servicesRef}
        data-section="services"
        style={{
          padding: '40px',
          borderBottom: '1px solid var(--border)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <SectionLabel index="003" label="SERVICES" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: '16px 0 0',
                lineHeight: 0.95,
                color: 'var(--fg)',
              }}
            >
              WHAT WE<br />
              <span style={{ color: 'var(--accent)' }}>DO BEST.</span>
            </h2>
          </div>
          <Link
            to="/consult"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: '2px',
            }}
          >
            VIEW ALL →
          </Link>
        </div>

        <div
          style={{
            position: 'relative',
            height: '65vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
            width: '100%',
          }}
        >
          <div
            ref={servicesCardsRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              overflow: 'visible',
            }}
          >
            {SERVICES.map(({ index, title, to, description, tags, color, accentLine }, cardIndex) => (
              <Link
              key={index}
              to={to}
              className="service-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                background: color,
                border: `1px solid ${accentLine}`,
                padding: '40px',
                textDecoration: 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                overflow: 'hidden',
                width: 'min(420px, 32vw)',
                aspectRatio: '1 / 1',
                cursor: 'pointer',
                opacity: 0,
                willChange: 'transform, opacity',
                zIndex: 10 + cardIndex,
                boxShadow: '0 40px 120px rgba(0,0,0,0.18)',
                borderRadius: '32px',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 40px 120px rgba(0,0,0,0.35)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 40px 120px rgba(0,0,0,0.18)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '40px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: accentLine,
                    opacity: 0.7,
                  }}
                >
                  /{index}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    color: 'var(--fg)',
                    opacity: 0.2,
                    transition: 'opacity 0.3s, transform 0.3s',
                  }}
                >
                  ↗
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--fg)',
                  margin: '0 0 20px',
                  lineHeight: 1,
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--fg)',
                  opacity: 0.5,
                  margin: '0 0 32px',
                  maxWidth: '380px',
                }}
              >
                {description}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--fg)',
                      opacity: 0.4,
                      border: '1px solid var(--border)',
                      padding: '4px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section
        ref={processRef}
        data-section="process"
        style={{
          padding: 'clamp(80px, 10vw, 120px) 40px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <div>
            <SectionLabel index="004" label="PROCESS" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: '20px 0 0',
                lineHeight: 0.95,
                color: 'var(--fg)',
              }}
            >
              HOW WE
              <br />
              <span style={{ color: 'var(--accent)' }}>OPERATE.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PROCESS.map(({ step, heading, body }, i) => (
              <div
                key={step}
                className="process-step"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '24px',
                  padding: '32px 0',
                  borderBottom: i < PROCESS.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    color: 'var(--accent)',
                    paddingTop: '4px',
                  }}
                >
                  {step}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      textTransform: 'uppercase',
                      color: 'var(--fg)',
                      marginBottom: '10px',
                    }}
                  >
                    {heading}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '15px',
                      lineHeight: 1.75,
                      color: 'var(--fg)',
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        style={{
          margin: 'clamp(60px, 8vw, 100px) 40px',
          background: 'var(--muted)',
          border: '1px solid var(--border)',
          padding: 'clamp(60px, 8vw, 100px) 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent blob behind CTA */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.06,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <SectionLabel index="005" label="START" />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '16px 0 0',
              lineHeight: 0.92,
              color: 'var(--fg)',
            }}
          >
            READY TO<br />
            <span style={{ color: 'var(--accent)' }}>BUILD?</span>
          </h2>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '320px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--fg)',
              margin: 0,
            }}
          >
            Tell us what you're working on. We'll tell you if we're the right fit — honestly.
          </p>
          <Link
            to="/consult"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              alignSelf: 'flex-start',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '16px 32px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            LET'S TALK →
          </Link>
        </div>
      </section>

      </div>
    </div>
  );
}
