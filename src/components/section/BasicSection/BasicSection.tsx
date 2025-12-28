import React from "react";
import { createPortal } from "react-dom";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  List,
  Portal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Asset from "components/common/Asset/Asset";
import ImageContainer from "components/common/Container/ImageContainer";
import { Link, Script } from "gatsby";
import { GatsbyImage, getImage, type ImageDataLike } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import slugify from "slugify";
import type { BackgroundType, ISection } from "types/section";
import { getLink } from "utils/getLink";
import { marked } from "marked";
import { isVideoContent } from "utils/isVideoContent";
import { handleSpacing } from "utils/handleSpacing";
import { isProduction } from "utils/isProduction";
import ContactForm from "components/ContactPageForm/ContactForm";
import { useId, useViewportSize } from "@mantine/hooks";
import PageContext from "contexts/PageContext";
import { CONTACT_PAGE, OUR_SOLUTIONS } from "constants/page";
import HubspotForm from "components/common/HubspotForm/HubspotForm";
import { parseScript } from "utils/parseScript";
import { IconArrowRight } from "@tabler/icons";

import cx from "clsx";
import * as classes from "./basicSection.module.css";
import { getColorFromStylingOptions } from "utils/stylingOptions";
import useDeviceType from "hooks/useView";
import { useIsSmallDevice } from "hooks/useIsSmallDevice";
import { extractAssetData } from "utils/asset";

import { BUTTON_STYLE, COLORS, LAYOUT_12COL, LIGHT_COLOR_LIST } from "constants/global.constant";

import InfoCircleIcon from "assets/images/icons/component/info-circle";

type BasicSectionProps = {
  section: ISection;
  index: number;
  isEmbedFormTemplate: boolean;
};

/**
 * BasicSection is a Component which has 2 columns; A RichText column and a ImageContainer column
 * @param props : {section, index}
 * @returns BasicSection Component which contains a text column and a image container column
 */
// eslint-disable-next-line complexity
const BasicSection: React.FC<BasicSectionProps> = ({
  section,
  index,
  isEmbedFormTemplate, 
}) => {
  const HERO_SECTION_INDEX = 0; // Hero section index is always 0
  const NUMBER_OF_COLUMNS = 2; // Basic section will always have 2 columns
  const ORDER_FIRST = 1;
  const ORDER_SECOND = 2;
  const HEADING_FIRST = 1;
  const HEADING_SECOND = 2;
  const context = React.useContext(PageContext);
  const isImageAlignToWall = section?.canShowAssetImageAlignToWall;
  const isImageAlignToLeftWall = isImageAlignToWall && section?.canShowTextColumnToRight
  const theme = useMantineTheme();

  const richTextImages: Record<string, any> = {};

  const uuid = useId();
  const { width } = useViewportSize();
  const isDesktop = useDeviceType("xl");
  const isMobileView = !isDesktop;
  const span =
    LAYOUT_12COL /
    (section?.renderOptions?.layoutOptions?.numberOfColumns ?? 1);
  const isOneColumn =
    section?.renderOptions?.layoutOptions?.numberOfColumns === 1;

  const bgColor = getColorFromStylingOptions(section.stylingOptions?.background)
  const isBgColorLight = LIGHT_COLOR_LIST.includes(bgColor ?? COLORS.LIGHT); 

  // eslint-disable-next-line array-callback-return
  section?.body?.references?.map((reference: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    richTextImages[reference.contentful_id] = {
      image: reference.gatsbyImageData,
      alt: reference.title,
    };
  });

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET](node) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const imageData = richTextImages[node.data.target.sys.id];
        const image = getImage(imageData.image as ImageDataLike);
        const targetImage= node.data?.target;

        return (
          <div className={classes.embeddedAsset}>
            {image 
            ? <GatsbyImage
                style={{
                  marginBottom: `${handleSpacing(theme, theme.spacing.md)}px`,
                }}
                image={image!}
                alt={""}
                />
            : (targetImage &&
              <div>
                <Asset asset={targetImage} />
              </div>
            )}
          </div>
        );
      },

      // TODO: Refactor this
      [BLOCKS.EMBEDDED_ENTRY](node, children) {
        if (node?.data?.target) {
          const { target } = node.data;
          const isSecondaryAltButton =
            node.data.target.buttonStyle === BUTTON_STYLE.Secondary;
          const button = (
            <Button
              className={cx(classes.button, {
                [classes.secondaryBtn]: isSecondaryAltButton,
              })}
              variant={isSecondaryAltButton ? "white" : "philDefault"}
            >
              {node.data.target.buttonText}
            </Button>
          );

          if (target?.link?.internalContent) {
            const { link } = getLink(target, true);

            return !isDesktop ? (
              <Portal target={`#${uuid}`}>
                <Link
                  data-video={isVideo()}
                  data-oneColumn={isOneColumn}
                  className={classes.internalLink}
                  to={link}
                >
                  {button}
                </Link>
              </Portal>
            ) : (
            <div className ={classes.bottomSection}>
              <Link
                data-video={isVideo()}
                data-oneColumn={isOneColumn}
                className={classes.internalLink}
                to={link}
              >
                {button}
              </Link>

              {/* TODO: better to handle from contentful instead of hardcoding */}
              {index === 0 && context.title === OUR_SOLUTIONS && 
                <div className={classes.greenAnchorContainer}>
                  <Anchor
                    className={classes.greenAnchor}
                    href={"https://phil.us/solution/direct"}
                  >
                    <div className={`anchor-text ${classes.leftColumnLink}`}>
                      {"Explore PHIL Direct"}
                      <IconArrowRight size={16} />
                    </div>
                  </Anchor>
                </div>
              }
            </div>
            );
          }

          return (
            <Anchor
              className={classes.externalLink}
              href={target?.link?.externalUrl ?? "#"}
              target="_blank"
              referrerPolicy="no-referrer"
              data-video={isVideo()}
              >
              {button}
            </Anchor>
          );
        }

        return null;
      },

      [BLOCKS.PARAGRAPH](node, children) {
        return (
          <Text
            data-index={index}
            data-context={context.title}
            data-is-embed-form-template={isEmbedFormTemplate}
            data-video={isVideo()}
            className={classes.body}
            data-oneColumn={isOneColumn}
            data-is-bgcolor-light={isBgColorLight}
            >
            {children}
          </Text>
        );
      },
      [BLOCKS.UL_LIST](node, children) {
        return (
          <List
            type="unordered"
            className={classes.list}
            data-video={isVideo()}
            data-index={index}
            data-context={context.title}
          >
            {children}
          </List>
        );
      },
      [BLOCKS.OL_LIST](node, children) {
        return (
          <List type="ordered" data-video={isVideo()} className={classes.list}>
            {children}
          </List>
        );
      },
      [BLOCKS.LIST_ITEM](node, children) {
        return (
          <List.Item
            classNames={{
              itemWrapper: classes.listItemWrapper,
              itemLabel: classes.listItemLabel,
              item: classes.listItem,
            }}
          >
            {children}
          </List.Item>
        );
      },
      [BLOCKS.HEADING_1](node, children) {
        if (isMobileView && index === 0 && context.title === "Demo Page") {
          return null;
        }

        return (
          <Title
            order={1}
            data-context={context.title}
            className={classes.title}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_2](node, children) {
        return (
          <Title order={2} className={cx(classes.title, classes.heading2)} data-context={context.title}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title order={3}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_4](node, children) {
        return (
          <Title order={4} className={classes.title}>
            {children}
          </Title>
        );
      },

      [INLINES.HYPERLINK](node, children) {
        const canShowArrowIcon = context?.title === "Company" && node?.content[0]?.value === "Explore Open Roles";
        return (
          <Anchor className="phil-hyperlink-underline" href={node.data.uri as string} target={canShowArrowIcon ? "_self" :"_blank"}>
            {children}
            {canShowArrowIcon &&
              <span className={classes.arrowIconWrapper}>
                <IconArrowRight size={20} />
              </span>
            }
          </Anchor>
        );
      },
    },
  };

  const heroRef = React.useRef(null);
  
  // Determine if the index is an even column
  const isEvenColumn = index % NUMBER_OF_COLUMNS === 0;
  let textColumnOrder = isEvenColumn ? ORDER_FIRST : ORDER_SECOND;
  let imageColumnOrder = isEvenColumn ? ORDER_SECOND : ORDER_FIRST;
  
  if (!section.automaticOrder) {
    textColumnOrder = ORDER_FIRST;
    imageColumnOrder = ORDER_SECOND;
  }
  
  if(section?.canShowTextColumnToRight){
    textColumnOrder = ORDER_SECOND;
    imageColumnOrder = ORDER_FIRST;
  }

  const isHeroSection = index === HERO_SECTION_INDEX;
  const titleOrdering = isHeroSection ? HEADING_FIRST : HEADING_SECOND;
  const ref = React.useRef();
  const [height, setHeight] = React.useState<number>(790);
  const isBanner = section?.metadata?.tags?.some(
    ({ name }) => name === "BANNER_SECTION",
  );
  const isSolutionEmpowerFieldTeamsSection = section?.header === "Empower Field Teams with Real-Time Insights";
  const isSolutionGainEndToEndVisibilitySection = section?.header === "Gain End-to-End Visibility Across the Patient Journey";
  const isSolutionDrivingBrandSection = section?.header === "Driving Brand Success Through Outcomes-Based Partnership";

  let formId = "";
  let portalId = "";

  if (section.embedForm) {
    const [formProps] = parseScript(section.embedForm);

    formId = formProps.formId;
    portalId = formProps.portalId;
  }
  const isSmallDevice = useIsSmallDevice();
  

  React.useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientWidth as number);
    }
  }, [ref.current, width]);

  const sectionBackground = (background: BackgroundType) => {
    switch (background) {
      case "Grey":
        return "#f4f4f4";

      default:
        return "transparent";
    }
  };

  const isSectionV2 = section.v2Flag;

  const maw = () => {
    if(index === 0 && context.title === OUR_SOLUTIONS) {
      return 450;
    }

    return isBanner ? 300 : 400;
  };

  const hasYoutubeLink = isSectionV2
    ? Boolean(section?.mediaItem?.youtubeLink)
    : Boolean(section.youtubeVideoUrl);
  const mediaItemOrAsset = isSectionV2 ? section.mediaItem : section.asset;
  const youtubeVideoUrl = isSectionV2
    ? section?.mediaItem?.youtubeLink
    : section.youtubeVideoUrl;

  const calculateAspectRatio = () => (hasYoutubeLink ? 16 / 9 : undefined);

  const determineBackground = () => {
    if (isSectionV2) {
      return isVideoContent(section?.mediaItem?.media?.file?.contentType) ||
        hasYoutubeLink
        ? "transparent"
        : undefined;
    }

    return isVideoContent(section?.asset?.file?.contentType) || hasYoutubeLink
      ? "transparent"
      : undefined;
  };

  const isVideo = () => {
    if (isSectionV2) {
      return (
        isVideoContent(section?.mediaItem?.media?.file?.contentType) ||
        hasYoutubeLink
      );
    }

    return isVideoContent(section?.asset?.file?.contentType) || hasYoutubeLink;
  };
  
  const { media } = extractAssetData(mediaItemOrAsset, youtubeVideoUrl);
  return (
    <>
   {Boolean(section.addBorder) && <Container className={classes.dividerContainer} size={"xl"}><Divider className={classes.divider}/></Container>}

    <Box style={{
      background: section.v2Flag
        ? getColorFromStylingOptions(section.stylingOptions?.background)
        : sectionBackground(section.background),
      }} className={cx(classes.basicSectionMainContainer, section.slug)}
    >
      <>
      {section?.backgroundAssetImage && 
        <div className={classes.rightBackgroundIcon}>
          <Asset
              asset={section.backgroundAssetImage}
          />
          </div>
      }
    <Container
      id={slugify(section.header, { lower: true, strict: true })}
      size={"xl"}
      className={cx(classes.basicSectionContainer,{
        [classes.empowerSection]: isSolutionEmpowerFieldTeamsSection,
        [classes.gainSection]: isSolutionGainEndToEndVisibilitySection,
        [classes.drivingSection]: isSolutionDrivingBrandSection,
      })}
      data-index={index}
      data-context={context.title}
      data-is-embed-form-template={isEmbedFormTemplate}
      data-oneColumn={isOneColumn}
    >
      {section?.canShowHeader && <Title className={classes.header} data-context={context.title}>{section.header}</Title>}
      <div className={classes.containSection}>
        <Grid
          align={
            section.isHubspotEmbed || section.embedForm
              ? "flex-start"
              : "center"
          }
          justify="flex"
        >
          {/* Text Grid Column */}
          <Grid.Col
            className={isEmbedFormTemplate ? classes.textGridColumn : undefined}
            order={textColumnOrder}
            span={{ base: 12, md: span }}
          >
            {section.isHubspotEmbed ? (
              <>
                {section?.header && (
                  <Title order={titleOrdering}>{section.header}</Title>
                )}
                {Boolean(section.subHeader?.subHeader.length) &&
                  context.title !== CONTACT_PAGE && (
                    <Title
                      order={3}
                      mt={handleSpacing(theme, theme.spacing.md)}
                    >
                      {section.subHeader?.subHeader}
                    </Title>
                  )}
                {context.title === CONTACT_PAGE && (
                  <>
                    {Boolean(section.subHeader?.subHeader.length) && (
                      <div
                        className={classes.contactSubheader}
                        dangerouslySetInnerHTML={{
                          __html: marked(section.subHeader!.subHeader, {
                            renderer: new marked.Renderer(),
                          }),
                        }}
                      />
                    )}
                  </>
                )}
                {/* <Divider size={1} variant="dashed" className={classes.divider} /> */}
                <Box>
                  <ContactForm section={section} />
                </Box>
              </>
            ) : (
              <>
                {Boolean(section.body) && (
                  <Stack className={classes.portal}>
                    {heroRef.current && isMobileView && section.embedForm
                      ? createPortal(
                          renderRichText(section.body, options),
                          heroRef.current,
                        )
                      : renderRichText(section.body, options)}
                  </Stack>

                )}
                {section?.sectionTitle && <Box className={classes.belowBodySection} data-context={context.title}>{section.sectionTitle}</Box>}
              </>
            )}
          </Grid.Col>
          {/* Hero Grid Column */}
          {/* TODO:: Handle in css */}
          {/* TODO: Refactor v2Flags and links */}
          {/* {((section.embedForm  || mediaItemOrAsset || youtubeVideoUrl) && !isImageAlignToWall) && */}
          {(section.embedForm  || mediaItemOrAsset || youtubeVideoUrl) &&
          <Grid.Col
            className={cx(classes.heroGridColumn, classes.embedFormTemplate, {[classes.hideDueToWallImage]: isImageAlignToWall})}
            ref={heroRef}
            order={imageColumnOrder}
            span={{ base: 12, md: span }}
            style={{
              height: context.title === CONTACT_PAGE ? height : undefined,
            }}
            data-is-embed-form-template={isEmbedFormTemplate}
            >
            <Group
              h={context.title === CONTACT_PAGE ? "100%" : undefined}
              classNames={{ root: classes.group }}
              gap={0}
              data-is-video={isVideo()}
              data-context={context.title}
              >
              {section.embedForm ? (
                <Box className={classes.formWrapper}>
                  <HubspotForm formId={formId} portalId={portalId} />
                </Box>
              ) : ((isSmallDevice) && section?.assetForMobile 
                    ? <div>
                        <Asset
                          className={classes.assetWallImage}
                          asset={section.assetForMobile}
                          />
                    </div>
                    :<ImageContainer
                      containerRef={ref}
                      contain
                      ratio={calculateAspectRatio()}
                      background={determineBackground()}
                      expanded={context.title === CONTACT_PAGE}
                      isVideo={isVideo()}
                      maw={maw()}
                      data-index={index}
                      data-context={context.title}
                      isGatsbyImageData={Boolean(media?.gatsbyImageData)}
                      >
                        <Asset
                          asset={mediaItemOrAsset}
                          objectFit="contain"
                          youtubeVideoURL={youtubeVideoUrl}
                          />
                    </ImageContainer>
                  )
                }
            </Group>
             {section?.assetCaption && 
                <Text className={cx(classes.assetCaption,{[classes.darkText]: isBgColorLight, [classes.lightText]: !isBgColorLight})}>
                <span className={classes.infoIcon}>
                <InfoCircleIcon size={18} />
                </span>
                {section.assetCaption}
                </Text>
              }
          </Grid.Col>
          }
        </Grid>

        <Box className={classes.portalBox} id={uuid}></Box>

        {section.isHubspotEmbed &&
        section.isInsertSnippet &&
        section.codeSnippet &&
        Boolean(section.codeSnippet.codeSnippet.length) &&
        isProduction ? (
          <Script defer async>
            {section.codeSnippet.codeSnippet
              .trim()
              .replace("<script>", "")
              .replace("</script>", "")}
          </Script>
        ) : null}

        {(isImageAlignToWall && mediaItemOrAsset) && 
          <div 
            className={cx(classes.wallImage, {[classes.leftWallImage]: isImageAlignToLeftWall, [classes.imageAdjust]:isImageAlignToWall})}   
            data-index={index}
            data-context={context.title}
            data-oneColumn={isOneColumn}
          >
            <Asset
              className={classes.assetWallImage}
              asset={mediaItemOrAsset}
            />
            {section?.assetCaption && 
              <Text className={cx(classes.assetCaption,{[classes.darkText]: isBgColorLight, [classes.lightText]: !isBgColorLight})}>
                <span className={classes.infoIcon}>
                  <InfoCircleIcon size={18} />
                </span>
                {section.assetCaption}
              </Text>
            }
          </div>
      }
      </div>
  
    </Container>
    </>
    </Box>
    {Boolean(section?.showBottomBorder) && <Container className={classes.dividerContainer} size={"xl"}><Divider className={classes.divider}/></Container>}
    </>
  );
};

export default BasicSection;
