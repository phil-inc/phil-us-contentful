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
  Image
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
import { getDescriptionFromRichtext } from "utils/getDescription";
import{getPhilRxAccessSolution,getDataInsights} from "assets/images";

interface CheckIconProps {
  size: number;
  color: string;
}

const slugify = (str: string): string => {
  if (str === undefined) return "";
  if (str === null) return "";
  return str.toLowerCase().replace(/\s+/g, '-');
};


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
  index?: number;
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
        if (entry.title == "PhilRx Access Solution") {
          return (
            <Image className={classes.philRxAccessSolutionPageImage} src={getPhilRxAccessSolution} />
          )
        } else {
          if (entry.sys.contentType.sys.id === "referencedSection") {
            return (
              <Box className={classes.referencedSectionBox}>
                {entry.title === "All-in-One" ? (
                  <>
                  <Title order={3} className={classes.leftColumnSubTitle}>{entry.header}</Title>
                  {entry.subHeading?.subHeading && (
                    <Text fz="md" mt={4} className={classes.leftColumnSubHeading}>
                      {entry.subHeading.subHeading}
                    </Text>
                  )}
                  <div>
                    <Anchor
                      href={`/`}
                    >
                      <span className="anchor-text">
                        {"See supported products"}
                      </span>
                      <IconArrowRight size={16} />
                    </Anchor>
                  </div>
                  </>
                ) : (
                  <>
                  <Title order={3} className={classes.leftColumnTitle} id={entry.title === "DATA & INSIGHTS" ? slugify("DATA AND INSIGHTS") : slugify(entry.title)}>{entry.title}</Title>
                  <Title order={3} className={classes.leftColumnHeader}>{entry.header}</Title>
                  {entry.subHeading?.subHeading && (
                    <Text fz="md" mt={4} className={classes.leftColumnSubHeading}>
                      {entry.subHeading.subHeading}
                    </Text>
                  )}
                  <div className={classes.leftColumnCard}>
                    {entry.references?.map((item:any) => {
                      return (
                          <div className={classes.leftColumnCardBox}>
                            <Text data-context={entry.title} 
                              className={classes.leftColumnCardTitle}>
                              {item.heading}
                            </Text>
                            {item.body && (
                              <Text className={classes.leftColumnCardBody} lineClamp={2}>
                                {getDescriptionFromRichtext(item?.body?.raw ?? "")}
                              </Text>
                            )}
                          </div>
                      );
                    }
                    )}
                    {entry.title === "DATA & INSIGHTS " && (
                      <Image className={classes.dataAndInsightsImage} src={getDataInsights} />
                    )} 
                  </div>
                  {entry.title === "DIGITAL HUB" && (
                      <div className={classes.leftColumnLinkContainer}>
                        <div className={classes.leftColumnLinkBox}>
                        <Anchor
                          href={"https://phil.us/patients/"}
                        >
                          <span className={`anchor-text ${classes.leftColumnLink}`}>
                            {"Explore Patient Experience"}
                          </span>
                          <IconArrowRight size={16} />
                        </Anchor>
                        </div>
                        <Anchor
                          href={"https://phil.us/providers/#sending-a-script-to-philrx-is-easy"}
                        >
                          <span className={`anchor-text ${classes.leftColumnLink}`}>
                            {"Explore HCP Experience"}
                          </span>
                          <IconArrowRight size={16} />
                        </Anchor>
                      </div>
                      )} 
                  </>
                )}
              </Box>
            );
          }
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
      <Box className={classes.rightColumnHeader}>{renderRichText(column)}</Box>

      <div>
        {column.references?.map((item: any) => {
          // console.log("🚀 ~ item:", item);
          return (
            <Flex gap={8} key={item.id} className={classes.listCheckIcon}>
              {!item.choose && <CheckIcon size={28} color="#00827E" />}
              <div className={cx(item.choose && classes.border, !item.subheading && classes.noSubHeadingChooseBox)}>
                <Text data-context={context.title} 
                   className={item.subheading ? classes.heading : classes.noSubHeading}>
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

const TextAndTextColumns = ({ data,index }: TextAndTextColumnsProps) => {
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
      { heading !== "PhilRx Access Solution" && (
          <Box className={classes.containerHeaderBox}>
            <Title className={classes.containerHeader} order={2} mb={20}>
              {heading}
            </Title>
            <Text className={classes.containerSubHeader}>{subHeadingText}</Text>
          </Box>
        )}
        <Grid gutter={48}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            {renderColumn(leftColumn)}
          </Grid.Col>
          <Grid.Col 
          span={{ base: 12, md: 6 }} 
          data-context={context.title} 
          className={cx(classes.rightColumn, classes.rightColumnContainer,heading === "PhilRx Access Solution"  && classes.philRxAccessSolutionNoBorder,heading === "Why Brands Win with PhilRxs" && classes.philRxAccessSolutionNoBorder)}>
            {renderRightColumn(rightColumn, context)}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default TextAndTextColumns;
