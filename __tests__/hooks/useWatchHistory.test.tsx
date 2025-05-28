import { act, renderHook } from "@testing-library/react";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import type { WatchEntry } from "@/types/general";

const STORAGE_KEY = "watch_history";

const setStorage = (entries: WatchEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const getStorage = (): WatchEntry[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

describe("useWatchHistory", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers().setSystemTime(new Date("2024-01-01T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns 0 progress if no entry exists", () => {
    const { result } = renderHook(() => useWatchHistory());
    expect(result.current.getProgress("not-found")).toBe(0);
  });

  it("saves and retrieves progress correctly", () => {
    const { result } = renderHook(() => useWatchHistory());

    act(() => {
      result.current.saveProgress("42", 75);
    });

    expect(result.current.getProgress("42")).toBe(75);

    const stored = getStorage();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({ id: "42", progress: 75 });
  });

  it("removes an entry", () => {
    setStorage([{ id: "123", progress: 30, timestamp: Date.now() }]);

    const { result } = renderHook(() => useWatchHistory());

    act(() => {
      result.current.removeEntry("123");
    });

    expect(getStorage()).toHaveLength(0);
  });

  it("adds a new entry only if it doesn't already exist", () => {
    const { result } = renderHook(() => useWatchHistory());

    act(() => {
      result.current.addEntry("55");
    });

    expect(getStorage()).toHaveLength(1);
    expect(getStorage()[0].id).toBe("55");

    act(() => {
      result.current.addEntry("55");
    });

    expect(getStorage()).toHaveLength(1);
  });

  it("returns entries sorted by timestamp (most recent first)", () => {
    const now = Date.now();

    setStorage([
      { id: "a", progress: 10, timestamp: now - 1000 },
      { id: "b", progress: 20, timestamp: now },
    ]);

    const { result } = renderHook(() => useWatchHistory());
    const sorted = result.current.getRecentlyWatched();

    expect(sorted[0].id).toBe("b");
    expect(sorted[1].id).toBe("a");
  });
});
