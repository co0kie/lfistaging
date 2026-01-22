import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, redirect, cookies }) => {
	const url = new URL(request.url);
	const branch = url.searchParams.get("branch");
	const to = url.searchParams.get("to");

	if (!branch || !to) {
		return new Response("Missing branch or to params", { status: 400 });
	}

	cookies.set("keystatic-preview-mode", branch, {
		path: "/",
		sameSite: "lax",
		secure: import.meta.env.PROD,
		httpOnly: true,
	});

	return redirect(to);
};
