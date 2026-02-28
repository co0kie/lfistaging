import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

// Type-check frontmatter using a schema
const blogCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx,mdoc}", base: "./src/data/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// reference the authors collection https://docs.astro.build/en/guides/content-collections/#defining-collection-references
			authors: z.array(reference("authors")),
			// Transform string to Date object
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val))
				.optional(),
			pubDate: z.date().optional(),
			updatedDate: z.date().optional(),
			heroImage: image().optional(),
			categories: z.array(z.string()),
			tags: z.array(z.string()).optional(),
			relatedPosts: z.array(z.string()).optional(),
			// blog posts will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// authors
const authorsCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/authors" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image(),
			about: z.string(),
			email: z.string(),
			authorLink: z.string(), // author page link. Could be a personal website, github, twitter, whatever you want
		}),
});

// other pages
const otherPagesCollection = defineCollection({
	loader: glob({ pattern: "[^_]*{md,mdx,mdoc}", base: "./src/data/otherPages" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image().optional(),
			draft: z.boolean().optional(),
			landing: z.boolean().optional(),
		}),
});

const pagesCollection = defineCollection({
	loader: glob({ pattern: "[^_]*{md,mdx,mdoc}", base: "./src/data/pages" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image().optional(),
			draft: z.boolean().optional(),
			landing: z.boolean().optional(),
			youtubeUrl: z.string().optional(),
		}),
});

const partnersCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx,mdoc}", base: "./src/data/otherPages/partners" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image().optional(),
			link: z.string().optional(),
			domain: z.string().optional(),
			phone: z.string().optional(),
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
		}),
});

const landingCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx,mdoc}", base: "./src/data/otherPages/landingpage" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image().optional(),
			backgroundImage: image().optional(),
			draft: z.boolean().optional(),
			landing: z.boolean().optional(),
		}),
});

const trainingCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx,mdoc}", base: "./src/data/otherPages/trainings" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string().optional(),
			slug: z.string(),
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			featured: z.boolean().optional(),
			description: z.string(),
			button: z.string().optional(),
			badgeGroup: z.array(z.string()).optional(),
			leftColumnImage: image().optional(),
			rightColumnTitle: z.string().optional(),
			rightColumnDescription: z.string().optional(),
			rightColumnList: z
				.array(
					z.object({
						listTitle: z.string().optional(),
						listItem: z.array(z.string()).optional(),
					}),
				)
				.optional(),
			hasMap: z.object({
				discriminant: z.boolean(),
				value: z
					.object({
						mapTitle: z.string().optional(),
						address: z.array(z.string()).optional(),
						mapLink: z.string().url().optional(),
					})
					.optional(),
			}),
			iframeUrl: z.string().url().optional(),
			iframeHeight: z.number().optional(),
			iframeWidth: z.string().optional(),
			useCategory133: z.boolean().optional(),
		}),
});

export const collections = {
	blog: blogCollection,
	authors: authorsCollection,
	otherPages: otherPagesCollection,
	partners: partnersCollection,
	landing: landingCollection,
	trainings: trainingCollection,
	pages: pagesCollection,
};
