import React, { useContext } from "react";
import {
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Text,
  Title,
} from "@mantine/core";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ITextandTextColumns, ReferenceBodyType } from "types/section";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import * as classes from "./textandtext.module.css";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {  navigate } from "gatsby";
import { IconArrowRight } from "@tabler/icons";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import cx from "clsx";
import PageContext from "contexts/PageContext";
import Asset from "components/common/Asset/Asset";
import ImageContainer from "components/common/Container/ImageContainer";
import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";
import { getHubspotFormDetails } from "utils/utils";
import { BUTTON_CONFIG } from "constants/global.constant";

const REPORT_FORM_SUBMITTED_KEY = "researchReportFormSubmitted";

interface CheckIconProps {
  size: number;
  color: string;
}

const slugify = (str: string): string => {
  if (str === undefined) return "";
  if (str === null) return "";
  return str.toLowerCase().replace(/\s+/g, '-');
};
const CheckIcon = ({ size, color }: CheckIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: size, marginTop: "2px" }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
    </svg>
  );
};

type TextAndTextColumnsProps = {
  data: ITextandTextColumns;
};

const renderColumn = (column: ReferenceBodyType, isFromRightColumn = false) => {
  if (!column) return null;

  const referenceMap = new Map<string, any>();

  column.references?.forEach((entry) => {
    referenceMap.set(entry?.sys?.id ?? entry?.id, entry);
  });

  const options: Options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        const entry = referenceMap.get(node.data.target?.sys.id);
        if (!entry) return null;

        return (
          <a href={`/${entry.slug}`} className="text-blue-600 underline">
            {node.content[0]?.value}
          </a>
        );
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const target = node.data.target;
        if (!target) return null;

        const entry = referenceMap.get(target?.sys?.id) ?? target;

        if (entry?.__typename === "ContentfulList") {
          const icon = entry.icon;
          const iconImage = icon?.gatsbyImageData ? getImage(icon) : null;
          return (
            <Box className={classes.listCard} key={entry.id}>
              <Flex gap={16} align="flex-start">
                <Box className={classes.listCardIconWrap}>
                  {iconImage ? (
                    <GatsbyImage image={iconImage} alt={icon?.title ?? ""} className={classes.listCardIconImg} />
                  ) : icon?.file?.url ? (
                    <img src={icon.file.url} alt={icon?.title ?? ""} className={classes.listCardIconImg} />
                  ) : (
                    <CheckIcon size={28} color="#00827E" />
                  )}
                </Box>
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Title order={4} className={classes.listCardHeading}>
                    {entry.heading}
                  </Title>
                  {entry.subheading && (
                    <Text className={classes.listCardSubheading}>
                      {entry.subheading}
                    </Text>
                  )}
                </Box>
              </Flex>
            </Box>
          );
        }

        if (entry?.sys?.contentType?.sys?.id === "referencedSection") {
          return (
            <Box className={classes.referencedSectionBox}>
              <Title order={3}>{entry.title}</Title>
              {entry.subHeading?.subHeading && (
                <Text fz="md" mt={4}>
                  {entry.subHeading.subHeading}
                </Text>
              )}
            </Box>
          );
        }

        if (entry?.__typename === "ContentfulMediaItem") {
          const youtubeVideoUrl = entry?.youtubeLink;
          if (youtubeVideoUrl) {
            return (
              <div className={cx({[classes.rightColumnVideoWrapper]: isFromRightColumn})}>
                <Asset
                  asset={entry}
                  objectFit="contain"
                  youtubeVideoURL={youtubeVideoUrl}
                />
              </div>
            );
          }
          return null;
        }

        return null;
      },
    },
  };

  return (
    <div>
      <Box>{renderRichText(column, options)}</Box>
    </div>
  );
};

const GatedFormColumn: React.FC<{ column: any; fileUrl?: string }> = ({ column, fileUrl }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { formId, portalId } = getHubspotFormDetails(
    column?.raw ? { raw: column.raw } : undefined
  );

  React.useEffect(() => {
    if (sessionStorage.getItem(REPORT_FORM_SUBMITTED_KEY) === "true") {
      setIsSubmitted(true);
    }
  }, []);

  const handleFormSubmit = () => {
    sessionStorage.setItem(REPORT_FORM_SUBMITTED_KEY, "true");
    setIsSubmitted(true);
  };

  return (
    <Box className={classes.rightColumnForm}>
      {isSubmitted ? (
        <Box ta="center" py={20}>
          <Text fw={700} mb={12}>Thank you!</Text>
          {fileUrl && (
            <Anchor href={fileUrl} target="_blank" referrerPolicy="no-referrer">
              <Button variant="philDefault" w="100%">
                Download Report
              </Button>
            </Anchor>
          )}
        </Box>
      ) : (
        <>
          <Text fw={700} fz="sm" mb={4}>Get the full report</Text>
          <Text fz="xs" c="dimmed" mb="xs">
            Fill out the form below to download the PDF.
          </Text>
          <hr />
          <HubspotFormV2
            formId={formId}
            portalId={portalId}
            formMinHeight="200px"
            callbackFn={handleFormSubmit}
          />
        </>
      )}
    </Box>
  );
};

const renderRightColumn = (column: any, context: any) => {
  if (column?.references?.length > 0 && column?.references[0]?.__typename === "ContentfulMediaItem") {
    return renderColumn(column, true);
  }

  if (!column) return null;

  return (
    <div>
      <Box>{renderRichText(column)}</Box>

      <div>
        {column.references?.map((item: any) => {      
          return (
            <Flex gap={8} key={item.id} className={classes.listCheckIcon}>
              {!item.choose && <CheckIcon size={28} color="#00827E" />}
              <div className={cx(item.choose && classes.border)}>
                <Text data-context={context.title} className={classes.heading}>
                  {item.heading}
                </Text>
                <Text className={classes.subheading}>
                  {item.subheading}
                </Text>
              </div>
            </Flex>
          );
        })}
      </div>
    </div>
  );
};

const TextAndTextColumns = ({ data }: TextAndTextColumnsProps) => {
  const context = useContext(PageContext);

  const { heading, subHeadingText, leftColumn, rightColumn, addBorder, files } = data;
  const fileUrl = files?.[0]?.file?.url ?? files?.[0]?.url;

  const { formId, portalId } = getHubspotFormDetails(
    rightColumn?.raw ? { raw: rightColumn.raw } : undefined
  );
  const hasGatedForm = Boolean(formId && portalId);

  return (
    <>
      {addBorder && (
        <Container className={classes.container} size={"xl"}>
          <Divider size={"sm"} className={classes.divider} />
        </Container>
      )}

      <Container className="container" size={"xl"} py={{ base: 16, sm: 100 }}>
        <Box mb={100}>
          <Title order={2} ta={"center"} mb={20} id={slugify(heading)}>
            {heading}
          </Title>
          <Text ta={"center"}>{subHeadingText}</Text>
        </Box>

        <Grid gutter={48}>
          <Grid.Col span={{ base: 12, md: 6 }}>
              {renderColumn(leftColumn)}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} data-context={context.title} className={classes.rightColumn}>
            {hasGatedForm ? (
              <GatedFormColumn column={rightColumn} fileUrl={fileUrl} />
            ) : (
              renderRightColumn(rightColumn, context)
            )}
          </Grid.Col>
        </Grid>

        {/* TODO: if possible use button instead of link in contentful */}
        {Boolean(data?.link?.internalContent) && (
          <div className={classes.btnContainer}>
            <Button variant={"philDefault"} radius={0} className={classes.btn} onClick={() => navigate(`/${data?.link?.internalContent?.slug}`)}>
              <div className={classes.buttonText}>
                {data?.link?.linkLabel || ""}
              </div>
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default TextAndTextColumns;
