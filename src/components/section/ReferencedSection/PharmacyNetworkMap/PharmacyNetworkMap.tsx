import React from "react";
import cx from "clsx";
import Asset from "components/common/Asset/Asset";

import * as classes from "./pharmacyNetworkMap.module.css";

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

type PharmacyNetworkMapProps = {
  mapAsset: any;
};

const PharmacyNetworkMap: React.FC<PharmacyNetworkMapProps> = ({
  mapAsset,
}) => {
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

      {/* Mobile Layout — kept as-is for now */}
      <div className={classes.mobileLayout}>
        <div className={classes.mobileMap}>
          <Asset objectFit="contain" asset={mapAsset} />
        </div>
        <div className={classes.mobileCards}>
          {ANNOTATIONS.map((card) => (
            <div key={card.id} className={classes.mobileCard}>
              <p className={classes.cardTitle}>{card.title}</p>
              <p className={classes.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmacyNetworkMap;
