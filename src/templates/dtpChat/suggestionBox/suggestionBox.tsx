import React from "react";
import { Box } from "@mantine/core";

import * as classes from "./suggestionBox.module.css";

import { suggestionItem } from "templates/dtpChat/dtpChat";

type SuggestionBoxProps = {
  suggestions: suggestionItem[];
};

export const SuggestionBox: React.FC<SuggestionBoxProps> = ({
  suggestions,
}) => {
  return (
    <>
      <Box className={classes.suggestionsBox}>
        <div>Don't know what to ask? Try one of these:</div>
        {suggestions.map((suggestion, index) => (
          <div onClick={suggestion.func} className={classes.chip} key={index}>
            <span>{suggestion.title}</span>
          </div>
        ))}
      </Box>
    </>
  );
};

export default SuggestionBox;
