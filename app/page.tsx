"use client";

import { useGetMoviesByGenres } from "@/hooks/useGetMoviesByGenres";
import ContentRow from "@/components/ContentRow";
import ContentRowSkeleton from "@/components/ContentRowSkeleton";

export default function HomePage() {
  const { genres, moviesByGenre, loading, error } = useGetMoviesByGenres();

  const allMovies = Object.values(moviesByGenre).flat();
  const uniqueMovies = Array.from(
    new Map(allMovies.map((m) => [m.id, m])).values()
  );

  const topByVote = uniqueMovies
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);

  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <ContentRowSkeleton key={index} />
        ))}
      </>
    );
  }

  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <section>
      <ContentRow
        key="most-popular"
        title="Most popular"
        movies={topByVote}
        rowIndex={1}
      />
      {genres.map((genre, genreIndex) => (
        <ContentRow
          key={genre.id}
          rowIndex={genreIndex + 2}
          title={genre.name}
          movies={moviesByGenre[genre.id] || []}
        />
      ))}
    </section>
  );
}
