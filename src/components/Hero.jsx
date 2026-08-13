import heroWorker from '../assets/hero_worker.webp';

export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', targetId);
    }
  };

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      {/* Dynamic Glassmorphic Background Blobs */}
      <div className="hero-bg-blobs" aria-hidden="true">
        <div className="hero-blob hero-blob-green" />
        <div className="hero-blob hero-blob-gold" />
      </div>

      <div className="container hero-content-wrapper">
        
        {/* Left Column: Text & Styled Actions */}
        <div className="hero-text-block animate-fade-up">
          <h1 id="hero-title" className="hero-headline">
            Nurturing Canopy <span className="text-gradient-primary">Health</span>, Safeguarding Homes
          </h1>
          <p className="hero-description">
            Professional, eco-conscious tree care tailored for Oregon landscapes. From precision structural pruning to hazardous removals and 24/7 emergency response, our certified specialists preserve your property's safety and beauty.
          </p>

          <div className="hero-actions">
            <a
              href="#about"
              className="btn btn-outline hero-cta-btn"
              onClick={(e) => handleScrollTo(e, '#about')}
              aria-label="Learn more about our services"
            >
              MORE ABOUT
              <svg className="btn-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px', marginLeft: '8px' }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            
            <a
              href="#contact"
              className="hero-square-play-btn"
              onClick={(e) => handleScrollTo(e, '#contact')}
              aria-label="Request Free Estimate now"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon" aria-hidden="true" style={{ width: '18px', height: '18px' }}>
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Styled Cutout Image Container */}
        <div className="hero-image-block animate-fade-in">
          <div className="hero-image-cutout">
            <div className="hero-cutout-inner">
              <img
                src={heroWorker}
                alt="Certified arborist working safely high in a tree with a tree care truck below"
                className="hero-cutout-image"
                fetchPriority="high"
                decoding="sync"
                width="600"
                height="600"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
