import { Container, Grid } from "@mantine/core";
import { COMPANY_PAGE } from "constants/page";
import PageContext from "contexts/PageContext";
import useDeviceType from "hooks/useView";
import React, { useContext } from "react";
import { TResource } from "types/resource";
import {
  ReferenceTypeEnum,
  RenderOptions,
  ResourceBlocksEnum,
} from "types/section";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

import * as classes from "./CommonReferencedSectionBody.module.css";
import { Carousel } from "@mantine/carousel";
import RenderResource from "components/section/ReferencedSection/RenderResource";
import cx from "clsx";

type props = {
  references: TResource[];
  referenceType: ReferenceTypeEnum | ResourceBlocksEnum;
  renderOptions: RenderOptions;
  header: string;
  v2flag?: boolean;
  order?: number;
  getSpan: (referenceType: string) => {
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs?: number;
  };
};

const CommonReferencedSectionBody: React.FC<props> = ({
  references,
  referenceType,
  renderOptions,
  header,
  v2flag,
  getSpan,
  order,
}) => {
  const { title } = useContext(PageContext);

  const isFiveLayout = renderOptions?.layoutOptions?.numberOfColumns === 5;
  const span = isFiveLayout
    ? 2
    : 12 / (renderOptions?.layoutOptions?.numberOfColumns ?? 1);

  const xs = useDeviceType("xs");
  const sm = useDeviceType("sm");
  const md = useDeviceType("md");
  const lg = useDeviceType("lg");

  const getGridGutter = () => {
    if (referenceType === ReferenceTypeEnum["Stepper Cards"]) return 0;
    return 36;
  };

  if (renderOptions?.layoutOptions.shouldRenderCarousel) {
    const columns = renderOptions.layoutOptions.numberOfColumns ?? 1;
    const getSlideSize = () => {
      
      return {
        base: "95%",
        sm: `calc(50% - 16px)`,
        md:
          referenceType === "Testimonial"
            ? `${95 / columns}%`
            : "calc50% - 32px)",
        xl: `${95 / columns}%`,
      };
    };

    return (
      <Container className="carousel__container" fluid>
        <Carousel
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
          previousControlIcon={<IconChevronLeft size={24} />}
          nextControlIcon={<IconChevronRight size={24} />}
          slideSize={getSlideSize()}
          align={"start"}
          loop={false}
          slidesToScroll={
            referenceType === "Testimonial"
              ? xs || sm || md
                ? "auto"
                : columns
              : 1
          }
          data-has-media-item={references.some(
            (reference) =>
              reference?.sys?.contentType?.sys?.id === "mediaItem" ?? false,
          )}
          data-context = {title}
        >
          {references.map((resource, index, array) => (
            <Carousel.Slide key={resource.id + "carouselItem"}>
              <RenderResource
                arrayLength={array.length}
                index={index}
                referenceType={referenceType}
                resource={resource}
                sectionHeader={header}
                isEmployeeTag={false}
              />
            </Carousel.Slide>
            )
          )}
        
        </Carousel>
      
      </Container>
    );
  }

  return (
    <Grid
      grow
      className={classes.grid}
      gutter={getGridGutter()}
      justify="center"
      align={title === COMPANY_PAGE ? "center" : "stretch"}
      data-add-margin={""}
      data-remove-top-margin={""}
      data-context={title}
      data-is-stepper-card={
        referenceType === ReferenceTypeEnum["Stepper Cards"]
      }
      data-reference-type={referenceType}
      data-order={order}
    >
      {references?.map((resource, index, array) => (
        <Grid.Col
          className={cx(classes.column)}
          p={referenceType === ReferenceTypeEnum.Investors ? 0 : undefined}
          key={resource.id + "mapReferencedSectionResource"}
          span={
            v2flag ? { base: 12, sm: span, md: span } : getSpan(referenceType)
          }
          data-reference-type={referenceType}
          data-is-first-item={Boolean(resource?.isFirstItem)}
        >
          <RenderResource
            arrayLength={array.length}
            index={index}
            referenceType={referenceType}
            resource={resource}
            sectionHeader={header}
            isEmployeeTag={false}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default CommonReferencedSectionBody;
