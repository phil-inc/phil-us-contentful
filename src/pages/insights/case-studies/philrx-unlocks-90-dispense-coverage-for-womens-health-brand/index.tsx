import React from "react";
import type { HeadFC } from "gatsby";

import CaseStudy, { Head as CaseStudyHead } from "templates/case-study";
import { data } from "./_data";

// /insights/case-studies/philrx-unlocks-90-dispense-coverage-for-womens-health-brand/ is now a static file-based page fed from a
// local content snapshot instead of the Contentful `allContentfulCaseStudy` loop.
const CaseStudyPage: React.FC = () => <CaseStudy data={data} />;

export default CaseStudyPage;

export const Head: HeadFC = (props) => (
  <CaseStudyHead data={data} location={{ pathname: props.location.pathname }} />
);
