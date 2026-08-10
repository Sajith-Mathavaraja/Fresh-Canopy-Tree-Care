import { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="container faq-container-narrow">
        
        {/* Section Header */}
        <div className="section-header reveal active">
          <span className="section-tagline">Common Questions</span>
          <h2 id="faq-title" className="section-title">
            Frequently Asked <span className="text-gradient-primary">Canopy</span> Questions
          </h2>
          <p className="section-description">
            Everything you need to know about certified tree care, permits, emergency services, and safety protocols.
          </p>
        </div>

        {/* Accordion Accordance List */}
        <div className="faq-accordion-wrapper">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            const triggerId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div 
                key={idx} 
                className={`accordion-item ${isOpen ? 'open' : ''}`}
              >
                <h3>
                  <button
                    id={triggerId}
                    className="accordion-trigger"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    type="button"
                  >
                    <span>{item.question}</span>
                    <span className="accordion-icon-wrapper" aria-hidden="true">
                      <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  className="accordion-content"
                  role="region"
                  aria-labelledby={triggerId}
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s, visibility 0.3s'
                  }}
                >
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
