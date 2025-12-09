import React from "react";

import * as classes from "./ImprovementCard.module.css";

type ImprovementCardProps = {
  title: string;
  description: string;
  value: string;
  key?: string;
};
const ImprovementCard: React.FC<ImprovementCardProps> = ({
  title,
  description,
  value,
  key
}) => {
  return (
    <article key ={key ?? title} className={classes.improvementCard}>
      <div className={classes.title}>{title}</div>
      <div>{description}</div>
      <div className={classes.value}>{value}</div>
    </article>
  );
};

export default ImprovementCard;
