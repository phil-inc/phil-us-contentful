import {
  Paper,
  Container,
  Center,
  Title,
  Divider,
  Button,
  Text,
  Grid,
  Group,
  Anchor,
} from "@mantine/core";
import classNames from "classnames";
import { FIELD_PAGE } from "constants/page";
import PageContext from "contexts/PageContext";
import { Link } from "gatsby";
import type { FC } from "react";
import React from "react";
import type { TResource } from "types/resource";
import { getLink } from "utils/getLink";

import * as classes from "./faq.module.css";

type FAQProps = {
  resource: TResource;
};

export const FAQ: FC<FAQProps> = ({ resource }) => {
  const context = React.useContext(PageContext);

  // TODO: adjust css to match design
  // const {classes} = useStyles({
  // 	background: context.title === FIELD_PAGE ? '#ffffff' : '#f4f4f4',
  // 	...(context.title === FIELD_PAGE && {fontSize: 24}),
  // });
  const { link, isExternal } = getLink(resource);

  return (
    <Paper radius={0} className={classNames(classes.FAQWrapper)}>
      <Group align="center">
        <Group>
          {isExternal ? (
            <Anchor
              href={link}
              target="_blank"
              className={classes.title}
              underline="never"
            >
              <Title order={4} className={classes.title}>
                {resource.heading}
              </Title>
            </Anchor>
          ) : (
            <Link to={link} className={classes.title}>
              <Title order={4} className={classes.title}>
                {resource.heading}
              </Title>
            </Link>
          )}
        </Group>
      </Group>
    </Paper>
  );
};
