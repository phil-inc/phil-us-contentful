import React from "react";
import { Link } from "gatsby";
import { IconArrowRight } from "@tabler/icons";
import { Button, Container } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, Node } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import cx from "clsx";

import { AnnoucementReference } from "types/annoucementBar";

import * as classes from "./Annoucement.module.css";

import { getColorFromStylingOptions } from "utils/stylingOptions";

type AnnoucementProps = {
  reference: AnnoucementReference;
};

const Annoucement: React.FC<AnnoucementProps> = ({ reference }) => {
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

  return (
    <section
      style={{
        background: getColorFromStylingOptions(
          reference?.stylingOptions?.background,
        ),
      }}
      className={classes.annoucement}
    >
      <Container className={classes.msg} size="xl">
        <div className={classes.left}>
          {renderRichText(reference?.body, options)}
        </div>
        <div className={classes.right}>
          <Link
            className={classes.internalLink}
            to={`/${reference.hyperlink?.internalContent?.slug || ""}`}
          >
            <Button
              color="white"
              className={cx(classes.btn, {})}
              variant={"outline"}
              radius={"xl"}
            >
              <div className={classes.btnText}>
                <span className={classes.text}>
                  {reference.hyperlink?.linkLabel || ""}
                </span>
                <IconArrowRight size={16} />
              </div>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Annoucement;
