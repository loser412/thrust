import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
function isPureWhite(el) {
  const style = window.getComputedStyle(el);

  // Check opacity — skip faded/muted text (opacity < 0.99)
  if (parseFloat(style.opacity) < 0.99) return false;

  // Parse the computed color
  const color = style.color;
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return false;

  const r = parseInt(m[1]);
  const g = parseInt(m[2]);
  const b = parseInt(m[3]);
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1;

  // Alpha must be fully opaque
  if (a < 0.99) return false;

  // All channels must be high — pure/near-pure white
  return r >= 220 && g >= 220 && b >= 220;
}

function useColorHover() {
  useEffect(() => {
    const onEnter = (e) => {
      const el = e.currentTarget;
      if (!isPureWhite(el)) return;
      el.style.color = pickColor();
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/production" element={<ProductionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/consult" element={<ConsultPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
