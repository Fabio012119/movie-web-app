import { renderHook, waitFor } from "@testing-library/react";
import { useGetMoviesByGenres } from "@/hooks/useGetMoviesByGenres";
import { fetchGenres } from "@/api/fetchGenres";
import { fetchMoviesByGenre } from "@/api/fetchMoviesByGenre";
import { comedyMovies, actionMovies } from "@/mocks/movies";

import type { Genre } from "@/types/general";

jest.mock("@/api/fetchGenres");
jest.mock("@/api/fetchMoviesByGenre");

const mockedFetchGenres = fetchGenres as jest.MockedFunction<
  typeof fetchGenres
>;
const mockedFetchMoviesByGenre = fetchMoviesByGenre as jest.MockedFunction<
  typeof fetchMoviesByGenre
>;

describe("useGetMoviesByGenres", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initially sets loading to true", () => {
    const { result } = renderHook(() => useGetMoviesByGenres());
    expect(result.current.loading).toBe(true);
  });

  it("fetches genres and movies by genre successfully", async () => {
    const genres: Genre[] = [
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
    ];

    mockedFetchGenres.mockResolvedValueOnce(genres);
    mockedFetchMoviesByGenre
      .mockResolvedValueOnce(actionMovies)
      .mockResolvedValueOnce(comedyMovies);

    const { result } = renderHook(() => useGetMoviesByGenres());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.genres).toEqual(genres);
    expect(result.current.moviesByGenre).toEqual({
      1: actionMovies,
      2: comedyMovies,
    });
    expect(result.current.error).toBeNull();
  });

  it("handles error when fetching fails", async () => {
    mockedFetchGenres.mockRejectedValueOnce(new Error("Failed to load genres"));

    const { result } = renderHook(() => useGetMoviesByGenres());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to load genres");
    expect(result.current.genres).toEqual([]);
    expect(result.current.moviesByGenre).toEqual({});
  });
});
