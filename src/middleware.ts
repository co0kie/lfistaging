import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	const { request, url } = context;

	// Only apply to Astro Actions
	if (url.pathname.startsWith("/_astro/actions")) {
		const allowedDomain = import.meta.env.ALLOWED_DOMAIN; // e.g., "livefireinstruction.com"

		if (allowedDomain) {
			const origin = request.headers.get("origin");
			const referer = request.headers.get("referer");

			const isAllowed =
				(origin && origin.includes(allowedDomain)) || (referer && referer.includes(allowedDomain));

			if (!isAllowed) {
				console.error("Edge Security: Blocked cross-domain request", {
					origin,
					referer,
					allowedDomain,
					path: url.pathname,
				});
				return new Response("Unauthorized origin", { status: 403 });
			}
		}
	}

	return next();
});
