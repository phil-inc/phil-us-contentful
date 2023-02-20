import {AspectRatio, Box, Center, createStyles} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import React from 'react';
import ReactPlayer from 'react-player';
import type {TAsset} from 'types/asset';
import {getWindowProperty} from 'utils/getWindowProperty';
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
	youtubeVideoURL?: string;
};

/**
 * Handle image/video asset.
 * @param param Asset prop
 * @returns Image/Video asset handler.
 */
const Asset: React.FC<AssetProps> = ({asset, youtubeVideoURL}) => {
	const {classes} = useStyles();
	const origin = getWindowProperty('location.origin', 'https://phil.us');

	if (isVideoContent(asset.file.contentType) || youtubeVideoURL?.length) {
		const {url} = asset.file;

		return (
			<AspectRatio sx={{maxWidth: 826}} ratio={1920 / 1080} className={classNames(classes.videoWrapper)} my='auto'>
				<ReactPlayer
					url={youtubeVideoURL?.length ? youtubeVideoURL : url}
					width={'100%'}
					height={'100%'}
					controls
					config={{
						youtube: {
							playerVars: {
								origin: 'https://www.youtube.com',
								enablejsapi: 1,
								widget_referrer: origin,
							},
						},
					}}
				/>
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

export default React.memo(Asset);
