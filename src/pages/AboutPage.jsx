import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  page: '#FDFCF7',
  light: '#F4F2EB',
  dark: '#130F26',
  indigo: '#5046E5',
  coral: '#FF5938',
  text: '#1C1613',
  mid: '#4B433E',
  muted: '#857B74',
  border: 'rgba(28,22,19,0.08)',
};
const FD = 'var(--font-display)';
const FB = 'var(--font-body)';
const FM = 'var(--font-mono)';

const PRINCIPLES = [
  {
    title: 'No Account Managers',
    body: 'The senior experts who understand your project are the exact same specialists who execute it. Nothing gets lost in translation.',
  },
  {
    title: 'Embedded Working',
    body: 'We do not work in silos. We integrate directly into your daily operations, your communication channels, and your team calls like an in-house unit.',
  },
  {
    title: 'Outcomes Over Outputs',
    body: 'We do not just ship code or post content to check a box. We engineer digital assets designed specifically to move the needle and drive revenue.',
  },
  {
    title: 'Radical Transparency',
    body: 'You will never wonder where your money is going. You see exactly what we are doing, why we are doing it, and the data tracking in real time.',
  },
];

const UNITS = [
  ['Engineering', 'Custom SaaS, Web Platforms, Mobile Apps, and AI Integration Pipelines.'],
  ['Growth', 'SEO Architecture, Performance Advertising, and Data Analytics.'],
  ['Production', 'Cinematography, Direction, and Studio-Grade Post-Production.'],
  ['Design', 'Brand Identity, UI/UX Systems, and Motion Graphics.'],
];

const FOUNDERS = [
  {
    name: 'Vikas Dhull',
    role: 'Co-Founder & Managing Partner',
    title: 'Architect of Strategy',
    bio: 'Vikas leads client relations, financial strategy, and quality control. He is the final check on every deliverable, ensuring that our work aligns with your business goals and user experience. He brings military-grade discipline to agency management.',
  },
  {
    name: 'Dev Haldiyan',
    role: 'Co-Founder & Partner',
    title: 'Director of Production',
    bio: 'Dev leads the production department, overseeing everything from camera work to post-production. He brings specialized technical and visual expertise to our creative campaigns, ensuring every frame of content is studio-grade.',
  },
];

const sectionStyle = {
  padding: 'clamp(64px, 9vw, 112px) clamp(24px, 6vw, 80px)',
  borderBottom: `1px solid ${COLORS.border}`,
  boxSizing: 'border-box',
};
const headingStyle = {
  fontFamily: FD,
  fontSize: 'clamp(32px, 4.5vw, 54px)',
  lineHeight: 1.05,
  letterSpacing: '-0.035em',
  color: COLORS.text,
  margin: 0,
};
const eyebrowStyle = {
  fontFamily: FM,
  fontSize: '10px',
  letterSpacing: '0.18em',
  color: COLORS.coral,
  textTransform: 'uppercase',
  fontWeight: 700,
};

export default function AboutPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const philosophyRef = useRef(null);
  const teamRef = useRef(null);
  const operationsRef = useRef(null);
  const principlesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.abt-reveal') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 });
      [storyRef, philosophyRef, teamRef, operationsRef, principlesRef, ctaRef].forEach((ref) => {
        gsap.fromTo(ref.current?.querySelectorAll('.abt-card, .abt-copy') ?? [],
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
          });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="about-page" style={{ background: COLORS.page, color: COLORS.text, fontFamily: FB, overflowX: 'hidden' }}>
      <style>{`
        .about-page * { box-sizing: border-box; }
        .about-page .abt-card { transition: transform .25s ease, box-shadow .25s ease; }
        .about-page .abt-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(28,22,19,.08); }
        .about-page .abt-hero, .about-page .abt-story, .about-page .abt-philosophy-grid,
        .about-page .abt-founder-grid, .about-page .abt-units, .about-page .abt-principles {
          display: grid; gap: 24px;
        }
        .about-page .abt-hero { grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr); align-items: center; gap: clamp(32px, 6vw, 76px); }
        .about-page .abt-story { grid-template-columns: minmax(0, 1.1fr) minmax(260px, .9fr); align-items: center; gap: clamp(32px, 6vw, 76px); }
        .about-page .abt-philosophy-grid, .about-page .abt-founder-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .about-page .abt-units, .about-page .abt-principles { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .about-page .abt-cta-link {
          display: inline-flex; justify-content: center; align-items: center; padding: 15px 24px;
          border-radius: 6px; background: linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.coral});
          color: #fff; font: 700 11px ${FM}; letter-spacing: .15em; text-decoration: none;
        }
        @media (max-width: 800px) {
          .about-page .abt-hero, .about-page .abt-story { grid-template-columns: 1fr; }
          .about-page .abt-hero { padding-top: 112px !important; }
          .about-page .abt-philosophy-grid, .about-page .abt-founder-grid { grid-template-columns: 1fr; }
          .about-page .abt-units, .about-page .abt-principles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .about-page .abt-hero-media { max-width: 580px; }
        }
        @media (max-width: 520px) {
          .about-page .abt-units, .about-page .abt-principles { grid-template-columns: 1fr; }
          .about-page .abt-brand-mark { font-size: 12px !important; }
        }
      `}</style>

      <section ref={heroRef} className="abt-hero" style={{ ...sectionStyle, paddingTop: '140px', paddingBottom: '92px' }}>
        <div>
          <div className="abt-reveal" style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.coral }} />
            <span style={eyebrowStyle}>ABOUT THRUST &amp; LOGIC</span>
          </div>
          <h1 className="abt-reveal" style={{ ...headingStyle, fontSize: 'clamp(42px, 6vw, 76px)', marginBottom: 24 }}>
            THE CREATORS.<br />THE ENGINEERS.<br />
            <span style={{ color: COLORS.indigo }}>THE FOUNDERS.</span>
          </h1>
          <p className="abt-reveal" style={{ maxWidth: 650, margin: 0, color: COLORS.mid, fontSize: 16, lineHeight: 1.8 }}>
            We are Vikas Dhull and Dev Haldiyan. Two friends who met in high school and rebuilt their careers to bridge the gap between cinematic creativity and engineering precision. No middlemen. No fluff. Just the people who build your brand.
          </p>
        </div>
        <div className="abt-reveal abt-hero-media" style={{ overflow: 'hidden', borderRadius: 6, aspectRatio: '4 / 3', background: COLORS.light }}>
          <video src="/Thrust_and_logic_animating_colors_202607250556.mp4" autoPlay muted loop playsInline aria-label="Thrust & Logic animated brand colors" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
        </div>
      </section>

      <section ref={storyRef} className="abt-story" style={{ ...sectionStyle, background: COLORS.light }}>
        <div>
          <div className="abt-copy" style={{ ...eyebrowStyle, color: COLORS.indigo, marginBottom: 18 }}>OUR ORIGIN</div>
          <h2 className="abt-copy" style={{ ...headingStyle, fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}>
            From High School Friends to Global Builders.
          </h2>
          <div className="abt-copy" style={{ color: COLORS.mid, fontSize: 15, lineHeight: 1.8 }}>
            <p>Our story doesn’t start in a boardroom. It starts with two friends who saw a problem in the agency world: creatives didn’t understand code, and developers didn’t understand storytelling.</p>
            <p><strong>Vikas (Logic):</strong> After leaving competitive civil service exams, Vikas pivoted to business operations. He saw the chaos of fragmented agencies and wanted to build systems that actually worked.</p>
            <p><strong>Dev (Thrust):</strong> With a background in engineering and fitness, Dev found his true calling in visual media. He moved from technical studies to cinematic production, obsessed with the craft of the “perfect shot”.</p>
            <p><strong>The Turning Point:</strong> It began with a local studio pilot that didn’t pan out. But it led to an international opportunity through Dev’s fitness network. We delivered high-end digital infrastructure to an Australian partner. The result? Proof that we could compete globally.</p>
            <p style={{ marginBottom: 0 }}>We launched as D-Creations, learned the hard way, rebranded to Thrust &amp; Logic to reflect our dual philosophy, and built this agency from the ground up—hands-on, client-first, and ready to scale.</p>
          </div>
        </div>
        <div className="abt-card" style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4 / 3', background: '#e9e4dc' }}>
          <img src="/about/office.png" alt="Studio workspace representing the origins of Thrust & Logic" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      <section ref={philosophyRef} style={{ ...sectionStyle, background: COLORS.page }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="abt-copy" style={{ ...eyebrowStyle, color: COLORS.indigo, marginBottom: 16 }}>FOUNDER’S PHILOSOPHY</div>
          <h2 className="abt-copy" style={{ ...headingStyle, marginBottom: 34 }}>Thrust and Logic. Why it matters.</h2>
          <p className="abt-copy" style={{ margin: '0 0 30px', color: COLORS.mid, fontSize: 15, lineHeight: 1.8 }}>
            The name isn’t just a brand; it’s our operating system.
          </p>
          <div className="abt-philosophy-grid">
            <article className="abt-card" style={{ padding: 'clamp(28px, 5vw, 48px)', background: '#F7EBE0', borderRadius: 8 }}>
              <div className="abt-brand-mark" style={{ font: `700 14px ${FM}`, letterSpacing: '.2em', color: COLORS.coral }}>THRUST</div>
              <h3 style={{ ...headingStyle, fontSize: 30, margin: '20px 0 14px' }}>The Creative Force</h3>
              <p style={{ margin: 0, color: COLORS.mid, fontSize: 15, lineHeight: 1.8 }}>Momentum. Energy. High-impact production. This is the Thrust of our brand—making you look like the undisputed category leader through cinematic storytelling and bold visual identity.</p>
            </article>
            <article className="abt-card" style={{ padding: 'clamp(28px, 5vw, 48px)', background: '#E6E4F0', borderRadius: 8 }}>
              <div className="abt-brand-mark" style={{ font: `700 14px ${FM}`, letterSpacing: '.2em', color: COLORS.indigo }}>LOGIC</div>
              <h3 style={{ ...headingStyle, fontSize: 30, margin: '20px 0 14px' }}>The Strategic Engine</h3>
              <p style={{ margin: 0, color: COLORS.mid, fontSize: 15, lineHeight: 1.8 }}>Structure. Discipline. Engineering. This is the Logic—the clean code, the data-backed marketing strategy, and the financial transparency that keeps your business running.</p>
            </article>
          </div>
          <p className="abt-copy" style={{ margin: '28px 0 0', padding: '24px', borderTop: `1px solid ${COLORS.border}`, textAlign: 'center', color: COLORS.text, fontFamily: FD, fontSize: 'clamp(19px, 2.7vw, 28px)', lineHeight: 1.45 }}>
            <strong style={{ display: 'block', marginBottom: 10, fontFamily: FM, fontSize: 10, letterSpacing: '.18em', color: COLORS.indigo }}>THE SYNERGY</strong>
            Most agencies are 90% creative and 10% logic. Or 90% logic and 10% creative. We are <strong>100% of both.</strong>
          </p>
        </div>
      </section>

      <section ref={teamRef} style={{ ...sectionStyle, background: COLORS.light }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="abt-copy" style={{ ...eyebrowStyle, color: COLORS.indigo, marginBottom: 16 }}>MEET THE FOUNDERS</div>
          <h2 className="abt-copy" style={{ ...headingStyle, marginBottom: 32 }}>The people behind the work.</h2>
          <div className="abt-founder-grid">
            {FOUNDERS.map((founder) => (
              <article key={founder.name} className="abt-card" style={{ padding: 'clamp(26px, 4vw, 38px)', background: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 8 }}>
                <div style={{ font: `700 10px ${FM}`, letterSpacing: '.16em', color: COLORS.coral, textTransform: 'uppercase' }}>{founder.title}</div>
                <h3 style={{ ...headingStyle, fontSize: 29, margin: '16px 0 8px' }}>{founder.name}</h3>
                <div style={{ font: `700 10px ${FM}`, letterSpacing: '.1em', color: COLORS.indigo, textTransform: 'uppercase' }}>{founder.role}</div>
                <p style={{ margin: '20px 0 0', color: COLORS.mid, fontSize: 14, lineHeight: 1.8 }}>{founder.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={operationsRef} style={{ ...sectionStyle, background: COLORS.page }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="abt-copy" style={{ ...eyebrowStyle, color: COLORS.indigo, marginBottom: 16 }}>HOW WE WORK</div>
          <h2 className="abt-copy" style={{ ...headingStyle, marginBottom: 34 }}>Specialized Units. One Unified Vision.</h2>
          <div className="abt-units">
            {UNITS.map(([title, body], i) => (
              <article key={title} className="abt-card" style={{ minHeight: 190, padding: 25, borderRadius: 8, background: [ '#E3ECE8', '#E2ECF2', '#F7EBE0', '#E6E4F0' ][i] }}>
                <div style={{ font: `700 10px ${FM}`, letterSpacing: '.14em', color: COLORS.indigo }}>0{i + 1}</div>
                <h3 style={{ font: `700 20px ${FD}`, color: COLORS.text, margin: '18px 0 10px' }}>{title}</h3>
                <p style={{ fontSize: 13, color: COLORS.mid, lineHeight: 1.7, margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
          <p className="abt-copy" style={{ margin: '26px 0 0', padding: '20px 24px', background: COLORS.dark, borderRadius: 6, color: '#fff', fontSize: 14, lineHeight: 1.7 }}>
            <strong style={{ color: '#fff' }}>THE CORE LEADERSHIP — Vikas Dhull &amp; Dev Haldiyan:</strong> strategy, client relations, finance, and final quality control.
          </p>
        </div>
      </section>

      <section ref={principlesRef} style={{ ...sectionStyle, background: COLORS.light }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="abt-copy" style={{ ...eyebrowStyle, color: COLORS.indigo, marginBottom: 16 }}>OUR PRINCIPLES</div>
          <h2 className="abt-copy" style={{ ...headingStyle, marginBottom: 34 }}>Governed by Principles.</h2>
          <div className="abt-principles">
            {PRINCIPLES.map(({ title, body }, i) => (
              <article key={title} className="abt-card" style={{ padding: 26, minHeight: 205, border: `1px solid ${COLORS.border}`, borderRadius: 8, background: '#fff' }}>
                <span style={{ font: `700 10px ${FM}`, color: COLORS.coral, letterSpacing: '.12em' }}>0{i + 1}</span>
                <h3 style={{ font: `700 19px ${FD}`, color: COLORS.text, lineHeight: 1.2, margin: '18px 0 12px' }}>{title}</h3>
                <p style={{ margin: 0, color: COLORS.mid, fontSize: 13, lineHeight: 1.75 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} style={{ padding: 'clamp(72px, 10vw, 112px) 24px', textAlign: 'center', background: COLORS.dark, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
          <div className="abt-copy" style={{ ...eyebrowStyle, color: '#FF927C', marginBottom: 20 }}>WORK WITH THE FOUNDERS</div>
          <h2 className="abt-copy" style={{ ...headingStyle, color: '#fff', fontSize: 'clamp(34px, 5vw, 58px)', marginBottom: 20 }}>You’ll work directly with us. Not a sales rep.</h2>
          <p className="abt-copy" style={{ maxWidth: 620, margin: '0 auto 30px', color: 'rgba(255,255,255,.72)', fontSize: 15, lineHeight: 1.8 }}>
            Every project at Thrust &amp; Logic is led by the founders and executed by specialized senior talent. Tell us what you’re building, shooting, or scaling—and get an honest breakdown of how we’d tackle it.
          </p>
          <Link to="/consult" className="abt-cta-link">TALK TO THE FOUNDERS ↗</Link>
        </div>
      </section>
    </main>
  );
}
