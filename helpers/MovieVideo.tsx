export const setupVideoProgress = (
  video: HTMLVideoElement,
  movieId: string,
  getProgress: (id: string) => number,
  saveProgress: (id: string, progress: number) => void,
) => {
  video.currentTime = getProgress(movieId);

  const interval = setInterval(() => {
    if (!video.paused) {
      saveProgress(movieId, Math.floor(video.currentTime));
    }
  }, 5000);

  const cleanup = () => {
    saveProgress(movieId, Math.floor(video.currentTime));
    clearInterval(interval);
  };

  return cleanup;
};

export const handlePlayProgress = (
  video: HTMLVideoElement,
  movieId: string,
  saveProgress: (id: string, progress: number) => void,
) => {
  saveProgress(movieId, Math.floor(video.currentTime));
};
