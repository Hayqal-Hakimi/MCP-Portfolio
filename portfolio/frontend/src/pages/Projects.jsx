import React from 'react';
import ProjectCard from '../components/ProjectCard';
import useFadeIn from '../hooks/useFadeIn';
import projects from '../data/projects';

export default function Projects() {
  const headerRef = useFadeIn();
  const gridRef = useFadeIn();

  // Alternate card sizes for bento grid: 7/5, 5/7, 7/5, 5/7
  const colSizes = ['col-7', 'col-5', 'col-5', 'col-7'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <div ref={headerRef} className="fade-in-section" style={{ maxWidth: '800px' }}>
        <h1 className="headline-xl" style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
          Architecture <span style={{ color: 'var(--on-surface)' }}>&</span> Automation
        </h1>
        <p className="body-md">
          A selection of high-availability infrastructure projects, designed for scale and resilience.
          Focusing on immutable infrastructure, declarative configurations, and seamless delivery pipelines.
        </p>
      </div>

      <div ref={gridRef} className="fade-in-section projects-bento">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={colSizes[i % 4]}
          />
        ))}
      </div>

      {/* How to add a new project */}
      <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <p className="metadata" style={{ color: 'var(--steel-text)', opacity: 0.5 }}>
          + Add project → edit <code style={{ color: 'var(--neon-signal)' }}>src/data/projects.js</code>
        </p>
      </div>
    </div>
  );
}
