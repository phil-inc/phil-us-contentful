import React, {forwardRef, Suspense, type FC} from 'react';
import {AspectRatio, Image} from '@mantine/core';
import {GatsbyImage, type GatsbyImageProps, getImage} from 'gatsby-plugin-image';
import type {TAsset} from 'types/asset';
import {isVideoContent} from 'utils/isVideoContent';
import {getYouTubeId} from 'utils/links';
import loadable from '@loadable/component';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import {type MediaItem} from 'types/section';

const LiteYouTubeEmbed = loadable(async () => import('react-lite-youtube-embed'));
const PDFViewer = loadable(async () => import('../PDFViewer/PDFViewer'));

type AssetProps = {
	asset: TAsset | MediaItem;
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
	const {asset, youtubeVideoURL: youtubeURL, width, objectFit} = props;

	let media = asset;
	let url = '';
	let title = '';
	let contentType = '';
	let youtubeVideoURL = youtubeURL;

	// TODO: handle this better
	if (asset?.media) {
		media = asset?.media;
		url = asset?.media?.file?.url ?? '';
		title = asset?.name ?? '';
		contentType = asset?.media?.file?.contentType ?? '';
	} else if (asset?.youtubeLink) {
		youtubeVideoURL = asset?.youtubeLink ?? '';
	} else {
		url = asset?.file?.url ?? '';
		title = asset?.title ?? '';
		contentType = asset?.file?.contentType ?? '';
	}

	const renderContent = () => {
		if (youtubeVideoURL?.length) {
			const vid = getYouTubeId(youtubeVideoURL);
			return vid && <YouTubeEmbed videoId={vid} title={title} />;
		}

		if (isVideoContent(contentType)) {
			return (
				<AspectRatio ratio={16 / 9}>
					<video src={url} width={'99%'} height={'100%'} controls />
				</AspectRatio>
			);
		}

		if (contentType === 'image/svg+xml') {
			return <img style={{objectFit}} src={url} alt={title} />;
		}

		if (contentType === 'application/pdf' && typeof window !== 'undefined') {
			return <PDFViewer url={url} pageContainerWidth={width!} ref={ref} />;
		}

		if (contentType?.startsWith('image/')) {
			const pathToImage = getImage(media);
			return <GatsbyImage objectFit='fill' image={pathToImage!} alt={title} />;
		}

		return null;
	};

	return <Suspense fallback={<div>Loading...</div>}>{renderContent()}</Suspense>;
});

export default Asset;
