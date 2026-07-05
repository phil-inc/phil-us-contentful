import React from "react";
import type { HeadFC } from "gatsby";

import PageTemplate, { Head as PageHead } from "templates/page";
import { contentfulPage, allContentfulModal } from "./_data";

// /company/ is now served from a local content snapshot instead of Contentful.
// It reuses the generic page template (the same one that rendered the Contentful
// "Company" page), fed from the captured section tree + modal nodes in ./_data.
const CompanyPage: React.FC = () => (
  <PageTemplate data={{ contentfulPage, allContentfulModal }} />
);

export default CompanyPage;

export const Head: HeadFC = (props) => (
  <PageHead
    data={{ contentfulPage }}
    location={{ pathname: props.location.pathname }}
  />
);
