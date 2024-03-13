import {Paper, Container, Center, Title, Divider, Button, Text, Grid, Stack, Box, Group} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';

import * as classes from './press.module.css';

type PressReleaseProps = {
	resource: Pick<TResource, 'asset' | 'buttonText' | 'externalLink' | 'heading' | 'createdAt'>;
};

export const PressRelease: FC<PressReleaseProps> = ({resource}) => {
	const pathToImage = getImage(resource.asset);

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid align={'center'}>
				<Grid.Col lg={6} sm={12} md={12}>
					<GatsbyImage image={pathToImage} alt='' />
				</Grid.Col>
				<Grid.Col lg={6} sm={12} md={12}>
					<Stack p={35}>
						<Text size={18} color='dimmed' mb={10}>
							Feb 28, 2022
						</Text>
						<Title order={1} size={30}>
							{resource.heading}
						</Title>
						<Divider variant='dashed' size={3} my={13} />
						<Group>
							<Button color='dark'>{resource.buttonText}</Button>
						</Group>
					</Stack>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
