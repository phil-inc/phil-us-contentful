import ePrescribingLogo from '../assets/scroll-circle-animation/e-prescribing.svg';
import fastEnrollmentLogo from '../assets/scroll-circle-animation/fast-enrollment.svg';
import paSubmissionLogo from '../assets/scroll-circle-animation/pa-submission.svg';
import coveredDispensesLogo from '../assets/scroll-circle-animation/covered-dispenses.svg';
import transparentCostsLogo from '../assets/scroll-circle-animation/transparent-costs.svg';
import homeDeliveryLogo from '../assets/scroll-circle-animation/home-delivery.svg';
import simpleRefillsLogo from '../assets/scroll-circle-animation/simple-refills.svg';

export interface CircleData {
  label: string;
  desc: string;
  bgVariant: 'light' | 'teal' | 'svg';
  logo: string;
}

export const CIRCLES: CircleData[] = [
  { label: 'e-Prescribing', desc: 'Familiar workflow with existing EMRs', bgVariant: 'light', logo: ePrescribingLogo },
  { label: 'Fast Enrollment', desc: '< 1-minute patient signup', bgVariant: 'teal', logo: fastEnrollmentLogo },
  { label: 'PA Submission', desc: 'Pre-filled forms for fewer clicks', bgVariant: 'svg', logo: paSubmissionLogo },
  { label: 'Covered Dispenses', desc: 'Broad network maximizes coverage', bgVariant: 'svg', logo: coveredDispensesLogo },
  { label: 'Transparent Costs', desc: 'Clear coverage and cost details', bgVariant: 'light', logo: transparentCostsLogo },
  { label: 'Home Delivery', desc: 'Scheduled delivery options', bgVariant: 'teal', logo: homeDeliveryLogo },
  { label: 'Simple Refills', desc: 'Easy enrollment in patient refills', bgVariant: 'light', logo: simpleRefillsLogo },
];

export const HEADER_PILLS: string[] = [
  'Digital Hub Services',
  'Integrated Dispense Network',
];

export const FOOTER_BADGE_TEXT =
  'End-to-end data & insights at the script, provider, payer, and program level';
