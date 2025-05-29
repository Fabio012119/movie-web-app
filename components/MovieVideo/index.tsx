"use client";
//hooks
import { useEffect, useRef, memo } from "react";
import { useWatchHistory } from "@/hooks/useWatchHistory";
//Helpers
import { setupVideoProgress, handlePlayProgress } from "@/helpers/MovieVideo";
//Consts
import { testIds } from "@/constants";
//Types
import type { MovieVideoProps } from "@/types/elementsProps";

function MovieVideoComponent({ movieId }: MovieVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { saveProgress, getProgress } = useWatchHistory();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cleanup = setupVideoProgress(
      video,
      movieId,
      getProgress,
      saveProgress,
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
      data-testid={testIds.movieVideo}
      src="/mock_movie.mp4"
      controls
      className="w-full h-[20rem] rounded object-cover"
      onPlay={handlePlay}
    />
  );
}

const MovieVideo = memo(MovieVideoComponent);
export default MovieVideo;
