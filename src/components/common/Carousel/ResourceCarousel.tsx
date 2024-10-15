import { Carousel } from "@mantine/carousel";
import { Paper, Grid } from "@mantine/core";
import React from "react";
import type { FC } from "react";
import type { IReferencedSection } from "types/section";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import * as classes from "./resourceCarousel.module.css";
import Asset from "../Asset/Asset";
import ImageContainer from "../Container/ImageContainer";

type ResourceCarouselProps = {
  imageCaraouselSection: IReferencedSection;
};

export const ResourceCarousel: FC<ResourceCarouselProps> = ({
  imageCaraouselSection,
}) => {
  const slides = imageCaraouselSection.references.map((item) => {
    const isSvg = item.asset?.file.contentType === "image/svg+xml";

    return (
      <Carousel.Slide key={item.asset.id + "ResourceCarousel"}>
        <Paper radius={0} className={classes.card}>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 12 }}>
              <ImageContainer data-is-svg={isSvg} ratio={16 / 9}>
                <Asset asset={item.asset!} />
              </ImageContainer>
            </Grid.Col>
          </Grid>
        </Paper>
      </Carousel.Slide>
    );
  });

  return (
    <>
      <Carousel
        mt={28}
        classNames={{
          control: classes.control,
          controls: classes.controls,
          indicator: classes.indicator,
        }}
        slideSize={{ xs: "95%", lg: "44%" }}
        slideGap="sm"
        align="center"
        slidesToScroll={"auto"}
        withIndicators
        dragFree
        loop
        styles={{
          indicator: {
            width: 20,
            height: 20,
            border: "3px solid #FFFFFF",
            background: "#FFFFFF40",
            opacity: 1,
            boxShadow: "none",

            "&[data-active]": {
              background: "#FFF",
            },
          },
        }}
        nextControlIcon={<IconChevronRight size={30} color="#FFFFFF" />}
        previousControlIcon={<IconChevronLeft size={30} color="#FFFFFF" />}
      >
        {slides}
      </Carousel>
    </>
  );
};
