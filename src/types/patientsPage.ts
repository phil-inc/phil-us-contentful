import type { ColumnSection, Testimonial } from "./homePage";

type BenefitSection = {
  title: string;
  description: {
    description: string;
  };
  divider: boolean;
};

type FAQ = {
  question: string;
};

export type PatientPageType = {
  firstTwoColumnSection: ColumnSection;
  benefitSection: BenefitSection[];
  testimonialsSection: Testimonial[];
  faqSection: FAQ[];
};
