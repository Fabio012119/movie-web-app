import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";
import { mockMovieWIthAllValues } from "@/mocks/movies";

jest.mock("@/assets/no-poster.png", () => "no-poster.png");

import { useAppContext } from "@/context/AppContext";

const mockSetSelectedContentId = jest.fn();

describe("MovieCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      setSelectedContentId: mockSetSelectedContentId,
    });
  });

  it("renders the movie poster with correct URL", () => {
    render(<MovieCard movie={mockMovieWIthAllValues} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${mockMovieWIthAllValues.poster_path}`,
    );
    expect(img).toHaveAttribute("alt", mockMovieWIthAllValues.title);
  });

  it("renders fallback image if poster_path is null", () => {
    const movieWithoutPoster = { ...mockMovieWIthAllValues, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("no-poster"));
  });

  it("calls setSelectedContentId on click", () => {
    render(<MovieCard movie={mockMovieWIthAllValues} />);
    fireEvent.click(screen.getByRole("img"));
    expect(mockSetSelectedContentId).toHaveBeenCalledWith(
      String(mockMovieWIthAllValues.id),
    );
  });

  it("renders title and release date when not small", () => {
    render(<MovieCard movie={mockMovieWIthAllValues} />);
    const titleElements = screen.getAllByText(mockMovieWIthAllValues.title);
    expect(titleElements.length).toBeGreaterThanOrEqual(2);
  });

  it("does not render detailed overlay or title when small is true", () => {
    render(<MovieCard movie={mockMovieWIthAllValues} small />);
    expect(
      screen.queryByText(mockMovieWIthAllValues.title),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Rating:/)).not.toBeInTheDocument();
  });

  it("renders hover overlay with movie info when not small", () => {
    render(<MovieCard movie={mockMovieWIthAllValues} />);
    expect(
      screen.getByText(
        `Rating: ${mockMovieWIthAllValues.vote_average.toFixed(1)}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(`Release Date: 2010`)).toBeInTheDocument();
    expect(screen.getByText(/Language:/)).toHaveTextContent("en");
  });
});
