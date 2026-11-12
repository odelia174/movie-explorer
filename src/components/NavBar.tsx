import { Link, NavLink } from 'react-router';
import { useFavorites } from '../context/FavoritesContext';

function NavBar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        Movie Explorer
      </Link>

      <div className="navbar__links">
        <NavLink to="/" end className="navbar__link">
          Shows
        </NavLink>
        <NavLink to="/favorites" className="navbar__link">
          Favorites
          {favorites.length > 0 && (
            <span className="navbar__count">{favorites.length}</span>
          )}
        </NavLink>
        <NavLink to="/compare" className="navbar__link">
          Compare
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
