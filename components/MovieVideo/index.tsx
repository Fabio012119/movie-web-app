"use client";
import { useEffect, useRef } from "react";
import { useWatchHistory } from "@/hooks/useWatchHistory";

export default function MovieVideo({ movieId }: { movieId: string }) {
    console.log(movieId)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { saveProgress, getProgress } = useWatchHistory();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = getProgress(movieId);

    const handleBeforeUnload = () => {
      saveProgress(movieId, Math.floor(video.currentTime));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [movieId, saveProgress, getProgress]);

  return (
    <video
      ref={videoRef}
      onClick={()=>{

      }}
      src="/mock_movie.mp4"
      controls
      className="w-full h-[20rem] rounded object-cover"
    />
  );
}
