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
	const hubspotRef = React.useRef(null);
	const {classes} = useStyles();
	const [hasRendered, setHasRendered] = React.useState<boolean>(false);
	if (hubspotEmbed) {
		const object = parseScript(hubspotEmbed);
		const [formProps] = object;

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

	React.useEffect(() => {
		if (hasRendered) {
			const modalForm = document.querySelector('#hubspotModalForm');

			if (modalForm) {
				const observer = new MutationObserver((mutationsList, observer) => {
					mutationsList.forEach(mutation => {
						if (mutation.type === 'childList') {
							const fieldsets: NodeList[] = (mutation.target as Element).querySelectorAll(
								'fieldset div[style*="display: none"]',
							) as unknown as NodeList[];
							fieldsets.forEach(fieldset => {
								const {parentElement} = fieldset as unknown as HTMLDivElement;
								parentElement!.style.display = 'none';
							});
						}
					});
				});
				observer.observe(modalForm, {attributes: true, childList: true, subtree: true});
				return () => {
					observer.disconnect();
				};
			}
		}
	}, [hasRendered]);

	return (
		<Container fluid className={classes.container}>
			{hasRendered ? (
				<div ref={hubspotRef} id='hubspotModalForm'></div>
			) : (
				<Center>
					<Loader mt={120} size='lg' />
				</Center>
			)}
		</Container>
	);
};

export default React.memo(HubspotFormModal);
