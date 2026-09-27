# Notes for AI coding agents

- Read `README.md` (architecture) and `CONTENIDO.md` (content model) first.
- Content lives in `src/data/*.yaml`, validated by `src/content.config.ts` and `src/lib/data.ts`. Never hardcode facts (roles, projects, publications, talks, dates) in `.astro` files.
- One view per page in `src/views/` with a `lang` prop; `src/pages/*` only wrap views. Don't duplicate templates per language. UI strings go in `src/lib/i18n.ts`.
- Styling: only `src/styles/global.css` tokens and classes. No inline `style=`. Reuse components (`DatedList`, `PubList`, `SectionHead`, `PageHeader`, `Pager`, `Portrait`, …) instead of one-off markup.
- Astro's `file()` loader returns entries sorted by id; `src/lib/content.ts` restores file order. Use its getters, not `getCollection` directly.
- Content rules: facts must be verifiable (the tenure dossier is the source of truth); never publish projects under evaluation, internal grant IDs, amounts or personal data (phone numbers); actions, not unverified counts. People, projects and news belong to the HelioUSACH site: link to it instead of copying.
- Put audits/plans/reports in `Web/docs/` (outside this repo), not in the repo root.
- Verify with `npm run build` before committing. After changing CV data, run `npm run cv` so the PDFs match.

## Dev server
Use background mode: `astro dev --background`; manage with `astro dev stop|status|logs`.
