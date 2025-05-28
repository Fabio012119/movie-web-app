//Components
import Link from "next/link";
//Hooks
import { useAppContext } from "@/context/AppContext";
//Utils
import { slugify } from "@/utils/slugify";
//Constants
import { testIds } from "@/constants";

export default function GenreLinks() {
  const { genres, genresLoading, genresError } = useAppContext();

  if (genresLoading) return null;
  if (genresError) return <p className="text-red-600">Error: {genresError}</p>;

  return (
    <ul
      className="flex flex-wrap gap-4 text-sm"
      data-testid={testIds.genreLinks}
    >
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
  );
}
