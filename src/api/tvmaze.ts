import type { Show } from '../types/show';
import type { TvmazeShow } from '../types/tvmaze';

export const API_BASE_URL = 'https://api.tvmaze.com';

// TVmaze show ids are whole positive numbers: "169" is valid,
// "abc", "", "1.5", "0" and "-1" are not (no show can have them).
export function isValidShowId(id: string | undefined): boolean {
  return id !== undefined && /^[1-9]\d*$/.test(id);
}

// TVmaze summaries contain HTML, e.g. "<p><b>Lost</b> is a drama.</p>".
// This turns it into plain text: "Lost is a drama."
export function stripHtml(html: string): string {
  return html
    .replace(/<(br|\/p)\s*\/?>/gi, ' ') // line breaks and paragraph ends → space
    .replace(/<[^>]*>/g, '') // remove all other tags
    .replace(/\s+/g, ' ') // collapse repeated spaces
    .trim();
}

// Converts a show from the API into the simpler Show type the app uses.
export function toShow(apiShow: TvmazeShow): Show {
  return {
    id: apiShow.id,
    name: apiShow.name,
    genres: apiShow.genres,
    rating: apiShow.rating.average,
    imageUrl: apiShow.image?.medium ?? null,
    summary: apiShow.summary ? stripHtml(apiShow.summary) : null,
    status: apiShow.status,
  };
}
