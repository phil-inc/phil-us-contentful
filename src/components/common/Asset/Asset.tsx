import {AspectRatio, Box, Center, createStyles} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import React from 'react';
import ReactPlayer from 'react-player/lazy';
import type {TAsset} from 'types/asset';
import {isVideoContent} from 'utils/isVideoContent';

const useStyles = createStyles(() => ({
	center: {
		display: 'grid',
		placeItems: 'center',
	},
	videoWrapper: {
		maxHeight: '465px',
	},
}));

type AssetProps = {
	asset: TAsset;
};

/**
 * Handle image/video asset.
 * @param param Asset prop
 * @returns Image/Video asset handler.
 */
const Asset: React.FC<AssetProps> = ({asset}) => {
	const {classes} = useStyles();

	if (isVideoContent(asset.file.contentType)) {
		const {url} = asset.file;
		return (
			<AspectRatio sx={{maxWidth: 826}} ratio={1920 / 1080} className={classNames(classes.videoWrapper)} my='auto'>
				<ReactPlayer url={'https://youtu.be/2uvcWi_SAsI'} width={'100%'} height={'100%'} controls />
			</AspectRatio>
		);
	}

	const altText = asset.title || '';

	// Handle SVG images
	if (asset.file.contentType === 'image/svg+xml') {
		return <img src={asset.file.url} alt={altText} />;
	}

	const pathToImage = getImage(asset);
	return <GatsbyImage image={pathToImage} alt={altText} />;
};

export default Asset;
