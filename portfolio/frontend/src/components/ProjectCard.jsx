import React, { useState } from 'react';

export default function ProjectCard({ project, className }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const { title, tags, description, repoUrl, changelog, architecture, extra } = project;

  const openModal = (type) => {
    if (type === 'changelog') {
      setModalTitle(`Updates — ${title}`);
      setModalContent(changelog || 'No updates yet.');
    } else if (type === 'architecture') {
      setModalTitle(`Architecture — ${title}`);
      setModalContent(architecture || description);
    }
    setShowModal(true);
  };

  // Icon mapping
  const iconSvg = {
    globe: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    zap: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    book: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    shield: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  };

  const hasRepo = repoUrl && repoUrl !== '#';

  return (
    <>
      <div className={`card ${className || ''}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ color: 'var(--neon-signal)' }}>
              {iconSvg[project.icon] || iconSvg.globe}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <span key={tag} className="metadata" style={{ backgroundColor: 'var(--surface-container-lowest)', border: '1px solid var(--whisper-border)', borderRadius: 'var(--radius-full)', padding: '0.25rem 0.75rem', color: 'var(--steel-text)' }}>{tag}</span>
              ))}
            </div>
          </div>

          <h3 className="headline-lg" style={{ fontSize: '1.5rem', color: 'var(--on-surface)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{title}</h3>
          <p className="body-md" style={{ color: 'var(--steel-text)', fontSize: '1rem', lineHeight: '1.6' }}>{description}</p>
        </div>

        {extra === 'terminal' && (
          <div className="code-preview-container" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <span className="terminal-dot red" style={{ width: 8, height: 8 }}></span>
              <span className="terminal-dot yellow" style={{ width: 8, height: 8 }}></span>
              <span className="terminal-dot green" style={{ width: 8, height: 8 }}></span>
            </div>
            <div className="code-preview-text">
              <span style={{ color: 'var(--steel-text)' }}>$</span> tofu apply -auto-approve<br/>
              <span style={{ color: 'var(--neon-signal)', opacity: 0.8 }}>Apply complete! Resources: 46 added, 0 changed.</span>
            </div>
          </div>
        )}

        {extra === 'uptime' && (
          <div className="uptime-bar-wrapper" style={{ marginTop: '1rem' }}>
            <div className="uptime-bar-container"><div className="uptime-bar"></div></div>
            <span className="uptime-label">99.99% Uptime</span>
          </div>
        )}

        {/* 3 Standard Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--whisper-border)' }}>
          <a href={hasRepo ? repoUrl : '#'} target={hasRepo ? '_blank' : '_self'} rel="noopener noreferrer" className={`btn btn-project-card ${!hasRepo ? 'btn-disabled' : ''}`} onClick={!hasRepo ? (e) => e.preventDefault() : undefined} title={hasRepo ? 'View source code' : 'Coming soon'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            Repo
          </a>
          <button className="btn btn-project-card" onClick={() => openModal('changelog')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Changelog
          </button>
          <button className="btn btn-project-card" onClick={() => openModal('architecture')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            Architecture
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--neon-signal)', fontSize: '1.3rem', margin: 0 }}>{modalTitle}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: '1px solid var(--whisper-border)', color: 'var(--steel-text)', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: '1rem' }}>✕</button>
            </div>
            <pre style={{ color: 'var(--steel-text)', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', margin: 0 }}>{modalContent}</pre>
          </div>
        </div>
      )}
    </>
  );
}
