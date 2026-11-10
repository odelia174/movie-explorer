import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import ShowsPage from './pages/ShowsPage';
import ShowDetailsPage from './pages/ShowDetailsPage';
import './App.css';

function App() {
  return (
    <>
      <NavBar />

      <main className="app">
        <Routes>
          <Route path="/" element={<ShowsPage />} />
          <Route path="/items/:id" element={<ShowDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
