"use client";

//Components
import MovieCard from "../MovieCard";
import MovieVideo from "../MovieVideo";

//Utils
import { twMerge } from "tailwind-merge";

//Helpers
import { useGetMovieDetails } from "@/hooks/useGetMovieDetails";

export default function MovieModal() {
  const {
    selectedContentId,
    setSelectedContentId,
    movie,
    cast,
    recommendations,
  } = useGetMovieDetails();

  if (!selectedContentId || !movie) return null;

  return (
    <div
      onClick={(e) =>
        e.target === e.currentTarget && setSelectedContentId(null)
      }
      className={twMerge(
        "fixed inset-0 bg-[rgba(0,0,0,0.65)] flex",
        "items-center justify-center z-50 slide-bottom"
      )}
    >
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
                <MovieCard movie={rec} small />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
