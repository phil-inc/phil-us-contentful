import React from "react";
import * as classes from "./newBadge.module.css";

type NewBadgeProps = {
  className?: string;
};

/** The small "NEW" tag shown on cards and banners that point at a new release. */
const NewBadge: React.FC<NewBadgeProps> = ({ className }) => (
  <span className={`${classes.badge} ${className || ""}`}>New</span>
);

export default NewBadge;
