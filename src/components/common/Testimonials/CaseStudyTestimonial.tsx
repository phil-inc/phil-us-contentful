import React from "react";

import Asset from "../Asset/Asset";
import ImageContainer from "../Container/ImageContainer";

import { TAsset } from "types/asset";
import { Box, Center, Grid, Image, Text } from "@mantine/core";

import * as classes from "./caseStudyTestimonial.module.css";

import image from "assets/images/icons/quote.svg";

type CaseStudyTestimonialProps = {
  testimonial: {
    __typename: "ContentfulTestimonials";
    contentful_id: string;
    id: string;
    quoteText: {
      __typename: "contentfulTestimonialsQuoteTextTextNode";
      id: string;
      quoteText: string;
    };
    quoteTitle: string;
    sys: {
      id: string;
      type: "Entry";
    };
    testimonialImage: TAsset;
    authorName: string;
    authorTitle: string;
  };
};

const CaseStudyTestimonial: React.FC<CaseStudyTestimonialProps> = ({
  testimonial,
}) => {
  return (
    <Box className={classes.box}>
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Center>
            <Box className={classes.testimonialImageBox}>
              <ImageContainer
                data-testimonial-image-container={true}
                isGatsbyImageData={Boolean(
                  testimonial?.testimonialImage?.gatsbyImageData,
                )}
              >
                <Asset asset={testimonial.testimonialImage} />
              </ImageContainer>
              <Image className={classes.quoteImage} src={image} />
            </Box>
          </Center>
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Box className={classes.quote}>
            <Text className={classes.quoteTitle}>{testimonial.quoteTitle}</Text>
            <Text className={classes.quoteText}>
              {testimonial.quoteText.quoteText}”
            </Text>
            <Text className={classes.author}>{testimonial.authorName}</Text>
            <Text className={classes.authorTitle}>
              {testimonial.authorTitle}
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default CaseStudyTestimonial;
