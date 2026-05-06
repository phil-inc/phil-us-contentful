import React from "react";
import * as classes from "./eyebrow.module.css";

type EyebrowProps = {
  text: string;
  className?: string;
};

const Eyebrow: React.FC<EyebrowProps> = ({ text, className }) => (
  <p className={`${classes.eyebrow} ${className || ""}`}>{text}</p>
);

export default Eyebrow;
