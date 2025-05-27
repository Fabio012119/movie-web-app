import { useCallback } from "react";
import type { WatchEntry } from "@/types/general";

const STORAGE_KEY = "watch_history";



export function useWatchHistory() {
  const getHistory = (): WatchEntry[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Failed to read watch history:", error);
      throw new Error("Unable to retrieve watch history.");
    }
  };

  const saveProgress = useCallback((id: string, progress: number) => {
    if (!id) return;
    const current = getHistory().filter((entry) => entry.id !== id);
    const updated: WatchEntry[] = [
      { id, progress, timestamp: Date.now() },
      ...current,
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const getProgress = useCallback((id: string): number => {
    const entry = getHistory().find((e) => e.id === id);
    return entry?.progress ?? 0;
  }, []);

  const removeEntry = useCallback((id: string) => {
    const filtered = getHistory().filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }, []);

  const addEntry = useCallback((id: string) => {
    const history = getHistory();
    const exists = history.some((entry) => entry.id === id);
    if (!exists) {
      history.push({ id, progress: 0, timestamp: Date.now() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }, []);

  const getRecentlyWatched = useCallback((): WatchEntry[] => {
    return getHistory().sort((a, b) => b.timestamp - a.timestamp);
  }, []);

  return {
    saveProgress,
    getProgress,
    addEntry,
    removeEntry,
    getRecentlyWatched,
  };
}
