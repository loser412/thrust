import { useEffect, useRef } from 'react';

export default function Marquee({ items = [], speed = 40 }) {
  const trackRef = useRef(null);
  const rafId = useRef(null);
  const offset = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = track.scrollWidth / 2;

    const animate = () => {
      offset.current -= speed / 60;
      if (Math.abs(offset.current) >= itemWidth) {
        offset.current = 0;
      }
      track.style.transform = `translateX(${offset.current}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 0',
      }}
    >
      <div ref={trackRef} style={{ display: 'inline-flex', gap: '0' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--fg)',
              padding: '0 48px',
            }}
          >
            {item}
            <span style={{ color: 'var(--accent)', margin: '0 16px' }}>×</span>
          </span>
        ))}
      </div>
    </div>
  );
}
