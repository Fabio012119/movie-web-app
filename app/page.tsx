"use client";
import { useGetMoviesByGenres } from "@/hooks/useGetMoviesByGenres";
import ContentRow from "@/components/ContentRow";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  const { genres, moviesByGenre, loading, error } = useGetMoviesByGenres();

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <section>
      {genres.map((genre, genreIndex) => (
        <ContentRow
          key={genre.id}
          rowIndex={genreIndex + 1}
          title={genre.name}
          movies={moviesByGenre[genre.id] || []}
        />
      ))}
    </section>
  );
}
