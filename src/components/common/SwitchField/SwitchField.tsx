import React from "react";
import cx from "clsx";
import { Box, Switch, Text, Tooltip } from "@mantine/core";

import InfoCircleIcon from "assets/images/icons/component/info-circle";

import { ISwitchField } from "types/roi";

import * as classes from "./SwitchField.module.css";

export type SwitchFieldProps = {
  key: string;
  switchData: ISwitchField;
};
const SwitchField: React.FC<SwitchFieldProps> = ({ key, switchData }) => {
  const { keyName, title, changeValue, tooltipMsg, actualValue } = switchData;
  return (
    <Box key={key} className={cx("phil-SwitchField", classes.switchField)}>
      <div className={classes.label}>
        <div className={classes.titleLabel}>
          <Text>{title}</Text>
          {tooltipMsg && (
            <Tooltip
              label={tooltipMsg}
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
      </div>

      <Switch
        size="lg"
        onLabel="Yes"
        offLabel="No"
        onChange={(event) => {
          changeValue(event.currentTarget.checked);
        }}
        defaultChecked={actualValue}
      />
    </Box>
  );
};

export default SwitchField;
