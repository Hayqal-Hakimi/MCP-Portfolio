import React, { useEffect, useState } from 'react';

export default function DeploymentStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/stats.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return (
      <section className="card" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <div className="terminal-header">
          <div className="terminal-dots"><span className="terminal-dot red"></span><span className="terminal-dot yellow"></span><span className="terminal-dot green"></span></div>
          <span className="terminal-title">Active Deployment Stats</span>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--steel-text)' }}>Loading...</div>
      </section>
    );
  }

  return (
    <section className="card" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
        </div>
        <span className="terminal-title">Active Deployment Stats</span>
      </div>

      <div className="stats-list">
        <div className="stat-item">
          <span>Resources Deployed</span>
          <span className="stat-value green">{stats.resources}</span>
        </div>
        <div className="stat-item">
          <span>Services Live</span>
          <span className="stat-value green">{stats.services}</span>
        </div>
        <div className="stat-item">
          <span>CloudWatch Alarms</span>
          <span className="stat-value green">{stats.alarms} active</span>
        </div>
        <div className="stat-item">
          <span>Monthly Cost</span>
          <span className="stat-value green">{stats.cost}</span>
        </div>
        <div className="stat-item">
          <span>API Status</span>
          <span className="stat-value green">{stats.uptime} 🟢</span>
        </div>
        <div className="stat-item">
          <span>Contact Form</span>
          <span className="stat-value" style={{ color: stats.apiStatus === '200' ? 'var(--neon-signal)' : 'red' }}>
            {stats.apiStatus === '200' ? 'Active ✓' : 'Down'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <span className="label-mono" style={{ color: 'var(--neon-signal)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="dot-green pulse" style={{ width: 8, height: 8 }}></span>
          {stats.status}
        </span>
        <span className="metadata" style={{ color: 'var(--steel-text)', fontSize: '0.65rem' }}>
          Last: {stats.lastDeployed}
        </span>
      </div>
    </section>
  );
}
