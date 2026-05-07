import React from "react";
import * as classes from "./pullQuote.module.css";

type PullQuoteProps = {
  quote: string;
  author: string;
  role?: string;
};

const PullQuote: React.FC<PullQuoteProps> = ({ quote, author, role }) => (
  <figure className={classes.pullQuote}>
    <p className={classes.mark} aria-hidden="true">
      &ldquo;
    </p>
    <div className={classes.body}>
      <blockquote className={classes.quote}>{quote}</blockquote>
      <figcaption className={classes.who}>
        {author}
        {role && <span className={classes.sub}>{role}</span>}
      </figcaption>
    </div>
  </figure>
);

export default PullQuote;
