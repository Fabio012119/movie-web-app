import { fetchMovies } from "./fetchMovies";
import type { Genre } from "@/types/general";

export async function fetchGenres(): Promise<Genre[]> {
  const data = await fetchMovies<{ genres: Genre[] }>("genre/movie/list");
  return data.genres;
}
