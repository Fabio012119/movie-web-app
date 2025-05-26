import type { TmdbMovie } from "./general";

export type ContentRowProps = {
  title: string;
  movies: TmdbMovie[];
  rowIndex: number;
};

export type MovieCardProps = {
  movie: TmdbMovie;
  small?: boolean;
};

export type MoviesProps = {
  movies: TmdbMovie[];
};
