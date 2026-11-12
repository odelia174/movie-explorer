import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import FavoritesProvider from './context/FavoritesProvider';
import FavoritesPage from './pages/FavoritesPage';
import ShowsPage from './pages/ShowsPage';
import ShowDetailsPage from './pages/ShowDetailsPage';
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <NavBar />

      <main className="app">
        <Routes>
          <Route path="/" element={<ShowsPage />} />
          <Route path="/items/:id" element={<ShowDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </FavoritesProvider>
  );
}

export default App;
