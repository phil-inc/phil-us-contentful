import React, { useEffect, useMemo, useState } from "react";
import cx from "clsx";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Asset from "components/common/Asset/Asset";

import * as classes from "./PharmacyNetworkMap.module.css";

const CARD_POSITION_CLASSES = [
  "smartScriptRouting",
  "fullScriptControl",
  "stateCoverage",
  "customizableRules",
  "inHouseDistributors",
] as const;

const INTERVAL_MS = 5000;

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
  description: string | React.ReactNode;
};

type PharmacyNetworkMapProps = {
  mapAsset: any;
  mobileMapAsset?: any;
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

  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [selectedDotIndex, setSelectedDotIndex] = useState(0);

  const current = annotations[displayedIndex];

  useEffect(() => {
    if (annotations.length <= 1) return;
    const interval = setInterval(() => {
      setDisplayedIndex((prev) => (prev + 1) % annotations.length);
      setSelectedDotIndex((prev) => (prev + 1) % annotations.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [annotations.length]);

  const goTo = (index: number) => {
    if (index === displayedIndex) return;
    setDisplayedIndex(index);
    setSelectedDotIndex(index);
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
                <div className={classes.cardDescription}>
                  {typeof card.description === "string"
                    ? card.description
                    : card.description}
                </div>
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
              {current && (
                <div
                  key={displayedIndex}
                  className={cx(classes.mobileDescriptionWrapper, classes.mobileDescriptionFadeIn)}
                >
                  <p className={classes.mobileDescriptionTitle}>
                    {current.title}
                  </p>
                  <div className={classes.mobileDescription}>
                    {typeof current.description === "string"
                      ? current.description
                      : current.description}
                  </div>
                </div>
              )}
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
            {annotations.map((_, index) => (
              <button
                key={annotations[index].id}
                type="button"
                className={cx(classes.mobileDot, {
                  [classes.mobileDotActive]: selectedDotIndex === index,
                })}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={selectedDotIndex === index}
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
