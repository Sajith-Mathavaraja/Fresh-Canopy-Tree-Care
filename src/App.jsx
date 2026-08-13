import { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Reveal from './components/Reveal';

// Lazy load below-the-fold sections, SEO schema, and modal overlays for maximum initial load performance (code splitting)
const SEO = lazy(() => import('./components/SEO'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Gallery = lazy(() => import('./components/Gallery'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const PolicyModals = lazy(() => import('./components/PolicyModals'));

// A clean, height-matched skeleton loader to prevent Layout Shifts (CLS) during lazy loading
const SectionSkeleton = ({ height = '400px' }) => (
  <div 
    className="container section-skeleton-wrapper" 
    style={{ 
      height, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      gap: '16px',
      margin: '40px auto',
      background: 'rgba(24, 43, 34, 0.05)',
      borderRadius: '16px',
      border: '1px dashed rgba(46, 204, 113, 0.15)'
    }}
  >
    <div className="skeleton-line" style={{ width: '120px', height: '16px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px' }} />
    <div className="skeleton-line" style={{ width: '280px', height: '32px', background: 'rgba(0,0,0,0.05)', borderRadius: '6px' }} />
    <div className="skeleton-line" style={{ width: '80%', height: '100px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }} />
  </div>
);

export default function App() {
  const [modalType, setModalType] = useState(null); // 'privacy' or 'terms' or null
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectService = (serviceId) => {
    // Services component handles smooth scrolling directly.
  };

  return (
    <>
      {/* Dynamic SEO & Schema Injection */}
      <Suspense fallback={null}>
        <SEO 
          title="Expert Certified Arborist Services in Buffalo & Clarence, NY" 
          description="FreshCanopy Tree Care provides certified arborist services, professional trimming, safe removals, stump grinding, and 24/7 storm damage emergency response in Buffalo, Clarence, and Erie County, NY."
          path="/"
        />
      </Suspense>

      {/* Accessible skip link for keyboard-only visitors */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Persistent Sticky Navbar */}
      <Navbar />

      <main id="main-content">
        {/* Above-the-Fold: Loaded Eagerly */}
        <Hero />

        {/* Below-the-Fold: Loaded Asynchronously (React Suspense & Code Splitting) */}
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <Reveal>
            <Services onSelectService={handleSelectService} />
          </Reveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <Reveal>
            <About />
          </Reveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="650px" />}>
          <Reveal>
            <Gallery />
          </Reveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="900px" />}>
          <Reveal>
            <Contact />
          </Reveal>
        </Suspense>
      </main>

      {/* Persistent Footer */}
      <Suspense fallback={<SectionSkeleton height="350px" />}>
        <Footer 
          onOpenPrivacy={() => handleOpenModal('privacy')} 
          onOpenTerms={() => handleOpenModal('terms')} 
        />
      </Suspense>

      {/* Policy Documents Modal Overlay */}
      <Suspense fallback={null}>
        <PolicyModals 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          type={modalType} 
        />
      </Suspense>
    </>
  );
}
