import { TmdbMovie } from "@/types/general";
import MovieCard from "../MovieCard";

type MoviesProps = {
  movies: TmdbMovie[];
};

export default function Movies({ movies }: MoviesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
