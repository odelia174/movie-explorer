import { describe, expect, it } from 'vitest';
import type { Show } from '../types/show';
import { filterShows, getGenres } from './showFilters';

function createShow(id: number, name: string, genres: string[]): Show {
  return {
    id,
    name,
    genres,
    rating: null,
    imageUrl: null,
    summary: null,
    status: 'Ended',
  };
}

const shows: Show[] = [
  createShow(1, 'The Office', ['Comedy']),
  createShow(2, 'Breaking Bad', ['Drama', 'Crime']),
  createShow(3, 'The Last Ship', ['Drama', 'Action']),
  createShow(4, 'Friends', ['Comedy', 'Romance']),
];

// Helper: compare by names, so a failing test shows readable output
const names = (list: Show[]) => list.map((show) => show.name);

describe('filterShows', () => {
  it('returns all shows when there is no search text and no genre', () => {
    expect(filterShows(shows, '', '')).toEqual(shows);
  });

  it('finds shows by name, ignoring upper and lower case', () => {
    expect(names(filterShows(shows, 'tHe', ''))).toEqual([
      'The Office',
      'The Last Ship',
    ]);
  });

  it('ignores spaces around the search text', () => {
    expect(names(filterShows(shows, '  friends  ', ''))).toEqual(['Friends']);
  });

  it('keeps only the shows that have the chosen genre', () => {
    expect(names(filterShows(shows, '', 'Drama'))).toEqual([
      'Breaking Bad',
      'The Last Ship',
    ]);
  });

  it('applies the search text and the genre together', () => {
    expect(names(filterShows(shows, 'The', 'Drama'))).toEqual([
      'The Last Ship',
    ]);
  });

  it('returns an empty list when no show matches', () => {
    expect(filterShows(shows, 'xyz', '')).toEqual([]);
    expect(filterShows(shows, 'Friends', 'Drama')).toEqual([]);
  });
});

describe('getGenres', () => {
  it('returns each genre once, sorted A–Z', () => {
    expect(getGenres(shows)).toEqual([
      'Action',
      'Comedy',
      'Crime',
      'Drama',
      'Romance',
    ]);
  });
});
