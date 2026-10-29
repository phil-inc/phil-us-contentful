import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@mantine/hooks";

import type { Quote } from "./types";
import * as classes from "./researchReport.module.css";

const AUTO_ADVANCE_MS = 8000;
const SWIPE_THRESHOLD_PX = 40;

const Attribution: React.FC<{ quote: Quote }> = ({ quote }) => (
  <figcaption className={classes.quoteAuthor}>
    <img src={quote.photo} alt={quote.name} width={60} height={60} loading="lazy" decoding="async" className={classes.quotePhoto} />
    <span>
      <span className={classes.quoteName}>{quote.name}</span>
      <span className={classes.quoteRole}>{quote.role}</span>
    </span>
  </figcaption>
);

/** One quote, shown as it is. */
export const QuoteSolo: React.FC<{ quote: Quote }> = ({ quote }) => (
  <section id="perspective" className={classes.perspective}>
    <div className={classes.quote}>
      <figure className={classes.quoteSolo}>
        <blockquote className={classes.quoteText}>&ldquo;{quote.text}&rdquo;</blockquote>
        <Attribution quote={quote} />
      </figure>
    </div>
  </section>
);

/**
 * Several quotes in one card: advances every 8s, with dots, previous/next buttons and swipe/drag. Pauses while
 * a mouse is over it, and does not auto-advance for visitors who ask for reduced motion. Every quote is in the
 * HTML; the ones not showing are hidden from assistive technology.
 */
export const QuoteCarousel: React.FC<{ quotes: Quote[] }> = ({ quotes }) => {
  const count = quotes.length;
  const [active, setActive] = useState(0);
  // Bumped on every manual move so the 8s countdown starts over.
  const [run, setRun] = useState(0);
  const [held, setHeld] = useState(false);
  const reduceMotion = useReducedMotion();
  const dragStartX = useRef<number | null>(null);

  const autoAdvance = !held && !reduceMotion && count > 1;

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % count), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, active, run, count]);

  const goTo = (index: number) => {
    setActive(((index % count) + count) % count);
    setRun((r) => r + 1);
  };

  const dragStart = (x: number) => {
    dragStartX.current = x;
  };
  const dragEnd = (x: number) => {
    if (dragStartX.current === null) return;
    const dx = x - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) goTo(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="perspective" className={classes.perspective}>
      <div className={classes.quote}>
        <div
          className={classes.quoteSlides}
          // Pause only for a real mouse: phones report a tap as the mouse entering, with no matching leave.
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setHeld(true);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType !== "mouse") return;
            setHeld(false);
            setRun((r) => r + 1);
          }}
          onTouchStart={(e) => dragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => dragEnd(e.changedTouches[0].clientX)}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse") dragStart(e.clientX);
          }}
          onPointerUp={(e) => {
            if (e.pointerType === "mouse") dragEnd(e.clientX);
          }}
        >
          {quotes.map((quote, i) => (
            <figure
              key={quote.name}
              aria-hidden={i !== active}
              className={`${classes.quoteItem} ${i === active ? classes.quoteItemActive : ""} ${i < active ? classes.quoteItemPast : ""}`}
            >
              <blockquote className={classes.quoteText}>&ldquo;{quote.text}&rdquo;</blockquote>
              <Attribution quote={quote} />
            </figure>
          ))}
        </div>

        <div className={classes.quoteControls}>
          <div className={classes.quoteDots}>
            {quotes.map((quote, i) => (
              <button
                key={quote.name}
                type="button"
                aria-label={`Quote ${i + 1}`}
                aria-current={i === active}
                className={`${classes.quoteDot} ${i === active ? classes.quoteDotActive : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className={classes.quoteArrows}>
            <button type="button" aria-label="Previous quote" className={classes.quoteArrow} onClick={() => goTo(active - 1)}>
              &larr;
            </button>
            <button type="button" aria-label="Next quote" className={classes.quoteArrow} onClick={() => goTo(active + 1)}>
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
