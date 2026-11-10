import { Link, useParams } from 'react-router';
import GenreList from '../components/GenreList';
import { shows } from '../data/shows';

function ShowDetailsPage() {
  // The id comes from the URL, e.g. /items/3 → id = "3" (always a string)
  const { id } = useParams();
  const show = shows.find((item) => item.id === Number(id));

  if (!show) {
    return (
      <section className="not-found">
        <h1>Show not found</h1>
        <p>There is no show with id "{id}".</p>
        <Link to="/" className="back-link">
          ← Back to shows
        </Link>
      </section>
    );
  }

  return (
    <article className="show-details">
      <Link to="/" className="back-link">
        ← Back to shows
      </Link>

      <div className="show-details__content">
        {show.imageUrl && (
          <img
            className="show-details__image"
            src={show.imageUrl}
            alt={show.name}
          />
        )}

        <div className="show-details__info">
          <h1>{show.name}</h1>

          <GenreList genres={show.genres} />

          <p className="show-details__rating">
            {show.rating !== null
              ? `★ ${show.rating.toFixed(1)} / 10`
              : 'No rating'}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ShowDetailsPage;
