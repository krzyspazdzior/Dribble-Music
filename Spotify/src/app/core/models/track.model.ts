import { Artist } from "./artist.model";
import { Image } from "./image.model";

export interface Track {
    id: string;
    name: string;
    popularity: number;
    duration_ms: number;
    album: Album;
    artists: Artist[];
    external_urls: {
      spotify: string;
    };
    preview_url: string | null;
  }
  export interface Album {
    id: string;
    name: string;
    images: Image[]; // Album cover images (array of different sizes)
    external_urls: {
      spotify: string; // Spotify album URL
    };
  }
  
  