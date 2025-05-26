export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
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
