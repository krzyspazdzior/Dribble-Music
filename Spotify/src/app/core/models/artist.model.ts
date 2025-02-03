export interface Artist {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    images: { url: string; height: number; width: number }[];
  }