import {AspectRatio, Container, rem} from '@mantine/core';
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
		>
			<AspectRatio
				className={classes.aspectRatio}
				data-contain={contain}
				ratio={ratio}
				maw={isVideo ? undefined : 335}
				mx={'auto'}
			>
				{children}
			</AspectRatio>
		</Container>
	);
};

export default ImageContainer;
