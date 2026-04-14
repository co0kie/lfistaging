export async function GET() {
	const siteUrl = import.meta.env.SITE;

	try {
		const response = await fetch("https://instructorsdash.com/api/public/events/livefireinstruction");
		
		if (!response.ok) {
			throw new Error("Failed to fetch classes from API");
		}
		
		const data = await response.json();
		const events = data.events?.data || [];

		// Replicating the slugify logic used in LiveSchedule
		const toSlug = (value: string) =>
			value
				.toLowerCase()
				.trim()
				.replace(/&/g, "and")
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "");

		const result = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${events
			.map((event: any) => {
				const nameSlug = event.name ? toSlug(event.name) : "";
				const slug = event.short_slug
					? nameSlug
						? `${nameSlug}-${event.short_slug}`
						: event.short_slug
					: nameSlug || "";

				if (!slug) return ""; // Skip if no valid slug could be generated

				return `
      <url>
        <loc>${siteUrl}/class/${slug}</loc>
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
