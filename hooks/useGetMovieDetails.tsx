import { useState, useEffect } from "react";
import { fetchMovies } from "@/api/fetchMovies";
import { useAppContext } from "@/context/AppContext";
import type { MovieDetails, CastMember, TmdbMovie } from "@/types/general";

export const useGetMovieDetails = () => {
  const { selectedContentId, setSelectedContentId } = useAppContext();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [recommendations, setRecommendations] = useState<TmdbMovie[]>([]);

  useEffect(() => {
    if (!selectedContentId) return;

    const fetchData = async () => {
      const [movieData, creditsData, recData] = await Promise.all([
        fetchMovies<MovieDetails>(`movie/${selectedContentId}`),
        fetchMovies<{ cast: CastMember[] }>(
          `movie/${selectedContentId}/credits`,
        ),
        fetchMovies<{ results: TmdbMovie[] }>(
          `movie/${selectedContentId}/recommendations`,
        ),
      ]);

      setMovie({
        title: movieData.title,
        overview: movieData.overview,
      });

      setCast(creditsData.cast.slice(0, 5));
      setRecommendations(recData.results.slice(0, 5));
    };

    fetchData();
  }, [selectedContentId]);

  return {
    selectedContentId,
    setSelectedContentId,
    movie,
    cast,
    recommendations,
  };
};
