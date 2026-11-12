import type { Show } from '../types/show';

interface ShowPickerProps {
  label: string;
  shows: Show[];
  value: number | null;
  takenId: number | null; // the show chosen in the other place — can't be chosen here
  onChange: (showId: number | null) => void;
}

function ShowPicker({ label, shows, value, takenId, onChange }: ShowPickerProps) {
  return (
    <label className="show-picker">
      <span className="show-picker__label">{label}</span>
      <select
        className="show-picker__select"
        value={value ?? ''}
        onChange={(event) =>
          onChange(event.target.value === '' ? null : Number(event.target.value))
        }
      >
        <option value="">Choose a show...</option>
        {shows.map((show) => (
          <option key={show.id} value={show.id} disabled={show.id === takenId}>
            {show.name}
            {show.id === takenId ? ' (already chosen)' : ''}
          </option>
        ))}
      </select>
    </label>
  );
}

export default ShowPicker;
