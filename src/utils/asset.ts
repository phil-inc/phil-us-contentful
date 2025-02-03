import { TAsset } from "types/asset";
import { MediaItem } from "types/section";

export const extractAssetData = (
  asset: TAsset & MediaItem,
  youtubeVideoURL?: string,
) => {
  const media = asset?.media ?? asset;
  const url = asset?.media?.file?.url || asset?.file?.url || "";
  const title = asset?.name ?? asset?.title ?? "";
  const contentType =
    asset?.media?.file?.contentType || asset?.file?.contentType || "";
  const videoURL = youtubeVideoURL || asset.youtubeLink || "";

  return { media, url, title, contentType, videoURL };
};
