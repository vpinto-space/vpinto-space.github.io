## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Current state (as of Aug 2026)

- Astro `^7.2.0`. Upgraded from `^5.11.0` in Aug 2026 to resolve `npm audit` high-severity findings (XSS advisories in Astro's compiler, plus transitive `esbuild`/`sharp` CVEs). See README.md "Dependency history" for details.
- `npm audit` should currently report clean. If it doesn't, check whether the fix requires a major bump (`npm audit fix --force`) before applying it blindly — read the changelog/migration guide for the target version first, and check this repo for content collections, Markdown files, or `href="#"` anchors, since those are what typically break across Astro majors (none of that exists here as of this writing, but re-check if it's changed).
- `.github/workflows/deploy.yml` runs `build` on both push-to-`main` and pull requests; `deploy` only runs on push. Don't remove the `if: github.event_name == 'push'` guards on the `deploy` job and the `upload-pages-artifact` step — without them, PR runs would attempt to deploy.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
