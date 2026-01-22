import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies, request }) => {
	const url = new URL(request.url);
	const referer = request.headers.get("referer"); // Get back to where we came from if possible

	// Default redirect to home if no specific logic
	let redirectTo = "/";

	// If we want to return to the non-preview version of the current page, we'd need to parse the referer.
	// For now, let's just clear the cookie and redirect to Home / Blog index.
	if (referer && referer.includes("/preview/")) {
		// Try to redirect to the production URL equivalent if it was a preview url
		// e.g. /preview/blog/slug -> /blog/slug
		const urlObj = new URL(referer);
		redirectTo = urlObj.pathname.replace("/preview", "");
	}

	cookies.delete("keystatic-preview-mode", { path: "/" });

	return redirect(redirectTo);
};
