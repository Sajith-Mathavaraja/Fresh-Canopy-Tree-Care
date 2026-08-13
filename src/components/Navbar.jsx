import { useState, useEffect } from 'react';
import logo from '../assets/logo.webp';

const navLinks = [
  { label: 'Home',      href: '#home' },
  { label: 'Services',  href: '#services' },
  { label: 'About',     href: '#about' },
  { label: 'Reviews',   href: '#gallery' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]             = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track active section using IntersectionObserver to eliminate forced reflows (layout thrashing)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px', // Center viewport activation zone
        threshold: 0,
      }
    );

    const sectionIds = navLinks.map(link => link.href.slice(1));
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="header">
      <div className="nav-container container">

        {/* ── Logo ── */}
        <a href="#home" className="logo-container" onClick={e => go(e, '#home')} aria-label="FreshCanopy – back to top">
          <img src={logo} alt="FreshCanopy Tree Care Logo" className="logo-img" width="160" height="160" />
          <span className="logo-text">
            Fresh<span className="logo-text-accent">Canopy</span>
          </span>
        </a>

        {/* ── Desktop nav links (centred) ── */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                  onClick={e => go(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right-side icon actions ── */}
        <div className="nav-actions-right">
          {/* Phone icon */}
          <a href="tel:+17164568758" className="nav-icon-btn" aria-label="Call us">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07
                       A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0
                       012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0
                       01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0
                       012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>

          {/* Quote CTA button */}
          <a
            href="#contact"
            className="nav-quote-btn"
            onClick={e => go(e, '#contact')}
          >
            Get Free Quote
          </a>

          {/* Mobile hamburger */}
          <button
            className={`mobile-toggle ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(o => !o)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>

      </div>

      {/* ── Mobile panel ── */}
      <nav id="mobile-nav" className={`mobile-nav ${isOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <ul className="mobile-nav-list">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`mobile-nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={e => go(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-cta-li">
            <a href="#contact" className="btn btn-primary mobile-cta-btn" onClick={e => go(e, '#contact')}>
              Get Free Quote
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
