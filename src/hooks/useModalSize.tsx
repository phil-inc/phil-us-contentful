import { useMemo  } from "react";
import { useViewportSize } from "@mantine/hooks";
import { SCREEN_SIZES } from "constants/global.constant";

export const useModalSize = () => {
  const { width } = useViewportSize();

    const wideModalSize = useMemo(() => {
      if (width <= SCREEN_SIZES.MOBILE) {
        return "auto";
      } else if (width <= SCREEN_SIZES.DESKTOP) {
        return "80%";
      } else if (width <= SCREEN_SIZES.LARGE_DESKTOP) {
        return "70%";
      } else {
        return "auto";
      }
    }, [width]);

  const normalModalSize = useMemo(() => {
    if (width <= SCREEN_SIZES.MOBILE) return "sm";
    if (width <= SCREEN_SIZES.DESKTOP) return "md";
    if (width <= SCREEN_SIZES.LARGE_DESKTOP) return "md";
    return "md";
  }, [width]);

  return { wideModalSize,normalModalSize };
};
