import React from "react";
import * as classes from "./checkList.module.css";

export type CheckListItem = {
  title: string;
  description: string;
};

type CheckListProps = {
  items: CheckListItem[];
};

const CheckList: React.FC<CheckListProps> = ({ items }) => (
  <ul className={classes.list}>
    {items.map((item, i) => (
      <li key={i} className={classes.item}>
        <h3 className={classes.title}>{item.title}</h3>
        <p className={classes.desc}>{item.description}</p>
      </li>
    ))}
  </ul>
);

export default CheckList;
