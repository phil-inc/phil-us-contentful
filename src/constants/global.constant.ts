import { Reference } from './../types/section';
export const SCREEN_SIZES = {
  MOBILE: 480,
  TABLET: 768,
  SMALL_DESKTOP: 1024,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1536,
};

export const LAYOUT_12COL = 12;

export const BUTTON_STYLE = {
  Primary: "Primary",
  Secondary: "Secondary",
  OutlineSecondary: "Outline Secondary"
};

export const BUTTON_CONFIG = {
  primary: { variant: "header-primary", size: "md", uppercase: true },
  secondary: { variant: "header-secondary", size: "md", uppercase: true },
};

export const INITIAL_PROMPT_QUESTION = {
  PROMPT1:
    "What are the core components of high performing direct-to-patient models?",
  PROMPT2:
    "What criteria should we use to decide if DTP is right for our brand? ",
  PROMPT3:
    "What are some best practices for standing up a successful direct-to-patient program?",
};

//sessionStorage keys
export const TRUE_STRING = "true";
export const FALSE_STRING = "false";
export const SHOW_DTP_MODAL = "showDtpModal";
export const IS_CASE_STUDY_EMAIL_SUBMITTED = "caseStudyEmailSubmitted";
export const DTP_RESOURCES_EMAIL_SUBMITTED = "dtpResourcesEmailSubmitted";
export const ROI_EMAIL_SUBMITTED = "roiEmailSubmitted";
export const SHOW_INFOBAR = "showInfoBar"

export const CONTENTFUL_TYPES = {
  CASE_STUDY: "ContentfulCaseStudy",
  DOWNLABLE_RESOURCE: "ContentfulDownloadableResource",
  LIST : "ContentfulList",
  LINK: "ContentfulLink",
  PAGE: "ContentfulPage",
  BUTTON_GROUP: "ContentfulButtonGroup"
};

export const TIME_ZONE_USA = "America/Los_Angeles";


export const COLORS = {
  DARK: "#0A0A0A",
  LIGHT: "#FFFFFF",
}

export const LIGHT_COLOR_LIST = [COLORS.LIGHT];

export const REFERENCE_SECTION = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
};
export const ONE = 1;

export const NOT_AVAILABLE = "N/A";

export const BASIC_SECTION = "Basic Section";

export const NAVBAR_HEIGHT = 90;
export const INFOBAR_HEIGHT = 60;
export const ANNOUNCEMENR_BAR_HEIGHT = 58;
