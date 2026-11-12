import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { API_BASE_URL, toShow } from '../api/tvmaze';
import ErrorMessage from '../components/ErrorMessage';
import FavoriteButton from '../components/FavoriteButton';
import GenreList from '../components/GenreList';
import LoadingMessage from '../components/LoadingMessage';
import type { Show } from '../types/show';
import type { TvmazeShow } from '../types/tvmaze';

function ShowDetailsPage() {
  // The id comes from the URL, e.g. /items/3 → id = "3" (always a string)
  const { id } = useParams();

  const [show, setShow] = useState<Show | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadShow() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/shows/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          // TVmaze has no show with this id
          setShow(null);
        } else if (!response.ok) {
          throw new Error(`The server responded with status ${response.status}`);
        } else {
          const data = (await response.json()) as TvmazeShow;
          setShow(toShow(data));
        }
      } catch (err) {
        // We cancelled the request ourselves — not a real error
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : 'Unknown error');
      }

      setIsLoading(false);
    }

    loadShow();

    return () => controller.abort();
  }, [id]); // run again whenever the id in the URL changes

  const backLink = (
    <Link to="/" className="back-link">
      ← Back to shows
    </Link>
  );

  if (isLoading) {
    return <LoadingMessage text="Loading show..." />;
  }

  if (error) {
    return (
      <section>
        <ErrorMessage
          message="Could not load this show. Please try again later."
          details={error}
        />
        {backLink}
      </section>
    );
  }

  if (!show) {
    return (
      <section className="not-found">
        <h1>Show not found</h1>
        <p>There is no show with id "{id}".</p>
        {backLink}
      </section>
    );
  }

  return (
    <article className="show-details">
      {backLink}

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

          <p className="show-details__status">
            Status: <strong>{show.status}</strong>
          </p>

          <FavoriteButton show={show} withText />

          <p className="show-details__summary">
            {show.summary ?? 'No summary available.'}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ShowDetailsPage;
