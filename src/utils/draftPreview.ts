import { createHmac } from "node:crypto";

const getSecret = (): string => {
	return (
		import.meta.env.DRAFT_PREVIEW_SECRET ||
		import.meta.env.INDEXNOW_ADMIN_PASSWORD ||
		"lfi-draft-preview-secret-key-2026"
	);
};

/**
 * Generate a disposable preview URL for a draft blog post
 * @param slug The blog post slug
 * @param minutesValid Number of minutes the link stays valid (default 60 mins = 1 hour)
 * @param baseUrl Optional base URL (e.g. "https://livefireinstruction.com")
 */
export function generateDraftPreviewUrl(
	slug: string,
	minutesValid: number = 60,
	baseUrl: string = ""
): string {
	const secret = getSecret();
	const exp = Date.now() + minutesValid * 60 * 1000;
	const sig = createHmac("sha256", secret).update(`${slug}:${exp}`).digest("hex").slice(0, 16);
	const path = `/blog/${slug}/?preview_exp=${exp}&preview_sig=${sig}`;
	return baseUrl ? `${baseUrl.replace(/\/$/, "")}${path}` : path;
}

/**
 * Validates whether a draft preview request is authorized and unexpired
 */
export function isValidDraftPreview(
	slug: string,
	url: URL,
	adminPasswordCookie?: string
): { valid: boolean; expiresAt?: Date; reason?: string } {
	const secret = getSecret();

	// 1. Master key check via query param or cookie
	const previewKey = url.searchParams.get("preview_key");
	if (previewKey && previewKey === secret) {
		return { valid: true, expiresAt: undefined };
	}

	if (adminPasswordCookie && adminPasswordCookie === secret) {
		return { valid: true, expiresAt: undefined };
	}

	// 2. Signed disposable token check
	const expStr = url.searchParams.get("preview_exp");
	const sigStr = url.searchParams.get("preview_sig");
	const tokenStr = url.searchParams.get("preview_token");

	let exp: number | null = null;
	let sig: string | null = null;

	if (tokenStr && tokenStr.includes(".")) {
		const parts = tokenStr.split(".");
		exp = parseInt(parts[0], 10);
		sig = parts[1];
	} else if (expStr && sigStr) {
		exp = parseInt(expStr, 10);
		sig = sigStr;
	}

	if (!exp || !sig || isNaN(exp)) {
		return { valid: false, reason: "Missing or invalid preview parameters" };
	}

	// Check expiration
	if (Date.now() > exp) {
		return { valid: false, reason: "Disposable preview link has expired", expiresAt: new Date(exp) };
	}

	// Verify HMAC signature
	const expectedSig = createHmac("sha256", secret).update(`${slug}:${exp}`).digest("hex").slice(0, 16);

	if (sig !== expectedSig) {
		return { valid: false, reason: "Invalid preview signature" };
	}

	return { valid: true, expiresAt: new Date(exp) };
}
