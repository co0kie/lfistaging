import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CommentFormProps {
	postSlug: string;
}

export default function CommentForm({ postSlug }: CommentFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);

	// Listen for reply events from Astro components
	useEffect(() => {
		const handleReply = (event: any) => {
			const { id, name } = event.detail;
			setReplyTo({ id, name });
			// Scroll into view
			const form = document.querySelector("#comment-form-container");
			if (form) {
				form.scrollIntoView({ behavior: "smooth" });
			}
		};

		window.addEventListener("set-reply", handleReply);

		// Load reCAPTCHA script
		const script = document.createElement("script");
		script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}`;
		script.async = true;
		document.head.appendChild(script);

		return () => {
			window.removeEventListener("set-reply", handleReply);
			document.head.removeChild(script);
		};
	}, []);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setIsSubmitting(true);

		const form = event.currentTarget;
		const formData = new FormData(form);

		if (replyTo) {
			formData.append("parentId", replyTo.id);
		}

		// Handle reCAPTCHA
		try {
			// @ts-ignore
			const token = await window.grecaptcha.execute(import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY, {
				action: "submit_comment",
			});
			formData.append("recaptchaToken", token);
		} catch (e) {
			console.error("reCAPTCHA Error:", e);
			toast.error("Security check failed. Please try again.");
			setIsSubmitting(false);
			return;
		}

		try {
			const { error } = await actions.addComment(formData);

			if (error) {
				toast.error("Failed to submit comment", {
					description: error.message || "Please check your input and try again.",
				});
				setIsSubmitting(false);
				return;
			}

			toast.success("Comment submitted!", {
				description: "Your comment will appear after approval.",
			});

			form.reset();
		} catch (e) {
			toast.error("An unexpected error occurred.");
			console.error(e);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<form
				id="comment-form-container"
				onSubmit={handleSubmit}
				className="bg-base-50 border-base-200 mb-8 rounded-lg border p-6 shadow-sm"
			>
				<h3 className="text-base-900 mb-4 text-xl font-bold">
					{replyTo ? `Replying to ${replyTo.name}` : "Leave a Comment"}
				</h3>
				{replyTo && (
					<button
						type="button"
						onClick={() => setReplyTo(null)}
						className="mb-4 text-sm text-red-600 hover:underline"
					>
						Cancel Reply
					</button>
				)}
				<input type="hidden" name="postSlug" value={postSlug} />

				<div className="mb-4">
					<label htmlFor="name" className="text-base-700 mb-1 block font-medium">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						placeholder="Your Name"
						className="border-base-300 text-base-900 focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border bg-white p-2 focus:ring-1 focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="email" className="text-base-700 mb-1 block font-medium">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						placeholder="your@email.com"
						className="border-base-300 text-base-900 focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border bg-white p-2 focus:ring-1 focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="message" className="text-base-700 mb-1 block font-medium">
						Comment
					</label>
					<textarea
						id="message"
						name="message"
						required
						rows={4}
						placeholder="Shared your thoughts..."
						className="border-base-300 text-base-900 focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border bg-white p-2 focus:ring-1 focus:outline-none"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-6 py-2.5 font-medium text-white transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? "Submitting..." : "Add Comment"}
				</button>
			</form>
		</>
	);
}
