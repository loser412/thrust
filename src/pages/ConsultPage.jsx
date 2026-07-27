import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';
import { COMPANY } from '../lib/company';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = ['Development', 'Marketing', 'Production', 'Consulting', 'Multiple / Not Sure'];
const BUDGETS = ['< $5K', '$5K – $15K', '$15K – $50K', '$50K – $150K', '$150K+'];

const FAQ = [
  { q: 'How quickly can you start?', a: 'Most engagements kick off within 2 weeks of a signed brief. We keep capacity reserved for new clients — no six-month queues.' },
  { q: 'Do you work on fixed-price or retainer?', a: 'Both, depending on scope. Project work is fixed-price with clear milestones. Ongoing partnerships run on flat monthly retainers.' },
  { q: 'What size companies do you work with?', a: 'Series A to mid-market. Big enough to move with urgency, focused enough that decisions do not take eight stakeholders.' },
  { q: 'Do you replace our existing team?', a: 'Rarely. We typically work alongside your internal team, filling specific senior gaps or running defined workstreams.' },
];

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(255, 250, 244, 0.96), rgba(239, 226, 212, 0.94))',
  border: '1px solid rgba(91, 63, 117, 0.14)',
  borderRadius: '28px',
  boxShadow: '0 24px 70px rgba(32, 23, 20, 0.08)',
  backdropFilter: 'blur(16px)',
};

export default function ConsultPage() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroPanelRef = useRef(null);
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const introCardRef = useRef(null);
  const formCardRef = useRef(null);
  const contactCardRef = useRef(null);
  const faqCardRef = useRef(null);
  const glowOneRef = useRef(null);
  const glowTwoRef = useRef(null);

  const [selected, setSelected] = useState([]);
  const [budget, setBudget] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formNumber, setFormNumber] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });

  const toggleService = (s) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const generateFormNumber = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `TL-${yyyy}${mm}${dd}-${rand}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    const refNo = generateFormNumber();
    setFormNumber(refNo);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    const payload = {
      access_key: accessKey,
      subject: `New Consult Request - ${refNo}`,
      from_name: form.name,
      name: form.name,
      email: form.email,
      company: form.company,
      services: selected.join(', ') || 'None selected',
      budget: budget || 'Not specified',
      message: form.message || 'No details provided',
      form_number: refNo,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            setSubmitted(true);
            setIsSubmitting(false);
          },
        });
      } else {
        throw new Error(result.message || 'Submission failed. Please check your Access Key.');
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit form. Please try again.');
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );

      if (heroCopyRef.current && heroPanelRef.current) {
        gsap.fromTo(
          [heroCopyRef.current, heroPanelRef.current],
          { y: 70, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 1.05, stagger: 0.14, ease: 'power3.out', delay: 0.18 }
        );
      }

      if (pageRef.current) {
        gsap.to(pageRef.current, {
          yPercent: -3,
          ease: 'none',
          scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
        });
      }

      if (glowOneRef.current && glowTwoRef.current) {
        gsap.to([glowOneRef.current, glowTwoRef.current], {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
        });
      }

      if (heroPanelRef.current) {
        gsap.to(heroPanelRef.current, {
          yPercent: -8,
          rotate: -1.2,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom 75%', scrub: true },
        });
      }

      const revealCards = [introCardRef.current, formCardRef.current, contactCardRef.current, faqCardRef.current].filter(Boolean);
      revealCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 90, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            delay: index * 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 86%', once: true },
          }
        );
      });

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 82%' },
          }
        );
      }

      gsap.fromTo(
        faqRef.current?.querySelectorAll('.faq-item') ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const inputStyle = {
    width: '100%',
    background: 'rgba(255, 252, 247, 0.86)',
    border: '1px solid rgba(32, 23, 20, 0.12)',
    borderRadius: '14px',
    color: '#201714',
    fontFamily: 'var(--font-body)',
    fontSize: '16px',
    padding: '14px 16px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    lineHeight: 1.5,
  };

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '0.18em',
    color: '#5b3f75',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
    fontWeight: 700,
  };

  return (
    <div ref={pageRef} style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #f8efe7 0%, #f3e6d9 100%)', color: '#201714' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div ref={glowOneRef} style={{ position: 'absolute', top: '-8%', right: '-8%', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(91, 63, 117, 0.16), transparent 70%)', filter: 'blur(24px)' }} />
        <div ref={glowTwoRef} style={{ position: 'absolute', bottom: '10%', left: '-6%', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(197, 165, 107, 0.22), transparent 68%)', filter: 'blur(20px)' }} />
      </div>

      <section ref={heroRef} style={{ position: 'relative', padding: '140px 24px 90px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }}>
          <div ref={heroCopyRef}>
            <div className="anim"><SectionLabel index="CST" label="CONSULT" /></div>
            <h1 className="anim" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 86px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '24px 0 0', lineHeight: 0.95, color: '#201714' }}>
              Begin with a<br />
              <span style={{ color: '#5b3f75' }}>calm conversation</span>.
            </h1>
            <p className="anim" style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.75, color: '#5e544d', margin: '24px 0 0', maxWidth: '560px' }}>
              Tell us what is stirring. We will give you a grounded answer on fit, scope, and the smartest next step — without pressure, without fluff.
            </p>
            <div className="anim" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
              {['30-min intro call', 'No pitch deck', 'Clear next step'].map((tag) => (
                <span key={tag} style={{ border: '1px solid rgba(91, 63, 117, 0.18)', borderRadius: '999px', padding: '9px 14px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5b3f75', background: 'rgba(255, 255, 255, 0.48)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div ref={heroPanelRef} className="anim" style={{ ...panelStyle, padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8f6e44', fontWeight: 700 }}>
              What to expect
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: '#201714', lineHeight: 1.2 }}>
              Quietly sharp thinking, grounded in the real work.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
              {[
                ['Response', '< 24 hours on business days'],
                ['Format', 'A thoughtful 30-minute call'],
                ['Commitment', 'No obligation until you say yes'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(32, 23, 20, 0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5b3f75', fontWeight: 700 }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4f433d', textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '20px 24px 96px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '24px' }}>
          <div ref={introCardRef} style={{ ...panelStyle, padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <SectionLabel index="001" label="INTAKE" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 38px)', fontWeight: 600, lineHeight: 1.08, margin: 0, color: '#201714' }}>
              A simple brief is enough to begin.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8, color: '#5e544d', margin: 0 }}>
              Share your context, your ambition, and the friction you are feeling. We will respond with clarity on whether the fit feels right and what the next step should be.
            </p>
            <div style={{ display: 'grid', gap: '12px' }}>
              {['A thoughtful first conversation', 'Detailed enough to be useful', 'No unnecessary formality'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#3d342f' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#5b3f75', boxShadow: '0 0 0 6px rgba(91, 63, 117, 0.1)' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={(node) => { formRef.current = node; formCardRef.current = node; }} style={{ ...panelStyle, padding: '32px', background: 'linear-gradient(135deg, rgba(255, 250, 244, 0.98), rgba(241, 232, 219, 0.95))' }}>
            <SectionLabel index="002" label="BRIEF FORM" />

            {submitted ? (
              <div style={{ marginTop: '28px', maxWidth: '560px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.2vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95, color: '#201714', marginBottom: '18px' }}>
                  Received.<br /><span style={{ color: '#5b3f75' }}>We will be in touch.</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  color: '#f8efe7',
                  background: '#5b3f75',
                  padding: '12px 18px',
                  display: 'inline-block',
                  borderRadius: '999px',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}>
                  FORM REF: <span>{formNumber}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: '#5e544d', margin: 0 }}>
                  Your request is now in our queue. We will review it and follow up within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {[['name', 'Your Name', 'text'], ['company', 'Company / Project', 'text']].map(([name, ph, type]) => (
                    <div key={name}>
                      <label htmlFor={`field-${name}`} style={labelStyle}>{name.toUpperCase()}</label>
                      <input
                        id={`field-${name}`}
                        name={name}
                        type={type}
                        placeholder={ph}
                        required
                        value={form[name]}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#5b3f75';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(91, 63, 117, 0.12)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(32, 23, 20, 0.12)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="field-email" style={labelStyle}>EMAIL</label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#5b3f75';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(91, 63, 117, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(32, 23, 20, 0.12)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>SERVICES NEEDED</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                    {SERVICES.map((s) => {
                      const isSelected = selected.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            padding: '10px 14px',
                            borderRadius: '999px',
                            border: '1px solid',
                            borderColor: isSelected ? '#5b3f75' : 'rgba(32, 23, 20, 0.12)',
                            background: isSelected ? '#5b3f75' : 'rgba(255, 252, 247, 0.7)',
                            color: isSelected ? '#f8efe7' : '#4f433d',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>BUDGET RANGE</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                    {BUDGETS.map((b) => {
                      const isSelected = budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            padding: '10px 14px',
                            borderRadius: '999px',
                            border: '1px solid',
                            borderColor: isSelected ? '#5b3f75' : 'rgba(32, 23, 20, 0.12)',
                            background: isSelected ? '#5b3f75' : 'rgba(255, 252, 247, 0.7)',
                            color: isSelected ? '#f8efe7' : '#4f433d',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="field-message" style={labelStyle}>TELL US MORE</label>
                  <textarea
                    id="field-message"
                    name="message"
                    placeholder="What are you building or trying to fix?"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      resize: 'none',
                      minHeight: '120px',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#5b3f75';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(91, 63, 117, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(32, 23, 20, 0.12)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {submitError && (
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#a14444',
                    border: '1px solid rgba(161, 68, 68, 0.3)',
                    padding: '12px 14px',
                    background: 'rgba(161, 68, 68, 0.08)',
                    letterSpacing: '0.05em',
                    borderRadius: '12px',
                  }}>
                    ERROR: {submitError.toUpperCase()}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    alignSelf: 'flex-start',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#f8efe7',
                    background: '#5b3f75',
                    padding: '14px 24px',
                    border: 'none',
                    borderRadius: '999px',
                    fontWeight: 700,
                    transition: 'opacity 0.2s',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND BRIEF →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '0 24px 90px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '24px' }}>
          <div ref={contactCardRef} style={{ ...panelStyle, padding: '32px' }}>
            <SectionLabel index="DIR" label="DIRECT CONTACT" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em', margin: '18px 0 0', lineHeight: 1.08, color: '#201714' }}>
              Thrust &amp; Logic<br /><span style={{ color: '#5b3f75' }}>Office</span>.
            </h2>
            <address style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              lineHeight: 1.8,
              color: '#5e544d',
              fontStyle: 'normal',
              textTransform: 'uppercase',
              marginTop: '20px',
            }}>
              <span style={{ display: 'block', color: '#5b3f75', marginBottom: '8px', fontWeight: 700 }}>{COMPANY.registeredOffice}</span>
              <a href={`mailto:${COMPANY.email}`} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>{COMPANY.email}</a>
              <a href={COMPANY.phoneHref} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Ph: {COMPANY.phone}</a>
              <a href={COMPANY.websiteHref} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>{COMPANY.website}</a>
            </address>
          </div>

          <div ref={(node) => { faqRef.current = node; faqCardRef.current = node; }} style={{ ...panelStyle, padding: '32px' }}>
            <SectionLabel index="003" label="FAQ" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em', margin: '18px 0 24px', lineHeight: 1.08, color: '#201714' }}>
              Common<br /><span style={{ color: '#5b3f75' }}>Questions.</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {FAQ.map(({ q, a }, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="faq-item" style={{ borderTop: '1px solid rgba(32, 23, 20, 0.08)' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', textAlign: 'left', gap: '24px', cursor: 'pointer' }}
                    >
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#201714' }}>{q}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: '#5b3f75', flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    <div style={{ overflow: 'hidden', maxHeight: isOpen ? '200px' : '0', transition: 'max-height 0.35s ease', paddingBottom: isOpen ? '18px' : '0' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: '#5e544d', margin: 0 }}>{a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

