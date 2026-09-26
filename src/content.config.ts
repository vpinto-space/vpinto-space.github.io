import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number(),
    type: z.enum(['article', 'other']),
    // Authors + title + journal. **bold** marks me, *italic* the journal.
    citation: z.string(),
    doi: z.string().url().optional(),
    inPress: z.boolean().default(false),
  }),
});

export const collections = { publications };
