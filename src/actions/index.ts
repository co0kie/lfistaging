import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase";

export const server = {
	addComment: defineAction({
		accept: "form",
		input: z.object({
			postSlug: z.string(),
			name: z.string().min(1, "Name is required"),
			email: z.string().email("Valid email is required"),
			message: z.string().min(1, "Comment cannot be empty"),
			parentId: z.string().optional(),
		}),
		handler: async ({ postSlug, name, email, message, parentId }, { request }) => {
			// Cross-Domain Checker
			const allowedDomain = import.meta.env.ALLOWED_DOMAIN; // e.g., "livefireinstruction.com"
			if (allowedDomain) {
				const origin = request.headers.get("origin");
				const referer = request.headers.get("referer");
				const isAllowed =
					(origin && origin.includes(allowedDomain)) ||
					(referer && referer.includes(allowedDomain));

				if (!isAllowed) {
					console.error("Cross-Domain check failed:", { origin, referer, allowedDomain });
					throw new Error("Unauthorized origin. Submission blocked.");
				}
			}

			const { data, error } = await supabase
				.from("comments")
				.insert([
					{
						post_slug: postSlug,
						name,
						email,
						message,
						parent_id: parentId || null,
						is_approved: false,
					},
				])
				.select()
				.single();

			if (error) {
				console.error("Supabase Error:", error);
				throw new Error(`Failed to save comment to database: ${error.message}`);
			}

			return {
				id: data.id,
				postSlug: data.post_slug,
				name: data.name,
				email: data.email,
				message: data.message,
				createdAt: data.created_at,
				isApproved: data.is_approved,
			};
		},
	}),
};
