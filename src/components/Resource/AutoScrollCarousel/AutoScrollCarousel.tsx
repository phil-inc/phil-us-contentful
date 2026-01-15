import React, { useContext } from "react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Button, Title } from "@mantine/core";
import { Link } from "gatsby";

import LeaderProfileCard from "components/LeaderProfileCard/LeaderProfileCard";

import { TResource } from "types/resource";
import { IReferencedSection } from "types/section";

import PageContext from "contexts/PageContext";
import { PATH } from "constants/routes";

import * as classes from "./AutoScrollCarousel.module.css";

type Props = {
  section: IReferencedSection;
};
const AutoScrollCarousel: React.FC<Props> = ({ section }) => {
  const context = useContext(PageContext);
  const TitleText = {
    sectionTitle : 'Meet Our Leadership Team',
    cardTitle: 'MEET THE LEADER',
    buttonText: 'Meet our Leaders'
  }
  
  const options: EmblaOptionsType = {
    loop: true, // infinite
    align: "start", // left-align the snaps
    slidesToScroll: 1, // move one card each step
    containScroll: "trimSnaps",
    duration: 30,
    dragFree: false,
  };

  const autoplay = React.useRef(
    Autoplay({
      delay: 5000, // "pause for a while" between moves
      stopOnInteraction: false, // keep autoplay after drags/clicks
      stopOnMouseEnter: false,
    }),
  );

  const [emblaRef] = useEmblaCarousel(options, [autoplay.current]);

  return (
    <section className={classes.autoScrollSection}>
      <Title order={2} className={classes.title}>
       {TitleText.sectionTitle}
      </Title>
      <div
        className={classes.embla}
        ref={emblaRef}
        aria-roledescription="carousel"
      >
        <div className={classes.emblaContainer}>
          {section.references.map((reference: TResource, index: number) => (
            <div className={classes.emblaSlide} key={reference?.id || index}>
              <LeaderProfileCard
                cardTitle={TitleText.cardTitle}
                reference={reference}
                canShowLinkedInBtn={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Link to={PATH.LEADERSHIP}>
          <Button variant="philDefault">{TitleText.buttonText}</Button>
        </Link>
      </div>
    </section>
  );
};

export default AutoScrollCarousel;
