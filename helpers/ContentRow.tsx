import type { Swiper as SwiperType } from "swiper";

export const handleNavigation = (
  swiper: SwiperType,
  direction: "next" | "prev",
  autoplaySpeed: number,
  immediateSpeed: number = 300,
): void => {
  swiper.params.speed = immediateSpeed;

  if (direction === "next") {
    swiper.slideNext();
  } else {
    swiper.slidePrev();
  }

  swiper.params.speed = autoplaySpeed;
};

export const renderProgressBar = (progress: number, runtime: number) => {
  const width = runtime ? `${(progress / runtime) * 100}%` : "0%";

  return (
    <div className="h-1 bg-gray-300 mt-1 rounded overflow-hidden">
      <div className="h-full bg-blue-600 transition-all" style={{ width }} />
    </div>
  );
};

export const renderRemoveButton = (
  onRemove: (id: string) => void,
  id: string,
) => (
  <button
    onClick={() => onRemove(id)}
    className="absolute top-0 right-0 text-xs bg-black bg-opacity-60 text-white px-1 py-0.5 rounded-bl cursor-pointer"
  >
    ✕
  </button>
);
