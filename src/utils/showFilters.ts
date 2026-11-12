import type { Show } from '../types/show';

// Keeps only the shows that match both conditions:
// 1. The name contains the search text (upper/lower case and extra spaces are ignored).
// 2. The show has the chosen genre.
// An empty search text or an empty genre ('') means "don't filter by this".
export function filterShows(
  shows: Show[],
  searchText: string,
  genre: string,
): Show[] {
  const query = searchText.trim().toLowerCase();

  return shows.filter((show) => {
    const matchesName = show.name.toLowerCase().includes(query);
    const matchesGenre = genre === '' || show.genres.includes(genre);

    return matchesName && matchesGenre;
  });
}

// Returns every genre that appears in the shows — each one once, sorted A–Z.
export function getGenres(shows: Show[]): string[] {
  const genres = new Set(shows.flatMap((show) => show.genres));

  return [...genres].sort();
}
