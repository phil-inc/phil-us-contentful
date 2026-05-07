import React from "react";
import { Anchor, Box } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import cx from "clsx";

import { CONTENTFUL_TYPES } from "constants/global.constant";

import * as classes from "./ListGroup.module.css";

type ListGroupProps = {
  target: any;
  contextTitle: string;
};

const ListGroup: React.FC<ListGroupProps> = ({ target, contextTitle }) => {
  if (!target) return null;

  const normalizedType = String(target?.listType ?? "").trim().toLowerCase();
  if (
    target?.__typename !== CONTENTFUL_TYPES.LIST &&
    target?.sys?.contentType?.sys?.id !== "list" &&
    normalizedType.length === 0
  ) {
    return null;
  }

  switch (normalizedType) {
    case "menu list":
      return (
        <Box className={classes.checkListItem} data-context={contextTitle}>
          <div className={classes.checkListContent}>
            <a href={target?.anchorLink ?? ""} className={classes.itemLink}>
              <h3 className={target.subheading ? classes.checkListHeading : classes.listNoSubheading}>
                {target.heading}
              </h3>
            </a>
            {target.subheading ? (
              <p className={classes.checkListBody}>{target.subheading}</p>
            ) : null}
          </div>
        </Box>
      );

    case "card list":
      return (
        <Box
          className={classes.checkListItem}
          data-context={contextTitle}
          onClick={() => {
            if (target?.anchorLink) window.location.href = target.anchorLink;
          }}
          style={{ cursor: "pointer" }}
        >
          <div className={classes.checkListContent}>
            <h3 className={target.subheading ? classes.checkListHeading : classes.listNoSubheading}>
              {target.heading}
            </h3>
            {target.subheading ? (
              <p className={classes.checkListBody}>{target.subheading}</p>
            ) : null}
          </div>
        </Box>
      );

    case "feature list":
      return (
        <Box className={classes.checkListItem} data-context={contextTitle}>
          <div className={classes.checkListContent}>
            <h3 className={target.subheading ? classes.checkListHeading : classes.listNoSubheading}>
              {target.heading}
            </h3>
            {target.subheading ? (
              <p className={classes.checkListBody}>{target.subheading}</p>
            ) : null}
            {target.listDescription?.description ? (
              <p className={classes.checkListBody}>{target.listDescription.description}</p>
            ) : null}
          </div>
          {target.linkText && (
            <div className={classes.featureListLinkContainer}>
              <Anchor className={classes.featureListAnchor} href={target?.anchorLink ?? ""}>
                <div className={cx("anchor-text", classes.textWrapper)} data-context={contextTitle}>
                  {target.linkText}
                  <IconArrowRight size={16} />
                </div>
              </Anchor>
            </div>
          )}
        </Box>
      );

    default:
      return null;
  }
};

export default ListGroup;
