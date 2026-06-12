import React from 'react';
import ContactForm from '../components/ContactForm';
import useFadeIn from '../hooks/useFadeIn';

export default function Contact() {
  const headerRef = useFadeIn();
  const contentRef = useFadeIn();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Header */}
      <div ref={headerRef} className="fade-in-section" style={{ maxWidth: '800px' }}>
        <h1 className="headline-xl" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
          Let's
          <span style={{ display: 'inline-flex', alignItems: 'center', width: '4rem', height: '2.5rem', borderRadius: 'var(--radius-full)', overflow: 'hidden', border: '1px solid var(--whisper-border)', backgroundColor: 'var(--surface-charcoal)', padding: '0.25rem 0.5rem', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neon-signal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pulse">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          connect.
        </h1>
        <p className="body-md">
          Infrastructure isn't just about code; it's about communication. Whether you need a massive Kubernetes migration, a custom CI/CD pipeline, or just want to talk architecture, drop a line below.
        </p>
      </div>

      {/* Two Column Layout */}
      <div ref={contentRef} className="fade-in-section contact-layout">
        {/* Left Column: Direct links */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Direct Protocol */}
            <div className="contact-info-item">
              <span className="contact-info-title">Direct Protocol</span>
              <a href="mailto:hayqalhakimimain@gmail.com" className="contact-info-link">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span>hayqalhakimimain@gmail.com</span>
              </a>
            </div>

            {/* Version Control */}
            <div className="contact-info-item">
              <span className="contact-info-title">Version Control</span>
              <a href="https://github.com/Hayqal-Hakimi" target="_blank" rel="noopener noreferrer" className="contact-info-link">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                    <line x1="6" y1="9" x2="6" y2="15" />
                  </svg>
                </div>
                <span>github.com/Hayqal-Hakimi</span>
              </a>
            </div>

            {/* Network */}
            <div className="contact-info-item">
              <span className="contact-info-title">Network</span>
              <a href="https://linkedin.com/in/hayqal-cloud-engineer-326b7740a" target="_blank" rel="noopener noreferrer" className="contact-info-link">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span>linkedin.com/in/hayqal-cloud-engineer</span>
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--whisper-border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-signal)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <span className="dot-green pulse" style={{ width: '10px', height: '10px' }}></span>
                System Status: All Services Operational
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Form */}
        <section className="card">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
