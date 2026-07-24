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

const DARK_BG_COLORS = [
  '#4A6B2F', '#F135A0', '#35A0F1', '#F1A035',
  '#A035F1', '#35F1D4', '#F16035', '#35F160',
  '#F1D435', '#D435F1', '#35C8F1', '#F13535',
];

const LIGHT_BG_COLORS = [
  '#5C0E3E', '#0D3D61', '#663B00', '#3E0D66',
  '#006655', '#7A2207', '#0A5C1B', '#5C4A00',
  '#560066', '#005366', '#660D0D',
];

let lastIdx = -1;
function pickColor(colorsList) {
  let idx;
  do { idx = Math.floor(Math.random() * colorsList.length); }
  while (idx === lastIdx);
  lastIdx = idx;
  return colorsList[idx];
}

const SEL = 'h1';

function parseRGB(color) {
  if (!color) return null;
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const int = parseInt(hex, 16);
    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255, a: 1 };
  }
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  return { r: parseInt(m[1], 10), g: parseInt(m[2], 10), b: parseInt(m[3], 10), a: m[4] !== undefined ? parseFloat(m[4]) : 1 };
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

function isNeutralColor(colorStr) {
  const rgb = parseRGB(colorStr);
  if (!rgb) return false;
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  return (max - min) < 50;
}

function safePickColor(bgColor) {
  const isDark = bgColor ? isColorDark(bgColor) : true;
  const candidates = isDark ? DARK_BG_COLORS : LIGHT_BG_COLORS;
  if (!bgColor) return pickColor(candidates);

  const fallback = isDark ? '#FFFFFF' : '#111111';
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  for (let i = 0; i < shuffled.length; i += 1) {
    const candidate = shuffled[i];
    const rgb = parseRGB(candidate);
    if (!rgb) continue;
    if (contrastRatio(rgb, bgColor) >= 4.5) return candidate;
  }
  return fallback;
}

function useColorHover(enabled) {
  useEffect(() => {
    if (!enabled) return;

    const onEnter = (e) => {
      const el = e.currentTarget;
      const style = window.getComputedStyle(el);
      const opacity = parseFloat(style.opacity);
      if (opacity < 0.3) return;

      const textColor = style.color;
      if (!isNeutralColor(textColor)) return;

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
  }, [enabled]);
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

function AppContent() {
  const { pathname } = useLocation();
  const isColorHoverEnabled = !['/about', '/consult'].includes(pathname);

  useColorHover(isColorHoverEnabled);

  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

