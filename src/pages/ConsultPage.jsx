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
  { q: 'What size companies do you work with?', a: 'Series A to mid-market. Big enough to move with urgency, focused enough that decisions don\'t take eight stakeholders.' },
  { q: 'Do you replace our existing team?', a: 'Rarely. We typically work alongside your internal team, filling specific senior gaps or running defined workstreams.' },
];

export default function ConsultPage() {
  const heroRef        = useRef(null);
  const formRef        = useRef(null);
  const faqRef         = useRef(null);

  const [selected, setSelected] = useState([]);
  const [budget,   setBudget]   = useState('');
  const [openFaq,  setOpenFaq]  = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formNumber, setFormNumber] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });

  const toggleService = (s) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

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
          'Accept': 'application/json',
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
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });

      gsap.fromTo(formRef.current,
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } });

      gsap.fromTo(faqRef.current?.querySelectorAll('.faq-item') ?? [],
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 80%' } });
    });
    return () => ctx.revert();
  }, []);

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#FFFFFF',
    fontFamily: 'var(--font-body)',
    fontSize: '16px',
    padding: '14px 0',
    outline: 'none',
    transition: 'border-color 0.2s',
    lineHeight: 1.5,
  };

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '0.18em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px',
    fontWeight: 600,
  };

  return (
    <div style={{ background: '#F5F2EB', position: 'relative', overflow: 'hidden' }}>
      
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ padding: '160px 60px 80px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <div>
          <div className="anim"><SectionLabel index="CST" label="CONSULT" /></div>
          <h1 className="anim" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 8vw, 100px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '24px 0 0', color: '#0A0A0A' }}>
            Let's Talk<br />
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>Honestly</span>.
          </h1>

          <div className="anim" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', marginTop: '56px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.7, color: '#444444', margin: 0 }}>
              Tell us what you're working on. We'll give you a straight answer on whether we're the right fit — and if we're not, we'll point you to someone who is.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                ['RESPONSE TIME', '< 24 hours on business days'],
                ['FORMAT',        'A 30-min call, no pitch deck'],
                ['COMMITMENT',    'Zero — until you decide otherwise'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--accent)', paddingTop: '3px', whiteSpace: 'nowrap', fontWeight: 600 }}>{k}</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em', color: '#2D2D2D' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM: Black Background ───────────────────────────────────────── */}
      <section style={{ padding: '100px 60px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: '#0A0A0A', color: '#FFFFFF' }}>
        <SectionLabel index="001" label="INTAKE FORM" />

        {submitted ? (
          <div style={{ marginTop: '60px', maxWidth: '560px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95, color: '#FFFFFF', marginBottom: '24px' }}>
              Got It.<br /><span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', color: '#C8F135' }}>Talk Soon.</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#0A0A0A',
              background: '#C8F135',
              padding: '16px 24px',
              display: 'inline-block',
              marginBottom: '24px',
              fontWeight: 700,
            }}>
              FORM REF: <span>{formNumber}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
              We've received your request and logged it under the reference above. We will review your brief and be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '760px' }}>
            
            {/* Name + Company */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
              {[['name', 'Your Name', 'text'], ['company', 'Company / Project', 'text']].map(([name, ph, type]) => (
                <div key={name}>
                  <label htmlFor={`field-${name}`} style={labelStyle}>{name.toUpperCase()}</label>
                  <input id={`field-${name}`} name={name} type={type} placeholder={ph} required value={form[name]} onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e)  => (e.currentTarget.style.borderBottomColor = '#C8F135')}
                    onBlur={(e)   => (e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)')} />
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="field-email" style={labelStyle}>EMAIL</label>
              <input id="field-email" name="email" type="email" placeholder="your@email.com" required value={form.email} onChange={handleChange}
                style={inputStyle}
                onFocus={(e)  => (e.currentTarget.style.borderBottomColor = '#C8F135')}
                onBlur={(e)   => (e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)')} />
            </div>

            {/* Services */}
            <div>
              <label style={labelStyle}>SERVICES NEEDED</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
                {SERVICES.map((s) => {
                  const isSelected = selected.includes(s);
                  return (
                    <button key={s} type="button" onClick={() => toggleService(s)}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '10px 20px',
                        border: '1px solid',
                        borderColor: isSelected ? '#C8F135' : 'rgba(255, 255, 255, 0.15)',
                        background: isSelected ? '#C8F135' : 'transparent',
                        color: isSelected ? '#0A0A0A' : 'rgba(255, 255, 255, 0.7)',
                        opacity: isSelected ? 1 : 0.8,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label style={labelStyle}>BUDGET RANGE</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
                {BUDGETS.map((b) => {
                  const isSelected = budget === b;
                  return (
                    <button key={b} type="button" onClick={() => setBudget(b)}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '10px 20px',
                        border: '1px solid',
                        borderColor: isSelected ? '#C8F135' : 'rgba(255, 255, 255, 0.15)',
                        background: isSelected ? '#C8F135' : 'transparent',
                        color: isSelected ? '#0A0A0A' : 'rgba(255, 255, 255, 0.7)',
                        opacity: isSelected ? 1 : 0.8,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="field-message" style={labelStyle}>TELL US MORE</label>
              <textarea id="field-message" name="message" placeholder="What are you building or trying to fix? The more context the better." rows={5} value={form.message} onChange={handleChange}
                style={{
                  ...inputStyle,
                  resize: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '16px',
                  boxSizing: 'border-box',
                }}
                onFocus={(e)  => (e.currentTarget.style.borderColor = '#C8F135')}
                onBlur={(e)   => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)')} />
            </div>

            {/* Error display */}
            {submitError && (
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#FF5F57',
                border: '1px solid #FF5F57',
                padding: '12px 18px',
                background: 'rgba(255, 95, 87, 0.08)',
                letterSpacing: '0.05em',
              }}>
                ERROR: {submitError.toUpperCase()}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isSubmitting}
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                background: '#C8F135',
                padding: '16px 36px',
                border: 'none',
                fontWeight: 700,
                transition: 'opacity 0.2s',
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.opacity = '1';
              }}
            >
              {isSubmitting ? 'SENDING...' : 'SEND BRIEF →'}
            </button>
          </form>
        )}
      </section>


      {/* Office Details */}
      <section style={{ padding: '80px 60px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>
          <div>
            <SectionLabel index="DIR" label="DIRECT CONTACT" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 600, letterSpacing: '-0.02em', margin: '20px 0 0', lineHeight: 1, color: '#0A0A0A' }}>
              Thrust &amp; Logic<br /><span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>Office</span>.
            </h2>
          </div>

          <address style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            lineHeight: 1.8,
            color: '#2D2D2D',
            fontStyle: 'normal',
            textTransform: 'uppercase',
          }}>
            <span style={{ display: 'block', color: 'var(--accent)', marginBottom: '8px', fontWeight: 600 }}>{COMPANY.registeredOffice}</span>
            <a href={`mailto:${COMPANY.email}`} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>{COMPANY.email}</a>
            <a href={COMPANY.phoneHref} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Ph: {COMPANY.phone}</a>
            <a href={COMPANY.websiteHref} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>{COMPANY.website}</a>
          </address>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section ref={faqRef} style={{ padding: '100px 60px' }}>
        <SectionLabel index="002" label="FAQ" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '20px 0 48px', lineHeight: 0.95, color: '#0A0A0A' }}>
          Common<br /><span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>Questions.</span>
        </h2>
        <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column' }}>
          {FAQ.map(({ q, a }, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="faq-item" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <button onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 0', textAlign: 'left', gap: '24px', cursor: 'pointer' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: '#0A0A0A' }}>{q}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--accent)', flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ overflow: 'hidden', maxHeight: isOpen ? '200px' : '0', transition: 'max-height 0.35s ease', paddingBottom: isOpen ? '28px' : '0' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: '#555555', margin: 0 }}>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
