import { useState } from 'react';
import galleryRemoval from '../assets/gallery_removal.jpg';
import galleryPreservation from '../assets/gallery_preservation.jpg';
import galleryStump from '../assets/gallery_stump.jpg';

const TESTIMONIALS = [
  {
    quote: "FreshCanopy saved our 85-year-old legacy white oak. Other tree companies immediately recommended a complete removal, but their certified arborist came out, diagnosed the root system, and cabled it. Two years later, the tree is thriving and safe!",
    author: "Sarah L.",
    location: "Portland, OR",
    rating: 5,
    project: "Oak Preservation & Cabling"
  },
  {
    quote: "During the ice storm, a massive Douglas fir branch split and hung directly over our power lines and roof. The team responded within an hour of our call. They safely rigged and lowered the limb in pitch-black conditions. True lifesavers!",
    author: "David M.",
    location: "Beaverton, OR",
    rating: 5,
    project: "Emergency Storm Dispatch"
  },
  {
    quote: "Outstanding pruning work on our orchard and backyard birch trees. They optimized sunlight and air flow perfectly. They also cleaned up every single leaf and twig, leaving the yard cleaner than before. Highly recommend!",
    author: "Jessica K.",
    location: "Gresham, OR",
    rating: 5,
    project: "Aesthetic Pruning & Cleanup"
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Douglas Fir Safety Extraction",
    location: "Beaverton, OR",
    tag: "Removal",
    desc: "Rigging and dismantling of a dead 70-foot Fir leaning over a residential roof.",
    image: galleryRemoval
  },
  {
    id: 2,
    title: "Legacy Oak Canopy Pruning",
    location: "Portland, OR",
    tag: "Preservation",
    desc: "Deadwood removal, structural cable support, and weight reduction pruning.",
    image: galleryPreservation
  },
  {
    id: 3,
    title: "Eco Stump Pulverization",
    location: "Gresham, OR",
    tag: "Grinding",
    desc: "Restored a lawn by grinding a 48-inch cedar stump and seeding organic topsoil.",
    image: galleryStump
  }
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header reveal active">
          <span className="section-tagline">Our Proof</span>
          <h2 id="gallery-title" className="section-title">
            Canopy Work & <span className="text-gradient-primary">Client</span> Reviews
          </h2>
          <p className="section-description">
            We let our field results and client satisfaction speak for themselves. Discover how we protect and renew residential forestry.
          </p>
        </div>

        {/* Part 1: Interactive Testimonials Slider */}
        <div 
          className="testimonials-slider-container glass-panel"
          onKeyDown={handleKeyDown}
          tabIndex="0"
          aria-label="Customer testimonials slide deck. Use left and right arrow keys to navigate."
        >
          <button type="button" className="slider-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous testimonial">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="slider-arrow">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="testimonial-content-area" aria-live="polite">
            <div className="rating-stars" role="img" aria-label={`Rated ${TESTIMONIALS[activeIndex].rating} out of 5 stars`}>
              {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                <svg key={i} className="star-icon" viewBox="0 0 24 24" fill="var(--color-secondary)" stroke="var(--color-secondary)">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            
            <blockquote className="testimonial-quote">
              &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
            </blockquote>
            
            <div className="testimonial-metadata">
              <span className="testimonial-author">{TESTIMONIALS[activeIndex].author}</span>
              <span className="testimonial-sep">|</span>
              <span className="testimonial-location">{TESTIMONIALS[activeIndex].location}</span>
              <div className="testimonial-project-tag">Project: {TESTIMONIALS[activeIndex].project}</div>
            </div>
          </div>

          <button type="button" className="slider-nav-btn next-btn" onClick={handleNext} aria-label="Next testimonial">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="slider-arrow">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                className={`slider-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Part 2: Showcase Project Grid */}
        <div className="project-grid-title-wrapper">
          <h3 className="project-grid-heading">Featured Forestry Projects</h3>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card glass-panel hover-lift">
              <div className="project-image-container">
                <picture>
                  <source srcSet={project.image} type="image/jpeg" />
                  <img
                    src={project.image}
                    alt={`FreshCanopy tree service site for ${project.title}`}
                    className="project-image"
                    loading="lazy"
                  />
                </picture>
                <span className="project-tag">{project.tag}</span>
              </div>
              <div className="project-info">
                <div className="project-loc-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loc-icon" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{project.location}</span>
                </div>
                <h4 className="project-card-title">{project.title}</h4>
                <p className="project-card-desc">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
