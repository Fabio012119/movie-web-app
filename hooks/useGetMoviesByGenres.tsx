//Hooks
import { useEffect, useState } from "react";
//Helpers
import { fetchGenres } from "@/api/fetchGenres";
import { fetchMoviesByGenre } from "@/api/fetchMoviesByGenre";

//Types
import type { GenreMovieMap, Genre, TmdbMovie } from "@/types/general";

export function useGetMoviesByGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<GenreMovieMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);

        const genreMovies = await Promise.all(
          genreList.map(async (genre) => {
            const movies = await fetchMoviesByGenre(genre.id);
            return { id: genre.id, movies };
          })
        );

        const map: Record<number, TmdbMovie[]> = {};
        genreMovies.forEach(({ id, movies }) => {
          map[id] = movies;
        });

        setMoviesByGenre(map);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  return { genres, moviesByGenre, loading, error };
}
