import type { Show } from '../types/show';

// The name under which the favorites are saved in localStorage
export const FAVORITES_STORAGE_KEY = 'movie-explorer:favorites';

// The two localStorage methods we use. Tests pass a fake storage instead.
export type FavoritesStorage = Pick<Storage, 'getItem' | 'setItem'>;

// Adds a show, unless a show with the same id is already there (no duplicates).
// Always returns a new array and never changes the old one, as React expects.
export function addFavorite(favorites: Show[], show: Show): Show[] {
  if (favorites.some((item) => item.id === show.id)) {
    return favorites;
  }

  return [...favorites, show];
}

export function removeFavorite(favorites: Show[], id: number): Show[] {
  return favorites.filter((item) => item.id !== id);
}

// Adds the show if it is not a favorite yet, removes it if it is.
export function toggleFavorite(favorites: Show[], show: Show): Show[] {
  return favorites.some((item) => item.id === show.id)
    ? removeFavorite(favorites, show.id)
    : addFavorite(favorites, show);
}

// Checks that something read from localStorage really looks like a Show
function isShow(value: unknown): value is Show {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === 'number' &&
    typeof item.name === 'string' &&
    Array.isArray(item.genres) &&
    (typeof item.rating === 'number' || item.rating === null) &&
    (typeof item.imageUrl === 'string' || item.imageUrl === null) &&
    (typeof item.summary === 'string' || item.summary === null) &&
    typeof item.status === 'string'
  );
}

// Reads the saved favorites.
// Returns [] if nothing was saved yet or the saved data is broken.
export function loadFavorites(storage: FavoritesStorage): Show[] {
  try {
    const saved = storage.getItem(FAVORITES_STORAGE_KEY);

    if (saved === null) {
      return [];
    }

    const data: unknown = JSON.parse(saved);

    if (!Array.isArray(data)) {
      return [];
    }

    // Keep only valid shows, and each show only once
    return data.filter(isShow).reduce<Show[]>(addFavorite, []);
  } catch {
    return [];
  }
}

// Saves the favorites. localStorage can only store text, so we use JSON.
export function saveFavorites(
  storage: FavoritesStorage,
  favorites: Show[],
): void {
  try {
    storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Storage is full or blocked — favorites still work until the page closes
  }
}
