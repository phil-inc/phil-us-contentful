import {
	Paper,
	Container,
	Center,
	Title,
	Divider,
	Button,
	Text,
	createStyles,
	Group,
	Grid,
	Anchor,
	Modal,
} from '@mantine/core';
import classNames from 'classnames';
import {Link} from 'gatsby';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React, {useState} from 'react';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import HubspotFormModal from '../HubspotFormModal';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		padding: 32,
		maxWidth: 1366,
		width: '100%',
		margin: '20px auto',

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			width: 6,
			background: '#5ABEA4 0% 0% no-repeat padding-box',
		},
	},
}));

type BannerProps = {
	resource: TResource;
};

/**
 * Banner is a Component to render a banner
 * @param props - {resource} Banner Resource with heading, body, buttonText, externalLink
 * @returns Banner Component
 */
export const Banner: FC<BannerProps> = ({resource}) => {
	const {classes} = useStyles();
	const {heading, body, buttonText, externalLink, isHubspotEmbed, hubspotEmbed} = resource;
	const {link, isExternal} = getLink(resource);
	const [openHubspotModal, setopenHubspotModal] = useState(false);

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid align={'center'}>
				<Grid.Col lg={10} sm={12}>
					<Container m={0}>
						<Title order={3} mt='md'>
							{heading}
						</Title>
						<Divider variant='dashed' size={1} style={{maxWidth: 404}} my={13} />
						{body && (
							<Text size='md' mt='sm' mb={11}>
								{renderRichText(body)}
							</Text>
						)}
					</Container>
				</Grid.Col>
				{Boolean(buttonText?.length)
					&& (isHubspotEmbed ? (
						<Grid.Col lg={2} sm={12}>
							<Modal
								size='ls'
								opened={openHubspotModal}
								onClose={() => {
									setopenHubspotModal(false);
								}}
							>
								<HubspotFormModal hubspotEmbed={hubspotEmbed} />
							</Modal>
							<Container>
								<Button
									color={'dark'}
									onClick={() => {
										setopenHubspotModal(true);
									}}
								>
									{buttonText}
								</Button>
							</Container>
						</Grid.Col>
					) : (
						Boolean(externalLink?.length) && (
							<Grid.Col lg={2} sm={12}>
								<Container>
									{isExternal ? (
										<Anchor href={link} target='_blank'>
											<Button color={'dark'}>{buttonText}</Button>
										</Anchor>
									) : (
										<Link to={link}>
											<Button color={'dark'}>{buttonText}</Button>
										</Link>
									)}
								</Container>
							</Grid.Col>
						)
					))}
			</Grid>
		</Paper>
	);
};
