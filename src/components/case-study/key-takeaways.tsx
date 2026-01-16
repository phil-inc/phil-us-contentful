import React from 'react';
import { Box, Text, Title } from '@mantine/core';
import * as classes from './key-takeaways.module.css';

type GraphQLTakeawayItem = {
  id: string;
  metricLabel: string;
  metricValue: string;
  metricDescription?: string;
};

type KeyTakeawaysProps = {
  takeawayList?: GraphQLTakeawayItem[];
};

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ 
  takeawayList
}) => {
  
  return (
    <Box className={classes.keyTakeaways}>
      <Title order={2} className={classes.mainTitle}>
        Key Takeaways
      </Title>
      
      {takeawayList?.map((takeaway: GraphQLTakeawayItem) => (
        <Box className={classes.takeawayItem} key={takeaway.id}>
          <Title order={3} className={classes.itemTitle}>
            {takeaway.metricLabel}
          </Title>
          <Box className={classes.itemDescription}>
            <Text className={classes.descriptionText}>
              {takeaway.metricDescription || takeaway.metricValue || ''}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default KeyTakeaways;