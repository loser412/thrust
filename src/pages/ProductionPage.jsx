import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const OFFERINGS = [
  { index: '/01', title: 'Video Production', desc: 'Brand films, product demos, testimonials, and social content. Scripted, shot, and edited in-house — no outsourcing.', tags: ['Brand Film', 'Product Demo', 'Testimonial', 'Social'] },
  { index: '/02', title: 'Motion & Animation', desc: '2D motion graphics, kinetic typography, and animated explainers that carry your message without a word.', tags: ['Motion Graphics', 'After Effects', 'Lottie', 'Explainer'] },
  { index: '/03', title: 'Creative Direction', desc: 'Visual language, shot lists, storyboards, and art direction. We set the tone so every frame feels intentional.', tags: ['Art Direction', 'Storyboard', 'Mood Board', 'Casting'] },
  { index: '/04', title: 'Post-Production', desc: 'Colour grading, audio mix, VFX, and delivery-ready exports across all platforms and aspect ratios.', tags: ['Colour Grade', 'Audio Mix', 'VFX', 'DaVinci Resolve'] },
];

const SPECS = [
  { value: '4K', label: '// Minimum Resolution' },
  { value: '48+', label: '// Films Produced' },
  { value: '12', label: '// Crew Members' },
  { value: '3', label: '// Studio Cities' },
];

const PROCESS = [
  { step: '/01', heading: 'BRIEF & CONCEPT', body: 'We extract the story worth telling. A tight creative brief prevents expensive reshoots.' },
  { step: '/02', heading: 'PRE-PRODUCTION', body: 'Storyboards, shot lists, location scouting, talent casting — everything locked before a camera moves.' },
  { step: '/03', heading: 'PRODUCTION', body: 'Senior crew, own equipment, no agency markup. We run tight sets and hit schedules.' },
  { step: '/04', heading: 'POST & DELIVERY', body: 'Grade, mix, VFX, and format for every platform — delivered within agreed timelines, every time.' },
];

const WORK = [
  {
    index: '01',
    client: 'APEX MOTORSPORT',
    title: 'Season Brand Film',
    desc: 'Full 3-minute brand film shot across 4 cities in 6 days. Direction, cinematography, colour grade, and sound mix all in-house.',
    tags: ['Brand Film', 'Colour Grade', 'Audio Mix'],
    metric: '2.4M views',
    year: '2024',
    accent: '#F13535',
  },
  {
    index: '02',
    client: 'FLORA BEAUTY',
    title: 'Product Launch Series',
    desc: '12-video product launch series built for TikTok and Reels. Shot, edited, and delivered in 3 weeks. Organic reach exceeded projections by 3x.',
    tags: ['Social Content', 'Product', 'Motion'],
    metric: '3x reach',
    year: '2024',
    accent: '#D435F1',
  },
  {
    index: '03',
    client: 'BRIDGE CAPITAL',
    title: 'Investor Documentary',
    desc: '28-minute documentary on infrastructure investment in Southeast Asia. Festival screened. Now used as primary investor onboarding material.',
    tags: ['Documentary', 'Direction', 'Post'],
    metric: 'Festival screened',
    year: '2023',
    accent: '#35A0F1',
  },
  {
    index: '04',
    client: 'NORTHFIELD GYM',
    title: 'Animated Brand Identity',
    desc: 'Full motion identity system — animated logo, social templates, and bumpers. Built in After Effects, exported as Lottie for digital use.',
    tags: ['Motion Graphics', 'After Effects', 'Lottie'],
    metric: '40+ assets',
    year: '2023',
    accent: '#C8F135',
  },
];

export default function ProductionPage() {
  const heroRef    = useRef(null);
  const bgRef      = useRef(null);
  const offerRef   = useRef(null);
  const specsRef   = useRef(null);
  const processRef = useRef(null);
  const workRef    = useRef(null);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });

      gsap.fromTo(offerRef.current?.querySelectorAll('.offer-row') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: offerRef.current, start: 'top 75%' } });

      gsap.fromTo(specsRef.current?.querySelectorAll('.spec-col') ?? [],
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: specsRef.current, start: 'top 80%' } });

      gsap.fromTo(processRef.current?.querySelectorAll('.proc-step') ?? [],
        { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 75%' } });

      gsap.fromTo(workRef.current?.querySelectorAll('.work-card') ?? [],
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.13, ease: 'power2.out',
          scrollTrigger: { trigger: workRef.current, start: 'top 75%' } });

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } });

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
    <div style={{ background: 'var(--bg)', paddingTop: '80px', position: 'relative' }}>
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
          backgroundImage: `url('/image3.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
          transformOrigin: 'center center',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>

      {/* HERO */}
      <section ref={heroRef} style={{ padding: 'clamp(80px,12vw,160px) 40px clamp(60px,8vw,100px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden', background:'transparent' }}>
        <div style={{ position:'absolute', bottom:'-60px', right:'-80px', width:'420px', height:'420px', borderRadius:'50%', background:'radial-gradient(circle, rgba(241,53,53,0.08) 0%, transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
        <div className="anim"><SectionLabel index="PRD" label="PRODUCTION" /></div>
        <h1 className="anim" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,9vw,124px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', lineHeight:0.92, margin:'24px 0 0', color:'var(--fg)' }}>
          WE CREATE<br />CONTENT THAT<br /><span style={{ color:'var(--accent)' }}>EARNS.</span>
        </h1>
        <div className="anim" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'48px', flexWrap:'wrap', gap:'24px' }}>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'17px', lineHeight:1.75, color:'var(--fg)', margin:0, maxWidth:'480px' }}>
            Video and motion production without the bloat. Concept through delivery — senior crew, own equipment, no outsourcing, no excuses.
          </p>
          <Link to="/consult" style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--bg)', background:'var(--accent)', padding:'14px 28px', textDecoration:'none', transition:'opacity 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
            BRIEF US →
          </Link>
        </div>
      </section>

      {/* OFFERINGS */}
      <section ref={offerRef} style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="001" label="OFFERINGS" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          WHAT WE<br /><span style={{ color:'var(--accent)' }}>PRODUCE.</span>
        </h2>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {OFFERINGS.map(({ index, title, desc, tags }) => (
            <div key={index} className="offer-row" style={{ display:'grid', gridTemplateColumns:'80px 1fr auto', gap:'32px', padding:'36px 0', borderBottom:'1px solid var(--border)', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.1em', color:'var(--accent)', paddingTop:'4px' }}>{index}</span>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:700, letterSpacing:'-0.01em', textTransform:'uppercase', color:'var(--fg)', marginBottom:'10px' }}>{title}</div>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', lineHeight:1.75, color:'var(--fg)', margin:0, maxWidth:'520px' }}>{desc}</p>
              </div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'flex-end', maxWidth:'200px' }}>
                {tags.map((t) => (
                  <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.1em', color:'var(--fg)', opacity:0.4, border:'1px solid var(--border)', padding:'4px 10px', textTransform:'uppercase' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECS */}
      <section ref={specsRef} style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="002" label="BY THE NUMBERS" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', marginTop:'48px' }}>
          {SPECS.map(({ value, label }, i) => (
            <div key={label} className="spec-col" style={{ borderLeft: i===0 ? 'none' : '1px solid var(--border)', paddingLeft: i===0 ? '0' : '32px', paddingRight:'32px' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(40px,4.5vw,64px)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, color:'var(--accent)' }}>{value}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.1em', color:'var(--fg)', marginTop:'10px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="003" label="PROCESS" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          HOW A<br /><span style={{ color:'var(--accent)' }}>SHOOT RUNS.</span>
        </h2>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {PROCESS.map(({ step, heading, body }, i) => (
            <div key={step} className="proc-step" style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:'32px', padding:'32px 0', borderBottom: i < PROCESS.length-1 ? '1px solid var(--border)' : 'none', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'0.1em', color:'var(--accent)', paddingTop:'4px' }}>{step}</span>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:700, letterSpacing:'-0.01em', textTransform:'uppercase', color:'var(--fg)', marginBottom:'10px' }}>{heading}</div>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section ref={workRef} style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="004" label="OUR WORK" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 56px', lineHeight:0.95, color:'var(--fg)' }}>
          WORK WE'VE<br /><span style={{ color:'var(--accent)' }}>CREATED.</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'2px' }}>
          {WORK.map(({ index, client, title, desc, tags, metric, year, accent }) => (
            <div
              key={index}
              className="work-card"
              style={{ padding:'40px', border:'1px solid var(--border)', position:'relative', overflow:'hidden', cursor:'default', transition:'border-color 0.3s', background:'var(--bg)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:accent, opacity:0.7 }} />
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px' }}>
                <div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.18em', color:accent, marginBottom:'6px', textTransform:'uppercase' }}>{client}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.1em', color:'var(--fg)', opacity:0.3 }}>{year}</div>
                </div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,2.5vw,32px)', fontWeight:700, letterSpacing:'-0.02em', color:accent, lineHeight:1 }}>{metric}</div>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,1.8vw,24px)', fontWeight:700, letterSpacing:'-0.01em', textTransform:'uppercase', color:'var(--fg)', margin:'0 0 14px' }}>{title}</h3>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'14px', lineHeight:1.75, color:'var(--fg)', opacity:0.5, margin:'0 0 28px' }}>{desc}</p>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                {tags.map((t) => <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--fg)', opacity:0.4, border:'1px solid var(--border)', padding:'3px 9px' }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding:'clamp(80px,10vw,120px) 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'40px' }}>
        <div>
          <SectionLabel index="004" label="START" />
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(40px,6vw,80px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'16px 0 0', lineHeight:0.92, color:'var(--fg)' }}>
            GOT A STORY<br /><span style={{ color:'var(--accent)' }}>TO TELL?</span>
          </h2>
        </div>
        <Link to="/consult" style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--bg)', background:'var(--accent)', padding:'18px 36px', textDecoration:'none', fontWeight:500, transition:'opacity 0.2s, transform 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity='0.85'; e.currentTarget.style.transform='translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}>
          LET'S TALK →
        </Link>
      </section>
      </div>
    </div>
  );
}
