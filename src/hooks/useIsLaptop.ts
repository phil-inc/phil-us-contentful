import { useMemo } from "react";
import { useViewportSize } from "@mantine/hooks";

import { SCREEN_SIZES } from "constants/global.constant";

export const useIsLaptop = () => {
  const { width } = useViewportSize();

  const isLaptop = useMemo(() => width >= SCREEN_SIZES.SMALL_DESKTOP, [width]);

  return isLaptop;
};
