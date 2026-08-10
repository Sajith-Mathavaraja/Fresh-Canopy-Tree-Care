import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    enforce: 'post',
    generateBundle(options, bundle) {
      let cssContent = '';
      const cssKeys = [];

      for (const key of Object.keys(bundle)) {
        if (key.endsWith('.css')) {
          cssContent += bundle[key].source;
          cssKeys.push(key);
        }
      }

      const htmlKey = Object.keys(bundle).find(k => k.endsWith('index.html'));
      if (htmlKey && bundle[htmlKey]) {
        let html = bundle[htmlKey].source;

        if (cssContent) {
          html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*>/gi, '');
          html = html.replace('</head>', `<style>${cssContent}</style></head>`);
          for (const k of cssKeys) {
            delete bundle[k];
          }
        }

        // Preload LCP hero image in initial HTML document for Instant LCP Discovery
        const heroWebpKey = Object.keys(bundle).find(k => k.includes('hero_worker') && k.endsWith('.webp'));
        if (heroWebpKey) {
          const basePath = process.env.GITHUB_ACTIONS ? '/Fresh-Canopy-Tree-Care/' : '/';
          const heroUrl = basePath + heroWebpKey;
          const preloadTag = `<link rel="preload" as="image" href="${heroUrl}" type="image/webp" fetchpriority="high" />`;
          html = html.replace('</head>', `${preloadTag}</head>`);
        }

        bundle[htmlKey].source = html;
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  base: process.env.GITHUB_ACTIONS ? '/Fresh-Canopy-Tree-Care/' : '/',
})
