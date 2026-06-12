import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;
    let rafId = null;

    const LERP = 0.12;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Inner dot follows exactly
      dot.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button');
      if (target) {
        isHovering = true;
        ring.style.width = '100px';
        ring.style.height = '100px';
        ring.style.borderColor = 'var(--accent)';
        ring.style.backgroundColor = 'rgba(200, 241, 53, 0.08)';
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button');
      if (target) {
        isHovering = false;
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.borderColor = 'rgba(240, 237, 230, 0.5)';
        ring.style.backgroundColor = 'transparent';
      }
    };

    const loop = () => {
      // Lerp ring position
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;

      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'var(--fg)',
          pointerEvents: 'none',
          zIndex: 10001,
          mixBlendMode: 'difference',
          transition: 'opacity 0.2s',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1.5px solid rgba(240, 237, 230, 0.5)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
        }}
      />
    </>
  );
}
