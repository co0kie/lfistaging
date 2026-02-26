import type { APIRoute } from "astro";
import { sendEmail } from "@/utils/email";
import ejs from "ejs";
import fs from "node:fs/promises";
import path from "node:path";

import { getKeystaticReader } from "@/lib/keystatic-reader";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
	// Get the form data submitted by the user on the home page
	const formData = await request.formData();
	const name = formData.get("name") as string | null;
	const email = formData.get("email") as string | null;
	const subject = formData.get("subject") as string | null;
	const message = formData.get("message") as string | null;

	// Throw an error if we're missing any of the needed fields.
	if (!name || !email || !subject || !message) {
		return new Response(
			JSON.stringify({
				message: "Missing required fields",
			}),
			{ status: 400 },
		);
	}

	// Try to send the email using a `sendEmail` function we'll create next. Throw
	// an error if it fails.
	try {
		const reader = getKeystaticReader();
		const contact = await reader.singletons.contact.read();
		const to = contact?.formInfoEmail || "class@contacts.livefireinstruction.com";

		const templatePath = path.join(process.cwd(), "src/templates/email.ejs");
		const template = await fs.readFile(templatePath, "utf-8");
		const html = ejs.render(template, { name, email, subject, message });

		await sendEmail({
			to,
			// TODO: Update this to your verified domain (e.g., website@livefireinstruction.com)
			// once you have verified it in the Resend dashboard.
			// For now, use the testing domain.
			from: "LiveFire Instruction <class@contacts.livefireinstruction.com>",
			replyTo: email,
			subject,
			html,
		});
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({
				message: "Failed to send email",
			}),
			{ status: 500 },
		);
	}

	return new Response(
		JSON.stringify({
			message: "Success!",
		}),
		{ status: 200 },
	);
};
