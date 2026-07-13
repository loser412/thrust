import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/caseStudy.css';

export default function PremiumCaseCard({ project }) {
  if (!project) return null;

  return (
    <Link to={`/case-study/${project.id}`} className="premium-card-link" aria-label={`View case study ${project.title}`}>
      <motion.article
        className="premium-card"
        tabIndex={0}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        whileHover={{ y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.985 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="premium-hero">
          <img src={project.image} alt={project.imageAlt} loading="lazy" />
        </div>
        <div className="premium-card-body">
          <div className="premium-meta">
            <div className="premium-client">{project.client}</div>
            <div className="premium-industry">{project.industry}</div>
          </div>
          <div className="premium-title">{project.title}</div>
          <div className="premium-summary">{project.summary}</div>
          <div className="premium-cta">View Case Study <span className="arrow">→</span></div>
        </div>
      </motion.article>
    </Link>
  );
}

