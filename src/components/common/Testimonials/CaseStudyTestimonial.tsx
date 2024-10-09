import React from "react";

import Asset from "../Asset/Asset";
import ImageContainer from "../Container/ImageContainer";

import { TAsset } from "types/asset";
import { Box, Grid, Image, Text } from "@mantine/core";

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
      <Grid justify="start" align="start">
        <Grid.Col span={5}>
          <Box className={classes.testimonialImageBox}>
            <ImageContainer data-testimonial-image-container={true}>
              <Asset asset={testimonial.testimonialImage} />
            </ImageContainer>
            <Image className={classes.quoteImage} src={image} />
          </Box>
        </Grid.Col>
        <Grid.Col span={7}>
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
