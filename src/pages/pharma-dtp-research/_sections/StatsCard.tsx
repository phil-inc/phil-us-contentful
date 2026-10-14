import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@mantine/hooks";

import type { Stat } from "../_data";
import * as classes from "../pharmaDtpResearch.module.css";

const AUTO_ADVANCE_MS = 4000;
const SWIPE_THRESHOLD_PX = 40;

type StatsCardProps = {
  stats: Stat[];
};

/**
 * Hero card cycling through the headline findings: advances every 4s, with
 * progress bars, previous/next buttons and swipe/drag. Pauses while the pointer
 * is over it, and does not auto-advance for visitors who ask for reduced motion.
 */
export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(({ stats }, ref) => {
  const count = stats.length;
  const [slide, setSlide] = useState(0);
  // Bumped on every manual move so the 4s countdown and the progress bar restart.
  const [run, setRun] = useState(0);
  const [held, setHeld] = useState(false);
  const reduceMotion = useReducedMotion();
  const dragStartX = useRef<number | null>(null);

  const autoAdvance = !held && !reduceMotion;

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setTimeout(() => setSlide((s) => (s + 1) % count), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, slide, run, count]);

  const goTo = (index: number) => {
    setSlide(((index % count) + count) % count);
    setRun((r) => r + 1);
  };

  const dragStart = (x: number) => {
    dragStartX.current = x;
  };
  const dragEnd = (x: number) => {
    if (dragStartX.current === null) return;
    const dx = x - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) goTo(slide + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      ref={ref}
      className={classes.statsCard}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => {
        setHeld(false);
        setRun((r) => r + 1);
      }}
    >
      <div className={classes.statsGlow} aria-hidden="true" />
      <div
        className={classes.slides}
        onTouchStart={(e) => dragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => dragEnd(e.changedTouches[0].clientX)}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") dragStart(e.clientX);
        }}
        onPointerUp={(e) => {
          if (e.pointerType === "mouse") dragEnd(e.clientX);
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.value + stat.text}
            aria-hidden={i !== slide}
            className={`${classes.slide} ${i === slide ? classes.slideActive : ""} ${i < slide ? classes.slidePast : ""}`}
          >
            <div className={`${classes.statValue} ${classes.gradientNumber}`}>{stat.value}</div>
            <p className={classes.statText}>{stat.text}</p>
          </div>
        ))}
      </div>

      <div className={classes.statsControls}>
        <div className={classes.dots}>
          {stats.map((stat, i) => (
            <button
              key={stat.value + stat.text}
              type="button"
              aria-label={`Finding ${i + 1}`}
              aria-current={i === slide}
              className={classes.dot}
              onClick={() => goTo(i)}
            >
              <span className={`${classes.dotFill} ${i < slide || (i === slide && reduceMotion) ? classes.dotFillOn : ""}`} />
              {i === slide && !reduceMotion && (
                <span key={`${slide}-${run}`} className={`${classes.dotRun} ${held ? classes.dotRunPaused : ""}`} />
              )}
            </button>
          ))}
        </div>
        <div className={classes.arrows}>
          <button type="button" aria-label="Previous finding" className={classes.arrow} onClick={() => goTo(slide - 1)}>
            &larr;
          </button>
          <button type="button" aria-label="Next finding" className={classes.arrow} onClick={() => goTo(slide + 1)}>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
});

StatsCard.displayName = "StatsCard";
