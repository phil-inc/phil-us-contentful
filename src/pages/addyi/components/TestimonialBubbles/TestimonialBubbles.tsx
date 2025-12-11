import React from "react";
import { Box } from "@mantine/core";

import decorativeDots from "@addyi/assets/icons/decorative-dots.svg";

import * as classes from "./TestimonialBubbles.module.css";

// Source: Group9/Group10 - Decorative dots
function DecorativeDots() {
  return (
    <Box className={classes.decorativeDots}>
      <img src={decorativeDots} alt="" className={classes.dotsImage} />
    </Box>
  );
}

export interface TestimonialBubbleProps {
  message: string;
  author: string;
  description: string;
  className?: string;
}

// Reusable Testimonial Bubble Component
export const TestimonialBubble: React.FC<TestimonialBubbleProps> = ({
  message,
  author,
  description,
  className,
}) => {
  return (
    <Box className={`${classes.testimonialBubbleWrapper} ${className || ""}`}>
      <Box className={classes.testimonialBubble}>
        <p className={classes.bubbleText}>{message}</p>
        <DecorativeDots />
      </Box>
      <Box className={classes.authorInfo}>
        <p className={classes.authorName}>{author}</p>
        <p className={classes.authorDescription}>{description}</p>
      </Box>
    </Box>
  );
};

// Source: Group28 - Testimonials container
export const TestimonialBubbles: React.FC = () => {
  return (
    <Box className={classes.testimonialsContainer}>
      <TestimonialBubble
        message="Getting Addyi® was not only simple with PhilRx, I could not believe the savings! And I love that my prescription is shipped right to my door. Thank you PhilRx for an excellent experience!"
        author="Christine, 41"
        description="Actual Addyi® patient"
        className={classes.alignRight}
      />
      <TestimonialBubble
        message="I had no desire. I thought it was just me… Something that happened as I got older. But then one of my girlfriends told me about Addyi® All I have to say is OMG… I wish I had learned about this sooner!"
        author="Shannon, 44"
        description="Actual Addyi® patient"
        className={classes.alignLeft}
      />
    </Box>
  );
};
