"use client";

//Components
import Link from "next/link";

//Utils
import { useAppContext } from "@/context/AppContext";
import { slugify } from "@/utils/slugify";

export default function Footer() {
  const { genres, genresLoading, genresError } = useAppContext();

  return (
    <footer className="bg-gray-900 text-white py-6 mt-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <h4 className="text-lg font-semibold mb-4">Browse by Genre</h4>

        {genresLoading && (
          <p className="text-sm text-gray-400">Loading genres...</p>
        )}
        {genresError && (
          <p className="text-sm text-red-500">Error: {genresError}</p>
        )}

        <ul className="flex flex-wrap gap-4 text-sm">
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link
                href={`/genre/${slugify(genre.name)}`}
                className="hover:underline text-gray-300 hover:text-white transition"
              >
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Zenith Flix
        </p>
      </div>
    </footer>
  );
}
