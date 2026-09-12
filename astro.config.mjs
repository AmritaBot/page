// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.amritabot.com',
  output: 'static',
  build: {
    // Emit a real 404.html for unknown paths instead of relying on a catch-all rewrite.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
