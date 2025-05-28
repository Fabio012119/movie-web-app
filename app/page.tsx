"use client";

import { lazy, Suspense } from "react";

// Lazy Components
const ContentRow = lazy(() => import("@/components/ContentRow"));
const ContentRowSkeleton = lazy(
  () => import("@/components/ContentRowSkeleton")
);
const Spinner = lazy(() => import("@/components/Spinner"));
// Hook
import { useGetMoviesByGenres } from "@/hooks/useGetMoviesByGenres";

export default function HomePage() {
  const { genres, moviesByGenre, loading, error } = useGetMoviesByGenres();

  const allMovies = Object.values(moviesByGenre).flat();
  const uniqueMovies = Array.from(
    new Map(allMovies.map((m) => [m.id, m])).values()
  );

  const topByVote = uniqueMovies
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);

  if (loading) return <Spinner />;

  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <>
      <Suspense fallback={<ContentRowSkeleton />}>
        <ContentRow
          key="most-popular"
          title="Most popular"
          movies={topByVote}
          rowIndex={1}
        />
      </Suspense>

      {genres.map((genre, genreIndex) => (
        <Suspense key={genre.id} fallback={<ContentRowSkeleton />}>
          <ContentRow
            rowIndex={genreIndex + 2}
            title={genre.name}
            movies={moviesByGenre[genre.id] || []}
          />
        </Suspense>
      ))}
    </>
  );
}
