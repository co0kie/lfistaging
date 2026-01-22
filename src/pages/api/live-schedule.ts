import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	try {
		const url = new URL(request.url);
		const category = url.searchParams.get("category");

		let apiUrl = "https://instructorsdash.com/api/public/events/livefireinstruction";
		if (category) {
			apiUrl += `?category=${category}`;
		}

		const response = await fetch(apiUrl);

		if (!response.ok) {
			return new Response(JSON.stringify({ error: "Failed to fetch" }), { status: 500 });
		}

		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
	}
};
