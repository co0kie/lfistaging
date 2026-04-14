import { getAllPosts } from "@js/blogUtils";

export async function GET() {
	const siteUrl = import.meta.env.SITE;
	const posts = await getAllPosts();

	const result = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${posts
			.map(
				(post) => `
                <url>
        <loc>${siteUrl}/blog/${post.id}/</loc>
        <lastmod>${
					post.data.pubDate ? new Date(post.data.pubDate).toISOString() : new Date().toISOString()
				}</lastmod>
      </url>
      `,
			)
			.join("")}
    </urlset>`;

	return new Response(result, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
