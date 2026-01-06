import React from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Text, Title } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import PageContext from "contexts/PageContext";
import { ISection } from "types/section";

import * as classes from "./RoiHeading.module.css";

type RoiHeadingProps = {
  section: ISection;
};
const RoiHeading: React.FC<RoiHeadingProps> = ({ section }) => {
  const context = React.useContext(PageContext);

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className={classes.boldText}>{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children: React.ReactNode) {
        return (
          <Text data-context={context.title} className={classes.paragraph}>
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title order={3} className={classes.heading3}>
            {children}
          </Title>
        );
      },
    },
  };

  return (
    <section className={classes.roiHeading}>
      {renderRichText(section.body, options)}
    </section>
  );
};

export default RoiHeading;
