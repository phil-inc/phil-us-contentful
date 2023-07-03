import { parse } from "https://deno.land/x/xml@2.1.1/mod.ts"

const ISOLVEDHIRE_FEED = "https://phil.isolvedhire.com/feeds/jobs_by_domain.xml";
const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:8888", "https://develop--phil-us.netlify.app", "https://stage--phil-us.netlify.app", "https://phil.us"];

const getCareerListing = async (request: Request) => {
    const origin = request.headers.get("origin") || new URL(request.headers.get("referer") || "").origin;
    // If the origin is not allowed or not the same origin, deny the request
    if (!ALLOWED_ORIGINS.includes(origin)) {
        return new Response(JSON.stringify({ error: "Not allowed" }), {
            status: 403,
            headers: {
              "Content-Type": "application/json",
            },
        });
    }

    try {
        const response = await fetch(ISOLVEDHIRE_FEED);
        const text = await response.text();
        const json = parse(text);
        
        const jobs = json?.source?.job?.map((j: any) => {
          const locationString = [j.city, j.state, j.country];
          const ls = locationString.filter((item: string) => Boolean(item)).join(', ');
    
          return {
            title: j.title,
            url: j.url,
            location: ls,
            department: j.department,
          };
        });
    
        // Return JSON response
        return new Response(JSON.stringify(jobs), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
          },
        });
    
    } catch (error) {
        return new Response(JSON.stringify({ error: `Failed to parse XML: ${error.message}` }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }
};

export default getCareerListing;

export const config = { path: "/api/get-career-listing" };
