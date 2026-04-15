import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import cx from "clsx";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Asset from "components/common/Asset/Asset";
import { type TAsset } from "types/asset";

import * as classes from "./PharmacyNetworkMap.module.css";
import {
  CARD_POSITION_CLASSES,
  DOT_GAP,
  DOT_SIZE,
  PILL_WIDTH,
  INTERVAL_MS,
} from "constants/pharmacyNetwork";

/** Matches ContentfulMetric fragment from page query (id, metricLabel, metricValue, metricDescriptionRichText) */
export type AnnotationMetric = {
  id: string;
  metricLabel?: string;
  metricValue?: string;
  metricDescriptionRichText?: { raw: string };
};

type NormalizedAnnotation = {
  id: string;
  title: string;
  description: React.ReactNode;
};

type PharmacyNetworkMapProps = {
  mapAsset: TAsset;
  mobileMapAsset?: TAsset;
  annotations?: AnnotationMetric[];
};

function normalizeAnnotations(annotations: AnnotationMetric[]): NormalizedAnnotation[] {
  return annotations.map((a) => ({
    id: a.id,
    title: a.metricValue ?? "",
    description:
      a.metricDescriptionRichText?.raw != null
        ? renderRichText(a.metricDescriptionRichText as Parameters<typeof renderRichText>[0], {})
        : a.metricValue ?? "",
  }));
}

/**
 * Computes the new slot-order array when the pill moves from its current slot
 * to `targetSlot`.
 *
 * Item IDs: 0 = pill, 1..N-1 = dots (fungible — dots are identical grey circles).
 *
 * Rules (mirroring the reference PaginationLoader):
 *   • Single-step forward  (target === currentPillSlot + 1): swap pill with right neighbour
 *   • Wrap                 (target === 0, pill at last slot): pop pill from end, unshift to front
 *   • Multi-step / click   (anything else): splice pill out, insert at target slot
 */
function computeNextOrder(order: number[], targetSlot: number): number[] {
  const next = [...order];
  const pillSlot = next.indexOf(0);

  if (pillSlot === targetSlot) return order;

  const isWrap = targetSlot === 0 && pillSlot === next.length - 1;
  const isSingleForward = targetSlot === pillSlot + 1;

  if (isWrap) {
    next.splice(pillSlot, 1);
    next.unshift(0);
    return next;
  }

  if (isSingleForward) {
    [next[pillSlot], next[targetSlot]] = [next[targetSlot], next[pillSlot]];
    return next;
  }

  // Arbitrary jump: remove pill and insert at target slot
  next.splice(pillSlot, 1);
  next.splice(targetSlot, 0, 0);
  return next;
}

const PharmacyNetworkMap: React.FC<PharmacyNetworkMapProps> = ({
  mapAsset,
  mobileMapAsset,
  annotations: annotationsProp = [],
}) => {
  const annotations = useMemo(
    () => normalizeAnnotations(annotationsProp),
    [annotationsProp]
  );

  const N = annotations.length;

  // ── Description box state ────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(0);

  // ── Description box height-sync refs ────────────────────────────────────
  const innerRef = useRef<HTMLDivElement>(null);
  const storedHeightRef = useRef<number | null>(null);

  // ── Pagination dots order ────────────────────────────────────────────────
  // order[slot] = itemId   (itemId 0 = pill, 1..N-1 = dots)
  // Pill always occupies slot === activeIndex.
  const [order, setOrder] = useState<number[]>(() =>
    Array.from({ length: N }, (_, i) => i)
  );

  const current = annotations[activeIndex];

  // Auto-rotate interval — resets whenever activeIndex changes (so a dot click
  // also resets the countdown).
  useEffect(() => {
    if (N <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % N);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [N, activeIndex]);

  // Animate description-box height in sync with the crossfade (before paint).
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const newHeight = el.scrollHeight;
    const oldHeight = storedHeightRef.current;
    storedHeightRef.current = newHeight;

    if (oldHeight === null || oldHeight === newHeight) return;

    el.style.transition = "none";
    el.style.height = `${oldHeight}px`;
    void el.offsetHeight;

    el.style.transition = "height 0.6s ease-out";
    el.style.height = `${newHeight}px`;

    const onEnd = () => {
      el.style.height = "";
      el.style.transition = "";
      storedHeightRef.current = el.scrollHeight;
    };
    el.addEventListener("transitionend", onEnd, { once: true });
    return () => el.removeEventListener("transitionend", onEnd);
  }, [activeIndex]);

  // When activeIndex changes, keep the previous visible briefly for the
  // description crossfade, and update the slot order for the pagination dots.
  useEffect(() => {
    if (activeIndexRef.current === activeIndex) return;

    const prev = activeIndexRef.current;
    setPrevIndex(prev);
    activeIndexRef.current = activeIndex;

    // Update slot order so the pill moves to the new activeIndex slot.
    setOrder((prevOrder) => computeNextOrder(prevOrder, activeIndex));

    const t = setTimeout(() => setPrevIndex(null), 500);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  const mobileAsset = mobileMapAsset ?? mapAsset;

  if (!mapAsset || N === 0) return null;

  const dotStep = DOT_SIZE + DOT_GAP;
  const pillSlot = order.indexOf(0);
  const trackWidth = (N - 1) * dotStep + PILL_WIDTH;

  return (
    <div className={classes.wrapper} data-pharmacy-network-map>
      {/* Desktop Layout — cards are absolute inside mapContainer */}
      <div className={classes.desktopLayout}>
        <div className={classes.mapContainer}>
          <div className={classes.svgInner}>
            <Asset objectFit="contain" asset={mapAsset} />
          </div>

          <div className={classes.cardsOverlay}>
            {annotations.map((card, index) => (
              <div
                key={card.id}
                className={cx(
                  classes.annotationCard,
                  CARD_POSITION_CLASSES[index] != null &&
                    classes[CARD_POSITION_CLASSES[index] as keyof typeof classes]
                )}
              >
                <p className={classes.cardTitle}>{card.title}</p>
                <div className={classes.cardDescription}>{card.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={classes.mobileContainer}>
        <div className={classes.mobileLayout}>
          <div className={classes.mobileDescriptionSlot}>
            <div className={classes.mobileDescriptionBox}>
              <div ref={innerRef} className={classes.mobileDescriptionInner}>
                {prevIndex !== null && annotations[prevIndex] && (
                  <div
                    key={`prev-${prevIndex}`}
                    className={cx(classes.mobileDescriptionWrapper, classes.fadeOut)}
                  >
                    <p className={classes.mobileDescriptionTitle}>{annotations[prevIndex].title}</p>
                    <div className={classes.mobileDescription}>{annotations[prevIndex].description}</div>
                  </div>
                )}
                {current && (
                  <div
                    key={`curr-${activeIndex}`}
                    className={cx(classes.mobileDescriptionWrapper, classes.fadeIn)}
                  >
                    <p className={classes.mobileDescriptionTitle}>{current.title}</p>
                    <div className={classes.mobileDescription}>{current.description}</div>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.mobileMap}>
              <Asset objectFit="contain" asset={mobileAsset} />
            </div>
          </div>

          {/* Pagination dots — slot-based layout; pill always behind dots */}
          <div className={classes.mobileDots} role="tablist" aria-label="Carousel pagination">
            <div className={classes.mobileDotsTrack} style={{ width: trackWidth }}>
              {Array.from({ length: N }, (_, itemId) => {
                const slot = order.indexOf(itemId);
                const isPill = itemId === 0;

                const pillExtra = PILL_WIDTH - DOT_SIZE;

                if (isPill) {
                  return (
                    <div
                      key={0}
                      className={classes.mobilePill}
                      style={{ transform: `translateX(${slot * dotStep}px)` }}
                      aria-hidden="true"
                    />
                  );
                }

                const x = slot * dotStep + (pillSlot < slot ? pillExtra : 0);
                const targetAnnotation = slot;
                return (
                  <button
                    key={itemId}
                    type="button"
                    className={classes.mobileDot}
                    style={{ transform: `translateX(${x}px)` }}
                    aria-label={`Go to slide ${targetAnnotation + 1}`}
                    aria-selected={false}
                    onClick={() => goTo(targetAnnotation)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyNetworkMap;
