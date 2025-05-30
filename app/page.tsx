"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
// Hook
import { useGetMoviesByGenres } from "@/hooks/useGetMoviesByGenres";
//Helpers
import { topByVote, uniqueMovies } from "@/helpers/HomePage";
//Components
const ContentRow = dynamic(() => import("@/components/ContentRow"));
const ContentRowSkeleton = dynamic(
  () => import("@/components/ContentRowSkeleton")
);
const Spinner = dynamic(() => import("@/components/Spinner"));

export default function HomePage() {
  const { genres, moviesByGenre, loading, error } = useGetMoviesByGenres();

  const allMovies = Object.values(moviesByGenre).flat();

  const movies = uniqueMovies(allMovies);

  const topMovies = topByVote(movies);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <>
      <Suspense fallback={<ContentRowSkeleton />}>
        <ContentRow
          key="most-popular"
          title="Most popular"
          movies={topMovies}
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
