import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    index: '/01',
    title: 'CLARITY OVER COMPLEXITY',
    body: 'We don\'t add process for process\'s sake. Simple, direct, and well-reasoned beats elaborate and slow every time.',
    bg: '#E8E3D7',      // Warm beige
    textColor: '#1A1A1A',
    labelColor: '#6B6252',
  },
  {
    index: '/02',
    title: 'SENIOR TALENT ONLY',
    body: 'Every engagement is run by people who have done it before — not managed by them. No juniors learning on your dime.',
    bg: '#D2DDD0',      // Soft Sage
    textColor: '#1A1A1A',
    labelColor: '#4F5E4E',
  },
  {
    index: '/03',
    title: 'RADICAL TRANSPARENCY',
    body: 'You know what we\'re doing, why we\'re doing it, and how it\'s tracking — in real time, always.',
    bg: '#D5C0B5',      // Terracotta
    textColor: '#1A1A1A',
    labelColor: '#6B544A',
  },
  {
    index: '/04',
    title: 'OUTCOMES OVER OUTPUTS',
    body: 'Deliverables matter less than results. We don\'t ship things. We move needles.',
    bg: '#C8D3DB',      // Muted slate
    textColor: '#1A1A1A',
    labelColor: '#4A5B66',
  },
];

const TEAM = [
  { name: 'Damien Holt',    role: 'Founder / Strategy',      bio: '12 years scaling digital products for VC-backed startups and Fortune 500 brands.' },
  { name: 'Priya Mathur',   role: 'Head of Development',     bio: 'Ex-Shopify engineer. Builds systems that handle 10× the traffic you think you\'ll ever get.' },
  { name: 'Jordan Reef',    role: 'Creative Director',        bio: 'Former agency CD. Cuts creative briefs to the bone and shoots with surgical precision.' },
  { name: 'Nadia Kovács',   role: 'Head of Performance',     bio: '8 years in paid media. Has managed $40M+ in ad spend with consistent ROAS above 3x.' },
];

const DIFFERENTIATORS = [
  { label: 'NO ACCOUNT MANAGERS', desc: 'The people who pitch are the people who deliver.', bg: '#ECEBE4' },
  { label: 'FLAT RETAINER MODEL', desc: 'No hourly billing. Predictable cost, unlimited thinking.', bg: '#E4EAE2' },
  { label: 'EMBEDDED WORKING',    desc: 'We operate like an internal team — in your Slack, on your calls.', bg: '#EAE2DC' },
  { label: 'HONEST SCOPE',        desc: 'If we can\'t do something well, we\'ll tell you before you find out.', bg: '#E2E6EA' },
];

export default function AboutPage() {
  const heroRef      = useRef(null);
  const valRef       = useRef(null);
  const teamRef      = useRef(null);
  const teamStageRef = useRef(null);
  const teamCardsRef = useRef([]);
  const teamDotsRef  = useRef([]);
  const diffRef      = useRef(null);
  const ctaRef       = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });

      gsap.fromTo(valRef.current?.querySelectorAll('.val-card') ?? [],
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: valRef.current, start: 'top 80%' } });

      // ── Team cards: centre-locked stage, cards swap on scroll ──
      const stage = teamStageRef.current;
      const cards = teamCardsRef.current.filter(Boolean);
      if (stage && cards.length) {
        const CARD_W  = cards[0].offsetWidth || 380;
        const SPACING = CARD_W + 60; // centre-to-centre distance
        const PX_PER_CARD = 600;
        const totalScroll = PX_PER_CARD * (cards.length - 1);

        // Place every card initially
        cards.forEach((card, i) => {
          gsap.set(card, {
            x:       i * SPACING,
            scale:   i === 0 ? 1    : 0.78,
            opacity: i === 0 ? 1    : i === 1 ? 0.5 : 0,
            zIndex:  i === 0 ? 10   : 5,
          });
        });

        // Update cards and indicator dots in real-time
        const update = (progress) => {
          const activeProgress = progress * (cards.length - 1);

          cards.forEach((card, i) => {
            const offset = i - activeProgress;
            const dist   = Math.abs(offset);

            const t     = Math.max(0, 1 - dist);
            const scale = 0.78 + 0.22 * t;
            const opacity = dist > 1.6 ? 0 : Math.max(0, 1 - dist * 0.65);

            gsap.set(card, {
              x:       offset * SPACING,
              scale,
              opacity,
              zIndex:  Math.round(10 - dist * 3),
            });
          });

          // Dynamic dots sizing & coloring
          teamDotsRef.current.forEach((dot, dotIdx) => {
            if (!dot) return;
            const dist = Math.abs(dotIdx - activeProgress);
            const activeWeight = Math.max(0, 1 - dist);
            const w = 6 + 18 * activeWeight;
            const op = 0.15 + 0.7 * activeWeight;
            gsap.set(dot, {
              width: `${w}px`,
              background: `rgba(10, 10, 10, ${op})`
            });
          });
        };

        ScrollTrigger.create({
          trigger: teamRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => update(self.progress),
        });
      }

      gsap.fromTo(diffRef.current?.querySelectorAll('.diff-item') ?? [],
        { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: diffRef.current, start: 'top 80%' } });

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#F5F2EB', position: 'relative', overflow: 'hidden' }}>
      
      {/* HERO */}
      <section ref={heroRef} style={{ padding: '160px 60px 100px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <div className="anim"><SectionLabel index="ABT" label="ABOUT" /></div>
        <h1 className="anim" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 8vw, 100px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95, margin: '24px 0 0', color: '#0A0A0A' }}>
          We Are Thrust<br />
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>&amp; Logic</span>.
        </h1>
        <div className="anim" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginTop: '60px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.7, color: '#444444', margin: 0 }}>
            We started Thrust &amp; Logic because we were frustrated. Frustrated with agencies that staffed accounts with juniors, padded timelines, and measured success in decks delivered rather than problems solved.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.7, color: '#444444', margin: 0 }}>
            So we built the agency we wanted to hire. Senior-only. Flat. Transparent. Embedded in your world rather than billing by the hour from a distance. Six years later, the model works — for us and the brands we work with.
          </p>
        </div>
      </section>

      {/* VALUES: Static list of cards */}
      <section ref={valRef} style={{ padding: '100px 60px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <SectionLabel index="001" label="VALUES" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '20px 0 48px', lineHeight: 0.95, color: '#0A0A0A' }}>
          What We<br /><span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>Stand For.</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {VALUES.map(({ index, title, body, bg, textColor, labelColor }) => (
            <div
              key={index}
              className="val-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1.2fr 2fr',
                gap: '40px',
                padding: '44px 40px',
                background: bg,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxSizing: 'border-box',
                alignItems: 'start',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: labelColor, paddingTop: '4px', fontWeight: 600 }}>{index}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: textColor, lineHeight: 1.2 }}>{title}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.65, color: textColor, opacity: 0.8, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM: Centre-locked card stage */}
      <section
        ref={teamRef}
        style={{ background: '#F5F2EB', overflow: 'hidden' }}
      >
        {/* Section header */}
        <div style={{ padding: '100px 60px 0', boxSizing: 'border-box' }}>
          <SectionLabel index="002" label="TEAM" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '20px 0 40px', lineHeight: 0.95, color: '#0A0A0A' }}>
            The People<br /><span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>Behind It.</span>
          </h2>
          
          {/* Scroll indicator row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '0',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              color: '#AAAAAA',
            }}
          >
            <span style={{ width: '28px', height: '1px', background: '#AAAAAA', display: 'inline-block' }} />
            SCROLL TO MEET
          </div>
        </div>

        {/* —— Card Stage: fixed height, cards sit here absolutely centered —— */}
        <div
          ref={teamStageRef}
          style={{
            position: 'relative',
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {TEAM.map(({ name, role, bio }, i) => {
            const CARD_W = 380;
            return (
              <div
                key={name}
                ref={(el) => (teamCardsRef.current[i] = el)}
                style={{
                  position: 'absolute',
                  width: `${CARD_W}px`,
                  height: '380px',
                  /* centre the card on the stage origin */
                  left: `calc(50% - ${CARD_W / 2}px)`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '48px 40px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '16px', textTransform: 'uppercase', fontWeight: 600 }}>{role}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: '#0A0A0A', marginBottom: '16px' }}>{name}</div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, color: '#555555', margin: 0 }}>{bio}</p>
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            paddingBottom: '80px',
          }}
        >
          {TEAM.map((_, i) => (
            <span
              key={i}
              ref={(el) => (teamDotsRef.current[i] = el)}
              style={{
                width: i === 0 ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === 0 ? '#0A0A0A' : 'rgba(0,0,0,0.15)',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section ref={diffRef} style={{ padding: '100px 60px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <SectionLabel index="003" label="WHY US" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '20px 0 48px', lineHeight: 0.95, color: '#0A0A0A' }}>
          The Honest<br /><span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>Difference.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          {DIFFERENTIATORS.map(({ label, desc, bg }) => (
            <div
              key={label}
              className="diff-item"
              style={{
                background: bg,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '40px 32px',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '16px', fontWeight: 600 }}>{label}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.65, color: '#333333', margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding: '100px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px', background: '#0A0A0A', color: '#F5F2EB' }}>
        <div>
          <SectionLabel index="004" label="WORK WITH US" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'none', margin: '16px 0 0', lineHeight: 1.1, color: '#FFFFFF' }}>
            Sounds like<br />a <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>fit?</span>
          </h2>
        </div>
        <Link to="/consult" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0A0A0A', background: '#FFFFFF', padding: '16px 36px', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>
          LET'S TALK &rarr;
        </Link>
      </section>

    </div>
  );
}

