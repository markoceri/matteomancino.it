import Parser from "rss-parser";
import { Track } from "../models";

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