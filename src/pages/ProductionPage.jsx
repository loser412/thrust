import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const OFFERINGS = [
  { index: '/01', title: 'Video Production', desc: 'Brand films, product demos, testimonials, and social content. Scripted, shot, and edited in-house — no outsourcing.', tags: ['Brand Film', 'Product Demo', 'Testimonial', 'Social'] },
  { index: '/02', title: 'Motion & Animation', desc: '2D motion graphics, kinetic typography, and animated explainers that carry your message without a word.', tags: ['Motion Graphics', 'After Effects', 'Lottie', 'Explainer'] },
  { index: '/03', title: 'Creative Direction', desc: 'Visual language, shot lists, storyboards, and art direction. We set the tone so every frame feels intentional.', tags: ['Art Direction', 'Storyboard', 'Mood Board', 'Casting'] },
  { index: '/04', title: 'Post-Production', desc: 'Colour grading, audio mix, VFX, and delivery-ready exports across all platforms and aspect ratios.', tags: ['Colour Grade', 'Audio Mix', 'VFX', 'DaVinci Resolve'] },
];

const SPECS = [
  { value: '4K', label: '// Minimum Resolution' },
  { value: '48+', label: '// Films Produced' },
  { value: '12', label: '// Crew Members' },
  { value: '3', label: '// Studio Cities' },
];

const SHOTS = [
  { title: 'On-Set Direction', desc: 'We lock the mood, framing, and pacing before a single take. Every shot must earn its place in the edit.', accent: '#F13535' },
  { title: 'Lighting & VFX', desc: 'Practical lighting, subtle effects, and clean compositing that make content feel premium without slowing production.', accent: '#35A0F1' },
  { title: 'Delivery Ready', desc: 'Native formats for social, web, and broadcast — all color graded, sound mixed, and export-ready.', accent: '#C8F135' },
];

const PROCESS = [
  { step: '/01', heading: 'BRIEF & CONCEPT', body: 'We extract the story worth telling. A tight creative brief prevents expensive reshoots.' },
  { step: '/02', heading: 'PRE-PRODUCTION', body: 'Storyboards, shot lists, location scouting, talent casting — everything locked before a camera moves.' },
  { step: '/03', heading: 'PRODUCTION', body: 'Senior crew, own equipment, no agency markup. We run tight sets and hit schedules.' },
  { step: '/04', heading: 'POST & DELIVERY', body: 'Grade, mix, VFX, and format for every platform — delivered within agreed timelines, every time.' },
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
  const bgRef      = useRef(null);
  const videoRef   = useRef(null);
  const fitnessVideoRef = useRef(null);
  const momentsVideoRef = useRef(null);
  const activeVideoRef = useRef(null);
  const mediaVideoRefs = useRef([]);
  const shotRef    = useRef(null);
  const offerRef   = useRef(null);
  const specsRef   = useRef(null);
  const processRef = useRef(null);
  const workRef    = useRef(null);
  const ctaRef     = useRef(null);
  const [hoveredMedia, setHoveredMedia] = useState(null);
  const [hoveredSectionVideo, setHoveredSectionVideo] = useState(null);
  const [momentsTime, setMomentsTime] = useState(0);
  const [momentsDuration, setMomentsDuration] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
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
      gsap.fromTo(heroRef.current?.querySelectorAll('.anim') ?? [],
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });

      gsap.fromTo(offerRef.current?.querySelectorAll('.offer-row') ?? [],
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: offerRef.current, start: 'top 75%' } });

      gsap.fromTo(specsRef.current?.querySelectorAll('.spec-col') ?? [],
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: specsRef.current, start: 'top 80%' } });

      gsap.fromTo(processRef.current?.querySelectorAll('.proc-step') ?? [],
        { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 75%' } });

      gsap.utils.toArray(shotRef.current?.querySelectorAll('.shot-card') ?? []).forEach((card, index) => {
        gsap.fromTo(card,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'bottom 70%',
              toggleActions: 'play reverse play reverse',
              markers: false,
            },
          }
        );
      });

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

  useEffect(() => {
    const container = sliderContainerRef.current;
    if (!container) return;

    const startAutoSlide = () => {
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      }
      const remaining = maxScroll - container.scrollLeft;
      const duration = Math.max(10, (remaining / maxScroll) * 40);

      sliderTweenRef.current = gsap.to(container, {
        scrollLeft: maxScroll,
        duration,
        ease: 'none',
        onComplete: () => {
          container.scrollLeft = 0;
          startAutoSlide();
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    mediaVideoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    startAutoSlide();

    return () => {
      if (sliderTweenRef.current) {
        sliderTweenRef.current.kill();
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionVideos = [fitnessVideoRef.current, momentsVideoRef.current].filter(Boolean);
    if (!sectionVideos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
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

    const handleLoadedMetadata = () => {
      setMomentsDuration(video.duration || 0);
      setMomentsTime(video.currentTime || 0);
    };

    const handleTimeUpdate = () => {
      setMomentsTime(video.currentTime || 0);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
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
          backgroundImage: `url('/image3.jpeg')`,
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
      <section ref={heroRef} style={{ padding: 'clamp(80px,12vw,160px) 40px clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden', background:'transparent' }}>
        <div style={{ position:'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1, filter: 'brightness(0.55) saturate(1.1)' }}
          >
            <source src="/Curtain_opening_zoomout_animation_202606112331.mp4" type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ position:'absolute', bottom:'-60px', right:'-80px', width:'420px', height:'420px', borderRadius:'50%', background:'radial-gradient(circle, rgba(241,53,53,0.08) 0%, transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
          <div className="anim"><SectionLabel index="PRD" label="PRODUCTION" /></div>
          <h1 className="anim" style={{ fontFamily:'var(--font-cinematic)', fontSize:'clamp(52px,9vw,124px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', lineHeight:0.92, margin:'24px 0 0', color:'var(--fg)' }}>
            WE CREATE<br />CONTENT THAT<br /><span style={{ color:'var(--accent)' }}>EARNS.</span>
          </h1>
          <div className="anim" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'48px', flexWrap:'wrap', gap:'24px' }}>
            <p style={{ fontFamily:'var(--font-cinematic)', fontSize:'17px', lineHeight:1.75, color:'var(--fg)', margin:0, maxWidth:'480px' }}>
              Video and motion production without the bloat. Concept through delivery — senior crew, own equipment, no outsourcing, no excuses.
            </p>
            <Link to="/consult" style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--bg)', background:'var(--accent)', padding:'14px 28px', textDecoration:'none', transition:'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              BRIEF US →
            </Link>
          </div>
        </div>
      </section>

      {/* SHOT FRAME */}
      <section ref={shotRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="000" label="SHOT FRAME" />
        <h2 style={{ fontFamily:'var(--font-cinematic)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 40px', lineHeight:0.95, color:'var(--fg)' }}>
          We make every frame count from concept to cut.<br /><span style={{ color:'var(--accent)' }}>Clear direction, polished craft.</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))', gap:'24px' }}>
          {SHOTS.map(({ title, desc }) => (
            <motion.div
              key={title}
              className="shot-card"
              style={{ padding:'30px', border:'4px solid transparent', borderImage: 'linear-gradient(135deg, #ff4d4d, #35f14f, #2a8bfd) 1', background:'black', position:'relative', overflow:'hidden' }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <h3 style={{ fontFamily:'var(--font-cinematic)', fontSize:'20px', fontWeight:700, letterSpacing:'-0.02em', textTransform:'uppercase', color:'var(--fg)', margin:'0 0 14px' }}>{title}</h3>
              <p style={{ fontFamily:'var(--font-cinematic)', fontSize:'14px', lineHeight:1.85, color:'var(--fg)', opacity:1, margin:0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2D FITNESS */}
      <section style={{ padding:'clamp(80px,10vw,120px) 40px', position:'relative' }}>
        <div style={{ position:'relative', width:'100%', minHeight:'70vh', maxHeight:'85vh', borderRadius:'28px', overflow:'hidden', background:'#000', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <video
            ref={fitnessVideoRef}
            controls
            playsInline
            preload="metadata"
            onMouseEnter={() => setHoveredSectionVideo('fitness')}
            onMouseLeave={() => setHoveredSectionVideo(null)}
            style={{ width:'100%', height:'100%', objectFit:'contain', display:'block', background:'#000' }}
          >
            <source src="/2d%20fitness/2D%20VIDEO.mp4" type="video/mp4" />
            Your browser does not support this video.
          </video>
          {hoveredSectionVideo === 'fitness' && (
            <div style={{ position:'absolute', bottom:'24px', left:'50%', transform:'translateX(-50%)', padding:'10px 18px', borderRadius:'999px', background:'rgba(0,0,0,0.75)', color:'#fff', fontSize:'13px', letterSpacing:'0.1em', pointerEvents:'none', zIndex:3 }}>
              Hovering video controls — use the timebar to jump.
            </div>
          )}
          <div style={{ position:'absolute', top:'32px', left:'32px', zIndex:2, color:'#fff', fontFamily:'var(--font-cinematic)', fontWeight:700, fontSize:'clamp(26px,3vw,42px)', textTransform:'uppercase', letterSpacing:'0.18em', pointerEvents:'none' }}>
            2D FITNESS
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section ref={offerRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="001" label="OFFERINGS" />
        <h2 style={{ fontFamily:'var(--font-cinematic)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--accent)' }}>
          WHAT WE<br /><span style={{ color:'var(--accent)' }}>PRODUCE.</span>
        </h2>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {OFFERINGS.map(({ index, title, desc, tags }) => (
            <div key={index} className="offer-row" style={{ display:'grid', gridTemplateColumns:'80px 1fr auto', gap:'32px', padding:'36px 0', borderBottom:'1px solid var(--border)', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.1em', color:'var(--accent)', paddingTop:'4px' }}>{index}</span>
              <div>
                <div style={{ fontFamily:'var(--font-cinematic)', fontSize:'22px', fontWeight:700, letterSpacing:'-0.01em', textTransform:'uppercase', color:'var(--fg)', marginBottom:'10px' }}>{title}</div>
                <p style={{ fontFamily:'var(--font-cinematic)', fontSize:'15px', lineHeight:1.75, color:'var(--fg)', margin:0, maxWidth:'520px' }}>{desc}</p>
              </div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'flex-end', maxWidth:'200px' }}>
                {tags.map((t) => (
                  <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.1em', color:'#fff', opacity:1, background:'#000', border:'1px solid #000', padding:'4px 10px', textTransform:'uppercase' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:'clamp(80px,10vw,120px) 40px', position:'relative' }}>
        <div style={{ position:'relative', width:'100%', minHeight:'55vh', maxHeight:'80vh', borderRadius:'28px', overflow:'hidden', background:'#000', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <video
            ref={momentsVideoRef}
            controls
            playsInline
            preload="metadata"
            poster="/precious/image.png"
            onMouseEnter={() => setHoveredSectionVideo('moments')}
            onMouseLeave={() => setHoveredSectionVideo(null)}
            style={{ width:'100%', height:'100%', objectFit:'contain', display:'block', background:'#000' }}
          >
            <source src="/precious/Anniversary%20Main.mp4" type="video/mp4" />
            Your browser does not support this video.
          </video>
          {momentsDuration > 0 && (
            <div style={{ position:'absolute', left:'50%', bottom:'20px', transform:'translateX(-50%)', width:'calc(100% - 80px)', zIndex:4, pointerEvents:'auto', display:'flex', flexDirection:'column', gap:'8px' }}>
              <input
                type="range"
                min="0"
                max={momentsDuration}
                step="0.05"
                value={momentsTime}
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  if (momentsVideoRef.current) {
                    momentsVideoRef.current.currentTime = newTime;
                  }
                  setMomentsTime(newTime);
                }}
                style={{ width:'100%', appearance:'none', height:'6px', borderRadius:'999px', background:'rgba(255,255,255,0.16)', outline:'none', cursor:'pointer' }}
              />
              <div style={{ display:'flex', justifyContent:'space-between', color:'#fff', fontSize:'12px', letterSpacing:'0.08em', fontFamily:'var(--font-mono)' }}>
                <span>{formatTime(momentsTime)}</span>
                <span>{formatTime(momentsDuration)}</span>
              </div>
            </div>
          )}
          {hoveredSectionVideo === 'moments' && (
            <div style={{ position:'absolute', bottom:'24px', left:'50%', transform:'translateX(-50%)', padding:'10px 18px', borderRadius:'999px', background:'rgba(0,0,0,0.75)', color:'#fff', fontSize:'13px', letterSpacing:'0.1em', pointerEvents:'none', zIndex:3 }}>
              Hovering video controls — use the timebar to jump.
            </div>
          )}
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.16)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:'32px', left:'32px', zIndex:2, color:'#fff', fontFamily:'var(--font-cinematic)', fontWeight:700, fontSize:'clamp(24px,2.5vw,38px)', textTransform:'uppercase', letterSpacing:'0.18em', pointerEvents:'none' }}>
            WE CAPTURE MOMENTS
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section ref={specsRef} style={{ padding:'clamp(80px,10vw,120px) 40px', background:'#1f1f1f' }}>
        <SectionLabel index="002" label="BY THE NUMBERS" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', marginTop:'48px' }}>
          {SPECS.map(({ value, label }, i) => (
            <div key={label} className="spec-col" style={{ borderLeft: i===0 ? 'none' : '1px solid var(--border)', paddingLeft: i===0 ? '0' : '32px', paddingRight:'32px' }}>
              <div style={{ fontFamily:'var(--font-cinematic)', fontSize:'clamp(40px,4.5vw,64px)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, color:'var(--accent)' }}>{value}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'0.1em', color:'var(--fg)', marginTop:'10px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="003" label="PROCESS" />
        <h2 style={{ fontFamily:'var(--font-cinematic)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 48px', lineHeight:0.95, color:'var(--fg)' }}>
          HOW A<br /><span style={{ color:'var(--accent)' }}>SHOOT RUNS.</span>
        </h2>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {PROCESS.map(({ step, heading, body }, i) => (
            <div key={step} className="proc-step" style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:'32px', padding:'32px 0', borderBottom: i < PROCESS.length-1 ? '1px solid var(--border)' : 'none', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'0.1em', color:'var(--accent)', paddingTop:'4px' }}>{step}</span>
              <div>
                <div style={{ fontFamily:'var(--font-cinematic)', fontSize:'18px', fontWeight:700, letterSpacing:'-0.01em', textTransform:'uppercase', color:'var(--fg)', marginBottom:'10px' }}>{heading}</div>
                <p style={{ fontFamily:'var(--font-cinematic)', fontSize:'15px', lineHeight:1.75, color:'var(--fg)', margin:0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section ref={workRef} style={{ padding:'clamp(80px,10vw,120px) 40px' }}>
        <SectionLabel index="004" label="SOME GLIMPSE OF WORK" />
        <h2 style={{ fontFamily:'var(--font-cinematic)', fontSize:'clamp(32px,4vw,52px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'20px 0 56px', lineHeight:0.95, color:'var(--fg)' }}>
          A BRIEF<br /><span style={{ color:'var(--accent)' }}>GLIMPSE OF OUR WORK.</span>
        </h2>
        <div
          ref={sliderContainerRef}
          className="hide-scrollbar"
          style={{ overflowX:'auto', overflowY:'hidden', position:'relative', padding:'18px 0', cursor:'grab', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none' }}
          onMouseEnter={() => {
            if (sliderTweenRef.current) sliderTweenRef.current.pause();
          }}
          onMouseLeave={() => {
            if (!dragActiveRef.current && sliderTweenRef.current) sliderTweenRef.current.resume();
          }}
          onWheel={(e) => {
            const container = sliderContainerRef.current;
            if (!container) return;
            container.scrollLeft += e.deltaY;
            e.preventDefault();
          }}
          onPointerDown={(e) => {
            const container = sliderContainerRef.current;
            if (!container) return;
            if (e.target.closest('video') || e.target.closest('button')) return;
            dragActiveRef.current = true;
            pointerStartXRef.current = e.clientX;
            scrollStartRef.current = container.scrollLeft;
            if (sliderTweenRef.current) sliderTweenRef.current.pause();
            container.setPointerCapture(e.pointerId);
            container.style.cursor = 'grabbing';
          }}
          onPointerMove={(e) => {
            if (!dragActiveRef.current) return;
            const container = sliderContainerRef.current;
            if (!container) return;
            const delta = pointerStartXRef.current - e.clientX;
            container.scrollLeft = scrollStartRef.current + delta;
          }}
          onPointerUp={(e) => {
            dragActiveRef.current = false;
            const container = sliderContainerRef.current;
            if (container) {
              container.releasePointerCapture?.(e.pointerId);
              container.style.cursor = 'grab';
            }
            if (sliderTweenRef.current) sliderTweenRef.current.resume();
          }}
          onPointerCancel={(e) => {
            dragActiveRef.current = false;
            const container = sliderContainerRef.current;
            if (container) {
              container.releasePointerCapture?.(e.pointerId);
              container.style.cursor = 'grab';
            }
            if (sliderTweenRef.current) sliderTweenRef.current.resume();
          }}
        >
          <div
            style={{
              display:'flex',
              gap:'20px',
              width:'max-content',
            }}
          >
            {(() => { mediaVideoRefs.current = []; return [...MEDIA_ITEMS, ...MEDIA_ITEMS].map((item, i) => {
              const isHovered = hoveredMedia === i;
              const commonStyle = {
                flex: '0 0 auto',
                width: 'clamp(320px, 28vw, 420px)',
                height: 'clamp(320px, 28vw, 420px)',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: '#080808',
                boxShadow: isHovered ? '0 0 0 1px rgba(255,255,255,0.12), 0 40px 120px rgba(0,0,0,0.35)' : '0 24px 80px rgba(0,0,0,0.12)',
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                cursor: 'pointer',
              };

              return (
                <div
                  key={`${item.src}-${i}`}
                  style={commonStyle}
                  onMouseEnter={() => setHoveredMedia(i)}
                  onMouseLeave={() => setHoveredMedia(null)}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                    />
                  ) : (
                    <video
                      ref={(el) => { mediaVideoRefs.current[i] = el; }}
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      controls
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                      onMouseEnter={() => {
                        setHoveredMedia(i);
                        if (sliderTweenRef.current) {
                          sliderTweenRef.current.pause();
                        }
                      }}
                      onMouseLeave={() => {
                        if (sliderTweenRef.current) {
                          sliderTweenRef.current.resume();
                        }
                      }}
                    />
                  )}
                  {item.type === 'video' && (
                    <>
                      <div style={{ position:'absolute', inset:0, display:'flex', justifyContent:'center', alignItems:'center', pointerEvents:'none' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideo(item);
                            if (sliderTweenRef.current) sliderTweenRef.current.pause();
                          }}
                          style={{
                            pointerEvents: 'auto',
                            display:'inline-flex',
                            width:'62px',
                            height:'62px',
                            borderRadius:'50%',
                            border:'1px solid rgba(255,255,255,0.8)',
                            background:'rgba(0,0,0,0.35)',
                            color:'#fff',
                            fontSize:'24px',
                            alignItems:'center',
                            justifyContent:'center',
                            cursor:'pointer',
                          }}
                        >
                          ▶
                        </button>
                      </div>
                      {hoveredMedia === i && (
                        <div style={{ position:'absolute', bottom:'20px', left:'50%', transform:'translateX(-50%)', padding:'8px 16px', borderRadius:'999px', background:'rgba(0,0,0,0.7)', color:'#fff', fontSize:'12px', letterSpacing:'0.12em', pointerEvents:'none', textAlign:'center' }}>
                          Video controls active — slider is paused. Use the timebar to skip.
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })})()}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          onClick={() => {
            if (activeVideoRef.current) {
              activeVideoRef.current.pause();
              activeVideoRef.current.currentTime = 0;
            }
            setActiveVideo(null);
          }}
          style={{ position:'fixed', inset:0, zIndex:60, background:'rgba(0,0,0,0.92)', display:'flex', justifyContent:'center', alignItems:'center', padding:'24px', cursor:'auto' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width:'100%', maxWidth:'1100px', borderRadius:'20px', overflow:'hidden', background:'#000', position:'relative' }}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              style={{ position:'absolute', top:'18px', right:'18px', zIndex:10, border:'1px solid rgba(255,255,255,0.3)', borderRadius:'999px', background:'rgba(0,0,0,0.45)', color:'#fff', width:'48px', height:'48px', cursor:'pointer' }}
            >
              ×
            </button>
            <video
              ref={activeVideoRef}
              src={activeVideo.src}
              controls
              autoPlay
              playsInline
              style={{ width:'100%', height:'calc(100vh - 120px)', maxHeight:'820px', objectFit:'contain', background:'#000', cursor:'auto' }}
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <section ref={ctaRef} style={{ padding:'clamp(80px,10vw,120px) 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'40px' }}>
        <div>
          <SectionLabel index="005" label="START" />
          <h2 style={{ fontFamily:'var(--font-cinematic)', fontSize:'clamp(40px,6vw,80px)', fontWeight:700, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'16px 0 0', lineHeight:0.92, color:'var(--fg)' }}>
            GOT A STORY<br /><span style={{ color:'var(--accent)' }}>TO TELL?</span>
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
