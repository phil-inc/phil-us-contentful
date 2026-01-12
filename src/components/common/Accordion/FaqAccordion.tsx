import React, { useContext, useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons";
import { Accordion, Anchor, Text, Title } from "@mantine/core";
import PageContext from "contexts/PageContext";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { getColorFromStylingOptions } from "utils/stylingOptions";

import cx from "clsx";
import * as classes from "./FaqAccordion.module.css";

export const FaqAccordion = ({ resource }: any) => {
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

  const AccordionContent = ({
    referenceBackground,
    referenceHeading,
    referenceBody,
  }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Accordion
        variant="separated"
        transitionDuration={0}
        chevron={
          isOpen ? (
            <IconMinus size={28} style={{ color: "#525252" }} />
          ) : (
            <IconPlus size={28} style={{ color: "#525252" }} />
          )
        }
        styles={{
          item: {
            background: getColorFromStylingOptions(referenceBackground),
            border: "none",
            padding: "0px",
          },
          control: {
            padding: "0px 30px",
            margin: "20px 0px 0px 0px",
            fontSize: "22px",
            background: "#f4f4f4",
          },
          label: {
            fontWeight: 700,
          },
          content: {
            color: "#525252",
            margin: "0px 0px 20px 0px",
          },
          chevron: {
            width: "28px",
            height: "28px"
          }
        }}
      >
        <Accordion.Item
          value={referenceHeading}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Accordion.Control>{referenceHeading}</Accordion.Control>
          <Accordion.Panel>
            {referenceBody && renderRichText(referenceBody, options)}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  };

  return (
    <Accordion
      transitionDuration={0}
      chevronSize={28}
        classNames={{
          chevron: classes.chevron
        }}
      styles={{
        content: {
          marginBottom: "20px",
          padding: "0px",
        },
        control: {
          padding: "0px 30px 0px 0px",
          fontSize: "28px",
          backgroundColor: "transparent",
        },
        label: {
          fontWeight: 700,
        },
        chevron:{
          color: "#525252",
        }
      }}
    >
      <Accordion.Item value={resource.header}>
        <Accordion.Control>{resource.header}</Accordion.Control>
        <Accordion.Panel>
          {resource.references?.map((reference: any, index: any) => {
            const referenceBody = reference.body.references[0]?.body;
            return (
              <AccordionContent
                key={index}
                referenceBackground={reference?.stylingOptions?.background}
                referenceHeading={reference.heading}
                referenceBody={referenceBody}
              />
            );
          })}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
