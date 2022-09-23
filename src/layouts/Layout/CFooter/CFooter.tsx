import {createStyles, Anchor, Group, Grid, Text, Divider, List, Container} from '@mantine/core';
import React from 'react';

const useStyles = createStyles(theme => ({
	footer: {
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
		background: '#00827e',
		color: 'white',
	},

	inner: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column',
		},
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			marginTop: theme.spacing.lg,
			marginBottom: theme.spacing.sm,
		},
		color: 'white',
	},

	footLinkHeader: {
		fontFamily: 'Lato',
		fontWeight: 700,
		margin: '10px 0',
	},

	footerLink: {
		margin: '14px 0',
	},

	footerWrapper: {
		padding: '85px 0',
	},
}));

type FooterCenteredProps = {
	links: Array<{link: string; label: string}>;
};

export const CFooter = ({links}: FooterCenteredProps) => {
	const {classes} = useStyles();
	const items = links.map(link => (
		<Anchor<'a'>
			className={classes.links}
			key={link.label}
			href={link.link}
			sx={{lineHeight: 1}}
			onClick={event => {
				event.preventDefault();
			}}
			size='sm'
		>
			{link.label}
		</Anchor>
	));

	return (
		<>
			<Container size={'xl'} className={classes.footerWrapper}>
				<Grid gutter={'xl'}>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Home
						</Text>

						<Divider my={10} mr={80} color='dark' />
						<List listStyleType='none'>
							<List.Item>
								<Text className={classes.footerLink}>Phil platform</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Who we serve</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Client testimonials</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Featured resources</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Schedule demo</Text>
							</List.Item>
						</List>
					</Grid.Col>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Life sciences
						</Text>

						<Divider my={10} mr={80} color='dark' />
						<List listStyleType='none'>
							<List.Item>
								<Text className={classes.footerLink}>Access and commercialization solutions</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Launch</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Mid-cycle</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Loss of exclusivity</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>FAQs</Text>
							</List.Item>
						</List>
					</Grid.Col>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Healthcare providers
						</Text>

						<Divider my={10} mr={80} color='dark' />
						<List listStyleType='none'>
							<List.Item>
								<Text className={classes.footerLink}>Patient outcomes</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Flight of the script</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Prescribing to Phil</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>HCP outcomes</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Testimonials</Text>
							</List.Item>
						</List>
					</Grid.Col>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Patients
						</Text>

						<Divider my={10} mr={80} color='dark' />
						<List listStyleType='none'>
							<List.Item>
								<Text className={classes.footerLink}>Smarter prescriptions</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Benefits</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Fill a prescription</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Testimonials</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>FAQs</Text>
							</List.Item>
						</List>
					</Grid.Col>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Resources
						</Text>

						<Divider my={10} mr={80} color='dark' />
						<List listStyleType='none'>
							<List.Item>
								<Text className={classes.footerLink}>Phil blog</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Upcoming events</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Case studies</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>White papers</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Solutions briefs</Text>
							</List.Item>
						</List>
					</Grid.Col>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Company
						</Text>

						<Divider my={10} mr={80} color='dark' />
						<List listStyleType='none'>
							<List.Item>
								<Text className={classes.footerLink}>Who we are</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Philosophy</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Team</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Investors</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Press</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Careers</Text>
							</List.Item>
						</List>
					</Grid.Col>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Contact us
						</Text>

						<Divider my={10} mr={80} color='dark' />
						<List listStyleType='none'>
							<List.Item>
								<Text className={classes.footerLink}>Location</Text>
							</List.Item>
							<List.Item>
								<Text className={classes.footerLink}>Reach out</Text>
							</List.Item>
						</List>
					</Grid.Col>
					<Grid.Col span={3}>
						<Text size={'lg'} className={classes.footLinkHeader}>
							Newsletter
						</Text>
						<Divider my={10} mr={80} color='dark' />
						email goes here
					</Grid.Col>
				</Grid>
			</Container>
			<div className={classes.footer}>
				<div className={classes.inner}>
					<Group className={classes.links}>{items}</Group>
				</div>
			</div>
		</>
	);
};
