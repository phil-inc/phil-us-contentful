import {createStyles, Container, Title, Text, Button, SimpleGrid} from '@mantine/core';
import {Link} from 'gatsby';
import {Layout} from 'layouts/Layout/Layout';
import {SEO} from 'layouts/SEO/SEO';
import React from 'react';
import ErrorImage from '../images/404.svg';

export const Head: React.FC = () => (
	<SEO title={'Page not found'}>
		<meta
			name='description'
			content={
				'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.'
			}
		/>
		<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
	</SEO>
);

const useStyles = createStyles(theme => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
	},

	title: {
		fontWeight: 900,
		fontSize: 34,
		marginBottom: theme.spacing.md,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},

	control: {
		[theme.fn.smallerThan('sm')]: {
			width: '100%',
		},
	},

	mobileImage: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	desktopImage: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},
}));

const Error = () => {
	const {classes} = useStyles();

	return (
		<Layout>
			<Container className={classes.root}>
				<SimpleGrid spacing={80} cols={2} breakpoints={[{maxWidth: 'sm', cols: 1, spacing: 40}]}>
					<div>
						<Title className={classes.title}>Something is not right...</Title>
						<Text color='dimmed' size='lg'>
							Page you are trying to open does not exist. You may have mistyped the address, or the page has been
							moved to another URL. If you think this is an error contact support.
						</Text>
						<Link to={'/'}>
							<Button variant='outline' color={'dark'} size='md' mt='xl' className={classes.control}>
								Get back to home page
							</Button>
						</Link>
					</div>
					<Container>
						<img src='../images/404.svg' width='100%' height='100%' />
					</Container>
				</SimpleGrid>
			</Container>
		</Layout>
	);
};

export default Error;
