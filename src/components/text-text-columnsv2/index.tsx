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
  Options,
} from "@contentful/rich-text-react-renderer";
import * as classes from "./textandtext.module.css";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { IconArrowRight } from "@tabler/icons";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import cx from "clsx";
import PageContext from "contexts/PageContext";
import { getDescriptionFromRichtext } from "utils/getDescription";
import{getPhilRxAccessSolution,getDataInsights} from "assets/images";

import { getColorFromStylingOptions } from "utils/stylingOptions";
import {WHY_BRANDS_WIN_WITH_PHILRX } from "constants/identifiers";

import Asset from "components/common/Asset/Asset";

import { CONTENTFUL_TYPES } from "constants/global.constant";

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
  sectionIndex: number;
};
 
const renderColumn = (column: ReferenceBodyType, contentTitle: string, sectionIndex: number) => {
  if (!column) return null;

  const referenceMap = new Map<string, any>();

  column.references?.forEach((entry) => {
    referenceMap.set(entry?.slug, entry);
  });

  const options: Options = {
    renderNode: {
       [BLOCKS.HR]: () => {
          return (
            <div className={classes.hrContainer}>
              <hr className={classes.hr}/>
            </div>
          );
        },
      [BLOCKS.HEADING_6](node, children) {
        return (
          <Title className={classes.leftColumnTitle}>
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_2](node, children) {
        return (
          <Title order={2} lh={"normal"}>
            {children}
          </Title>
        );
      },
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
          if (entry?.sys?.contentType?.sys.id === "referencedSection") {
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
                      href={`/pharma/#a-dedicated-partner-for-retail-and-specialty-lite`}
                    >
                      <div className="anchor-text">
                        {"See Supported Products"}
                        <IconArrowRight size={16} />
                      </div>
                    </Anchor>
                  </div>
                  </>
                ) : (
                  <>
                  {/* <Title order={3} className={classes.leftColumnTitle} id={entry.title === "DATA & INSIGHTS" ? slugify("DATA AND INSIGHTS") : slugify(entry.title)}>{entry.title}</Title> */}
                  <Title order={3} className={classes.leftColumnTitle}>{entry.title}</Title>
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
                    {entry.title === "DATA & INSIGHTS" && (
                      <Image className={classes.dataAndInsightsImage} src={getDataInsights} />
                    )} 
                  </div>
                   {entry?.belowSubHeading?.belowSubHeading && (
                    <Text fz="md" className={cx(classes.leftColumnSubHeading, classes.belowSubHeading)}>
                      {entry.belowSubHeading.belowSubHeading}
                    </Text>
                  )}
                  {entry.title === "DIGITAL HUB" && (
                      <div className={classes.leftColumnLinkContainer}>
                        <Anchor
                          className={classes.greenAnchor}
                          href={"https://phil.us/patients/"}
                        >
                          <div className={`anchor-text ${classes.leftColumnLink}`}>
                            {"Explore Patient Experience"}
                            <IconArrowRight size={16} />
                          </div>
                        </Anchor>
                        <Anchor
                          className={classes.greenAnchor}
                          href={"https://phil.us/providers/#sending-a-script-to-philrx-is-easy"}
                        >
                          <div className={`anchor-text ${classes.leftColumnLink}`}>
                            {"Explore HCP Experience"}
                            <IconArrowRight size={16} />
                          </div>
                        </Anchor>
                      </div>
                      )}
                      {entry.title === "HUB & FULFILLMENT MODEL" && 
                        <div className={classes.leftColumnLinkContainer}>
                          <Anchor
                            className={classes.greenAnchor}
                            href={"https://phil.us/solution/"}
                          >
                            <div className={`anchor-text ${classes.leftColumnLink}`}>
                              {"Explore PHIL Core "}
                              <IconArrowRight size={16} />
                            </div>
                          </Anchor>
                        </div>
                      }
                  </>
                )}
              </Box>
            );
          }
          else if(entry.sys?.contentType.sys.id === "link") {
            return (
              <div className={classes.leftColumnLinkContainer}>
                <Anchor
                  className={classes.greenAnchor}
                  href={`/${entry?.internalContent?.slug}`}
                  >
                  <div className={`anchor-text ${classes.leftColumnLink}`}>
                    {entry?.linkLabel || ""}
                    <IconArrowRight size={16} />
                  </div>
                </Anchor>
              </div>
            )
          }
        }
       

        return null;
      },
      [BLOCKS.EMBEDDED_ASSET](node,children) {
        return (
          <Box className={classes.embededAsset} data-context={contentTitle} data-index={sectionIndex}>
            <Asset asset={node.data.target} />
            {children}
          </Box>
        );
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
        {column.references?.map((item: any, index :any) => {
          console.log(item,"item",item?.__typename,CONTENTFUL_TYPES.LIST);

          if(item?.__typename === CONTENTFUL_TYPES.LIST){
            switch (item.listType) {
              case 'Menu list':
                return (
                  <Flex gap={8} key={item.id} className={classes.listCheckIcon}>
                    {!item.choose && <CheckIcon size={28} color="#00827E" />}
                    <div className={cx(item.choose && classes.border, !item.subheading && classes.noSubHeadingChooseBox)}>
                        <a 
                        href={item?.anchorLink ?? ''}
                          style={{ textDecoration: "none" }}>
                          <Text data-context={context.title} 
                            className={item.subheading ? classes.heading : classes.noSubHeading}>
                            {item.heading}
                          </Text>
                        </a>
                    </div>
                  </Flex>
                );
            
              case 'Feature list':
                return (
                  <Box key={item.id} className={classes.listCheckIcon}>
                    <Flex gap={8}>
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
                    {item.linkText && 
                      <div className={cx(classes.featureListLinkContainer)}>
                        <Anchor
                          className={classes.featureListAnchor}
                          href={item?.anchorLink ?? ''}
                        >
                        <div className={cx("anchor-text",classes.textwrapper)} data-context={context.title}>
                            {item.linkText}<IconArrowRight size={16} />
                          </div>
                        </Anchor>
                      </div>
                    }
                  </Box>
                );

              default:
                return <></>;

            }
          }
          else return <></>;
        })}
      </div>
    </div>
  );
};

const TextAndTextColumns = ({ data, index, sectionIndex }: TextAndTextColumnsProps) => {
  const context = useContext(PageContext);

  const { heading, subHeadingText, leftColumn, rightColumn,addBorder, header, stylingOptions, showBottomBorder } = data;

  const richTextOptions: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return (
          <Text
            data-index={index}
            data-context={context.title}
            className={classes.headerBody}
            >
            {children}
          </Text>
        );
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
    },
  };

  return (
    <>
      <div id={header === "Data & Insights" ? slugify("DATA AND INSIGHTS") : slugify(header)}
        style={{ backgroundColor: getColorFromStylingOptions(stylingOptions?.background)}}
      >
      {addBorder && (
        <Container className={classes.container} size={"xl"}>
          <Divider size={"xs"} className={classes.divider} />
        </Container>
      )}

      <Container className="container" size={"xl"} py={{ base: 16, sm: 100 }}>
      { heading !== "PhilRx Access Solution" && (
          <Box className={classes.containerHeaderBox} data-context={context.title}>
            <Title className={classes.containerHeader} order={2} mb={20}>
              {heading}
            </Title>
            <Text className={classes.containerSubHeader}>{subHeadingText}</Text>
            {data?.body && <Box className={classes.containerBody}>{renderRichText(data.body, richTextOptions)}</Box>}
          </Box>
        )}
        <Grid gutter={48} align={heading === WHY_BRANDS_WIN_WITH_PHILRX ? "center" : "start"}>
          <Grid.Col
            span={{ base: 12, md: 6 }} 
            className={classes.leftColumn}
            data-context={context.title} 
            data-index={sectionIndex}
          >
            {renderColumn(leftColumn, context.title, sectionIndex)}
          </Grid.Col>
          <Grid.Col 
          span={{ base: 12, md: 6 }} 
          data-context={context.title} 
          data-index={sectionIndex}
          className={cx(classes.rightColumn, classes.rightColumnContainer,heading === "PhilRx Access Solution"  && classes.philRxAccessSolutionNoBorder,heading === WHY_BRANDS_WIN_WITH_PHILRX && classes.philRxAccessSolutionNoBorder)}>
            {renderRightColumn(rightColumn, context)}
          </Grid.Col>
        </Grid>
      </Container>
      </div>
      {showBottomBorder && (
        <Container className={classes.container} size={"xl"}>
          <Divider size={"xs"} />
        </Container>
      )}
    </>
  );
};

export default TextAndTextColumns;
