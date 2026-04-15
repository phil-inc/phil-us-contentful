import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import cx from "clsx";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Asset from "components/common/Asset/Asset";
import { type TAsset } from "types/asset";

import * as classes from "./PharmacyNetworkMap.module.css";
import { CARD_POSITION_CLASSES, INTERVAL_MS } from "constants/pharmacyNetwork";

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

const PharmacyNetworkMap: React.FC<PharmacyNetworkMapProps> = ({
  mapAsset,
  mobileMapAsset,
  annotations: annotationsProp = [],
}) => {

  const annotations = useMemo(
    () => normalizeAnnotations(annotationsProp),
    [annotationsProp]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const storedHeightRef = useRef<number | null>(null);

  const current = annotations[activeIndex];

  useEffect(() => {
    if (annotations.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % annotations.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [annotations.length, activeIndex]);

  // Animate container height in sync with the crossfade (runs before paint)
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const newHeight = el.scrollHeight;
    const oldHeight = storedHeightRef.current;
    storedHeightRef.current = newHeight;

    if (oldHeight === null || oldHeight === newHeight) return;

    // Lock at previous height, then transition to new height
    el.style.transition = "none";
    el.style.height = `${oldHeight}px`;
    void el.offsetHeight; // force layout to commit old height before transition

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

  // When activeIndex changes, briefly keep previous for fadeOut animation
  useEffect(() => {
    if (activeIndexRef.current === activeIndex) return;
    setPrevIndex(activeIndexRef.current);
    activeIndexRef.current = activeIndex;
    const t = setTimeout(() => setPrevIndex(null), 500);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  const mobileAsset = mobileMapAsset ?? mapAsset;

  if (!mapAsset || annotations.length === 0) return null;

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

      {/* Mobile Layout*/}
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
          <div
            className={classes.mobileDots}
            role="tablist"
            aria-label="Carousel pagination"
          >
            {annotations.map((annotation, index) => (
              <button
                key={annotation.id}
                type="button"
                className={cx(classes.mobileDot, {
                  [classes.mobileDotActive]: activeIndex === index,
                })}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={activeIndex === index}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyNetworkMap;
