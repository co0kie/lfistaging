import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "../../keystatic.config";

/**
 * Creates a Keystatic reader based on the environment.
 * - Development (local): Uses createReader for local file system
 * - Production (GitHub): Uses createGitHubReader for GitHub storage
 */
export function getKeystaticReader() {
	const isDev = import.meta.env.DEV;

	if (isDev) {
		// Local development - read from file system
		return createReader(process.cwd(), keystaticConfig);
	} else {
		// Production - read from GitHub
		return createGitHubReader(keystaticConfig, {
			repo: "co0kie/lfistaging",
			token: import.meta.env.GITHUB_API,
		});
	}
}
