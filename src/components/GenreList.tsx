interface GenreListProps {
  genres: string[];
}

function GenreList({ genres }: GenreListProps) {
  return (
    <ul className="genre-list">
      {genres.map((genre) => (
        <li key={genre}>{genre}</li>
      ))}
    </ul>
  );
}

export default GenreList;
