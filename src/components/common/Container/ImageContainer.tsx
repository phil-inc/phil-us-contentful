import {AspectRatio, Container, createStyles, Group, useMantineTheme} from '@mantine/core';
import {CONTACT_PAGE} from 'constants/page';
import PageContext from 'contexts/PageContext';
import React from 'react';

type ImageContainerProps = {
	fluid?: boolean;
	ratio?: number;
	background?: string;
	children: React.ReactNode;
	expanded?: boolean;
	contain?: boolean;
	containerRef?: React.MutableRefObject<undefined>;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
	ratio = 1,
	fluid = false,
	background = '#F4F4F4',
	children,
	expanded = false,
	contain = false,
	containerRef,
}) => {
	const context = React.useContext(PageContext);

	const useStyles = createStyles((theme, _, getRef) => ({
		imageContainer: {
			background,
			padding: fluid ? 0 : 50,
			maxWidth: expanded ? '50vw' : '100%',
			width: expanded ? '50vw' : '100%',
			...(expanded && {position: 'absolute'}),
			...(expanded && {top: '90px'}),
			...(expanded && {right: '0px'}),
			...(context.title !== CONTACT_PAGE && {height: '100%'}),

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
		<Container ref={containerRef} fluid className={classes.imageContainer}>
			<AspectRatio
				className={contain ? classes.objectFitContain : undefined}
				ratio={ratio}
				sx={{width: '100%', height: '100%'}}
			>
				{children}
			</AspectRatio>
		</Container>
	);
};

export default React.memo(ImageContainer);
