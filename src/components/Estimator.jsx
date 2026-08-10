import { useState } from 'react';

const SERVICES = [
  { id: 'pruning', name: 'Precision Pruning', basePrice: 200, multiplier: 1.0 },
  { id: 'removal', name: 'Tree Removal', basePrice: 600, multiplier: 1.5 },
  { id: 'consulting', name: 'Arborist Consulting', basePrice: 150, multiplier: 0.8 },
  { id: 'grinding', name: 'Stump Grinding', basePrice: 150, multiplier: 0.9 },
];

const HEIGHTS = [
  { id: 'small', name: 'Small (Under 15 ft)', desc: 'Young trees, ornamental saplings', multiplier: 0.8 },
  { id: 'medium', name: 'Medium (15 - 30 ft)', desc: 'Average backyard trees, birch, maples', multiplier: 1.2 },
  { id: 'large', name: 'Large (30 - 50 ft)', desc: 'Mature oak, pine, Douglas fir', multiplier: 1.8 },
  { id: 'xlarge', name: 'Extra Large (Over 50 ft)', desc: 'Massive legacy trees, forest standards', multiplier: 2.8 },
];

const ACCESSIBILITY = [
  { id: 'easy', name: 'Easy Access (Open Field/Yard)', desc: 'No nearby fences, power lines, or structures.', multiplier: 1.0 },
  { id: 'moderate', name: 'Moderate Access (Near Fences/Wires)', desc: 'Requires standard rigging and safe planning.', multiplier: 1.25 },
  { id: 'difficult', name: 'Difficult Access (Over roof/tight space)', desc: 'High complexity, advanced technical rigging required.', multiplier: 1.6 },
];

export default function Estimator({ onLockEstimate }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedHeight, setSelectedHeight] = useState(HEIGHTS[1].id);
  const [selectedAccess, setSelectedAccess] = useState(ACCESSIBILITY[0].id);

  const activeService = SERVICES.find(s => s.id === selectedService) || SERVICES[0];
  const activeHeight = HEIGHTS.find(h => h.id === selectedHeight) || HEIGHTS[1];
  const activeAccess = ACCESSIBILITY.find(a => a.id === selectedAccess) || ACCESSIBILITY[0];

  // Estimate Calculation Formula
  // Base Price * Service Multiplier * Height Multiplier * Access Multiplier
  const calculateEstimate = () => {
    const base = activeService.basePrice;
    const sMult = activeService.multiplier;
    const hMult = activeHeight.multiplier;
    const aMult = activeAccess.multiplier;

    const midPrice = Math.round(base * sMult * hMult * aMult);
    const minPrice = Math.round(midPrice * 0.85); // 15% lower limit
    const maxPrice = Math.round(midPrice * 1.15); // 15% upper limit

    // Standardize to increments of $10
    const roundToTen = (num) => Math.round(num / 10) * 10;

    return {
      min: roundToTen(minPrice),
      max: roundToTen(maxPrice),
    };
  };

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(SERVICES[0].id);
    setSelectedHeight(HEIGHTS[1].id);
    setSelectedAccess(ACCESSIBILITY[0].id);
  };

  const handleLockIn = () => {
    const { min, max } = calculateEstimate();
    const estimateDetails = {
      service: activeService.id,
      height: activeHeight.name,
      accessibility: activeAccess.name,
      min,
      max,
      summaryText: `Interactive Estimate Summary:
- Service: ${activeService.name}
- Tree Height: ${activeHeight.name}
- Accessibility: ${activeAccess.name}
- Approximate Range: $${min} - $${max}`
    };

    onLockEstimate(estimateDetails);

    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  const { min, max } = calculateEstimate();
  const progressPercent = ((step - 1) / 3) * 100;

  return (
    <section id="estimator" className="estimator-section" aria-labelledby="estimator-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header reveal active">
          <span className="section-tagline">Calculate Cost</span>
          <h2 id="estimator-title" className="section-title">
            Interactive Cost <span className="text-gradient-primary">Estimator</span>
          </h2>
          <p className="section-description">
            Get an instant, transparent estimate for your tree care needs. Fine-tune your selections and request a priority quote.
          </p>
        </div>

        {/* Estimator Wrapper */}
        <div className="estimator-container glass-panel">
          
          {/* Progress Bar */}
          <div className="estimator-progress-wrapper">
            <div className="estimator-progress-bar" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100" aria-label="Estimator Progress">
              <div className="estimator-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="estimator-steps-indicators">
              <span className={`step-dot ${step >= 1 ? 'active' : ''} ${step === 1 ? 'current' : ''}`}>1. Service</span>
              <span className={`step-dot ${step >= 2 ? 'active' : ''} ${step === 2 ? 'current' : ''}`}>2. Height</span>
              <span className={`step-dot ${step >= 3 ? 'active' : ''} ${step === 3 ? 'current' : ''}`}>3. Access</span>
              <span className={`step-dot ${step >= 4 ? 'active' : ''} ${step === 4 ? 'current' : ''}`}>4. Result</span>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="estimator-content-panel">
            
            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="estimator-step-block animate-fade-in">
                <fieldset className="estimator-fieldset">
                  <legend className="estimator-legend">Step 1: Choose a Tree Service</legend>
                  <div className="estimator-options-grid">
                    {SERVICES.map(s => (
                      <label key={s.id} className={`estimator-card-option ${selectedService === s.id ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="service-type"
                          value={s.id}
                          checked={selectedService === s.id}
                          onChange={() => setSelectedService(s.id)}
                          className="sr-only"
                        />
                        <span className="option-title">{s.name}</span>
                        <span className="option-desc">Base planning cost starting at ${s.basePrice}.</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* STEP 2: Select Height */}
            {step === 2 && (
              <div className="estimator-step-block animate-fade-in">
                <fieldset className="estimator-fieldset">
                  <legend className="estimator-legend">Step 2: Tree Height Estimate</legend>
                  <div className="estimator-options-grid">
                    {HEIGHTS.map(h => (
                      <label key={h.id} className={`estimator-card-option ${selectedHeight === h.id ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="height-type"
                          value={h.id}
                          checked={selectedHeight === h.id}
                          onChange={() => setSelectedHeight(h.id)}
                          className="sr-only"
                        />
                        <span className="option-title">{h.name}</span>
                        <span className="option-desc">{h.desc}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* STEP 3: Accessibility */}
            {step === 3 && (
              <div className="estimator-step-block animate-fade-in">
                <fieldset className="estimator-fieldset">
                  <legend className="estimator-legend">Step 3: Location & Accessibility</legend>
                  <div className="estimator-options-grid">
                    {ACCESSIBILITY.map(a => (
                      <label key={a.id} className={`estimator-card-option ${selectedAccess === a.id ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="access-type"
                          value={a.id}
                          checked={selectedAccess === a.id}
                          onChange={() => setSelectedAccess(a.id)}
                          className="sr-only"
                        />
                        <span className="option-title">{a.name}</span>
                        <span className="option-desc">{a.desc}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* STEP 4: Results */}
            {step === 4 && (
              <div className="estimator-step-block estimator-results-block animate-fade-in">
                <h3 className="result-heading">Your Approximate Estimate Range</h3>
                
                {/* Large Result Callout */}
                <div className="result-price-callout">
                  <span className="price-range">${min} - ${max}</span>
                  <span className="price-label">Estimated Price Range*</span>
                </div>

                {/* Estimate Parameters Table */}
                <div className="result-table-wrapper">
                  <table className="result-details-table">
                    <caption>Estimate Selections Summary</caption>
                    <thead>
                      <tr>
                        <th scope="col">Parameter</th>
                        <th scope="col">Selection</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Service Type</td>
                        <td>{activeService.name}</td>
                      </tr>
                      <tr>
                        <td>Estimated Tree Height</td>
                        <td>{activeHeight.name}</td>
                      </tr>
                      <tr>
                        <td>Access Classification</td>
                        <td>{activeAccess.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="result-disclaimer">
                  *Disclaimer: This is an automated estimate for budget planning purposes. Actual job pricing requires site evaluation by our certified arborists and may vary depending on storm damage, hazardous limbs, or utility line intersections.
                </div>
              </div>
            )}

          </div>

          {/* Navigation Controls */}
          <div className="estimator-nav-actions">
            {step > 1 && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handlePrev}
                aria-label="Go back to previous step"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                aria-label="Proceed to next step"
              >
                Continue
              </button>
            ) : (
              <div className="result-final-buttons">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                  aria-label="Start estimate over"
                >
                  Start Over
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLockIn}
                  aria-label="Lock in estimate and scroll to quote request form"
                >
                  Lock In & Request Quote
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
