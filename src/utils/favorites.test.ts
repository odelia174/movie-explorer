import { describe, expect, it } from 'vitest';
import type { Show } from '../types/show';
import {
  addFavorite,
  FAVORITES_STORAGE_KEY,
  type FavoritesStorage,
  loadFavorites,
  removeFavorite,
  saveFavorites,
  toggleFavorite,
} from './favorites';

function createShow(id: number, name: string): Show {
  return {
    id,
    name,
    genres: ['Drama'],
    rating: 8.5,
    imageUrl: null,
    summary: null,
    status: 'Ended',
  };
}

// A fake localStorage that keeps the data in memory
function createFakeStorage(): FavoritesStorage {
  const data = new Map<string, string>();

  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
}

const office = createShow(1, 'The Office');
const friends = createShow(2, 'Friends');

describe('addFavorite', () => {
  it('adds a show without changing the original list', () => {
    const before: Show[] = [office];
    const after = addFavorite(before, friends);

    expect(after).toEqual([office, friends]);
    expect(before).toEqual([office]);
  });

  it('does not add the same show twice', () => {
    const sameShowAgain = createShow(1, 'The Office');

    expect(addFavorite([office], sameShowAgain)).toEqual([office]);
  });
});

describe('removeFavorite', () => {
  it('removes only the show with the given id', () => {
    expect(removeFavorite([office, friends], 1)).toEqual([friends]);
  });
});

describe('toggleFavorite', () => {
  it('adds the show when it is not a favorite, and removes it when it is', () => {
    const added = toggleFavorite([], office);
    const removed = toggleFavorite(added, office);

    expect(added).toEqual([office]);
    expect(removed).toEqual([]);
  });
});

describe('saveFavorites and loadFavorites', () => {
  it('loads the same favorites that were saved (like after a page refresh)', () => {
    const storage = createFakeStorage();

    saveFavorites(storage, [office, friends]);

    expect(loadFavorites(storage)).toEqual([office, friends]);
  });

  it('returns an empty list when nothing was saved yet', () => {
    expect(loadFavorites(createFakeStorage())).toEqual([]);
  });

  it('returns an empty list when the saved data is broken', () => {
    const storage = createFakeStorage();

    storage.setItem(FAVORITES_STORAGE_KEY, '{not valid json');
    expect(loadFavorites(storage)).toEqual([]);

    storage.setItem(FAVORITES_STORAGE_KEY, '{"id": 1}');
    expect(loadFavorites(storage)).toEqual([]);
  });

  it('skips saved items that are not shows, and duplicate shows', () => {
    const storage = createFakeStorage();
    const saved = [office, { id: 'oops' }, null, office, friends];

    storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(saved));

    expect(loadFavorites(storage)).toEqual([office, friends]);
  });
});
