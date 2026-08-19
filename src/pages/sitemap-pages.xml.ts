import { getCollection } from "astro:content";

export async function GET() {
	const siteUrl = import.meta.env.SITE;

	const trainings = await getCollection("trainings", ({ data }) => data.draft !== true);
	const trainingPages = trainings.map(item => `/${item.id}`);

	const pages = [
		"/blog",
		"/firearm-training-fairfax-va",
		"/firearms-training-northern-virginia",
		"/firearms-training-virginia-fairfax-city",
		"/shooting-range-guide-fairfax-va",
		"/ccw-courses-northern-va",
		"/virginia-ccw-permit-requirements",
		"/concealed-carry-permit-renewal-virginia",
		"/fairfax-firearm-training-center",
		"/partners",
		"/contact",
		"/privacy-policy",
		"/3-day-bullseye-business-blueprint-course",
		...trainingPages,
	];

	const result = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${pages
			.map(
				(page) => `
      <url>
        <loc>${siteUrl}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`,
			)
			.join("")}
  </urlset>`;

	return new Response(result.trim(), {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
