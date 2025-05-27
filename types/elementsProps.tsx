import type { TmdbMovie } from "./general";
import type { MovieWithProgress } from "./general";

export type ContentRowProps = {
  title: string;
  movies: MovieWithProgress[] | TmdbMovie[];
  rowIndex: number;
  showProgressBar?: boolean;
  onRemove?: (id: string) => void;
  removingId?: string | null;
};

export type MovieCardProps = {
  movie: TmdbMovie;
  small?: boolean;
};

export type MoviesProps = {
  movies: TmdbMovie[];
};

export type MovieVideoProps = { movieId: string };
