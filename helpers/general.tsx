import { useState, useEffect } from "react";

export const useVisibleCards = () => {
  const [visibleCards, setVisibleCards] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1280) return setVisibleCards(6);
      if (width >= 769) return setVisibleCards(4);
      setVisibleCards(2);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visibleCards;
};
