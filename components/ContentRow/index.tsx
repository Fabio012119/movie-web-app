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

//Types
import type { Swiper as SwiperType } from "swiper";
import type { ContentRowProps } from "@/types/elementsProps";

export default function ContentRow({
  title,
  movies,
  rowIndex,
}: ContentRowProps) {
  const isEven = rowIndex % 2 === 0;
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mb-12 relative">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: !isEven,
        }}
        speed={2000 * rowIndex}
        slidesPerView={6}
        spaceBetween={10}
        allowTouchMove={true}
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            onMouseEnter={() => pauseAutoplay(swiperRef.current)}
            onTouchStart={() => pauseAutoplay(swiperRef.current)}
          >
            <MovieCard movie={movie} small />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
