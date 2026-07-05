import React from "react";

import Leadership from "templates/leadership";
import { contentfulPage } from "./_data";

// /leadership/ is now served from a local content snapshot instead of Contentful.
// The leadership template renders the team-member cards from the captured
// `references` collection in ./_data.
const LeadershipPage: React.FC = () => (
  <Leadership data={{ contentfulPage }} />
);

export default LeadershipPage;
