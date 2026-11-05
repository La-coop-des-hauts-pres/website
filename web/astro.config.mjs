import sitemap from '@astrojs/sitemap';
import solid from '@astrojs/solid-js';
import { defineConfig } from 'astro/config';

import privateChecklist from './integrations/private-checklist.mjs';
import styleguide from './integrations/styleguide.mjs';
import { fileURLToPath } from 'node:url';

const siteUrl = process.env.PUBLIC_SITE_URL ?? 'https://lacoopdeshautspres.fr';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    solid(),
    styleguide(),
    sitemap({ filter: (page) => new URL(page).pathname !== '/preparer-son-dossier/' }),
  ],
  vite: {
    plugins: [privateChecklist()],
    resolve: {
      alias: {
        'styled-system': fileURLToPath(new URL('./styled-system', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@design': fileURLToPath(new URL('../design', import.meta.url)),
      },
    },
    server: {
      fs: {
        allow: ['..'],
        deny: [
          '.env',
          '.env.*',
          '*.{crt,pem}',
          '**/.git/**',
          '**/.private/**',
          '**/coordonnees.env',
        ],
      },
    },
  },
});
