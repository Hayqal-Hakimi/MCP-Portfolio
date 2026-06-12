import React from 'react';

const iconLambda = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21L12 10L19 21" /><path d="M12 10V3" /></svg>;
const iconDDB = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>;
const iconCF = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>;
const iconS3 = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>;
const iconTofu = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>;
const iconCICD = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12A10 10 0 0 0 12 2v10H2a10 10 0 1 0 20 0z" /></svg>;

const iconEC2 = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="10" y1="6" x2="18" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="6" y1="18" x2="10" y2="18" /></svg>;
const iconDocker = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 9h1M10 9h1M7 12h1M10 12h1M13 9h1.5A2.5 2.5 0 0 1 17 11.5V12" /></svg>;
const iconK8s = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2l4 7-4 7-4-7 4-7z" /><path d="M2 12h20M7 5l10 14M17 5L7 19" opacity="0.4" /></svg>;
const iconTerraform = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8 12 14 9 8" /><polygon points="3 18 6 12 12 14 9 20" /><polygon points="21 18 18 12 12 14 15 20" /></svg>;
const iconPython = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C7 2 4 4 4 8c0 4 3 5 8 5s8 1 8 5c0 4-3 6-8 6s-8-2-8-6" /><line x1="11" y1="8" x2="11" y2="10" /><line x1="11" y1="16" x2="11" y2="18" /></svg>;
const iconProm = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="2" /></svg>;

const CORE = [
  { name: 'AWS Lambda', desc: 'Serverless', icon: iconLambda },
  { name: 'DynamoDB', desc: 'NoSQL', icon: iconDDB },
  { name: 'CloudFront', desc: 'CDN + SSL', icon: iconCF },
  { name: 'S3', desc: 'Storage', icon: iconS3 },
  { name: 'OpenTofu', desc: 'IaC', icon: iconTofu },
  { name: 'CI/CD', desc: 'Pipeline', icon: iconCICD },
];

const COMING = [
  { name: 'EC2 + VPC', desc: 'Jul 2026', icon: iconEC2 },
  { name: 'Docker', desc: 'Ogos 2026', icon: iconDocker },
  { name: 'Kubernetes', desc: 'Okt 2026', icon: iconK8s },
  { name: 'Terraform', desc: 'Sep 2026', icon: iconTerraform },
  { name: 'Python', desc: 'Sep 2026', icon: iconPython },
  { name: 'Prometheus', desc: 'Nov 2026', icon: iconProm },
];

function SkillCard({ skill, style = {} }) {
  return (
    <div className="skill-card" style={style}>
      <div className="skill-icon-wrapper">{skill.icon}</div>
      <div style={{ textAlign: 'center' }}>
        <h3 className="label-mono" style={{ color: 'var(--on-surface)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>{skill.name}</h3>
        <p className="metadata" style={{ color: 'var(--steel-text)' }}>{skill.desc}</p>
      </div>
    </div>
  );
}

export default function SkillsGrid() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <h2 className="headline-lg" style={{ fontSize: '1.75rem' }}>Tech Stack</h2>
          <span className="label-mono" style={{ color: 'var(--neon-signal)' }}>DEPLOYED</span>
        </div>
        <div className="bento-skills">
          {CORE.map((skill) => <SkillCard key={skill.name} skill={skill} />)}
        </div>
      </div>

      <div>
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <h2 className="headline-lg" style={{ fontSize: '1.75rem', color: 'var(--steel-text)' }}>Coming Soon</h2>
          <span className="label-mono" style={{ color: 'var(--steel-text)', opacity: 0.6 }}>Roadmap 2026</span>
        </div>
        <div className="bento-skills">
          {COMING.map((skill) => (
            <SkillCard key={skill.name} skill={skill} style={{ opacity: 0.4, filter: 'grayscale(50%)' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
