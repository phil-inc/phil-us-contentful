import { useEffect, useState } from "react";
import { SCREEN_SIZES_DEVICE } from "constants/global.constant";

export const useIsSmallDevice = () => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsSmall(window.innerWidth <= SCREEN_SIZES_DEVICE.SM);
    };

    checkSize(); // initial check
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isSmall;
};
