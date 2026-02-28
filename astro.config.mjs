import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import icon from "astro-icon"; // https://www.astroicon.dev/guides/upgrade/v1/
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";

const isProd = import.meta.env.PROD || import.meta.env.MODE === "production";

// https://astro.build/config
export default defineConfig({
	adapter: netlify({
		edgeMiddleware: true,
	}),
	output: "server",
	site: isProd ? "https://livefireinstruction.com" : "http://localhost:4321",
	markdown: {
		shikiConfig: {
			theme: "dracula",
			wrap: true,
		},
	},

	integrations: [
		// example auto import component into blog post mdx files
		AutoImport({
			imports: [
				// https://github.com/delucis/astro-auto-import
				"@components/Admonition/Admonition.astro",
				"@components/SiteLogo/SiteLogo.astro",
				"@components/Button/Button.astro",
			],
		}),
		mdx(),
		icon({
			// I include only the icons I use. This is because if you use SSR, ALL icons will be included (no bueno)
			// https://www.astroicon.dev/reference/configuration#include
			include: {
				tabler: [
					"bulb",
					"alert-triangle",
					"flame",
					"info-circle",
					"arrow-narrow-left",
					"arrow-narrow-right",
					"menu-2",
					"x",
					"chevron-down",
					"category",
					"calendar-event",
				],
			},
		}),
		sitemap(),
		compress({
			HTML: true,
			JavaScript: true,
			CSS: false,
			Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
			SVG: false, // astro-icon handles this
		}),
		react(),
		markdoc(),
		keystatic(),
	],

	vite: {
		plugins: [tailwindcss()],
		// stop inlining short scripts to fix issues with ClientRouter: https://github.com/withastro/astro/issues/12804
		build: {
			assetsInlineLimit: 0,
		},
	},
	redirects: {
		"/contact-2": "/contact/",
		"/gift-certificates": "/calendar/",
		"/trusted-partners-2": "/partners/",
		"/product/[...slug]": "/firearm-training/",
		"/product-category/[...slug]": "/firearm-training/",
		"/product/one-on-one-training-36/": "/firearm-training/",
		"/nra-basics-of-pistol-shooting-course-with-concealed-carry-permit-silver-eagle":
			"/nra-basic-pistol-shooting-course/",
		"/my-account": "/firearm-training/",
		"/wp-login.php?action=googlesitekit_auth": "/firearm-training/",
		"/feed": "/firearm-training/",
		"/cdn-cgi/l/email-protection": "/",
		"/intro-to-firearms": "/",
		"/business-side-of-firearms-course1": "/",
	},
});
