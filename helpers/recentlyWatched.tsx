import { fetchMovies } from "@/api/fetchMovies";
import type { TmdbMovie, MovieWithProgress } from "@/types/general";
import type { WatchEntry } from "@/types/general";

export const loadWatchedMovies = async (
  getRecentlyWatched: () => WatchEntry[],
): Promise<MovieWithProgress[]> => {
  const history = getRecentlyWatched().filter(
    (entry) =>
      entry.id !== undefined && entry.id !== null && entry.progress > 0,
  );

  if (history.length === 0) return [];

  const movies = await Promise.all(
    history.map((entry) =>
      fetchMovies<TmdbMovie>(`movie/${entry.id}`).then((movie) => ({
        ...movie,
        progress: entry.progress,
      })),
    ),
  );

  return movies;
};
