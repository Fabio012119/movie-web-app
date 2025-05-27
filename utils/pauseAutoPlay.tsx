import type { Swiper as SwiperType } from "swiper";

let autoplayTimeout: NodeJS.Timeout | null = null;

export function pauseAutoplay(swiper: SwiperType | null, delay = 5000) {
  if (!swiper?.autoplay) return;

  swiper.autoplay.stop();

  if (autoplayTimeout) {
    clearTimeout(autoplayTimeout);
  }

  autoplayTimeout = setTimeout(() => {
    swiper.autoplay?.start();
  }, delay);
}
