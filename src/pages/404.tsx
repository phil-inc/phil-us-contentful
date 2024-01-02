import {Container, Title, Text, Button, SimpleGrid} from '@mantine/core';
import {Link, Script} from 'gatsby';
import {Layout} from 'layouts/Layout/Layout';
import {SEO} from 'layouts/SEO/SEO';
import React from 'react';
import * as classes from './404.module.css';

export const Head: React.FC = () => (
	<SEO title={'Page not found'}>
		<meta
			name='description'
			content={
				'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.'
			}
		/>
		<Script strategy='idle' charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></Script>
	</SEO>
);



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
						<img src='https://phil.us/images/404.svg' width='100%' height='100%' />
					</Container>
				</SimpleGrid>
			</Container>
		</Layout>
	);
};

export default React.memo(Error);
