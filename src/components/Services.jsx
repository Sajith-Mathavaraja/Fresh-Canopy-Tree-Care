import { useState } from 'react';

// Import service-specific arborist images
import imgPruning from '../assets/service_pruning.webp';
import imgRemoval from '../assets/service_removal.webp';
import imgConsulting from '../assets/service_consulting.webp';
import imgEmergency from '../assets/service_emergency.webp';
import imgGrinding from '../assets/service_grinding.webp';

export default function Services({ onSelectService }) {
  const [activeTab, setActiveTab] = useState('pruning');

  const servicesList = [
    {
      id: 'pruning',
      title: 'Precision Pruning & Trimming',
      tagline: 'Enhance tree health, structure, and aesthetic beauty.',
      desc: 'Our precision pruning techniques focus on structural integrity, deadwood removal, and sunlight penetration. Guided by ISA standards, we prune to prolong tree life and keep your property safe.',
      cta: 'Request Pruning Quote',
      image: imgPruning,
      inclusions: [
        'ISA Certified Arborist supervision',
        'Crown thinning, cleaning, and raising',
        'Structural pruning for storm resistance',
        'Complete debris chipping & site cleanup'
      ],
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-tab-icon">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      )
    },
    {
      id: 'removal',
      title: 'Hazardous Tree Removal',
      tagline: 'Safe, controlled dismantling in tight urban environments.',
      desc: 'Controlled removals of compromised, dead, or high-risk trees near homes and power lines. We use advanced rigging, lowering systems, and specialized equipment to guarantee zero property damage.',
      cta: 'Request Removal Quote',
      image: imgRemoval,
      inclusions: [
        'State-of-the-art rope and rigging techniques',
        'Confined-space structural protection',
        'Insured crane and bucket truck support',
        'Optional wood hauling or chunking'
      ],
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-tab-icon">
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      )
    },
    {
      id: 'consulting',
      title: 'Arborist Health Consulting',
      tagline: 'Scientific disease diagnosis, testing, and reports.',
      desc: 'Protect your valuable canopy with specialist health reports. We diagnose fungal infections, insect infestations, nutrient deficiencies, and offer legal permit tree risk assessments.',
      cta: 'Request Consulting Quote',
      image: imgConsulting,
      inclusions: [
        'Certified ISA Tree Risk Assessment (TRAQ)',
        'Soil pH and root zone decay analysis',
        'Disease mitigation & injection scheduling',
        'Official permit and construction documentation'
      ],
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-tab-icon">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    },
    {
      id: 'emergency',
      title: '24/7 Emergency Storm Care',
      tagline: 'Immediate response dispatch for hazardous failures.',
      desc: 'Fallen trees or split limbs resting on roofs or blocking pathways require urgent action. Our emergency response team is on standby 24/7 to safely stabilize and clear hazardous storm damage.',
      cta: 'Request Emergency Dispatch',
      isEmergency: true,
      image: imgEmergency,
      inclusions: [
        'Rapid arborist crew mobilization',
        'Dangerous hanger limb extraction',
        'Targeted crane limb removal',
        'Insurance photo & documentation logs'
      ],
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-tab-icon">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      id: 'grinding',
      title: 'Stump Grinding & Restoration',
      tagline: 'Eradicate stumps to reclaim clean lawn space.',
      desc: 'Unsightly stumps attract pests and ruin landscaping. We grind stumps deep below grade, vacuum leftover chips, and prepare the site for replanting grass, shrubs, or new trees.',
      cta: 'Request Stump Grinding',
      image: imgGrinding,
      inclusions: [
        'Deep sub-grade grinding (up to 12 inches)',
        'Root flare chasing and removal',
        'Site backfilling and grading',
        'Mulch recycling or removal options'
      ],
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-tab-icon">
          <path d="M20 20H4v-4h16v4z" />
          <path d="M12 4v12" />
          <path d="M8 8l4-4 4 4" />
        </svg>
      )
    }
  ];

  const handleServiceSelect = (serviceId) => {
    onSelectService(serviceId);
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  const activeService = servicesList.find(s => s.id === activeTab) || servicesList[0];

  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header reveal active">
          <span className="section-tagline">What We Do</span>
          <h2 id="services-title" className="section-title">
            Our Professional <span className="text-gradient-primary">Canopy</span> Solutions
          </h2>
          <p className="section-description">
            We provide tree care grounded in ecological science and advanced safety techniques. Our ISA certified specialists ensure your property is protected and your canopy flourishes.
          </p>
        </div>

        {/* ── Desktop Split Showcase Layout ── */}
        <div className="services-showcase-container">
          
          {/* Left Side: Navigation Tabs Stack */}
          <div className="services-tabs-stack" role="tablist" aria-label="Tree care services list">
            {servicesList.map((service) => (
              <button
                key={service.id}
                role="tab"
                aria-selected={activeTab === service.id}
                aria-controls={`panel-${service.id}`}
                id={`tab-${service.id}`}
                className={`service-tab-item ${activeTab === service.id ? 'active' : ''} ${service.isEmergency ? 'emergency-tab' : ''}`}
                onClick={() => setActiveTab(service.id)}
              >
                <span className="tab-icon-wrapper" aria-hidden="true">
                  {service.svg}
                </span>
                <span className="tab-text-content">
                  <span className="tab-title">{service.title}</span>
                  <span className="tab-tagline">{service.tagline}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Right Side: Active Featured Service Split Card */}
          <div 
            className={`service-detail-card ${activeService.isEmergency ? 'emergency-card-accent' : ''}`}
            role="tabpanel"
            id={`panel-${activeService.id}`}
            aria-labelledby={`tab-${activeService.id}`}
          >
            {/* Split content inner: Image Banner on top, Details below */}
            <div className="card-split-grid">
              
              {/* Top of Card: Premium Image Showcase */}
              <div className="card-image-side">
                <img 
                  src={activeService.image} 
                  alt={activeService.title} 
                  className="service-detail-image"
                  loading="lazy"
                />
              </div>

              {/* Bottom of Card: Details */}
              <div className="card-details-side">
                <div className="card-top-header">
                  <span className="card-tagline">Featured Service details</span>
                  <h3 className="card-title">{activeService.title}</h3>
                </div>
                
                <p className="card-description">{activeService.desc}</p>
                
                <div className="card-inclusions-wrapper">
                  <h4 className="inclusions-heading">What is included:</h4>
                  <ul className="inclusions-list">
                    {activeService.inclusions.map((item, idx) => (
                      <li key={idx} className="inclusion-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-icon" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`btn ${activeService.isEmergency ? 'btn-emergency' : 'btn-primary'} card-action-btn`}
                  onClick={() => handleServiceSelect(activeService.id)}
                  aria-label={`Get quote for ${activeService.title}`}
                >
                  {activeService.cta}
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px', marginLeft: '8px' }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
