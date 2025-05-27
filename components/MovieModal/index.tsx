"use client";

//Components
import MovieCard from "../MovieCard";
import MovieVideo from "../MovieVideo";

//Hooks
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

//Helpers
import { fetchMovies } from "@/helpers/fetchMovies";

//Types
import type { MovieDetails, CastMember, TmdbMovie } from "@/types/general";

export default function MovieModal() {
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
          `movie/${selectedContentId}/credits`
        ),
        fetchMovies<{ results: TmdbMovie[] }>(
          `movie/${selectedContentId}/recommendations`
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

  if (!selectedContentId || !movie) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.65)] flex items-center justify-center z-50 slide-bottom">
      <div className="bg-white w-full max-w-4xl rounded p-6 relative text-black">
        <button
          onClick={() => setSelectedContentId(null)}
          className="absolute top-3 right-3 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="mb-4 text-sm text-gray-600">{movie.overview}</p>

        <div className="mb-4">
          <MovieVideo movieId={selectedContentId} />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Top Cast:</h3>
          <ul className="list-disc list-inside text-sm">
            {cast.map((actor) => (
              <li key={actor.id}>
                {actor.name} as {actor.character}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Recommended:</h3>
          <div className="flex gap-4 overflow-x-auto">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="relative w-[96px] h-[144px] shrink-0 rounded overflow-hidden"
              >
                <MovieCard movie={rec} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
