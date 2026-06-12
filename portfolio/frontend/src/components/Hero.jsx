import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-layout">
      {/* Left side info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className="badge-status">
          <span className="dot-green pulse"></span>
          <span className="label-mono" style={{ color: 'var(--steel-text)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
            HAYQAL — CLOUD & DEVOPS ARCHITECT
          </span>
        </div>

        <h1 className="headline-xl" style={{ color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
          Engineering
          {/* Inline SVG Server Rack Decoration */}
          <span style={{ display: 'inline-flex', alignItems: 'center', margin: '0 0.5rem', verticalAlign: 'middle' }}>
            <svg width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ border: '1px solid var(--whisper-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-charcoal)' }}>
              <rect x="4" y="5" width="40" height="4" rx="1" fill="#2E3039" />
              <circle cx="8" cy="7" r="1.5" fill="var(--neon-signal)" />
              <circle cx="13" cy="7" r="1.5" fill="var(--neon-signal)" />
              <rect x="4" y="12" width="40" height="4" rx="1" fill="#2E3039" />
              <circle cx="8" cy="14" r="1.5" fill="var(--neon-signal)" />
              <circle cx="18" cy="14" r="1.5" fill="var(--neon-signal)" />
              <rect x="4" y="19" width="40" height="4" rx="1" fill="#2E3039" />
              <circle cx="8" cy="21" r="1.5" fill="var(--neon-signal)" />
              <circle cx="23" cy="21" r="1.5" fill="var(--neon-signal)" />
            </svg>
          </span>
          scalable
          {/* Inline SVG Code Block Decoration */}
          <span style={{ display: 'inline-flex', alignItems: 'center', margin: '0 0.5rem', verticalAlign: 'middle' }}>
            <svg width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ border: '1px solid var(--whisper-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-charcoal)' }}>
              <path d="M8 8L13 13L8 18" stroke="var(--neon-signal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="16" y1="18" x2="24" y2="18" stroke="var(--steel-text)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          infrastructure.
        </h1>

        <div className="hero-subtitle">
          <p className="body-md" style={{ color: 'var(--steel-text)' }}>
            Cloud & DevOps Architect | AWS/GCP | Agentic OS | Automation
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/projects')}>
            View Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          
          <a href="#" className="btn btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      </div>

      {/* Right side graphic */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="orbital-container">
          <div className="orbital-glow"></div>
          
          {/* Subtle background SVG Globe */}
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" style={{ position: 'absolute', opacity: 0.1, color: 'var(--neon-signal)' }}>
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2, 2" />
            <path d="M50 10A40 40 0 0 0 50 90" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 10A40 20 0 0 0 50 90" stroke="currentColor" strokeWidth="0.5" />
            <path d="M10 50A40 40 0 0 0 90 50" stroke="currentColor" strokeWidth="0.5" />
            <path d="M15 30A40 40 0 0 0 85 30" stroke="currentColor" strokeWidth="0.5" />
            <path d="M15 70A40 40 0 0 0 85 70" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          {/* Outer dashed spinning ring */}
          <div className="orbital-ring orbital-ring-outer"></div>

          {/* Inner dotted spinning ring */}
          <div className="orbital-ring orbital-ring-inner">
            {/* Center Cloud Sync SVG Icon */}
            <svg className="orbital-icon-center" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              <path d="M12 6a6 6 0 1 0 6 6" strokeWidth="2" />
              <polyline points="12 2 12 6 8 6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
