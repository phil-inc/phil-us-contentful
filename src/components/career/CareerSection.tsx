import {
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Loader,
  Title,
  Text,
  useMantineTheme,
  Center,
} from "@mantine/core";
import Asset from "components/common/Asset/Asset";
import ImageContainer from "components/common/Container/ImageContainer";
import React from "react";
import type { TAsset } from "types/asset";
import { handleSpacing } from "utils/handleSpacing";
import CareerArticle from "./CareerArticle";

import * as classes from "./careerSection.module.css";

type CareerSectionProps = {
  heroAsset: TAsset;
  careers: Record<string, Listing[]>;
  isLoading: boolean;
};

const CareerSection: React.FC<CareerSectionProps> = ({
  careers,
  isLoading,
  heroAsset,
}) => {
  const theme = useMantineTheme();
  
  const isSVG = heroAsset?.file?.contentType === "image/svg+xml";

  return (
    <Container id={"Career Section"} fluid className={classes.container}>
      <Grid
        gutter={handleSpacing(theme, theme.spacing.lg)}
        pb={handleSpacing(theme, theme.spacing.xl)}
        align="flex-start"
      >
        <Grid.Col order={{ sm: 1 }} span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
          <Box className={classes.center}>
            <Group align={"center"} mb={80}>
              <Box>
                <Title order={1} className={classes.title}>
                  Careers at Phil
                </Title>
              </Box>
            </Group>
            {isLoading && (
              <Center h={200}>
                <Loader color="dark" size="xl" type="dots" />
              </Center>
            )}
            {!isLoading &&
              Object.keys(careers).map((job, index, array) => (
                <Box key={job} mb={index != array.length - 1 ? 48 : 0}>
                  <Title order={3} className={classes.jobTitle}>
                    {job}
                  </Title>
                  <Divider
                    variant="dashed"
                    size={1}
                    mt={theme.spacing.xs}
                    mb={20}
                  />
                  {careers[job].map((listing, index, array) => (
                    <Box
                      key={listing.url}
                      mb={index !== array.length - 1 ? 12 : 0}
                    >
                      <CareerArticle
                        title={listing.title}
                        url={listing.url}
                        location={listing.location}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
          </Box>
        </Grid.Col>
        <Grid.Col order={{ sm: 2 }} span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
          <ImageContainer data-is-svg={isSVG} fluid maw={"100%"}>
            <Asset asset={heroAsset} />
          </ImageContainer>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CareerSection;
