import React from "react";
import { navigate } from "gatsby";
import { IconArrowRight } from "@tabler/icons";
import { Container } from "@mantine/core";

import { AnnoucementReference } from "types/annoucementBar";

import * as classes from "./Annoucement.module.css";

type AnnoucementProps = {
  reference: AnnoucementReference;
};

const Annoucement: React.FC<AnnoucementProps> = ({ reference }) => {
  return (
    <section className={classes.annoucement}>
      <Container className={classes.msg} size="xl">
        <>
          {reference.title}
          <div
            className={classes.anchorWrapper}
            onClick={() =>
              navigate(`/${reference.hyperlink?.internalContent?.slug}`)
            }
          >
            {reference.hyperlink?.linkLabel}
            <span className={classes.iconWrapper}>
              <IconArrowRight size={16} />
            </span>
          </div>
        </>
      </Container>
    </section>
  );
};

export default Annoucement;
