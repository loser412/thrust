import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { index: '/01', title: 'Paid Media', desc: 'Meta, Google, TikTok, and programmatic campaigns engineered for ROAS — not vanity metrics. Every dollar tracked.', tags: ['Meta Ads', 'Google Ads', 'TikTok', 'Programmatic'] },
  { index: '/02', title: 'Search & SEO', desc: 'Technical SEO, content strategy, and link acquisition that compounds over time. Rankings you actually keep.', tags: ['Technical SEO', 'Content', 'Link Building', 'Core Web Vitals'] },
  { index: '/03', title: 'Conversion Rate Optimisation', desc: 'Hypothesis-driven A/B testing and UX improvements that turn existing traffic into revenue without more ad spend.', tags: ['A/B Testing', 'Heatmaps', 'UX Audit', 'Funnel Analysis'] },
  { index: '/04', title: 'Analytics & Reporting', desc: 'Custom dashboards, attribution modelling, and weekly insight reports so you always know what\'s working.', tags: ['GA4', 'Mixpanel', 'Looker Studio', 'Attribution'] },
];

const RESULTS = [
  { value: '3.8x', label: '// Average ROAS' },
  { value: '62%', label: '// Avg CPA Reduction' },
  { value: '40+', label: '// Brands Scaled' },
  { value: '18mo', label: '// Avg Engagement' },
];

const WORK = [
  {
    index: '01',
    client: 'SOLSTICE APPAREL',
    title: 'Paid Social Scale-Up',
    desc: 'Took Meta ad spend from $15k to $120k/mo while maintaining a 4.1x ROAS. Creative testing cadence of 20 ads per week.',
    tags: ['Meta Ads', 'Creative Testing', 'Attribution'],
    metric: '4.1x ROAS',
    year: '2024',
    accent: '#C8F135',
  },
  {
    index: '02',
    client: 'MERIDIAN SaaS',
    title: 'B2B SEO & Content Engine',
    desc: 'Built a 60-article content cluster targeting high-intent SaaS keywords. Organic traffic up 310% in 9 months.',
    tags: ['SEO', 'Content Strategy', 'Link Building'],
    metric: '+310% organic',
    year: '2024',
    accent: '#35F1D4',
  },
  {
    index: '03',
    client: 'PEAK FITNESS',
    title: 'CRO & Funnel Rebuild',
    desc: 'Redesigned checkout flow and ran 14 A/B tests over 90 days. Revenue per visitor increased by 58% without additional spend.',
    tags: ['CRO', 'A/B Testing', 'UX Audit'],
    metric: '+58% RPV',
    year: '2023',
    accent: '#F135A0',
  },
  {
    index: '04',
    client: 'LUNE SKINCARE',
    title: 'Full-Funnel Google Strategy',
    desc: 'Built Performance Max and search campaigns from scratch. Hit ROAS target in week 3. CPA down 47% vs prior agency.',
    tags: ['Google Ads', 'Performance Max', 'Shopping'],
    metric: '-47% CPA',
    year: '2023',
    accent: '#F1A035',
  },
];

export default function MarketingPage() {
  const heroRef    = useRef(null);
  const bgRef      = useRef(null);
  const servRef    = useRef(null);
  const resultsRef = useRef(null);
  const workRef    = useRef(null);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });

      gsap.fromTo(servRef.current?.querySelectorAll('.serv-row') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: servRef.current, start: 'top 75%' } });

      gsap.fromTo(resultsRef.current?.querySelectorAll('.result-col') ?? [],
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: resultsRef.current, start: 'top 80%' } });

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
          backgroundImage: `url('/image%202.jpeg')`,
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
        <div style={{ position:'absolute', top:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(200,241,53,0.08) 0%, transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
        <div className="anim"><SectionLabel index="MKT" label="MARKETING" /></div>
        <h1 className="anim" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,9vw,124px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', lineHeight:0.92, margin:'24px 0 0', color:'var(--fg)' }}>
          WE GROW<br />YOUR<br /><span style={{ color:'var(--accent)' }}>NUMBERS.</span>
        </h1>
        <div className="anim" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'48px', flexWrap:'wrap', gap:'24px' }}>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'17px', lineHeight:1.75, color:'var(--fg)', margin:0, maxWidth:'480px' }}>
            Performance marketing with creative precision. We run campaigns that scale — and audits that reveal exactly why your current ones don't.
          </p>
          <Link to="/consult" style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--bg)', background:'var(--accent)', padding:'14px 28px', textDecoration:'none', transition:'opacity 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
            GET AN AUDIT →
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servRef} style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="001" label="SERVICES" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          HOW WE<br /><span style={{ color:'var(--accent)' }}>DRIVE GROWTH.</span>
        </h2>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {SERVICES.map(({ index, title, desc, tags }) => (
            <div key={index} className="serv-row" style={{ display:'grid', gridTemplateColumns:'80px 1fr auto', gap:'32px', padding:'36px 0', borderBottom:'1px solid var(--border)', alignItems:'start' }}>
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

      {/* RESULTS */}
      <section ref={resultsRef} style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="002" label="RESULTS" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          THE<br /><span style={{ color:'var(--accent)' }}>NUMBERS.</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px' }}>
          {RESULTS.map(({ value, label }, i) => (
            <div key={label} className="result-col" style={{ borderLeft: i === 0 ? 'none' : '1px solid var(--border)', paddingLeft: i === 0 ? '0' : '32px', paddingRight:'32px' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(40px,4.5vw,64px)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, color:'var(--accent)' }}>{value}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.1em', color:'var(--fg)', marginTop:'10px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section ref={workRef} style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="003" label="OUR WORK" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 56px', lineHeight:0.95, color:'var(--fg)' }}>
          CAMPAIGNS WE'VE<br /><span style={{ color:'var(--accent)' }}>RUN.</span>
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
          <SectionLabel index="003" label="START" />
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(40px,6vw,80px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'16px 0 0', lineHeight:0.92, color:'var(--fg)' }}>
            READY TO<br /><span style={{ color:'var(--accent)' }}>SCALE?</span>
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
