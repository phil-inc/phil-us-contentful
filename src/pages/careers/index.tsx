import React from "react";
import type { HeadFC } from "gatsby";

import CareerTemplate, { Head as CareerHead } from "templates/career";
import { contentfulPage } from "./_data";

// /careers/ is now served from a local content snapshot instead of Contentful.
// The job listings themselves are unaffected — they are still fetched at runtime
// from the Ashby-backed edge function inside CareerTemplate.
const CareersPage: React.FC = () => (
  <CareerTemplate data={{ contentfulPage }} />
);

export default CareersPage;

export const Head: HeadFC = (props) => (
  <CareerHead
    data={{ contentfulPage }}
    pageContext={contentfulPage}
    location={{ pathname: props.location.pathname }}
  />
);
