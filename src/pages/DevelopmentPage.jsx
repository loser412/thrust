import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PremiumCaseCard from '../components/PremiumCaseCard';
import CASE_STUDIES from '../data/caseStudies';

gsap.registerPlugin(ScrollTrigger);

/* ─── Design tokens ─────────────────────────────────────── */
const T = {
  bg:      '#04060A',
  panel:   '#080C14',
  card:    '#0D1321',
  border:  '#1A2535',
  accent:  '#00D4FF',
  cyan:    '#22D3EE',
  purple:  '#A855F7',
  rose:    '#FB7185',
  amber:   '#F59E0B',
  green:   '#34D399',
  dim:     '#475569',
  muted:   '#64748B',
  body:    '#94A3B8',
  fg:      '#E2E8F0',
  white:   '#F8FAFC',
};

/* ─── Services ───────────────────────────────────────────── */
const SERVICES = [
  {
    id: '01', title: 'Software Platforms', tag: 'WEBSITE & SOFTWARE', color: T.accent,
    desc: 'We build custom software systems with customer logins, secure database storage, subscription billing, and visual data reports.',
    stack: ['Next.js', 'PostgreSQL', 'Stripe', 'Auth.js'],
    stat: { label: 'Time to launch', value: '8 wks' },
  },
  {
    id: '02', title: 'Smart AI Tools', tag: 'INTELLIGENCE', color: T.cyan,
    desc: 'We integrate smart AI tools into your business. This includes helpful chatbots that read your files, and tools that automate tasks.',
    stack: ['OpenAI', 'LangChain', 'Pinecone', 'Python'],
    stat: { label: 'Response speed', value: '< 800ms' },
  },
  {
    id: '03', title: 'Custom Mobile Apps', tag: 'PRODUCT', color: T.purple,
    desc: 'We build beautiful websites and phone apps (for iPhone and Android) that load instantly and look great on any screen.',
    stack: ['React', 'React Native', 'TypeScript', 'Expo'],
    stat: { label: 'App speed score', value: '100%' },
  },
  {
    id: '04', title: 'App Design & Layout', tag: 'INTERFACE', color: T.rose,
    desc: 'We design easy-to-use screens and smooth animations so your customers can navigate your app without needing help.',
    stack: ['Figma', 'GSAP', 'Framer Motion', 'Radix UI'],
    stat: { label: 'Visual elements', value: '200+' },
  },
  {
    id: '05', title: 'Time-Saving Automations', tag: 'AUTOMATION', color: T.amber,
    desc: 'We connect your tools together so they share data automatically. We automate document filing, client updates, and data entry.',
    stack: ['n8n', 'Make', 'Zapier', 'Python'],
    stat: { label: 'Hours saved / mo', value: '300+' },
  },
];

/* ─── Tech ticker ────────────────────────────────────────── */
const TICKER = [
  'NEXT.JS', 'REACT NATIVE', 'POSTGRESQL', 'OPENAI API', 'LANGCHAIN',
  'PINECONE', 'STRIPE', 'AWS', 'DOCKER', 'TYPESCRIPT', 'GRAPHQL',
  'SUPABASE', 'REDIS', 'TERRAFORM', 'FIGMA', 'GSAP', 'FRAMER',
];

/* ─── Typewriter code ────────────────────────────────────── */
const HERO_CODE =
`> thrust.init({
    services: ["software", "ai-tools", "apps", "design", "automation"],
    engineers: "senior-only",
    techDebt: false,
    delivery: "production-ready",
  });

✓ Ready to build.`;

/* ─── Process ────────────────────────────────────────────── */
const PROCESS = [
  { num: '01', title: 'Planning',    desc: 'We talk about your goals, map out how your app will work, and plan the tech steps together.' },
  { num: '02', title: 'Blueprint',   desc: 'We map out the database and system structure so we have a clear plan before we write any code.' },
  { num: '03', title: 'Building',    desc: 'We build in two-week cycles and show you live updates regularly so you see your app coming to life.' },
  { num: '04', title: 'Launch',      desc: 'We publish your application live to the public safely, making sure it runs securely and without downtime.' },
  { num: '05', title: 'Support',     desc: 'We monitor your app, add new features as you grow, and keep the server fast as more users join.' },
];

/* ════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════ */
export default function DevelopmentPage() {

  /* refs */
  const heroBgRef     = useRef(null);
  const heroOverRef   = useRef(null);
  const heroTextRef   = useRef(null);
  const tickerRef     = useRef(null);
  const svcRef        = useRef(null);
  const procRef       = useRef(null);
  const workRef       = useRef(null);
  const ctaRef        = useRef(null);

  /* typewriter */
  const [typed,    setTyped]    = useState('');
  const [blink,    setBlink]    = useState(true);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { setTyped(HERO_CODE.slice(0, i++)); if (i > HERO_CODE.length) clearInterval(iv); }, 20);
    const bl = setInterval(() => setBlink(b => !b), 530);
    return () => { clearInterval(iv); clearInterval(bl); };
  }, []);

  /* GSAP */
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {

      /* ── HERO PARALLAX ─ bg image moves up slower than scroll */
      gsap.to(heroBgRef.current, {
        y: '28%',
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: heroBgRef.current.parentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      /* ── HERO OVERLAY – deepens as you scroll away */
      gsap.to(heroOverRef.current, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroBgRef.current.parentElement,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      });

      /* ── HERO TEXT – rise & fade out on scroll */
      gsap.to(heroTextRef.current, {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroBgRef.current.parentElement,
          start: '20% top',
          end: '70% top',
          scrub: 1.2,
        },
      });

      /* ── HERO TEXT entrance (first load) */
      gsap.fromTo(
        heroTextRef.current?.querySelectorAll('.h-in') ?? [],
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.13, ease: 'power3.out', delay: 0.15 },
      );

      /* ── TICKER */
      if (tickerRef.current) {
        gsap.to(tickerRef.current, { x: '-50%', duration: 22, ease: 'none', repeat: -1 });
      }

      /* ── SERVICES header */
      gsap.fromTo(
        svcRef.current?.querySelectorAll('.svc-hd') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: svcRef.current, start: 'top 80%' } },
      );

      /* ── SERVICE rows – clip-path reveal */
      svcRef.current?.querySelectorAll('.svc-row').forEach((row, i) => {
        gsap.fromTo(row,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' } },
        );
      });

      /* ── PROCESS line scrub */
      gsap.fromTo(
        procRef.current?.querySelector('.proc-line-fill'),
        { scaleX: 0 },
        { scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: procRef.current, start: 'top 65%', end: 'bottom 65%', scrub: 2 } },
      );

      /* ── PROCESS cards */
      gsap.fromTo(
        procRef.current?.querySelectorAll('.proc-card') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: procRef.current, start: 'top 72%' } },
      );

      /* ── WORK cards */
      gsap.fromTo(
        workRef.current?.querySelectorAll('.wk-card') ?? [],
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: workRef.current, start: 'top 75%' } },
      );

      /* ── CTA */
      gsap.fromTo(ctaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } },
      );

    });

    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────────────────────── */
  return (
    <div style={{
      background: T.bg,
      color: T.fg,
      overflowX: 'hidden',
      '--font-display': "'Space Grotesk', sans-serif",
      '--font-body': "'Space Grotesk', sans-serif",
      '--font-mono': "'Space Mono', monospace",
      fontFamily: 'var(--font-body)',
    }}>

      {/* subtle grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${T.border}44 1px,transparent 1px),linear-gradient(90deg,${T.border}44 1px,transparent 1px)`,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ══════════ CINEMATIC HERO ══════════════════════════ */}
        <section style={{
          position: 'relative',
          height: '100svh',
          minHeight: '700px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}>

          {/* ── Photo background (parallax target) */}
          <div
            ref={heroBgRef}
            style={{
              position: 'absolute',
              inset: '-20% 0',
              backgroundImage: 'url(/pexels-asim-razan-32997.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              willChange: 'transform',
            }}
          />

          {/* ── Cinematic dark overlay (gradient) */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(
              105deg,
              rgba(4,6,10,0.92) 0%,
              rgba(4,6,10,0.65) 55%,
              rgba(4,6,10,0.30) 100%
            )`,
          }} />

          {/* ── Scroll-deepening overlay (starts transparent) */}
          <div
            ref={heroOverRef}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(4,6,10,0.5)',
              opacity: 0,
              willChange: 'opacity',
            }}
          />

          {/* ── Scan-line texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
          }} />

          {/* ── Accent glow bottom-left corner */}
          <div style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: `radial-gradient(circle, ${T.accent}22 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* ── Hero content */}
          <div
            ref={heroTextRef}
            style={{
              position: 'relative', zIndex: 5,
              padding: 'clamp(120px,15vw,160px) clamp(24px,6vw,80px) 80px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* LEFT: headline */}
            <div>
              <div className="h-in" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '1px', background: T.accent }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '0.25em', textTransform: 'uppercase', color: T.accent, fontWeight: 700,
                }}>
                  DEVELOPMENT SERVICES
                </span>
              </div>

              <h1 className="h-in" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(60px, 8.5vw, 124px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 0.85,
                textTransform: 'uppercase',
                color: T.white,
                margin: '0 0 32px',
                textShadow: '0 4px 40px rgba(0,0,0,0.6)',
              }}>
                WE BUILD<br />
                PRODUCTS<br />
                <span style={{
                  color: T.accent,
                  textShadow: `0 0 60px ${T.accent}55`,
                }}>THAT SHIP.</span>
              </h1>

              <p className="h-in" style={{
                fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.8,
                color: 'rgba(226,232,240,0.78)', maxWidth: '480px', marginBottom: '44px',
              }}>
                Our senior engineers build clean websites, mobile apps, custom software, and time-saving automations. We make sure your code is fast, secure, and easy to maintain.
              </p>

              <div className="h-in" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/consult" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: T.bg, background: T.accent,
                  padding: '18px 38px', textDecoration: 'none', fontWeight: 700,
                  transition: 'opacity 0.2s, transform 0.2s', display: 'inline-block',
                  boxShadow: `0 0 32px ${T.accent}44`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  START A PROJECT →
                </Link>
                <a href="#work" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: T.fg,
                  border: `1px solid rgba(255,255,255,0.2)`, backdropFilter: 'blur(8px)',
                  padding: '18px 38px', textDecoration: 'none', fontWeight: 600,
                  transition: 'border-color 0.2s, color 0.2s', display: 'inline-block',
                  background: 'rgba(255,255,255,0.04)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = T.fg; }}
                >
                  VIEW WORK ↓
                </a>
              </div>
            </div>

            {/* RIGHT: Terminal */}
            <div className="h-in" style={{
              background: 'rgba(2,4,9,0.82)',
              border: `1px solid ${T.border}`,
              borderRadius: '6px',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 0 1px ${T.border}, 0 32px 80px rgba(0,0,0,0.7), 0 0 80px ${T.accent}08`,
            }}>
              {/* title bar */}
              <div style={{
                background: 'rgba(10,13,20,0.9)', borderBottom: `1px solid ${T.border}`,
                padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['#FF5F57','#FFBD2E','#28C840'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <span style={{ marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: T.muted }}>
                  thrust ~ /workspace/your-project
                </span>
              </div>

              {/* code */}
              <div style={{
                padding: '24px', minHeight: '260px',
                fontFamily: '"Fira Code","Cascadia Code",Consolas,monospace',
                fontSize: '12.5px', lineHeight: 1.7, color: T.green,
              }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  <span style={{ color: T.muted }}>{'// Initialising development stack\n'}</span>
                  {typed}
                  <span style={{
                    display: 'inline-block', width: '2px', height: '1em',
                    background: T.accent, verticalAlign: 'text-bottom',
                    opacity: blink ? 1 : 0, marginLeft: '1px', transition: 'opacity 0.1s',
                  }} />
                </pre>
              </div>

              {/* status bar */}
              <div style={{
                borderTop: `1px solid ${T.border}`, padding: '8px 20px',
                display: 'flex', gap: '20px', background: 'rgba(6,8,16,0.9)',
              }}>
                {[
                  { label: 'Branch', val: 'main',     color: T.accent },
                  { label: 'Status', val: '● Active',  color: T.green  },
                  { label: 'Node',   val: 'v22.3',     color: T.muted  },
                ].map(({ label, val, color }) => (
                  <span key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                    <span style={{ color: T.dim }}>{label}: </span>
                    <span style={{ color }}>{val}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            zIndex: 5, opacity: 0.55,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em', color: T.fg, textTransform: 'uppercase' }}>
              SCROLL
            </span>
            <div style={{ width: '1px', height: '48px', background: `linear-gradient(${T.accent}, transparent)` }} />
          </div>
        </section>

        {/* ══════════ TICKER ════════════════════════════════ */}
        <div style={{
          borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
          overflow: 'hidden', padding: '18px 0', background: T.panel,
        }}>
          <div ref={tickerRef} style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', width: 'max-content' }}>
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em',
                color: i % 3 === 0 ? T.accent : T.dim, textTransform: 'uppercase',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════ SERVICES ══════════════════════════════ */}
        <section
          ref={svcRef}
          style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderBottom: `1px solid ${T.border}` }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end', marginBottom: '72px' }}>
            <div>
              <div className="svc-hd" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '1px', background: T.accent }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.accent }}>
                  CORE CAPABILITIES
                </span>
              </div>
              <h2 className="svc-hd" style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.5vw,76px)',
                fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
                lineHeight: 0.88, color: T.white, margin: 0,
              }}>
                WHAT WE<br /><span style={{ color: T.accent }}>BUILD.</span>
              </h2>
            </div>
            <p className="svc-hd" style={{
              fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8,
              color: T.body, maxWidth: '480px', alignSelf: 'end',
            }}>
              Five clear software services, each designed to build clean, fast applications that help your business succeed.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="svc-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '40px',
                  alignItems: 'start',
                  padding: '36px 16px',
                  borderTop: `1px solid ${T.border}`,
                  cursor: 'default',
                  transition: 'background 0.3s, padding 0.3s',
                  borderRadius: '2px',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${s.color}09`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: s.color, fontWeight: 700, display: 'block', marginBottom: '6px' }}>{s.id}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', color: s.color, textTransform: 'uppercase', opacity: 0.65 }}>{s.tag}</span>
                </div>

                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.8vw,40px)',
                    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em',
                    color: T.white, margin: '0 0 12px', lineHeight: 1.05,
                  }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: T.body, maxWidth: '640px', margin: '0 0 18px' }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {s.stack.map(t => (
                      <span key={t} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em',
                        color: s.color, textTransform: 'uppercase',
                        background: `${s.color}10`, border: `1px solid ${s.color}30`,
                        padding: '4px 10px', borderRadius: '2px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '34px', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.stat.value}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', color: T.muted, marginTop: '6px', textTransform: 'uppercase' }}>{s.stat.label}</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${T.border}` }} />
          </div>
        </section>

        {/* ══════════ CINEMATIC FULL-BLEED IMAGE BREAK ════════ */}
        <div style={{
          position: 'relative', height: 'clamp(340px,40vw,520px)', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: '-30% 0',
            backgroundImage: 'url(/pexels-asim-razan-32997.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            filter: 'brightness(0.28) saturate(0.6)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(${T.bg}, transparent 30%, transparent 70%, ${T.bg})`,
          }} />
          {/* center quote */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
          }}>
            <div style={{ width: '1px', height: '50px', background: `linear-gradient(transparent, ${T.accent})` }} />
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,46px)',
              color: T.white, letterSpacing: '-0.02em', fontWeight: 600,
              textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2,
              margin: 0, maxWidth: '700px', padding: '0 24px',
            }}>
              "CODE THAT RUNS IN PRODUCTION<br />
              <span style={{ color: T.accent }}>IS THE ONLY KIND THAT MATTERS."</span>
            </p>
            <div style={{ width: '1px', height: '50px', background: `linear-gradient(${T.accent}, transparent)` }} />
          </div>
        </div>

        {/* ══════════ PROCESS ═══════════════════════════════ */}
        <section
          ref={procRef}
          style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderBottom: `1px solid ${T.border}`, background: T.panel }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: T.accent }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.accent }}>HOW WE WORK</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.5vw,76px)',
            fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
            lineHeight: 0.88, color: T.white, margin: '0 0 64px',
          }}>
            THE BUILD<br /><span style={{ color: T.accent }}>SEQUENCE.</span>
          </h2>

          {/* Scrub-animated line */}
          <div style={{ height: '1px', background: T.border, marginBottom: '48px', position: 'relative' }}>
            <div className="proc-line-fill" style={{
              position: 'absolute', top: 0, left: 0, height: '1px', width: '100%',
              background: `linear-gradient(90deg,${T.accent},${T.cyan})`,
              transformOrigin: 'left center',
            }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '28px' }}>
            {PROCESS.map(step => (
              <div
                key={step.num}
                className="proc-card"
                style={{
                  background: T.card, border: `1px solid ${T.border}`,
                  padding: '28px 22px', borderRadius: '2px',
                  display: 'flex', flexDirection: 'column', gap: '14px',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow = `0 0 32px ${T.accent}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: T.accent, fontWeight: 700 }}>{step.num}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, textTransform: 'uppercase', color: T.white, margin: 0, letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.75, color: T.body, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ WORK ══════════════════════════════════ */}
        <section
          id="work"
          ref={workRef}
          style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderBottom: `1px solid ${T.border}` }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '1px', background: T.accent }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.accent }}>CASE STUDIES</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.5vw,76px)',
                fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
                lineHeight: 0.88, color: T.white, margin: 0,
              }}>
                WHAT WE'VE<br /><span style={{ color: T.accent }}>BUILT.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: T.green, display: 'inline-block', boxShadow: `0 0 8px ${T.green}` }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: T.green, letterSpacing: '0.1em' }}>ALL PROJECTS: LIVE &amp; RUNNING</span>
            </div>
          </div>

          <div className="development-case-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px', justifyItems: 'center' }}>
            {CASE_STUDIES.map(p => (
              <div key={p.id} className="wk-card" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <PremiumCaseCard project={p} />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ CTA ═══════════════════════════════════ */}
        <section
          ref={ctaRef}
          style={{
            position: 'relative', overflow: 'hidden',
            padding: 'clamp(100px,12vw,160px) clamp(24px,6vw,80px)',
          }}
        >
          {/* faint bg image echo */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'url(/pexels-asim-razan-32997.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.12) saturate(0.4)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${T.bg} 0%, rgba(4,6,10,0.88) 100%)`, zIndex: 1 }} />

          <div style={{
            position: 'relative', zIndex: 2,
            display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px',
            alignItems: 'center', flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '1px', background: T.accent }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.accent }}>READY TO BUILD?</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,100px)',
                fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
                lineHeight: 0.88, color: T.white, margin: '0 0 28px',
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              }}>
                GOT A PRODUCT<br /><span style={{ color: T.accent }}>IN MIND?</span>
              </h2>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: T.muted, lineHeight: 2 }}>
                <span style={{ color: '#FB7185' }}>await </span>
                <span style={{ color: '#A855F7' }}>thrust</span>
                <span style={{ color: T.fg }}>.</span>
                <span style={{ color: '#22D3EE' }}>initialize</span>
                <span style={{ color: T.fg }}>({'{ '})</span>
                <span style={{ color: '#F59E0B' }}>project</span>
                <span style={{ color: T.fg }}>: </span>
                <span style={{ color: '#34D399' }}>"your-idea"</span>
                <span style={{ color: T.fg }}>{' });'}</span>
              </div>
            </div>

            <Link to="/consult" style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: T.bg, background: T.accent,
              padding: '22px 52px', textDecoration: 'none', fontWeight: 700,
              whiteSpace: 'nowrap', display: 'inline-block',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: `0 0 48px ${T.accent}44`,
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              START YOUR PROJECT →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

