import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid, Group, Anchor} from '@mantine/core';
import classNames from 'classnames';
import {FIELD_PAGE} from 'constants/page';
import PageContext from 'contexts/PageContext';
import {Link} from 'gatsby';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';

const useStyles = createStyles((theme, _params: {background: string; fontSize?: number}) => ({
	FAQWrapper: {
		position: 'relative',
		overflow: 'hidden',
		padding: '30px 60px',
		background: _params.background,
		fontFamily: 'Raleway',
		fontWeight: 700,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100%',

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			width: 12,
			background: 'linear-gradient(to left, #FFF 50%, #EDBE3D 0%)',
		},
	},
	title: {
		textDecoration: 'none',
		color: '#00201F',
		fontSize: _params.fontSize,

		'&:hover': {
			color: '#EDBE3D',
		},
	},
}));

type FAQProps = {
	resource: TResource;
};

export const FAQ: FC<FAQProps> = ({resource}) => {
	const context = React.useContext(PageContext);

	const {classes} = useStyles({
		background: context.title === FIELD_PAGE ? '#ffffff' : '#f4f4f4',
		...(context.title === FIELD_PAGE && {fontSize: 24}),
	});
	const {link, isExternal} = getLink(resource);

	return (
		<Paper radius={0} className={classNames(classes.FAQWrapper)}>
			<Group align='center'>
				<Group>
					{isExternal ? (
						<Anchor href={link} target='_blank' className={classes.title} underline={false}>
							<Title order={4} className={classes.title}>
								{resource.heading}
							</Title>
						</Anchor>
					) : (
						<Link to={link} className={classes.title}>
							<Title order={4} className={classes.title}>
								{resource.heading}
							</Title>
						</Link>
					)}
				</Group>
			</Group>
		</Paper>
	);
};
