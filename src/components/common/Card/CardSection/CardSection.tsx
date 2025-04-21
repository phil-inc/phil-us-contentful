import { Paper, Title, Text, Stack, Group, Grid, Anchor } from "@mantine/core";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React, { useContext } from "react";
import type { TResource } from "types/resource";
import { BLOCKS } from "@contentful/rich-text-types";

import * as classes from "./cardSection.module.css";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import { type Options } from "@contentful/rich-text-react-renderer";
import PageContext from "contexts/PageContext";
import { Metadata } from "types/section";
import { IconArrowRight } from "@tabler/icons";

type ArticleProps = {
  resource: TResource;
  metadata?: Metadata;
  isEmployeeTag?: boolean;
  arrayLength?: number;
};

export const CardSection: FC<ArticleProps> = ({ resource }) => {
  const { body, hyperlink } = resource;
  const context = useContext(PageContext);

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
    },
  };

  return (
    <Group h={"100%"} gap={0}>
      <Paper
        className={classes.paper}
        style={{
          background: getColorFromStylingOptions(
            resource?.stylingOptions?.background,
          ),
        }}
        radius={0}
        data-context={context.title}
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

              <div>
                <Anchor
                  href={`/${hyperlink?.internalContent?.slug}`}
               
                >
                  <span className="anchor-text">
                    {hyperlink?.linkLabel}
s                  </span>
                  <IconArrowRight size={16} />
                </Anchor>
              </div>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Group>
  );
};
