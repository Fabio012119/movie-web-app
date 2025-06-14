"use client";
// Utils
import dynamic from "next/dynamic";
import { Suspense, memo } from "react";
import { twMerge } from "tailwind-merge";
// Hooks
import { useGetMovieDetails } from "@/hooks/useGetMovieDetails";
//components
const MovieCard = dynamic(() => import("../MovieCard"));
const MovieVideo = dynamic(() => import("../MovieVideo"));
const Spinner = dynamic(() => import("../Spinner"));

function MovieModalComponent() {
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
        "items-center justify-center z-50 slide-bottom",
      )}
    >
      <div
        className={twMerge(
          "bg-white w-full landscape:w-3xl landscape:h-[90vh]",
          "landscape:overflow-y-scroll max-w-4xl",
          "rounded p-6 relative text-black",
        )}
      >
        <button
          onClick={() => setSelectedContentId(null)}
          className="absolute top-3 right-3 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="mb-4 text-sm text-gray-600">
          {movie.overview ? movie.overview : "No overview"}
        </p>

        <div className="mb-4">
          <Suspense fallback={<Spinner />}>
            <MovieVideo movieId={selectedContentId} />
          </Suspense>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Top Cast:</h3>
          <ul className="list-disc list-inside text-sm">
            {cast.map((actor) => (
              <li key={actor.id}>
                {actor.name} as {actor.character}
              </li>
            ))}
            {cast.length === 0 && "No listed cast"}
          </ul>
        </div>

        {recommendations.length !== 0 && (
          <div>
            <h3 className="font-semibold mb-2">Recommended:</h3>
            <div className="flex gap-4 overflow-x-auto">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="relative w-[96px] h-[144px] shrink-0 rounded overflow-hidden"
                >
                  <Suspense fallback={<Spinner />}>
                    <MovieCard movie={rec} small />
                  </Suspense>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MovieModal = memo(MovieModalComponent);
export default MovieModal;
