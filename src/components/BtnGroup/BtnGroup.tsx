import React from "react";
import { Link } from "gatsby";
import cx from "clsx";
import { Anchor, Box, Button } from "@mantine/core";

import { BUTTON_STYLE } from "constants/global.constant";
import { IContentfulButtonGroup } from "types/section";

import { getLink } from "utils/getLink";

import { ContentfulButton } from "layouts/Layout/CHeader/CHeader";

import * as classes from "./BtnGroup.module.css";



type props = {
  data: IContentfulButtonGroup;
};
const BtnGroup: React.FC<props> = ({ data }) => {
  const { button1, button2 } = data;
  
  const BtnRender = ({ btn }: { btn: ContentfulButton }) => {
    const isSecondaryButton = btn.buttonStyle === BUTTON_STYLE.Secondary;

    const button = (
      <Button
        className={cx(classes.button, {
          [classes.secondaryBtn]: isSecondaryButton,
        })}
        variant={isSecondaryButton ? "white" : "philDefault"}
      >
        {btn.buttonText}
      </Button>
    );

    if (btn?.link?.internalContent) {
      const { link } = getLink(btn, true);

      return (
        <div className={classes.bottomSection}>
          <Link className={classes.internalLink} to={link}>
            {button}
          </Link>
        </div>
      );
    }

    return (
      <Anchor
        className={classes.externalLink}
        href={btn.externalLink ?? "#"}
        target="_blank"
        referrerPolicy="no-referrer"
      >
        {button}
      </Anchor>
    );
  };

  return (
    <Box className={classes.btnGroup}>
      <BtnRender btn={button1} />
      <BtnRender btn={button2} />
    </Box>
  );
};

export default BtnGroup;
