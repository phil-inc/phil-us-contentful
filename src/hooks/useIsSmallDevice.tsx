import { useMemo } from "react";
import { useViewportSize } from "@mantine/hooks";

import { SCREEN_SIZES } from "constants/global.constant";

export const useIsSmallDevice = () => {
  const { width } = useViewportSize();

  const isSmall = useMemo(() => width <= SCREEN_SIZES.TABLET, [width]);

  return isSmall;
};
