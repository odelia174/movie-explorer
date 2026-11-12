import { useEffect, useState } from 'react';
import { API_BASE_URL, toShow } from '../api/tvmaze';
import ErrorMessage from '../components/ErrorMessage';
import GenreFilter from '../components/GenreFilter';
import LoadingMessage from '../components/LoadingMessage';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';
import type { Show } from '../types/show';
import type { TvmazeShow } from '../types/tvmaze';
import { filterShows, getGenres } from '../utils/showFilters';

function ShowsPage() {
  // The state of this page: the shows, whether they are loading, and an error
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // What the user typed in the search box and picked in the genre list
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); // '' = all genres

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

  // Calculated again on every render from the state above — no extra state needed
  const genres = getGenres(shows);
  const visibleShows = filterShows(shows, searchText, selectedGenre);

  function clearFilters() {
    setSearchText('');
    setSelectedGenre('');
  }

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
        <>
          <div className="show-filters">
            <SearchBar value={searchText} onChange={setSearchText} />
            <GenreFilter
              genres={genres}
              value={selectedGenre}
              onChange={setSelectedGenre}
            />
          </div>

          <p className="results-count" aria-live="polite">
            Showing {visibleShows.length} of {shows.length} shows
          </p>

          {visibleShows.length > 0 ? (
            <section className="show-list">
              {visibleShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </section>
          ) : (
            <div className="status-message">
              <p className="empty-message__title">No shows match your search</p>
              <p>Try a different name or genre.</p>
              <button
                type="button"
                className="clear-button"
                onClick={clearFilters}
              >
                Clear search and filters
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ShowsPage;
