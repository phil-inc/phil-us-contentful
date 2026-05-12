import React from "react";
import * as classes from "./cardGrid.module.css";

const CardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={classes.grid}>{children}</div>
);

export default CardGrid;
