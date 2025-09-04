const CAPI_BASE_URI =
  process.env.GATSBY_CAPI_BASE_URI ?? "http://localhost:8888";
export const CHANNEL_COMPARISION_API =
  CAPI_BASE_URI + "/api/cs/v1/channel-comparision/";
export const HUBSPOT_CHANNEL_COMPARISION_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit/20880193/f2d019dc-fb08-4623-81c4-a9b416224a68";
export const CAREER_LISTING_URL = "https://phil.us/api/get-career-listing";


const GEMINI_API_KEY = process.env.GATSBY_GEMINI_API_KEY ?? "";
const GEMINI_MODEL = "gemini-2.5-flash";
export const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;