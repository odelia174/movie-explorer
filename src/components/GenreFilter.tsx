interface GenreFilterProps {
  genres: string[];
  value: string;
  onChange: (genre: string) => void;
}

function GenreFilter({ genres, value, onChange }: GenreFilterProps) {
  return (
    <select
      className="genre-filter"
      aria-label="Filter by genre"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All genres</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default GenreFilter;
