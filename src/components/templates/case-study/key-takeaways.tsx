import React from 'react';
import { Box, Text, Title } from '@mantine/core';
import * as classes from './key-takeaways.module.css';

type KeyTakeawayItem = {
  title: string;
  description: string;
};

type KeyTakeawaysProps = {
  situation?: KeyTakeawayItem;
  challenge?: KeyTakeawayItem;
  solution?: KeyTakeawayItem;
};

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ 
  situation, 
  challenge, 
  solution 
}) => {
  return (
    <Box className={classes.keyTakeaways}>
      <Title order={2} className={classes.mainTitle}>
        Key Takeaways
      </Title>
      
      {situation && (
        <Box className={classes.takeawayItem}>
          <Title order={3} className={classes.itemTitle}>
            {situation.title}
          </Title>
          <Box className={classes.itemDescription}>
            <Text className={classes.descriptionText}>
              {situation.description}
            </Text>
          </Box>
        </Box>
      )}
      
      {challenge && (
        <Box className={classes.takeawayItem}>
          <Title order={3} className={classes.itemTitle}>
            {challenge.title}
          </Title>
          <Box className={classes.itemDescription}>
            <Text className={classes.descriptionText}>
              {challenge.description}
            </Text>
          </Box>
        </Box>
      )}
      
      {solution && (
        <Box className={classes.takeawayItem}>
          <Title order={3} className={classes.itemTitle}>
            {solution.title}
          </Title>
          <Box className={classes.itemDescription}>
            <Text className={classes.descriptionText}>
              {solution.description}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default KeyTakeaways;