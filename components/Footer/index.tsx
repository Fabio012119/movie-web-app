"use client";
//Components
import GenreLinks from "../GenreLinks";
//Utils
import { useAppContext } from "@/context/AppContext";

export default function Footer() {
  const { genresLoading, genresError } = useAppContext();

  return (
    <footer
      className="bg-gray-900 text-white py-6 mt-16"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <h4 className="text-lg font-semibold mb-4">Browse by Genre</h4>

        {genresLoading && (
          <p className="text-sm text-gray-400">Loading genres...</p>
        )}
        {genresError && (
          <p className="text-sm text-red-500">Error: {genresError}</p>
        )}

        <GenreLinks />

        <p className="text-xs text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Zenith Flix
        </p>
      </div>
    </footer>
  );
}
