import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import Expanded from "components/common/Expanded/Expanded";
import HubspotFormModal from "components/common/HubspotFormModal";
import type { BodyType } from "types/section";

import * as classes from "./staticBlogCtaBanner.module.css";

/**
 * The "Ready to learn more?" banner every blog and webinar post shows under the
 * article. On Contentful pages it comes from a shared CMS entry; here it is fixed
 * copy, so a migrated post does not depend on the CMS.
 *
 * The form is HubSpot portal 20880193, form ccd3ffde-09ef-492c-8f91-a500255d2735,
 * taken from that CMS entry's embed. HubspotFormModal expects the Contentful
 * rich-text shape and reads the form ids out of the script text, so the same shape
 * is built by hand below and the component stays unchanged.
 */

const HUBSPOT_EMBED = {
  raw: JSON.stringify({
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [
          {
            nodeType: "text",
            value:
              'hbspt.forms.create({ region: "na1", portalId: "20880193", formId: "ccd3ffde-09ef-492c-8f91-a500255d2735" });',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  }),
  references: [],
} as unknown as BodyType;

export const StaticBlogCtaBanner: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Expanded
      id="static-blog-cta-banner"
      data-banner={true}
      data-v1={true}
      fullWidth
      background="#F4F4F4"
      py={120}
      px={{ base: 0, sm: 40, md: 106 }}
    >
      <Container size="xl">
        <Paper radius={0} className={classes.card}>
          <Grid gutter={0} align="center" justify="space-between">
            <Grid.Col span={{ base: 12, md: 9, lg: 10 }}>
              <Box>
                <Title order={3}>Ready to learn more?</Title>
                <Divider
                  variant="dashed"
                  size={1}
                  style={{ maxWidth: 404 }}
                  my={10}
                />
                <Text size="md" mt="sm" mb={11}>
                  Our consultants will work with you to analyze your current
                  channel strategy and make recommendations for how to improve
                  patient access and increase the percentage of scripts getting
                  covered by insurance.
                </Text>
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3, lg: 2 }}>
              <Modal
                size="ls"
                p={0}
                opened={openForm}
                onClose={() => {
                  setOpenForm(false);
                }}
              >
                <HubspotFormModal hubspotEmbed={HUBSPOT_EMBED} />
              </Modal>
              <Group className={classes.group}>
                <Button
                  variant="philDefault"
                  onClick={() => {
                    setOpenForm(true);
                  }}
                >
                  Contact us
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Expanded>
  );
};
