import React from "react";
import { Link } from "gatsby";
import { Box, Button, Text, Title } from "@mantine/core";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import Asset from "components/common/Asset/Asset";
import { AnnouncementItems } from "types/section";

import * as classes from "./AnnouncementItem.module.css";

type AnnouncementItemProps = {
  items: AnnouncementItems;
};
const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ items }) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children: React.ReactNode) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },
      [BLOCKS.HEADING_6](node, children) {
        return (
          <Title order={6} className={classes.heading6}>
            {children}
          </Title>
        );
      },
    },
  };

  return (
    <>
      {items.map((item) => (
        <Box key={item.id} className={classes.itemBox}>
          <Box className={classes.detail}>
            {item.asset && <Asset asset={item.asset} objectFit="contain" />}
            <Box className={classes.body}>
              {renderRichText(item.body, options)}
            </Box>
          </Box>
          <div className={classes.btnContainer}>
            <Link
              className={classes.internalLink}
              to={`/${item.internalLink?.slug || ""}`}
            >
              <Button
                color="Black"
                className={classes.btn}
                variant={"white"}
              >
                {item?.buttonText || ""}
              </Button>
            </Link>
          </div>
        </Box>
      ))}
    </>
  );
};

export default AnnouncementItem;
