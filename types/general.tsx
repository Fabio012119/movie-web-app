export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  genre_ids: number[];
  progress: number;
  runtime: number;
};

export type TmdbResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type AppState = {
  selectedContentId: string | null;
  setSelectedContentId: (id: string | null) => void;
  genres: Genre[];
  genresLoading: boolean;
  genresError: string | null;
};

export type GenreMovieMap = Record<number, TmdbMovie[]>;

export type MovieWithProgress = TmdbMovie & { progress: number };

export type CastMember = {
  id: number;
  name: string;
  character: string;
};

export type MovieDetails = {
  title: string;
  overview: string;
};

export type WatchEntry = {
  id: string;
  progress: number;
  timestamp: number;
};

export type queryType = Record<string, string | number>;
