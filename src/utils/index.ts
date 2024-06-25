import { format } from "date-fns";
import { it } from "date-fns/locale";
import Parser from "rss-parser";
import slugify from "slugify";
import { Track } from "../models";
export { formatDuration } from "./time";

const mainTitle = "DeeJay - Matteo Mancino";

export const getTrackFeed = async (url: string) => {
    let parser = new Parser();
    const feed = await parser.parseURL(url);
  
    return { ...feed, tracks: sortTracks(feed.items) };
};

export const sortTracks = (tracks: Track[]) => {
    return tracks.sort((a, b) => {
      const aDate = new Date(a.pubDate);
      const bDate = new Date(b.pubDate);
  
      return aDate > bDate ? -1 : 1;
    });
};

const TRACKS_PER_PAGE = 20;

export function trackPagination(tracks: Track[]) {
  const numberOfPages = Math.ceil(tracks.length / TRACKS_PER_PAGE);
  const pages = new Array(numberOfPages).fill(0).map((_, index) => ({
    param: `page-${index + 1}`,
    link: `/tracks/page-${index + 1}`,
  }));

  return { numberOfPages, pages };
}

export const buildTitle = (...pageTitles: string[]) =>
  [...pageTitles, mainTitle].filter((item) => item !== "").join(" | ");

export const formatDate = (pubDate: string): string =>
  format(new Date(pubDate), "EEEE, do MMMM yyyy 'ore' k:mm", {
    locale: it,
});

export const prepareTitle = (title: string) => {
  const [epNum, ...rest] = title.split(" - ");
  return [epNum.substring(3), rest.join("")];
};

export const getSlug = (track: Track) =>
  `${slugify(track.title, {
  remove: /[*+~.()'"!\?,:@]/g,
  lower: true, // convert to lower case, defaults to `false`
  strict: false,
})}`;

