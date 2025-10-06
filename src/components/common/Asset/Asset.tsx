import React, { forwardRef, Suspense, type FC } from "react";
import { AspectRatio } from "@mantine/core";
import {
  GatsbyImage,
  type GatsbyImageProps,
  getImage,
} from "gatsby-plugin-image";
import type { TAsset } from "types/asset";
import { isVideoContent } from "utils/isVideoContent";
import { getYouTubeId } from "utils/links";
import loadable from "@loadable/component";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { type MediaItem } from "types/section";
import { extractAssetData } from "utils/asset";

import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import HybridYouTube from "components/common/Asset/HybridYoutube";

import * as classes from "./asset.module.css";

const LiteYouTubeEmbed = loadable(() => import("react-lite-youtube-embed"));
const PDFViewer = loadable(() => import("../PDFViewer/PDFViewer"));

type AssetProps = {
  asset: TAsset & MediaItem;
  youtubeVideoURL?: string;
  width?: number;
  objectFit?: GatsbyImageProps["objectFit"];
};

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

const Asset = forwardRef<HTMLDivElement, AssetProps>(
  ({ asset, youtubeVideoURL, width, objectFit }, ref) => {
    const { media, url, title, contentType, videoURL } = extractAssetData(
      asset,
      youtubeVideoURL,
    );
    const [isYtReady, setIsYtReady] = React.useState(false);


    React.useEffect(() => {
        const timer = setTimeout(() => setIsYtReady(true), 1500); // wait 1.5s

      return () => clearTimeout(timer);
    },[]);
    

    const renderContent = React.useCallback(() => {
        if (videoURL) {
        const videoId = getYouTubeId(videoURL);

        if(!videoId) return null;

        return isYtReady ?
        <HybridYouTube videoId={videoId} title={title || "YouTube video"} />
        : <LoadingIndicator size="xl"/>;
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
        return <GatsbyImage objectFit={objectFit || "cover"} image={image!} alt={title} className={classes.gatsbyImageContainer}  />;
      }

      return null;
    }, [isYtReady]);


    return (
      <Suspense fallback={<div>Loading...</div>}>{renderContent()}</Suspense>
    );
  },
);

export default Asset;
