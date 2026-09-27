# Victor Pinto — personal site

Source for <https://victorapinto.com>, built with [Astro](https://astro.build). Bilingual (Spanish default, English under `/en/`), static output, deployed to GitHub Pages by GitHub Actions.

**Adding a publication, talk, press item or course?** Read [`CONTENIDO.md`](CONTENIDO.md). It's one YAML entry, no HTML.

Same architecture as the HelioUSACH group site (`heliousach.github.io`), with its own look.

## Layout of the repo

```
src/
  data/
    site.yaml             identity, bios (short / long / press), contact, profiles, portrait, CV paths
    research.yaml         research summary, themes, my role in funded projects
    cv.yaml               education, positions, awards (About page + CV PDF)
    publications.yaml     all publications (`selected: true` -> home page)
    talks.yaml            invited talks, selected presentations, events organised
    media.yaml            press / TV / radio
    teaching.yaml         USACH courses (semesters)      teaching-earlier.yaml  before USACH
    service.yaml          service (`public: false` = CV PDF only)
    supervision.yaml      thesis supervision (CV PDF only; people live on HelioUSACH)
    thesis-committees.yaml  (CV PDF only)
  content.config.ts       schemas for the list files (build fails on bad data)
  lib/
    data.ts               loads + validates site.yaml, cv.yaml, research.yaml (incl. image paths)
    content.ts            sorted getters for the list collections (file order kept)
    i18n.ts               routes, nav/section order, all UI strings, pick(), formatYM()
    format.ts             data entry -> list row helpers
  components/             PageHeader, SectionHead, Pager, Portrait, PubList, DatedList, FundingList, CvButtons, ProfileLinks
  views/                  one template per page, takes `lang` (Home, About, Research, Publications, Talks, Teaching, Service, Media, NotFound, CvPrint)
  pages/                  thin route files: each renders a view with lang="es" or "en"
  layouts/Layout.astro    <head>, header/nav, slim footer
  styles/global.css       the whole design system (tokens + components)
public/cv/                generated CV PDFs (es, en)
scripts/build-cv.py       prints /cv-print/ and /en/cv-print/ to public/cv/*.pdf
```

Bilingual fields use a suffix: `title` (Spanish) and `title_en` (English, optional, falls back to Spanish).

## Pages

The home page is a one-page scroller (intro, research, publications, talks, teaching, service, media, contact). Each section links to its detail page ("Ver página completa"). Every detail page ends with a pager (back to its home section, next page). Slugs are unchanged from the previous site: `/about/`, `/research/`, `/publications/`, `/talks/` (new), `/teaching/`, `/service/`, `/media/`, and the same under `/en/`.

## Design system (`src/styles/global.css`)
- Fonts: Newsreader (display headings, titles), Inter (UI and body).
- Tokens at the top: colours per theme (day default, night toggle; follows the OS setting until the visitor chooses), type scale, spacing, radius.
- The portrait slot is 3:4. Without a photo it shows the initials tile, at the same size.
- Every detail page = `PageHeader` band + `.band` sections (alternate with `.band-alt`) + `Pager`.
- Don't add inline `style=` attributes; add a class to `global.css` instead.

## Commands
```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # validates content, builds to dist/
npm run cv       # build, print the CV PDFs into public/cv/, rebuild (needs Python + Playwright)
npm run preview
```

## Deploy
Push to `main` -> `.github/workflows/deploy.yml` builds and publishes to GitHub Pages. Pull requests only build (a check that content and code are valid). Repo Settings -> Pages -> Source must be "GitHub Actions".

## Dependency history
- **Sep 2026** — redesign: content moved to validated YAML, one view per page, new design system; `js-yaml` added.
- **Aug 2026** — `npm audit` flagged high-severity issues in Astro 5.x; upgraded Astro `^5.11.0` -> `^7.2.0`. On future Astro majors, check content collections (`src/content.config.ts`, the `file()` loader) and rebuild/eyeball pages: the v7 compiler is strict about invalid HTML nesting.

## History
Audits and plans live outside the repo, in the `Web/docs/` folder.
