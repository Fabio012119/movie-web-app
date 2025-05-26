"use client";

import { useGetMovies } from "@/hooks/useGetMovies";
import Movies from "@/components/Movies";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  const { movies, loading, error } = useGetMovies();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>

      {loading && <Spinner />}

      {!loading && error && (
        <p className="text-red-600 font-medium">Error: {error}</p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="text-gray-500">No movies found.</p>
      )}

      {!loading && !error && movies.length > 0 && <Movies movies={movies} />}
    </section>
  );
}
