import React, { useEffect, useState } from "react";
import { Anchor, Button, Container } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, Node } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import cx from "clsx";

import { AnnoucementReference } from "types/annoucementBar";

import * as classes from "./InfoBar.module.css";

import { getColorFromStylingOptions } from "utils/stylingOptions";
import {
  BUTTON_STYLE,
  FALSE_STRING,
  SHOW_INFOBAR,
} from "constants/global.constant";

import ExportIcon from "components/icons/Export.icon";
import CrossIcon from "components/icons/Cross.icon";

type props = {
  infoBarReference: AnnoucementReference;
};

const InfoBar: React.FC<props> = ({ infoBarReference }) => {
  const [isVisible, setIsVisible] = useState(true);

  const buttonVariant =
    infoBarReference?.buttonReference?.buttonStyle ===
    BUTTON_STYLE.OutlineSecondary
      ? "philOutlineSecondary"
      : "philDefault";

  const getLink = () => {
    if (infoBarReference?.buttonReference?.link?.internalContent) {
      return infoBarReference?.buttonReference?.link;
    } else if (infoBarReference?.buttonReference?.link?.externalUrl) {
      return infoBarReference?.buttonReference?.link?.externalUrl;
    }
    return "#";
  };

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <strong className={classes.boldText}>{text}</strong>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH](node: Node, children: React.ReactNode) {
        return <>{children}</>;
      },
    },
  };

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(SHOW_INFOBAR, FALSE_STRING);
  };

  useEffect(() => {
    const canDisplayBar = sessionStorage.getItem(SHOW_INFOBAR);
    if (canDisplayBar === FALSE_STRING) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) {
    return <></>;
  }

  return (
    <section
      style={{
        background: getColorFromStylingOptions(
          infoBarReference?.stylingOptions?.background,
        ),
      }}
      className={classes.infoBar}
    >
      <Container className={classes.msg} size="xl">
        <div className={classes.content}>
          <div className={classes.left}>
            {renderRichText(infoBarReference?.body, options)}
          </div>

          <div className={classes.right}>
            {Boolean(infoBarReference?.buttonReference) && (
              <Anchor
                className={classes.internalLink}
                href={getLink()}
                target={
                  infoBarReference?.buttonReference?.link?.internalContent
                    ? "_self"
                    : "_blank"
                }
              >
                <Button
                  className={cx(classes.btn, {})}
                  variant={buttonVariant}
                  radius={"md"}
                >
                  <div className={classes.btnText}>
                    <span className={classes.text}>
                      {infoBarReference.buttonReference?.buttonText || ""}
                    </span>
                    <div className={classes.exportIcon}>
                      <ExportIcon />
                    </div>
                  </div>
                </Button>
              </Anchor>
            )}
          </div>
        </div>
        <div className={classes.crossIcon} onClick={handleClose}>
          <CrossIcon />
        </div>
      </Container>
    </section>
  );
};

export default InfoBar;
