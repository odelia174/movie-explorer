import { Link } from 'react-router';
import type { Show } from '../types/show';
import FavoriteButton from './FavoriteButton';
import GenreList from './GenreList';

interface ShowCardProps {
  show: Show;
}

function ShowCard({ show }: ShowCardProps) {
  return (
    <article className="show-card">
      <Link to={`/items/${show.id}`} className="show-card__link">
        {show.imageUrl ? (
          <img
            className="show-card__image"
            src={show.imageUrl}
            alt={show.name}
            loading="lazy"
          />
        ) : (
          <div className="show-card__image show-card__image--empty">
            No image
          </div>
        )}

        <div className="show-card__body">
          <h2 className="show-card__title">{show.name}</h2>

          <GenreList genres={show.genres} />

          <p className="show-card__rating">
            {show.rating !== null ? `★ ${show.rating.toFixed(1)}` : 'No rating'}
          </p>
        </div>
      </Link>

      {/* Outside the link, so pressing it does not open the details page */}
      <FavoriteButton show={show} />
    </article>
  );
}

export default ShowCard;
