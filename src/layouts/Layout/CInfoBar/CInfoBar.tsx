import React, { useEffect, useState } from "react";
import { Anchor, Button, Container } from "@mantine/core";

import { FALSE_STRING, SHOW_INFOBAR, DOM_IDS } from "constants/global.constant";
import ExportIcon from "components/icons/Export.icon";
import CrossIcon from "components/icons/Cross.icon";

import * as classes from "components/common/InfoBar/InfoBar.module.css";

const HELP_CENTER_URL = "https://philhelp.zendesk.com/hc/en-us/p/faq";
const BG_COLOR = "#EBF7F5";
const ALLOWED_SLUGS = ["patients", "faqs"];

const CInfoBar: React.FC<{ currentLocationSlug: string }> = ({
  currentLocationSlug,
}) => {
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    setCanShow(sessionStorage.getItem(SHOW_INFOBAR) !== FALSE_STRING);
  }, []);

  if (!ALLOWED_SLUGS.includes(currentLocationSlug)) {
    return <></>;
  }

  if (!canShow) {
    return <></>;
  }

  const handleClose = () => {
    setCanShow(false);
    sessionStorage.setItem(SHOW_INFOBAR, FALSE_STRING);
  };

  return (
    <section
      style={{ background: BG_COLOR }}
      className={classes.infoBar}
      id={DOM_IDS.TOP_INFO_BAR}
    >
      <Container className={classes.msg} size="xl">
        <div className={classes.content}>
          <div className={classes.left}>
            Have a question about your PHILRx prescription? Visit our patient
            FAQ page for more information
          </div>
          <div className={classes.right}>
            <Anchor
              className={classes.internalLink}
              href={HELP_CENTER_URL}
              target="_blank"
            >
              <Button
                className={classes.btn}
                variant="philOutlineSecondary"
                radius="md"
              >
                <div className={classes.btnText}>
                  <span className={classes.text}>Visit Help Center</span>
                  <div className={classes.exportIcon}>
                    <ExportIcon />
                  </div>
                </div>
              </Button>
            </Anchor>
          </div>
        </div>
        <div className={classes.crossIcon} onClick={handleClose}>
          <CrossIcon />
        </div>
      </Container>
    </section>
  );
};

export default CInfoBar;
