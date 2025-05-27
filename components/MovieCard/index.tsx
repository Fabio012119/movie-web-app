// Components
import Image from "next/image";

// Types
import type { MovieCardProps } from "@/types/elementsProps";

export default function MovieCard({ movie, small = false }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  return (
    <div className="relative group cursor-pointer p-2">
      <Image
        src={posterUrl}
        alt={movie.title}
        width={small ? 150 : 500}
        height={small ? 225 : 750}
        className="rounded w-full h-auto transition-transform group-hover:scale-105"
      />

      <div className="mt-3">
        <h4 className="text-sm font-semibold truncate group-hover:hidden">
          {movie.title}
        </h4>
        <p className="text-xs text-gray-400 group-hover:hidden">
          {movie.release_date}
        </p>
      </div>

      <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end text-xs rounded">
        <p className="font-semibold text-sm truncate">{movie.title}</p>
        <p>Rating: {movie.vote_average.toFixed(1)}</p>
        <p>Release Date: {movie.release_date?.slice(0, 4)}</p>
        <p>
          Language: <span className="uppercase"></span>
          {movie.original_language}
        </p>
      </div>
    </div>
  );
}
