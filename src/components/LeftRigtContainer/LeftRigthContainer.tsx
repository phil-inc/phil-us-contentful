import React, { useContext } from 'react';
import * as classes from './LeftRightContainer.module.css';
import { Box, Grid } from '@mantine/core';
import { ISection, ISectionsArray } from 'types/section';
import cx from 'clsx';
import PageContext from 'contexts/PageContext';
import SectionColumn from 'components/sectionInColumn/SectionInColumn';
import Asset from 'components/common/Asset/Asset';
import { TAsset } from 'types/asset';
import { navigate } from 'gatsby';

type Props = {
  leftSection: ISectionsArray;
  rightSection: ISectionsArray;
  philLogo: TAsset;
  whiltePhilLogo: TAsset;
};

export default function LeftRightContainer({
  leftSection,
  rightSection,
  philLogo,
  whiltePhilLogo,
}: Props) {
  const { title } = useContext(PageContext);
  const lengthOfRightSection = rightSection.length;

  const renderPhilLogo = (logo: TAsset) => {
    return (
      <Box onClick={() => navigate('/')} className={classes.logo}>
        <Asset asset={logo} objectFit="contain" />
      </Box>
    );
  };

  const renderSection = (sections: ISectionsArray) => {
    let basicSectionCount = 0;
    const isEmbedFormTemplate = sections.some((section) =>
      Boolean((section as ISection)?.embedForm?.raw)
    );

    return sections
      .filter((section) => !section.isHidden)
      .map((section, index, array) => (
        <div
          className={classes.section}
          key={section.id + 'mapSectionComponent'}
        >
          <SectionColumn
            section={section}
            index={
              section.sectionType === 'Basic Section'
                ? basicSectionCount++
                : basicSectionCount
            }
            isEmbedFormTemplate={isEmbedFormTemplate}
            isPreviousBackgroundPure={Boolean(
              array[index - 1]?.stylingOptions?.background.includes('#FFFFFF')
            )}
            pageTitle={title}
          />
        </div>
      ));
  };

  return (
    <div className={classes.maincontainer}>
      <Grid gutter={0}>
        <Grid.Col
          className={cx(classes.gridBox, classes.left)}
          data-context={title}
          order={{ base: 2, sm: 2, md: 1, lg: 1 }}
          span={{
            base: 12,
            sm: 12,
            md: lengthOfRightSection ? 6 : 12,
            lg: lengthOfRightSection ? 6 : 12,
          }}
        >
          <section>
            <div className={classes.canShowLeftLogo}>
              {renderPhilLogo(whiltePhilLogo)}
            </div>
            {renderSection(leftSection)}
          </section>
        </Grid.Col>
        {lengthOfRightSection && (
          <Grid.Col
            className={cx(classes.gridBox, classes.right)}
            data-context={title}
            order={{ base: 1, md: 2 }}
            span={{ base: 12, md: 6 }}
          >
            <section>
              <div className={classes.canShowRightLogo}>
                {renderPhilLogo(philLogo)}
              </div>
              {renderSection(rightSection)}
            </section>
          </Grid.Col>
        )}
      </Grid>
    </div>
  );
}
