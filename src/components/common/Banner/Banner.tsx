import {
  Paper,
  Container,
  Title,
  Divider,
  Button,
  Text,
  Grid,
  Anchor,
  Modal,
  Box,
  Group,
} from "@mantine/core";
import { Link, Script } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React, { useState } from "react";
import type { TResource } from "types/resource";
import { getLink } from "utils/getLink";
import { isProduction } from "utils/isProduction";
import HubspotFormModal from "../HubspotFormModal";
import Expanded from "../Expanded/Expanded";

import * as classes from "./banner.module.css";

type BannerProps = {
  resource: TResource;
};

/**
 * Banner is a Component to render a banner
 * @param props - {resource} Banner Resource with heading, body, buttonText, externalLink
 * @returns Banner Component
 */
export const Banner: FC<BannerProps> = ({ resource }) => {
  const {
    heading,
    body,
    buttonText,
    externalLink,
    isHubspotEmbed,
    hubspotEmbed,
  } = resource;
  const { link, isExternal } = getLink(resource);
  const [openHubspotModal, setopenHubspotModal] = useState(false);

  return (
    <>
      <Paper radius={0} className={classes.card}>
        <Grid gutter={0} align={"center"} justify="space-between">
          <Grid.Col span={{ base: 12, md: 9, lg: 10 }}>
            <Box>
              <Title order={3}>{heading}</Title>
              <Divider
                variant="dashed"
                size={1}
                style={{ maxWidth: 404 }}
                my={10}
              />
              {body && (
                <Text size="md" mt="sm" mb={11}>
                  {renderRichText(body)}
                </Text>
              )}
            </Box>
          </Grid.Col>
          {Boolean(buttonText?.length) &&
            (isHubspotEmbed ? (
              <Grid.Col span={{ base: 12, md: 3, lg: 2 }}>
                <Modal
                  size="ls"
                  p={0}
                  opened={openHubspotModal}
                  onClose={() => {
                    setopenHubspotModal(false);
                  }}
                >
                  <HubspotFormModal hubspotEmbed={hubspotEmbed!} />
                  {resource.isHubspotEmbed &&
                  resource.isInsertSnippet &&
                  resource.codeSnippet &&
                  Boolean(resource.codeSnippet.codeSnippet.length) &&
                  isProduction ? (
                    <Script>
                      {resource.codeSnippet.codeSnippet
                        .trim()
                        .replace("<script>", "")
                        .replace("</script>", "")}
                    </Script>
                  ) : null}
                </Modal>
                <Group className={classes.group}>
                  <Button
                    variant="philDefault"
                    onClick={() => {
                      setopenHubspotModal(true);
                    }}
                  >
                    {buttonText}
                  </Button>
                </Group>
              </Grid.Col>
            ) : (
              Boolean(externalLink?.length) && (
                <Grid.Col span={{ base: 12, md: 3, lg: 2 }}>
                  <Container>
                    {isExternal ? (
                      <Anchor
                        href={link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        <Button variant="philDefault">{buttonText}</Button>
                      </Anchor>
                    ) : (
                      <Link to={link}>
                        <Button variant="philDefault">{buttonText}</Button>
                      </Link>
                    )}
                  </Container>
                </Grid.Col>
              )
            ))}
        </Grid>
      </Paper>
    </>
  );
};

export const bannerFactory = (resource: TResource) => (
  <Expanded
    key={resource.id}
    id={resource.id}
    data-banner={true}
    data-v1={true}
    fullWidth
    background="#F4F4F4"
    py={120}
    px={106}
  >
    <Banner resource={resource} />
  </Expanded>
);

export const renderBanners = (bannersToRender: TResource[]) =>
  bannersToRender.map(bannerFactory);
