import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '../data/caseStudies';
import './HomePage.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── CRAFT CARDS ─── */
const CRAFT = [
  {
    num: '01',
    tag: 'DEVELOPMENT & SYSTEMS',
    desc: 'Digital products, platforms, and infrastructure designed to move at the speed of your ambition. Clean, hand-written architecture engineered for raw speed, deep security, and zero technical debt.',
    link: '/development',
    cta: 'EXPLORE DEVELOPMENT',
    visual: 'code',
  },
  {
    num: '02',
    tag: 'CINEMATIC PRODUCTION',
    desc: 'We shoot real glass and direct real stories. High-bitrate, intentional cinema engineered to make your brand look like the category leader overnight.',
    link: '/production',
    cta: 'EXPLORE PRODUCTION',
    visual: 'film',
  },
  {
    num: '03',
    tag: 'PERFORMANCE MARKETING',
    desc: 'Great work dies in the dark without distribution. We build brutal, data-backed funnels that turn raw attention into compounding revenue.',
    link: '/marketing',
    cta: 'EXPLORE MARKETING',
    visual: 'graph',
  },
];

/* ─── CAPABILITY MATRIX ─── */
const MATRIX = [
  {
    col: 'CODE & ARCHITECTURE',
    items: [
      'Custom SaaS & Web Applications',
      'AI Pipelines & Workflow Automation',
      'Mobile App Development',
      'High-Performance UI/UX Engineering',
    ],
  },
  {
    col: 'MEDIA & PRODUCTION',
    items: [
      '3D Product & Tech Explainers',
      'High-Bitrate Commercial Cinematography',
      'Brand Identity & Motion Graphics',
      'End-to-End Pre & Post-Production',
    ],
  },
  {
    col: 'GROWTH & PERFORMANCE',
    items: [
      'Multi-Channel Performance Marketing',
      'Full-Funnel SEO & Search Architecture',
      'Organic Growth Strategy',
      'B2B & D2C Revenue Scale Strategy',
    ],
  },
];

/* ─── PROOF TESTIMONIAL ─── */
const PROOF_TESTIMONIALS = [
  {
    quote: 'The results were much better than anything we had tried before. The team felt like our own in-house team — they just got it.',
    author: 'Gurnam Saini — Founder, Ayurveda Organics',
  },
  {
    ...CASE_STUDIES.find((caseStudy) => caseStudy.id === 'property-masters').testimonial,
  },
];

const PROOF_CLIENT_LOGOS = [
  { name: 'Ayurveda Organics', src: '/icons/ayurveda%20organics.png' },
  { name: 'Property Masters', src: '/icons/property%20masters.png' },
  { name: 'Easy Life Home Care', src: '/icons/ELHC.png' },
  { name: 'HopUp', src: '/icons/image.png' },
];

/* ─── VISUAL COMPONENT ─── */
function CraftVisual({ type }) {
  if (type === 'code') return (
    <div className="craft-visual code-visual" aria-hidden="true">
      <div className="code-top"><i /><i /><i /><b>system.config</b></div>
      <div className="code-lines">
        <span>const velocity = <b>scale</b>;</span>
        <span>build(<em>ambition</em>);</span>
        <span className="short">deploy / production</span>
      </div>
      <div className="component-orbit"><i /><i /><i /></div>
    </div>
  );
  if (type === 'film') return (
    <div className="craft-visual film-visual" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="metadata">
        <source src="/Thrust_and_logic_animating_colors_202607250556.mp4" type="video/mp4" />
      </video>
      <div className="film-shade" />
      <small>BRAND REEL · 00:10</small>
    </div>
  );
  return (
    <div className="craft-visual graph-visual" aria-hidden="true">
      <div className="metric">
        <span>AVERAGE ROI</span>
        <strong>+142%</strong>
        <small>vs. prior period <b>↑ 38.4%</b></small>
      </div>
      <svg viewBox="0 0 330 130" preserveAspectRatio="none">
        <path d="M0 116 C31 112 43 104 64 107 S96 89 120 92 S151 80 171 83 S199 43 224 54 S256 45 277 24 S308 32 330 4" />
        <path className="area" d="M0 116 C31 112 43 104 64 107 S96 89 120 92 S151 80 171 83 S199 43 224 54 S256 45 277 24 S308 32 330 4 V130 H0Z" />
      </svg>
      <div className="graph-labels"><span>MON</span><span>WED</span><span>FRI</span><span>SUN</span></div>
    </div>
  );
}

export default function HomePage() {
  const heroRef     = useRef(null);
  const craftRef    = useRef(null);
  const matrixRef   = useRef(null);
  const ecoRef      = useRef(null);
  const proofRef    = useRef(null);
  const ctaRef      = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {

      /* Hero entrance */
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.h-in') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power3.out', delay: 0.1 }
      );

      /* Hold the hero as its layers drift apart during the first scroll. */
      const desktopMotion = gsap.matchMedia();
      desktopMotion.add('(min-width: 961px)', () => {
        const heroScroll = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        heroScroll
          .to(heroRef.current?.querySelector('.hero-copy'), {
            yPercent: -18,
            scale: 0.94,
            autoAlpha: 0.4,
            ease: 'none',
          }, 0)
          .to(heroRef.current?.querySelector('.grid-field'), {
            scale: 1.18,
            rotation: 5,
            opacity: 0.8,
            ease: 'none',
          }, 0)
          .to(heroRef.current?.querySelector('.hero-orbit'), {
            scale: 1.25,
            rotation: 28,
            autoAlpha: 0,
            ease: 'none',
          }, 0)
          .to(heroRef.current?.querySelector('.hero-baseline'), {
            y: 16,
            autoAlpha: 0,
            ease: 'none',
          }, 0);
      });

      /* Craft cards */
      gsap.fromTo(
        craftRef.current?.querySelectorAll('.craft-card') ?? [],
        { y: 72, scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1, stagger: 0.16, ease: 'power3.out',
          scrollTrigger: { trigger: craftRef.current, start: 'top 78%' } }
      );

      gsap.fromTo(
        craftRef.current?.querySelectorAll('.section-intro-new > *') ?? [],
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: craftRef.current, start: 'top 78%' } }
      );

      /* Matrix rows */
      gsap.fromTo(
        matrixRef.current?.querySelectorAll('.matrix-col') ?? [],
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: matrixRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(
        matrixRef.current?.querySelectorAll('.section-intro-new > *') ?? [],
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: matrixRef.current, start: 'top 80%' } }
      );

      /* Eco section */
      gsap.fromTo(
        ecoRef.current?.querySelectorAll('.eco-item') ?? [],
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ecoRef.current, start: 'top 78%' } }
      );

      /* Proof section */
      gsap.fromTo(
        proofRef.current?.querySelectorAll('.proof-item') ?? [],
        { y: 54, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: proofRef.current, start: 'top 80%' } }
      );

      /* CTA */
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="refined-home">

      {/* ══════════ HERO ══════════════════════════════════════════════ */}
      <section className="refined-hero" ref={heroRef}>
        <div className="hero-ambient" aria-hidden="true" />
        <div className="grid-field" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">

            <p className="overline h-in">
              <i />
              THRUST &amp; LOGIC <span>|</span> INTEGRATED AGENCY
            </p>

            <h1 className="h-in">
              <span className="code-word">CODE.</span><br />
              CONTENT.<br />
              <em>GROWTH.</em>
            </h1>

            <p className="hero-description h-in">
              Most agencies outsource. We don't. We combine craftsman-level engineering,
              studio-grade production, and surgical growth strategy under one roof.
              No middlemen. No guesswork.
            </p>

            <Link to="/consult" className="accent-button h-in">
              TALK TO THE BUILDERS <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="hero-baseline h-in">
          <span>NO JUNIORS • NO OUTSOURCING • DIRECT EXECUTION</span>
          <span>SCROLL TO SEE HOW WE THINK ↓</span>
        </div>
      </section>

      {/* ══════════ 01 / OUR CRAFT ════════════════════════════════════ */}
      <section className="craft-section section-shell" ref={craftRef}>
        <div className="section-intro-new">
          <p className="overline"><i /> 01 / OUR CRAFT</p>
          <h2>Three disciplines.<br /><em>Zero hand-offs.</em></h2>
          <p>
            We don't hire account managers to pass messages down a chain. You work directly
            with the people writing the code, directing the cameras, and scaling the ads.
          </p>
        </div>

        <div className="craft-grid">
          {CRAFT.map((c) => (
            <article className="craft-card" key={c.num}>
              <div className="craft-num">{c.num}</div>
              <CraftVisual type={c.visual} />
              <div className="craft-body">
                <p className="craft-tag">{c.tag}</p>
                <p className="craft-desc">{c.desc}</p>
                <Link to={c.link} className="craft-link">
                  {c.cta} <span>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 02 / FULL CAPABILITY MATRIX ══════════════════════ */}
      <section className="matrix-section section-shell" ref={matrixRef}>
        <div className="section-intro-new">
          <p className="overline"><i /> 02 / THE DELIVERABLES</p>
          <h2>Full Capability<br /><em>Matrix.</em></h2>
          <p>
            The complete technical, creative, and growth infrastructure we build under one roof.
          </p>
        </div>

        <div className="matrix-grid">
          {MATRIX.map((col) => (
            <div className="matrix-col" key={col.col}>
              <div className="matrix-col-head">{col.col}</div>
              <ul className="matrix-list">
                {col.items.map((item) => (
                  <li key={item}>
                    <span className="matrix-bullet">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 03 / THE UNIFIED ECOSYSTEM ═══════════════════════ */}
      <section className="ecosystem section-shell" ref={ecoRef}>
        <p className="overline eco-item"><i /> 03 / THE UNIFIED ECOSYSTEM</p>

        <div className="ecosystem-grid">
          <h2 className="eco-item">
            The traditional agency<br />model is broken.<br />
            <em>Here is how we fixed it.</em>
          </h2>

          <div className="ecosystem-copy eco-item">
            <p className="pull-quote">
              "Dev shops build tech that nobody buys. Creative agencies shoot films that don't convert. Marketing agencies run ads to broken websites."
            </p>
            <p>
              When you split your brand between three different vendors, you spend more time managing
              friction than growing your business. We built Thrust &amp; Logic as a single,
              senior-led engine where software, cinema, and growth strategy sit at the exact same table.
            </p>
            <div className="discipline-list eco-item">
              <span>LOGIC IN CODE</span>
              <span>AUTHORITY IN MEDIA</span>
              <span>PRECISION IN GROWTH</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 03.5 / PROOF OF WORK ════════════════════════════ */}
      <section className="proof-section section-shell" ref={proofRef}>
        <p className="overline proof-item"><i /> PROOF OF WORK</p>

        <div className="proof-logo-marquee proof-item" aria-label="Client logos">
          <div className="proof-logo-track">
            {[0, 1].map((group) => (
              <div
                className="proof-logo-group"
                key={group}
                aria-hidden={group === 1}
                role={group === 0 ? 'list' : undefined}
                aria-label={group === 0 ? 'Client logos' : undefined}
              >
                {PROOF_CLIENT_LOGOS.map((brand) => (
                  <div
                    key={brand.name}
                    className="proof-logo-card"
                    role={group === 0 ? 'listitem' : undefined}
                  >
                    <img src={brand.src} alt={group === 0 ? `${brand.name} logo` : ''} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="proof-testimonial proof-item">
          <p className="proof-testimonial-label">WHAT OUR CLIENTS SAY</p>
          {PROOF_TESTIMONIALS.map((testimonial) => (
            <div className="proof-review" key={testimonial.author}>
              <blockquote className="proof-quote">
                “{testimonial.quote}”
              </blockquote>
              <cite className="proof-cite">{testimonial.author}</cite>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 04 / OPEN A CHANNEL ══════════════════════════════ */}
      <section className="conversion section-shell" ref={ctaRef}>
        <div className="conversion-card">
          <div className="conversion-glow" aria-hidden="true" />
          <p className="overline"><i /> 04 / OPEN A CHANNEL</p>
          <h2>No sales reps. No pitch decks.<br /><em>Just a direct line.</em></h2>
          <p>
            Tell us what you're building, shooting, or scaling. You'll get an honest,
            grounded breakdown of how we'd tackle it — straight from the people who will
            actually do the work.
          </p>
          <Link to="/consult" className="accent-button">
            START A DIRECT CONVERSATION <span>↗</span>
          </Link>
          <span className="corner-note">THRUST &amp; LOGIC / 2026</span>
        </div>
      </section>

    </main>
  );
}
