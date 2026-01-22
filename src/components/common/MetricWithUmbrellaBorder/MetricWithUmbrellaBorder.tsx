import React from "react";
import { Box } from "@mantine/core";

import RenderResource from "components/section/ReferencedSection/RenderResource";

import { IReferencedSection } from "types/section";
import PageContext from "contexts/PageContext";

import * as classNames from "./MetricWithUmbrellaBorder.module.css";

type props = {
  section?: IReferencedSection;
  sectionIndex?: number;
};
const MetricWithUmbrellaBorder: React.FC<props> = ({
  section,
  sectionIndex,
}) => {
  const context = React.useContext(PageContext);
  return (
    <>
      <Box
        className={classNames.metricContainer}
        data-context={context.title}
        data-section-index={sectionIndex}
      >
        {section?.references && (
          <div className={classNames.metricGrid}>
            {section.references.map((item, index, array) => (
              <div key={index} className={classNames.item}>
                <RenderResource
                  arrayLength={array.length}
                  index={index}
                  referenceType={section.referenceType}
                  resource={item}
                  sectionHeader={section.header}
                  isEmployeeTag={false}
                  metadata={section.metadata}
                  sectionIndex={1}
                />
              </div>
            ))}
          </div>
        )}
      </Box>
    </>
  );
};

export default MetricWithUmbrellaBorder;
