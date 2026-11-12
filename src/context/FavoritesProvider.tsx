import { useEffect, useState, type ReactNode } from 'react';
import type { Show } from '../types/show';
import {
  loadFavorites,
  saveFavorites,
  toggleFavorite,
} from '../utils/favorites';
import { FavoritesContext } from './FavoritesContext';

interface FavoritesProviderProps {
  children: ReactNode;
}

// Holds the list of favorites for the whole app
function FavoritesProvider({ children }: FavoritesProviderProps) {
  // Read the saved favorites from localStorage once, when the app starts
  const [favorites, setFavorites] = useState<Show[]>(() =>
    loadFavorites(localStorage),
  );

  // Save to localStorage every time the favorites change
  useEffect(() => {
    saveFavorites(localStorage, favorites);
  }, [favorites]);

  const value = {
    favorites,
    isFavorite: (id: number) => favorites.some((show) => show.id === id),
    toggleFavorite: (show: Show) =>
      setFavorites((current) => toggleFavorite(current, show)),
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
