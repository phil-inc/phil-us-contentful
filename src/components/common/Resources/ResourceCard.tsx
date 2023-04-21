import {
	Paper,
	Title,
	Button,
	Text,
	createStyles,
	Grid,
	Box,
	Anchor,
	Group,
	type MantineStyleSystemProps,
} from '@mantine/core';
import classNames from 'classnames';
import React from 'react';
import type {FC} from 'react';
import {Link} from 'gatsby';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import {getDescriptionFromRichtext} from 'utils/getDescription';

type ResourceCardProps = {
	resource: TResource;
	isFaq?: boolean;
};

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		paddingLeft: 18,
		background: '#FFF',
		height: '100%',
		padding: '40px 60px',

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			width: 10,
			background: '#00827E 0% 0% no-repeat padding-box',
		},

		[theme.fn.smallerThan('md')]: {
			padding: '0px',
		},
	},

	center: {
		display: 'grid',
		alignItems: 'center',
	},

	textDecorationNone: {
		color: 'inherit',
		textDecoration: 'none',
		cursor: 'pointer',
	},

	box: {
		[theme.fn.smallerThan('md')]: {
			padding: '26px 20px',
			paddingLeft: 36,
		},
	},

	title: {
		fontSize: 28,

		[theme.fn.smallerThan('md')]: {
			fontSize: 20,
		},
	},

	body: {
		marginTop: 8,
		marginBottom: 20,
		fontSize: 18,

		[theme.fn.smallerThan('md')]: {
			marginTop: 8,
			marginBottom: 12,

			fontSize: 14,
		},
	},

	button: {
		fontSize: 16,
		padding: '11px 20px',
		fontWeight: 400,
		height: 40,

		[theme.fn.smallerThan('md')]: {
			fontSize: 10.28,
			padding: '7px 12px',
		},
	},
}));

export const ResourceCard: FC<ResourceCardProps & MantineStyleSystemProps> = ({resource, mb = 0, isFaq = false}) => {
	const {classes} = useStyles();
	const {link, isExternal} = getLink(resource);

	const heading = resource.subheading?.length ? resource.subheading : resource.heading;

	return (
		<Paper mb={mb} radius={0} className={classNames(classes.card)}>
			<Grid justify='start' align='start'>
				<Grid.Col className={classes.center}>
					<Box className={classes.box}>
						{heading && isExternal ? (
							<Anchor href={link} target='_blank' underline={false} className={classes.textDecorationNone}>
								<Title order={3} className={classes.title}>
									{heading}
								</Title>
							</Anchor>
						) : (
							<Link to={link} className={classes.textDecorationNone}>
								<Title order={3} className={classes.title}>
									{heading}
								</Title>
							</Link>
						)}
						{resource.body && (
							<Text className={classes.body} lineClamp={2}>
								{getDescriptionFromRichtext(resource.body.raw)}
							</Text>
						)}
						{resource.buttonText && (
							<Group>
								{isExternal ? (
									<Anchor href={link} target='_blank'>
										<Button className={classes.button}>{resource.buttonText}</Button>
									</Anchor>
								) : (
									<Link to={link}>
										<Button className={classes.button}>{resource.buttonText}</Button>
									</Link>
								)}
							</Group>
						)}
					</Box>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
