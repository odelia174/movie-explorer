export interface Show {
    id: number;
    name: string;
    genres: string[];
    rating: number | null;
    imageUrl: string | null;
    summary: string | null;
    status: string;
  }