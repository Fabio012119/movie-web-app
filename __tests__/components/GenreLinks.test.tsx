import { render, screen } from "@testing-library/react";
import GenreLinks from "@/components/GenreLinks";

jest.mock("@/utils/slugify", () => ({
  slugify: (name: string) => name.toLowerCase().replace(/\s+/g, "-"),
}));

import { useAppContext } from "@/context/AppContext";
import { testIds } from "@/constants";

describe("GenreLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when genresLoading is true", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      genresLoading: true,
      genresError: null,
      genres: [],
    });

    const { container } = render(<GenreLinks />);
    expect(container.firstChild).toBeNull();
  });

  it("renders error message when genresError exists", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      genresLoading: false,
      genresError: "Something went wrong",
      genres: [],
    });

    render(<GenreLinks />);
    expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
  });

  it("renders genre links correctly", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      genresLoading: false,
      genresError: null,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Sci Fi" },
      ],
    });

    render(<GenreLinks />);
    const list = screen.getByTestId(testIds.genreLinks);
    expect(list).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("Action");
    expect(links[0]).toHaveAttribute("href", "/genre/action");
    expect(links[1]).toHaveTextContent("Sci Fi");
    expect(links[1]).toHaveAttribute("href", "/genre/sci-fi");
  });
});
