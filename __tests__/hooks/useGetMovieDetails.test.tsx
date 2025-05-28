import { renderHook, waitFor } from "@testing-library/react";
import { useGetMovieDetails } from "@/hooks/useGetMovieDetails";
import { fetchMovies } from "@/api/fetchMovies";
import { useAppContext } from "@/context/AppContext";

jest.mock("@/api/fetchMovies");
jest.mock("@/context/AppContext");

const mockedFetchMovies = fetchMovies as jest.MockedFunction<
  typeof fetchMovies
>;
const mockedUseAppContext = useAppContext as jest.Mock;

describe("useGetMovieDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns early if selectedContentId is null", async () => {
    mockedUseAppContext.mockReturnValue({
      selectedContentId: null,
      setSelectedContentId: jest.fn(),
    });

    const { result } = renderHook(() => useGetMovieDetails());

    expect(result.current.movie).toBeNull();
    expect(result.current.cast).toEqual([]);
    expect(result.current.recommendations).toEqual([]);
  });

  it("fetches movie details, cast, and recommendations", async () => {
    mockedUseAppContext.mockReturnValue({
      selectedContentId: "123",
      setSelectedContentId: jest.fn(),
    });

    mockedFetchMovies
      .mockResolvedValueOnce({
        title: "Inception",
        overview: "A mind bending thriller.",
      })
      .mockResolvedValueOnce({
        cast: [{ id: 1, name: "Leonardo Dicaprio" }],
      })
      .mockResolvedValueOnce({
        results: [{ id: 10, title: "Interstellar" }],
      });

    const { result } = renderHook(() => useGetMovieDetails());

    await waitFor(() => expect(result.current.movie).not.toBeNull());

    expect(result.current.movie).toEqual({
      title: "Inception",
      overview: "A mind bending thriller.",
    });

    expect(result.current.cast).toHaveLength(1);
    expect(result.current.cast[0].name).toBe("Leonardo Dicaprio");

    expect(result.current.recommendations).toHaveLength(1);
    expect(result.current.recommendations[0].title).toBe("Interstellar");
  });
});
