import React from "react";
import {
  Text,
  Divider,
  Box,
  Title,
  Grid,
  Avatar,
  Group,
  Anchor,
} from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { TAuthor } from "types/resource";
import Asset from "components/common/Asset/Asset";
import * as classes from "./authorBlock.module.css";

type TAuthorBlock = {
  author: TAuthor;
};

const AuthorBlock: React.FC<TAuthorBlock> = ({ author }) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.text}>{children}</Text>;
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
      <Divider my={52} />
      <Box mb={12}>
        <Title order={4} mb={42} className={classes.authorHeading}>
          Author
        </Title>
        <Grid align="start">
          <Grid.Col span={{ sm: 12, md: "content" }}>
            <Avatar radius={100} size={100} m={0}>
              <Asset asset={author.avatar} />
            </Avatar>
          </Grid.Col>
          <Grid.Col span={{ sm: 12, md: "auto" }}>
            <Group gap={20}>
              <Box>
                <Text className={classes.authorName}>{author.name}</Text>
                <Text className={classes.authorTitle}>
                  {author.authorTitle}
                </Text>
                <Text
                  className={classes.authorBio}
                  size={"16px"}
                  m={0}
                  mb={12}
                  c="#01201F"
                >
                  {Boolean(author.bio) && renderRichText(author.bio, options)}
                </Text>
              </Box>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

export default AuthorBlock;
