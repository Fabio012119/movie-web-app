import { renderHook, waitFor } from "@testing-library/react";
import { useGetGenres } from "@/hooks/useGetGenres";
import { fetchGenres } from "@/api/fetchGenres";
import type { Genre } from "@/types/general";

jest.mock("@/api/fetchGenres");

const mockedFetchGenres = fetchGenres as jest.MockedFunction<
  typeof fetchGenres
>;

describe("useGetGenres", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initially set loading to true", () => {
    mockedFetchGenres.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useGetGenres());
    expect(result.current.genresLoading).toBe(true);
  });

  it("should fetch genres successfully", async () => {
    const fakeGenres: Genre[] = [
      { id: 1, name: "Action" },
      { id: 2, name: "Drama" },
    ];

    mockedFetchGenres.mockResolvedValueOnce(fakeGenres);

    const { result } = renderHook(() => useGetGenres());

    await waitFor(() => expect(result.current.genresLoading).toBe(false));

    expect(result.current.genres).toEqual(fakeGenres);
    expect(result.current.genresError).toBeNull();
  });

  it("should handle fetch error", async () => {
    mockedFetchGenres.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useGetGenres());

    await waitFor(() => expect(result.current.genresLoading).toBe(false));

    expect(result.current.genres).toEqual([]);
    expect(result.current.genresError).toBe("API Error");
  });
});
