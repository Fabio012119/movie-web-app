//Hooks
import { useEffect, useState } from "react";

//Helpers
import { fetchMovies } from "@/helpers/fetchMovies";

//Types
import type { TmdbMovie, TmdbResponse } from "@/types/general";

export const useGetMovies = () => {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies<TmdbResponse<TmdbMovie>>(
          "movie/popular"
        );
        setMovies(data.results);
      } catch (err) {
        console.error(err);
        if (setError) setError((err as Error).message);
      } finally {
        if (setLoading) setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return { movies, loading, error };
};
