import { exec } from "node:child_process";
import { platform } from "node:os";

/**
 * Opens a URL in the default browser.
 * @param {string} url The URL to open.
 */
export default function open(url) {
	const start = platform == "darwin" ? "open" : platform == "win32" ? "start" : "xdg-open";
	exec(start + " " + url);
}
