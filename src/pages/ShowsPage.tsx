import ShowCard from '../components/ShowCard';
import { shows } from '../data/shows';

function ShowsPage() {
  return (
    <>
      <header>
        <h1>TV Shows</h1>
        <p>Pick a show to see its details</p>
      </header>

      <section className="show-list">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </section>
    </>
  );
}

export default ShowsPage;
