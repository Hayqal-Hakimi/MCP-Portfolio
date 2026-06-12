import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleHireMe = () => {
    closeMenu();
    navigate('/contact');
  };

  return (
    <header className="glass-nav">
      <div className="nav-wrapper">
        <NavLink 
          to="/" 
          className="headline-lg" 
          style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-signal)', fontWeight: 'bold' }}
          onClick={closeMenu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          DevOps Architect
        </NavLink>

        {/* Desktop Links */}
        <nav className="desktop-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `label-mono ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--neon-signal)' : 'var(--steel-text)',
              borderBottom: isActive ? '2px solid var(--neon-signal)' : '2px solid transparent',
              paddingBottom: '0.25rem',
            })}
          >
            Home
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => `label-mono ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--neon-signal)' : 'var(--steel-text)',
              borderBottom: isActive ? '2px solid var(--neon-signal)' : '2px solid transparent',
              paddingBottom: '0.25rem',
            })}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `label-mono ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--neon-signal)' : 'var(--steel-text)',
              borderBottom: isActive ? '2px solid var(--neon-signal)' : '2px solid transparent',
              paddingBottom: '0.25rem',
            })}
          >
            Contact
          </NavLink>
          <button className="btn btn-primary" onClick={handleHireMe}>Hire Me</button>
        </nav>

        {/* Hamburger Menu Toggle Button */}
        <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Fullscreen Mobile Navigation Menu Overlay */}
      {isOpen && (
        <div className="mobile-overlay">
          <button className="mobile-overlay-close" onClick={closeMenu} aria-label="Close Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <nav className="mobile-nav-links">
            <NavLink 
              to="/" 
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/projects" 
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Projects
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
          </nav>
          
          <button className="btn btn-primary" onClick={handleHireMe} style={{ width: '100%', padding: '1.25rem 0' }}>
            Hire Me
          </button>
        </div>
      )}
    </header>
  );
}
