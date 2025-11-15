import { useEffect, useMemo, useState, useCallback } from "react";
import { useViewportSize } from "@mantine/hooks";
import { SCREEN_SIZES, TRUE_STRING } from "constants/global.constant";

export const useSessionModal = (
  sessionKey: string,
  options?: { autoOpen?: boolean },
) => {
  const [opened, setOpened] = useState(false);
  const { width } = useViewportSize();

  const modalSize = useMemo(() => {
    if (width <= SCREEN_SIZES.MOBILE) return "auto";
    if (width <= SCREEN_SIZES.DESKTOP) return "80%";
    if (width <= SCREEN_SIZES.LARGE_DESKTOP) return "70%";
    return "auto";
  }, [width]);

  // Automatically open once per session if enabled
  useEffect(() => {
    if (options?.autoOpen) {
      const shown = sessionStorage.getItem(sessionKey);
      if (!shown) {
        setOpened(true);
      }
    }
  }, [sessionKey, options?.autoOpen]);

  const openModal = useCallback(() => {
    setOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpened(false);
    sessionStorage.setItem(sessionKey, TRUE_STRING);
  }, [sessionKey]);

  return { opened, openModal, handleClose, modalSize, setOpened };
};
