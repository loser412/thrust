import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis } from './lib/lenis';
import MagneticCursor from './components/MagneticCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import DevelopmentPage from './pages/DevelopmentPage';
import MarketingPage from './pages/MarketingPage';
import ProductionPage from './pages/ProductionPage';
import AboutPage from './pages/AboutPage';
import ConsultPage from './pages/ConsultPage';
import CaseStudyPage from './pages/CaseStudyPage';

const COLORS = [
  '#C8F135', '#F135A0', '#35A0F1', '#F1A035',
  '#A035F1', '#35F1D4', '#F16035', '#35F160',
  '#F1D435', '#D435F1', '#35C8F1', '#F13535',
];

let lastIdx = -1;
function pickColor() {
  let idx;
  do { idx = Math.floor(Math.random() * COLORS.length); }
  while (idx === lastIdx);
  lastIdx = idx;
  return COLORS[idx];
}

// Broad selector — filter happens at hover time via isPureWhite()
const SEL = 'h1,h2,h3,h4,h5,h6,p,span,a,li,button,label,strong,em,div';

/**
 * Returns true only if:
 *  - computed color is close to pure white (R,G,B all ≥ 220)
 *  - computed opacity of the element itself is 1 (no fading)
 *  - color alpha channel is fully opaque
 */
function parseRGB(color) {
  if (!color) return null;
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const int = parseInt(hex, 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255,
      a: 1,
    };
  }
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  return {
    r: parseInt(m[1], 10),
    g: parseInt(m[2], 10),
    b: parseInt(m[3], 10),
    a: m[4] !== undefined ? parseFloat(m[4]) : 1,
  };
}

function getLuminance(rgb) {
  const transform = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(rgb.r) + 0.7152 * transform(rgb.g) + 0.0722 * transform(rgb.b);
}

function contrastRatio(a, b) {
  const L1 = getLuminance(a);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function isColorDark(rgb) {
  return getLuminance(rgb) < 0.5;
}

function findBackgroundColor(el) {
  let current = el;
  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    const bg = style.backgroundColor;
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      const parsed = parseRGB(bg);
      if (parsed) return parsed;
    }
    current = current.parentElement;
  }
  return parseRGB(window.getComputedStyle(document.body).backgroundColor) || null;
}

function isNearWhite(el) {
  const style = window.getComputedStyle(el);
  if (parseFloat(style.opacity) < 0.99) return false;
  const rgb = parseRGB(style.color);
  return rgb && rgb.a >= 0.99 && rgb.r >= 220 && rgb.g >= 220 && rgb.b >= 220;
}

function isNearBlack(el) {
  const style = window.getComputedStyle(el);
  if (parseFloat(style.opacity) < 0.99) return false;
  const rgb = parseRGB(style.color);
  return rgb && rgb.a >= 0.99 && rgb.r <= 30 && rgb.g <= 30 && rgb.b <= 30;
}

function chooseAccessibleTextColor(bgColor) {
  return isColorDark(bgColor) ? '#FFFFFF' : '#111111';
}

function safePickColor(bgColor) {
  if (!bgColor) return pickColor();
  const fallback = chooseAccessibleTextColor(bgColor);
  for (let i = 0; i < COLORS.length; i += 1) {
    const candidate = COLORS[i];
    const rgb = parseRGB(candidate);
    if (!rgb) continue;
    if (contrastRatio(rgb, bgColor) >= 7) return candidate;
  }
  return fallback;
}

function useColorHover() {
  useEffect(() => {
    const onEnter = (e) => {
      const el = e.currentTarget;
      if (!isNearWhite(el) && !isNearBlack(el)) return;
      const bgColor = findBackgroundColor(el);
      const safeColor = safePickColor(bgColor);
      if (!safeColor) return;
      el.style.color = safeColor;
      el.style.transition = 'color 0.2s ease';
    };
    const onLeave = (e) => {
      e.currentTarget.style.color = '';
    };

    const bind = () => {
      document.querySelectorAll(SEL).forEach((el) => {
        if (el.dataset.cb) return;
        el.dataset.cb = '1';
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      document.querySelectorAll(SEL).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        delete el.dataset.cb;
      });
    };
  }, []);
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

export default function App() {
  useColorHover();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MagneticCursor />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/development" element={<DevelopmentPage />} />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/production" element={<ProductionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/consult" element={<ConsultPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
