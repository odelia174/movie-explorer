import { Link } from 'react-router';
import ShowCard from '../components/ShowCard';
import { useFavorites } from '../context/FavoritesContext';

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <>
      <header>
        <h1>My Favorites</h1>
        {favorites.length > 0 && (
          <p>
            You saved {favorites.length}{' '}
            {favorites.length === 1 ? 'show' : 'shows'}
          </p>
        )}
      </header>

      {favorites.length > 0 ? (
        <section className="show-list">
          {favorites.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </section>
      ) : (
        <div className="status-message">
          <p className="empty-message__title">You have no favorite shows yet</p>
          <p>Press the ♡ button on any show to save it here.</p>
          <Link to="/" className="link-button">
            Browse shows
          </Link>
        </div>
      )}
    </>
  );
}

export default FavoritesPage;
