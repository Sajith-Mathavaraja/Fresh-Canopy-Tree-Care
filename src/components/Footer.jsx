import { useEffect, useState } from 'react';
import logo from '../assets/logo.webp';

export default function Footer({ onOpenPrivacy, onOpenTerms }) {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 300;
          setShowScrollBtn(prev => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', targetId);
    }
  };

  return (
    <footer className="footer-section" aria-labelledby="footer-brand-title">
      <div className="container footer-grid">
        
        {/* Column 1: Brand & Socials */}
        <div className="footer-brand-col">
          <div className="footer-logo-row" id="footer-brand-title">
            <a href="#home" className="logo-container" onClick={e => handleScrollTo(e, '#home')} aria-label="FreshCanopy – back to top" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <img src={logo} alt="FreshCanopy Tree Care Logo" className="footer-logo-img" width="160" height="160" />
              <span className="logo-text">
                Fresh<span className="logo-text-accent">Canopy</span>
              </span>
            </a>
          </div>
          <p className="footer-brand-desc">
            Certified arborists providing sustainable tree trimming, precision removal, and emergency storm response. Caring for your landscape.
          </p>
          <div className="footer-social-row">
            <a href="https://facebook.com/freshcanopy" className="social-icon-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://instagram.com/freshcanopy" className="social-icon-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://linkedin.com" className="social-icon-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-links-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links-list">
            <li><a href="#home" onClick={(e) => handleScrollTo(e, '#home')}>Home</a></li>
            <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')}>Our Services</a></li>
            <li><a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>About Us</a></li>
            <li><a href="#gallery" onClick={(e) => handleScrollTo(e, '#gallery')}>Customer Reviews</a></li>
            <li><a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Legal Documents */}
        <div className="footer-links-col">
          <h3 className="footer-heading">Legal Documents</h3>
          <ul className="footer-links-list">
            <li><a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenPrivacy(); }}>Privacy Policy</a></li>
            <li><a href="#terms" onClick={(e) => { e.preventDefault(); onOpenTerms(); }}>Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="footer-contact-col">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact-info-list">
            <li className="contact-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+17164568758" className="contact-info-link">716-456-8758</a>
            </li>
            <li className="contact-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="contact-info-text">9950 County Rd, Clarence, Buffalo, NY 14032</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <div className="footer-bottom-left">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} FreshCanopy Tree Service. All rights reserved.
            </p>
            <div className="footer-policy-inline-links">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenPrivacy(); }}>Privacy Policy</a>
              <span className="policy-sep">•</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); onOpenTerms(); }}>Terms & Conditions</a>
            </div>
          </div>
          <div className="footer-bottom-right">
            <span className="accreditation-text">
              Fully Licensed, Bonded & Insured — Commercial & Residential
            </span>
            
            {/* Scroll to Top Button */}
            {showScrollBtn && (
              <a 
                href="#home" 
                className="scroll-to-top-btn" 
                onClick={(e) => handleScrollTo(e, '#home')}
                aria-label="Scroll back to top of page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
