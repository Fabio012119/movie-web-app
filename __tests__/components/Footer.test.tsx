import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { testIds } from "@/constants";

jest.mock("@/components/GenreLinks", () => {
  const MockGenreLinks = () => (
    <div data-testid={testIds.genreLinks}>Genre Links</div>
  );
  MockGenreLinks.displayName = "MockGenreLinks";
  return MockGenreLinks;
});

import { useAppContext } from "@/context/AppContext";

describe("Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading message if genres are loading", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      genresLoading: true,
      genresError: null,
    });

    render(<Footer />);
    expect(screen.getByText("Loading genres...")).toBeInTheDocument();
  });

  it("renders error message if genresError exists", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      genresLoading: false,
      genresError: "Failed to load genres",
    });

    render(<Footer />);
    expect(
      screen.getByText("Error: Failed to load genres"),
    ).toBeInTheDocument();
  });

  it("renders GenreLinks always", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      genresLoading: false,
      genresError: null,
    });

    render(<Footer />);
    expect(screen.getByTestId("genre-links")).toBeInTheDocument();
  });

  it("renders the current year", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      genresLoading: false,
      genresError: null,
    });

    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Zenith Flix`),
    ).toBeInTheDocument();
  });
});
