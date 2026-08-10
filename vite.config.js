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

      if (!cssContent) return;

      const htmlKey = Object.keys(bundle).find(k => k.endsWith('index.html'));
      if (htmlKey && bundle[htmlKey]) {
        let html = bundle[htmlKey].source;
        html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*>/gi, '');
        html = html.replace('</head>', `<style>${cssContent}</style></head>`);
        bundle[htmlKey].source = html;

        for (const k of cssKeys) {
          delete bundle[k];
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  base: process.env.GITHUB_ACTIONS ? '/Fresh-Canopy-Tree-Care/' : '/',
})
