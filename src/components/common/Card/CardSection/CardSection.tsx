import { Paper, Title, Text, Stack, Group, Grid, Anchor } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React, { useContext } from "react";
import type { TResource } from "types/resource";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from 'clsx'
import { navigate } from "gatsby";

import * as classes from "./cardSection.module.css";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import { type Options } from "@contentful/rich-text-react-renderer";
import PageContext from "contexts/PageContext";
import { Metadata } from "types/section";
import { IconArrowRight } from "@tabler/icons";

import { DIVE_INTO_THE_LATEST_DTP, RECENT_CLIENT_WINS } from "constants/section";
import { PATH } from "constants/routes";
import { MEDICATION_ACCESS_SIMPLIFIED } from "constants/identifiers";
import { CONTENTFUL_TYPES } from "constants/global.constant";

type ArticleProps = {
  resource: TResource;
  metadata?: Metadata;
  isEmployeeTag?: boolean;
  arrayLength?: number;
  sectionHeader?: string;
};

export const CardSection: FC<ArticleProps> = ({ resource, sectionHeader }) => {
  const { heading, subheading, body, hyperlink } = resource;
 
  const context = useContext(PageContext);
  const isHeaderNameMedicationAccessSection = sectionHeader === MEDICATION_ACCESS_SIMPLIFIED;

  //Check interenalContent link first else externalUrl
  const getLink = () => {
    if(hyperlink?.internalContent?.__typename === CONTENTFUL_TYPES.DOWNLABLE_RESOURCE || hyperlink?.internalContent?.__typename === CONTENTFUL_TYPES.CASE_STUDY)
      return hyperlink?.internalContent?.slug ? `${PATH.INSIGHTS_CASE_STUDIES}${hyperlink?.internalContent?.slug}` : "";

    else if(hyperlink?.internalContent){
      return hyperlink?.internalContent?.slug ? `${hyperlink?.internalContent?.slug}` : "";
    }
    else if(hyperlink?.externalUrl){
      return hyperlink?.externalUrl ? hyperlink?.externalUrl : "";
    }
    return null;
  }

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },

      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title
            data-context={context.title}
            className={classes.heading3}
            lh={"normal"}
          >
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_4](node, children) {
        return (
          <Title
            order={4}
            data-context={context.title}
            className={classes.heading4}
            lh={"normal"}
          >
            {children}
          </Title>
        );
      },
    },
  };
 
  return (
    <Group h={"100%"} gap={0}>
      <Paper
        className={cx(classes.paper, {
          [classes.showHoverShadow]: isHeaderNameMedicationAccessSection,
        })}
        style={{
          background: getColorFromStylingOptions(
            resource?.stylingOptions?.background,
          ),
        }}
        radius={0}
        data-context={context.title}
        onClick={() => {
          const slug = getLink()
          return isHeaderNameMedicationAccessSection
            ? navigate(slug? slug : ""
              )
            : null;
        }}
      >
        <Grid
          gutter={0}
          classNames={{ inner: classes.gridInner, root: classes.gridRoot }}
        >
          <Grid.Col
            span={{
              base: 12,
              sm: 12,
              md: "auto",
            }}
          >
            {(sectionHeader === "Recent Client News" || sectionHeader === RECENT_CLIENT_WINS || sectionHeader === DIVE_INTO_THE_LATEST_DTP) && (
              <div >
                <Text className={classes.recentClientNewsHeader}>
                  {heading}
                </Text>
                <Text className={classes.recentClientNewsSubHeader}>
                  {subheading}
                </Text>
              </div>
            )}
            <Stack className={classes.stack} h="100%" gap={32}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {body && renderRichText(body, options)}
              </div>
              {
                  hyperlink?.linkLabel === "Read Press Release"
              }
              {hyperlink?.linkLabel &&
                <div>
                  {isHeaderNameMedicationAccessSection ? (
                    <div className={classes.anchorWrapper}>
                      <span className={cx(classes.anchortext)}>
                        {hyperlink?.linkLabel}
                      </span>
                      <span className={classes.iconWrapper}>
                        <IconArrowRight size={16} />
                      </span>
                    </div>
                  ) : (
                    <Anchor
                      href={getLink()}
                    >
                      <div className="anchor-text">
                        {hyperlink?.linkLabel}
                        <IconArrowRight size={16} />
                      </div>
                    </Anchor>
                  )}
                </div>
              }
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Group>
  );
};
