import { useFavorites } from '../context/FavoritesContext';
import type { Show } from '../types/show';

interface FavoriteButtonProps {
  show: Show;
  withText?: boolean; // true = show the words next to the heart
}

function FavoriteButton({ show, withText = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(show.id);
  const label = saved ? 'Remove from favorites' : 'Add to favorites';

  let className = 'favorite-button';
  if (saved) className += ' favorite-button--active';
  if (withText) className += ' favorite-button--with-text';

  return (
    <button
      type="button"
      className={className}
      title={label}
      aria-label={withText ? undefined : `${label}: ${show.name}`}
      onClick={() => toggleFavorite(show)}
    >
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span>
      {withText && label}
    </button>
  );
}

export default FavoriteButton;
