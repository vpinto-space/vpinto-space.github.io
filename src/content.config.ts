// Content schemas. Every list file in src/data/ is validated here at build time:
// a missing field, a bad date or a malformed URL stops the build with a clear
// message, so a broken entry never reaches the live site.
// (site.yaml, cv.yaml and research.yaml are single documents: see src/lib/data.ts.)
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const yearMonth = () =>
  z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'date must be "YYYY-MM" (or "YYYY")');

// ---------- src/data/publications.yaml ----------
const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number().int().min(2000).max(2100),
    type: z.enum(['article', 'other']),
    authors: z.string(), // **bold** = me
    title: z.string(),
    journal: z.string(),
    details: z.string().optional(), // volume, issue, pages
    doi: z.string().url().optional(),
    inPress: z.boolean().default(false),
    selected: z.boolean().default(false),
  }),
});

// ---------- src/data/talks.yaml ----------
const talks = defineCollection({
  loader: file('src/data/talks.yaml'),
  schema: z.object({
    id: z.string(),
    kind: z.enum(['invited', 'contributed', 'organized']),
    date: yearMonth(),
    title: z.string().optional(),
    event: z.string(),
    event_en: z.string().optional(),
    place: z.string(),
    place_en: z.string().optional(),
    role: z.string().optional(),
    role_en: z.string().optional(),
    format: z.enum(['talk', 'poster']).default('talk'),
    url: z.string().url().optional(),
  }),
});

// ---------- src/data/media.yaml ----------
const media = defineCollection({
  loader: file('src/data/media.yaml'),
  schema: z.object({
    id: z.string(),
    date: yearMonth(),
    outlet: z.string(),
    topic: z.string(),
    topic_en: z.string().optional(),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

// ---------- src/data/teaching.yaml ----------
const semester = z.string().regex(/^\d{4}-[12]$/, 'semester must be "YYYY-1" or "YYYY-2"');
const courses = defineCollection({
  loader: file('src/data/teaching.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    title_en: z.string().optional(),
    level: z.enum(['pregrado', 'postgrado', 'doctorado']),
    program: z.string().optional(),
    program_en: z.string().optional(),
    semesters: z.array(semester).min(1),
    url: z.string().url().optional(), // course notes / material
  }),
});

// ---------- src/data/teaching-earlier.yaml ----------
const earlierTeaching = defineCollection({
  loader: file('src/data/teaching-earlier.yaml'),
  schema: z.object({
    id: z.string(),
    years: z.string(),
    institution: z.string(),
    role: z.string(),
    role_en: z.string().optional(),
    courses: z.string().optional(),
    courses_en: z.string().optional(),
  }),
});

// ---------- src/data/service.yaml ----------
const service = defineCollection({
  loader: file('src/data/service.yaml'),
  schema: z.object({
    id: z.string(),
    group: z.enum(['editorial', 'panels', 'review', 'university', 'societies']),
    public: z.boolean(),
    highlight: z.boolean().default(false),
    years: z.string(),
    title: z.string(),
    title_en: z.string().optional(),
    detail: z.string().optional(),
    detail_en: z.string().optional(),
  }),
});

// ---------- src/data/supervision.yaml (CV PDF only) ----------
const supervision = defineCollection({
  loader: file('src/data/supervision.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    level: z.enum(['magister', 'pregrado', 'postdoc']),
    degree: z.string(),
    degree_en: z.string().optional(),
    year: z.number().int().optional(),
    role: z.string().optional(),
    role_en: z.string().optional(),
    status: z.enum(['graduated', 'ongoing']),
  }),
});

// ---------- src/data/thesis-committees.yaml (CV PDF only) ----------
const committees = defineCollection({
  loader: file('src/data/thesis-committees.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    degree: z.string(),
    degree_en: z.string().optional(),
    institution: z.string(),
    year: z.number().int(),
  }),
});

export const collections = { publications, talks, media, courses, earlierTeaching, service, supervision, committees };
