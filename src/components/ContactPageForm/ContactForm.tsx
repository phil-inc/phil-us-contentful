import React from 'react';
import {Anchor, Button, Grid, createStyles, Center, Loader} from '@mantine/core';
import type {ISection} from 'types/section';
import {parseScript} from 'utils/parseScript';
import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {handleSpacing} from 'utils/handleSpacing';
import type {TResponse} from 'extract-json-from-string';

const useStyles = createStyles(theme => ({
	body: {
		p: {
			marginTop: 0,
		},
	},

	container: {
		padding: '0 100px',
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: '0 16px',
		},
	},

	section: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	largeSection: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	listItem: {
		fontSize: 18,
		lineHeight: 27,
		marginTop: 14,
		color: theme.colors.primary[0],
	},

	contactSubheader: {
		a: {
			color: '#00827E',
			textDecoration: 'none',
		},
	},

	hubspotContactForm: {
		minHeight: 790,

		'&[data-hs-forms-root="true"]': {
			minHeight: 0,

			[theme.fn.largerThan('md')]: {
				minHeight: 790,
			},
		},
	},

	formBody: {
		[theme.fn.largerThan('md')]: {
			minHeight: 790,
		},
	},
}));

const HubspotForm = ({formProps, section, formTag}: {formProps: TResponse; section: ISection; formTag: string}) => {
	const {classes, theme} = useStyles();
	const [hasRendered, setHasRendered] = React.useState<boolean>(false);
	const [isListenerAdded, setIsListenerAdded] = React.useState<boolean>(false);

	// Scroll to top on hubspot form submit
	React.useEffect(() => {
		const parentDiv = document.getElementById('hubspotContactForm');

		if (window.location.pathname === '/contact/') {
			if (!isListenerAdded) {
				let observer: MutationObserver;

				// eslint-disable-next-line prefer-const
				observer = new MutationObserver(mutations => {
					mutations.forEach(mutation => {
						// Check if the added or removed nodes belong to a HubSpot form
						const addedNodes = Array.from(mutation.addedNodes);

						const isHubSpotFormAdded = addedNodes.some((node: Element) => {
							if (node.className) {
								return node.className.includes('hs-form') || node.id.includes('hs-form');
							}

							return false;
						});

						if (isHubSpotFormAdded) {
							// Get the form element and the submit button element
							const form = (mutation.target as Element).querySelector('form.hs-form');

							const submitButton = form?.querySelector('input[type="submit"]');
							if (submitButton) {
								submitButton.addEventListener('click', () => {
									observer.disconnect();
									window.scrollTo({top: 0, behavior: 'smooth'});
								});
								setIsListenerAdded(true);
							}
						}
					});
				});

				// Configure the observer to watch for changes in the parent of the button you want to find
				const observerConfig = {
					childList: true,
					subtree: true,
				};

				if (parentDiv) {
					observer.observe(parentDiv.parentNode, observerConfig);
				}

				return () => {
					observer.disconnect();
				};
			}
		}
	}, [hasRendered]);

	if (section.isHubspotEmbed) {
		// Create form
		const {loaded, formCreated} = useHubspotForm({
			target: '#hubspotContactForm',
			...(Boolean(!formProps.custom) && {formId: formProps.formId, portalId: formProps.portalId}),
			...(formTag === 'hcp' && Boolean(formProps.custom) && formProps.custom.forms.hcp),
			...(formTag === 'manufacturer' && Boolean(formProps.custom) && formProps.custom.forms.manufacturer),
			...(formTag === 'other' && Boolean(formProps.custom) && formProps.custom.forms.other),
		});

		// Handle loader
		if (loaded && formCreated && !hasRendered) {
			setHasRendered(true);
		}
	}

	return hasRendered ? (
		<div className={classes.hubspotContactForm} id='hubspotContactForm'></div>
	) : (
		<Center>
			<Loader mt={handleSpacing(theme, theme.spacing.xl)} size='lg' />
		</Center>
	);
};

const ContactForm: React.FC<{section: ISection}> = ({section}) => {
	const [formTag, setFormTag] = React.useState<string>('');

	const object: any = parseScript(section.body);

	const [formProps] = object as TResponse[];

	return formTag.length || Boolean(!formProps.custom) ? (
		<HubspotForm formProps={formProps} formTag={formTag} section={section} />
	) : (
		<Grid>
			<Grid.Col span={6}>
				<Anchor style={{textDecoration: 'none'}} href='https://my.phil.us' target='_blank'>
					<Button fullWidth>Patient/Caregiver</Button>
				</Anchor>
			</Grid.Col>
			<Grid.Col span={6}>
				<Button
					onClick={() => {
						setFormTag('HCP'.toLowerCase());
					}}
					fullWidth
				>
					HCP
				</Button>
			</Grid.Col>
			<Grid.Col span={6}>
				<Button
					onClick={() => {
						setFormTag('Manufacturer'.toLowerCase());
					}}
					fullWidth
				>
					Manufacturer
				</Button>
			</Grid.Col>
			<Grid.Col span={6}>
				<Button
					onClick={() => {
						setFormTag('Other'.toLowerCase());
					}}
					fullWidth
				>
					Other
				</Button>
			</Grid.Col>
		</Grid>
	);
};

export default ContactForm;