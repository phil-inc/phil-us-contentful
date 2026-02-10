import React, { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import PrescriptionJourneyData from "../../assets/lottie/PrescriptionJourneyData.json";

const PrescriptionJourney: React.FC = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieRef.current?.goToAndPlay(0, true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "100%" }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={PrescriptionJourneyData}
        loop={false}
        autoplay={false}
      />
    </div>
  );
};

export default PrescriptionJourney;
