import aboutArborist from '../assets/about_arborist.jpg';

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="container about-grid">
        {/* Left Column: Image & Badges */}
        <div className="about-image-wrapper reveal active">
          <picture>
            <source srcSet={aboutArborist} type="image/jpeg" />
            <img
              src={aboutArborist}
              alt="Friendly ISA Certified Arborist holding clipboard, standing near residential trees"
              className="about-image hover-lift"
              loading="lazy"
            />
          </picture>

          {/* Floating Eco Badge */}
          <div className="eco-badge glass-panel animate-fade-in" aria-label="Eco-Friendly Tree Care Promise">
            <div className="eco-icon-container" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h4 className="eco-badge-title">100% Eco-Certified</h4>
              <p className="eco-badge-text">Organic treatments, low emissions, and tree-preservation first approach.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="about-text-wrapper reveal active">
          <span className="section-tagline">Our Canopy Philosophy</span>
          <h2 id="about-title" className="section-title">
            Preserving Oregon's <span className="text-gradient-primary">Green</span> Legacy
          </h2>
          <p className="about-lead">
            Founded with a passion for arboriculture and safety, FreshCanopy Tree Care combines the latest scientific practices with a deep commitment to environmental stewardship.
          </p>
          
          <div className="about-features-list">
            <div className="about-feature-item">
              <div className="about-feature-bullet" aria-hidden="true" />
              <div>
                <h3 className="about-feature-heading">Tree Preservation First</h3>
                <p className="about-feature-text">
                  We believe removal should be a last resort. Our certified specialists inspect and diagnose decay, cabling limbs where possible, treating diseases, and building plant health care programs to save legacy trees.
                </p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="about-feature-bullet" aria-hidden="true" />
              <div>
                <h3 className="about-feature-heading">Strict Safety Standards</h3>
                <p className="about-feature-text">
                  Tree care is dangerous work. We follow strict OSHA and ANSI A300 guidelines. Every crew member is trained in advanced aerial rigging, safety rescues, and chainsaw handling, ensuring no risk to your home.
                </p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="about-feature-bullet" aria-hidden="true" />
              <div>
                <h3 className="about-feature-heading">Local, Community-First Team</h3>
                <p className="about-feature-text">
                  We are locally owned and operated in Portland, OR. We give back by pruning community parks, volunteering for neighborhood planting programs, and recycling 100% of our wood chips back into clean mulch for local yards.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="about-stats-grid">
            <div className="stat-card">
              <span className="stat-number">12+</span>
              <span className="stat-label">Years Service</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1,800+</span>
              <span className="stat-label">Trees Saved</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Safety Record</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
