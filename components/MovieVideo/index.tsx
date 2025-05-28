"use client";
//Hooks
import { useEffect, useRef } from "react";
import { useWatchHistory } from "@/hooks/useWatchHistory";
//Helpers
import { setupVideoProgress, handlePlayProgress } from "@/helpers/MovieVideo";
//Types
import type { MovieVideoProps } from "@/types/elementsProps";

export default function MovieVideo({ movieId }: MovieVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { saveProgress, getProgress } = useWatchHistory();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cleanup = setupVideoProgress(
      video,
      movieId,
      getProgress,
      saveProgress
    );

    return cleanup;
  }, [movieId, saveProgress, getProgress]);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      handlePlayProgress(video, movieId, saveProgress);
    }
  };

  return (
    <video
      ref={videoRef}
      src="/mock_movie.mp4"
      controls
      className="w-full h-[20rem] rounded object-cover"
      onPlay={handlePlay}
    />
  );
}
