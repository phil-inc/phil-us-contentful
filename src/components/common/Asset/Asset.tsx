import React, {forwardRef, Suspense, type FC} from 'react';
import {AspectRatio, Image} from '@mantine/core';
import {GatsbyImage, type GatsbyImageProps, getImage} from 'gatsby-plugin-image';
import type {TAsset} from 'types/asset';
import {isVideoContent} from 'utils/isVideoContent';
import {getYouTubeId} from 'utils/links';
import loadable from '@loadable/component';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const LiteYouTubeEmbed = loadable(async () => import('react-lite-youtube-embed'));
const PDFViewer = loadable(async () => import('../PDFViewer/PDFViewer'));

type AssetProps = {
	asset: TAsset;
	youtubeVideoURL?: string;
	width?: number;
	objectFit?: GatsbyImageProps['objectFit'];
};

type YouTubeEmbedProps = {
	videoId: string;
	title: string;
};

export const YouTubeEmbed: FC<YouTubeEmbedProps> = ({videoId, title}) => (
	<AspectRatio ratio={16 / 9}>
		<LiteYouTubeEmbed
			id={videoId}
			adNetwork={true}
			params='rel=0'
			rel='0'
			poster='maxresdefault'
			title={title}
			noCookie={true}
		/>
	</AspectRatio>
);

const Asset = forwardRef<HTMLDivElement, AssetProps>((props: AssetProps, ref) => {
	const {asset, youtubeVideoURL, width, objectFit} = props;

	const renderContent = () => {
		if (youtubeVideoURL?.length) {
			const vid = getYouTubeId(youtubeVideoURL);
			return vid && <YouTubeEmbed videoId={vid} title={asset.title || ''} />;
		}

		if (isVideoContent(asset.file.contentType)) {
			return (
				<AspectRatio ratio={16 / 9}>
					<video src={asset.file.url} width={'99%'} height={'100%'} controls />
				</AspectRatio>
			);
		}

		if (asset.file.contentType === 'image/svg+xml') {
			return <img style={{objectFit}} src={asset.file.url} alt={asset.title || ''} />;
		}

		if (asset.file.contentType === 'application/pdf' && typeof window !== 'undefined') {
			return <PDFViewer url={asset.file.url} pageContainerWidth={width!} ref={ref} />;
		}

		if (asset.file.contentType.startsWith('image/')) {
			const pathToImage = getImage(asset);
			return <GatsbyImage objectFit='fill' image={pathToImage!} alt={asset.title || ''} />;
		}

		return null;
	};

	return <Suspense fallback={<div>Loading...</div>}>{renderContent()}</Suspense>;
});

export default React.memo(Asset);
