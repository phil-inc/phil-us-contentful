import {Container, Title, Text, Button, SimpleGrid, Box, Image, Grid} from '@mantine/core';
import {Link, Script} from 'gatsby';
import {Layout} from 'layouts/Layout/Layout';
import {SEO} from 'layouts/SEO/SEO';
import React from 'react';

import * as classes from './404.module.css';
import {notFoundIcon} from 'assets/images';

export const Head: React.FC = () => (
	<SEO title={'Page not found'}>
		<meta
			name='description'
			content={
				'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.'
			}
		/>
		<Script
			async
			defer
			strategy='idle'
			charSet='utf-8'
			type='text/javascript'
			src='//js.hsforms.net/forms/embed/v2.js'
		></Script>
	</SEO>
);

const Error = () => (
	<Layout>
		<Container className={classes.root}>
			<Grid>
				<Grid.Col span={{base: 12, sm: 6}} order={{base: 2, sm: 1}}>
					<Title className={classes.title}>Something is not right...</Title>
					<Text c='dimmed' size='lg' mb={32}>
						Page you are trying to open does not exist. You may have mistyped the address, or the page has been
						moved to another URL. If you think this is an error contact support.
					</Text>
					<Link to='/'>
						<Button variant='philDefault' color={'dark'} size='md'>
							Get back to home page
						</Button>
					</Link>
				</Grid.Col>
				<Grid.Col span='auto' order={{base: 1, sm: 2}}>
					<img src={notFoundIcon} />
				</Grid.Col>
			</Grid>
		</Container>
	</Layout>
);
export default Error;
