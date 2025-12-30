import React from "react";
import Decimal from "decimal.js";
import { toDecimal } from "utils/decimal/decimal.utils";
import triangleIcon from "assets/images/icons/triangle.svg";

import * as classes from "./ImprovementCard.module.css";

type ImprovementCardProps = {
  title: string;
  description: string;
  value: string;
  numericValue?: Decimal | number | string;
};

const ImprovementCard: React.FC<ImprovementCardProps> = ({
  title,
  description,
  value,
}) => {
  // Determine if the value is beneficial (for ratios, > 1 is beneficial)
  const numericValue = parseFloat(value);
  const isBeneficial = numericValue !== undefined 
    ? toDecimal(numericValue).gt(1) 
    : null;
  
  return (
    <article className={classes.improvementCard}>
      <div className={classes.title}>{title}</div>
      <div>{description}</div>
      <div className={classes.valueContainer}>
        {isBeneficial !== null && (
          <span
            className={`${classes.triangle} ${
              !isBeneficial ? classes.triangleRotated : ""
            }`}
          >
            <img src={triangleIcon} alt={isBeneficial ? "Trending up" : "Trending down"} />
          </span>
        )}
        <span className={classes.value}>{value}</span>
      </div>
    </article>
  );
};

export default ImprovementCard;
