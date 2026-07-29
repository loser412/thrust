import { Link } from 'react-router-dom';
import './HomePage.css';

const engines = [
  { number: '01', name: 'Development & Systems', description: 'Digital products, platforms, and infrastructure designed to move at the speed of your ambition.', link: '/development', cta: 'Explore Engineering', visual: 'system' },
  { number: '02', name: 'Cinematic Production', description: 'Brand films and social-first stories built to hold attention long after the first frame.', link: '/production', cta: 'Explore Production', visual: 'production' },
  { number: '03', name: 'Performance Marketing', description: 'Creative, media, and conversion intelligence tuned to create compounding demand.', link: '/marketing', cta: 'Explore Marketing', visual: 'growth' },
];

const work = [
  { discipline: 'Development', title: 'Custom SaaS Platform', detail: 'A unified operating system for a national service business.', image: '/ChatGPT%20Image%20Jul%2029,%202026,%2012_35_01%20PM.png', link: '/development', alt: 'Development services visual' },
  { discipline: 'Production', title: 'Brand Film / Commercial Reel', detail: 'A cinematic launch campaign made to stop the scroll.', image: '/ChatGPT%20Image%20Jul%2029,%202026,%2012_33_34%20PM.png', link: '/production', alt: 'Production services visual' },
  { discipline: 'Marketing', title: 'Customer Acquisition Engine', detail: 'A full-funnel growth system for a fast-moving e-commerce brand.', image: '/ChatGPT%20Image%20Jul%2029,%202026,%2012_33_59%20PM.png', link: '/marketing', alt: 'Marketing services visual' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function EngineVisual({ type }) {
  if (type === 'system') return <div className="engine-visual code-visual" aria-hidden="true"><div className="code-top"><i /><i /><i /><b>system.config</b></div><div className="code-lines"><span>const velocity = <b>scale</b>;</span><span>build(<em>ambition</em>);</span><span className="short">deploy / production</span></div><div className="component-orbit"><i /><i /><i /></div></div>;
  if (type === 'production') return <div className="engine-visual film-visual" aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata"><source src="/Thrust_and_logic_animating_colors_202607250556.mp4" type="video/mp4" /></video><div className="film-shade" /><div className="play-mark">▶</div><small>PLAY REEL · 00:10</small></div>;
  return <div className="engine-visual graph-visual" aria-hidden="true"><div className="metric"><span>AVERAGE ROI</span><strong>+142%</strong><small>vs. prior period <b>↑ 38.4%</b></small></div><svg viewBox="0 0 330 130" preserveAspectRatio="none"><path d="M0 116 C31 112 43 104 64 107 S96 89 120 92 S151 80 171 83 S199 43 224 54 S256 45 277 24 S308 32 330 4" /><path className="area" d="M0 116 C31 112 43 104 64 107 S96 89 120 92 S151 80 171 83 S199 43 224 54 S256 45 277 24 S308 32 330 4 V130 H0Z" /></svg><div className="graph-labels"><span>MON</span><span>WED</span><span>FRI</span><span>SUN</span></div></div>;
}

export default function HomePage() {
  return <main className="refined-home">
    <section className="refined-hero">
      <div className="grid-field" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="overline"><i /> THRUST &amp; LOGIC <span>·</span> INTEGRATED AGENCY</p>
          <h1>Software.<br /><em>Stories.</em><br />Scale.</h1>
          <p className="hero-description">We build high-performance web systems, capture cinematic media, and scale customer acquisition for ambitious brands.</p>
          <Link to="/consult" className="accent-button">Start a conversation <Arrow /></Link>
        </div>

      </div>
      <div className="hero-baseline"><span>CODE · CONTENT · CUSTOMER GROWTH</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>

    <section className="triad section-shell" id="services">
      <div className="section-intro"><p className="overline"><i /> 01 / THREE ENGINES</p><h2>Three disciplines.<br /><em>One direction.</em></h2><p>Each engagement brings together the systems, story, and signal your next stage demands.</p></div>
      <div className="engine-grid">
        {engines.map((engine) => <article className="engine-card" key={engine.number}><div className="engine-number">{engine.number}</div><EngineVisual type={engine.visual} /><div className="engine-body"><p>{engine.name}</p><h3>{engine.description}</h3><Link to={engine.link}>{engine.cta} <Arrow /></Link></div></article>)}
      </div>
    </section>

    <section className="featured-work section-shell" id="work">
      <div className="work-head"><div><p className="overline"><i /> 02 / SELECTED WORK</p><h2>Proof in<br /><em>every medium.</em></h2></div><p>We make the work connect across product, picture, and performance—not just look good in isolation.</p></div>
      <div className="work-grid">{work.map((item, index) => <Link className={`work-card work-card--${index + 1}`} to={item.link} key={item.title}><div className="work-image"><img src={item.image} alt={item.alt} /></div><div className="work-info"><p>{item.discipline} <Arrow /></p><h3>{item.title}</h3><span>{item.detail}</span></div></Link>)}</div>
    </section>

    <section className="ecosystem section-shell">
      <p className="overline"><i /> 03 / THE UNIFIED ECOSYSTEM</p>
      <div className="ecosystem-grid"><h2>The gaps between agencies<br />are where momentum <em>goes to die.</em></h2><div className="ecosystem-copy"><p className="pull-quote">“Dev teams don’t understand brand narrative. Marketing agencies don’t understand code. Production crews don’t understand conversion metrics.”</p><p>We built Thrust &amp; Logic so you never have to bridge that gap again. One senior engine handling your code, content, and customer growth.</p><div className="discipline-list"><span>Systems</span><span>Story</span><span>Scale</span></div></div></div>
    </section>

    <section className="conversion section-shell">
      <div className="conversion-card"><div className="conversion-glow" aria-hidden="true" /><p className="overline"><i /> 04 / OPEN A CHANNEL</p><h2>Ready to apply logic<br />to your next move?</h2><p>Tell us what you’re building, shooting, or scaling. We’ll give you a clear, grounded strategy with zero sales pressure.</p><Link to="/consult" className="accent-button">Consult now <Arrow /></Link><span className="corner-note">THRUST &amp; LOGIC / 2026</span></div>
    </section>
  </main>;
}
