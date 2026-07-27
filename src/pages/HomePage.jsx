import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomePage.css';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  ['01', 'DEVELOPMENT', 'Code That Scales.', 'Full-stack systems engineered for scale. Web apps, APIs, headless commerce, and bespoke platforms built to last.', '/development'],
  ['02', 'BRAND & MARKETING', 'Science That Converts.', 'Performance marketing with creative precision. Paid media, SEO, and conversion systems tuned to your growth curve.', '/marketing'],
  ['03', 'PRODUCTION', 'Frames That Speak.', 'Video, motion, and content that earns attention. Concept through delivery - no agency markup, no creative lag.', '/production'],
  ['04', 'THINK TANK', 'Strategy at Target.', 'Strategic clarity for complex problems. Fractional leadership, audits, and roadmaps that unlock real momentum.', '/about'],
  ['05', 'BLACK PRAXIS', 'Technology Advisory.', 'Bespoke technology consultation and systems architecture to align your software stack with business goals.', '/development'],
];

const steps = [
  ['01', 'Discover', 'We map the terrain - business model, constraints, competitors, and the exact problem worth solving.'],
  ['02', 'Strategise', 'A focused brief becomes a measurable plan. No bloat, no scope creep - just clear next moves.'],
  ['03', 'Execute', 'We build, test, and ship in rapid cycles. Senior talent only. You always know where things stand.'],
  ['04', 'Measure', 'Post-launch we tune, optimise, and grow. The relationship doesn\'t end at delivery.'],
  ['05', 'Scale', 'Systematic growth. We find the inflection points and push them - hard.'],
];

const clients = [
  ['Easy Life Home Care', '/icons/ELHC.png'],
  ['Ayurveda Organics', '/icons/ayurveda%20organics.png'],
  ['HopUp', '/icons/image.png'],
  ['Property Masters', '/icons/property%20masters.png'],
  ['SVS Infra', null],
];

function OrbitalMark({ index }) {
  return <span className={`orbit-mark orbit-mark-${index}`} aria-hidden="true"><i /></span>;
}

export default function HomePage() {
  const root = useRef(null);
  const hero = useRef(null);
  const stats = useRef(null);
  const cards = useRef(null);
  const process = useRef(null);
  const cta = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cosmic-hero__copy > *', { opacity: 0, y: 34 }, { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', delay: 0.15 });
      gsap.to('.cosmic-planet', { y: -42, rotate: 8, ease: 'none', scrollTrigger: { trigger: '.cosmic-hero', start: 'top top', end: 'bottom top', scrub: 1.4 } });
      gsap.to('.cosmic-aurora', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '.cosmic-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
      [stats, cards, process].forEach((section) => {
        gsap.fromTo(section.current?.querySelectorAll('.reveal:not(.process-card)') || [], { opacity: 0, y: 34 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: section.current, start: 'top 78%' } });
      });
      stats.current?.querySelectorAll('[data-number]').forEach((element) => {
        const target = Number(element.dataset.number);
        const suffix = element.dataset.suffix || '';
        const value = { n: 0 };
        gsap.to(value, { n: target, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: stats.current, start: 'top 78%' }, onUpdate: () => { element.textContent = `${Math.floor(value.n)}${suffix}`; } });
      });
      const processTrack = process.current?.querySelector('.process-grid');
      const processViewport = process.current?.querySelector('.process-viewport');
      if (processTrack && processViewport) {
        const travel = () => Math.max(0, processTrack.scrollWidth - processViewport.clientWidth);
        gsap.fromTo(processTrack.querySelectorAll('.process-card'),
          { opacity: 0, rotateY: 22, scale: 0.94 },
          { opacity: 1, rotateY: 0, scale: 1, stagger: 0.08, duration: 0.45, ease: 'power2.out', scrollTrigger: { trigger: process.current, start: 'top 75%' } }
        );
        gsap.to(processTrack, { x: () => -travel(), ease: 'none', scrollTrigger: { trigger: processViewport, start: 'center center', end: () => `+=${Math.max(1100, travel() * 1.15)}`, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true } });
      }
      gsap.fromTo(cta.current?.querySelectorAll('.cta-grid > *, .section-kicker') || [],
        { opacity: 0, y: 85, rotateX: 18, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.16, ease: 'none', scrollTrigger: { trigger: cta.current, start: 'top 72%', end: 'center 46%', scrub: 1.1 } }
      );
      gsap.fromTo(cta.current?.querySelector('.cta-orbit'), { scale: 0.55, rotate: -50, opacity: 0.1 }, { scale: 1.22, rotate: 18, opacity: 1, ease: 'none', scrollTrigger: { trigger: cta.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.to(cta.current?.querySelector('.cta-starfield'), { yPercent: -24, ease: 'none', scrollTrigger: { trigger: cta.current, start: 'top bottom', end: 'bottom top', scrub: 1.3 } });
    }, root);

    const heroElement = hero.current;
    const tiltCards = root.current?.querySelectorAll('.capability-card, .process-card') || [];
    const onHeroMove = (event) => {
      if (!heroElement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const bounds = heroElement.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to('.cosmic-planet', { x: x * 38, y: y * 24, duration: 1.1, ease: 'power3.out', overwrite: 'auto' });
      gsap.to('.cosmic-aurora', { x: x * 70, y: y * 45, duration: 1.4, ease: 'power3.out', overwrite: 'auto' });
      gsap.to('.cosmic-stars', { x: x * -18, y: y * -12, duration: 1.7, ease: 'power3.out', overwrite: 'auto' });
      gsap.to('.cosmic-hero__copy', { x: x * -9, y: y * -6, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
    };
    const resetHero = () => gsap.to(['.cosmic-planet', '.cosmic-aurora', '.cosmic-stars', '.cosmic-hero__copy'], { x: 0, y: 0, duration: 1.1, ease: 'power3.out', overwrite: 'auto' });
    const onCardMove = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--rx', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -9}deg`);
      card.style.setProperty('--ry', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 11}deg`);
      card.style.setProperty('--glow-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      card.style.setProperty('--glow-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    };
    const resetCard = (event) => {
      event.currentTarget.style.setProperty('--rx', '0deg');
      event.currentTarget.style.setProperty('--ry', '0deg');
    };
    heroElement?.addEventListener('pointermove', onHeroMove);
    heroElement?.addEventListener('pointerleave', resetHero);
    tiltCards.forEach((card) => { card.addEventListener('pointermove', onCardMove); card.addEventListener('pointerleave', resetCard); });
    return () => {
      heroElement?.removeEventListener('pointermove', onHeroMove);
      heroElement?.removeEventListener('pointerleave', resetHero);
      tiltCards.forEach((card) => { card.removeEventListener('pointermove', onCardMove); card.removeEventListener('pointerleave', resetCard); });
      ctx.revert();
    };
  }, []);

  return <main className="cosmic-home" ref={root}>
    <section className="cosmic-hero" ref={hero}>
      <div className="cosmic-noise" aria-hidden="true" />
      <div className="cosmic-stars" aria-hidden="true">{Array.from({ length: 58 }, (_, i) => <i key={i} style={{ '--x': `${(i * 47) % 101}%`, '--y': `${(i * 73) % 97}%`, '--d': `${2.6 + (i % 5)}s`, '--s': `${1 + (i % 3)}px` }} />)}</div>
      <div className="cosmic-aurora" aria-hidden="true" />
      <div className="cosmic-planet" aria-hidden="true"><div className="cosmic-planet__ring" /></div>
      <div className="cosmic-horizon" aria-hidden="true" />
      <div className="cosmic-hero__copy">
        <p className="eyebrow"><span /> Full Service Digital Agency <em>//</em> Est. 2018</p>
        <h1>We Build <span>Digital</span> Engines.</h1>
        <div className="hero-foot">
          <p>Formulating systemized structures for digital presence, optimizing growth, and streamlining operations for ambitious brands.</p>
          <div><Link to="/consult" className="cosmic-button">Start Project <b>↗</b></Link><small>/ DEVELOPMENT &nbsp; / MARKETING &nbsp; / PRODUCTION &nbsp; / STRATEGY</small></div>
        </div>
      </div>
      <div className="hero-orbit-label" aria-hidden="true">THRUST &amp; LOGIC <i /> DIGITAL SYSTEMS <i /> THRUST &amp; LOGIC</div>
      <div className="scroll-prompt">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section className="client-orbit" aria-label="Trusted clients">
      <p>Trusted by our clients</p>
      <div className="client-orbit__track">
        {[...clients, ...clients].map(([name, logo], index) => <div className={`client-orbit__item${name === 'Ayurveda Organics' ? ' client-orbit__item--ayurveda' : ''}`} key={`${name}-${index}`}>
          {logo ? <img src={logo} alt={name} /> : <span>{name}</span>}<i />
        </div>)}
      </div>
    </section>

    <section className="cosmic-stats" ref={stats}>
      <div className="section-kicker reveal"><span>01</span> SIGNAL / IMPACT</div>
      <div className="stats-intro reveal"><h2>Built for<br /><em>escape velocity.</em></h2><p>We pair high-altitude strategy with the mechanics that make it real.</p></div>
      <div className="stats-grid">
        {[[120, '+', 'Projects Delivered'], [40, '+', 'Happy Clients'], [6, '+', 'Years Operating'], [98, '%', 'Client Retention']].map(([number, suffix, label], index) => <div className="stat reveal" key={label}><OrbitalMark index={index + 1} /><strong data-number={number} data-suffix={suffix}>0{suffix}</strong><span>// {label}</span></div>)}
      </div>
    </section>

    <section className="capabilities" ref={cards}>
      <div className="section-kicker reveal"><span>02</span> CAPABILITY CONSTELLATION</div>
      <div className="section-heading reveal"><h2>What we<br /><em>do best.</em></h2><p>Crafting digital experiences, branding, and strategies that build enterprise value and drive lasting growth.</p></div>
      <div className="capability-grid">
        {capabilities.map(([number, label, title, body, path], index) => <Link className="capability-card reveal" to={path} key={number}><span className="card-number">/{number}</span><OrbitalMark index={index + 1} /><div><small>{label}</small><h3>{title}</h3><p>{body}</p></div><b>Explore <i>→</i></b></Link>)}
        <Link className="capability-card capability-card--all reveal" to="/consult"><span className="card-number">/06</span><OrbitalMark index={1} /><div><small>ALL IN</small><h3>Every brief is a new problem worth solving.</h3><p>We bring senior-level thinking to every engagement. No juniors, no hand-offs, no excuses.</p></div><b>Contact Us <i>↗</i></b></Link>
      </div>
    </section>

    <section className="process-section" ref={process}>
      <div className="section-kicker reveal"><span>03</span> MISSION SEQUENCE</div>
      <div className="section-heading reveal"><h2>How we<br /><em>operate.</em></h2><p>We don't slide into templates. Every engagement starts with a clean slate and focused execution.</p></div>
      <div className="process-viewport"><div className="process-grid">
        {steps.map(([number, title, body], index) => <article className="process-card reveal" key={number}><OrbitalMark index={index + 1} /><span>/{number}</span><h3>{title}</h3><p>{body}</p><b>0{index + 1}</b></article>)}
        <article className="process-card process-card--promise reveal"><span>// PROMISE</span><h3>Focused progress.<br />Measurable results.</h3><Link to="/consult" className="cosmic-button">Work With Us <b>↗</b></Link></article>
      </div>
      </div>
    </section>

    <section className="cosmic-cta" ref={cta}>
      <div className="cta-starfield" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ '--x': `${(i * 41) % 103}%`, '--y': `${(i * 67) % 94}%`, '--s': `${1 + (i % 3)}px` }} />)}</div>
      <div className="cta-orbit" aria-hidden="true" /><div className="section-kicker"><span>04</span> OPEN CHANNEL</div>
      <div className="cta-grid"><h2>Ready to build<br />something worth<br /><em>remembering?</em></h2><div><p>We align our capabilities with your growth objectives. Let's design, code, and execute systems that establish lasting value for your brand.</p><Link to="/consult" className="cosmic-button">Start Project <b>↗</b></Link></div></div>
    </section>
  </main>;
}
