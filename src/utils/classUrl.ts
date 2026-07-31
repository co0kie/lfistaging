export const toSlug = (value: string): string =>
	value
		.toLowerCase()
		.trim()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

export const toCourseSlug = (name: string): string => {
	if (!name) return "";
	const lower = name.toLowerCase();

	if (lower.includes("basic pistol") || lower.includes("basics of pistol")) {
		return "nra-basic-pistol-ccw-fairfax-va";
	}
	if (lower.includes("first step")) {
		return "nra-first-steps-ccw-fairfax-va";
	}
	if (
		lower.includes("one-on-one") ||
		lower.includes("one on one") ||
		lower.includes("personal training")
	) {
		return "one-on-one-training";
	}
	if (
		lower.includes("defensive pistol") ||
		lower.includes("advanced pistol") ||
		(lower.includes("nra") && lower.includes("ccw") && lower.includes("course"))
	) {
		return "nra-ccw-advanced";
	}
	if (lower.includes("refuse to be a victim")) {
		return "refuse-to-be-a-victim";
	}
	if (lower.includes("chief range safety officer")) {
		return "nra-crso-course";
	}
	if (lower.includes("range safety officer")) {
		return "nra-rso-course";
	}
	if (lower.includes("instructor pistol")) {
		return "nra-instructor-pistol";
	}
	if (lower.includes("instructor rifle")) {
		return "nra-instructor-rifle";
	}
	if (lower.includes("instructor ccw")) {
		return "nra-instructor-ccw";
	}

	return toSlug(name);
};

export const formatDateSlug = (dateStr?: string | null): string => {
	if (!dateStr) return "";
	const d = new Date(dateStr);
	if (isNaN(d.getTime())) return "";

	const monthOptions: Intl.DateTimeFormatOptions = {
		month: "short",
		timeZone: "America/New_York",
	};
	const dayOptions: Intl.DateTimeFormatOptions = {
		day: "numeric",
		timeZone: "America/New_York",
	};
	const yearOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		timeZone: "America/New_York",
	};

	const month = d.toLocaleDateString("en-US", monthOptions).toLowerCase();
	const day = d.toLocaleDateString("en-US", dayOptions);
	const year = d.toLocaleDateString("en-US", yearOptions);

	return `${month}-${day}-${year}`;
};

export const formatClassUrl = (event: {
	name?: string | null;
	start_date?: string | null;
	short_slug?: string | null;
}): string => {
	const courseSlug = toCourseSlug(event.name || event.short_slug || "");
	const dateSlug = formatDateSlug(event.start_date);
	if (!courseSlug) return "/ccw-courses-northern-va";
	return dateSlug ? `/class/${courseSlug}/${dateSlug}` : `/class/${courseSlug}`;
};
