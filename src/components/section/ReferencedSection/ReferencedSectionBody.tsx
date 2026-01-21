import RenderResource from "./RenderResource";
import * as classes from "./referencedSection.module.css";
import { Carousel } from "@mantine/carousel";
import { Center, Container, Grid } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { ResourceCarousel } from "components/common/Carousel/ResourceCarousel";
import { EMPLOYEE_SPOTLIGHT_TAG, MEDICATION_ACCESS_SIMPLIFIED } from "constants/identifiers";
import { COMPANY_PAGE, HOME } from "constants/page";
import PageContext from "contexts/PageContext";
import useDeviceType from "hooks/useView";
import React, { useContext } from "react";
import { type IReferencedSection, ReferenceTypeEnum } from "types/section";
import cx from 'clsx';

import AutoScrollCarousel from "components/Resource/AutoScrollCarousel/AutoScrollCarousel";

type ReferencedSectionBodyProps = {
  section: IReferencedSection;
  getSpan: (referenceType: string) => {
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs?: number;
  };
  sectionIndex?: number;
};

const ReferencedSectionBody: React.FC<ReferencedSectionBodyProps> = ({
  section,
  getSpan,
  sectionIndex,
}) => {
  const { title } = useContext(PageContext);

  const isFiveLayout =  section?.renderOptions?.layoutOptions?.numberOfColumns === 5;
  const span = isFiveLayout
    ? 2
    : 12 / (section?.renderOptions?.layoutOptions?.numberOfColumns ?? 1);
  const addMargin =
  section?.header?.length > 0 || section?.subHeading?.subHeading?.length > 0;
  const isEmployeeTag = section.metadata?.tags?.some(
    (tag) => tag.name === EMPLOYEE_SPOTLIGHT_TAG,
  );
  const canRemoveTopMargin = section?.header === "The Script Journey";

  const xs = useDeviceType("xs");
  const sm = useDeviceType("sm");
  const md = useDeviceType("md");
  const lg = useDeviceType("lg");

  if( title === COMPANY_PAGE && section?.canAlsoBeUseAsAutoCarousel){
    return <AutoScrollCarousel section={section} />;
  }

  if (section.renderOptions?.layoutOptions.shouldRenderCarousel) {
    const columns = section.renderOptions.layoutOptions.numberOfColumns ?? 1;
    const getSlideSize = () => {
      if (section.referenceType === "People Behind Phil") {
        return {
          base: "95%",
          sm: `${100 / 2}%`,
          md: `${95 / columns}%`,
          lg: `${95 / columns}%`,
          xl: `${95 / columns}%`,
        };
      }
      
      return {
        base: "95%",
        sm: `calc(50% - 16px)`,
        md:
          section.referenceType === "Testimonial"
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
          // slideSize={{base: '320px', sm: "calc(50% - 16px)", md: "calc50% - 32px)"}}
          // slidesToScroll={1}
          loop={false}
          slidesToScroll={
            section.referenceType === "Testimonial"
              ? xs || sm || md
                ? "auto"
                : columns
              : 1
          }
          data-has-media-item={section.references.some(
            (reference) =>
              reference?.sys?.contentType?.sys?.id === "mediaItem" ?? false,
          )}
          data-context = {title}
          data-is-employee-tag={Boolean(isEmployeeTag)}
        >
          {section.header === "Recent Client News" ? (
            section.references.map((resource, index, array) => {
                return (
                  <Carousel.Slide key={resource.id + "carouselItem"}>
                    <RenderResource
                      arrayLength={array.length}
                      index={index}
                      referenceType={section.referenceType}
                      resource={resource}
                      sectionHeader={section.header}
                      isEmployeeTag={Boolean(isEmployeeTag)}
                    />
                  </Carousel.Slide>
              )
            }
          )): (
          section.references.map((resource, index, array) => (
                <Carousel.Slide key={resource.id + "carouselItem"}>
                  <RenderResource
                    arrayLength={array.length}
                    index={index}
                    referenceType={section.referenceType}
                    resource={resource}
                    sectionHeader={section.header}
                    isEmployeeTag={Boolean(isEmployeeTag)}
                  />
                </Carousel.Slide>
          ))
        )}
        </Carousel>
      
      </Container>
    );
  }

  if (section.referenceType === ReferenceTypeEnum["Image Carousel"]) {
    return <ResourceCarousel imageCaraouselSection={section} />;
  }

  const isBrandOutcomeCardSection = section.referenceType === "Brand Outcome Card";

  const getGridGutter = () => {
    if (section.referenceType === ReferenceTypeEnum["Stepper Cards"] ||
          section.referenceType === ReferenceTypeEnum["Image Connnect To Two Card"] ||
          section.referenceType === ReferenceTypeEnum["Promo Card"]
    )
      return 0;
    return 36;
  };

  return (
    <Grid
      grow
      className={classes.grid}
      gutter={getGridGutter()}
      justify="center"
      align={title === COMPANY_PAGE ? "center" : "stretch"}
      data-add-margin={addMargin}
      data-remove-top-margin={canRemoveTopMargin}
      data-context={title}
      data-is-stepper-card={
        section.referenceType === ReferenceTypeEnum["Stepper Cards"]
      }
      data-reference-type={section.referenceType}
      data-is-home-page-brand-outcome={
        isBrandOutcomeCardSection && title === HOME
      }
    >
      {section.references.map((resource, index, array) => (
        <Grid.Col
          className={cx(classes.column)}
          p={
            section.referenceType === ReferenceTypeEnum.Investors
              ? 0
              : undefined
          }
          key={resource.id + "mapReferencedSectionResource"}
          span={
            section.v2flag
                ? { base: 12, sm: span, md: span  }
              : getSpan(section.referenceType)
          }
          data-reference-type={section.referenceType}
          data-is-home-page-brand-outcome={
            isBrandOutcomeCardSection && title === HOME
          }
        >
          <RenderResource
            arrayLength={array.length}
            index={index}
            referenceType={section.referenceType}
            resource={resource}
            sectionHeader={section.header}
            isEmployeeTag={Boolean(isEmployeeTag)}
            metadata={section.metadata}
            sectionIndex={sectionIndex}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ReferencedSectionBody;
