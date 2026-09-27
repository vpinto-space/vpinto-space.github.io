// https://astro.build/config
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://victorapinto.com',
  output: 'static',
  // The CV print view is not a public page: keep it out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/cv-print/') && !page.endsWith('/404/') })],
  build: {
    // Inline page CSS directly into HTML so GitHub Pages never has to serve
    // /_astro/*.css as a separate request (avoids the 404s that happen when
    // Pages' Jekyll processing skips underscore-prefixed directories).
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefix: {
        es: '',
      },
      redirectToDefaultLocale: false,
    },
    fallbackType: 'redirect',
  },
});
