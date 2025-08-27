import { Anchor, Box, Button, Group, Image, Text, Title } from "@mantine/core";
import React, { ForwardedRef, useContext, useState } from "react";
import { Options } from "react-pdf/dist/cjs/shared/types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import ImageContainer from "components/common/Container/ImageContainer";
import Asset from "components/common/Asset/Asset";
import { ELinkedinIcon } from "components/common/Buttons/SocialButtons/ELinkedInIcon";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import cx from "clsx";
import * as classes from "./LeaderProfileCard.module.css";
import PageContext from "contexts/PageContext";
import { TResource } from "types/resource";

type LeaderProfileCardProps = {
  cardTitle?: string;
  reference: TResource;
  canShowLinkedInBtn: boolean;
};

const LeaderProfileCard: React.FC<LeaderProfileCardProps> = ({
  reference,
  cardTitle,
  canShowLinkedInBtn = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const { title } = useContext(PageContext);

  const { body, media, hyperlink } = reference;
  const pastCompanies = body.references;

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title order={3} className={cx(classes.heading, classes.heading3)}>
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_6](node, children) {
        return (
          <Title order={6} className={cx(classes.heading, classes.heading6)}>
            {children}
          </Title>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: () => null,
    },
  };

  return (
    <Box
      className={cx(classes.card)}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      data-context={title}
    >
      <div className={classes.textContainer}>
        {Boolean(cardTitle) && (
          <Title className={classes.cardTitle} data-context={title} order={6}>
            {cardTitle}
          </Title>
        )}
        <div>
          <Box>{body && renderRichText(body, options)}</Box>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <Group gap={13}>
            {pastCompanies?.map((company: any, index: number) => (
              <Image
                key={index}
                src={company.media.file.url}
                alt={company.media.title}
                height={20}
                style={{ objectFit: "cover", width: "auto" }}
              />
            ))}
          </Group>
        </div>
      </div>

      <ImageContainer fluid contain card className={classes.leaderImage}>
        <Asset asset={media.media} />
      </ImageContainer>

      {canShowLinkedInBtn && (
        <div className={classes.buttonContainer}>
          <Anchor
            href={hyperlink.externalUrl}
            underline="never"
            target="_blank"
            className={classes.textDecorationNone}
            w={"100%"}
            h="100%"
          >
            <Button
              size="lg"
              py={11}
              leftSection={
                !hovered ? (
                  <ELinkedinIcon />
                ) : (
                  <ELinkedinIcon firstFill="white" secondFill="#007EBB" />
                )
              }
              fullWidth
              variant="outline"
              color="#007EBB"
              className={classes.button}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Text lh={"16px"}>View LinkedIn Profile</Text>
            </Button>
          </Anchor>
        </div>
      )}
    </Box>
  );
};

export default LeaderProfileCard;
