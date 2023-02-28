import React from 'react';
import {Center, Container, createStyles, Loader} from '@mantine/core';
import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {parseScript} from 'utils/parseScript';
import {type BodyType} from 'types/section';

const useStyles = createStyles(theme => ({
	body: {
		p: {
			marginTop: 0,
		},
	},

	container: {
		padding: '0 20px 20px',

		[theme.fn.smallerThan('md')]: {
			padding: '0 16px',
		},
	},
}));

const HubspotFormModal = ({hubspotEmbed}: {hubspotEmbed: BodyType}) => {
	const {classes} = useStyles();
	const [hasRendered, setHasRendered] = React.useState<boolean>(false);
	if (hubspotEmbed) {
		const object = parseScript(hubspotEmbed);
		const [formProps] = object;

		console.log(formProps);

		// Create form
		const {loaded, formCreated} = useHubspotForm({
			target: '#hubspotModalForm',
			formId: formProps.formId,
			portalId: formProps.portalId,
		});

		// Handle loader
		if (loaded && formCreated && !hasRendered) {
			setHasRendered(true);
		}
	}

	return (
		<Container fluid className={classes.container}>
			{hasRendered ? (
				<div id='hubspotModalForm'></div>
			) : (
				<Center>
					<Loader mt={120} size='lg' />
				</Center>
			)}
		</Container>
	);
};

export default React.memo(HubspotFormModal);
