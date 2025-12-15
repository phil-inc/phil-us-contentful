import React, { useContext } from "react";
import { Accordion, Anchor, Text, Title } from "@mantine/core";
import PageContext from "contexts/PageContext";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import cx from "clsx";

import * as classes from "./FaqAccordionSingle.module.css";

export const FaqAccordionSingle = ({ resource }: any) => {
  const { title } = useContext(PageContext);

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={cx(classes.paragraph)}>{children}</Text>;
      },

      [INLINES.HYPERLINK](node, children) {
        const { uri } = node.data as { uri: string };

        return (
          <Anchor
            href={uri}
            target="_blank"
            className={classes.anchor}
            underline="never"
            referrerPolicy="no-referrer"
          >
            {children}
          </Anchor>
        );
      },

      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title data-context={title} order={3} lh={"normal"}>
            {children}
          </Title>
        );
      },
    },
  };

  const referenceBody = resource.body.references[0].body;
  
  return (
    <Accordion
      transitionDuration={0}
      chevronSize={28}
      classNames={{
        chevron: classes.chevron,
      }}
      styles={{
        content: {
          background: "#f4f4f4",
          marginBottom: "20px",
          padding: "28px",
          color: "#525252",
        },
        control: {
          padding: "0px 30px 0px 0px",
          fontSize: "24px",
          backgroundColor: "transparent",
        },
        label: {
          fontWeight: 700,
        },
        chevron: {
          color: "#525252",
        },
      }}
    >
      <Accordion.Item value={resource?.heading || ""}>
        <Accordion.Control>{resource?.heading || ""}</Accordion.Control>
        <Accordion.Panel>
          {referenceBody && renderRichText(referenceBody, options)}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
