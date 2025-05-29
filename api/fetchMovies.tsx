import { TMDB_BASE_URL } from "@/constants";

export async function fetchMovies<T>(
  endpoint: string,
  query: Record<string, string | number> = {}
): Promise<T> {
  const params = new URLSearchParams({
    language: "en-US",
    ...Object.fromEntries(
      Object.entries(query).map(([k, v]) => [k, String(v)])
    ),
  });

  const res = await fetch(`${TMDB_BASE_URL}/${endpoint}?${params}`, {
    headers: {
      Authorization: `Bearer ADD_TOKEN_HERE`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch from TMDb");

  return res.json();
}
