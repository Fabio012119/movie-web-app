// Components
import Image from "next/image";
//Hooks
import { useAppContext } from "@/context/AppContext";
//Utils
import { twMerge } from "tailwind-merge";
//Assets
import defaultImage from "@/assets/no-poster.png";
// Types
import type { MovieCardProps } from "@/types/elementsProps";

export default function MovieCard({ movie, small = false }: MovieCardProps) {
  const { setSelectedContentId } = useAppContext();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : defaultImage;

  return (
    <div
      className="relative group cursor-pointer p-2"
      onClick={() => setSelectedContentId(String(movie.id))}
    >
      <Image
        src={posterUrl}
        alt={movie.title}
        width={small ? 150 : 500}
        height={small ? 225 : 750}
        className={`rounded w-full h-auto transition-transform group-hover:scale-105 ${
          !small && "min-h-[290px]"
        } `}
      />

      {!small && (
        <div className="mt-3 ">
          <h4 className="text-sm font-semibold truncate">{movie.title}</h4>
          <p className="text-xs text-gray-400">{movie.release_date}</p>
        </div>
      )}

      {!small && (
        <div
          className={twMerge(
            "absolute p-2 inset-0 bg-[rgba(0,0,0,0.6)] text-white",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            "duration-300 flex flex-col justify-end text-xs rounded",
          )}
        >
          <p className="font-semibold text-sm truncate">{movie.title}</p>
          {movie.vote_average && <p>Rating: {movie.vote_average.toFixed(1)}</p>}
          <p>Release Date: {movie.release_date?.slice(0, 4)}</p>
          <p>
            Language:{" "}
            <span className="!uppercase">{movie.original_language}</span>
          </p>
        </div>
      )}
    </div>
  );
}
