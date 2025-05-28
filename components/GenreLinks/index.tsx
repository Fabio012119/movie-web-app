//Components
import Spinner from "../Spinner";
import Link from "next/link";
//Hooks
import { useAppContext } from "@/context/AppContext";
//Utils
import { slugify } from "@/utils/slugify";

export default function GenreLinks() {
  const { genres, genresLoading, genresError } = useAppContext();

  if (genresLoading) return <Spinner />;
  if (genresError) return <p className="text-red-600">Error: {genresError}</p>;

  return (
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
  );
}
