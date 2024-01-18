import { exec } from "node:child_process";
import { platform } from "node:os";

/**
 * Opens a URL in the default browser.
 * @param {string} url The URL to open.
 */
export default function open(url) {
	const plat = platform();

	let start;
	switch (plat) {
		case "win32":
			start = "start";
			url = url.replace(/\&/gm, "^")
			break;
		case "darwin":
			start = "open";
			break;
		case "linux":
			start = "xdg-open";
			break;
		default:
			throw Error(`Unsupported platform: ${plat}`);
	}

		exec(start + " " + url);
}
