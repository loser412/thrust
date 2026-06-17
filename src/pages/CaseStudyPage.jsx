import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CASE_STUDIES from '../data/caseStudies';
import '../styles/caseStudy.css';

function Counter({ value, suffix = '' }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 900;
    const startTs = performance.now();
    function step(ts) {
      const progress = Math.min(1, (ts - startTs) / duration);
      setCurrent(Math.round(value * progress * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [value]);
  return <div className="cs-counter">{current}{suffix}</div>;
}

export default function CaseStudyPage() {
  const { id } = useParams();
  const project = CASE_STUDIES.find((p) => p.id === id);
  const contentRef = useRef(null);

  const heroUrl = project
    ? (project.screenshots && project.screenshots.length ? project.screenshots[0] : project.image)
    : '';

  useEffect(() => {
    if (project) document.title = `${project.title} — Case Study`;
  }, [project]);

  if (!project) return (
    <div style={{ padding: 60 }}>
      <h2>Case study not found</h2>
      <Link to="/development">Back</Link>
    </div>
  );

  return (
    <main className="cs-page">
      <section className={`cs-hero ${project.id === 'property-masters' ? 'cs-hero--white-text' : ''}`} style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url("${encodeURI(heroUrl)}")` }}>
      </section>

      <div className="cs-hero-caption">
        <div className="cs-hero-inner">
          <div className="cs-industry">{project.industry}</div>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-sub">{project.summary}</p>
          <div className="cs-meta">
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.metric}</span>
          </div>
        </div>
      </div>

      <div className="cs-container">
        <aside className="cs-sticky-nav" aria-hidden>
          <nav>
            <a href="#background">Background</a>
            <a href="#challenge">Challenge</a>
            <a href="#research">Research</a>
            <a href="#design">Design</a>
            <a href="#development">Development</a>
            <a href="#features">Features</a>
            <a href="#before-after">Before / After</a>
            <a href="#results">Results</a>
            <a href="#testimonial">Testimonial</a>
          </nav>
        </aside>

        <article className="cs-content" ref={contentRef}>
          <section id="background" className="cs-section">
            <h3>Client Background</h3>
            <p>{project.details}</p>
          </section>

          <section id="challenge" className="cs-section cs-alternate">
            <h3>The Challenge</h3>
            <p>Fragmented listings, manual agent updates and slow listing propagation were causing lost leads.</p>
            <div className="cs-image-grid">
              {project.screenshots.map((s, i) => (
                <img key={s} src={s} alt={`${project.title} screenshot ${i+1}`} loading="lazy" />
              ))}
            </div>
          </section>

          <section id="research" className="cs-section">
            <h3>Research & Discovery</h3>
            <p>We audited CRM flows, observed agent workflows and mapped out integrations needed to make listings realtime.</p>
          </section>

          <section id="design" className="cs-section cs-alternate">
            <h3>Design Process</h3>
            <p>Low-fi → high-fi prototypes focused on buyer journeys and performance. Accessible components and clear CTAs improved conversion.</p>
          </section>

          <section id="development" className="cs-section">
            <h3>Development Process</h3>
            <p>API-first architecture, caching layer for fast listing loads, and secure agent auth for updates.</p>
          </section>

          <section id="features" className="cs-section cs-alternate">
            <h3>Key Features Built</h3>
            <ul>
              <li>CRM integration with authenticated webhooks</li>
              <li>Realtime listing feed and agent notes</li>
              <li>Lead capture & admin dashboard</li>
            </ul>
          </section>

          <section id="before-after" className="cs-section">
            <h3>Before vs After</h3>
            <div className="cs-compare">
              <div className="cs-compare-col">
                <h4>Before</h4>
                <p>Manual updates, stale listings, slow UX.</p>
              </div>
              <div className="cs-compare-col">
                <h4>After</h4>
                <p>Live listings, faster discovery, higher lead quality.</p>
              </div>
            </div>
          </section>

          <section id="results" className="cs-section cs-alternate">
            <h3>Results & Impact</h3>
            <div className="cs-stats">
              {project.stats.map((s) => (
                <div key={s.label} className="cs-stat">
                  <Counter value={s.value} suffix={s.suffix} />
                  <div className="cs-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="testimonial" className="cs-section">
            <h3>Client Testimonial</h3>
            <blockquote className="cs-testimonial">“{project.testimonial.quote}”</blockquote>
            <div className="cs-testimonial-author">— {project.testimonial.author}</div>
          </section>

          <section className="cs-section cs-end">
            <h3>Final Outcome</h3>
            <p>Project delivered on schedule, improved discovery, and created a scalable architecture for growth.</p>
            <div style={{ marginTop: 22 }}>
              <Link to="/development" className="cs-back">← Back to development</Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
