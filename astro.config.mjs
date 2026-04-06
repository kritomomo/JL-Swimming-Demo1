import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import tinaDirective from './astro-tina-directive/register.js';

export default defineConfig({
  site: 'https://jlswimming.com.au',
  output: 'static',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    tinaDirective(),
  ],
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress TinaCMS generated file warnings
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            warning.exporter === 'tinacms/dist/client') {
            return;
          }
          warn(warning);
        }
      }
    }
  }
});
