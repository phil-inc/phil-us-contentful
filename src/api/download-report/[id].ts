import {
  type GatsbyFunctionRequest,
  type GatsbyFunctionResponse,
} from "gatsby";
import { verifyDownloadToken } from "../../utils/downloadToken";

type ContentfulAsset = {
  fields?: {
    title?: string;
    file?: {
      url?: string;
      fileName?: string;
      contentType?: string;
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

  const assetId = req.params.id;
  const token =
    typeof req.query.token === "string" ? req.query.token : undefined;
  if (!assetId || !token) {
    res.status(401).json({ error: "missing_token" });
    return;
  }

  const payload = verifyDownloadToken(token, secret);
  if (!payload || payload.assetId !== assetId) {
    res.status(403).json({ error: "invalid_token" });
    return;
  }

  const asset = await fetchContentfulAsset(assetId);
  const fileUrl = asset?.fields?.file?.url;
  if (!fileUrl) {
    res.status(404).json({ error: "asset_not_found" });
    return;
  }

  const absolute = fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl;
  const upstream = await fetch(absolute);
  if (!upstream.ok || !upstream.body) {
    res.status(502).json({ error: "upstream_failed" });
    return;
  }

  const contentType =
    upstream.headers.get("content-type") ||
    asset?.fields?.file?.contentType ||
    "application/pdf";
  const fileName =
    asset?.fields?.file?.fileName ||
    asset?.fields?.title ||
    `${assetId}.pdf`;

  res.setHeader("Content-Type", contentType);
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${fileName.replace(/"/g, "")}"`,
  );
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Cache-Control", "private, no-store");

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) res.setHeader("Content-Length", contentLength);

  const buf = Buffer.from(await upstream.arrayBuffer());
  res.status(200).send(buf);
};

export default handler;
