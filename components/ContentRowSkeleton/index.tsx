export default function ContentRowSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="flex gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-[300px] bg-[rgba(209,213,219,0.5)] rounded-md"
          />
        ))}
      </div>
    </section>
  );
}
