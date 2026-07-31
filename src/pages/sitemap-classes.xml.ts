import { formatClassUrl } from "@/utils/classUrl";

export async function GET() {
	const siteUrl = import.meta.env.SITE;

	try {
		const response = await fetch("https://instructorsdash.com/api/public/events/livefireinstruction");
		
		if (!response.ok) {
			throw new Error("Failed to fetch classes from API");
		}
		
		const data = await response.json();
		const events = data.events?.data || [];

		const result = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${events
			.map((event: any) => {
				const classUrl = formatClassUrl(event);

				return `
      <url>
        <loc>${siteUrl}${classUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
			})
			.join("")}
  </urlset>`;

		return new Response(result.trim(), {
			headers: {
				"Content-Type": "application/xml",
			},
		});
	} catch (error) {
		console.error("Error generating classes sitemap:", error);
		return new Response("Error generating sitemap", { status: 500 });
	}
}
