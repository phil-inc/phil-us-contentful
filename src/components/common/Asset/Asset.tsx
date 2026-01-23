import React, { forwardRef, Suspense, type FC } from "react";
import {
  GatsbyImage,
  type GatsbyImageProps,
  getImage,
} from "gatsby-plugin-image";
import type { TAsset } from "types/asset";
import { isVideoContent } from "utils/isVideoContent";
import { getYouTubeId } from "utils/links";
import loadable from "@loadable/component";
import cx from 'clsx';

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { type MediaItem } from "types/section";
import { extractAssetData } from "utils/asset";

import YouTubeVideo from "components/common/Asset/YoutubeVideo";

import * as classes from "./asset.module.css";

const PDFViewer = loadable(() => import("../PDFViewer/PDFViewer"));

type AssetProps = {
  asset: TAsset & MediaItem;
  youtubeVideoURL?: string;
  width?: number;
  objectFit?: GatsbyImageProps["objectFit"];
  isFullWidth?: boolean;
  isHeightInherit?: boolean;
  isFullWidthHeight?: boolean;
};

const Asset = forwardRef<HTMLDivElement, AssetProps>(
  ({ asset, youtubeVideoURL, width, objectFit, isFullWidth, isHeightInherit,isFullWidthHeight }, ref) => {
    const { media, url, title, contentType, videoURL } = extractAssetData(
      asset,
      youtubeVideoURL,
    );

    const renderContent = () => {
      if (videoURL) {
        const videoId = getYouTubeId(videoURL);

         return videoId ? (
          <YouTubeVideo videoId={videoId} title={title} />
        ) : null;
      }

      if (isVideoContent(contentType)) {
        return <video src={url} width="99%" height="100%" controls />;
      }

      if (contentType === "image/svg+xml") {
        return <img style={{ objectFit }} src={url} alt={title} />;
      }

      if (contentType === "application/pdf" && typeof window !== "undefined") {
        return <PDFViewer url={url} pageContainerWidth={width!} ref={ref} />;
      }

      if (contentType.startsWith("image/")) {
        const image = getImage(media);
        return <GatsbyImage 
          objectFit={objectFit || "cover"}
          image={image!}
          alt={title}
          className={cx(classes.gatsbyImageContainer, { [classes.fullWidth]: Boolean(isFullWidth), [classes.fullWidthHeight]: Boolean(isFullWidthHeight), [classes.heightInherit]: Boolean(isHeightInherit) })} 
        />;
      }

      return null;
    }


    return (
      <Suspense fallback={<div>Loading...</div>}>{renderContent()}</Suspense>
    );
  },
);

export default Asset;
