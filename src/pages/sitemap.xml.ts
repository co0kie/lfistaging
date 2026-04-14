export async function GET() {
	const siteUrl = import.meta.env.SITE;

	const result = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${siteUrl}/sitemap-blog.xml</loc>
    </sitemap>
    <sitemap>
        <loc>${siteUrl}/sitemap-pages.xml</loc>
    </sitemap>
     <sitemap>
        <loc>${siteUrl}/sitemap-classes.xml</loc>
    </sitemap>
</sitemapindex>
`;

	return new Response(result, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
