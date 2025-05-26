import { TMDB_BASE_URL } from "@/constants";

export async function fetchMovies<T>(
  endpoint: string,
  query: Record<string, string | number> = {}
): Promise<T> {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    language: "en-US",
    ...Object.fromEntries(
      Object.entries(query).map(([k, v]) => [k, String(v)])
    ),
  });

  const res = await fetch(`${TMDB_BASE_URL}/${endpoint}?${params}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmE3NTA4MTA3NTkxYTllMDhjNDJjYzQ1ZTBiMWMwZSIsIm5iZiI6MTY0Njc3MTQ2OS4yNDYsInN1YiI6IjYyMjdiZDBkMTEzMGJkMDA2N2MzYzA4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3hlVKMa4vy-ASLSurfzpNyMe0FwjyNCHAVBQ5x3VBa0",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch from TMDb");

  return res.json();
}
