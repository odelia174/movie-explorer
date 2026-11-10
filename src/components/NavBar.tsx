import { Link, NavLink } from 'react-router';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        Movie Explorer
      </Link>

      <div className="navbar__links">
        <NavLink to="/" end className="navbar__link">
          Shows
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
