import {AspectRatio, Container, createStyles, Group, useMantineTheme} from '@mantine/core';
import React from 'react';

type ImageContainerProps = {
	fluid?: boolean;
	ratio?: number;
	background?: string;
	children: React.ReactNode;
	expanded?: boolean;
	contain?: boolean;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
	ratio = 1,
	fluid = false,
	background = '#F4F4F4',
	children,
	expanded = false,
	contain = false,
}) => {
	const useStyles = createStyles(theme => ({
		imageContainer: {
			background,
			height: '100%',
			padding: fluid ? 0 : 50,
			maxWidth: expanded ? '50vw' : '100%',
			width: expanded ? '50vw' : '100%',
			...(expanded && {position: 'absolute'}),
			...(expanded && {top: '90px'}),
			...(expanded && {right: 0}),

			[theme.fn.smallerThan('lg')]: {
				maxWidth: '100%',
				width: '100%',
				marginTop: 0,
				marginRight: 0,
			},

			[theme.fn.smallerThan('md')]: {
				position: 'static',
			},
		},

		center: {
			display: 'grid',
			placeItems: 'center',
		},

		objectFitContain: {
			img: {
				objectFit: 'contain',
			},
		},
	}));

	const {classes} = useStyles();

	return (
		<Container fluid className={classes.imageContainer}>
			<AspectRatio
				className={contain && classes.objectFitContain}
				ratio={ratio}
				sx={{width: '100%', height: '100%'}}
			>
				{children}
			</AspectRatio>
		</Container>
	);
};

export default React.memo(ImageContainer);
