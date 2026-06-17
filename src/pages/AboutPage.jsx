import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { index: '/01', title: 'CLARITY OVER COMPLEXITY', body: 'We don\'t add process for process\'s sake. Simple, direct, and well-reasoned beats elaborate and slow every time.' },
  { index: '/02', title: 'SENIOR TALENT ONLY',       body: 'Every engagement is run by people who have done it before — not managed by them. No juniors learning on your dime.' },
  { index: '/03', title: 'RADICAL TRANSPARENCY',     body: 'You know what we\'re doing, why we\'re doing it, and how it\'s tracking — in real time, always.' },
  { index: '/04', title: 'OUTCOMES OVER OUTPUTS',    body: 'Deliverables matter less than results. We don\'t ship things. We move needles.' },
];

const TEAM = [
  { name: 'Damien Holt',    role: 'Founder / Strategy',      bio: '12 years scaling digital products for VC-backed startups and Fortune 500 brands.' },
  { name: 'Priya Mathur',   role: 'Head of Development',     bio: 'Ex-Shopify engineer. Builds systems that handle 10× the traffic you think you\'ll ever get.' },
  { name: 'Jordan Reef',    role: 'Creative Director',        bio: 'Former agency CD. Cuts creative briefs to the bone and shoots with surgical precision.' },
  { name: 'Nadia Kovács',   role: 'Head of Performance',     bio: '8 years in paid media. Has managed $40M+ in ad spend with consistent ROAS above 3x.' },
];

const DIFFERENTIATORS = [
  { label: 'NO ACCOUNT MANAGERS', desc: 'The people who pitch are the people who deliver.' },
  { label: 'FLAT RETAINER MODEL', desc: 'No hourly billing. Predictable cost, unlimited thinking.' },
  { label: 'EMBEDDED WORKING',    desc: 'We operate like an internal team — in your Slack, on your calls.' },
  { label: 'HONEST SCOPE',        desc: 'If we can\'t do something well, we\'ll tell you before you find out.' },
];

export default function AboutPage() {
  const heroRef   = useRef(null);
  const bgRef     = useRef(null);
  const valRef    = useRef(null);
  const teamRef   = useRef(null);
  const diffRef   = useRef(null);
  const ctaRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });

      gsap.fromTo(valRef.current?.querySelectorAll('.val-row') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: valRef.current, start: 'top 75%' } });

      gsap.fromTo(teamRef.current?.querySelectorAll('.team-card') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: teamRef.current, start: 'top 75%' } });

      gsap.fromTo(diffRef.current?.querySelectorAll('.diff-item') ?? [],
        { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power2.out',
          scrollTrigger: { trigger: diffRef.current, start: 'top 80%' } });

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
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 214, 117, 0.18), transparent 24%),
            linear-gradient(180deg, rgba(21, 9, 1, 0.94) 0%, rgba(75, 36, 12, 0.98) 18%, rgba(97, 50, 13, 1) 36%, rgba(143, 95, 24, 0.38) 58%, rgba(18, 9, 3, 0.96) 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
          willChange: 'transform',
          transformOrigin: 'center center',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>

      {/* HERO */}
      <section ref={heroRef} style={{ padding: 'clamp(80px,12vw,160px) 40px clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden', background:'transparent' }}>
        <div style={{ position:'absolute', top:'-100px', right:'10%', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle, rgba(200,241,53,0.07) 0%, transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div className="anim"><SectionLabel index="ABT" label="ABOUT" /></div>
        <h1 className="anim" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,9vw,124px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', lineHeight:0.92, margin:'24px 0 0', color:'var(--fg)' }}>
          WE ARE<br />THRUST<br /><span style={{ color:'var(--accent)' }}>& LOGIC.</span>
        </h1>
        <div className="anim hero-copy-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', marginTop:'60px', flexWrap:'wrap' }}>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'17px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>
            We started Thrust & Logic because we were frustrated. Frustrated with agencies that staffed accounts with juniors, padded timelines, and measured success in decks delivered rather than problems solved.
          </p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'17px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>
            So we built the agency we wanted to hire. Senior-only. Flat. Transparent. Embedded in your world rather than billing by the hour from a distance. Six years later, the model works — for us and the brands we work with.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section ref={valRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="001" label="VALUES" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          WHAT WE<br /><span style={{ color:'var(--accent)' }}>STAND FOR.</span>
        </h2>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {VALUES.map(({ index, title, body }, i) => (
            <div key={index} className="val-row" style={{ display:'grid', gridTemplateColumns:'80px 1fr 1fr', gap:'40px', padding:'36px 0', borderBottom: i < VALUES.length-1 ? '1px solid var(--border)' : 'none', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.1em', color:'var(--accent)', paddingTop:'4px' }}>{index}</span>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:700, letterSpacing:'-0.01em', textTransform:'uppercase', color:'var(--fg)', lineHeight:1.2 }}>{title}</div>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section ref={teamRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="002" label="TEAM" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          THE PEOPLE<br /><span style={{ color:'var(--accent)' }}>BEHIND IT.</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'2px' }}>
          {TEAM.map(({ name, role, bio }, index) => (
            <motion.div
              key={name}
              className="team-card"
              style={{ background:'var(--muted)', border:'1px solid var(--border)', padding:'40px 36px', transition:'border-color 0.25s', transformStyle:'preserve-3d' }}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.07 }}
              whileHover={{ y: -8, boxShadow: '0 32px 80px rgba(0,0,0,0.18)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(200,241,53,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.18em', color:'var(--accent)', marginBottom:'16px', textTransform:'uppercase' }}>{role}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'24px', fontWeight:700, letterSpacing:'-0.02em', color:'var(--fg)', marginBottom:'16px' }}>{name}</div>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', lineHeight:1.7, color:'var(--fg)', opacity:0.5, margin:0 }}>{bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section ref={diffRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="003" label="WHY US" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          THE HONEST<br /><span style={{ color:'var(--accent)' }}>DIFFERENCE.</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'2px' }}>
          {DIFFERENTIATORS.map(({ label, desc }, index) => (
            <motion.div
              key={label}
              className="diff-item"
              style={{ borderTop:'2px solid var(--accent)', paddingTop:'24px', paddingBottom:'24px', paddingRight:'40px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.06 }}
              whileHover={{ x: 6 }}
            >
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.15em', color:'var(--accent)', marginBottom:'12px' }}>{label}</div>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'15px', lineHeight:1.7, color:'var(--fg)', margin:0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding:'clamp(80px,10vw,120px) 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'40px' }}>
        <div>
          <SectionLabel index="004" label="WORK WITH US" />
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(40px,6vw,80px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'16px 0 0', lineHeight:0.92, color:'var(--fg)' }}>
            SOUNDS LIKE<br /><span style={{ color:'var(--accent)' }}>A FIT?</span>
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
