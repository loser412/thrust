import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

const NAV_LINKS = [
  { to: '/',            label: 'Home'        },
  { to: '/development', label: 'Development' },
  { to: '/marketing',   label: 'Marketing'   },
  { to: '/production',  label: 'Production'  },
  { to: '/about',       label: 'About'       },
  { to: '/consult',     label: 'Consult'     },
];

const SOCIALS = [
  { href: 'https://instagram.com', label: 'Instagram', abbr: 'IG' },
  { href: 'https://linkedin.com',  label: 'LinkedIn',  abbr: 'LI' },
  { href: 'https://behance.net',   label: 'Behance',   abbr: 'BE' },
];

const STATS = [
  { value: '48+',  label: '// Projects Delivered' },
  { value: '100%', label: '// Client Retention'   },
  { value: '6',    label: '// Years Building'      },
  { value: '3',    label: '// Cities Active'       },
];

export default function Footer() {
  const footerRef   = useRef(null);
  const brandRef    = useRef(null);
  const navColRef   = useRef(null);
  const statsRef    = useRef(null);
  const bottomRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand block
      gsap.fromTo(
        brandRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: brandRef.current, start: 'top 85%' },
        }
      );

      // Nav column
      gsap.fromTo(
        navColRef.current?.querySelectorAll('.footer-link-item') ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: navColRef.current, start: 'top 85%' },
        }
      );

      // Stats
      gsap.fromTo(
        statsRef.current?.querySelectorAll('.stat-col') ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 90%' },
        }
      );

      // Bottom bar
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power1.out',
          scrollTrigger: { trigger: bottomRef.current, start: 'top 95%' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ background: 'var(--muted)', borderTop: '1px solid var(--border)', position: 'relative', zIndex: 10 }}>

      {/* ── TOP SECTION ─────────────────────────────────────────────────── */}
      <div
        style={{
          display:       'grid',
          gridTemplateColumns: '1fr auto',
          gap:           '80px',
          padding:       'clamp(60px, 8vw, 100px) 40px 60px',
          alignItems:    'flex-start',
        }}
        className="footer-top"
      >
        {/* ── Left: Brand ────────────────────────────────────────────── */}
        <div ref={brandRef}>
          <Link
            to="/"
            style={{ textDecoration: 'none', display: 'inline-block' }}
            onMouseEnter={(e) => (e.currentTarget.querySelector('.brand-text').style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.querySelector('.brand-text').style.color = 'var(--fg)')}
          >
            <div
              className="brand-text"
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(40px, 6vw, 68px)',
                fontWeight:    700,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                lineHeight:    0.92,
                color:         'var(--fg)',
                transition:    'color 0.25s',
              }}
            >
              THRUST<br />
              <span style={{ color: 'var(--accent)' }}>&amp;</span>{' '}
              LOGIC
            </div>
          </Link>

          <p
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '12px',
              letterSpacing: '0.12em',
              color:         'var(--fg)',
              opacity:       0.35,
              marginTop:     '20px',
              marginBottom:  0,
              lineHeight:    1.8,
            }}
          >
            Move fast. Think clearly.
            <br />
            Build systems that last.
          </p>

          {/* ── Socials ──────────────────────────────────────────────── */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {SOCIALS.map(({ href, label, abbr }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-link"
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '10px',
                  letterSpacing:  '0.15em',
                  color:          'var(--fg)',
                  opacity:        0.4,
                  textDecoration: 'none',
                  border:         '1px solid var(--border)',
                  padding:        '7px 14px',
                  transition:     'color 0.2s, opacity 0.2s, border-color 0.2s',
                  display:        'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color        = 'var(--accent)';
                  e.currentTarget.style.opacity      = '1';
                  e.currentTarget.style.borderColor  = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color        = 'var(--fg)';
                  e.currentTarget.style.opacity      = '0.4';
                  e.currentTarget.style.borderColor  = 'var(--border)';
                }}
              >
                {abbr}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Nav links ───────────────────────────────────────── */}
        <div ref={navColRef}>
          <div
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '10px',
              letterSpacing: '0.2em',
              color:         'var(--accent)',
              textTransform: 'uppercase',
              marginBottom:  '20px',
            }}
          >
            / SITEMAP
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to} className="footer-link-item">
                <NavLink
                  to={to}
                  end={to === '/'}
                  style={({ isActive }) => ({
                    fontFamily:     'var(--font-mono)',
                    fontSize:       '12px',
                    letterSpacing:  '0.1em',
                    textDecoration: 'none',
                    color:          isActive ? 'var(--accent)' : 'var(--fg)',
                    opacity:        isActive ? 1 : 0.5,
                    textTransform:  'uppercase',
                    transition:     'color 0.2s, opacity 0.2s',
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            '8px',
                  })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color   = 'var(--fg)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color   = '';
                    e.currentTarget.style.opacity = '';
                  }}
                >
                  <span style={{ color: 'var(--accent)', opacity: 0.5, fontSize: '9px' }}>→</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
      <div style={{ height: '1px', background: 'var(--border)', margin: '0 40px' }} />

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          padding:             'clamp(40px, 5vw, 60px) 40px',
          gap:                 '2px',
        }}
        className="footer-stats"
      >
        {STATS.map(({ value, label }, i) => (
          <div
            key={label}
            className="stat-col"
            style={{
              borderLeft:  i === 0 ? 'none' : '1px solid var(--border)',
              paddingLeft: i === 0 ? '0'    : '32px',
              paddingRight:'32px',
            }}
          >
            <div
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(36px, 4vw, 56px)',
                fontWeight:    700,
                letterSpacing: '-0.03em',
                lineHeight:    1,
                color:         'var(--fg)',
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '11px',
                letterSpacing: '0.1em',
                color:         'var(--fg)',
                opacity:       0.35,
                marginTop:     '10px',
                lineHeight:    1.6,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
      <div style={{ height: '1px', background: 'var(--border)', margin: '0 40px' }} />

      {/* ── BOTTOM BAR ──────────────────────────────────────────────────── */}
      <div
        ref={bottomRef}
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '24px 40px',
          flexWrap:       'wrap',
          gap:            '12px',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '11px',
            letterSpacing: '0.1em',
            color:         'var(--fg)',
            opacity:       0.25,
          }}
        >
          © {new Date().getFullYear()} Thrust &amp; Logic. All rights reserved.
        </span>

        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '11px',
            letterSpacing: '0.1em',
            color:         'var(--fg)',
            opacity:       0.25,
          }}
        >
          Built with logic.
        </span>
      </div>

    </footer>
  );
}
