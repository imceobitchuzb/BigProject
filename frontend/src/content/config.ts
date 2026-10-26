import { defineCollection, z } from 'astro:content';

const threatsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    category_title: z.string(),
    published_date: z.string(),
    last_reviewed: z.string().optional(),
    reading_time: z.string(),
    warning_signs: z.array(z.string()),
    prevention_steps: z.array(z.string()),
    recovery_steps: z.array(z.string()),
    official_sources: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
    ),
    related_slugs: z.array(z.string()),
  }),
});

export const collections = {
  threats: threatsCollection,
};
