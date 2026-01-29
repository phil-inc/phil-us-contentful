import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";


import { IReferencedSection } from "types/section";


import * as classes from "./AutoScrollingCarousel.module.css";
import AutoScroll from "embla-carousel-auto-scroll";

type Props = {
};
const AutoScrollingCarousel: React.FC<Props> = ({  }) => {

  
  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    dragFree: true, // important for smooth scrolling
  };

  const autoplay = React.useRef(
       AutoScroll({
      speed: 1.5,            // 🔥 controls smoothness (try 1–3)
      startDelay: 0,         // no pause at start
      stopOnInteraction: false,
      stopOnMouseEnter: true, // optional UX
    }),
  );

  const [emblaRef] = useEmblaCarousel(options, [autoplay.current]);
  const arr = [1,2,3, 4]

  return (
    <section className={classes.autoScrollSection}>
      
      <div
        className={classes.embla}
        ref={emblaRef}
        aria-roledescription="carousel"
      >
        <div className={classes.emblaContainer}>
          {arr.map((a, index: number) => (
            <div className={classes.emblaSlide} key={index}>
              <div className={classes.item}>{a}</div>
            </div>
          ))}
        </div>
      </div>
   
    </section>
  );
};

export default AutoScrollingCarousel;
