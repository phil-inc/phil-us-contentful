import React from "react";
import {
  Container,
  type MantineTheme,
  useMantineTheme,
  Group,
} from "@mantine/core";
import { Article } from "components/common/Article";
import Asset from "components/common/Asset/Asset";
import { Banner } from "components/common/Banner/Banner";
import { CardWithImage } from "components/common/CardWithImage";
import CodeSnippet from "components/common/CodeSnippet/CodeSnippet";
import { FAQ } from "components/common/FAQ";
import { Featured } from "components/common/Featured";
import { PressRelease } from "components/common/Press/PressRelease";
import { ResourceCard } from "components/common/Resources/ResourceCard";
import Profile from "components/common/Team/Profile";
import { Testimonial } from "components/common/Testimonial";
import { PrescriberJourney } from "components/common/prescriberJourney/PrescriberJourney";
import { StatsCard } from "components/common/statsCard/StatsCard";
import { type TResource } from "types/resource";
import { Metadata, ReferenceTypeEnum, ResourceBlocksEnum } from "types/section";
import { handleSpacing } from "utils/handleSpacing";

import * as classes from "./renderResource.module.css";
import { CCard } from "components/common/CCard";
import StepperCard from "components/common/Card/StepperCard/StepperCard";
import { BrandOutcomeCard } from "components/brandOutcomeCard/BrandOutcomeCard";
import Cell from "components/common/Cell/Cell";
import { FaqAccordion } from "components/common/Accordion/FaqAccordion";
import { CardSection } from "components/common/Card/CardSection/CardSection";
import { CommitmentCard } from "components/CommitmentCard/CommitmentCard";
import { FeaturedInsights } from "components/FeaturedInsights/FeaturedInsights";
import { PhilPeople } from "components/common/PhilPeople/PhilPeople";
import CardOrImage from "components/common/CardOrImage/CardOrImage";
import BulletList from "components/BulletList/BulletList";
import MetricCard from "components/common/MetricCardComponent/MetricCardComponent";
import SingleLineMetricCard from "components/common/SingleLineMetricCard/SingleLineMetricCard";
import { FaqAccordionSingle } from "components/common/AccordionSingle/FaqAccordionSingle";

// TODO: Deprecate after v2.0.0
// Get colors for resources based on resource type
export const getSectionColors = (referenceType: string) => {
  switch (referenceType) {
    case ReferenceTypeEnum.Testimonial:
    case ReferenceTypeEnum["Image Carousel"]:
    case ReferenceTypeEnum.Location:
      return ["#1D818D", "white"]; // Green Background

    case ReferenceTypeEnum["Customer Story"]:
      return ["#00827E", "white"];

    case ReferenceTypeEnum.Banner:
    case ReferenceTypeEnum.Article:
    case ReferenceTypeEnum["Stats Card"]:
    case ReferenceTypeEnum["Stats Card with Arrows"]:
    case ReferenceTypeEnum["Prescriber Journey"]:
    case ReferenceTypeEnum["Info Card"]:
      return ["#F4F4F4", "black", "#FFFFFF"]; // Gray Background

    default:
      return ["#FFFFFF", "black"]; // White Background
  }
};

// Get colors for resources based on index
const getColor = (index: number) => {
  if (index % 3 === 0) {
    return "green";
  }

  if (index % 3 === 1) {
    return "blue";
  }

  return "yellow";
};

type ComponentFunctionProps = {
  resource: TResource;
  index?: number;
  arrayLength?: number;
  theme?: MantineTheme;
  classes?: any;
  resourceBackground?: string;
  isEmployeeTag?: boolean;
  metadata?: Metadata;
  sectionHeader?: string;
};

type ComponentFunction = (
  props: ComponentFunctionProps,
) => JSX.Element | undefined;

const CodeSnippetComponent: ComponentFunction = ({ resource }) => (
  <CodeSnippet resource={resource} />
);

const CellComponent: ComponentFunction = ({ resource }) => (
  <Cell resource={resource} />
);

const ArticleComponent: ComponentFunction = ({ resource, index }) => (
  <Article color={getColor(index!)} resource={resource} />
);

const CardComponent: ComponentFunction = ({
  resource,
  isEmployeeTag,
  metadata,
  arrayLength,
}) => (
  <CCard
    resource={resource}
    isEmployeeTag={isEmployeeTag}
    metadata={metadata}
    arrayLength={arrayLength}
  />
);

const StepperCardComponent: ComponentFunction = ({
  resource,
  index,
  arrayLength,
}) => (
  <StepperCard resource={resource} index={index!} arrayLength={arrayLength!} />
);

const TestimonialCompanyComponent: ComponentFunction = ({ resource }) => (
  <Testimonial type="company" resource={resource} />
);

const TestimonialPersonComponent: ComponentFunction = ({ resource }) => (
  <Testimonial type="person" resource={resource} />
);

const ResourceCardComponent: ComponentFunction = ({ resource }) => (
  <ResourceCard resource={resource} />
);

const FeaturedResourceComponent: ComponentFunction = ({ theme, resource }) => (
  <Featured
    noDivider={false}
    pr={handleSpacing(theme!, theme!.spacing.lg)}
    resourceBackground={"#f4f4f4"}
    resource={resource}
  />
);

const FeaturedInsightsComponent: ComponentFunction = ({ resource }) => (
  <FeaturedInsights resource={resource} />
);

const StatsCardComponent: ComponentFunction = ({ resource }) => (
  <StatsCard resource={resource} />
);
const BrandOutcomeCardComponent: ComponentFunction = ({ resource }) => (
  <BrandOutcomeCard resource={resource} />
);

const StatsCardWithArrowsComponent: ComponentFunction = ({
  resource,
  index,
  arrayLength,
}) => (
  <StatsCard
    resource={resource}
    arrow={true}
    index={index === arrayLength! - 1 ? undefined : index}
  />
);

const PrescriberJourneyComponent: ComponentFunction = ({ resource }) => (
  <PrescriberJourney resource={resource} />
);

const ProfileComponent: ComponentFunction = ({ resource }) => (
  <Profile resource={resource} />
);

const InvestorImageComponent: ComponentFunction = ({ resource, classes }) => (
  <Container className={classes.investorImage}>
    <Group align="center" justify="center">
      <Asset asset={resource.asset!} />
    </Group>
  </Container>
);

const PressReleaseComponent: ComponentFunction = ({ resource }) => (
  <PressRelease resource={resource} />
);

const CardWithImageComponent: ComponentFunction = ({ resource }) => (
  <CardWithImage resource={resource} />
);

const FAQComponent: ComponentFunction = ({ resource }) => (
  <FAQ resource={resource} />
);

const FaqAccordianSingleComponent: ComponentFunction = ({ resource }) => (
  <FaqAccordionSingle resource={resource} />
);

const ImageCarouselComponent: ComponentFunction = () => <></>;

const BannerComponent: ComponentFunction = ({ resource }) => (
  <Banner resource={resource} />
);

const FaqAccordianComponent: ComponentFunction = ({ resource }) => (
  <FaqAccordion resource={resource} />
);

const CardSectionComponent: ComponentFunction = ({
  resource,
  isEmployeeTag,
  metadata,
  arrayLength,
  sectionHeader,
}) => (
  <CardSection
    resource={resource}
    isEmployeeTag={isEmployeeTag}
    metadata={metadata}
    arrayLength={arrayLength}
    sectionHeader={sectionHeader}
  />
);

const CommitmentCardComponent: ComponentFunction = ({ resource }) => (
  <CommitmentCard resource={resource} />
);

const PeopleBehindPhilComponent: ComponentFunction = ({ resource }) => (
  <PhilPeople resource={resource} />
);

const CardOrImageComponent: ComponentFunction = ({ resource,index }) => (
  <CardOrImage resource={resource} index={index ?? 0}/>
);
const BulletListComponent: ComponentFunction = ({ resource,index }) => (
  <BulletList resource={resource} index={index ?? 0}/>
);
const MetricCardComponent: ComponentFunction = ({ resource,index }) => (
  <MetricCard resource={resource} index={index ?? 0}/>
);
const SingleLineMetricCardComponent: ComponentFunction = ({ resource,index }) => (
  <SingleLineMetricCard resource={resource} index={index ?? 0}/>
);

const getComponent = (
  referenceType: ReferenceTypeEnum | ResourceBlocksEnum,
  resource: TResource,
  index: number,
  arrayLength: number,
  theme: MantineTheme,
  classes: any,
  resourceBackground: string,
  metadata?: Metadata,
  isEmployeeTag?: boolean,
  sectionHeader?: string,
) => {
  const componentMappings: Record<
    ReferenceTypeEnum | ResourceBlocksEnum,
    ComponentFunction
  > = {
    [ReferenceTypeEnum.Article]: ArticleComponent,
    [ReferenceTypeEnum["Customer Story"]]: TestimonialCompanyComponent,
    [ReferenceTypeEnum.Testimonial]: TestimonialPersonComponent,
    [ResourceBlocksEnum["Phil Blog"]]: ResourceCardComponent,
    [ResourceBlocksEnum["Upcoming Events"]]: ResourceCardComponent,
    [ResourceBlocksEnum["White Paper"]]: ResourceCardComponent,
    [ResourceBlocksEnum["Case Study"]]: ResourceCardComponent,
    [ReferenceTypeEnum["Featured Resource"]]: FeaturedResourceComponent,
    [ReferenceTypeEnum["Info Card"]]: FeaturedResourceComponent,
    [ReferenceTypeEnum.Banner]: BannerComponent,
    [ReferenceTypeEnum["Stats Card with Arrows"]]: StatsCardWithArrowsComponent,
    [ReferenceTypeEnum["Prescriber Journey"]]: PrescriberJourneyComponent,
    [ReferenceTypeEnum["Team Member"]]: ProfileComponent,
    [ReferenceTypeEnum.Investors]: InvestorImageComponent,
    [ReferenceTypeEnum["Press Release"]]: PressReleaseComponent,
    [ReferenceTypeEnum.Location]: CardWithImageComponent,
    [ReferenceTypeEnum["Image Carousel"]]: ImageCarouselComponent,

    [ReferenceTypeEnum.Card]: CardComponent,
    [ReferenceTypeEnum["Code Snippet"]]: CodeSnippetComponent,
    [ReferenceTypeEnum["Stepper Cards"]]: StepperCardComponent,
    [ReferenceTypeEnum.FAQs]: FAQComponent,
    [ReferenceTypeEnum["Stats Card"]]: StatsCardComponent,
    [ReferenceTypeEnum["Brand Outcome Card"]]: BrandOutcomeCardComponent,
    [ReferenceTypeEnum.Cell]: CellComponent,
    [ReferenceTypeEnum["FAQ Accordion"]]: FaqAccordianComponent,
    [ReferenceTypeEnum["FAQ Accordion Single"]]: FaqAccordianSingleComponent,
    [ReferenceTypeEnum["Card Section"]]: CardSectionComponent,
    [ReferenceTypeEnum["Commitment Card"]]: CommitmentCardComponent,
    [ReferenceTypeEnum["Featured Insights"]]: FeaturedInsightsComponent,
    [ReferenceTypeEnum["People Behind Phil"]]: PeopleBehindPhilComponent,
    [ReferenceTypeEnum["Card Or Image"]]: CardOrImageComponent,
    [ReferenceTypeEnum["Bullet list"]]: BulletListComponent,
    [ReferenceTypeEnum["Metric card"]]: MetricCardComponent,
    [ReferenceTypeEnum["Single line Metric card"]]: SingleLineMetricCardComponent,
  };

  const componentFunction = componentMappings[referenceType];
  if (!componentFunction) {
    return null; // Handle unknown referenceType values
  }

  return componentFunction({
    resource,
    index,
    arrayLength,
    theme,
    classes,
    resourceBackground,
    metadata,
    isEmployeeTag,
    sectionHeader,
  });
};

type RenderResourceProps = {
  sectionHeader: string;
  resource: TResource;
  index: number;
  arrayLength: number;
  referenceType: ReferenceTypeEnum | ResourceBlocksEnum;
  isEmployeeTag: boolean;
  metadata?: Metadata;
};

const RenderResource: React.FC<RenderResourceProps> = ({
  sectionHeader,
  resource,
  index,
  arrayLength,
  referenceType,
  isEmployeeTag,
  metadata,
}) => {
  const theme = useMantineTheme();
  const [resourceBackground] = getSectionColors(referenceType);
  return getComponent(
    referenceType,
    resource,
    index,
    arrayLength,
    theme,
    classes,
    resourceBackground,
    metadata,
    isEmployeeTag,
    sectionHeader,
  );
};

export default RenderResource;
