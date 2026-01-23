import { useEffect, useState } from "react";
import { SCREEN_SIZES_DEVICE } from "constants/global.constant";

export const useIsMediumDevice = () => {
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMedium(window.innerWidth <= SCREEN_SIZES_DEVICE.MD);
    };

    checkSize(); // initial check
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return { isMediumScreen: isMedium};
};
