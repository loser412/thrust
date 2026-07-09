import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { 
    title: 'Paid Media Architecture', 
    desc: 'Thoughtful campaign frameworks across search, social, and display. We architect setups focused on high-intent relevance, capital efficiency, and customer retention.',
    metric: '+142% avg CTR'
  },
  { 
    title: 'Organic Search Optimization', 
    desc: 'Search visibility built around modern brand signals, clear content design, and long-term keyword authority. No hacks, just high-relevance visibility.',
    metric: 'Top-3 rankings'
  },
  { 
    title: 'Content & Narrative Systems', 
    desc: 'A creative framework for brand stories, strategic product launches, and editorial rhythms that make your brand feel premium and distinct.',
    metric: 'Multi-channel'
  },
  { 
    title: 'Conversion Experience Design', 
    desc: 'Polished digital touchpoints and user journeys optimized to eliminate friction, respect visitor attention, and maximize organic action.',
    metric: '3.8% -> 7.2% CR'
  },
  { 
    title: 'Integrated Growth Strategy', 
    desc: 'Market positioning, audience mapping, and campaign narratives that align product values with real-world customer expectations.',
    metric: 'Strategic clarity'
  },
];

const PROCESS = [
  { step: '01', title: 'DISCOVER & AUDIT', desc: 'We dissect your audience, current metrics, and market category. A deep analysis reveals exactly where capital is wasted.' },
  { step: '02', title: 'GROWTH PLAN', desc: 'A clear, measurable campaign roadmap details the pathways, media allocations, and measurement goals.' },
  { step: '03', title: 'CREATIVE BUILD', desc: 'We design high-fidelity visual assets, copywriting frameworks, and digital touchpoints that command attention.' },
  { step: '04', title: 'LAUNCH & STAGE', desc: 'Rollouts are staged and monitored in real-time. We direct resources to high-performing subsets without delay.' },
  { step: '05', title: 'MEASURE & EXPAND', desc: 'Continuous optimization cycles. We refine messaging, double-down on winners, and consistently scale.' },
];

const TESTIMONIALS = [
  {
    name: 'Gurnam Saini',
    role: 'Founder, Ayurveda Organics',
    quote: 'They transformed our organic story into a highly premium social footprint. The creative direction and consistent rhythm brought stronger audience engagement and brand authority than anything we had launched previously.',
  },
];

const AYURVEDA_WHAT_WE_DID = [
  'Social Media Account Direction',
  'Content Rhythm & Scheduling',
  'High-Fidelity Visual Design',
  'Unified Brand Identity Systems',
  'Organic Reach Optimization',
];

const AYURVEDA_OUTCOME = [
  'Elevated Brand Trust & Profile',
  'Consistent Audience Retention',
  'Deepened Platform Reach',
  'Stabliized Posting Cadence',
];

export default function MarketingPage() {
  const heroRef = useRef(null);
  const graphPathRef = useRef(null);
  const graphSectionRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const workRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
      );

      // SVG Growth Graph drawing animation on scroll
      if (graphPathRef.current && graphSectionRef.current) {
        const path = graphPathRef.current;
        const length = path.getTotalLength();
        
        // Set up path dash variables
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: graphSectionRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1.2,
          }
        });

        // Staggered fade in of graph background glow grid
        gsap.fromTo(graphSectionRef.current.querySelectorAll('.grid-line'),
          { opacity: 0 },
          { 
            opacity: 0.05, 
            duration: 1, 
            stagger: 0.05,
            scrollTrigger: {
              trigger: graphSectionRef.current,
              start: 'top 75%',
            }
          }
        );

        // Animate key metric numbers
        gsap.fromTo(graphSectionRef.current.querySelectorAll('.metric-box'),
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: graphSectionRef.current,
              start: 'top 65%',
            }
          }
        );
      }

      // Services stagger reveal
      gsap.fromTo(servicesRef.current?.querySelectorAll('.service-row') ?? [],
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.12, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 75%',
          }
        }
      );

      // Staggered Process Cards
      gsap.fromTo(processRef.current?.querySelectorAll('.process-card') ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 75%',
          }
        }
      );

      // Ayurveda Work Section animations
      gsap.fromTo(workRef.current?.querySelectorAll('.work-fade') ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: workRef.current,
            start: 'top 70%',
          }
        }
      );

      // Testimonials & CTA
      gsap.fromTo(testimonialsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#F5F2EB', position: 'relative', color: '#0A0A0A', overflow: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section 
        ref={heroRef}
        style={{ 
          padding: 'clamp(140px, 16vw, 220px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 100px)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        {/* Subtle dot pattern background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(#0A0A0A 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="anim" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600 }}>
              GROWTH ARCHITECTURE
            </span>
          </div>

          <h1 className="anim" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 8vw, 110px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            margin: '0 0 36px',
            maxWidth: '1200px',
            color: '#0A0A0A'
          }}>
            WE BUILD<br />
            MOMENTUM<br />
            <span style={{ color: '#7A9A00' }}>THAT LASTS.</span>
          </h1>

          <div className="anim" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '40px', marginTop: '16px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: 1.7,
              color: '#4B5563',
              maxWidth: '620px',
              margin: 0
            }}>
              High-performance marketing engineered for strategic clarity, modern distribution, and organic velocity. We strip away the fluff to build systems that scale.
            </p>
            <Link to="/consult"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#FFFFFF', background: '#0A0A0A', padding: '18px 36px', textDecoration: 'none', fontWeight: 600,
                transition: 'opacity 0.2s, transform 0.2s', display: 'inline-block',
                borderRadius: '0px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              ARCHITECT YOUR GROWTH →
            </Link>
          </div>
        </div>
      </section>

      {/* ── GROWTH CHART / ANIMATED SCROLL SECTION ────────────── */}
      <section 
        ref={graphSectionRef}
        style={{ 
          background: '#0A0A0A', 
          color: '#FFFFFF',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          {/* Left Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#C8F135' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8F135' }}>
                Growth Trajectory
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              margin: '0 0 24px'
            }}>
              DATA-DRIVEN<br />
              VISIBILITY.<br />
              <span style={{ color: '#C8F135' }}>ZERO ACCIDENT.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: '420px' }}>
              We map search behaviors, keyword gaps, and media efficiency markers to drive predictable curves, not short-term spikes.
            </p>

            {/* Metrics */}
            <div style={{ display: 'flex', gap: '40px', marginTop: '48px' }}>
              <div className="metric-box">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: 700, color: '#C8F135', lineHeight: 1 }}>3.4x</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginTop: '8px', textTransform: 'uppercase' }}>Avg ROI Increase</div>
              </div>
              <div className="metric-box">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>12M+</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginTop: '8px', textTransform: 'uppercase' }}>Organic Impressions</div>
              </div>
            </div>
          </div>

          {/* Right SVG Chart */}
          <div style={{ position: 'relative', height: '320px', width: '100%', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '24px' }}>
            {/* Background grid lines */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 0', pointerEvents: 'none' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid-line" style={{ width: '100%', height: '1px', background: '#FFFFFF', opacity: 0 }} />
              ))}
            </div>

            {/* Vertical grid lines */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', padding: '0 48px', pointerEvents: 'none' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid-line" style={{ height: '100%', width: '1px', background: '#FFFFFF', opacity: 0 }} />
              ))}
            </div>

            {/* SVG Path */}
            <svg style={{ width: '100%', height: '100%', overflow: 'visible', position: 'relative', zIndex: 2 }}>
              <path
                ref={graphPathRef}
                d="M 0 280 C 120 280, 180 200, 300 180 C 420 160, 480 80, 680 20"
                fill="none"
                stroke="#C8F135"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ vectorEffect: 'non-scaling-stroke' }}
              />
              
              {/* Highlight growth dots */}
              <circle cx="300" cy="180" r="6" fill="#C8F135" />
              <circle cx="680" cy="20" r="8" fill="#FFFFFF" stroke="#C8F135" strokeWidth="4" />
            </svg>

            {/* Floating growth badges */}
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Q1 AUDIT</div>
            <div style={{ position: 'absolute', top: '24px', right: '24px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C8F135', fontWeight: 600 }}>SCALED GROWTH</div>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES / SERVICES ───────────────────────── */}
      <section 
        ref={servicesRef}
        style={{ 
          background: '#FFFFFF', 
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '80px', alignItems: 'start' }}>
          {/* Left Sticky Header */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600 }}>
                Capabilities
              </span>
            </div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(36px, 4.5vw, 64px)', 
              fontWeight: 700, 
              letterSpacing: '-0.03em', 
              textTransform: 'uppercase', 
              margin: '0 0 24px', 
              lineHeight: 0.9, 
              color: '#0A0A0A' 
            }}>
              GROWTH<br />CAPABILITIES.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: '#4B5563', margin: 0, maxWidth: '320px' }}>
              We build custom pipelines tailored to your business profile. No pre-packaged packages, just conversion engines that perform.
            </p>
          </div>

          {/* Right Services Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            {SERVICES.map(({ title, desc, metric }, idx) => (
              <div
                key={title}
                className="service-row"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1.5fr 1fr',
                  gap: '32px',
                  padding: '36px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  alignItems: 'start',
                  transition: 'background 0.25s ease',
                  background: hoveredService === idx ? 'rgba(122,154,0,0.04)' : 'transparent',
                  paddingLeft: hoveredService === idx ? '16px' : '0px',
                  paddingRight: hoveredService === idx ? '16px' : '0px',
                  cursor: 'default'
                }}
              >
                {/* Index */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: hoveredService === idx ? '#7A9A00' : 'rgba(0,0,0,0.3)',
                  fontWeight: 600,
                  marginTop: '4px',
                  transition: 'color 0.25s ease'
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.2vw, 30px)',
                    fontWeight: 700,
                    color: '#0A0A0A',
                    margin: '0 0 10px',
                    lineHeight: 1.1
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: '#4B5563', margin: 0 }}>
                    {desc}
                  </p>
                </div>

                {/* Metric / Outcomes */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    color: hoveredService === idx ? '#FFFFFF' : '#0A0A0A',
                    background: hoveredService === idx ? '#0A0A0A' : 'rgba(0,0,0,0.04)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    padding: '8px 16px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    transition: 'all 0.25s ease',
                  }}>
                    {metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PARTNERSHIP (AYURVEDA ORGANICS) ──────────── */}
      <section 
        ref={workRef}
        style={{ 
          background: '#F5F2EB', 
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }}>
          {/* Header */}
          <div style={{ maxWidth: '820px' }} className="work-fade">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600 }}>
                CASE STUDY
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: '0 0 20px',
              color: '#0A0A0A'
            }}>
              AYURVEDA ORGANICS.<br />
              <span style={{ color: '#7A9A00' }}>AUDIENCE EVOLUTION.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8, color: '#4B5563', margin: 0 }}>
              A holistic brand positioning and creative execution program that aligned product authenticity with modern social distributions.
            </p>
          </div>

          {/* Grid Layout: Text Content + Side Mockup screenshots */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'start' }}>
            {/* Left Content List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} className="work-fade">
              {/* Challenge */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600, marginBottom: '12px' }}>THE CHALLENGE</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: '#374151', margin: 0 }}>
                  Ayurveda Organics needed a consistent, premium online presence that reflected organic product values while establishing platform visibility.
                </p>
              </div>

              {/* What We Did */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600, marginBottom: '16px' }}>THE INTERVENTION</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  {AYURVEDA_WHAT_WE_DID.map((item, idx) => (
                    <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#7A9A00', fontWeight: 600 }}>0{idx + 1}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600, marginBottom: '16px' }}>THE VELOCITY OUTCOME</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {AYURVEDA_OUTCOME.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7A9A00' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', fontWeight: 600 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Work Screenshots (Kept identical as requested but styled in minimal frames) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="work-fade">
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', padding: '16px', borderRadius: '4px', boxShadow: '0 20px 48px rgba(0,0,0,0.05)' }}>
                <img
                  src="/devpage/propertymsters/mm/smm%20ss.PNG"
                  alt="Organic Performance Stat Screenshot 1"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>
                  <span>IG METRIC OVERVIEW</span>
                  <span>VERIFIED INSTAGRAM REACH</span>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', padding: '16px', borderRadius: '4px', boxShadow: '0 20px 48px rgba(0,0,0,0.05)' }}>
                <img
                  src="/devpage/propertymsters/mm/smm%20ss%202.PNG"
                  alt="Organic Performance Stat Screenshot 2"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>
                  <span>FB ENGAGEMENT OVERVIEW</span>
                  <span>VERIFIED AUDIENCE GROWTH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS timeline ─────────────────────────────────── */}
      <section 
        ref={processRef}
        style={{ 
          background: '#FFFFFF', 
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600 }}>
            Execution Sequence
          </span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4.5vw, 64px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          margin: '0 0 56px',
          color: '#0A0A0A',
          lineHeight: 0.9
        }}>
          THE CONVERSION<br />
          <span style={{ color: '#7A9A00' }}>FRAMEWORK.</span>
        </h2>

        {/* Staggered process cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
          {PROCESS.map(({ step, title, desc }) => (
            <div
              key={step}
              className="process-card"
              style={{
                background: '#F5F2EB',
                border: '1px solid rgba(0,0,0,0.06)',
                padding: '24px',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '0px'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: '#7A9A00',
                fontWeight: 600
              }}>
                {step}
              </span>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                  margin: '0 0 10px',
                  lineHeight: 1.1
                }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.7, color: '#4B5563', margin: 0 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section 
        ref={testimonialsRef}
        style={{ 
          background: '#0A0A0A', 
          color: '#FFFFFF',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#C8F135' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8F135' }}>
            Partnerships
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '60px', alignItems: 'start' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 0.95,
            margin: 0
          }}>
            VERIFIED<br />
            REVIEWS.
          </h2>

          <div>
            {TESTIMONIALS.map((item) => (
              <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2.5vw, 32px)',
                  lineHeight: 1.4,
                  color: 'rgba(255,255,255,0.95)',
                  margin: 0,
                  fontWeight: 500,
                  fontStyle: 'italic'
                }}>
                  “{item.quote}”
                </p>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginTop: '4px', textTransform: 'uppercase' }}>
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section 
        ref={ctaRef}
        style={{ 
          background: '#FFFFFF', 
          borderTop: '1px solid rgba(0,0,0,0.08)',
          position: 'relative', 
          overflow: 'hidden' 
        }}
      >
        <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00', fontWeight: 600 }}>
                Get Started
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, lineHeight: 0.88, color: '#0A0A0A' }}>
              READY TO STAGE<br />
              <span style={{ color: '#7A9A00' }}>YOUR SCALE?</span>
            </h2>
          </div>
          <Link to="/consult"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#FFFFFF', background: '#0A0A0A', padding: '20px 44px', textDecoration: 'none', fontWeight: 600,
              transition: 'opacity 0.2s, transform 0.2s', display: 'inline-block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            LAUNCH CONSULTATION →
          </Link>
        </div>
      </section>
    </div>
  );
}
