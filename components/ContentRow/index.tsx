"use client";

//Hooks
import { useRef } from "react";

//Components
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "@/components/MovieCard";

//Utils
import { pauseAutoplay } from "@/utils/pauseAutoPlay";
import { Navigation, Autoplay } from "swiper/modules";

//Assets
import "swiper/css/bundle";

//Consts
import { slidesPerView } from "@/constants";

//Types
import type { Swiper as SwiperType } from "swiper";
import type { ContentRowProps } from "@/types/elementsProps";

export default function ContentRow({
  title,
  movies,
  rowIndex,
  showProgressBar = false,
  onRemove,
  removingId,
}: ContentRowProps) {
  const isEven = rowIndex % 2 === 0;
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mb-12 relative">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: !isEven,
        }}
        speed={2000 * rowIndex}
        breakpoints={slidesPerView}
        spaceBetween={10}
        allowTouchMove={true}
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            onMouseEnter={() => pauseAutoplay(swiperRef.current)}
            onTouchStart={() => pauseAutoplay(swiperRef.current)}
          >
            <div
              className={
                showProgressBar
                  ? `relative transition-opacity duration-300 ${
                      removingId === `${movie.id}` ? "opacity-0" : "opacity-100"
                    }`
                  : ""
              }
            >
              <MovieCard movie={movie} />
              {showProgressBar && (
                <div className="h-1 bg-gray-300 mt-1 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{
                      width: movie.runtime
                        ? `${(movie.progress / movie.runtime) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              )}
              {onRemove && (
                <button
                  onClick={() => onRemove(`${movie.id}`)}
                  className="absolute top-0 right-0 text-xs bg-black bg-opacity-60 text-white px-1 py-0.5 rounded-bl cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
