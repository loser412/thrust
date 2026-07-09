import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { COMPANY } from '../lib/company';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',            label: 'HOME',        end: true  },
  { to: '/development', label: 'DEVELOPMENT', end: false },
  { to: '/marketing',   label: 'MARKETING',   end: false },
  { to: '/production',  label: 'PRODUCTION',  end: false },
  { to: '/about',       label: 'ABOUT',       end: false },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const logoRef        = useRef(null);
  const linkRefs       = useRef([]);
  const btnRef         = useRef(null);
  const overlayRef     = useRef(null);
  const mobileLinkRefs = useRef([]);

  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entry animation
  useEffect(() => {
    const targets = [
      logoRef.current,
      ...linkRefs.current.filter(Boolean),
      btnRef.current,
    ].filter(Boolean);

    gsap.fromTo(
      targets,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.055, ease: 'power2.out', delay: 0.15 }
    );
  }, []);

  // Mobile overlay open/close
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.killTweensOf([overlay, ...mobileLinkRefs.current]);
      gsap.fromTo(overlay, { x: '100%' }, { x: '0%', duration: 0.45, ease: 'power3.out' });
      gsap.fromTo(
        mobileLinkRefs.current.filter(Boolean),
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, { x: '100%', duration: 0.35, ease: 'power3.in' });
    }
  }, [menuOpen]);

  // Homepage has full-screen dark video hero, development/marketing/production are dark pages
  const isDarkPage = ['/', '/development', '/marketing', '/production'].includes(location.pathname);

  // Logo color: white on dark hero, dark when scrolled to cream bg
  const logoColor = scrolled
    ? '#F5F2EB'
    : (isDarkPage ? '#FFFFFF' : '#0A0A0A');

  // Nav link color
  const getNavLinkColor = (isActive) => {
    if (isActive) return '#C8F135';
    return scrolled
      ? 'rgba(245,242,235,0.75)'
      : (isDarkPage ? 'rgba(255,255,255,0.75)' : '#0A0A0A');
  };

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 60px',
    transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
    background:     scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)'          : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px)'   : 'none',
    borderBottom:   scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
  };

  return (
    <>
      <nav style={navStyle} aria-label="Main navigation">
        {/* Logo */}
        <Link
          ref={logoRef}
          to="/"
          aria-label={`${COMPANY.name} - Home`}
          style={{
            fontFamily:     'var(--font-display)',
            fontSize:       '22px',
            fontWeight:     600,
            letterSpacing:  '-0.02em',
            color:          logoColor,
            textDecoration: 'none',
            transition:     'color 0.2s',
            zIndex:         101,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = logoColor)}
        >
          Thrust &amp; Logic
        </Link>

        {/* Desktop nav */}
        <ul className="desktop-nav" style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '36px', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ to, label, end }, i) => (
            <li key={to}>
              <NavLink
                ref={(el) => (linkRefs.current[i] = el)}
                to={to}
                end={end}
                className="nav-link"
                style={({ isActive }) => ({
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '11px',
                  letterSpacing:  '0.14em',
                  textDecoration: 'none',
                  color:          getNavLinkColor(isActive),
                  opacity:        isActive ? 1 : 0.7,
                  transition:     'color 0.25s, opacity 0.25s',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* Consult CTA */}
          <li>
            <Link
              ref={btnRef}
              to="/consult"
              id="nav-consult-btn"
              style={{
                fontFamily:     'var(--font-mono)',
                fontSize:       '11px',
                letterSpacing:  '0.14em',
                textTransform:  'uppercase',
                background:     '#C8F135',
                color:          '#0A0A0A',
                border:         '1px solid #C8F135',
                padding:        '10px 24px',
                textDecoration: 'none',
                display:        'inline-block',
                transition:     'opacity 0.25s',
                fontWeight:     700,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              CONSULT NOW
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ zIndex: 200 }}
        >
          <span style={{
            display: 'block', width: '24px', height: '1.5px',
            background: menuOpen ? '#C8F135' : '#FFFFFF',
            transition: 'transform 0.3s, background 0.2s',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '1.5px',
            background: menuOpen ? '#C8F135' : '#FFFFFF',
            transition: 'opacity 0.3s, background 0.2s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '24px', height: '1.5px',
            background: menuOpen ? '#C8F135' : '#FFFFFF',
            transition: 'transform 0.3s, background 0.2s',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        ref={overlayRef}
        className="mobile-overlay"
        aria-hidden={!menuOpen}
        style={{
          position:       'fixed',
          inset:          0,
          background:     'var(--bg)',
          zIndex:         99,
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        '40px',
          transform:      'translateX(100%)',
          borderLeft:     '1px solid var(--border)',
        }}
      >
        <div style={{
          position:     'absolute',
          top:          '-80px',
          right:        '-80px',
          width:        '300px',
          height:       '300px',
          borderRadius: '50%',
          background:   'var(--accent)',
          opacity:      0.06,
          filter:       'blur(70px)',
          pointerEvents:'none',
        }} />

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 1 }}>
          {[...NAV_LINKS, { to: '/consult', label: 'CONSULT NOW', end: false }].map(({ to, label, end }, i) => (
            <li key={to} ref={(el) => (mobileLinkRefs.current[i] = el)}>
              <NavLink
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  fontFamily:     'var(--font-display)',
                  fontSize:       'clamp(36px, 9vw, 60px)',
                  fontWeight:     700,
                  letterSpacing:  '-0.02em',
                  textTransform:  'uppercase',
                  textDecoration: 'none',
                  color:          isActive ? 'var(--accent)' : 'var(--text-h)',
                  lineHeight:     1.1,
                  display:        'block',
                  opacity:        isActive ? 1 : 0.85,
                  transition:     'color 0.2s, opacity 0.2s',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div style={{
          position:   'absolute',
          bottom:     '40px',
          left:       '40px',
          fontFamily: 'var(--font-mono)',
          fontSize:   '10px',
          letterSpacing: '0.15em',
          color:      'var(--text-h)',
          opacity:    0.25,
        }}>
          {COMPANY.name.toUpperCase()} - EST. 2018
        </div>
      </div>
    </>
  );
}
