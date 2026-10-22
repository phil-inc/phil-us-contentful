import React from "react";
import {
  Anchor,
  Avatar,
  Box,
  Divider,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";

import * as classes from "./staticBlogAuthor.module.css";

/**
 * The "Author" block under a post. The Contentful version is
 * src/components/Blog/AuthorBlock/AuthorBlock.tsx, which takes a CMS author entry; this one
 * takes plain values so a migrated post does not depend on the CMS.
 *
 * Author bios on the live site are paragraphs and links only, which is all the
 * AuthorBioP / AuthorBioA primitives cover.
 */

export type StaticBlogAuthorProps = {
  name: string;
  title: string;
  imageSrc?: string;
  bio: React.ReactNode;
};

export const AuthorBioP: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <Text className={classes.text}>{children}</Text>;

export const AuthorBioA: React.FC<{
  href: string;
  children?: React.ReactNode;
}> = ({ href, children }) => (
  <Anchor
    href={href}
    target="_blank"
    className={classes.anchor}
    underline="never"
    referrerPolicy="no-referrer"
  >
    {children}
  </Anchor>
);

export const StaticBlogAuthor: React.FC<StaticBlogAuthorProps> = ({
  name,
  title,
  imageSrc,
  bio,
}) => (
  <>
    <Divider my={52} />
    <Box mb={12}>
      <Title order={4} mb={42} className={classes.authorHeading}>
        Author
      </Title>
      <Grid align="start">
        <Grid.Col span={{ sm: 12, md: "content" }}>
          <Avatar radius={100} size={100} m={0} src={imageSrc} alt="" />
        </Grid.Col>
        <Grid.Col span={{ sm: 12, md: "auto" }}>
          <Group gap={20}>
            <Box>
              <Text className={classes.authorName}>{name}</Text>
              <Text className={classes.authorTitle}>{title}</Text>
              <Box className={classes.authorBio} c="#01201F" mb={12}>
                {bio}
              </Box>
            </Box>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  </>
);
