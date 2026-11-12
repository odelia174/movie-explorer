import { describe, expect, it } from 'vitest';
import type { TvmazeShow } from '../types/tvmaze';
import { stripHtml, toShow } from './tvmaze';

// A show exactly as the API sends it (based on https://api.tvmaze.com/shows/1).
// Each test can override the fields it wants to check.
function createApiShow(overrides: Partial<TvmazeShow> = {}): TvmazeShow {
  return {
    id: 1,
    name: 'Under the Dome',
    genres: ['Drama', 'Science-Fiction', 'Thriller'],
    status: 'Ended',
    summary: '<p><b>Under the Dome</b> is the story of a small town.</p>',
    rating: { average: 6.6 },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/610/1525272.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/610/1525272.jpg',
    },
    ...overrides,
  };
}

describe('stripHtml', () => {
  it('removes HTML tags and keeps the text', () => {
    const html = '<p><b>Lost</b> is a <i>mystery</i> drama.</p>';

    expect(stripHtml(html)).toBe('Lost is a mystery drama.');
  });

  it('keeps a space between paragraphs and after line breaks', () => {
    expect(stripHtml('<p>First part.</p><p>Second part.</p>')).toBe(
      'First part. Second part.',
    );
    expect(stripHtml('Line one<br>Line two<br />Line three')).toBe(
      'Line one Line two Line three',
    );
  });

  it('collapses extra spaces and trims the edges', () => {
    const html = '  <p>Too    many\n   spaces</p>  ';

    expect(stripHtml(html)).toBe('Too many spaces');
  });
});

describe('toShow', () => {
  it('converts an API show into the Show type used by the app', () => {
    expect(toShow(createApiShow())).toEqual({
      id: 1,
      name: 'Under the Dome',
      genres: ['Drama', 'Science-Fiction', 'Thriller'],
      rating: 6.6,
      imageUrl:
        'https://static.tvmaze.com/uploads/images/medium_portrait/610/1525272.jpg',
      summary: 'Under the Dome is the story of a small town.',
      status: 'Ended',
    });
  });

  it('sets rating to null when the show has no rating', () => {
    const show = toShow(createApiShow({ rating: { average: null } }));

    expect(show.rating).toBeNull();
  });

  it('sets imageUrl to null when the show has no image', () => {
    const show = toShow(createApiShow({ image: null }));

    expect(show.imageUrl).toBeNull();
  });

  it('sets summary to null when the summary is missing or empty', () => {
    expect(toShow(createApiShow({ summary: null })).summary).toBeNull();
    expect(toShow(createApiShow({ summary: '' })).summary).toBeNull();
  });
});
