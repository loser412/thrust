import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis } from './lib/lenis';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

// Connect Lenis to GSAP ticker
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Keep ScrollTrigger in sync with Lenis
lenis.on('scroll', ScrollTrigger.update);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
