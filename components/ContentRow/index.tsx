"use client";
//Hooks
import { useRef } from "react";
//Components
import { Swiper, SwiperSlide } from "swiper/react";
import { lazy } from "react";
const MovieCard = lazy(() => import("@/components/MovieCard"));
//Utils
import { pauseAutoplay } from "@/utils/pauseAutoPlay";
import { Navigation, Autoplay } from "swiper/modules";
//Helpers
import {
  handleNavigation,
  renderProgressBar,
  renderRemoveButton,
} from "@/helpers/ContentRow";
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
  const autoplaySpeed = 2000 * rowIndex;
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mb-12 relative">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onNavigationNext={(swiper) =>
          handleNavigation(swiper, "next", autoplaySpeed)
        }
        onNavigationPrev={(swiper) =>
          handleNavigation(swiper, "prev", autoplaySpeed)
        }
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: !isEven,
        }}
        speed={autoplaySpeed}
        breakpoints={slidesPerView}
        spaceBetween={10}
        allowTouchMove
      >
        {movies.map((movie) => {
          const isRemoving = removingId === `${movie.id}`;
          const itemClasses = showProgressBar
            ? `relative transition-opacity duration-300 ${
                isRemoving ? "opacity-0" : "opacity-100"
              }`
            : "";

          return (
            <SwiperSlide
              key={movie.id}
              onMouseEnter={() => pauseAutoplay(swiperRef.current)}
              onTouchStart={() => pauseAutoplay(swiperRef.current)}
            >
              <div className={itemClasses}>
                <MovieCard movie={movie} />
                {showProgressBar &&
                  renderProgressBar(movie.progress, movie.runtime)}
                {onRemove && renderRemoveButton(onRemove, `${movie.id}`)}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
