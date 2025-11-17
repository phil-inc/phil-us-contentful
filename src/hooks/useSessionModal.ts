import { useEffect, useState, useCallback } from "react";
import { TRUE_STRING } from "constants/global.constant";

export const useSessionModal = (
  sessionKey: string,
  options?: { autoOpen?: boolean },
) => {
  const [opened, setOpened] = useState(false);

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

  return { opened, openModal, handleClose, setOpened };
};
