import React from "react";

import * as classes from "./ImprovementCard.module.css";

type ImprovementCardProps = {
  title: string;
  description: string;
  value: string;
};

const ImprovementCard: React.FC<ImprovementCardProps> = ({
  title,
  description,
  value,
}) => {
  return (
    <article className={classes.improvementCard}>
      <div className={classes.title}>{title}</div>
      <div>{description}</div>
      <div className={classes.value}>{value}</div>
    </article>
  );
};

export default ImprovementCard;
