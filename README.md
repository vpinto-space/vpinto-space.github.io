# Victor Pinto — personal site

Source for [victorapinto.com](https://victorapinto.com), built with [Astro](https://astro.build). Bilingual (es/en), static output, deployed to GitHub Pages.

## Structure

```
src/
├── layouts/Layout.astro     # shared shell: nav, footer, meta tags
├── pages/                    # Spanish routes (default locale, no prefix)
│   ├── index.astro
│   ├── about.astro
│   ├── media.astro
│   ├── publications.astro
│   ├── research.astro
│   ├── service.astro
│   ├── teaching.astro
│   └── en/                   # English routes (prefixed /en/)
└── styles/global.css         # design tokens + shared styles
```

No content collections, no Markdown/MDX files — all page content lives directly in the `.astro` files.

## Development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # preview the production build
```

## Deployment

`.github/workflows/deploy.yml`:

- Push to `main` → build, then deploy `dist/` to GitHub Pages via `actions/deploy-pages`.
- Pull requests targeting `main` → build only (no deploy), as a pre-merge check. Added Aug 2026.

Repo Settings → Pages → Source must be **"GitHub Actions"**.

## Dependency history

- **Aug 2026** — `npm audit` flagged high-severity issues in Astro 5.x (XSS in `define:vars`/slot names/spread props, SSRF), plus transitive `esbuild`/`sharp` CVEs. Fixed via `npx @astrojs/upgrade`, jumping Astro `^5.11.0` → `^7.2.0` (skips major v6). Verified locally: no content collections, no Markdown files, no internal anchor links (`href="#..."`) — so the usual v6/v7 breaking changes (content.config rename, markdown-processor swap, heading-ID anchors) didn't apply here. Only thing to watch on future Astro major bumps: the Rust compiler (v7+) is strict about invalid HTML nesting, and `compressHTML` defaults to JSX-style whitespace collapsing — rebuild and eyeball pages after any Astro upgrade.
