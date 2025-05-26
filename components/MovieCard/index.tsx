import Image from "next/image";
import { TmdbMovie } from "@/types/general";

type Props = {
  movie: TmdbMovie;
  small?: boolean;
};

export default function MovieCard({ movie, small = false }: Props) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  return (
    <div className="group cursor-pointer">
      <Image
        src={posterUrl}
        alt={movie.title}
        width={small ? 150 : 500}
        height={small ? 225 : 750}
        className="rounded w-full h-auto transition-transform group-hover:scale-105"
      />
      <div className="mt-3">
        <h4 className="text-sm font-semibold truncate">{movie.title}</h4>
        <p className="text-xs text-gray-400">{movie.release_date}</p>
      </div>
    </div>
  );
}
