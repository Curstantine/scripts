import { JSDOM } from "jsdom";
import { argv } from "process";

import open from "./utils/open.js";
import sleep from "./utils/sleep.js";

if (!URL.canParse(argv[2])) {
	console.error("Please provide a valid dramacool url");
	process.exit(1);
}

const url = new URL(argv[2]);
const response = await fetch(url);
const html = await response.text();

const dom = new JSDOM(html);
const document = dom.window.document;

const allEpisodesWrapper = document.querySelector("ul.list-episode-item-2");
const allEpisodeElements = allEpisodesWrapper.querySelectorAll("li a");

const allEpisodes = Array.from(allEpisodeElements).map((episodeElement) => {
	return episodeElement.href;
});

for (let i = 0; i < allEpisodes.length; i++) {
	const sub = new URL(allEpisodes[i], url);
	// const response = await fetch(sub);
	// const html = await response.text();

	// const dom = new JSDOM(html);
	// const document = dom.window.document;

	// const downloadButton = document.querySelector("li.download a");
	// const downloadURL = "https:" + downloadButton.href;
	console.log("Opening episode", i + 1, "url:", sub.toString());
	
	open(sub.toString());
	await sleep(1000);
}
