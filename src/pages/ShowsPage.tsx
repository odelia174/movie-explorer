import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import GenreFilter from '../components/GenreFilter';
import LoadingMessage from '../components/LoadingMessage';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';
import { useShows } from '../hooks/useShows';
import { filterShows, getGenres } from '../utils/showFilters';

function ShowsPage() {
  // Load the shows from the API (fetch + useEffect live in hooks/useShows.ts)
  const { shows, isLoading, error } = useShows();

  // What the user typed in the search box and picked in the genre list
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); // '' = all genres

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
