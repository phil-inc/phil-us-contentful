import type { Config } from "https://edge.netlify.com";

import { TRAINNING_DATA } from "constants/trainned.constant";

const geminiHandler = async (request: Request) => {
  const GEMINI_MODEL = "gemini-2.5-flash";
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

  if (!GEMINI_API_KEY) {
    const error = "Failed to initiate function. GEMINI_API_KEY is undefined.";
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let origin: string;
  try {
    origin =
      request.headers.get("origin") ||
      new URL(request.headers.get("referer") || "").origin ||
      "";
  } catch (err) {
    console.error("Unable to determine request origin from headers", err);
    origin = "";
  }

  const allowedOrigins = Deno.env.get("ALLOWED_ORIGINS")?.split(",") || [];
  if (!allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ error: "Not allowed" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  }

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
  const body = JSON.parse(request.body);
  const payload = {
    contents: [{ parts: [{ text: body.question }] }],
    systemInstruction: {
      parts: [{ text: TRAINNING_DATA }],
    },
  };

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "cache-control": "public, s-maxage=120",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  } catch (err) {
    console.error(error);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export default geminiHandler;

export const config: Config = {
  path: "/api/get-gemini-model",
  cache: "manual",
};
