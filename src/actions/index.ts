import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const server = {
	addComment: defineAction({
		accept: "form",
		input: z.object({
			postSlug: z.string(),
			name: z.string().min(1, "Name is required"),
			email: z.string().email("Valid email is required"),
			message: z.string().min(1, "Comment cannot be empty"),
			parentId: z.string().optional(),
			recaptchaToken: z.string().min(1, "Security token is missing"),
		}),
		handler: async ({ postSlug, name, email, message, parentId, recaptchaToken }, { request }) => {
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

			// Verify reCAPTCHA

			const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY;
			if (recaptchaSecret) {
				const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
				});

				const recaptchaData = await response.json();

				if (!recaptchaData.success || recaptchaData.score < 0.5) {
					console.error("reCAPTCHA Verification Failed:", recaptchaData);
					throw new Error("Security verification failed. Please try again.");
				}
			} else {
				console.warn("RECAPTCHA_SECRET_KEY not set. Skipping verification.");
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

	chat: defineAction({
		accept: "json",
		input: z.object({
			message: z.string().min(1),
			history: z
				.array(
					z.object({
						role: z.enum(["user", "model"]),
						parts: z.array(z.object({ text: z.string() })),
					}),
				)
				.optional(),
		}),
		handler: async ({ message, history }) => {
			const apiKey = import.meta.env.GEMINI_API_KEY;
			if (!apiKey) {
				throw new Error("GEMINI_API_KEY is not set in environment variables.");
			}

			const genAI = new GoogleGenerativeAI(apiKey);
			const model = genAI.getGenerativeModel({
				model: "gemini-2.5-flash-preview-09-2025",
				systemInstruction:
					"You are a certified firearms instructor for 'Live Fire Instruction'. Your name is 'Tactical AI'.\n" +
					"Your capabilities:\n" +
					"1. Recommend courses based on user experience.\n" +
					"2. Explain the 4 universal rules of gun safety.\n" +
					"3. Suggest simple dry-fire practice drills.\n" +
					"4. If asked anything else, refer to website for more information.\n\n" +
					"5. If asked about website link or email address output 'livefireinstruction.com' for website and class@livefireinstruction.com for email.\n\n" +
					"Tone: Professional, safety-focused, encouraging, and direct. Use tactical terminology correctly but keep it accessible.\n" +
					"Constraint: If asked about legal advice, state that you provide general information but they should consult a lawyer for specific legal counsel.\n" +
					"Always emphasize safety.",
			});

			const chatSession = model.startChat({
				history: history || [],
			});

			const result = await chatSession.sendMessage(message);
			const response = await result.response;
			const text = response.text();

			return {
				role: "model",
				parts: [{ text }],
			};
		},
	}),
};
