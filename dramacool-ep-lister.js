import { JSDOM } from "jsdom";
import { argv } from "process";

import open from "./utils/open.js";

const url = argv[2];
if (!url) {
	console.error("Please provide a valid dramacool.to url");
	process.exit(1);
}

const response = await fetch(url);
const html = await response.text();

const dom = new JSDOM(html);
const document = dom.window.document;

const allEpisodesWrapper = document.querySelector("div#all-episodes ul.list");
const allEpisodeElements = allEpisodesWrapper.querySelectorAll("li h3 a");

const allEpisodes = Array.from(allEpisodeElements).map((episodeElement) => {
	return episodeElement.href;
});

allEpisodes.forEach((episode) => {
	open(episode);
});
