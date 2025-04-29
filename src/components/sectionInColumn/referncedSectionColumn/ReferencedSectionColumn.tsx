import {
  Divider,
  Grid,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { TResource } from 'types/resource';
import { IReferencedSection } from 'types/section';
import { getDescriptionFromRichtext } from 'utils/getDescription';
import * as classes from './ReferenceSectionColumn.module.css';

type Props = {
  section: IReferencedSection;
};

const ReferencedSectionColumn = ({ section }: Props) => {
  return (
    <section className={classes.section}>
      <Title order={3} className={classes.title}>
        {section.title}
      </Title>
      <Title order={3} className={classes.header}>
        {section.header}
      </Title>
      {section.subHeading?.subHeading && (
        <Text fz="md" mt={4} className={classes.subHeading}>
          {section.subHeading.subHeading}
        </Text>
      )}

      <Grid
        className={classes.gridCard}
        gutter={0}
        justify="center"
        align="center"
      >
        {section.references?.map((item: TResource) => {
          return (
            <Grid.Col key={item.id + "card"} span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
              <div className={classes.card}>
                <Text align='center' className={classes.cardTitle}>{item.heading}</Text>
                {item.body && (
                  <div>
                  <Text className={classes.cardBody} lineClamp={2}>
                    {getDescriptionFromRichtext(item?.body?.raw ?? '')}
                  </Text>
                  </div>
                )}
              </div>
            </Grid.Col>
          );
        })}
      </Grid>
      {Boolean(section.addBorder) && (
        <Divider size={'sm'} className={classes.divider} />
      )}
    </section>
  );
};

export default ReferencedSectionColumn;
