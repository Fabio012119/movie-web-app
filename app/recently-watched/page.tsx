"use client";

//Component
import MovieCard from "@/components/MovieCard";

//Hooks
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { useEffect, useState } from "react";

//Helpers
import { fetchMovies } from "@/helpers/fetchMovies";

//Types
import type { TmdbMovie, MovieWithProgress } from "@/types/general";

export default function RecentlyWatched() {
  const { getRecentlyWatched } = useWatchHistory();
  const [movies, setMovies] = useState<MovieWithProgress[]>([]);

  useEffect(() => {
    const history = getRecentlyWatched().filter(
      (entry) => entry.id !== undefined && entry.id !== null
    );

    if (history.length === 0) return;

    Promise.all(
      history.map((entry) =>
        fetchMovies<TmdbMovie>(`movie/${entry.id}`).then((movie) => ({
          ...movie,
          progress: entry.progress,
        }))
      )
    ).then(setMovies);
  }, []);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
      <div className="flex gap-4 overflow-x-auto">
        {movies.map((movie) => (
          <div key={movie.id} className="relative w-[150px] shrink-0">
            <MovieCard movie={movie} small />
            <div className="h-1 bg-gray-300 mt-1 rounded overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{
                  width: movie.runtime
                    ? `${(movie.progress / movie.runtime) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
