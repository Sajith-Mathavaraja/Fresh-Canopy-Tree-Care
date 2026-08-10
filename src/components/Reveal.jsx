import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger animation only once
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px', // trigger slightly before entering viewport
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'active' : ''}`}>
      {children}
    </div>
  );
}
