import {AspectRatio, Container, MantineSize, MantineSpacing, StyleProp, rem} from '@mantine/core';
import React from 'react';

import * as classes from './imageContainer.module.css';
import PageContext from 'contexts/PageContext';

type ImageContainerProps = {
	fluid?: boolean;
	ratio?: number;
	background?: string;
	children: React.ReactNode;
	expanded?: boolean;
	contain?: boolean;
	containerRef?: React.MutableRefObject<undefined>;
	isVideo?: boolean;
	cover?: boolean;
	mx?: StyleProp<React.CSSProperties['margin']>;
	maw?: MantineSpacing;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
	ratio = 1,
	fluid = false,
	background = '#F4F4F4',
	children,
	expanded = false,
	contain = false,
	containerRef,
	isVideo,
	mx = 'auto',
	maw = 335,
}) => {
	const context = React.useContext(PageContext);

	return (
		<Container
			ref={containerRef}
			fluid={fluid}
			data-video={isVideo}
			data-expanded={expanded}
			data-context={context.title}
			className={classes.imageContainer}
			maw={isVideo ? undefined : maw}
		>
			<AspectRatio className={classes.aspectRatio} data-contain={contain} ratio={ratio} mx={mx}>
				{children}
			</AspectRatio>
		</Container>
	);
};

export default ImageContainer;
