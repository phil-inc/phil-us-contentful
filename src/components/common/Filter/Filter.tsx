import {
  Accordion,
  Box,
  Card,
  Checkbox,
  Divider,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDebouncedState, useToggle, useViewportSize } from "@mantine/hooks";
import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import { generateSearchParams } from "utils/search";
import { navigate } from "gatsby";
import { searchSubmitCallback } from "pages/resources/search";
import * as classes from "./filter.module.css";

type FilterType = {
  values: string[];
  searchQueryParam: string;
  filterQueryParam: string[];
};

const Filter: React.FC<FilterType> = ({
  values,
  searchQueryParam,
  filterQueryParam,
}) => {
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  // TODO: handle mobile view
  const isMobileView = false;
  // Const {classes} = useStyles({isMobileView});
  const [value, toggle] = useToggle(["ResourcesType", null]);

  const [checkboxState, setCheckboxState] = React.useState<
    Record<string, boolean>
  >({});
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    const initCheckboxState = values.reduce(
      (obj, str) => ({ ...obj, [str]: filterQueryParam.includes(str) }),
      {},
    );

    setCheckboxState(initCheckboxState);
  }, [values, filterQueryParam]);

  return (
    <Card className={classes.navigationList} mb={36}>
      <Box>
        <Title size={24} order={4} mb={28}>
          Filter By:
        </Title>

        <SearchBox
          value={searchQueryParam}
          onSubmitCallback={(vs) => {
            const trueKeys = Object.entries(checkboxState)
              .filter(([key, value]) => value)
              .map(([key]) => key);

            searchSubmitCallback(vs.searchText, trueKeys);
          }}
          placeholder="Search"
          onChange={setSearchText}
        />
      </Box>

      {Boolean(values.length) && <Divider my={28} />}

      {Boolean(values.length) && (
        <Accordion
          value={value}
          chevronSize={24}
          classNames={{
            item: classes.item,
            content: classes.accordionContent,
            control: classes.accordionControl,
            chevron: classes.chevron,
          }}
        >
          <Accordion.Item value="ResourcesType">
            <Accordion.Control
              onClick={() => {
                toggle();
              }}
            >
              <Title size={24} order={4}>
                Content Type
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Box className={classes.sectionNavLinksContainer}>
                {values.map((value, index, array) => (
                  <React.Fragment key={value}>
                    <Checkbox
                      classNames={{
                        root: classes.checkboxRoot,
                        label: checkboxState[value]
                          ? classes.checkboxLabelChecked
                          : classes.checkboxLabel,
                      }}
                      onChange={(e) => {
                        const newState = {
                          ...checkboxState,
                          [value]: (e.target as HTMLInputElement).checked,
                        };

                        const trueKeys = Object.entries(newState)
                          .filter(([key, value]) => value)
                          .map(([key]) => key);

                        const path = generateSearchParams(trueKeys, searchText);

                        setCheckboxState({ ...newState });

                        void navigate("/resources/search/" + path);
                      }}
                      label={value}
                      checked={Boolean(checkboxState[value])}
                    />

                    {index !== array.length - 1 && <Divider my={0} />}
                  </React.Fragment>
                ))}
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Card>
  );
};

export default Filter;
