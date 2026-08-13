import { useEffect } from 'react';
import { FAQ_DATA } from '../data/faqData';

export default function SEO({ title, description, path, type = 'website' }) {
  useEffect(() => {
    const applySeo = () => {
      // 1. Title Tag
      const defaultTitle = 'FreshCanopy Tree Care | Professional Certified Arborists';
      document.title = title ? `${title} | FreshCanopy Tree Care` : defaultTitle;

      // Helper to add or update meta elements
      const setMeta = (attrName, attrValue, content) => {
        if (!content) return;
        let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attrName, attrValue);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      // 2. Meta Description
      const defaultDesc = 'Eco-friendly, certified arborist services for residential and commercial properties. Tree trimming, pruning, hazard assessment, stump grinding, and 24/7 emergency response.';
      setMeta('name', 'description', description || defaultDesc);

      // 3. Open Graph Tags
      setMeta('property', 'og:title', title ? `${title} | FreshCanopy Tree Care` : defaultTitle);
      setMeta('property', 'og:description', description || defaultDesc);
      setMeta('property', 'og:type', type);
      setMeta('property', 'og:url', `https://freshcanopytreecare.com${path || ''}`);
      setMeta('property', 'og:image', 'https://res.cloudinary.com/freshcanopy/image/upload/v1/og-image.jpg');
      setMeta('property', 'og:site_name', 'FreshCanopy Tree Care');

      // 4. Twitter Cards
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', title ? `${title} | FreshCanopy Tree Care` : defaultTitle);
      setMeta('name', 'twitter:description', description || defaultDesc);
      setMeta('name', 'twitter:image', 'https://res.cloudinary.com/freshcanopy/image/upload/v1/og-image.jpg');

      // 5. Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://freshcanopytreecare.com${path || ''}`);

      // 6. JSON-LD Structured Data Injection
      const schemaData = [];

      // LocalBusiness Schema
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'FreshCanopy Tree Care',
        'image': 'https://res.cloudinary.com/freshcanopy/image/upload/v1/hero_canopy.jpg',
        '@id': 'https://freshcanopytreecare.com/#localbusiness',
        'url': 'https://freshcanopytreecare.com',
        'telephone': '+1-800-555-8733',
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '120 Canopy Way',
          'addressLocality': 'Portland',
          'addressRegion': 'OR',
          'postalCode': '97201',
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 45.5152,
          'longitude': -122.6784
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '07:00',
            'closes': '19:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': 'Sunday',
            'opens': '00:00',
            'closes': '23:59',
            'description': '24/7 Emergency Tree Service'
          }
        ],
        'sameAs': [
          'https://facebook.com/freshcanopy',
          'https://instagram.com/freshcanopy',
          'https://twitter.com/freshcanopy'
        ]
      });

      // Services Schema
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Arborist & Tree Care Services',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'FreshCanopy Tree Care'
        },
        'areaServed': {
          '@type': 'State',
          'name': 'Oregon'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Tree Care Services Catalog',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Tree Pruning & Trimming',
                'description': 'Precision structural pruning to enhance tree health, shape, and safety.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Emergency Tree Removal',
                'description': 'Rapid hazard assessment and safe removal of storm-damaged or dead trees.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Arborist Consultation & Diagnostic',
                'description': 'Comprehensive health check, pest identification, and soil treatment strategies by certified arborists.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Stump Grinding & Land Clearing',
                'description': 'Eco-conscious root removals and stump grinding to restore ground aesthetics.'
              }
            }
          ]
        }
      });

      // Breadcrumb Schema
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://freshcanopytreecare.com'
          },
          ...(path && path !== '/' ? [{
            '@type': 'ListItem',
            'position': 2,
            'name': path.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            'item': `https://freshcanopytreecare.com${path}`
          }] : [])
        ]
      });

      // FAQ Schema
      if (FAQ_DATA && FAQ_DATA.length > 0) {
        schemaData.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': FAQ_DATA.map(item => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.answer
            }
          }))
        });
      }

      // Inject Script Tags
      const existingScripts = document.querySelectorAll('script[data-schema="seo-jsonld"]');
      existingScripts.forEach(el => el.remove());

      schemaData.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'seo-jsonld');
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    };

    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = requestIdleCallback(applySeo, { timeout: 2000 });
    } else {
      idleId = setTimeout(applySeo, 200);
    }

    return () => {
      if ('cancelIdleCallback' in window && typeof idleId === 'number') {
        cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      const scripts = document.querySelectorAll('script[data-schema="seo-jsonld"]');
      scripts.forEach(el => el.remove());
    };
  }, [title, description, path, type]);

  return null;
}
