import React, { useContext } from "react";
import {
  Anchor,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Text,
  Title,
} from "@mantine/core";
import { ITextandTextColumns, ReferenceBodyType } from "types/section";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import * as classes from "./textandtext.module.css";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Link } from "gatsby";
import { IconArrowRight } from "@tabler/icons";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import cx from "clsx";
import PageContext from "contexts/PageContext";

interface CheckIconProps {
  size: number;
  color: string;
}
const CheckIcon = ({ size, color }: CheckIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: size, marginTop: "2px" }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
    </svg>
  );
};

type TextAndTextColumnsProps = {
  data: ITextandTextColumns;
};

const renderColumn = (column: ReferenceBodyType) => {
  if (!column) return null;

  const referenceMap = new Map<string, any>();

  column.references?.forEach((entry) => {
    referenceMap.set(entry?.slug, entry);
  });

  const options: Options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        const entry = referenceMap.get(node.data.target?.sys.id);
        if (!entry) return null;

        return (
          <a href={`/${entry.slug}`} className="text-blue-600 underline">
            {node.content[0]?.value}
          </a>
        );
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = referenceMap.get(node.data.target?.sys.id);
        if (!entry) return null;

        if (entry.sys.contentType.sys.id === "referencedSection") {
          return (
            <Box className={classes.referencedSectionBox}>
              <Title order={3}>{entry.title}</Title>
              {entry.subHeading?.subHeading && (
                <Text fz="md" mt={4}>
                  {entry.subHeading.subHeading}
                </Text>
              )}
            </Box>
          );
        }

        return null;
      },
    },
  };

  return (
    <div>
      <Box>{renderRichText(column, options)}</Box>
    </div>
  );
};

const renderRightColumn = (column: any, context: any) => {

  if (!column) return null;

  return (
    <div>
      <Box>{renderRichText(column)}</Box>

      <div>
        {column.references?.map((item: any) => {      
          return (
            <Flex gap={8} key={item.id} className={classes.listCheckIcon}>
              {!item.choose && <CheckIcon size={28} color="#00827E" />}
              <div className={cx(item.choose && classes.border)}>
                <Text data-context={context.title} className={classes.heading}>
                  {item.heading}
                </Text>
                <Text className={classes.subheading}>
                  {item.subheading}
                </Text>
              </div>
            </Flex>
          );
        })}
      </div>
    </div>
  );
};

const TextAndTextColumns = ({ data }: TextAndTextColumnsProps) => {
  const context = useContext(PageContext);

  const { heading, subHeadingText, leftColumn, rightColumn, addBorder } = data;

  return (
    <>
      {addBorder && (
        <Container className={classes.container} size={"xl"}>
          <Divider size={"sm"} className={classes.divider} />
        </Container>
      )}

      <Container className="container" size={"xl"} py={{ base: 16, sm: 100 }}>
        <Box mb={100}>
          <Title order={2} ta={"center"} mb={20}>
            {heading}
          </Title>
          <Text ta={"center"}>{subHeadingText}</Text>
        </Box>

        <Grid gutter={48}>
          <Grid.Col span={{ base: 12, md: 6 }}>
              {renderColumn(leftColumn)}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} data-context={context.title} className={classes.rightColumn}>
            {renderRightColumn(rightColumn, context)}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default TextAndTextColumns;
