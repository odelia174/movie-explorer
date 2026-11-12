import { useState } from 'react';
import { Link } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';
import GenreList from '../components/GenreList';
import LoadingMessage from '../components/LoadingMessage';
import ShowPicker from '../components/ShowPicker';
import { useShows } from '../hooks/useShows';
import {
  compareRatings,
  describeRatings,
  getCommonGenres,
  selectShow,
  sortShowsByName,
  type CompareSlots,
} from '../utils/compare';

// The two places on the page: 0 = first show, 1 = second show
const SLOTS = [0, 1] as const;

function ComparePage() {
  const { shows, isLoading, error } = useShows();

  // The ids of the two chosen shows. null = nothing chosen there yet
  const [selectedIds, setSelectedIds] = useState<CompareSlots>([null, null]);

  function handleSelect(slot: 0 | 1, showId: number | null) {
    setSelectedIds((current) => selectShow(current, slot, showId));
  }

  // Calculated from the state on every render
  const sortedShows = sortShowsByName(shows);
  const chosen = SLOTS.map(
    (slot) => shows.find((show) => show.id === selectedIds[slot]) ?? null,
  );
  const [first, second] = chosen;
  const ratingResult = first && second ? compareRatings(first, second) : null;
  const higherRatedSlot =
    ratingResult === 'first' ? 0 : ratingResult === 'second' ? 1 : null;

  return (
    <>
      <header>
        <h1>Compare Shows</h1>
        <p>Pick two shows to see them side by side</p>
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
          {!(first && second) && (
            <p className="compare-hint">
              {first || second
                ? 'Choose one more show to compare.'
                : 'Choose two shows to compare them side by side.'}
            </p>
          )}

          <table className="compare-table">
            <thead>
              <tr>
                <td className="compare-table__corner" />
                {SLOTS.map((slot) => (
                  <th key={slot} scope="col">
                    <ShowPicker
                      label={slot === 0 ? 'First show' : 'Second show'}
                      shows={sortedShows}
                      value={selectedIds[slot]}
                      takenId={selectedIds[slot === 0 ? 1 : 0]}
                      onChange={(showId) => handleSelect(slot, showId)}
                    />
                    {chosen[slot] && (
                      <button
                        type="button"
                        className="compare-remove"
                        onClick={() => handleSelect(slot, null)}
                      >
                        ✕ Remove
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">Show</th>
                {chosen.map((show, slot) => (
                  <td key={slot}>
                    {!show && (
                      <div className="compare-table__placeholder">
                        No show selected
                      </div>
                    )}
                    {show?.imageUrl && (
                      <img
                        className="compare-table__image"
                        src={show.imageUrl}
                        alt={show.name}
                      />
                    )}
                    {show && (
                      <Link to={`/items/${show.id}`} className="compare-table__name">
                        {show.name}
                      </Link>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">Rating</th>
                {chosen.map((show, slot) => (
                  <td
                    key={slot}
                    className={
                      slot === higherRatedSlot ? 'compare-table__best' : undefined
                    }
                  >
                    {!show && '—'}
                    {show &&
                      (show.rating !== null
                        ? `★ ${show.rating.toFixed(1)}`
                        : 'No rating')}
                    {slot === higherRatedSlot && (
                      <span className="best-badge">Higher</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">Genres</th>
                {chosen.map((show, slot) => (
                  <td key={slot}>
                    {!show && '—'}
                    {show &&
                      (show.genres.length > 0 ? (
                        <GenreList genres={show.genres} />
                      ) : (
                        'None'
                      ))}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">Status</th>
                {chosen.map((show, slot) => (
                  <td key={slot}>{show ? show.status : '—'}</td>
                ))}
              </tr>
            </tbody>
          </table>

          {first && second && (
            <section className="compare-summary">
              <h2>Summary</h2>
              <p>{describeRatings(first, second)}</p>
              <p>
                Genres in common:{' '}
                {getCommonGenres(first, second).join(', ') || 'none'}
              </p>
            </section>
          )}
        </>
      )}
    </>
  );
}

export default ComparePage;
