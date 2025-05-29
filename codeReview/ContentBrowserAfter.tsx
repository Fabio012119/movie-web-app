import { useState, useEffect, useRef } from "react";

export interface ContentItem {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  thumbnail: string;
  duration: number;
  description: string;
  cast: string[];
  watchProgress: number;
}

type ApiResponse = {
  content: ContentItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    totalItems: number;
  };
  categories: {
    trending: ContentItem[];
    forYou: ContentItem[];
  };
};

const fetchContent = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(`/api/content?page=${page}`);
  return response.json();
};

const ContentBrowser: React.FC = () => {
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // 1. Cache of fetched pages to avoid refetching
  const fetchedPages = useRef<Set<number>>(new Set());

  // 2. Create separate function for fetching the data, which late can be moved to a util file
  const loadTrending = async (page: number) => {
    if (fetchedPages.current.has(page)) return;

    setLoading(true);
    try {
      const data = await fetchContent(page);
      setTrendingContent(data.categories.trending);
      setError("");
      fetchedPages.current.add(page);
    } catch (err) {
      setError("Failed to load content");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrending(page);
  }, [page]);

  return (
    <div>
      {loading && <div>Loading content...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="content-section" aria-labelledby="trending-heading">
        <h2 id="trending-heading">Trending Now</h2>
        <div
          className="content-grid"
          style={{
            display: "flex",
            overflowX: "scroll",
            gap: "16px",
            padding: "20px 0",
          }}
        >
          {trendingContent.map((item) => (
            <div
              key={item.id}
              className="content-item"
              style={{
                minWidth: "200px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                backgroundColor: "#f9f9f9",
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${item.title}`}
            >
              {/* 3. add some fallback values in case some data do not exist
               */}
              <img
                src={item.thumbnail || "/placeholder.png"}
                alt={item.title || "Trending item thumbnail"}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />
              <h3>{item.title || "Untitled"}</h3>
              <p>
                {item.year || "Unknown year"} • {item.rating ?? "N/A"}/10
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ marginRight: "10px", padding: "8px 16px" }}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          style={{ marginLeft: "10px", padding: "8px 16px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContentBrowser;
