import React, { useContext } from "react";
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
  DOM_IDS,
  FALSE_STRING,
  SHOW_INFOBAR,
} from "constants/global.constant";

import ExportIcon from "components/icons/Export.icon";
import CrossIcon from "components/icons/Cross.icon";

import PageContext from "contexts/PageContext";

type props = {
  canShowInfoBar: boolean;
  setCanShowInforBar: React.Dispatch<React.SetStateAction<boolean>>;
  infoBarReference: AnnoucementReference;
};

const InfoBar: React.FC<props> = ({
  canShowInfoBar,
  setCanShowInforBar,
  infoBarReference,
}) => {
  const context = useContext(PageContext);
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
    setCanShowInforBar(false);
    sessionStorage.setItem(SHOW_INFOBAR, FALSE_STRING);
  };

  if (!canShowInfoBar) {
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
      data-context={context.title}
      id={DOM_IDS.TOP_INFO_BAR}
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
