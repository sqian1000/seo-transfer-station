import { z, defineCollection } from "astro:content";
import { glob } from 'astro/loaders';
import { createDirectoryCollection } from "@lib/loaders";

const directory = createDirectoryCollection();

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/pages" }),
  schema: ({ image }) => z.object({
    image: image().optional(),
    title: z.string().optional(),
    description: z.string().max(180).optional(),
    tags: z.array(z.string()).optional(),
    noindex: z.boolean().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" }),
  schema: ({image}) => z.object({
    title: z.string().optional(),
    description: z.string().max(180).optional(),
    tags: z.array(z.string()).optional(),
    image: image().optional(),
    noindex: z.boolean().optional(),
  }),
});

export const collections = {
  directory,
  pages,
  blog,
};
