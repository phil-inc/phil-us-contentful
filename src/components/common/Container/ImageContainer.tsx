import {AspectRatio, Container} from '@mantine/core';
import React from 'react';

import * as classes from './imageContainer.module.css';

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
}) => (
	<Container ref={containerRef} fluid className={classes['image-container']}>
		<AspectRatio
			className={contain ? classes['object-fit-contain'] : undefined}
			style={{width: '100%', height: '100%'}}
			ratio={ratio}
		>
			{children}
		</AspectRatio>
	</Container>
);

export default React.memo(ImageContainer);
