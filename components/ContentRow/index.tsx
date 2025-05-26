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

  const handleMouseEnter = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
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
        speed={4000 * rowIndex}
        slidesPerView={6}
        spaceBetween={20}
        allowTouchMove={false}
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <MovieCard movie={movie} small />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
