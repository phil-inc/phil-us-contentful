import React from "react";
import cx from "clsx";
import { Button, Group, Anchor, Accordion, Text, Container, Divider, Box, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import Expanded from "components/common/Expanded/Expanded";
import { Link } from "gatsby";
import {
  type IReferencedSection,
  ReferenceTypeEnum,
  RenderOptions,
  ResourceBlocksEnum,
} from "types/section";
import { getLink } from "utils/getLink";
import slugify from "slugify";
import { getWindowProperty } from "utils/getWindowProperty";
import * as FullStory from "@fullstory/browser";
import { isProduction } from "utils/isProduction";
import { getIdSlugifyForDiv } from "utils/utils";
import mixpanel from "mixpanel-browser";
import PageContext from "contexts/PageContext";
import { FIELD_PAGE, HCP_PAGE, HOME, PATIENTS_PAGE,OUR_SOLUTIONS, PAGES_TITLE } from "constants/page";
import ReferencedSectionTitle from "./ReferencedSectionTitle";
import ReferencedSectionBody from "./ReferencedSectionBody";
import { getSectionColors } from "./RenderResource";

import * as classes from "./referencedSection.module.css";
import { getColorFromStylingOptions } from "utils/stylingOptions";
import Asset from "components/common/Asset/Asset";
import InfoCircleIcon from "assets/images/icons/component/info-circle";
import CommonReferencedSectionBody from "components/section/ReferencedSection/CommonReferencedSectionBody/CommonReferencedSectionBody";

import { useIsSmallDevice } from "hooks/useIsSmallDevice";

import { REFERENCE_SECTION } from "constants/global.constant";

type ReferencedSectionProps = {
  section: IReferencedSection;
  isEmbedFormTemplate: boolean;
  isPreviousBackgroundPure: boolean;
  addBorder: boolean
  index?: number;
  sectionIndex?: number;
};

/**
 * ReferencedSection is a Section Component that renders referenced resources.
 * @param props - {section} Section to be reference rendered
 * @returns Referenced Resources
 */

const ReferencedSection: React.FC<ReferencedSectionProps> = ({
  section,
  isEmbedFormTemplate,
  isPreviousBackgroundPure,
  index,
  sectionIndex=0
}) => { 
  const params = new URLSearchParams(getWindowProperty("location.search", {}));
  const GRID_COLUMNS = 12;
  const SPAN_LG = GRID_COLUMNS / section.references.length;
  const { link, isExternal } = getLink(section);
  const context = React.useContext(PageContext);
  const isSmallDevice = useIsSmallDevice();

  React.useEffect(() => {
    try {
      const isFromSMSIntro = params.get("isFromSMSIntro");
      if (
        section.referenceType === ReferenceTypeEnum["Stats Card with Arrows"] &&
        isFromSMSIntro === "true" &&
        isProduction
      ) {
        mixpanel.init(process.env.GATSBY_MIXPANEL_TOKEN ?? "");
        FullStory.init({ orgId: process.env.GATSBY_FULLSTORY_ORG_ID ?? "" });
        mixpanel.track("PhilIntro_SMS_Clicked");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, []);

  // TODO: Refactor Get grid span based on resource type
  const getSpan = (
    referenceType: string,
  ): { xl: number; lg: number; md: number; sm: number; xs?: number } => {
    switch (referenceType) {
      case ReferenceTypeEnum.Testimonial:
        return {
          xl: GRID_COLUMNS / 2,
          lg: GRID_COLUMNS,
          md: GRID_COLUMNS,
          sm: GRID_COLUMNS / 2,
        };

      case ReferenceTypeEnum["Stats Card with Arrows"]:
        return {
          xl: GRID_COLUMNS / 5,
          lg: GRID_COLUMNS / 3,
          md: GRID_COLUMNS / 3,
          sm: GRID_COLUMNS / 2,
          xs: GRID_COLUMNS / 2,
        };

      case ResourceBlocksEnum["Case Study"]:
      case ResourceBlocksEnum["Phil Blog"]:
      case ResourceBlocksEnum["Upcoming Events"]:
      case ResourceBlocksEnum["White Paper"]:
      case ReferenceTypeEnum["Featured Resource"]:
        return {
          xl: GRID_COLUMNS / 2,
          lg: GRID_COLUMNS,
          md: GRID_COLUMNS,
          sm: GRID_COLUMNS,
        };

      case ReferenceTypeEnum.FAQs:
        return {
          xl: GRID_COLUMNS / 2,
          lg: GRID_COLUMNS / 2,
          md: GRID_COLUMNS,
          sm: GRID_COLUMNS,
        };

      case ReferenceTypeEnum["Team Member"]:
        return {
          xl: GRID_COLUMNS / 4,
          lg: GRID_COLUMNS / 4,
          md: GRID_COLUMNS,
          sm: GRID_COLUMNS,
        };

      case ReferenceTypeEnum.Investors:
        return {
          xl: GRID_COLUMNS / 5,
          lg: GRID_COLUMNS / 5,
          md: GRID_COLUMNS,
          sm: GRID_COLUMNS,
        };
        
      default:
        return { xl: SPAN_LG, lg: SPAN_LG, md: GRID_COLUMNS, sm: GRID_COLUMNS };
    }
  };

  const [background, textColor] = getSectionColors(section.referenceType);

  const isNewsLetterComponent = section.references.some((ref) =>
    ref?.metadata?.tags?.some((tag) => tag.name === "Newsletter Component"),
  );

  const isFaqSection = section.references.some((ref) =>
    ref?.body?.references?.some((reff) => reff?.isFaq),
  );

  const isFaqId =
    slugify(section.header ?? section.id, { lower: true, strict: true }) ===
    "faqs";

  const isBrandOutcomeCardSection =
    section.referenceType === "Brand Outcome Card";

  const isProviderPage = context.title === HCP_PAGE;
  const isHomePageFirstCardSection =context.title === HOME && section.referenceType === ReferenceTypeEnum["Card Section"];
  const topImage = section?.topAsset;
  const asset = section?.asset;
  const assetMobile = section?.assetForMobile;

  let sectionContent;
  if (context.title === FIELD_PAGE) {
    sectionContent = (
      <Accordion
        variant="separated"
        radius="xs"
        chevronPosition="left"
        mb={24}
        chevronSize={44}
        classNames={{
          chevron: classes.chevron,
          label: classes.label,
          control: classes.accordionControl,
          content: classes.content,
          item: classes.item,
        }}
      >
        <Accordion.Item value={section.id}>
          <Accordion.Control>
            <ReferencedSectionTitle
              isEmbedFormTemplate={isEmbedFormTemplate}
              section={section}
              textColor={textColor}
              sectionIndex={sectionIndex}
            />
          </Accordion.Control>
          <Accordion.Panel>
            <ReferencedSectionBody getSpan={getSpan} section={section} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  } else if (section.referenceType === ReferenceTypeEnum["Commitment Card"]) {
    sectionContent = (
      <div className={classes.commitmentCard}>
        <div className={classes.commitmentCardLeftSection}>
          <h1 style={{fontSize: "40px", fontWeight: 700}}>{section.header}</h1>
          <p style={{fontSize: "18px", fontWeight: 400}}>{section.subHeading?.subHeading}</p>
        </div>
        
        <div className={classes.commitmentCardRightSection}>
        <ReferencedSectionBody getSpan={getSpan} section={section} />
        </div>
      </div>
    );
  } else {
    sectionContent = (
      <>
        {!isNewsLetterComponent &&
          Boolean(section.header?.length) &&
          Boolean(!section.hideHeader) && (
            <ReferencedSectionTitle
              section={section}
              isEmbedFormTemplate={isEmbedFormTemplate}
              textColor={textColor}
              index={index}
              sectionIndex={sectionIndex}
            />
          )
        }


        {/* TODO: if possible use the contentful here */}
        {section?.eyebrowHeading === "DIGITAL HUB" && (
          <div className={classes.extraLinkContainer}>
            <Anchor
              className={classes.greenAnchor}
              href={"https://phil.us/patients/"}
            >
              <div className={`anchor-text ${classes.leftColumnLink}`}>
                {"Explore Patient Experience"}
                <IconArrowRight size={16} />
              </div>
            </Anchor>
            <Anchor
              className={classes.greenAnchor}
              href={"https://phil.us/providers/#sending-a-script-to-philrx-is-easy"}
            >
              <div className={`anchor-text ${classes.leftColumnLink}`}>
                {"Explore HCP Experience"}
                <IconArrowRight size={16} />
              </div>
            </Anchor>
          </div>
        )}

        <Box 
          className={cx({[classes.innerBgSection]: Boolean(section?.innerBackgroundStyling)})}
          style={{background: section?.innerBackgroundStyling?.background ? getColorFromStylingOptions(section.innerBackgroundStyling.background) : undefined}} 
        >
          <ReferencedSectionBody getSpan={getSpan} section={section}/>

          {/* New references section */}
          { Boolean(section?.referenceSecond) && Boolean(section?.secondReferenceType) && Boolean(section?.referenceSecondRenderOptions) &&
            <>
              {Boolean(section?.secondReferenceTitle) && 
                <Title
                  data-context={context.title}
                  className={classes.secondTitle}
                  data-index={REFERENCE_SECTION.TWO}
                  order={2}
                >
                  {section.secondReferenceTitle}
                </Title>
                }
              <CommonReferencedSectionBody 
                header={section.header  }
                references={section.referenceSecond ?? []}
                referenceType={section.secondReferenceType as ReferenceTypeEnum | ResourceBlocksEnum}
                renderOptions={section.referenceSecondRenderOptions as RenderOptions}
                v2flag={section.v2flag}
                getSpan={getSpan}
                order={REFERENCE_SECTION.TWO}
                />
            </>
          }
          { Boolean(section?.referenceThird) && Boolean(section?.thirdReferenceType) && Boolean(section?.referenceThirdRenderOptions) &&
            <CommonReferencedSectionBody 
              header={section.header  }
              references={section.referenceThird ?? []}
              referenceType={section.thirdReferenceType as ReferenceTypeEnum | ResourceBlocksEnum}
              renderOptions={section.referenceThirdRenderOptions as RenderOptions}
              v2flag={section.v2flag}
              getSpan={getSpan}
              order={REFERENCE_SECTION.TWO}
            />
          }
          { Boolean(section?.referenceFourth) && Boolean(section?.fourthReferenceType) && Boolean(section?.referenceFourthRenderOptions) &&
            <CommonReferencedSectionBody 
              header={section.header  }
              references={section.referenceFourth ?? []}
              referenceType={section.fourthReferenceType as ReferenceTypeEnum | ResourceBlocksEnum}
              renderOptions={section.referenceFourthRenderOptions as RenderOptions}
              v2flag={section.v2flag}
              getSpan={getSpan}
              order={REFERENCE_SECTION.TWO}
            />
          }
        </Box>

      </>
    );
  }

  return (
    <>
      {Boolean(section.addBorder) && <Container className={classes.dividerContainer} size={"xl"}><Divider className={classes.divider}/></Container>}
    <Expanded
      id={getIdSlugifyForDiv(section?.eyebrowHeading || "")}
      background={
        section.v2flag
          ? getColorFromStylingOptions(section?.stylingOptions?.background)
          : background
      }
      fullWidth={section.referenceType === ReferenceTypeEnum["Image Carousel"]}
      backgroundAssetImage={section?.backgroundAssetImage ?? undefined}
      data-context={context.title}
      data-is-newsletter-component={isNewsLetterComponent}
      data-no-padding-bottom={isFaqId && isProviderPage}
      data-is-faq-section={isFaqSection}
      data-disable-border-top={!isPreviousBackgroundPure || isProviderPage}
      data-is-home-page-brand-outcome={
        isBrandOutcomeCardSection && context.title === HOME
      }
      data-referenceType={section.referenceType}
      pt={section.header?.length > 0 ? undefined : 0}
      leftBackgroundAssetImage={section?.leftBackgroundAssetImage}
      className = {classes.scrollSection}
    >
      <Container 
        id={slugify(section.header ?? section.id, { lower: true, strict: true })}
        className={cx(classes.container, classes.innerContainer, {[classes.topPaddingWithoutHeader]: (!section.header?.length) && section.referenceType === ReferenceTypeEnum["Card Or Image"] && context.title === PAGES_TITLE.SOLUTION_MAIN})} 
        size={"xl"}
      >
        {section?.eyebrowHeading && (
          <Text className={classes.eyebrowHeading} data-context={context.title} section-index={sectionIndex}>
            {section.eyebrowHeading}
          </Text>
        )}
        {topImage &&
        <div className={classes.topImage}>
          <Asset
            asset={topImage}
            objectFit="contain"
          />
         </div>
        }
        {context.title === HOME &&
        section.referenceType === ReferenceTypeEnum["Card Section"] && (
          <div
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <h1 className={cx(classes.title,{[classes.isDarkBanner]: isHomePageFirstCardSection})}>
              Medication Access, Simplified
            </h1>
            <p
            style={{marginBottom: "0px"}}
              className={cx(classes.subHeading,{[classes.isDarkBanner]: isHomePageFirstCardSection})}
              data-reference-type="Card Section"
            >
              Solving access barriers in retail and specialty-lite to improve
              patient outcomes and drive commercial success.
            </p>
          </div>
        )}

        {(context.title === OUR_SOLUTIONS || context.title === PAGES_TITLE.PHIL_DIRECT || context.title === PAGES_TITLE.SOLUTION_MAIN) && section.referenceType === ReferenceTypeEnum["Card Section"] && (
          <div
            style={{ display: "flex", justifyContent:"center"}}
          >
            <Text className={classes.recentClientNewsHeader} data-reference-type="Our Solution">
              {section?.header || ''}
            </Text>
          </div>
        )}
        {
          isSmallDevice 
          ? (assetMobile &&
            <div className={classes.topImage}>
              <Asset
                asset={assetMobile}
                objectFit="contain"
                />
            </div>
            )
            :(asset &&
              <div className={classes.topImage}>
              <Asset
                asset={asset}
                objectFit="contain"
                />
            </div>
          )
        }
        {section?.assetCaption && 
          <Text className={classes.assetCaption}>
            <span className={classes.infoIcon}>
              <InfoCircleIcon size={18} />
            </span>
            {section.assetCaption}
          </Text>
        }

          {sectionContent}

          {/* subheading */}
          {section.subHeading &&
            section.referenceType === ReferenceTypeEnum["Stepper Cards"] &&
            context.title === PATIENTS_PAGE && (
              <Group
                className={classes.subHeading}
                data-reference-type={section.referenceType}
                justify="center"
              >
                <Text>{section.subHeading.subHeading}</Text>
              </Group>
            )
          }
            
          {/* parent div for button */}
          <div
            style={{background: section?.divColorOfBtnParent?.background ? getColorFromStylingOptions(section.divColorOfBtnParent.background) : undefined}} 
            className={cx({[classes.parentBtnDiv]: Boolean(section?.divColorOfBtnParent)})}
          >

            {/* bottom buttons */}
            {Boolean(section.buttonText?.length) &&
              (Boolean(section.externalLink) || Boolean(section.internalLink)) && (
                <Group justify="center" mt={isFaqSection ? 80 : 44}>
                  {isExternal ? (
                    <Anchor 
                    className={classes.externalLink}
                    href={link}
                    target="_blank"
                    >
                      <Button variant="philDefault">{section.buttonText}</Button>
                    </Anchor>
                  ) : (
                    <Link className={classes.internalLink} to={link}>
                      <Button variant="philDefault">{section.buttonText}</Button>
                    </Link>
                  )}
                </Group>
              )}
              {section?.belowSubHeading?.belowSubHeading && (
                <Text className={classes.belowSubHeading}>
                  {section.belowSubHeading.belowSubHeading}
                </Text>
              )}
            </div>

          {/* philrx testimonial */}
          {(section.header === "What PhilRx Patients & Providers Say"  || section.header === "What PHIL Patients & Providers Say") && (
            <div className={classes.customTestiominalFooter}>
            <div className="trustpilot-widget" data-locale="en-US" data-template-id="5406e65db0d04a09e042d5fc" data-businessunit-id="60e5837e95cb800001e58b14" data-style-height="28px" data-style-width="100%">
              <a href="https://www.trustpilot.com/review/phil.us" target="_blank" rel="noopener">Trustpilot</a>
            </div>
          </div>
        )}
        </Container>
    </Expanded>
    {Boolean(section?.showBottomBorder) && <Container className={classes.dividerContainer} size={"xl"}><Divider className={classes.divider}/></Container>}
    </>
  );
};

export default ReferencedSection;
