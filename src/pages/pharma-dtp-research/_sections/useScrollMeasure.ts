import { useEffect } from "react";

/**
 * Runs `measure` once on mount, then at most once per frame while the page
 * scrolls or resizes. `measure` must be stable (wrap it in useCallback).
 */
export function useScrollMeasure(measure: () => void) {
  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [measure]);
}
