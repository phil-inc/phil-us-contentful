import React from "react";
import { Carousel } from "@mantine/carousel";
import { Container } from "@mantine/core";
import AutoScroll from "embla-carousel-auto-scroll";
import { EMPLOYEE_SPOTLIGHT_TAG } from "constants/identifiers";
import useDeviceType from "hooks/useView";
import { type IReferencedSection } from "types/section";
import RenderResource from "./RenderResource";
import * as classes from "./referencedSection.module.css";

type TestimonialCarouselProps = {
  section: IReferencedSection;
};

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ section }) => {
  const columns = section.renderOptions?.layoutOptions?.numberOfColumns ?? 1;

  const isEmployeeTag = section.metadata?.tags?.some(
    (tag) => tag.name === EMPLOYEE_SPOTLIGHT_TAG,
  );

  const autoScrollRef = React.useRef(
    AutoScroll({
      speed: 1,
      startDelay: 0,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  // Force embla to recalculate after mount to ensure proper layout
  const handleEmblaInit = (embla: any) => {
    setTimeout(() => {
      embla.reInit();
    }, 50);
  };

  const xs = useDeviceType("xs");
  const sm = useDeviceType("sm");
  const md = useDeviceType("md");

  const getSlideSize = () => ({
    base: "calc(84% - 16px)",
    sm: "calc(50% - 16px)",
    md: `${95 / columns}%`,
    xl: `${95 / columns}%`,
  });

  // Duplicate references for infinite loop effect
  const carouselReferences = [...section.references, ...section.references];

  return (
    <Container className="carousel__container" fluid>
      <Carousel
        style={{ maxWidth: "85%", margin: "0 auto" }}
        classNames={{
          root: classes.root,
          container: classes.carouselContainer,
          controls: classes.controls,
          control: classes.control,
        }}
        mt={80}
        slideGap={{ base: 16, md: 32 }}
        includeGapInSize={false}
        draggable={false}
        withControls={false}
        slideSize={getSlideSize()}
        getEmblaApi={handleEmblaInit}
        align="start"
        withIndicators={false}
        loop={true}
        plugins={[autoScrollRef.current]}
        slidesToScroll={xs || sm || md ? "auto" : columns}
        data-has-media-item={section.references.some(
          (reference) =>
            reference?.sys?.contentType?.sys?.id === "mediaItem" ?? false,
        )}
        data-is-employee-tag={Boolean(isEmployeeTag)}
      >
        {carouselReferences.map((resource, index) => {
          const isLastItem = index === carouselReferences.length - 1;
          return (
            <Carousel.Slide
              key={`${resource.id}-testimonial-carousel-${index}`}
              data-index={index % section.references.length}
              className={isLastItem ? classes.carouselRepeatGap : undefined}
            >
              <RenderResource
                arrayLength={section.references.length}
                index={index % section.references.length}
                referenceType={section.referenceType}
                resource={resource}
                sectionHeader={section.header}
                isEmployeeTag={Boolean(isEmployeeTag)}
              />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default TestimonialCarousel;
