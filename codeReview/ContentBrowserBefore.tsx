import { useState, useEffect } from "react";

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

  // 1. This useEffect will run every time the page constant changes even if
  //fetching fails or it's staled or its identical.This practice is not good for performance
  //The best solution would be keep track of the fetchedPages to avoid refetching pages that are already loaded

  useEffect(() => {
    setLoading(true);

    // 2. There is to much logic here, it would be good if we separate the concerns.
    // also it lacks error boundaries. It can be structured a bit better
    fetchContent(page)
      .then((data) => {
        setTrendingContent(data.categories.trending);
        setError("");
      })
      .catch((err) => {
        setError("Failed to load content");
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      {loading && <div>Loading content...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="content-section">
        <h2>Trending Now</h2>
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
            >
              {/* 3. The issue here is that item.thumbnail, item.title, item.year, item.rating will only work if the data exist.
                It would be good we we had some fallback values for those
               */}
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />
              <h3>{item.title}</h3>
              <p>
                {item.year} • {item.rating}/10
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
