import {Button, Text, Stack, Flex} from '@contentful/f36-components';
import {SiNetlify} from 'react-icons/si';
import {useState, useEffect} from 'react';

// Preview is the component that holds buttons for sending build hooks and opening preview links and showing build status.
const Preview: React.FC = () => {
	// State for the timestamp used to reload the image
	const [timestamp, setTimestamp] = useState<number>(Date.now());
	// State to track if a build has been triggered
	const [isBuildTriggered, setIsBuildTriggered] = useState<boolean>(false);
	// State to store any error messages
	const [error, setError] = useState<string | undefined>(undefined);

	// Function to trigger the build hook
	async function triggerBuildHook(): Promise<void> {
		setIsBuildTriggered(true);
		setError(undefined);
		try {
			const response = await fetch(`${import.meta.env.REACT_APP_NETLIFY_BUILD_HOOK as string}`, {
				method: 'POST',
			});
			if (response.ok) {
				setIsBuildTriggered(false);
				setTimestamp(Date.now()); // Update timestamp to reload image
			} else {
				console.log(`Build webhook failed with status: ${response.status}`);
				setError(`Build webhook failed with status: ${response.status}`);
				setIsBuildTriggered(false);
			}
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.log(e);
				setError('An error occurred: ' + e.message);
			} else {
				setError('An unknown error occurred');
			}

			setIsBuildTriggered(false);
		}
	}

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
				onClick={triggerBuildHook}
				isDisabled={isBuildTriggered}
			>
          Build Netlify Preview
			</Button>

			<Flex alignItems='center'>
				<img src={`https://api.netlify.com/api/v1/badges/c1066e08-87fc-4714-99df-11bd0fb48770/deploy-status?branch=preview&timestamp=${timestamp}`} />
			</Flex>

			{error && <Text fontColor='red500'>{error}</Text>}
		</Stack>
	);
};

export default Preview;
