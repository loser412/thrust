import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

// ── Manual character splitter ─────────────────────────────────────────────
// Wraps each glyph in .char-wrap > .char-inner so GSAP can animate them
function SplitChars({ text }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span key={i} className="char-wrap" aria-hidden="true">
          <span className="char-inner">
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </>
  );
}

// ── Inline rotating pill ──────────────────────────────────────────────────
const PILL_TEXT = 'SINCE 2019 ✦ SINCE 2019 ✦ SINCE 2019 ✦ SINCE 2019 ✦ ';

function RotatingPill() {
  return (
    <span className="hero-pill" aria-label="Since 2019">
      <span className="pill-track">
        {/* Doubled so the seamless loop works */}
        <span className="pill-text">{PILL_TEXT}</span>
        <span className="pill-text">{PILL_TEXT}</span>
      </span>
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const videoRef = useRef(null);
  const labelRef   = useRef(null);
  const line1Ref   = useRef(null); // "BUILDING"
  const line2Ref   = useRef(null); // "WHAT [pill] MATTERS"
  const line3Ref   = useRef(null); // "FOR YOUR BRAND."
  const bodyRef    = useRef(null);
  const scrollRef  = useRef(null);
  const pillRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // ── Parallax background animation on scroll ───────────────────────
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom center',
            scrub: 1.2,
            markers: false,
          },
        });
      }

      // ── 1. Section label ──────────────────────────────────────────────
      tl.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );

      // ── 2. "BUILDING" chars ───────────────────────────────────────────
      tl.fromTo(
        line1Ref.current?.querySelectorAll('.char-inner'),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.018 },
        0.35
      );

      // ── 3. "WHAT … MATTERS" chars + pill ─────────────────────────────
      tl.fromTo(
        line2Ref.current?.querySelectorAll('.char-inner'),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.018 },
        0.47
      );
      tl.fromTo(
        pillRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)', transformOrigin: 'left center' },
        0.6
      );

      // ── 4. "FOR YOUR BRAND." chars ────────────────────────────────────
      tl.fromTo(
        line3Ref.current?.querySelectorAll('.char-inner'),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.015 },
        0.59
      );

      // ── 5. Body paragraph ─────────────────────────────────────────────
      tl.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.85
      );

      // ── 6. Scroll indicator ───────────────────────────────────────────
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.1
      );
    }, sectionRef);

    // Ensure the background video plays (muted) and resume on visibility/focus
    const vid = videoRef.current;
    const tryPlay = () => {
      if (!vid) return;
      try {
        vid.muted = true;
        const p = vid.play();
        if (p && p.catch) p.catch(() => {
          // ignore play errors (autoplay policies), will retry on interaction
        });
      } catch (e) {
        // swallow
      }
    };

    tryPlay();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tryPlay();
    });
    window.addEventListener('focus', tryPlay);

    // Toggle the has-video class when the video actually loads or fails
    const onLoaded = () => {
      if (bgRef.current) bgRef.current.classList.add('has-video');
    };
    const onError = (ev) => {
      if (bgRef.current) bgRef.current.classList.remove('has-video');
      // Log for debugging in the browser console
      // eslint-disable-next-line no-console
      console.error('Hero background video failed to load', ev);
    };
    if (vid) {
      vid.addEventListener('loadeddata', onLoaded);
      vid.addEventListener('error', onError);
    }

    // Debug info (visible in browser console)
    // eslint-disable-next-line no-console
    console.info('Hero video element', vid, 'src=', vid?.currentSrc || vid?.src);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" aria-label="Hero">
      {/* ── Parallax background image / video ── */}
      <div ref={bgRef} className="hero-bg-parallax" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/home-hero/Car_moving_at_high_speed_202606170747.mp4" type="video/mp4" />
          Your browser does not support the background video.
        </video>
      </div>

      {/* ── Background blobs (pure CSS, no JS) ── */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      {/* ── Foreground content ── */}
      <div className="hero-content">

        {/* Label */}
        <p ref={labelRef} className="hero-label" aria-label="Section: 001, Digital Agency, Ludhiana">
          / 001 / DIGITAL AGENCY — LUDHIANA
        </p>

        {/* Headline */}
        <h1 className="hero-headline" aria-label="Building what matters for your brand.">

          {/* Line 1: BUILDING */}
          <span ref={line1Ref} className="hero-line" aria-hidden="true">
            <SplitChars text="BUILDING" />
          </span>

          {/* Line 2: WHAT [pill] MATTERS */}
          <span ref={line2Ref} className="hero-line" aria-hidden="true">
            <SplitChars text="WHAT" />
            <span ref={pillRef} className="hero-pill">
              <span className="pill-track">
                <span className="pill-text">{PILL_TEXT}</span>
                <span className="pill-text">{PILL_TEXT}</span>
              </span>
            </span>
            <SplitChars text="MATTERS" />
          </span>

          {/* Line 3: FOR YOUR BRAND. */}
          <span ref={line3Ref} className="hero-line" aria-hidden="true">
            <SplitChars text="FOR YOUR BRAND." />
          </span>

        </h1>

        {/* Bottom row */}
        <div className="hero-bottom">
          <p ref={bodyRef} className="hero-body">
            We are Thrust &amp; Logic — a digital agency that builds, markets, and
            produces for brands that refuse to stay ordinary.
          </p>

          <div ref={scrollRef} className="hero-scroll" aria-hidden="true">
            <span className="hero-scroll-label">SCROLL TO EXPLORE</span>
            <span className="hero-scroll-arrow">↓</span>
          </div>
        </div>

      </div>
    </section>
  );
}

