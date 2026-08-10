// https://astro.build/config
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://victorapinto.com',
  output: 'static',
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