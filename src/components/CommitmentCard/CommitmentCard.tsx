import { Paper, Stack, Group, Grid, Title } from "@mantine/core";
import { Link } from "gatsby";
import type { FC } from "react";
import React, { useContext } from "react";
import type { TResource } from "types/resource";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import PageContext from "contexts/PageContext";
import { IconArrowRight } from "@tabler/icons";

import * as classes from "./commitmentCard.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import { INSIGHTS } from "constants/page";

type ArticleProps = {
  resource: TResource;
};

export const CommitmentCard: FC<ArticleProps> = ({ resource }) => {
  const { hyperlink, body, heading } = resource;
  const context = useContext(PageContext);

  const options: Options = {
    renderNode: {
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

  const path = heading === INSIGHTS ? `/${hyperlink?.internalContent.slug}/resources`: `/${hyperlink?.internalContent.slug}`;

  return (
    <Group h={"100%"} gap={0}>
      <Paper
        className={classes.paper}
        style={{
          background: getColorFromStylingOptions(
            resource?.stylingOptions?.background,
          ),
        }}>
        <div>{body && renderRichText(body, options)}</div>

        <div>
          <Link
            to={path}
            className={classes.link}>
            {hyperlink?.linkLabel}
            <IconArrowRight size={18} />
          </Link>
        </div>
      </Paper>
    </Group>
  );
};
