import React, { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/lottie/Final Robot Hand Animation V2.json";
// import React, { useRef } from "react";
// import Lottie from "lottie-react";
// import animationData from "../assets/lottie/Final Robot Hand Animation V2.json";

const RobotHandAnimation = () => {
  const lottieRef = useRef<any>(null);

  const playAnimation = () => {
    lottieRef.current?.goToAndPlay(0, true); // replay from start
  };

  const stopAnimation = () => {
    lottieRef.current?.stop();
  };

  return (
    <div style={{ width: 300, maxWidth: "100%" }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
      />

      <div style={{ marginTop: 16 }}>
        <button onClick={playAnimation}>Play</button>
        <button onClick={stopAnimation} style={{ marginLeft: 8 }}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default RobotHandAnimation;

