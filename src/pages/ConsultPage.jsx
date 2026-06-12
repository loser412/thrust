import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

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
  const heroContentRef = useRef(null);
  const bgLayerRef     = useRef(null);
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
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });

      if (bgLayerRef.current) {
        gsap.to(bgLayerRef.current, {
          scale: 1.08,
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom -50%',
            scrub: 1,
            markers: false,
          },
        });
      }

      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            markers: false,
          },
        });
      }

      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } });

      gsap.fromTo(faqRef.current?.querySelectorAll('.faq-item') ?? [],
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 80%' } });
    });
    return () => ctx.revert();
  }, []);

  // Input shared styles
  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    color: 'var(--fg)',
    fontFamily: 'var(--font-display)',
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
  };

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div ref={bgLayerRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundImage: "url('/pexels-resourceboy-18541758.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        transformOrigin: 'center center',
        willChange: 'transform',
      }} />
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.30)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position:'relative', zIndex: 1 }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight: '70vh', padding: 'clamp(80px,12vw,160px) 40px clamp(60px,8vw,100px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div ref={heroContentRef} style={{ position:'relative', zIndex: 2 }}>
          <div className="anim"><SectionLabel index="CST" label="CONSULT" /></div>
          <h1 className="anim" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,9vw,124px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', lineHeight:0.92, margin:'24px 0 0', color:'var(--fg)' }}>
          LET'S<br />TALK<br /><span style={{ color:'var(--accent)' }}>HONESTLY.</span>
        </h1>

        <div className="anim" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', marginTop:'56px', position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'17px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>
            Tell us what you're working on. We'll give you a straight answer on whether we're the right fit — and if we're not, we'll point you to someone who is.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            {[
              ['RESPONSE TIME', '< 24 hours on business days'],
              ['FORMAT',        'A 30-min call, no pitch deck'],
              ['COMMITMENT',    'Zero — until you decide otherwise'],
            ].map(([k, v]) => (
              <div key={k} style={{ display:'flex', gap:'16px', alignItems:'flex-start' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.15em', color:'var(--accent)', paddingTop:'3px', whiteSpace:'nowrap' }}>{k}</span>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.06em', color:'var(--fg)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <section style={{ padding:'clamp(80px,10vw,120px) 40px', borderBottom:'1px solid var(--border)' }}>
        <SectionLabel index="001" label="INTAKE FORM" />

        {submitted ? (
          <div style={{ marginTop:'60px', maxWidth:'560px' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5vw,64px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', lineHeight:0.95, color:'var(--fg)', marginBottom:'24px' }}>
              GOT IT.<br /><span style={{ color:'var(--accent)' }}>TALK SOON.</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              border: '1px solid var(--border)',
              padding: '16px 20px',
              display: 'inline-block',
              background: 'rgba(200, 241, 53, 0.04)',
              marginBottom: '24px',
            }}>
              FORM REF: <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{formNumber}</span>
            </div>
            <p style={{ fontFamily:'var(--font-display)', fontSize:'16px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>
              We've received your request and logged it under the reference above. We will review your brief and be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ marginTop:'48px', display:'flex', flexDirection:'column', gap:'40px', maxWidth:'760px' }}>

            {/* Name + Company */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' }}>
              {[['name','Your Name','text'],['company','Company / Project','text']].map(([name, ph, type]) => (
                <div key={name}>
                  <label htmlFor={`field-${name}`} style={labelStyle}>{name.toUpperCase()}</label>
                  <input id={`field-${name}`} name={name} type={type} placeholder={ph} required value={form[name]} onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e)  => (e.currentTarget.style.borderBottomColor = 'var(--accent)')}
                    onBlur={(e)   => (e.currentTarget.style.borderBottomColor = 'var(--border)')} />
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="field-email" style={labelStyle}>EMAIL</label>
              <input id="field-email" name="email" type="email" placeholder="your@email.com" required value={form.email} onChange={handleChange}
                style={inputStyle}
                onFocus={(e)  => (e.currentTarget.style.borderBottomColor = 'var(--accent)')}
                onBlur={(e)   => (e.currentTarget.style.borderBottomColor = 'var(--border)')} />
            </div>

            {/* Services */}
            <div>
              <label style={labelStyle}>SERVICES NEEDED</label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'8px' }}>
                {SERVICES.map((s) => (
                  <button key={s} type="button" onClick={() => toggleService(s)}
                    style={{
                      fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase',
                      padding:'8px 18px', border:'1px solid',
                      borderColor: selected.includes(s) ? 'var(--accent)' : 'var(--border)',
                      background:  selected.includes(s) ? 'var(--accent)' : 'transparent',
                      color:       selected.includes(s) ? 'var(--bg)'    : 'var(--fg)',
                      opacity:     selected.includes(s) ? 1              : 0.6,
                      transition:  'all 0.2s',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label style={labelStyle}>BUDGET RANGE</label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'8px' }}>
                {BUDGETS.map((b) => (
                  <button key={b} type="button" onClick={() => setBudget(b)}
                    style={{
                      fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase',
                      padding:'8px 18px', border:'1px solid',
                      borderColor: budget === b ? 'var(--accent)' : 'var(--border)',
                      background:  budget === b ? 'var(--accent)' : 'transparent',
                      color:       budget === b ? 'var(--bg)'    : 'var(--fg)',
                      opacity:     budget === b ? 1              : 0.6,
                      transition:  'all 0.2s',
                    }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="field-message" style={labelStyle}>TELL US MORE</label>
              <textarea id="field-message" name="message" placeholder="What are you building or trying to fix? The more context the better." rows={5} value={form.message} onChange={handleChange}
                style={{ ...inputStyle, resize:'none', borderBottom:'none', border:'1px solid var(--border)', padding:'16px' }}
                onFocus={(e)  => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e)   => (e.currentTarget.style.borderColor = 'var(--border)')} />
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
                marginBottom: '20px',
              }}>
                ERROR: {submitError.toUpperCase()}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isSubmitting}
              style={{
                alignSelf:'flex-start',
                fontFamily:'var(--font-mono)',
                fontSize:'12px',
                letterSpacing:'0.18em',
                textTransform:'uppercase',
                color:'var(--bg)',
                background:'var(--accent)',
                padding:'16px 36px',
                border:'none',
                fontWeight:500,
                transition:'opacity 0.2s, transform 0.2s',
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.opacity='0.85';
                  e.currentTarget.style.transform='translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.opacity='1';
                  e.currentTarget.style.transform='translateY(0)';
                }
              }}>
              {isSubmitting ? 'SENDING...' : 'SEND BRIEF →'}
            </button>
          </form>
        )}
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section ref={faqRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="002" label="FAQ" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          COMMON<br /><span style={{ color:'var(--accent)' }}>QUESTIONS.</span>
        </h2>
        <div style={{ maxWidth:'760px', display:'flex', flexDirection:'column' }}>
          {FAQ.map(({ q, a }, i) => (
            <div key={i} className="faq-item" style={{ borderBottom:'1px solid var(--border)' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width:'100%', background:'none', border:'none', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'28px 0', textAlign:'left', gap:'24px' }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:'18px', fontWeight:600, letterSpacing:'-0.01em', color:'var(--fg)' }}>{q}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'18px', color:'var(--accent)', flexShrink:0, transition:'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div style={{ overflow:'hidden', maxHeight: openFaq === i ? '200px' : '0', transition:'max-height 0.35s ease', paddingBottom: openFaq === i ? '28px' : '0' }}>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'16px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
  );
}
