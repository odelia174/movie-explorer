import type { Show } from '../types/show';

interface ShowCardProps {
  show: Show;
}

function ShowCard({ show }: ShowCardProps) {
  return (
    <article className="show-card">
      {show.imageUrl ? (
        <img className="show-card__image" src={show.imageUrl} alt={show.name} />
      ) : (
        <div className="show-card__image show-card__image--empty">No image</div>
      )}

      <div className="show-card__body">
        <h2 className="show-card__title">{show.name}</h2>

        <ul className="show-card__genres">
          {show.genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>

        <p className="show-card__rating">
          {show.rating !== null ? `★ ${show.rating.toFixed(1)}` : 'No rating'}
        </p>
      </div>
    </article>
  );
}

export default ShowCard;
