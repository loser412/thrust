import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../lib/company';
import './Footer.css';

const SERVICES_LINKS = [
  { to: '/development', label: 'Development' },
  { to: '/marketing',   label: 'Creative & Marketing' },
  { to: '/production',  label: 'Production' },
  { to: '/',            label: 'Tech Stack' },
  { to: '/',            label: 'Value Scale' },
];

const COMPANY_LINKS = [
  { to: '/about',       label: 'About Us' },
  { to: '/consult',     label: 'Consult Now' },
  { to: '/',            label: 'Case Studies' },
  { to: '/consult',     label: 'Contact' },
];

const SOCIALS = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://linkedin.com',  label: 'LinkedIn' },
  { href: 'https://behance.net',   label: 'Behance' },
];

export default function Footer() {
  const { pathname } = useLocation();
  const footerRef   = useRef(null);
  const brandRef    = useRef(null);
  const linksGridRef = useRef(null);
  const bottomRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand block
      gsap.fromTo(
        brandRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: brandRef.current, start: 'top 90%' },
        }
      );

      // Links columns
      gsap.fromTo(
        linksGridRef.current?.querySelectorAll('.footer-col') ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: linksGridRef.current, start: 'top 90%' },
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

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#F5F2EB', // Light cream background
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
        zIndex: 90,
        padding: '80px 60px 40px',
        color: '#2D2D2D',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr repeat(3, 1fr)',
          gap: '60px',
          alignItems: 'start',
          marginBottom: '60px',
        }}
        className="footer-top"
      >
        {/* Brand Column */}
        <div ref={brandRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#0A0A0A',
            }}
          >
            Thrust &amp; Logic
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#555555',
              maxWidth: '300px',
            }}
          >
            A senior-only digital agency building high-performance web systems and marketing architectures.
          </p>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.05em',
              color: '#777777',
              lineHeight: 1.6,
              textTransform: 'uppercase',
            }}
          >
            {COMPANY.registeredOffice}
            <br />
            <a href={`mailto:${COMPANY.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{COMPANY.email}</a>
            <br />
            Ph: {COMPANY.phone}
          </div>
        </div>

        {/* Links Columns Container */}
        <div
          ref={linksGridRef}
          style={{
            display: 'contents',
          }}
        >
          {/* Services Column */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
              Services
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SERVICES_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', textDecoration: 'none', color: '#555555', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0A0A0A'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#555555'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
              Company
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', textDecoration: 'none', color: '#555555', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0A0A0A'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#555555'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
              Connect
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SOCIALS.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', textDecoration: 'none', color: '#555555', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0A0A0A'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#555555'}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(0, 0, 0, 0.08)', marginBottom: '30px' }} />

      {/* Bottom Bar */}
      <div
        ref={bottomRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.05em', color: '#888888' }}>
          &copy; {new Date().getFullYear()} Thrust &amp; Logic. All rights reserved.
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.05em', color: '#888888', display: 'flex', gap: '20px' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </footer>
  );
}
