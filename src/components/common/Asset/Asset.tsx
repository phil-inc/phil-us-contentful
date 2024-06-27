import React, { forwardRef, Suspense, type FC } from 'react';
import { AspectRatio } from '@mantine/core';
import { GatsbyImage, type GatsbyImageProps, getImage } from 'gatsby-plugin-image';
import type { TAsset } from 'types/asset';
import { isVideoContent } from 'utils/isVideoContent';
import { getYouTubeId } from 'utils/links';
import loadable from '@loadable/component';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { type MediaItem } from 'types/section';

const LiteYouTubeEmbed = loadable(() => import('react-lite-youtube-embed'));
const PDFViewer = loadable(() => import('../PDFViewer/PDFViewer'));

type AssetProps = {
  asset: TAsset & MediaItem;
  youtubeVideoURL?: string;
  width?: number;
  objectFit?: GatsbyImageProps['objectFit'];
};

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ videoId, title }) => (
  <AspectRatio ratio={16 / 9}>
    <LiteYouTubeEmbed
      id={videoId}
      adNetwork
      params='rel=0'
      rel='0'
      poster='maxresdefault'
      title={title}
      noCookie
    />
  </AspectRatio>
);

const extractAssetData = (asset: TAsset & MediaItem, youtubeVideoURL?: string) => {
  const media = asset.media ?? asset;
  const url = asset.media?.file?.url || asset.file?.url || '';
  const title = asset.name ?? asset.title ?? '';
  const contentType = asset.media?.file?.contentType || asset.file?.contentType || '';
  const videoURL = youtubeVideoURL || asset.youtubeLink || '';

  return { media, url, title, contentType, videoURL };
};

const Asset = forwardRef<HTMLDivElement, AssetProps>(({
  asset,
  youtubeVideoURL,
  width,
  objectFit
}, ref) => {
  const { media, url, title, contentType, videoURL } = extractAssetData(asset, youtubeVideoURL);

  const renderContent = () => {
    if (videoURL) {
      const videoId = getYouTubeId(videoURL);
      return videoId ? <YouTubeEmbed videoId={videoId} title={title} /> : null;
    }

    if (isVideoContent(contentType)) {
      return (
        <AspectRatio ratio={16 / 9}>
          <video src={url} width='99%' height='100%' controls />
        </AspectRatio>
      );
    }

    if (contentType === 'image/svg+xml') {
      return <img style={{ objectFit }} src={url} alt={title} />;
    }

    if (contentType === 'application/pdf' && typeof window !== 'undefined') {
      return <PDFViewer url={url} pageContainerWidth={width!} ref={ref} />;
    }

    if (contentType.startsWith('image/')) {
      const image = getImage(media);
      return <GatsbyImage objectFit='cover' image={image!} alt={title} />;
    }

    return null;
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderContent()}</Suspense>;
});

export default Asset;
