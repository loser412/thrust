import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
  { step: 'DISCOVER', title: 'Find the right story', desc: 'We start with the audience, the category, and the opportunity — then shape an idea that feels ownable and memorable.' },
  { step: 'PLAN', title: 'Define the pathway', desc: 'A clear campaign blueprint aligns creative, media, and measurement around the outcome you want to own.' },
  { step: 'CREATE', title: 'Build thoughtful work', desc: 'We craft direction, visuals, and messaging that hold up across paid, owned, and social touchpoints.' },
  { step: 'LAUNCH', title: 'Move with intention', desc: 'Rollouts are staged, tracked, and refined so momentum builds without noise or wasted spend.' },
  { step: 'IMPROVE', title: 'Learn and iterate', desc: 'We use real campaign performance to sharpen ideas, refine creative, and keep the program moving.' },
];

const SERVICES = [
  { title: 'Paid Media', desc: 'Thoughtful campaign architecture across modern channels, focused on relevance and retention.' },
  { title: 'SEO', desc: 'Search visibility built around brand signals, content clarity, and long-term keyword intent.' },
  { title: 'Content Strategy', desc: 'A creative engine for brand stories, launch support, and on-brand activation.' },
  { title: 'Conversion Optimization', desc: 'Refined digital experiences that reduce friction and make paid attention feel natural.' },
  { title: 'Brand Growth', desc: 'Positioning, creative direction, and campaign narratives that create trust at scale.' },
];

const AYURVEDA_FEATURE = {
  title: 'Ayurveda Organics',
  industry: 'Ayurvedic & Organic Products',
  role: ['Social Media Management', 'Content Strategy', 'Creative Design', 'Audience Growth'],
  story: {
    challenge: 'Ayurveda Organics needed a stronger and more consistent social media presence that reflected the quality of their products and connected with the right audience.',
    whatWeDid: [
      'Managed social media accounts',
      'Planned content calendars',
      'Designed visual creatives',
      'Improved brand consistency',
      'Built a stronger online presence',
    ],
    outcome: [
      'Increased visibility',
      'Better audience engagement',
      'Stronger brand identity',
      'Consistent content presence',
      'Improved reach across platforms',
    ],
  },
  images: [
    { src: '/devpage/propertymsters/mm/smm%20ss.PNG', label: 'Instagram Performance', caption: 'Social performance overview' },
    { src: '/devpage/propertymsters/mm/smm%20ss%202.PNG', label: 'Facebook Performance', caption: 'Audience growth snapshot' },
  ],
};

const VALUES = [
  { title: 'Strategic Thinking', desc: 'We make choices that support positioning, not just execution.' },
  { title: 'Transparent Communication', desc: 'Every project is shared clearly, with rationale and realistic expectations.' },
  { title: 'Long-Term Partnerships', desc: 'We focus on sustainable momentum, not one-off spikes.' },
  { title: 'Attention To Detail', desc: 'Every interaction is refined, from copy to motion to delivery.' },
];

const TESTIMONIALS = [
  {
    name: 'Gurnam Saini',
    role: 'Founder, Ayurveda Organics',
    quote: 'They helped us turn our Ayurveda story into a consistent social presence. The creative direction and content rhythm made the brand feel premium, and the campaign visuals brought stronger audience engagement than anything we had before.',
  },
];

export default function MarketingPage() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const processRef = useRef(null);
  const servicesRef = useRef(null);
  const workRef = useRef(null);
  const valuesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' });

      const sections = [processRef, servicesRef, workRef, valuesRef, testimonialsRef, ctaRef];
      sections.forEach((sectionRef) => {
        if (!sectionRef.current) return;
        gsap.fromTo(sectionRef.current,
          { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      });

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          opacity: 0.85,
          backgroundPosition: '50% 35%',
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: bgRef.current.parentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Process steps staggered reveal
      const steps = processRef.current?.querySelectorAll('.process-step') ?? [];
      if (steps.length) {
        gsap.fromTo(steps,
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out', stagger: 0.08,
            scrollTrigger: { trigger: processRef.current, start: 'top 80%' } }
        );
      }

      // Services cards
      const services = servicesRef.current?.querySelectorAll('.service-card') ?? [];
      if (services.length) {
        gsap.fromTo(services,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: servicesRef.current, start: 'top 82%' } }
        );
      }

      // Work images
      const workImgs = workRef.current?.querySelectorAll('.work-image') ?? [];
      if (workImgs.length) {
        gsap.fromTo(workImgs,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: workRef.current, start: 'top 78%' } }
        );
      }

      // Values and testimonials
      const values = valuesRef.current?.querySelectorAll('.value-card') ?? [];
      if (values.length) {
        gsap.fromTo(values, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: valuesRef.current, start: 'top 82%' } });
      }
      const testi = testimonialsRef.current?.querySelectorAll('.testimonial-card') ?? [];
      if (testi.length) {
        gsap.fromTo(testi, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: testimonialsRef.current, start: 'top 82%' } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: 'transparent', color: '#FFFFFF', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
      <div
        ref={bgRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          backgroundImage: "linear-gradient(180deg, rgba(5,8,22,0.55), rgba(5,8,22,0.75)), url('/image%202.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <section ref={heroRef} style={{ padding: 'clamp(100px,12vw,180px) 40px 80px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '8%', right: '10%', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(198,255,0,0.12)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '8%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="anim" style={{ maxWidth: '920px' }}>
            <SectionLabel index="MKT" label="MARKETING" />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 9vw, 96px)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', margin: '24px 0 28px', maxWidth: '720px' }}>
              Marketing With Purpose.
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.9, maxWidth: '680px', color: '#CBD5E1', marginBottom: '36px' }}>
              We help businesses attract attention, build trust, and grow with clarity. Clear strategy, creative execution, and modern marketing built to last.
            </p>
            <Link to="/consult" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#050816', background: '#C6FF00', padding: '18px 28px', borderRadius: '999px', textDecoration: 'none', transition: 'transform 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              Start the conversation
            </Link>
          </div>
        </section>

        <section ref={processRef} className="fade-up" style={{ padding: '80px 40px', background: 'transparent', borderRadius: '32px', margin: '0 40px 40px' }}>
          <SectionLabel index="001" label="PROCESS" />
          <div style={{ display: 'grid', gap: '22px', gridTemplateColumns: '1fr' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 4vw, 64px)', fontWeight: 700, lineHeight: 1.02, margin: '20px 0 18px' }}>
              Discover → Plan → Create → Launch → Improve.
            </h2>
            <p style={{ color: '#CBD5E1', maxWidth: '760px', fontFamily: 'var(--font-body)', lineHeight: 1.9, fontSize: '17px' }}>
              Our process is the story we tell together. It keeps creativity grounded, execution precise, and growth consistent.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '20px', marginTop: '40px' }}>
            {PROCESS.map(({ step, title, desc }) => (
              <motion.div key={step} className="process-step" style={{ padding: '28px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', minHeight: '240px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: 'power2.out' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C6FF00', marginBottom: '16px' }}>{step}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '14px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.85, color: '#CBD5E1', margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={servicesRef} className="fade-up" style={{ padding: '80px 40px', margin: '0 40px 40px' }}>
          <SectionLabel index="002" label="SERVICES" />
          <div style={{ display: 'grid', gap: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 4vw, 64px)', fontWeight: 700, lineHeight: 1.02, margin: '20px 0 18px' }}>
              Premium services that support creative execution and strategic clarity.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', marginTop: '28px' }}>
              {SERVICES.map((service) => (
                <motion.div key={service.title} className="service-card" style={{ padding: '32px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', cursor: 'default' }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(198,255,0,0.14)', display: 'grid', placeItems: 'center', color: '#C6FF00', fontSize: '24px' }}>•</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, margin: 0 }}>{service.title}</h3>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', lineHeight: 1.9, color: '#CBD5E1', fontSize: '16px', margin: 0 }}>{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={workRef} className="fade-up" style={{ padding: '80px 40px', background: '#0F172A', borderRadius: '32px', margin: '0 40px 40px' }}>
          <SectionLabel index="003" label="Featured Partnership" />
          <div style={{ display: 'grid', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '30px', alignItems: 'center' }}>
              <div style={{ position: 'relative', minHeight: '620px', overflow: 'visible' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: 'power3.out' }}
                  style={{
                    position: 'relative',
                    borderRadius: '36px',
                    overflow: 'hidden',
                    boxShadow: '0 40px 90px rgba(0,0,0,0.3)',
                    minHeight: '520px',
                    background: '#060911',
                  }}
                >
                  <img
                    src="/devpage/propertymsters/mm/smm%20ss.PNG"
                    alt="Ayurveda Organics Instagram performance"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,8,22,0) 34%, rgba(5,8,22,0.92) 100%)' }} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 40, y: -30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, ease: 'power3.out', delay: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '18%',
                    right: '-12%',
                    width: '320px',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.26)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(7,12,26,0.9)',
                  }}
                >
                  <img
                    src="/devpage/propertymsters/mm/smm%20ss%202.PNG"
                    alt="Ayurveda Organics Facebook performance"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </motion.div>
              </div>

              <div style={{ display: 'grid', gap: '22px', paddingTop: '24px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C6FF00', marginBottom: '14px' }}>Ayurveda Organics</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 4.5vw, 62px)', fontWeight: 700, lineHeight: 1.02, margin: '0 0 22px', maxWidth: '540px' }}>
                    Ayurvedic branding refined for social media and audience growth.
                  </h2>
                  <div style={{ display: 'grid', gap: '10px', color: '#CBD5E1' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#94A3B8' }}>Industry</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.4 }}>{AYURVEDA_FEATURE.industry}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '18px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C6FF00', marginBottom: '12px' }}>The Challenge</div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.95, color: '#CBD5E1', margin: 0 }}>
                      {AYURVEDA_FEATURE.story.challenge}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C6FF00', marginBottom: '12px' }}>What We Did</div>
                    <ul style={{ display: 'grid', gap: '10px', paddingLeft: '22px', margin: 0, color: '#CBD5E1', fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.95 }}>
                      {AYURVEDA_FEATURE.story.whatWeDid.map((item) => (
                        <li key={item} style={{ listStyleType: 'disc' }}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C6FF00', marginBottom: '12px' }}>The Outcome</div>
                    <div style={{ display: 'grid', gap: '10px', paddingLeft: '22px', color: '#CBD5E1', fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.95 }}>
                      {AYURVEDA_FEATURE.story.outcome.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C6FF00', marginTop: '8px' }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '12px', padding: '24px', borderRadius: '28px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C6FF00' }}>Our Role</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                    {AYURVEDA_FEATURE.role.map((role) => (
                      <span key={role} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, lineHeight: 1.7, color: '#FFFFFF', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', padding: '10px 14px' }}>{role}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
              {AYURVEDA_FEATURE.images.map(({ src, label, caption }) => (
                <motion.div className="work-image"
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileHover={{ scale: 1.02 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: 'power2.out' }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '32px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
                    minHeight: '320px',
                  }}
                >
                  <img
                    src={src}
                    alt={label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,8,22,0.08), rgba(5,8,22,0.9))' }} />
                  <div style={{ position: 'absolute', left: '24px', bottom: '24px', right: '24px', color: '#FFFFFF' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C6FF00', marginBottom: '10px' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700, lineHeight: 1.3 }}>{caption}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={valuesRef} className="fade-up" style={{ padding: '80px 40px', margin: '0 40px 40px' }}>
          <SectionLabel index="004" label="WHY WORK WITH US" />
          <div style={{ display: 'grid', gap: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 4vw, 64px)', fontWeight: 700, lineHeight: 1.02, margin: '20px 0 18px' }}>
              Values that make collaboration feel easy and dependable.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px', marginTop: '28px' }}>
              {VALUES.map((item) => (
                <motion.div key={item.title} className="value-card" style={{ padding: '30px', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: 'power2.out' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '14px' }}>{item.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.95, color: '#CBD5E1', margin: 0 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={testimonialsRef} className="fade-up" style={{ padding: '80px 40px', background: '#0F172A', borderRadius: '32px', margin: '0 40px 40px' }}>
          <SectionLabel index="005" label="TESTIMONIALS" />
          <div style={{ display: 'grid', gap: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 700, lineHeight: 0.98, margin: '20px 0 16px' }}>
              Simple, authentic feedback from teams we partner with.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', marginTop: '28px' }}>
              {TESTIMONIALS.map((item) => (
                <motion.div key={item.name} className="testimonial-card" style={{ padding: '34px', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: 'power2.out' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.95, color: '#CBD5E1', margin: '0 0 26px' }}>
                    “{item.quote}”
                  </p>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>{item.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#94A3B8', marginTop: '6px' }}>{item.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} style={{ padding: '80px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px', margin: '0 40px 80px' }}>
          <div>
            <SectionLabel index="006" label="START" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, lineHeight: 0.92, margin: '16px 0 0' }}>
              Ready to make marketing feel more deliberate?
            </h2>
          </div>
          <Link to="/consult" style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#050816', background: '#C6FF00', padding: '18px 36px', borderRadius: '999px', textDecoration: 'none', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            LET'S TALK →
          </Link>
        </section>
      </div>
    </div>
  );
}
