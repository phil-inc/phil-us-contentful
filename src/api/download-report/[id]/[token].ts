import {
  type GatsbyFunctionRequest,
  type GatsbyFunctionResponse,
} from "gatsby";
import { verifyDownloadToken } from "../../../utils/downloadToken";
import { externalReportUrl } from "../../../utils/gatedReports";

type ContentfulAsset = {
  fields?: {
    file?: {
      url?: string;
    };
  };
};

async function fetchContentfulAsset(
  assetId: string,
): Promise<ContentfulAsset | null> {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const env = process.env.CONTENTFUL_ENVIRONMENT || "master";
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !token) return null;

  const url = `https://cdn.contentful.com/spaces/${space}/environments/${env}/assets/${encodeURIComponent(
    assetId,
  )}?access_token=${token}`;

  const res = await fetch(url);
  if (!res.ok) return null;
  return (await res.json()) as ContentfulAsset;
}

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) => {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) {
    res.status(500).json({ error: "server_not_configured" });
    return;
  }

  const { id: assetId, token } = req.params;
  if (!assetId || !token) {
    res.status(401).json({ error: "missing_token" });
    return;
  }

  const payload = verifyDownloadToken(token, secret);
  if (!payload || payload.assetId !== assetId) {
    res.status(403).json({ error: "invalid_token" });
    return;
  }

  const externalUrl = externalReportUrl(assetId);
  if (externalUrl !== undefined) {
    if (!externalUrl) {
      res.status(500).json({ error: "server_not_configured" });
      return;
    }
    redirectToFile(res, externalUrl);
    return;
  }

  const asset = await fetchContentfulAsset(assetId);
  const fileUrl = asset?.fields?.file?.url;
  if (!fileUrl) {
    res.status(404).json({ error: "asset_not_found" });
    return;
  }

  redirectToFile(res, fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl);
};

function redirectToFile(res: GatsbyFunctionResponse, url: string) {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Location", url);
  res.status(302).end();
}

export default handler;
