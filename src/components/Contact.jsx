import { useEffect, useState, useRef } from 'react';

export default function Contact() {
  const [shouldLoadForm, setShouldLoadForm] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    // Trigger immediately if target hash is #contact
    if (window.location.hash === '#contact') {
      setShouldLoadForm(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadForm(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // Pre-load 300px before scrolling into view
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Dynamically load the form embed script ONLY when section is approached
  useEffect(() => {
    if (!shouldLoadForm) return;

    const script = document.createElement('script');
    script.src = "https://link.kdlead.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [shouldLoadForm]);

  return (
    <section id="contact" ref={contactRef} className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-grid">
        
        {/* Left Column: Direct Contact Details & Urgency Info */}
        <div className="contact-info-panel reveal active">
          <span className="section-tagline">Connect With Us</span>
          <h2 id="contact-title" className="section-title">
            Request A Free <span className="text-gradient-primary">Canopy</span> Consultation
          </h2>
          <p className="contact-info-desc">
            Fill out our secure form to schedule a site evaluation. For urgent tree hazards or storm-damaged limbs blocking driveways, please call our 24/7 emergency dispatch immediately.
          </p>

          <div className="contact-cards-stack">
            <div className="contact-card-item glass-panel">
              <div className="contact-card-icon-wrapper emergency-call" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="contact-card-heading emergency-title">24/7 Emergency Dispatch</h3>
                <a href="tel:+17164568758" className="contact-link phone-emergency">716-456-8758</a>
                <p className="contact-card-text">Priority response within 1 hour for Western New York.</p>
              </div>
            </div>

            <div className="contact-card-item glass-panel">
              <div className="contact-card-icon-wrapper" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="contact-card-heading">Service Hub</h3>
                <span className="contact-address">9950 County Rd, Clarence, Buffalo, NY 14032</span>
                <p className="contact-card-text">Serving Clarence, Buffalo, and Erie County.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form Iframe Panel */}
        <div className="contact-form-panel reveal active" style={{ padding: '0' }}>
          {shouldLoadForm ? (
            <iframe
              src="https://link.kdlead.com/widget/form/Peq10S4cHDMRRNTk9FGA"
              style={{ width: '100%', height: '830px', border: 'none', borderRadius: '8px' }}
              id="inline-Peq10S4cHDMRRNTk9FGA" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="FreshCanopy Tree Care Form"
              data-height="830"
              data-layout-iframe-id="inline-Peq10S4cHDMRRNTk9FGA"
              data-form-id="Peq10S4cHDMRRNTk9FGA"
              title="FreshCanopy Tree Care Form"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div style={{ height: '830px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fbf9', border: '1px solid rgba(27, 133, 71, 0.12)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.95rem' }}>Loading Form...</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
