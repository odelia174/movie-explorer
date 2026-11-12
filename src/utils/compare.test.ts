import { describe, expect, it } from 'vitest';
import type { Show } from '../types/show';
import {
  compareRatings,
  describeRatings,
  getCommonGenres,
  selectShow,
  sortShowsByName,
} from './compare';

function createShow(
  id: number,
  name: string,
  rating: number | null,
  genres: string[],
): Show {
  return {
    id,
    name,
    genres,
    rating,
    imageUrl: null,
    summary: null,
    status: 'Ended',
  };
}

const breakingBad = createShow(1, 'Breaking Bad', 9.2, ['Drama', 'Crime']);
const theWire = createShow(2, 'The Wire', 9.2, ['Drama', 'Crime', 'Thriller']);
const theOffice = createShow(3, 'The Office', 8.5, ['Comedy']);
const noRating = createShow(4, 'New Show', null, ['Drama']);

describe('selectShow', () => {
  it('puts a show in an empty place', () => {
    expect(selectShow([null, null], 0, 1)).toEqual([1, null]);
    expect(selectShow([1, null], 1, 3)).toEqual([1, 3]);
  });

  it('replaces the show in a place (changing the choice)', () => {
    expect(selectShow([1, 3], 1, 2)).toEqual([1, 2]);
  });

  it('removes a show when given null', () => {
    expect(selectShow([1, 3], 0, null)).toEqual([null, 3]);
  });

  it('does not allow the same show in both places', () => {
    expect(selectShow([1, 3], 1, 1)).toEqual([1, 3]);
    expect(selectShow([null, 3], 0, 3)).toEqual([null, 3]);
  });
});

describe('compareRatings', () => {
  it('finds the show with the higher rating', () => {
    expect(compareRatings(breakingBad, theOffice)).toBe('first');
    expect(compareRatings(theOffice, breakingBad)).toBe('second');
  });

  it('returns "tie" for equal ratings and "unknown" when a rating is missing', () => {
    expect(compareRatings(breakingBad, theWire)).toBe('tie');
    expect(compareRatings(breakingBad, noRating)).toBe('unknown');
  });
});

describe('describeRatings', () => {
  it('explains the result in a sentence', () => {
    expect(describeRatings(theOffice, breakingBad)).toBe(
      'Breaking Bad has the higher rating (9.2 vs 8.5).',
    );
    expect(describeRatings(breakingBad, theWire)).toBe(
      'Both shows have the same rating (9.2).',
    );
    expect(describeRatings(noRating, theOffice)).toBe(
      "Can't compare ratings: at least one show has no rating.",
    );
  });
});

describe('getCommonGenres', () => {
  it('returns only the genres both shows have', () => {
    expect(getCommonGenres(breakingBad, theWire)).toEqual(['Drama', 'Crime']);
    expect(getCommonGenres(breakingBad, theOffice)).toEqual([]);
  });
});

describe('sortShowsByName', () => {
  it('sorts by name A–Z without changing the original list', () => {
    const shows = [theOffice, breakingBad, theWire];

    expect(sortShowsByName(shows).map((show) => show.name)).toEqual([
      'Breaking Bad',
      'The Office',
      'The Wire',
    ]);
    expect(shows[0]).toBe(theOffice);
  });
});
