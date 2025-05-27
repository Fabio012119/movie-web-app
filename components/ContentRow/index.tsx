"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/bundle";

import MovieCard from "@/components/MovieCard";
import type { Swiper as SwiperType } from "swiper";
import type { ContentRowProps } from "@/types/elementsProps";

export default function ContentRow({
  title,
  movies,
  rowIndex,
}: ContentRowProps) {
  const isEven = rowIndex % 2 === 0;
  const swiperRef = useRef<SwiperType | null>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pauseAutoplay = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }

    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    autoplayTimeoutRef.current = setTimeout(() => {
      if (swiperRef.current?.autoplay) {
        swiperRef.current.autoplay.start();
      }
    }, 5000);
  };

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
            onMouseEnter={pauseAutoplay}
            onTouchStart={pauseAutoplay}
          >
            <MovieCard movie={movie} small />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
