// The shape of a show as it arrives from the TVmaze API
// (https://api.tvmaze.com/shows). The API sends many more fields —
// we only describe the ones the app uses.
export interface TvmazeShow {
  id: number;
  name: string;
  genres: string[];
  status: string;
  summary: string | null;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
}
