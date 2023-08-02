import React, {useState, useEffect} from 'react';
import {Button, Text, Stack, Flex} from '@contentful/f36-components';
import {SiNetlify} from 'react-icons/si';
import {useSDK} from '@contentful/react-apps-toolkit';
import {triggerBuildHook} from '../utils/request';

// Preview is the component that holds buttons for sending build hooks and opening preview links and showing build status.
const Preview: React.FC = () => {
  // State for the timestamp used to reload the image
  const [timestamp, setTimestamp] = useState<number>(Date.now());
  // State to track if a build has been triggered
  const [isBuildTriggered, setIsBuildTriggered] = useState<boolean>(false);
  // State to store any error messages
  const [error, setError] = useState<string | undefined>(undefined);
  const sdk = useSDK();

  // Effect to reload the image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 10000); // Reload every 10 seconds

    return () => {
      clearInterval(interval);
    }; // Clean up on component unmount
  }, []);

  return (
    <Stack flexDirection='column' >
      <Button
        isFullWidth
        startIcon={<SiNetlify size={24}/>}
        onClick={async () => triggerBuildHook(sdk, setIsBuildTriggered, setTimestamp, setError)}
        isDisabled={isBuildTriggered}
      >
        Build Netlify Preview
      </Button>

      <Flex alignItems='center'>
        <img src={`https://api.netlify.com/api/v1/badges/c1066e08-87fc-4714-99df-11bd0fb48770/deploy-status?branch=preview&${timestamp}`} />
      </Flex>

      {error && <Text fontColor='red500'>{error}</Text>}
    </Stack>
  );
};

export default Preview;
