import {
  AspectRatio,
  Container,
  type MantineSpacing,
  type StyleProp,
} from "@mantine/core";
import React from "react";

import * as classes from "./imageContainer.module.css";
import PageContext from "contexts/PageContext";

type ImageContainerProps = {
  fluid?: boolean;
  ratio?: number;
  background?: string;
  children: React.ReactNode;
  expanded?: boolean;
  contain?: boolean;
  containerRef?: React.Ref<HTMLDivElement> | undefined;
  isVideo?: boolean;
  cover?: boolean;
  mx?: StyleProp<React.CSSProperties["margin"]>;
  maw?: MantineSpacing;
  mah?: MantineSpacing;
  card?: boolean;
  flexStart?: boolean;
  isGatsbyImageData?: boolean;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
  ratio,
  fluid = false,
  background = "#F4F4F4",
  children,
  expanded = false,
  contain = false,
  containerRef,
  isVideo = false,
  mx = "auto",
  card = false,
  maw = 335,
  flexStart = false,
  isGatsbyImageData = false,
  ...rest
}) => {
  const context = React.useContext(PageContext);

  return (
    <Container
      ref={containerRef}
      fluid={fluid}
      data-video={isVideo}
      data-expanded={expanded}
      data-context={context.title}
      data-card={card}
      data-flex-start={flexStart}
      className={classes.imageContainer}
      maw={maw}
      {...rest}
    >
      <AspectRatio
        className={classes.aspectRatio}
        data-context={context.title}
        data-contain={contain}
        data-is-gatsby-image-data={isGatsbyImageData}
        ratio={ratio}
        mx={mx}
      >
        {children}
      </AspectRatio>
    </Container>
  );
};

export default ImageContainer;
