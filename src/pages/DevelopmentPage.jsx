import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  bg:       '#0D1117',
  surface:  '#161B22',
  border:   '#30363D',
  keyword:  '#FF7B72',   // red  — function, const, return
  type:     '#79C0FF',   // blue — types, imports
  string:   '#A5D6FF',   // light-blue strings
  fn:       '#D2A8FF',   // purple — function names
  comment:  '#8B949E',   // gray comments
  num:      '#F2CC60',   // yellow numbers
  prop:     '#7EE787',   // green — props / vars
  fg:       '#E6EDF3',   // primary text
  accent:   '#C8F135',   // brand lime
  dim:      'rgba(230,237,243,0.4)',
};

// ── Data ──────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    index: '01',
    title: 'Frontend Engineering',
    code: `const UI = buildWith({
  framework: "React / Next.js",
  style: "performance-obsessed",
  a11y: true,
  ttfb: "< 200ms",
});`,
    desc: 'Interfaces that load instantly and feel native. Accessibility-first, performance-obsessed.',
    tags: ['React', 'Next.js', 'TypeScript', 'Vite'],
  },
  {
    index: '02',
    title: 'Backend & APIs',
    code: `async function handleScale() {
  const api = new Service({
    type: "REST | GraphQL",
    db: "PostgreSQL + Redis",
    infra: "serverless-ready",
  });
  return api.deploy(); // zero-downtime
}`,
    desc: 'Robust APIs and microservices built to handle real traffic from day one.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    index: '03',
    title: 'Headless Commerce',
    code: `// Conversion-engineered storefront
export const store = {
  platform: "Shopify Plus",
  frontend: "Custom Next.js",
  search: "Algolia",
  payments: "Stripe",
  speed: "< 1s load", // guaranteed
};`,
    desc: 'Shopify Plus and custom storefronts engineered for conversion and speed.',
    tags: ['Shopify', 'Commerce.js', 'Stripe', 'Algolia'],
  },
  {
    index: '04',
    title: 'Cloud & DevOps',
    code: `pipeline:
  trigger: on-push
  steps:
    - name: test
      run: npm test --coverage
    - name: build
      run: docker build .
    - name: deploy
      env: AWS_ECS # zero-downtime`,
    desc: 'CI/CD pipelines and containerised deployments that scale without drama.',
    tags: ['AWS', 'Docker', 'GitHub Actions', 'Terraform'],
  },
];

const STACK = [
  { name: 'React',        color: C.type   },
  { name: 'Next.js',      color: C.fg     },
  { name: 'TypeScript',   color: C.type   },
  { name: 'Node.js',      color: C.prop   },
  { name: 'PostgreSQL',   color: C.type   },
  { name: 'Redis',        color: C.keyword },
  { name: 'AWS',          color: C.num    },
  { name: 'Docker',       color: C.type   },
  { name: 'GraphQL',      color: C.fn     },
  { name: 'Shopify',      color: C.prop   },
  { name: 'Stripe',       color: C.fn     },
  { name: 'Terraform',    color: C.num    },
];

const WORK = [
  {
    index: '01',
    repo: 'nexus-commerce/storefront',
    branch: 'main',
    commit: 'a3f91bc',
    title: 'Headless Shopify Platform',
    client: 'NEXUS COMMERCE',
    desc: 'Rebuilt a legacy Shopify store into a fully headless Next.js storefront. Load time dropped from 6s to 0.9s.',
    tags: ['Next.js', 'Shopify Plus', 'Algolia', 'AWS'],
    metric: '+44% CVR',
    year: '2024',
    accent: C.accent,
  },
  {
    index: '02',
    repo: 'orbital-fintech/trading-ui',
    branch: 'production',
    commit: 'd8c203a',
    title: 'Real-time Trading Dashboard',
    client: 'ORBITAL FINTECH',
    desc: 'WebSocket-driven interface handling 10k+ live data points per second. Sub-100ms render cycles.',
    tags: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
    metric: '<100ms latency',
    year: '2024',
    accent: C.type,
  },
  {
    index: '03',
    repo: 'vault-health/patient-portal',
    branch: 'release/v2',
    commit: 'f1e77d9',
    title: 'Patient Portal & API Layer',
    client: 'VAULT HEALTH',
    desc: 'HIPAA-compliant patient portal with EHR integration, appointment scheduling, and secure REST API.',
    tags: ['TypeScript', 'GraphQL', 'Redis', 'Docker'],
    metric: '60k+ users',
    year: '2023',
    accent: C.fn,
  },
  {
    index: '04',
    repo: 'drift-studio/creator-platform',
    branch: 'main',
    commit: 'b29a415',
    title: 'Creator Monetisation Platform',
    client: 'DRIFT STUDIO',
    desc: 'Subscription and digital product platform for 200+ creators. Custom CMS, Stripe Connect, affiliate engine.',
    tags: ['Next.js', 'Stripe', 'Postgres', 'S3'],
    metric: '$2M+ processed',
    year: '2023',
    accent: C.num,
  },
];

// ── Mini syntax highlighter ───────────────────────────────────────────────────
function CodeBlock({ code, lang = 'js' }) {
  const lines = code.split('\n');
  return (
    <div style={{
      fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
      fontSize: '10px',
      lineHeight: 1.5,
      color: C.fg,
      padding: '12px',
      background: C.bg,
      border: `1px solid ${C.border}`,
      borderRadius: '6px',
      overflowX: 'auto',
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px' }}>
          <span style={{ color: C.comment, userSelect: 'none', minWidth: '16px', textAlign: 'right' }}>{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightLine(line, lang) }} />
        </div>
      ))}
    </div>
  );
}

function highlightLine(line, lang) {
  if (lang === 'yaml') {
    return line
      .replace(/^(\s*)([\w-]+)(:)/g, `$1<span style="color:${C.prop}">$2</span><span style="color:${C.fg}">$3</span>`)
      .replace(/#.+$/g, `<span style="color:${C.comment}">$&</span>`)
      .replace(/\bon-([\w-]+)\b/g, `<span style="color:${C.string}">on-$1</span>`);
  }
  // JS
  return line
    .replace(/\b(const|let|var|async|function|return|export|import|from|new|true|false|await)\b/g, `<span style="color:${C.keyword}">$1</span>`)
    .replace(/\b(string|number|boolean|null|undefined)\b/g, `<span style="color:${C.type}">$1</span>`)
    .replace(/"([^"]+)"/g, `<span style="color:${C.string}">"$1"</span>`)
    .replace(/'([^']+)'/g, `<span style="color:${C.string}">'$1'</span>`)
    .replace(/\/\/.+$/g, `<span style="color:${C.comment}">$&</span>`)
    .replace(/\b([A-Z][A-Za-z]+)\s*\(/g, `<span style="color:${C.fn}">$1</span>(`)
    .replace(/\b(\d+)\b/g, `<span style="color:${C.num}">$1</span>`);
}

// ── Component ────────────────────────────────────────────────────────────────
export default function DevelopmentPage() {
  const heroRef  = useRef(null);
  const capsRef  = useRef(null);
  const stackRef = useRef(null);
  const workRef  = useRef(null);
  const ctaRef   = useRef(null);
  const bgRef    = useRef(null);
  const [typed, setTyped] = useState('');
  const TYPED_CODE = `> thrust.init({
    team: "senior-only",
    stack: ["React","Node","AWS"],
    shipping: true,
  })`;

  // Typewriter effect in hero
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(TYPED_CODE.slice(0, i));
      i++;
      if (i > TYPED_CODE.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // Enhanced cinematic capability cards animation - scroll synced
      const capCards = capsRef.current?.querySelectorAll('.cap-card') ?? [];
      capCards.forEach((card, index) => {
        // Different animations for each quadrant
        let fromVars = { opacity: 0, scale: 0.85, rotateY: 45 };
        
        if (index === 0) {
          fromVars = { x: -80, y: 80, opacity: 0, scale: 0.75, rotateY: -45 };
        } else if (index === 1) {
          fromVars = { x: 80, y: 80, opacity: 0, scale: 0.75, rotateY: 45 };
        } else if (index === 2) {
          fromVars = { x: -80, y: -80, opacity: 0, scale: 0.75, rotateX: -45 };
        } else {
          fromVars = { x: 80, y: -80, opacity: 0, scale: 0.75, rotateX: 45 };
        }

        // Group by row: top 2 cards (0,1) animate together, bottom 2 cards (2,3) animate together
        const rowIndex = index < 2 ? 0 : 1;
        const startOffset = rowIndex * 300;

        gsap.fromTo(
          card,
          fromVars,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 2.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: capsRef.current,
              start: `top+=${startOffset} center`,
              end: `top+=${startOffset + 500} center`,
              scrub: 1.5,
              markers: false,
            },
          }
        );
      });

      gsap.fromTo(stackRef.current?.querySelectorAll('.stack-tag') ?? [],
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: stackRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(workRef.current?.querySelectorAll('.work-card') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.13, ease: 'power2.out',
          scrollTrigger: { trigger: workRef.current, start: 'top 75%' } }
      );

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
      );

      // Deep zoom parallax background animation
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.8,
          yPercent: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: bgRef.current.parentElement,
            start: 'top top',
            end: 'bottom center',
            scrub: 1,
            markers: false,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: C.bg, paddingTop: '80px', minHeight: '100vh', position: 'relative' }}>
      {/* ── Full page cinematic zoom overlay ── */}
      <div
        ref={bgRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 'auto',
          width: '100%',
          height: '100vh',
          zIndex: 0,
          backgroundImage: `url('/make_somethinglike_tht_in_high_202606110408.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
          transformOrigin: 'center center',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content wrapper with proper z-index ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        data-section="hero"
        style={{
          padding: 'clamp(80px,12vw,140px) 40px clamp(60px,8vw,100px)',
          borderBottom: `1px solid ${C.border}`,
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          minHeight: '100vh',
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${C.border}33 1px, transparent 1px), linear-gradient(90deg, ${C.border}33 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-60px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: `radial-gradient(circle, ${C.fn}18 0%, transparent 65%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        <div className="anim" style={{ position: 'relative', zIndex: 1 }}>
          {/* VS Code style window bar */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '24px',
            background: C.surface, border: `1px solid ${C.border}`,
            borderBottom: 'none', padding: '10px 20px',
            borderRadius: '8px 8px 0 0', marginBottom: '0',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C.dim }}>
              thrust-logic — terminal
            </span>
          </div>

          {/* Terminal body */}
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: '0 8px 8px 8px', padding: '24px 28px',
            fontFamily: '"Fira Code","Cascadia Code","Consolas",monospace',
            fontSize: 'clamp(12px,1.2vw,15px)', lineHeight: 2,
            minHeight: '160px', maxWidth: '640px',
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: C.prop }}>
              {typed}
              <span style={{ borderRight: `2px solid ${C.accent}`, animation: 'blink 1s step-end infinite', marginLeft: '1px' }}>&nbsp;</span>
            </pre>
          </div>
        </div>

        <div className="anim" style={{ position: 'relative', zIndex: 1, marginTop: '52px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', color: C.comment, marginBottom: '16px' }}>
            // 001 — DEVELOPMENT
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px,9vw,120px)',
            fontWeight: 700, letterSpacing: '-0.03em',
            textTransform: 'uppercase', lineHeight: 0.92,
            margin: '0 0 40px', color: C.fg,
          }}>
            WE ENGINEER<br />
            DIGITAL<br />
            <span style={{ color: C.accent }}>SYSTEMS.</span>
          </h1>
        </div>

        <div className="anim" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px',
          position: 'relative', zIndex: 1,
        }}>
          <p style={{
            fontFamily: 'monospace', fontSize: '14px', lineHeight: 1.9,
            color: C.comment, margin: 0, maxWidth: '420px',
          }}>
            <span style={{ color: C.keyword }}>function</span>{' '}
            <span style={{ color: C.fn }}>buildYourProduct</span>(){' {'}<br />
            &nbsp;&nbsp;<span style={{ color: C.comment }}>// Senior engineers. Clean arch.</span><br />
            &nbsp;&nbsp;<span style={{ color: C.keyword }}>return</span>{' '}
            <span style={{ color: C.string }}>"zero technical debt"</span>;<br />
            {'}'}
          </p>
          <Link to="/consult" style={{
            fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: C.bg, background: C.accent,
            padding: '14px 28px', textDecoration: 'none', transition: 'opacity 0.2s',
            fontWeight: 700,
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            $ START A PROJECT →
          </Link>
        </div>

        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────────────────── */}
      <section ref={capsRef} data-section="capabilities" style={{ padding: 'clamp(80px,10vw,120px) 40px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', color: C.comment, marginBottom: '8px' }}>
          // 001 — CAPABILITIES
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)',
          fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
          margin: '0 0 56px', lineHeight: 0.95, color: C.fg,
        }}>
          WHAT WE<br /><span style={{ color: C.accent }}>BUILD.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '28px', perspective: '1200px' }}>
          {CAPABILITIES.map(({ index, title, code, desc, tags }) => (
            <div
              key={index}
              className="cap-card"
              style={{
                background: C.surface, border: `1px solid ${C.border}`,
                padding: '24px', position: 'relative',
                transition: 'border-color 0.3s',
                transformStyle: 'preserve-3d',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
            >
              {/* Editor tab */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '12px',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: C.comment }}>
                  /{index}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: C.dim, letterSpacing: '0.08em' }}>
                  {title.toLowerCase().replace(/ /g, '-')}.ts
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <CodeBlock code={code} lang={index === '04' ? 'yaml' : 'js'} />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '15px',
                fontWeight: 700, textTransform: 'uppercase',
                color: C.fg, margin: '0 0 8px', letterSpacing: '-0.01em',
              }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', lineHeight: 1.6, color: C.dim, margin: '0 0 14px' }}>{desc}</p>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.08em',
                    color: C.prop, background: `${C.prop}18`,
                    border: `1px solid ${C.prop}40`, padding: '3px 10px', borderRadius: '4px',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────────── */}
      <section ref={stackRef} data-section="stack" style={{ padding: 'clamp(80px,10vw,120px) 40px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', color: C.comment, marginBottom: '8px' }}>
          // 002 — TECH STACK
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)',
          fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
          margin: '0 0 48px', color: C.fg, lineHeight: 0.95,
        }}>
          TOOLS WE<br /><span style={{ color: C.accent }}>TRUST.</span>
        </h2>

        {/* Import-statement style */}
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: '8px', padding: '28px 32px', marginBottom: '32px',
          fontFamily: 'monospace', fontSize: '13px', lineHeight: 2.2,
        }}>
          {STACK.map((tech, i) => (
            <div key={tech.name} className="stack-tag" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: tech.color, fontWeight: 700, fontFamily: 'var(--font-display)', minWidth: '80px', fontSize: '12px' }}>
                {tech.name}
              </span>
              <span style={{ color: C.keyword }}>import</span>
              <span style={{ color: tech.color, fontWeight: 600 }}>{tech.name}</span>
              <span style={{ color: C.fg }}>from</span>
              <span style={{ color: C.string }}>'{tech.name.toLowerCase().replace('.', '').replace(/\s+/g, '-')}'</span>
              <span style={{ color: C.comment }}>// {['frontend', 'frontend', 'type-safety', 'runtime', 'database', 'cache', 'cloud', 'containers', 'api', 'commerce', 'payments', 'infra'][i]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR WORK ──────────────────────────────────────────────────────── */}
      <section ref={workRef} data-section="work" style={{ padding: 'clamp(80px,10vw,120px) 40px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', color: C.comment, marginBottom: '8px' }}>
          // 003 — OUR WORK
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)',
          fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
          margin: '0 0 56px', lineHeight: 0.95, color: C.fg,
        }}>
          PROJECTS WE'VE<br /><span style={{ color: C.accent }}>SHIPPED.</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {WORK.map(({ index, repo, branch, commit, title, client, desc, tags, metric, year, accent }) => (
            <div
              key={index}
              className="work-card"
              style={{
                background: C.surface, border: `1px solid ${C.border}`,
                padding: '0', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
            >
              {/* Repo header — git-log style */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '12px 24px', background: C.bg,
                borderBottom: `1px solid ${C.border}`,
                flexWrap: 'wrap',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C.fn }}>
                  ⎇ {branch}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C.dim }}>
                  {repo}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C.comment, marginLeft: 'auto' }}>
                  commit {commit} · {year}
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: '28px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', color: accent, marginBottom: '8px', textTransform: 'uppercase' }}>
                    {client}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,1.8vw,24px)',
                    fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase',
                    color: C.fg, margin: '0 0 12px',
                  }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px', lineHeight: 1.75, color: C.dim, margin: '0 0 20px', maxWidth: '580px' }}>{desc}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {tags.map((t) => (
                      <span key={t} style={{
                        fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: C.dim,
                        border: `1px solid ${C.border}`, padding: '3px 8px', borderRadius: '3px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Metric badge */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px,2.5vw,36px)',
                  fontWeight: 700, letterSpacing: '-0.02em',
                  color: accent, whiteSpace: 'nowrap',
                  textAlign: 'right',
                }}>{metric}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        style={{
          padding: 'clamp(80px,10vw,120px) 40px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '40px',
          borderTop: `1px solid ${C.border}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', color: C.comment, marginBottom: '8px' }}>
            // 004 — START
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)',
            fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase',
            margin: '12px 0 0', lineHeight: 0.92, color: C.fg,
          }}>
            GOT A BUILD<br /><span style={{ color: C.accent }}>IN MIND?</span>
          </h2>
          <div style={{
            fontFamily: 'monospace', fontSize: '13px', color: C.comment,
            marginTop: '20px', lineHeight: 2,
          }}>
            <span style={{ color: C.keyword }}>await</span>{' '}
            <span style={{ color: C.fn }}>thrust</span>.
            <span style={{ color: C.prop }}>consult</span>({' '}
            <span style={{ color: C.string }}>"your-project"</span>{' '});
          </div>
        </div>
        <Link to="/consult" style={{
          fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: C.bg, background: C.accent,
          padding: '18px 36px', textDecoration: 'none', fontWeight: 700,
          transition: 'opacity 0.2s, transform 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          $ LET'S TALK →
        </Link>
      </section>
      </div>
    </div>
  );
}
