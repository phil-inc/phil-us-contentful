import React, { useCallback, useRef, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";

import { QUOTE } from "../_data";
import { useScrollMeasure } from "./useScrollMeasure";
import * as classes from "../pharmaDtpResearch.module.css";

/** Sentences light up once they scroll above 65% of the screen height. */
const LIGHT_UP_AT = 0.65;

export const Perspective: React.FC = () => {
  const sentences = useRef<(HTMLSpanElement | null)[]>([]);
  const [lit, setLit] = useState(0);

  const measure = useCallback(() => {
    const line = window.innerHeight * LIGHT_UP_AT;
    let count = 0;
    sentences.current.forEach((sentence, i) => {
      if (sentence && sentence.getBoundingClientRect().top < line) count = i + 1;
    });
    setLit(count);
  }, []);

  useScrollMeasure(measure);

  return (
    <section id="perspective" className={classes.perspective}>
      <figure className={classes.quote}>
        <blockquote className={classes.quoteText}>
          <p>
            {QUOTE.sentences.map((sentence, i) => (
              <React.Fragment key={sentence}>
                {i > 0 && " "}
                <span
                  ref={(el) => {
                    sentences.current[i] = el;
                  }}
                  className={`${classes.quoteSentence} ${i < lit ? classes.quoteSentenceLit : ""}`}
                >
                  {sentence}
                </span>
              </React.Fragment>
            ))}
          </p>
        </blockquote>
        <figcaption className={classes.quoteAuthor}>
          <StaticImage
            src="../assets/deepak-thomas.png"
            alt={QUOTE.name}
            width={60}
            height={60}
            className={classes.quotePhoto}
            objectFit="cover"
            objectPosition="center 20%"
            placeholder="none"
          />
          <span>
            <span className={classes.quoteName}>{QUOTE.name}</span>
            <span className={classes.quoteRole}>{QUOTE.role}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
};
