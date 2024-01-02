import {AspectRatio, Container} from '@mantine/core';
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
	<Container ref={containerRef} fluid className={classes.imageContainer}>
		<AspectRatio
			className={contain ? classes.objectFitContent : undefined}
			style={{width: '100%', height: '100%'}}
			ratio={ratio}
			data-fluid={fluid}
			data-background={background}
			data-expanded={expanded}
			data-video={isVideo}
			data-context={context.title}
		>
			{children}
		</AspectRatio>
	</Container>
)};

export default React.memo(ImageContainer);
