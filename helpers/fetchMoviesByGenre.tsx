//Helpers
import { fetchMovies } from "./fetchMovies";

//Types
import { TmdbResponse, TmdbMovie } from "@/types/general";

export async function fetchMoviesByGenre(
  genreId: number
): Promise<TmdbMovie[]> {
  const data = await fetchMovies<TmdbResponse<TmdbMovie>>("discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
  });

  return data.results;
}
