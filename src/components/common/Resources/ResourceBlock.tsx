import {Box, Title, Divider, Grid, createStyles} from '@mantine/core';
import React from 'react';
import {ResourceCard} from './ResourceCard';

const useStyles = createStyles(theme => ({
	divider: {
		maxWidth: '35%',
		marginTop: '10px',
		marginBottom: '100px',
	},
}));

type ResourceBlockProps = {
	title: string;
};

export const ResourceBlock: React.FC<ResourceBlockProps> = ({title}) => {
	const {classes} = useStyles();

	return (
		<Box mb={120}>
			<Box>
				<Title order={3}>{title}</Title>
				<Divider variant="dashed" size={1} className={classes.divider} />
			</Box>
			<Box>
				<Grid>
					<Grid.Col sm={12} md={12} lg={6}>
						<ResourceCard title="Lorem Ipsum Dolor">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
							labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.
						</ResourceCard>
					</Grid.Col>
					<Grid.Col sm={12} md={12} lg={6}>
						<ResourceCard title="Lorem Ipsum Dolor">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
							labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.
						</ResourceCard>
					</Grid.Col>
					<Grid.Col sm={12} md={12} lg={6}>
						<ResourceCard title="Lorem Ipsum Dolor">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
							labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.
						</ResourceCard>
					</Grid.Col>
					<Grid.Col sm={12} md={12} lg={6}>
						<ResourceCard title="Lorem Ipsum Dolor">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
							labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.
						</ResourceCard>
					</Grid.Col>
				</Grid>
			</Box>
		</Box>
	);
};
