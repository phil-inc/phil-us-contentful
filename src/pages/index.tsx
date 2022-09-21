import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
// Import {ColorSchemeToggle} from 'components/ColorSchemeToggle/ColorSchemeToggle';
import {Button, createStyles, Image, Text, Title} from '@mantine/core';

import heroImage from 'assets/images/heroimage.jpg';

const useStyles = createStyles(theme => ({
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	content: {
		width: '50%',
	},
}));

export default function HomePage() {
	const {classes} = useStyles();
	return (
		<Layout>
			{/* <ColorSchemeToggle /> */}
			<div className={classes.inner}>
				<div className={classes.content}>
					<Title order={1}>Patient Access, Simplified</Title>
					<Text mt={18} mb={58} size={'sm'}>
						Phil built a comprehensive patient access platform that unlocks brand value and improves health
						outcomes, by ensuring patients can get mediation quickly and affordably.
					</Text>
					<Button variant='filled' color='dark'>
						Learn More
					</Button>
				</div>
				<div className={classes.content}>
					<Image width={'100%'} fit={'contain'} src={'../../images/heroimage.jpg'}></Image>
				</div>
			</div>
		</Layout>
	);
}
