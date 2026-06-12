import React from 'react';
import Hero from '../components/Hero';
import SkillsGrid from '../components/SkillsGrid';
import DeploymentStats from '../components/DeploymentStats';
import useFadeIn from '../hooks/useFadeIn';

export default function Home() {
  const heroRef = useFadeIn();
  const skillsRef = useFadeIn();
  const statsRef = useFadeIn();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--section-gap)' }}>
      {/* Hero Section */}
      <div ref={heroRef} className="fade-in-section">
        <Hero />
      </div>

      {/* Skills Bento Grid Section */}
      <div ref={skillsRef} className="fade-in-section">
        <SkillsGrid />
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="fade-in-section" style={{ display: 'flex', justifyContent: 'center' }}>
        <DeploymentStats />
      </div>
    </div>
  );
}
