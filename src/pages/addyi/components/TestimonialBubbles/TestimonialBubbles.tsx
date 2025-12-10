import React from "react";
import { Box, Text } from "@mantine/core";

import decorativeDots from "@addyi/assets/icons/decorative-dots.svg";

import * as classes from "./TestimonialBubbles.module.css";

// Source: Group9/Group10 - Decorative dots
function DecorativeDots({ className }: { className?: string }) {
  return (
    <Box className={`${classes.decorativeDots} ${className || ""}`}>
      <img src={decorativeDots} alt="" className={classes.dotsImage} />
    </Box>
  );
}

// Source: Group21 - Christine testimonial bubble
function Group21() {
  return (
    <Box className={classes.testimonialBubbleWrapper}>
      <Box className={classes.testimonialBubble}>
        <Text className={classes.bubbleText}>
          "Getting Addyi® was not only simple with PhilRx, I could not believe
          the savings! And I love that my prescription is shipped right to my
          door. Thank you PhilRx for an excellent experience!"
        </Text>
      </Box>
      <DecorativeDots className={classes.dotsChristine} />
      <Box className={classes.authorInfo}>
        <Text className={classes.authorName}>Christine, 41</Text>
        <Text className={classes.authorDescription}>Actual Addyi® patient</Text>
      </Box>
    </Box>
  );
}

// Source: Group11 - Shannon testimonial bubble
function Group11() {
  return (
    <Box className={classes.testimonialBubbleWrapper}>
      <Box className={classes.testimonialBubble}>
        <Text className={classes.bubbleText}>
          "I had no desire. I thought it was just me… Something that happened as
          I got older. But then one of my girlfriends told me about Addyi® All I
          have to say is OMG… I wish I had learned about this sooner!"
        </Text>
      </Box>
      <DecorativeDots className={classes.dotsShannon} />
      <Box className={classes.authorInfo}>
        <Text className={classes.authorName}>Shannon, 44</Text>
        <Text className={classes.authorDescription}>Actual Addyi® patient</Text>
      </Box>
    </Box>
  );
}

// Source: Group28 - Testimonials container
export const TestimonialBubbles: React.FC = () => {
  return (
    <Box className={classes.testimonialsSection}>
      <Box className={classes.testimonialsContainer}>
        <Group21 />
        <Group11 />
      </Box>
    </Box>
  );
};
