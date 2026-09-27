// Loads and validates the single-document data files:
//   src/data/site.yaml      identity, bios, contact, profiles, portrait, CV paths
//   src/data/cv.yaml        education, positions, awards
//   src/data/research.yaml  research summary, themes, funding roles
// A wrong field or a missing image stops the build with a clear message.
import { readFileSync, existsSync } from 'node:fs';
import { load } from 'js-yaml';
import { z } from 'astro/zod';

const inPublic = (p: string) => existsSync(`public${decodeURI(p)}`);
const publicPath = (label: string) =>
  z.string().superRefine((p, ctx) => {
    if (p === '') return;
    if (!p.startsWith('/')) ctx.addIssue({ code: 'custom', message: `${label}: paths start with "/" (e.g. /images/foto.jpg)` });
    else if (!inPublic(p)) ctx.addIssue({ code: 'custom', message: `${label}: file not found: public${p}` });
  });
const text = z.string();
const opt = z.string().optional();
const link = z.object({ label: z.string(), url: z.string().url() });

const siteSchema = z.object({
  name: text,
  shortName: text,
  initials: z.string().max(3),
  url: z.string().url(),
  role: text,
  role_en: opt,
  institution: text,
  admin: text,
  admin_en: opt,
  portrait: publicPath('site.yaml portrait').default(''),
  portraitAlt: text,
  portraitAlt_en: opt,
  currentSemester: z.string().regex(/^\d{4}-[12]$/),
  affiliations: z.array(z.object({ name: text, name_en: opt, short: opt, url: z.string().url() })),
  bio: z.object({
    short: text, short_en: opt,
    long: z.array(text), long_en: z.array(text).optional(),
    press: text, press_en: opt,
  }),
  supervision: text,
  supervision_en: opt,
  outreach: text,
  outreach_en: opt,
  contact: z.object({
    email: z.string().email(),
    address: text, address_en: opt,
    office: opt,
    press: text, press_en: opt,
    students: text, students_en: opt,
    studentsUrl: z.string().url(),
  }),
  profiles: z.array(link),
  // CV PDFs are optional: when a file is missing the CV buttons are hidden.
  cv: z.object({ es: text, en: text, updated: z.coerce.date() }),
});

const cvSchema = z.object({
  education: z.array(z.object({ year: text, degree: text, degree_en: opt, institution: text, detail: opt, detail_en: opt })),
  positions: z.array(z.object({ years: text, title: text, title_en: opt, institution: text, institution_en: opt, detail: opt, detail_en: opt })),
  awards: z.array(z.object({ year: text, title: text, title_en: opt, detail: opt, detail_en: opt })),
});

const researchSchema = z.object({
  intro: text,
  intro_en: opt,
  themes: z.array(z.object({ title: text, title_en: opt, text: text, text_en: opt })),
  funding: z.array(
    z.object({
      grant: text, grant_en: opt,
      funder: text,
      years: text,
      role: z.enum(['pi', 'director', 'coi', 'collaborator']),
      roleNote: opt, roleNote_en: opt,
      topic: opt, topic_en: opt,
      status: z.enum(['active', 'completed']),
    }),
  ),
});

function loadYaml<T extends z.ZodTypeAny>(path: string, schema: T): z.infer<T> {
  const parsed = schema.safeParse(load(readFileSync(path, 'utf8')));
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`${path} is not valid:\n${issues}`);
  }
  return parsed.data;
}

export const site = loadYaml('src/data/site.yaml', siteSchema);
export const cv = loadYaml('src/data/cv.yaml', cvSchema);
export const research = loadYaml('src/data/research.yaml', researchSchema);

/** CV PDF path for a language, or undefined if the file hasn't been generated yet. */
export function cvFile(lang: 'es' | 'en') {
  const p = site.cv[lang];
  return inPublic(p) ? p : undefined;
}
