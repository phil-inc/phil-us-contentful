import React, { useEffect, useRef, useState } from "react";
import cx from "clsx";
import Asset from "components/common/Asset/Asset";

import * as classes from "./PharmacyNetworkMap.module.css";

const ANNOTATIONS = [
  {
    id: "smartScriptRouting",
    title: "Smart script routing",
    description:
      "That matches patients with the optimal pharmacy for their plan.",
  },
  {
    id: "fullScriptControl",
    title: "Full script control",
    description:
      "Through flexible business rules, automation, and integration with the pharmacy network.",
  },
  {
    id: "stateCoverage",
    title: "50-state coverage",
    description:
      "That leverages smart routing and integration with pharmacies contracted for over 98% of insurance plans.",
  },
  {
    id: "customizableRules",
    title: "Customizable business rules",
    description: "That optimize outcomes through brand focused goals.",
  },
  {
    id: "inHouseDistributors",
    title: "In-house distributors",
    description:
      "Wholesale arm and PHIL cash pharmacy options for contracting simplicity, enhanced inventory management and channel control.",
  },
];

const INTERVAL_MS = 4000;
const FADE_MS = 280;

type Phase = "idle" | "out" | "in";

type PharmacyNetworkMapProps = {
  mapAsset: any;
  mobileMapAsset?: any;
};

const PharmacyNetworkMap: React.FC<PharmacyNetworkMapProps> = ({
  mapAsset,
  mobileMapAsset,
}) => {
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [selectedDotIndex, setSelectedDotIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const nextIndexRef = useRef(0);

  useEffect(() => {
    if (phase === "out") {
      const timer = setTimeout(() => {
        const next = nextIndexRef.current;
        setDisplayedIndex(next);
        setSelectedDotIndex(next);
        setPhase("in");
      }, FADE_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "in") {
      const timer = setTimeout(() => {
        setPhase("idle");
      }, FADE_MS);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (phase !== "idle") return;
      nextIndexRef.current = (displayedIndex + 1) % ANNOTATIONS.length;
      setPhase("out");
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [displayedIndex, phase]);

  const goTo = (index: number) => {
    if (phase !== "idle" || index === displayedIndex) return;
    nextIndexRef.current = index;
    setSelectedDotIndex(index);
    setPhase("out");
  };

  const mobileAsset = mobileMapAsset ?? mapAsset;
  const current = ANNOTATIONS[displayedIndex];

  return (
    <div className={classes.wrapper} data-pharmacy-network-map>
      {/* Desktop Layout — cards are absolute inside mapContainer */}
      <div className={classes.desktopLayout}>
        <div className={classes.mapContainer}>
          <div className={classes.svgInner}>
            <Asset objectFit="contain" asset={mapAsset} />
          </div>

          <div className={classes.cardsOverlay}>
            {ANNOTATIONS.map((card) => (
              <div
                key={card.id}
                className={cx(
                  classes.annotationCard,
                  classes[card.id as keyof typeof classes],
                )}
              >
                <p className={classes.cardTitle}>{card.title}</p>
                <p className={classes.cardDescription}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout — card on top (fade transition), static map, pill/circle dots */}
      <div className={classes.mobileContainer}>
        <div className={classes.mobileLayout}>
          <div className={classes.mobileDescriptionSlot}>
            <div className={classes.mobileDescriptionBox}>
              <div
                className={cx(classes.mobileDescriptionWrapper, {
                  [classes.mobileDescriptionOut]: phase === "out",
                })}
              >
                <p className={classes.mobileDescriptionTitle}>
                  {current.title}
                </p>
                <p className={classes.mobileDescription}>
                  {current.description}
                </p>
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
            {ANNOTATIONS.map((_, index) => (
              <button
                key={ANNOTATIONS[index].id}
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
