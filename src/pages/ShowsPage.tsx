import { useEffect, useState } from 'react';
import { API_BASE_URL, toShow } from '../api/tvmaze';
import ErrorMessage from '../components/ErrorMessage';
import LoadingMessage from '../components/LoadingMessage';
import ShowCard from '../components/ShowCard';
import type { Show } from '../types/show';
import type { TvmazeShow } from '../types/tvmaze';

function ShowsPage() {
  // The state of this page: the shows, whether they are loading, and an error
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Lets us cancel the request if the user leaves the page before it ends
    const controller = new AbortController();

    async function loadShows() {
      try {
        const response = await fetch(`${API_BASE_URL}/shows`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`The server responded with status ${response.status}`);
        }

        const data = (await response.json()) as TvmazeShow[];
        setShows(data.map(toShow));
      } catch (err) {
        // We cancelled the request ourselves — not a real error
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : 'Unknown error');
      }

      setIsLoading(false);
    }

    loadShows();

    // Cleanup: runs when the page is closed
    return () => controller.abort();
  }, []); // [] = run only once, when the page first appears

  return (
    <>
      <header>
        <h1>TV Shows</h1>
        <p>Pick a show to see its details</p>
      </header>

      {isLoading && <LoadingMessage text="Loading shows..." />}

      {error && (
        <ErrorMessage
          message="Could not load the shows. Please try again later."
          details={error}
        />
      )}

      {!isLoading && !error && (
        <section className="show-list">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </section>
      )}
    </>
  );
}

export default ShowsPage;
