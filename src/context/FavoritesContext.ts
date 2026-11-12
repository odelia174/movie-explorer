import { createContext, useContext } from 'react';
import type { Show } from '../types/show';

// What every component gets when it calls useFavorites()
export interface FavoritesContextValue {
  favorites: Show[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (show: Show) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

// Any component inside <FavoritesProvider> can call this hook
// to read the favorites or to add/remove a show.
export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside <FavoritesProvider>');
  }

  return context;
}
