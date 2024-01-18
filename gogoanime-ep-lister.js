import { JSDOM } from "jsdom";
import { argv } from "node:process";

import open from "./utils/open.js";

const urlString = argv[2];
if (!urlString) {
	console.error("Please provide a valid gogoanime url");
	process.exit(1);
}

const url = new URL(urlString);
const gogoanimeDomain = url.origin;
const animeName = url.pathname.match(/category\/(.*)/)[1];

const categoryPage = await fetch(url);
const html = await categoryPage.text();

const dom = new JSDOM(html);
const document = dom.window.document;

const episodePage = document.getElementById("episode_page");
const epStartEndInfoAnchor = episodePage.querySelector("li>a.active");

// const startingEpisode = Number.parseInt(epStartEndInfoAnchor.getAttribute("ep_start"));
const startingEpisode = 1;
const endingEpisode = Number.parseInt(epStartEndInfoAnchor.getAttribute("ep_end"));

const episodeLinks = new Array(endingEpisode - startingEpisode + 1).fill("").map((_, index) => {
	return `${gogoanimeDomain}/${animeName}-episode-${startingEpisode + index}`;
});

const episodeDownloadLinks = new Array(endingEpisode - startingEpisode + 1);
console.info(`Found ${episodeLinks.length} episodes`);

for (let index = 0; index < episodeLinks.length; index++) {
	const episodeLink = episodeLinks[index];
	console.info("Fetching episode link: " + episodeLink);

	const episodePage = await fetch(episodeLink);
	const episodeHtml = await episodePage.text();
	const episodeDom = new JSDOM(episodeHtml);
	const episodeDocument = episodeDom.window.document;

	const downloadElement = episodeDocument.querySelector("div.favorites_book>ul>li.dowloads>a");
	const downloadLink = downloadElement.getAttribute("href");

	episodeDownloadLinks[index] = downloadLink;
	await new Promise((resolve) => setTimeout(resolve, 1000));
}

for (const episodeDownloadLink of episodeDownloadLinks) {
	open(episodeDownloadLink);
}
