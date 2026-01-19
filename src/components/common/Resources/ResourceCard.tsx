import {
  Paper,
  Title,
  Button,
  Text,
  Grid,
  Box,
  Anchor,
  Group,
  type MantineStyleProps,
} from "@mantine/core";
import React from "react";
import type { FC } from "react";
import { Link } from "gatsby";
import type { TResource } from "types/resource";
import { getLink } from "utils/getLink";
import { getDescriptionFromRichtext } from "utils/getDescription";

import * as classes from "./resourceCard.module.css";
import { CaseStudy } from "templates/case-study";

import { convertDateToCustomFormat } from "utils/date";

import PageContext from "contexts/PageContext";

type ResourceCardProps = {
  resource: TResource | CaseStudy;
  isFaq?: boolean;
  isCaseStudy?: boolean;
};

export const ResourceCard: FC<ResourceCardProps & MantineStyleProps> = ({
  resource,
  isFaq = false,
  isCaseStudy = false,
}) => {
  const { link, isExternal, linkLabel } = getLink(resource);
  const context = React.useContext(PageContext);

  const heading: React.ReactNode =
    (resource.subHeading as React.ReactNode) ??
    (resource.heading as React.ReactNode) ??
    (resource.title as React.ReactNode);

  const publishedDate = (resource as TResource)?.publishDate 
    ? convertDateToCustomFormat((resource as TResource)?.publishDate || '')
    : null;

  return (
    <Paper radius={0} className={classes.card} data-context={context.title}>
      <Grid justify="start" align="start">
        <Grid.Col>
          <Box className={classes.box}>
            {publishedDate && <Text className={classes.date}>{publishedDate}</Text>}
            {isCaseStudy &&  <Link to={link} className={classes.textDecorationNone}>
              <Title order={3} className={classes.title}>
                {heading}
              </Title>
              </Link>
            }
            {!isCaseStudy && ((heading && isExternal)
              ? (<Anchor href={link} target="_blank" underline="never" className={classes.textDecorationNone}>
                <Title order={3} className={classes.title}>
                  {heading}
                </Title>
              </Anchor>
            ) : (
              <Link to={link} className={classes.textDecorationNone}>
                <Title order={3} className={classes.title}>
                  {heading}
                </Title>
              </Link>
            ))}
            {resource.body && (
              <Text className={classes.body} lineClamp={2}>
                {getDescriptionFromRichtext(resource?.body?.raw ?? "")}
              </Text>
            )}
            {(("buttonText" in resource && resource.buttonText) ||
              linkLabel) && (
              <Group>
                {isCaseStudy &&  <Link to={link}>
                    <Button variant="philDefault" className={classes.button}>
                      {("buttonText" in resource && resource.buttonText) ||
                        linkLabel}
                    </Button>
                  </Link>
                }
                {!isCaseStudy && (isExternal ? (
                  <Anchor href={link} underline="never" target="_blank">
                    <Button variant="philDefault" className={classes.button}>
                      {("buttonText" in resource && resource.buttonText) ||
                        linkLabel}
                    </Button>
                  </Anchor>
                ) : (
                  <Link to={link}>
                    <Button variant="philDefault" className={classes.button}>
                      {("buttonText" in resource && resource.buttonText) ||
                        linkLabel}
                    </Button>
                  </Link>
                ))}
              </Group>
            )}
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
