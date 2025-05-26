//Hooks
import { useState, useEffect } from "react";

//Helpers
import { fetchGenres } from "@/helpers/fetchGenres";

//Types
import type { Genre } from "@/types/general";

export const useGetGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const [genresError, setGenresError] = useState<string | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (err) {
        setGenresError((err as Error).message);
      } finally {
        setGenresLoading(false);
      }
    };

    loadGenres();
  }, []);

  return { genres, genresLoading, genresError };
};
