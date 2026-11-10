import ShowCard from './components/ShowCard';
import { shows } from './data/shows';
import './App.css';

function App() {
  return (
    <main className="app">
      <header>
        <h1>Movie Explorer</h1>
        <p>Discover TV shows</p>
      </header>

      <section className="show-list">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </section>
    </main>
  );
}

export default App;
