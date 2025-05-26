import { useAppContext } from "@/context/AppContext";
import Spinner from "../Spinner";

export default function GenreLinks() {
  const { genres, genresLoading, genresError } = useAppContext();

  if (genresLoading) return <Spinner />;
  if (genresError) return <p className="text-red-600">Error: {genresError}</p>;

  return (
    <ul className="flex flex-wrap gap-3">
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
}
