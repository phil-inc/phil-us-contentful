import React, { useContext } from "react";
import { Box, Title, Divider, Stack, type TitleOrder, Anchor } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { RESOURCE_BLOCKS } from "constants/section";
import { handleSpacing } from "utils/handleSpacing";
import { ReferenceTypeEnum, type IReferencedSection } from "types/section";

import * as classes from "./referencedSectionTitle.module.css";
import PageContext from "contexts/PageContext";
import { COMPANY_PAGE, HCP_PAGE, HOME, PATIENTS_PAGE } from "constants/page";
import { PHIL_DESK_FAQ } from "constants/routes";

import ExportIcon from "components/icons/Export.icon";

type ReferencedSectionTitleProps = {
  section: IReferencedSection;
  isEmbedFormTemplate: boolean;
  textColor: string;
  index?: number;
  sectionIndex: number;
};

const ReferencedSectionTitle: React.FC<ReferencedSectionTitleProps> = ({
  section,
  isEmbedFormTemplate,
  textColor,
  index,
  sectionIndex,
}) => {
  const theme = useMantineTheme();
  const { title } = useContext(PageContext);

  const isCardSection =
    section.referenceType === ReferenceTypeEnum["Card Section"];
    
  const isBrandOutcomeCardSection =
    section.referenceType === ReferenceTypeEnum["Brand Outcome Card"];

  const isHomePage = title === HOME;

  const patientFAQLinkElement = <>
    <Anchor
        href={PHIL_DESK_FAQ}
        target = "_blank"
    >
    <div className={classes.faqLink}>
      <div className="anchor-text">
        Get Support
      </div>
      <span>
        <ExportIcon width={20} height={20} color="#00827E"/>
      </span>
    </div>
    </Anchor>
  </>


  const renderTitle = (
    text: string,
    order?: TitleOrder,
    className?: string,
  ) => {
    const isFaqSectionPatients = title === "FAQs" && sectionIndex === 1;

    return (
      <div className={isFaqSectionPatients ? classes.faqTitleContainer : ""}>
        <Title
          data-context={title}
          data-is-home-brand-outcome={isBrandOutcomeCardSection && isHomePage}
          className={className}
          order={order}
          c={title === COMPANY_PAGE ? textColor : undefined}
          >
          {(title === PATIENTS_PAGE || title === HCP_PAGE) && text === "FAQs"
            ? "Frequently Asked Questions"
            : text}
        </Title>
        {isFaqSectionPatients &&
          patientFAQLinkElement
        }
      </div>
    );
  };

  // === Conditionally render header and subheading ===
  const showHeader = Boolean(section.header?.length) && !isCardSection;

  const showSubheading =
    Boolean(section.subHeading?.subHeading?.length) &&
    title !== PATIENTS_PAGE &&
    section.referenceType !== ReferenceTypeEnum["Stepper Cards"] &&
    !isCardSection;

  switch (true) {
    // === Handle referenced sections in resource block section ===
    case RESOURCE_BLOCKS.includes(section.referenceType):
      return (
        <Box mb={handleSpacing(theme, theme.spacing.md)}>
          {renderTitle(section.header, 3)}
          <Divider variant="dashed" size={1} className={classes.divider} />
        </Box>
      );

    // TODO: Refactor this
    // Handle referenced sections in code snippet section
    // case section.referenceType === ReferenceTypeEnum['Code Snippet']:
    // case section.referenceType === ReferenceTypeEnum['Brand Outcome Card']:
    // case section.referenceType === ReferenceTypeEnum['Cell']:
    // 	return (
    // 		<Stack
    // 			className={classes.codeSnippetStack}
    // 			mb={isEmbedFormTemplate ? 48 : undefined}
    // 			data-reference-type={section.referenceType}
    // 		>
    // 			{Boolean(section.header?.length) && renderTitle(section.header, 2, classes.heading)}
    // 			{Boolean(section.subHeading?.subHeading?.length) &&
    // 				renderTitle(section.subHeading.subHeading, 3, classes.subHeading)}
    // 		</Stack>
    // 	);

    default:
      return (
        <Stack
          className={classes.stack}
          mb={isEmbedFormTemplate ? 48 : undefined}
          data-reference-type={section.referenceType}
          data-context={title}
          data-index={index}
          section-index={sectionIndex}
        >
          {showHeader && renderTitle(section.header, 2, classes.heading)}

          {showSubheading &&
            renderTitle(section.subHeading.subHeading, 3, classes.subHeading)}
        </Stack>
      );
  }
};

export default ReferencedSectionTitle;
