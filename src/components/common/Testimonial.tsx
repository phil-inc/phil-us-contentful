import {Paper, Container, Center, Title, Divider, Button, Text, Grid, Stack, Box, Group, Avatar} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage, StaticImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TAsset} from 'types/asset';
import type {TResource} from 'types/resource';
import Asset from './Asset/Asset';
import ImageContainer from './Container/ImageContainer';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';

import * as classes from './testimonial.module.css';
import {getColorFromStylingOptions} from 'utils/stylingOptions';
import {kMaxLength} from 'buffer';

type TestimonialProps = {
	type?: 'person' | 'company';
	resource: TResource;
};

export const Testimonial: FC<TestimonialProps> = ({resource, type = 'company'}) => {
	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return (
					<Text unstyled className={classes.body}>
						{children}
					</Text>
				);
			},
		},
	};

	return (
		<Paper
			className={classes.paper}
			style={{background: getColorFromStylingOptions(resource.stylingOptions?.background)}}
		>
			<Stack h={'100%'} justify='space-between'>
				<Box>
					<Box mb={20}>
						<svg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M15.719 17.8986C17.8232 17.6679 19.4728 16.2042 19.9205 14.1654C20.0101 13.759 20.0273 12.9152 19.955 12.4606C19.6829 10.7179 18.4156 9.23355 16.7487 8.71351C16.1943 8.53786 15.9325 8.49998 15.2817 8.49998H14.6721L14.6549 8.4001C14.6204 8.23479 14.6308 7.29803 14.6721 7.01217C14.803 6.04097 15.2679 4.76324 15.8602 3.74038C16.5593 2.53154 17.1999 1.62921 17.8473 0.94041C18.3467 0.413479 18.2365 0.434143 17.2825 1.06095C16.3596 1.66709 15.812 2.10792 15.1473 2.78984C14.6583 3.28577 14.5791 3.37876 13.9971 4.12611C13.5184 4.73569 12.778 5.85499 12.3888 6.55412C11.5519 8.05226 11.0629 9.2611 10.7633 10.5595C10.5635 11.4239 10.5257 11.7924 10.5463 12.7017C10.5704 13.8416 10.7082 14.5063 11.0698 15.2502C11.3143 15.7565 11.6036 16.156 12.0272 16.5658C12.8985 17.413 13.9558 17.8608 15.168 17.8986C15.3953 17.9055 15.6433 17.9055 15.719 17.8986Z'
								fill='#525252'
							/>
							<path
								d='M5.38633 17.814C6.51248 17.6624 7.5973 17.077 8.32051 16.2366C8.90597 15.5513 9.28135 14.7454 9.41566 13.874C9.48798 13.4263 9.47076 12.5757 9.38467 12.1934C9.24347 11.57 9.0024 11.0017 8.65801 10.4817C8.43071 10.1407 7.89003 9.58282 7.54564 9.33485C6.61924 8.67016 5.47932 8.35332 4.33595 8.44975C4.16032 8.46352 4.14654 8.46008 4.12588 8.38087C4.08799 8.25 4.09144 7.26157 4.12932 6.97572C4.14654 6.83796 4.20853 6.52455 4.26708 6.28003C4.52881 5.16418 5.0385 4.0621 5.91325 2.7155C6.47804 1.84761 6.82931 1.38956 7.38378 0.807522C7.54564 0.635322 7.64207 0.511339 7.61452 0.501007C7.55942 0.483787 7.21503 0.686982 6.52281 1.15192C5.25891 1.99914 4.36695 2.8567 3.39578 4.15853C1.48098 6.71742 0.378945 9.12477 0.0448904 11.4564C-0.0343189 12.0177 -0.00676823 13.2576 0.0965481 13.8086C0.285961 14.8177 0.620016 15.5409 1.21236 16.2366C1.59119 16.674 2.13188 17.0942 2.67601 17.3663C2.94807 17.504 3.53697 17.7038 3.86414 17.7692C4.17409 17.8312 5.06605 17.8587 5.38633 17.814Z'
								fill='#525252'
							/>
						</svg>
					</Box>
					{resource.body && renderRichText(resource.body, options)}
				</Box>

				{resource.author && (
					<Box mt={32}>
						<Group gap={12} align='center' justify='start'>
							<Box h={'100%'}>
								<Avatar
									autoContrast={false}
									styles={{
										placeholder: {
											background: getColorFromStylingOptions(resource.stylingOptions?.extraColor),
										},
									}}
									classNames={{placeholder: classes.avatarPlaceholder}}
									size='lg'
								>
									{resource?.author?.avatar ? (
										<Asset asset={resource.author.avatar} />
									) : (
										resource.author.name[0]
									)}
								</Avatar>
							</Box>

							<Box>
								<Text className={classes.author}>{resource.author.name}</Text>
								<Text className={classes.authorTitle}>{resource.author.authorTitle}</Text>
							</Box>
						</Group>
					</Box>
				)}
			</Stack>
		</Paper>
	);
};
