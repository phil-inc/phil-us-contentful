import {Center, Container, createStyles, Loader} from '@mantine/core';
import React from 'react';
import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {parseScript} from 'utils/parseScript';

const useStyles = createStyles(theme => ({
	body: {
		p: {
			marginTop: 0,
		},
	},

	container: {
		padding: '0 20px 20px',
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: '0 16px',
		},
	},
}));

const HubspotFormModal = ({hubspotEmbed}) => {
	const {classes} = useStyles();
	const [hasRendered, setHasRendered] = React.useState<boolean>(false);
	if (hubspotEmbed) {
		const object: any = parseScript(hubspotEmbed);
		const [formProps] = object;

		// Create form
		const {loaded, formCreated} = useHubspotForm({
			target: '#hubspotForm',
			...formProps,
		});

		// Handle loader
		if (loaded && formCreated && !hasRendered) {
			setHasRendered(true);
		}
	}

	return (
		// TODO: play around with padding for contact page style
		<Container fluid className={classes.container}>
			{hasRendered ? (
				<div id="hubspotForm"></div>
			) : (
				<Center>
					<Loader mt={120} size="lg" />
				</Center>
			)}
		</Container>
	);
};

export default HubspotFormModal;
