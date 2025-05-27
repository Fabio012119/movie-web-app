"use client";

//Component
import MovieCard from "@/components/MovieCard";

//Hooks
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { useEffect, useState } from "react";

//Helpers
import { loadWatchedMovies } from "@/helpers/recentlyWatched";

//Types
import type { MovieWithProgress } from "@/types/general";

export default function RecentlyWatched() {
  const { getRecentlyWatched, removeEntry } = useWatchHistory();
  const [movies, setMovies] = useState<MovieWithProgress[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const areThereMovies = movies.length === 0;

  useEffect(() => {
    loadWatchedMovies(getRecentlyWatched).then(setMovies);
  }, []);

  const handleRemove = (id: string) => {
    setRemovingId(id);

    setTimeout(() => {
      removeEntry(id);
      setRemovingId(null);
      loadWatchedMovies(getRecentlyWatched).then(setMovies);
    }, 500);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
      <div className="flex gap-4 overflow-x-auto">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`relative w-[150px] shrink-0 transition-opacity duration-300 ${
              removingId === `${movie.id}` ? "opacity-0" : "opacity-100"
            }`}
          >
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
            <button
              onClick={() => handleRemove(`${movie.id}`)}
              className="absolute top-0 right-0 text-xs bg-black bg-opacity-60 text-white px-1 py-0.5 rounded-bl cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
        {areThereMovies && (
          <p className="text-green-400">Go and watch some movies</p>
        )}
      </div>
    </section>
  );
}
