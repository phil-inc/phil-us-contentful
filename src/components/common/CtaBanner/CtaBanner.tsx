import React from "react";
import { Link } from "gatsby";
import * as classes from "./ctaBanner.module.css";
import pDotsLight from "assets/images/p-dots-light.png";

type CtaBannerProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

const CtaBanner: React.FC<CtaBannerProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
}) => (
  <div className={classes.banner}>
    <img className={classes.dots} src={pDotsLight} alt="" aria-hidden="true" />
    <div className={classes.text}>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.desc}>{description}</p>
    </div>
    <Link to={buttonHref} className={classes.btn}>
      {buttonText}
      <span className={classes.arr} aria-hidden="true" />
    </Link>
  </div>
);

export default CtaBanner;
