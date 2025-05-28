//Hooks
import { useVisibleCards } from "@/helpers/general";
//Utils
import { twMerge } from "tailwind-merge";

export default function ContentRowSkeleton() {
  const visibleCards = useVisibleCards();

  if (visibleCards === null) return null;
  return (
    <section className="mb-12 animate-pulse">
      <div className="flex gap-4 justify-around">
        {visibleCards !== 0 &&
          Array.from({ length: visibleCards }).map((_, idx) => (
            <div
              key={idx}
              className={twMerge(
                "w-[150px] sm:w-[180px] md:w-[200px]",
                "lg:w-[220px] h-[300px] bg-[rgba(209,213,219,0.5)] rounded-md",
              )}
            />
          ))}
      </div>
    </section>
  );
}
