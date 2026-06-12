import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        {/* Logo */}
        <div className="label-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          Hayqal_SysAdmin
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="https://github.com/Hayqal-Hakimi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--steel-text)' }}>GitHub</a>
          <a href="https://linkedin.com/in/hayqal-cloud-engineer-326b7740a" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--steel-text)' }}>LinkedIn</a>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--steel-text)' }}>
            <span className="dot-green" style={{ width: '6px', height: '6px', boxShadow: 'none' }}></span>
            Systems Operational
          </span>
        </div>

        {/* Copyright */}
        <div className="metadata" style={{ color: 'var(--steel-text)' }}>
          © 2026 DevOps Engineering Portfolio. Built for Scalability.
        </div>
      </div>
    </footer>
  );
}
