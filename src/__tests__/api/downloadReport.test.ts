import handler from "../../api/download-report/[id]/[token]";
import { signDownloadToken } from "../../utils/downloadToken";

const SECRET = "test-secret";
const REPORT_URL = "https://files.example.com/pharma-dtp-report.pdf";
const ENV_KEYS = [
  "DOWNLOAD_TOKEN_SECRET",
  "PHARMA_DTP_REPORT_URL",
  "CONTENTFUL_SPACE_ID",
  "CONTENTFUL_ACCESS_TOKEN",
];

type FakeResponse = {
  statusCode: number;
  body: unknown;
  headers: Record<string, string>;
};

function fakeResponse() {
  const res: FakeResponse & Record<string, unknown> = { statusCode: 0, body: undefined, headers: {} };
  res.status = (code: number) => ((res.statusCode = code), res);
  res.json = (body: unknown) => ((res.body = body), res);
  res.setHeader = (name: string, value: string) => ((res.headers[name] = value), res);
  res.end = () => res;
  return res;
}

async function download(id: string, tokenFor: string = id) {
  const token = signDownloadToken(
    { assetId: tokenFor, exp: Math.floor(Date.now() / 1000) + 600 },
    SECRET,
  );
  const res = fakeResponse();
  await handler({ params: { id, token } } as never, res as never);
  return res;
}

describe("/api/download-report for reports hosted outside Contentful", () => {
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    ENV_KEYS.forEach((key) => {
      saved[key] = process.env[key];
      delete process.env[key];
    });
    process.env.DOWNLOAD_TOKEN_SECRET = SECRET;
  });

  afterEach(() => {
    ENV_KEYS.forEach((key) => {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    });
  });

  it("redirects a valid pharma-dtp-research token to the URL in PHARMA_DTP_REPORT_URL, marked noindex", async () => {
    process.env.PHARMA_DTP_REPORT_URL = REPORT_URL;

    const res = await download("pharma-dtp-research");

    expect(res.statusCode).toBe(302);
    expect(res.headers.Location).toBe(REPORT_URL);
    expect(res.headers["X-Robots-Tag"]).toBe("noindex, nofollow");
    expect(res.headers["Cache-Control"]).toBe("private, no-store");
  });

  it("answers 500 instead of guessing when PHARMA_DTP_REPORT_URL is not set", async () => {
    const res = await download("pharma-dtp-research");

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "server_not_configured" });
    expect(res.headers.Location).toBeUndefined();
  });

  it.each(["7HX1YXkBnapW2lpPnwdFV0", "constructor"])(
    "still looks %s up in Contentful rather than using the external URL",
    async (id) => {
      process.env.PHARMA_DTP_REPORT_URL = REPORT_URL;

      const res = await download(id);

      // No Contentful credentials in the test run, so the Contentful lookup finds nothing.
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: "asset_not_found" });
    },
  );
});
