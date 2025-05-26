"use client";

//Components
import MovieCard from "@/components/MovieCard";

//Types
import type { ContentRowProps } from "@/types/elementsProps";

export default function ContentRow({ title, movies }: ContentRowProps) {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[150px] flex-shrink-0">
            <MovieCard movie={movie} small />
          </div>
        ))}
      </div>
    </section>
  );
}
