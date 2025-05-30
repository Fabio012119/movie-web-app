import type { TmdbMovie } from "@/types/general";

export const uniqueMovies = (allMovies: TmdbMovie[]) => {
  return Array.from(new Map(allMovies.map((m) => [m.id, m])).values());
};

export const topByVote = (movies: TmdbMovie[]) => {
  return movies.sort((a, b) => b.popularity - a.popularity).slice(0, 20);
};
