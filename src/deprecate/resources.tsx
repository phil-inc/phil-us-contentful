import React from 'react';
import {Layout} from 'layouts/Layout/Layout';

import {Box, Button, Container, Grid, Group, TextInput, Title} from '@mantine/core';
import {IconSearch} from '@tabler/icons';
import {FAQ} from 'components/common/FAQ';
import {ResourceBlock} from 'components/common/Resources/ResourceBlock';

const ResourcesPage: React.FC = () => (
	<Layout>
		{/* First Section */}
		<Box mb={160}>
			<Grid align="center">
				<Grid.Col span={6}>
					<Box>
						<Title order={2}>Resources</Title>
					</Box>
				</Grid.Col>
				<Grid.Col span={6}>
					<Container fluid>
						<Grid>
							<Grid.Col span={10}>
								<TextInput
									icon={<IconSearch size={18} stroke={1.5} />}
									size="md"
									placeholder="Search questions"
									rightSectionWidth={42}
								/>
							</Grid.Col>
							<Grid.Col span={2}>
								<Button color="dark" size="md">
									Search
								</Button>
							</Grid.Col>
						</Grid>
					</Container>
				</Grid.Col>
			</Grid>
		</Box>

		{/* Second Section */}
		<Box>
			<ResourceBlock title="Phil Blog" />
			<ResourceBlock title="Upcoming Events" />
			<ResourceBlock title="Case Studies" />
			<ResourceBlock title="White Papers" />
		</Box>

		{/* Third Section */}
		<Box>
			<Box>
				<Group position="center">
					<Title order={2}>FAQs</Title>
				</Group>
			</Box>
			<Box>
				<Grid pt={60}>
					<Grid.Col lg={6} sm={12}>
						<FAQ title="How do I pause or cancel my prescription?" />
					</Grid.Col>
					<Grid.Col lg={6} sm={12}>
						<FAQ title="How do I update my payment information?" />
					</Grid.Col>
					<Grid.Col lg={6} sm={12}>
						<FAQ title="What to do if I receive a message indicating there is an issue with my insurance?" />
					</Grid.Col>
					<Grid.Col lg={6} sm={12}>
						<FAQ title="How much will my prescription cost?" />
					</Grid.Col>
					<Grid.Col lg={6} sm={12}>
						<FAQ title="General Phil and Insurance Questions" />
					</Grid.Col>
					<Grid.Col lg={6} sm={12}>
						<FAQ title="When will I receive my prescription?" />
					</Grid.Col>
				</Grid>
			</Box>
		</Box>
	</Layout>
);

export default ResourcesPage;
