//Components
import ContentRow from "@/components/ContentRow";
import { notFound } from "next/navigation";
//Utils
import { fetchGenres } from "@/api/fetchGenres";
import { fetchMoviesByGenre } from "@/api/fetchMoviesByGenre";
import { deSlugify } from "@/utils/slugify";

export default async function GenrePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const genres = await fetchGenres();
  const genre = genres.find(
    (g) => g.name.toLowerCase() === deSlugify(slug).toLowerCase()
  );

  if (!genre) notFound();

  const movies = await fetchMoviesByGenre(genre.id);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{genre.name} Movies</h2>
      <ContentRow title={genre.name} movies={movies} rowIndex={1} />
    </section>
  );
}
