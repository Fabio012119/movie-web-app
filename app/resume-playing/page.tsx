"use client";
//Component
import ContentRow from "@/components/ContentRow";
//Hooks
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { useEffect, useState } from "react";
//Helpers
import { loadWatchedMovies } from "@/helpers/recentlyWatched";
//Types
import type { MovieWithProgress } from "@/types/general";

export default function RecentlyWatched() {
  const { getRecentlyWatched, removeEntry } = useWatchHistory();
  const [movies, setMovies] = useState<MovieWithProgress[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const areThereMovies = movies.length === 0;

  useEffect(() => {
    loadWatchedMovies(getRecentlyWatched).then(setMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = (id: string) => {
    setRemovingId(id);

    setTimeout(() => {
      removeEntry(id);
      setRemovingId(null);
      loadWatchedMovies(getRecentlyWatched).then(setMovies);
    }, 500);
  };

  return (
    <>
      <ContentRow
        title="Continue Watching"
        movies={movies}
        rowIndex={2}
        showProgressBar={true}
        onRemove={handleRemove}
        removingId={removingId}
      />
      {areThereMovies && (
        <p className="text-green-400">Go and watch some movies</p>
      )}
    </>
  );
}
