import { render, screen, fireEvent } from "@testing-library/react";
import MovieVideo from "@/components/MovieVideo";

jest.mock("@/hooks/useWatchHistory", () => ({
  useWatchHistory: jest.fn(),
}));

jest.mock("@/helpers/MovieVideo", () => ({
  setupVideoProgress: jest.fn(() => jest.fn()),
  handlePlayProgress: jest.fn(),
}));

import { useWatchHistory } from "@/hooks/useWatchHistory";
import { setupVideoProgress, handlePlayProgress } from "@/helpers/MovieVideo";
import { testIds } from "@/constants";

describe("MovieVideo", () => {
  const saveProgress = jest.fn();
  const getProgress = jest.fn();
  const mockMovieId = "42";

  beforeEach(() => {
    jest.clearAllMocks();
    (useWatchHistory as jest.Mock).mockReturnValue({
      saveProgress,
      getProgress,
    });
  });

  it("renders the video element", () => {
    render(<MovieVideo movieId={mockMovieId} />);
    const video = screen.getByTestId(testIds.movieVideo);
    expect(video).toHaveAttribute("src", "/mock_movie.mp4");
  });

  it("calls setupVideoProgress on mount", () => {
    render(<MovieVideo movieId={mockMovieId} />);
    expect(setupVideoProgress).toHaveBeenCalledTimes(1);
    expect(setupVideoProgress).toHaveBeenCalledWith(
      expect.any(HTMLVideoElement),
      mockMovieId,
      getProgress,
      saveProgress
    );
  });

  it("calls handlePlayProgress when video is played", () => {
    render(<MovieVideo movieId={mockMovieId} />);
    const video = screen.getByTestId(testIds.movieVideo);
    fireEvent.play(video);
    expect(handlePlayProgress).toHaveBeenCalledWith(
      expect.any(HTMLVideoElement),
      mockMovieId,
      saveProgress
    );
  });
});
