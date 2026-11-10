import { Link } from 'react-router';
import type { Show } from '../types/show';
import GenreList from './GenreList';

interface ShowCardProps {
  show: Show;
}

function ShowCard({ show }: ShowCardProps) {
  return (
    <Link to={`/items/${show.id}`} className="show-card">
      {show.imageUrl ? (
        <img className="show-card__image" src={show.imageUrl} alt={show.name} />
      ) : (
        <div className="show-card__image show-card__image--empty">No image</div>
      )}

      <div className="show-card__body">
        <h2 className="show-card__title">{show.name}</h2>

        <GenreList genres={show.genres} />

        <p className="show-card__rating">
          {show.rating !== null ? `★ ${show.rating.toFixed(1)}` : 'No rating'}
        </p>
      </div>
    </Link>
  );
}

export default ShowCard;
