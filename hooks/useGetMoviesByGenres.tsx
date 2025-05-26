//Hooks
import { useEffect, useState } from "react";

//Helpers
import { fetchGenres } from "@/helpers/fetchGenres";
import { fetchMoviesByGenre } from "@/helpers/fetchMoviesByGenre";

//Types
import type { GenreMovieMap, Genre } from "@/types/general";

export function useGetMoviesByGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<GenreMovieMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);

        const result: GenreMovieMap = {};

        for (const genre of fetchedGenres) {
          const movies = await fetchMoviesByGenre(genre.id);
          result[genre.id] = movies;
        }

        setMoviesByGenre(result);
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
