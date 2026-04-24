import {
  type GatsbyFunctionRequest,
  type GatsbyFunctionResponse,
} from "gatsby";
import { signDownloadToken } from "../utils/downloadToken";

const TOKEN_TTL_SECONDS = 10 * 60;

const ALLOWED_ORIGINS = new Set([
  "https://www.phil.us",
  "https://phil.us",
  "http://localhost:3000",
  "http://localhost:9000",
]);

type Body = {
  assetId?: string;
};

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    res.status(403).json({ error: "forbidden_origin" });
    return;
  }

  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) {
    res.status(500).json({ error: "server_not_configured" });
    return;
  }

  const { assetId } = (req.body ?? {}) as Body;
  if (!assetId) {
    res.status(400).json({ error: "missing_asset_id" });
    return;
  }

  const token = signDownloadToken(
    {
      assetId,
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    },
    secret,
  );

  res.status(200).json({ token });
};

export default handler;
