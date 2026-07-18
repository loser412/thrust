import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA (unchanged) ───────────────────────────────────── */
const OFFERINGS = [
  { index: '01', title: 'Video Production',    desc: 'Brand films, product demos, testimonials, and social content. Scripted, shot, and edited in-house — no outsourcing.', tags: ['Brand Film', 'Product Demo', 'Testimonial', 'Social'] },
  { index: '02', title: 'Motion & Animation',  desc: '2D motion graphics, kinetic typography, and animated explainers that carry your message without a word.', tags: ['Motion Graphics', 'After Effects', 'Lottie', 'Explainer'] },
  { index: '03', title: 'Creative Direction',  desc: 'Visual language, shot lists, storyboards, and art direction. We set the tone so every frame feels intentional.', tags: ['Art Direction', 'Storyboard', 'Mood Board', 'Casting'] },
  { index: '04', title: 'Post-Production',      desc: 'Colour grading, audio mix, VFX, and delivery-ready exports across all platforms and aspect ratios.', tags: ['Colour Grade', 'Audio Mix', 'VFX', 'DaVinci Resolve'] },
];

const SPECS = [
  { value: '4K',  label: 'Minimum Resolution' },
  { value: '48+', label: 'Films Produced'      },
  { value: '12',  label: 'Crew Members'        },
  { value: '3',   label: 'Studio Cities'       },
];

const SHOTS = [
  { title: 'On-Set Direction',   desc: 'We lock the mood, framing, and pacing before a single take. Every shot must earn its place in the edit.' },
  { title: 'Lighting & VFX',    desc: 'Practical lighting, subtle effects, and clean compositing that make content feel premium without slowing production.' },
  { title: 'Delivery Ready',    desc: 'Native formats for social, web, and broadcast — all color graded, sound mixed, and export-ready.' },
];

const PROCESS = [
  { step: '01', heading: 'BRIEF & CONCEPT',  body: 'We extract the story worth telling. A tight creative brief prevents expensive reshoots.' },
  { step: '02', heading: 'PRE-PRODUCTION',   body: 'Storyboards, shot lists, location scouting, talent casting — everything locked before a camera moves.' },
  { step: '03', heading: 'PRODUCTION',        body: 'Senior crew, own equipment, no agency markup. We run tight sets and hit schedules.' },
  { step: '04', heading: 'POST & DELIVERY',  body: 'Grade, mix, VFX, and format for every platform — delivered within agreed timelines, every time.' },
];

const formatTime = (s) => {
  if (!Number.isFinite(s) || s <= 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const MEDIA_ITEMS = [
  { type: 'image', src: '/crousel/IMG_1812.JPG',        alt: 'Production still 1' },
  { type: 'image', src: '/crousel/IMG_1813.JPG',        alt: 'Production still 2' },
  { type: 'video', src: '/crousel/30%20Oct%202025.mp4', alt: 'Production video 1' },
  { type: 'video', src: '/crousel/IMG_9527.MOV',        alt: 'Production video 2' },
];

/* ─── FONT / COLOR TOKENS ────────────────────────────────── */
const FD = "'Cormorant Garamond', serif";   // editorial serif display
const FB = "'Plus Jakarta Sans', sans-serif"; // clean body
const FM = "'Space Mono', monospace";

const WHITE = '#FFFFFF';
const BLACK = '#0A0A0A';
const LIGHT = '#F4F4F2';  // barely-off-white for alternate sections
const MID   = '#E8E8E6';  // light rule / border
const GREY  = 'rgba(10,10,10,0.42)';

/* ─── COMPONENT ──────────────────────────────────────────── */
export default function ProductionPage() {
  const heroRef        = useRef(null);
  const videoRef       = useRef(null);
  const fitnessVideoRef= useRef(null);
  const momentsVideoRef= useRef(null);
  const activeVideoRef = useRef(null);
  const mediaVideoRefs = useRef([]);
  const offerRef       = useRef(null);
  const specsRef       = useRef(null);
  const processRef     = useRef(null);
  const workRef        = useRef(null);
  const ctaRef         = useRef(null);
  const shotRef        = useRef(null);
  const sliderContainerRef = useRef(null);
  const sliderTweenRef     = useRef(null);
  const dragActiveRef      = useRef(false);
  const pointerStartXRef   = useRef(0);
  const scrollStartRef     = useRef(0);

  const [hoveredMedia, setHoveredMedia]           = useState(null);
  const [hoveredSectionVideo, setHoveredSectionVideo] = useState(null);
  const [momentsTime, setMomentsTime]             = useState(0);
  const [momentsDuration, setMomentsDuration]     = useState(0);
  const [activeVideo, setActiveVideo]             = useState(null);
  const [hoveredOffer, setHoveredOffer]           = useState(null);

  /* ── Auto-play hero video */
  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = true; v.loop = true; v.preload = 'auto'; v.play().catch(() => {}); }

    const ctx = gsap.context(() => {
      /* Hero text entrance */
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.14, ease: 'power3.out', delay: 0.2 }
      );

      /* Offerings */
      gsap.fromTo(offerRef.current?.querySelectorAll('.offer-row') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: offerRef.current, start: 'top 75%' } }
      );

      /* Specs counter */
      (specsRef.current?.querySelectorAll('.spec-num') ?? []).forEach((el) => {
        const target = parseFloat(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || '';
        gsap.fromTo({ val: 0 }, { val: target }, {
          val: target, duration: 1.8, ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix; },
          scrollTrigger: { trigger: specsRef.current, start: 'top 80%', once: true },
        });
      });
      gsap.fromTo(specsRef.current?.querySelectorAll('.spec-col') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: specsRef.current, start: 'top 80%' } }
      );

      /* Process */
      gsap.fromTo(processRef.current?.querySelectorAll('.proc-step') ?? [],
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 75%' } }
      );

      /* Shot cards */
      gsap.fromTo(shotRef.current?.querySelectorAll('.shot-card') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power2.out',
          scrollTrigger: { trigger: shotRef.current, start: 'top 80%' } }
      );

      /* Work cards */
      gsap.fromTo(workRef.current?.querySelectorAll('.work-card') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.13, ease: 'power2.out',
          scrollTrigger: { trigger: workRef.current, start: 'top 75%' } }
      );

      /* CTA */
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── Auto-scroll gallery */
  useEffect(() => {
    const container = sliderContainerRef.current;
    if (!container) return;
    const startAutoSlide = () => {
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) container.scrollLeft = 0;
      const remaining = maxScroll - container.scrollLeft;
      const duration  = Math.max(10, (remaining / maxScroll) * 40);
      sliderTweenRef.current = gsap.to(container, {
        scrollLeft: maxScroll, duration, ease: 'none',
        onComplete: () => { container.scrollLeft = 0; startAutoSlide(); },
      });
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { const v = e.target; e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }),
      { root: container, threshold: 0.5 }
    );
    mediaVideoRefs.current.forEach((v) => { if (v) observer.observe(v); });
    startAutoSlide();
    return () => { sliderTweenRef.current?.kill(); observer.disconnect(); };
  }, []);

  /* ── Section video auto-play */
  useEffect(() => {
    const vids = [fitnessVideoRef.current, momentsVideoRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause(); }),
      { threshold: 0.5 }
    );
    vids.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  /* ── Moments time tracking */
  useEffect(() => {
    const v = momentsVideoRef.current;
    if (!v) return;
    const onMeta = () => { setMomentsDuration(v.duration || 0); setMomentsTime(v.currentTime || 0); };
    const onTime = () => setMomentsTime(v.currentTime || 0);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('timeupdate', onTime);
    return () => { v.removeEventListener('loadedmetadata', onMeta); v.removeEventListener('timeupdate', onTime); };
  }, []);

  /* ─────────────────────────────────────────────────────── */
  return (
    <div style={{
      background: WHITE, color: BLACK,
      fontFamily: FB,
      '--font-display': FD,
      '--font-body':    FB,
      '--font-mono':    FM,
      overflowX: 'hidden',
    }}>

      {/* ══════════════════════════════════════════════════════ */}
      {/* HERO — full-bleed cinematic video, stark white text   */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        overflow: 'hidden', color: WHITE,
        background: BLACK,
      }}>
        {/* Video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video ref={videoRef} autoPlay muted loop playsInline preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.38) grayscale(0.15)' }}>
            <source src="/13026224-hd_960_720_60fps.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
        </div>

        {/* Thin top rule */}
        <div className="anim" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.12)', zIndex: 3 }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,6vw,80px) clamp(24px,6vw,80px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
          {/* Eyebrow */}
          <div className="anim" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <span style={{ width: '48px', height: '1px', background: WHITE, display: 'inline-block', opacity: 0.6 }} />
            <span style={{ fontFamily: FM, fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Production Studio
            </span>
          </div>

          {/* Giant serif headline */}
          <h1 className="anim" style={{
            fontFamily: FD,
            fontSize: 'clamp(72px, 11vw, 160px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 0.88,
            margin: '0 0 48px',
            color: WHITE,
            fontStyle: 'italic',
          }}>
            We Create<br />
            Content<br />
            <span style={{ fontStyle: 'normal', fontWeight: 300 }}>That Earns.</span>
          </h1>

          {/* Sub-row */}
          <div className="anim" style={{ display: 'flex', gap: '48px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <p style={{
              fontFamily: FB, fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.85, color: 'rgba(255,255,255,0.62)',
              maxWidth: '440px', margin: 0,
            }}>
              Video and motion production without the bloat. Concept through delivery — senior crew, own equipment, no outsourcing, no excuses.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/consult" style={{
                fontFamily: FM, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
                color: BLACK, background: WHITE, padding: '16px 32px', textDecoration: 'none', fontWeight: 700,
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#ddd'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = WHITE; }}
              >
                BRIEF US →
              </Link>
              <a href="#work-section" style={{
                fontFamily: FM, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
                color: WHITE, border: '1px solid rgba(255,255,255,0.35)', padding: '16px 32px', textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = WHITE; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'transparent'; }}
              >
                SEE OUR WORK ↓
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="anim" style={{ position: 'absolute', bottom: '48px', right: 'clamp(24px,6vw,80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: 0.38 }}>
            <span style={{ fontFamily: FM, fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', writingMode: 'vertical-rl', color: WHITE }}>SCROLL</span>
            <div style={{ width: '1px', height: '52px', background: WHITE }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SPECS — pure black band, oversized white numerals     */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={specsRef} style={{ background: BLACK, padding: '0 clamp(24px,6vw,80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
          {SPECS.map(({ value, label }) => {
            const num    = parseFloat(value);
            const suffix = value.replace(/[\d.]/g, '');
            return (
              <div key={label} className="spec-col" style={{
                padding: '52px 32px',
                borderRight: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div className="spec-num" data-target={num} data-suffix={suffix} style={{
                  fontFamily: FD,
                  fontSize: 'clamp(44px,5.5vw,80px)',
                  fontWeight: 700, letterSpacing: '-0.04em',
                  lineHeight: 1, color: WHITE,
                  fontStyle: 'italic',
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: FM, fontSize: '9px',
                  letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)',
                  marginTop: '10px', textTransform: 'uppercase',
                }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* OFFERINGS — white, clean numbered list               */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={offerRef} style={{ background: WHITE, padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderTop: `1px solid ${MID}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GREY, marginBottom: '20px' }}>
              — What We Produce
            </div>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(44px,6vw,88px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em', margin: 0, lineHeight: 0.9, color: BLACK }}>
              Our<br />Offerings.
            </h2>
          </div>
          <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: GREY, maxWidth: '340px', margin: 0 }}>
            Everything in-house — concept, crew, equipment, edit, delivery. Zero agency markup, zero compromises.
          </p>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${MID}` }}>
          {OFFERINGS.map(({ index, title, desc, tags }, i) => (
            <div key={index} className="offer-row"
              onMouseEnter={() => setHoveredOffer(i)}
              onMouseLeave={() => setHoveredOffer(null)}
              style={{
                display: 'grid', gridTemplateColumns: '80px 1fr auto',
                gap: '32px', padding: 'clamp(28px,4vw,44px) 0',
                borderBottom: `1px solid ${MID}`,
                alignItems: 'center', cursor: 'default',
                background: hoveredOffer === i ? LIGHT : WHITE,
                transition: 'background 0.3s',
              }}
            >
              {/* Index */}
              <span style={{
                fontFamily: FD, fontSize: 'clamp(28px,3vw,48px)',
                fontWeight: 300, fontStyle: 'italic',
                color: hoveredOffer === i ? BLACK : MID,
                transition: 'color 0.3s', lineHeight: 1,
              }}>{index}</span>

              {/* Content */}
              <div>
                <div style={{
                  fontFamily: FD, fontSize: 'clamp(24px,3vw,42px)',
                  fontWeight: 700, fontStyle: 'italic',
                  letterSpacing: '-0.02em', color: BLACK,
                  marginBottom: '10px', lineHeight: 1,
                }}>{title}</div>
                <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.8, color: GREY, margin: 0, maxWidth: '520px' }}>{desc}</p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '220px' }}>
                {tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: FM, fontSize: '8px', letterSpacing: '0.12em',
                    color: hoveredOffer === i ? WHITE : GREY,
                    background: hoveredOffer === i ? BLACK : 'transparent',
                    border: `1px solid ${hoveredOffer === i ? BLACK : MID}`,
                    padding: '5px 10px', textTransform: 'uppercase',
                    transition: 'all 0.25s',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* FITNESS VIDEO — full-bleed, dark                     */}
      {/* ══════════════════════════════════════════════════════ */}
      <section style={{ background: BLACK, padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', maxHeight: '90vh' }}>
          <video ref={fitnessVideoRef} controls playsInline preload="metadata"
            onMouseEnter={() => setHoveredSectionVideo('fitness')}
            onMouseLeave={() => setHoveredSectionVideo(null)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: BLACK }}
          >
            <source src="/2d%20fitness/2D%20VIDEO.mp4" type="video/mp4" />
          </video>
          {/* Label overlay */}
          <div style={{ position: 'absolute', top: '36px', left: '40px', zIndex: 2, pointerEvents: 'none' }}>
            <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
              — Featured Work
            </div>
            <div style={{ fontFamily: FD, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(22px,3vw,44px)', color: WHITE, textShadow: '0 4px 32px rgba(0,0,0,0.9)' }}>
              2D Fitness
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', pointerEvents: 'none', zIndex: 1 }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SHOT FRAME — light grey, 3 capability columns        */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={shotRef} style={{ background: LIGHT, padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderTop: `1px solid ${MID}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GREY, marginBottom: '20px' }}>
              — Shot Frame
            </div>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(40px,5.5vw,80px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em', margin: 0, lineHeight: 0.9, color: BLACK }}>
              Every Frame<br />Counts.
            </h2>
          </div>
          <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: GREY, maxWidth: '300px', margin: 0 }}>
            Clear direction, polished craft. From the first shot list to the final colour grade.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: MID }}>
          {SHOTS.map(({ title, desc }, idx) => (
            <div key={title} className="shot-card"
              style={{ padding: 'clamp(36px,4.5vw,56px)', background: LIGHT, cursor: 'default', transition: 'background 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = WHITE; e.currentTarget.querySelector('.shot-num').style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = LIGHT; e.currentTarget.querySelector('.shot-num').style.opacity = '0.07'; }}
            >
              <div className="shot-num" style={{
                fontFamily: FM, fontSize: '72px', fontWeight: 700,
                lineHeight: 1, color: BLACK, opacity: 0.07,
                marginBottom: '28px', transition: 'opacity 0.3s', letterSpacing: '-0.04em',
              }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontFamily: FD, fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.01em', color: BLACK, margin: '0 0 14px' }}>
                {title}
              </h3>
              <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: GREY, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* MOMENTS VIDEO                                        */}
      {/* ══════════════════════════════════════════════════════ */}
      <section style={{ background: BLACK, padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', maxHeight: '90vh' }}>
          <video ref={momentsVideoRef} controls playsInline preload="metadata"
            poster="/precious/image.png"
            onMouseEnter={() => setHoveredSectionVideo('moments')}
            onMouseLeave={() => setHoveredSectionVideo(null)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: BLACK }}
          >
            <source src="/precious/Anniversary%20Main.mp4" type="video/mp4" />
          </video>
          {momentsDuration > 0 && (
            <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)', width: 'calc(100% - 80px)', zIndex: 4, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="range" min="0" max={momentsDuration} step="0.05" value={momentsTime}
                onChange={(e) => { const t = Number(e.target.value); if (momentsVideoRef.current) momentsVideoRef.current.currentTime = t; setMomentsTime(t); }}
                style={{ width: '100%', appearance: 'none', height: '2px', background: 'rgba(255,255,255,0.18)', outline: 'none', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: FM, letterSpacing: '0.08em' }}>
                <span>{formatTime(momentsTime)}</span>
                <span>{formatTime(momentsDuration)}</span>
              </div>
            </div>
          )}
          <div style={{ position: 'absolute', top: '36px', left: '40px', zIndex: 2, pointerEvents: 'none' }}>
            <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>— Featured Work</div>
            <div style={{ fontFamily: FD, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(20px,2.5vw,38px)', color: WHITE, textShadow: '0 4px 32px rgba(0,0,0,0.9)' }}>
              We Capture Moments
            </div>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)', pointerEvents: 'none', zIndex: 1 }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* PROCESS — white, clean two-column                    */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={processRef} style={{ background: WHITE, padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderTop: `1px solid ${MID}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GREY, marginBottom: '20px' }}>
              — Our Process
            </div>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(40px,5vw,72px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em', margin: '0 0 24px', lineHeight: 0.9, color: BLACK }}>
              How a<br />Shoot Runs.
            </h2>
            <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: GREY, margin: 0 }}>
              Four stages. Zero surprises. We keep you informed at every step.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${MID}` }}>
            {PROCESS.map(({ step, heading, body }, i) => (
              <div key={step} className="proc-step" style={{
                display: 'grid', gridTemplateColumns: '52px 1fr',
                gap: '24px', padding: '36px 0',
                borderBottom: i < PROCESS.length - 1 ? `1px solid ${MID}` : 'none',
                alignItems: 'start',
              }}>
                <span style={{ fontFamily: FM, fontSize: '13px', fontWeight: 700, color: MID, lineHeight: 1, letterSpacing: '-0.02em' }}>{step}</span>
                <div>
                  <div style={{ fontFamily: FD, fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.01em', color: BLACK, marginBottom: '10px' }}>
                    {heading}
                  </div>
                  <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: GREY, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* GALLERY — off-white, draggable slider                */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id="work-section" ref={workRef} style={{ background: LIGHT, padding: 'clamp(80px,10vw,120px) 0', borderTop: `1px solid ${MID}`, overflow: 'hidden' }}>
        <div style={{ padding: '0 clamp(24px,6vw,80px)', marginBottom: '48px' }}>
          <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GREY, marginBottom: '20px' }}>
            — Portfolio
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,72px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em', margin: 0, lineHeight: 0.9, color: BLACK }}>
              A Brief<br />Glimpse.
            </h2>
            <p style={{ fontFamily: FB, fontSize: '14px', lineHeight: 1.85, color: GREY, maxWidth: '260px', margin: 0 }}>
              Drag to explore our recent work across film, motion, and commercial content.
            </p>
          </div>
        </div>

        <div ref={sliderContainerRef} className="hide-scrollbar"
          style={{ overflowX: 'auto', overflowY: 'hidden', position: 'relative', padding: '0 clamp(24px,6vw,80px) 32px', cursor: 'grab', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => { sliderTweenRef.current?.pause(); }}
          onMouseLeave={() => { if (!dragActiveRef.current) sliderTweenRef.current?.resume(); }}
          onWheel={(e) => { const c = sliderContainerRef.current; if (c) { c.scrollLeft += e.deltaY; e.preventDefault(); } }}
          onPointerDown={(e) => {
            const c = sliderContainerRef.current; if (!c) return;
            if (e.target.closest('video') || e.target.closest('button')) return;
            dragActiveRef.current = true; pointerStartXRef.current = e.clientX; scrollStartRef.current = c.scrollLeft;
            sliderTweenRef.current?.pause(); c.setPointerCapture(e.pointerId); c.style.cursor = 'grabbing';
          }}
          onPointerMove={(e) => { if (!dragActiveRef.current) return; const c = sliderContainerRef.current; if (c) c.scrollLeft = scrollStartRef.current + (pointerStartXRef.current - e.clientX); }}
          onPointerUp={(e) => { dragActiveRef.current = false; const c = sliderContainerRef.current; if (c) { c.releasePointerCapture?.(e.pointerId); c.style.cursor = 'grab'; } sliderTweenRef.current?.resume(); }}
          onPointerCancel={(e) => { dragActiveRef.current = false; const c = sliderContainerRef.current; if (c) { c.releasePointerCapture?.(e.pointerId); c.style.cursor = 'grab'; } sliderTweenRef.current?.resume(); }}
        >
          <div style={{ display: 'flex', gap: '2px', width: 'max-content' }}>
            {(() => {
              mediaVideoRefs.current = [];
              return [...MEDIA_ITEMS, ...MEDIA_ITEMS].map((item, i) => {
                const isHov = hoveredMedia === i;
                return (
                  <div key={`${item.src}-${i}`} className="work-card"
                    style={{
                      flex: '0 0 auto',
                      width: 'clamp(280px,26vw,400px)', height: 'clamp(340px,32vw,480px)',
                      overflow: 'hidden', position: 'relative', background: MID,
                      transform: isHov ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.35s ease', cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredMedia(i)}
                    onMouseLeave={() => setHoveredMedia(null)}
                  >
                    {item.type === 'image' ? (
                      <img src={item.src} alt={item.alt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: isHov ? 'scale(1.06)' : 'scale(1)', filter: 'grayscale(0.12)' }} />
                    ) : (
                      <video ref={(el) => { mediaVideoRefs.current[i] = el; }}
                        src={item.src} muted loop playsInline preload="metadata"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onMouseEnter={() => { setHoveredMedia(i); sliderTweenRef.current?.pause(); }}
                        onMouseLeave={() => { sliderTweenRef.current?.resume(); }}
                      />
                    )}
                    {/* Hover overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: isHov ? 'rgba(0,0,0,0.38)' : 'transparent',
                      transition: 'background 0.3s',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px',
                    }}>
                      {isHov && item.type === 'image' && (
                        <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: WHITE }}>VIEW →</div>
                      )}
                    </div>
                    {/* Video play button */}
                    {item.type === 'video' && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                        <button type="button"
                          onClick={(e) => { e.stopPropagation(); setActiveVideo(item); sliderTweenRef.current?.pause(); }}
                          style={{
                            pointerEvents: 'auto', width: '52px', height: '52px', borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.3)',
                            color: WHITE, fontSize: '18px',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', opacity: isHov ? 1 : 0.5, transition: 'opacity 0.2s',
                          }}>▶</button>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* Video lightbox */}
      {activeVideo && (
        <div onClick={() => { activeVideoRef.current?.pause(); activeVideoRef.current && (activeVideoRef.current.currentTime = 0); setActiveVideo(null); }}
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.96)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '1100px', overflow: 'hidden', background: BLACK, position: 'relative' }}>
            <button type="button" onClick={() => setActiveVideo(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', background: 'rgba(0,0,0,0.5)', color: WHITE, width: '44px', height: '44px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ×
            </button>
            <video ref={activeVideoRef} src={activeVideo.src} controls autoPlay playsInline
              style={{ width: '100%', height: 'calc(100vh - 120px)', maxHeight: '820px', objectFit: 'contain', background: BLACK }} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/* CTA — pure black, serif italic headline               */}
      {/* ══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{ background: BLACK, position: 'relative', overflow: 'hidden' }}>
        {/* Ghost background text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: FD, fontSize: 'clamp(80px,15vw,240px)',
          fontWeight: 700, fontStyle: 'italic',
          letterSpacing: '-0.04em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>
          Let's Talk
        </div>
        {/* Top rule */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.08)' }} />

        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <div style={{ fontFamily: FM, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
              — Start a Project
            </div>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(44px,6.5vw,96px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.03em', margin: 0, lineHeight: 0.88, color: WHITE }}>
              Got a Story<br /><span style={{ fontWeight: 300 }}>to Tell?</span>
            </h2>
          </div>
          <Link to="/consult" style={{
            fontFamily: FM, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: BLACK, background: WHITE, padding: '20px 48px', textDecoration: 'none', fontWeight: 700,
            transition: 'all 0.25s ease', display: 'inline-block',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#ddd'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = WHITE; }}
          >
            LET'S TALK →
          </Link>
        </div>
      </section>
    </div>
  );
}
