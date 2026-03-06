import React, { useRef, useEffect, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type LottieAssetProps = {
  url: string;
};

const LottieAsset: React.FC<LottieAssetProps> = ({ url }) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(data);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !animationData) return;

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
  }, [animationData]);

  if (!animationData) return null;

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "100%" }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
      />
    </div>
  );
};

export default LottieAsset;
