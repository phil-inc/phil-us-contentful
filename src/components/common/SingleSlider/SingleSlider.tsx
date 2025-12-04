import React from "react";
import cx from "clsx";
import { Slider, Text, Tooltip } from "@mantine/core";

import InfoCircleIcon from "assets/images/icons/component/info-circle";

import { SliderConfig } from "types/roi";

import * as classes from "./SingleSlider.module.css";

export type SingleSliderProps = {
  sliderProps: SliderConfig;
};
const SingleSlider: React.FC<SingleSliderProps> = ({ sliderProps }) => {
  const {
    title,
    actualValue,
    changeValue,
    min,
    max,
    step,
    marks,
    actulValueInString,
    tootipMsg,
  } = sliderProps;
  return (
    <div className={cx("phil-singleSlider", classes.singleSlider)}>
      <div className={classes.label}>
        <div className={classes.titleLabel}>
          <Text>{title}</Text>
          {tootipMsg && (
            <Tooltip
              label={tootipMsg}
              arrowPosition="side"
              arrowOffset={10}
              arrowSize={5}
              withArrow
            >
              <span className={classes.icon}>
                <InfoCircleIcon size={18} />
              </span>
            </Tooltip>
          )}
        </div>
        <Text>{actulValueInString}</Text>
      </div>

      <Slider
        value={actualValue}
        onChange={(v) => changeValue(v)}
        min={min}
        max={max}
        step={step}
        marks={marks}
        styles={{
          mark: { display: "none" },
          markLabel: {
            marginTop: 4,
          },
        }}
        classNames={{ markLabel: "sliderLabel" }}
      />
    </div>
  );
};
export default SingleSlider;
