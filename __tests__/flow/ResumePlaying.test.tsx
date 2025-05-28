import { render, screen, fireEvent, act } from "@testing-library/react";
import type { ReactNode, FC } from "react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { createMockRouter } from "@/mocks/testUtils";
import RecentlyWatched from "@/app/resume-playing/page";
import { mockMovieWIthAllValues } from "@/mocks/movies";
import type { TmdbMovie } from "@/types/general";

jest.mock("swiper/modules", () => ({
  Autoplay: {},
  Navigation: {},
}));

jest.mock("swiper/css/bundle", () => {});

jest.mock("@/context/AppContext", () => ({
  useAppContext: () => ({ setSelectedContentId: jest.fn() }),
}));

jest.mock("@/components/MovieCard", () => {
  const MockMovieCard: FC<{ movie: TmdbMovie }> = ({ movie }) => (
    <div data-testid="movie-card">{movie.title}</div>
  );
  MockMovieCard.displayName = "MockMovieCard";
  return MockMovieCard;
});

jest.mock("swiper/react", () => {
  const Swiper: FC<{ children: ReactNode }> = ({ children }) => (
    <div data-testid="swiper">{children}</div>
  );
  const SwiperSlide: FC<{ children: ReactNode }> = ({ children }) => (
    <div>{children}</div>
  );
  return { Swiper, SwiperSlide };
});

jest.mock("@/helpers/ContentRow", () => {
  return {
    handleNavigation: jest.fn(),

    renderProgressBar: jest.fn(() => (
      <div data-testid="progress-bar">Progress</div>
    )),

    renderRemoveButton: jest.fn(
      (onRemove: (id: string) => void, id: string) => (
        <button onClick={() => onRemove(id)} data-testid={`remove-${id}`}>
          ✕
        </button>
      ),
    ),
  };
});

jest.mock("@/helpers/recentlyWatched", () => ({
  loadWatchedMovies: jest.fn(),
}));

import { loadWatchedMovies } from "@/helpers/recentlyWatched";

describe("Resume Playing Flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("simulates user flow from app start to movie removal", async () => {
    let callCount = 0;

    (loadWatchedMovies as jest.Mock).mockImplementation(() =>
      callCount++ === 0
        ? Promise.resolve([mockMovieWIthAllValues])
        : Promise.resolve([]),
    );

    const router = createMockRouter({ pathname: "/resume-playing" });

    await act(async () => {
      render(
        <RouterContext.Provider value={router}>
          <RecentlyWatched />
        </RouterContext.Provider>,
      );
    });

    // 1. page loads
    expect(screen.getByText("Continue Watching")).toBeInTheDocument();
    expect(screen.getByTestId("movie-card")).toHaveTextContent("Inception");

    // 2. Click remove
    fireEvent.click(screen.getByTestId("remove-42"));

    // 3wait for timeout
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    // 4. Expect it gone
    expect(screen.queryByTestId("movie-card")).not.toBeInTheDocument();
    expect(screen.getByText("Go and watch some movies")).toBeInTheDocument();
  });
});
