import {AspectRatio} from '@mantine/core';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import React from 'react';
import ReactPlayer from 'react-player';
import type {TAsset} from 'types/asset';
import {getWindowProperty} from 'utils/getWindowProperty';
import {isVideoContent} from 'utils/isVideoContent';
import PDFViewer from '../PDFViewer/PDFViewer';

type AssetProps = {
	asset: TAsset;
	youtubeVideoURL?: string;
	width?: number;
};

/**
 * Handle image/video asset.
 * @param param Asset prop
 * @returns Image/Video asset handler.
 */
const Asset: React.FC<AssetProps> = ({asset, youtubeVideoURL, width}) => {
	const [playerCompnnent, setPlayerComponent] = React.useState(<></>);

	React.useEffect(() => {
		const origin = getWindowProperty('location.origin', 'https://www.phil.us');
		const player = (
			<ReactPlayer
				url={youtubeVideoURL}
				controls
				width={'100%'}
				height={'100%'}
				config={{
					youtube: {
						playerVars: {
							rel: 0,
							enablejsapi: 1,
							origin,
							widget_referrer: origin,
						},
					},
				}}
			/>
		);

		setPlayerComponent(player);
	}, []);

	// Handle youtube embed
	if (youtubeVideoURL?.length) {
		return <AspectRatio ratio={16 / 9}>{playerCompnnent}</AspectRatio>;
	}

	// Handle embeded video content
	if (isVideoContent(asset.file.contentType)) {
		const {url} = asset.file;

		return (
			<AspectRatio ratio={16 / 9}>
				<ReactPlayer url={url} width={'100%'} height={'100%'} controls />
			</AspectRatio>
		);
	}

	const altText = asset.title || '';

	// Handle SVG images
	if (asset.file.contentType === 'image/svg+xml') {
		return <img src={asset.file.url} alt={altText} />;
	}

	// Handle PDF content
	if (asset.file.contentType === 'application/pdf' && typeof window !== 'undefined') {
		return <PDFViewer url={asset.file.url} width={width} />;
	}

	const pathToImage = getImage(asset);
	return <GatsbyImage image={pathToImage!} alt={altText} />;
};

export default React.memo(Asset);
