import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const OFFERINGS = [
  { index: '01', title: 'Video Production', desc: 'Brand films, product demos, testimonials, and social content. Scripted, shot, and edited in-house — no outsourcing.', tags: ['Brand Film', 'Product Demo', 'Testimonial', 'Social'] },
  { index: '02', title: 'Motion & Animation', desc: '2D motion graphics, kinetic typography, and animated explainers that carry your message without a word.', tags: ['Motion Graphics', 'After Effects', 'Lottie', 'Explainer'] },
  { index: '03', title: 'Creative Direction', desc: 'Visual language, shot lists, storyboards, and art direction. We set the tone so every frame feels intentional.', tags: ['Art Direction', 'Storyboard', 'Mood Board', 'Casting'] },
  { index: '04', title: 'Post-Production', desc: 'Colour grading, audio mix, VFX, and delivery-ready exports across all platforms and aspect ratios.', tags: ['Colour Grade', 'Audio Mix', 'VFX', 'DaVinci Resolve'] },
];

const SPECS = [
  { value: '4K', label: 'Minimum Resolution' },
  { value: '48+', label: 'Films Produced' },
  { value: '12', label: 'Crew Members' },
  { value: '3', label: 'Studio Cities' },
];

const SHOTS = [
  { title: 'On-Set Direction', desc: 'We lock the mood, framing, and pacing before a single take. Every shot must earn its place in the edit.' },
  { title: 'Lighting & VFX', desc: 'Practical lighting, subtle effects, and clean compositing that make content feel premium without slowing production.' },
  { title: 'Delivery Ready', desc: 'Native formats for social, web, and broadcast — all color graded, sound mixed, and export-ready.' },
];

const PROCESS = [
  { step: '01', heading: 'BRIEF & CONCEPT', body: 'We extract the story worth telling. A tight creative brief prevents expensive reshoots.' },
  { step: '02', heading: 'PRE-PRODUCTION', body: 'Storyboards, shot lists, location scouting, talent casting — everything locked before a camera moves.' },
  { step: '03', heading: 'PRODUCTION', body: 'Senior crew, own equipment, no agency markup. We run tight sets and hit schedules.' },
  { step: '04', heading: 'POST & DELIVERY', body: 'Grade, mix, VFX, and format for every platform — delivered within agreed timelines, every time.' },
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MEDIA_ITEMS = [
  { type: 'image', src: '/crousel/IMG_1812.JPG', alt: 'Production still 1' },
  { type: 'image', src: '/crousel/IMG_1813.JPG', alt: 'Production still 2' },
  { type: 'video', src: '/crousel/30%20Oct%202025.mp4', alt: 'Production video 1' },
  { type: 'video', src: '/crousel/IMG_9527.MOV', alt: 'Production video 2' },
];

export default function ProductionPage() {
  const heroRef    = useRef(null);
  const videoRef   = useRef(null);
  const fitnessVideoRef = useRef(null);
  const momentsVideoRef = useRef(null);
  const activeVideoRef = useRef(null);
  const mediaVideoRefs = useRef([]);
  const offerRef   = useRef(null);
  const specsRef   = useRef(null);
  const processRef = useRef(null);
  const workRef    = useRef(null);
  const ctaRef     = useRef(null);
  const shotRef    = useRef(null);
  const [hoveredMedia, setHoveredMedia] = useState(null);
  const [hoveredSectionVideo, setHoveredSectionVideo] = useState(null);
  const [momentsTime, setMomentsTime] = useState(0);
  const [momentsDuration, setMomentsDuration] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredOffer, setHoveredOffer] = useState(null);
  const sliderContainerRef = useRef(null);
  const sliderTweenRef = useRef(null);
  const dragActiveRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const scrollStartRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.loop = true;
      video.preload = 'auto';
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {});
      }
    }

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power3.out', delay: 0.2 });

      // Offerings
      gsap.fromTo(offerRef.current?.querySelectorAll('.offer-row') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: offerRef.current, start: 'top 75%' } });

      // Specs counter animation
      const specEls = specsRef.current?.querySelectorAll('.spec-num') ?? [];
      specEls.forEach((el) => {
        const target = parseFloat(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || '';
        gsap.fromTo({ val: 0 }, { val: target }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          },
          scrollTrigger: { trigger: specsRef.current, start: 'top 80%', once: true },
        });
      });

      gsap.fromTo(specsRef.current?.querySelectorAll('.spec-col') ?? [],
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: specsRef.current, start: 'top 80%' } });

      gsap.fromTo(processRef.current?.querySelectorAll('.proc-step') ?? [],
        { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 75%' } });

      gsap.fromTo(shotRef.current?.querySelectorAll('.shot-card') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power2.out',
          scrollTrigger: { trigger: shotRef.current, start: 'top 80%' } });

      gsap.fromTo(workRef.current?.querySelectorAll('.work-card') ?? [],
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.13, ease: 'power2.out',
          scrollTrigger: { trigger: workRef.current, start: 'top 75%' } });

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = sliderContainerRef.current;
    if (!container) return;

    const startAutoSlide = () => {
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) container.scrollLeft = 0;
      const remaining = maxScroll - container.scrollLeft;
      const duration = Math.max(10, (remaining / maxScroll) * 40);
      sliderTweenRef.current = gsap.to(container, {
        scrollLeft: maxScroll,
        duration,
        ease: 'none',
        onComplete: () => { container.scrollLeft = 0; startAutoSlide(); },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { root: container, threshold: 0.5 }
    );
    mediaVideoRefs.current.forEach((video) => { if (video) observer.observe(video); });
    startAutoSlide();
    return () => {
      if (sliderTweenRef.current) sliderTweenRef.current.kill();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionVideos = [fitnessVideoRef.current, momentsVideoRef.current].filter(Boolean);
    if (!sectionVideos.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.play().catch(() => {});
          else entry.target.pause();
        });
      },
      { threshold: 0.5 }
    );
    sectionVideos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = momentsVideoRef.current;
    if (!video) return;
    const handleLoadedMetadata = () => { setMomentsDuration(video.duration || 0); setMomentsTime(video.currentTime || 0); };
    const handleTimeUpdate = () => setMomentsTime(video.currentTime || 0);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div style={{
      background: '#F5F2EB',
      position: 'relative',
      color: '#0A0A0A',
      '--font-display': "'Cinzel', serif",
      '--font-body': "'Plus Jakarta Sans', sans-serif",
      '--font-mono': "'Space Mono', monospace",
      fontFamily: 'var(--font-body)',
    }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', color: '#fff' }}
      >
        {/* Full-bleed background video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45) saturate(1.15)' }}
          >
            <source src="/Curtain_opening_zoomout_animation_202606112331.mp4" type="video/mp4" />
          </video>
          {/* Gradient vignette */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
        </div>

        {/* Hero content — bottom-anchored like APE Media */}
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,6vw,80px) clamp(24px,6vw,80px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
          {/* Eyebrow */}
          <div className="anim" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <span style={{ display: 'inline-block', width: '40px', height: '1px', background: '#C8F135' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8F135' }}>
              Production Studio
            </span>
          </div>

          {/* Giant headline */}
          <h1 className="anim" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 10vw, 148px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.88,
            margin: '0 0 40px',
            color: '#fff',
          }}>
            WE CREATE<br />
            CONTENT<br />
            <span style={{ color: '#C8F135', WebkitTextStroke: '0px', display: 'inline-block' }}>THAT EARNS.</span>
          </h1>

          {/* Subtitle + CTA row */}
          <div className="anim" style={{ display: 'flex', gap: '48px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '480px',
              margin: 0,
            }}>
              Video and motion production without the bloat. Concept through delivery — senior crew, own equipment, no outsourcing, no excuses.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/consult"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#080808', background: '#C8F135', padding: '16px 32px', textDecoration: 'none',
                  transition: 'opacity 0.2s, transform 0.2s', fontWeight: 600,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                BRIEF US →
              </Link>
              <a href="#work-section"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '16px 32px', textDecoration: 'none',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C8F135'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                SEE OUR WORK ↓
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="anim" style={{ position: 'absolute', bottom: '40px', right: 'clamp(24px,6vw,80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: 0.5 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>SCROLL</span>
            <div style={{ width: '1px', height: '48px', background: '#fff' }} />
          </div>
        </div>
      </section>

      {/* ── SPECS BAR ─────────────────────────────────────────── */}
      <section
        ref={specsRef}
        style={{ background: '#C8F135', padding: '0 clamp(24px,6vw,80px)' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
          {SPECS.map(({ value, label }, i) => {
            const num = parseFloat(value);
            const suffix = value.replace(/[\d.]/g, '');
            return (
              <div
                key={label}
                className="spec-col"
                style={{
                  padding: '40px 32px',
                  borderRight: '1px solid rgba(0,0,0,0.12)',
                  borderBottom: 'none',
                }}
              >
                <div
                  className="spec-num"
                  data-target={num}
                  data-suffix={suffix}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px,4vw,64px)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: '#080808',
                  }}
                >
                  {value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: 'rgba(8,8,8,0.6)',
                  marginTop: '8px',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── OFFERINGS ─────────────────────────────────────────── */}
      <section
        ref={offerRef}
        style={{ background: '#FFFFFF', padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00' }}>What We Produce</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,72px)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, lineHeight: 0.9, color: '#0A0A0A' }}>
              OUR<br />OFFERINGS.
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.75, color: 'rgba(0,0,0,0.5)', maxWidth: '360px', margin: 0 }}>
            Everything in-house — concept, crew, equipment, edit, delivery. Zero agency markup, zero compromises.
          </p>
        </div>

        {/* Offering rows — APE Media numbered list style */}
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          {OFFERINGS.map(({ index, title, desc, tags }, i) => (
            <div
              key={index}
              className="offer-row"
              onMouseEnter={() => setHoveredOffer(i)}
              onMouseLeave={() => setHoveredOffer(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr auto',
                gap: '32px',
                padding: 'clamp(28px,4vw,44px) 0',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                alignItems: 'center',
                cursor: 'default',
                transition: 'background 0.25s',
                background: hoveredOffer === i ? 'rgba(200,241,53,0.15)' : 'transparent',
              }}
            >
              {/* Index */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(28px,3vw,48px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: hoveredOffer === i ? '#9AB825' : 'rgba(0,0,0,0.12)',
                transition: 'color 0.25s',
                lineHeight: 1,
              }}>
                {index}
              </span>
              {/* Content */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px,2.8vw,38px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                  marginBottom: '10px',
                  lineHeight: 1,
                }}>
                  {title}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', margin: 0, maxWidth: '520px' }}>
                  {desc}
                </p>
              </div>
              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '220px' }}>
                {tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    color: hoveredOffer === i ? '#fff' : 'rgba(0,0,0,0.5)',
                    background: hoveredOffer === i ? '#0A0A0A' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${hoveredOffer === i ? '#0A0A0A' : 'rgba(0,0,0,0.12)'}`,
                    padding: '5px 10px',
                    textTransform: 'uppercase',
                    transition: 'all 0.25s',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2D FITNESS VIDEO ──────────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: '0' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', maxHeight: '90vh' }}>
          <video
            ref={fitnessVideoRef}
            controls
            playsInline
            preload="metadata"
            onMouseEnter={() => setHoveredSectionVideo('fitness')}
            onMouseLeave={() => setHoveredSectionVideo(null)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }}
          >
            <source src="/2d%20fitness/2D%20VIDEO.mp4" type="video/mp4" />
          </video>
          {/* Overlay label */}
          <div style={{ position: 'absolute', top: '36px', left: '40px', zIndex: 2, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#C8F135' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8F135' }}>Featured Work</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px,3vw,42px)', textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#fff', textShadow: '0 4px 32px rgba(0,0,0,0.8)' }}>
              2D FITNESS
            </div>
          </div>
          {/* Dark gradient at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', pointerEvents: 'none', zIndex: 1 }} />
        </div>
      </section>

      {/* ── SHOT FRAME (Capabilities) ─────────────────────────── */}
      <section
        ref={shotRef}
        style={{ background: '#F5F2EB', padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00' }}>Shot Frame</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, lineHeight: 0.9, color: '#0A0A0A' }}>
              EVERY FRAME<br /><span style={{ color: '#7A9A00' }}>COUNTS.</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: 'rgba(0,0,0,0.45)', maxWidth: '320px', margin: 0 }}>
            Clear direction, polished craft. From the first shot list to the final colour grade.
          </p>
        </div>

        {/* 3-column capability cards — APE Media style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {SHOTS.map(({ title, desc }, idx) => (
            <div
              key={title}
              className="shot-card"
              style={{
                padding: 'clamp(32px,4vw,52px)',
                background: '#fff',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.shot-num').style.color = '#C8F135';
                e.currentTarget.style.background = '#F0EDE6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.shot-num').style.color = 'rgba(0,0,0,0.07)';
                e.currentTarget.style.background = '#fff';
              }}
            >
              <div
                className="shot-num"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '80px',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'rgba(0,0,0,0.07)',
                  marginBottom: '24px',
                  transition: 'color 0.3s',
                  letterSpacing: '-0.04em',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px,2vw,26px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                margin: '0 0 14px',
              }}>
                {title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', margin: 0 }}>
                {desc}
              </p>
              {/* Accent bottom line */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'transparent', transition: 'background 0.3s' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── WE CAPTURE MOMENTS VIDEO ─────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: '0' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', maxHeight: '90vh' }}>
          <video
            ref={momentsVideoRef}
            controls
            playsInline
            preload="metadata"
            poster="/precious/image.png"
            onMouseEnter={() => setHoveredSectionVideo('moments')}
            onMouseLeave={() => setHoveredSectionVideo(null)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#000' }}
          >
            <source src="/precious/Anniversary%20Main.mp4" type="video/mp4" />
          </video>

          {momentsDuration > 0 && (
            <div style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)', width: 'calc(100% - 80px)', zIndex: 4, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="range"
                min="0"
                max={momentsDuration}
                step="0.05"
                value={momentsTime}
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  if (momentsVideoRef.current) momentsVideoRef.current.currentTime = newTime;
                  setMomentsTime(newTime);
                }}
                style={{ width: '100%', appearance: 'none', height: '4px', borderRadius: '999px', background: 'rgba(255,255,255,0.16)', outline: 'none', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '12px', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                <span>{formatTime(momentsTime)}</span>
                <span>{formatTime(momentsDuration)}</span>
              </div>
            </div>
          )}

          {/* Overlay label */}
          <div style={{ position: 'absolute', top: '36px', left: '40px', zIndex: 2, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#C8F135' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8F135' }}>Featured Work</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,38px)', textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#fff', textShadow: '0 4px 32px rgba(0,0,0,0.8)' }}>
              WE CAPTURE MOMENTS
            </div>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)', pointerEvents: 'none', zIndex: 1 }} />
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section
        ref={processRef}
        style={{ background: '#FFFFFF', padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', flexWrap: 'wrap' }}>
          {/* Left: heading */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00' }}>Our Process</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 24px', lineHeight: 0.9, color: '#0A0A0A' }}>
              HOW A<br /><span style={{ color: '#7A9A00' }}>SHOOT RUNS.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: 'rgba(0,0,0,0.45)', margin: 0 }}>
              Four stages. Zero surprises. We keep you informed at every step.
            </p>
          </div>

          {/* Right: steps list */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            {PROCESS.map(({ step, heading, body }, i) => (
              <div
                key={step}
                className="proc-step"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr',
                  gap: '24px',
                  padding: '36px 0',
                  borderBottom: i < PROCESS.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                  alignItems: 'start',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(20px,2vw,28px)',
                  fontWeight: 700,
                  color: 'rgba(0,0,0,0.15)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}>
                  {step}
                </span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px,1.8vw,24px)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    color: '#0A0A0A',
                    marginBottom: '10px',
                  }}>
                    {heading}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', margin: 0 }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK / GALLERY ───────────────────────────────────── */}
      <section
        id="work-section"
        ref={workRef}
        style={{ background: '#F5F2EB', padding: 'clamp(80px,10vw,120px) 0', borderTop: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}
      >
        {/* Section header with side padding */}
        <div style={{ padding: '0 clamp(24px,6vw,80px)', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#7A9A00' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7A9A00' }}>Portfolio</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, lineHeight: 0.9, color: '#0A0A0A' }}>
              A BRIEF<br /><span style={{ color: '#7A9A00' }}>GLIMPSE.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.8, color: 'rgba(0,0,0,0.45)', maxWidth: '280px', margin: 0 }}>
              Drag to explore our recent work across film, motion, and commercial content.
            </p>
          </div>
        </div>

        {/* Draggable slider */}
        <div
          ref={sliderContainerRef}
          className="hide-scrollbar"
          style={{ overflowX: 'auto', overflowY: 'hidden', position: 'relative', padding: '0 clamp(24px,6vw,80px) 32px', cursor: 'grab', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => { if (sliderTweenRef.current) sliderTweenRef.current.pause(); }}
          onMouseLeave={() => { if (!dragActiveRef.current && sliderTweenRef.current) sliderTweenRef.current.resume(); }}
          onWheel={(e) => { const c = sliderContainerRef.current; if (c) { c.scrollLeft += e.deltaY; e.preventDefault(); } }}
          onPointerDown={(e) => {
            const c = sliderContainerRef.current;
            if (!c) return;
            if (e.target.closest('video') || e.target.closest('button')) return;
            dragActiveRef.current = true;
            pointerStartXRef.current = e.clientX;
            scrollStartRef.current = c.scrollLeft;
            if (sliderTweenRef.current) sliderTweenRef.current.pause();
            c.setPointerCapture(e.pointerId);
            c.style.cursor = 'grabbing';
          }}
          onPointerMove={(e) => {
            if (!dragActiveRef.current) return;
            const c = sliderContainerRef.current;
            if (c) c.scrollLeft = scrollStartRef.current + (pointerStartXRef.current - e.clientX);
          }}
          onPointerUp={(e) => {
            dragActiveRef.current = false;
            const c = sliderContainerRef.current;
            if (c) { c.releasePointerCapture?.(e.pointerId); c.style.cursor = 'grab'; }
            if (sliderTweenRef.current) sliderTweenRef.current.resume();
          }}
          onPointerCancel={(e) => {
            dragActiveRef.current = false;
            const c = sliderContainerRef.current;
            if (c) { c.releasePointerCapture?.(e.pointerId); c.style.cursor = 'grab'; }
            if (sliderTweenRef.current) sliderTweenRef.current.resume();
          }}
        >
          <div style={{ display: 'flex', gap: '16px', width: 'max-content' }}>
            {(() => {
              mediaVideoRefs.current = [];
              return [...MEDIA_ITEMS, ...MEDIA_ITEMS].map((item, i) => {
                const isHovered = hoveredMedia === i;
                return (
                  <div
                    key={`${item.src}-${i}`}
                    className="work-card"
                    style={{
                      flex: '0 0 auto',
                      width: 'clamp(280px,26vw,400px)',
                      height: 'clamp(340px,32vw,480px)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#ddd',
                      transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 0.35s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredMedia(i)}
                    onMouseLeave={() => setHoveredMedia(null)}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                      />
                    ) : (
                      <video
                        ref={(el) => { mediaVideoRefs.current[i] = el; }}
                        src={item.src}
                        muted loop playsInline preload="metadata"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onMouseEnter={() => { setHoveredMedia(i); if (sliderTweenRef.current) sliderTweenRef.current.pause(); }}
                        onMouseLeave={() => { if (sliderTweenRef.current) sliderTweenRef.current.resume(); }}
                      />
                    )}
                    {/* Hover overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: isHovered ? 'rgba(0,0,0,0.45)' : 'transparent',
                      transition: 'background 0.3s',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      padding: '24px',
                    }}>
                      {isHovered && item.type === 'image' && (
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8F135' }}>
                          VIEW →
                        </div>
                      )}
                    </div>
                    {/* Video play button */}
                    {item.type === 'video' && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideo(item);
                            if (sliderTweenRef.current) sliderTweenRef.current.pause();
                          }}
                          style={{
                            pointerEvents: 'auto',
                            display: 'inline-flex',
                            width: '56px', height: '56px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.7)',
                            background: 'rgba(0,0,0,0.4)',
                            color: '#fff', fontSize: '20px',
                            alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: isHovered ? 1 : 0.6,
                            transition: 'opacity 0.2s',
                          }}
                        >
                          ▶
                        </button>
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
        <div
          onClick={() => {
            if (activeVideoRef.current) { activeVideoRef.current.pause(); activeVideoRef.current.currentTime = 0; }
            setActiveVideo(null);
          }}
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.94)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', cursor: 'auto' }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '1100px', borderRadius: '4px', overflow: 'hidden', background: '#000', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 10, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', background: 'rgba(0,0,0,0.5)', color: '#fff', width: '44px', height: '44px', cursor: 'pointer', fontSize: '20px' }}
            >
              ×
            </button>
            <video
              ref={activeVideoRef}
              src={activeVideo.src}
              controls autoPlay playsInline
              style={{ width: '100%', height: 'calc(100vh - 120px)', maxHeight: '820px', objectFit: 'contain', background: '#000' }}
            />
          </div>
        </div>
      )}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        style={{ background: '#0A0A0A', borderTop: '1px solid rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Giant background text */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px,15vw,220px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}>
          LET'S TALK
        </div>

        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#C8F135' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8F135' }}>Start a Project</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,88px)', fontWeight: 700, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, lineHeight: 0.88, color: '#fff' }}>
              GOT A STORY<br /><span style={{ color: '#C8F135' }}>TO TELL?</span>
            </h2>
          </div>
          <Link to="/consult"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#080808', background: '#C8F135', padding: '20px 44px', textDecoration: 'none', fontWeight: 600,
              transition: 'opacity 0.2s, transform 0.2s', display: 'inline-block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            LET'S TALK →
          </Link>
        </div>
      </section>
    </div>
  );
}
