import type { Config } from "https://edge.netlify.com";

const geminiHandler = async (request: Request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST",
      },
    });
  }
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

  console.log("Starting to origin check");
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
  try {
    const body = await request?.json?.();
    console.log("Request body:", body);
    const payload = {
      contents: [{ parts: [{ text: body?.question || "" }] }],
      systemInstruction: {
        parts: [{ text: TRAINNING_DATA }],
      },
    };
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "API request failed" }), {
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
    console.log(err);
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
  path: "/api/get-gemini-chat",
  cache: "manual",
};

const TRAINNING_DATA = ` Direct-to-Patient 2.0: Presented by Deepak Thomas, CEO, PHIL. Building a Commercially-Successful DTP Channel.

            Patients as Consumers: Evolving How Pharma Engages. ~50% of US population in next 2-3 years. 76% of seniors aged 65+ own smartphones. A digital experience is now the base case expectation for everyone from Gen Z to Boomers.

            Pharma’s Response: Cash Play vs. Commercial Impact. Spotlight on GLP-1s: 62% of GLP-1 prescriptions were denied insurance coverage. 49% of GLP-1 patients discontinued treatment. 53% of GLP-1 patients paid in cash, 11% higher than year prior. Big implications on brand performance: Lack of affordability lowers access and adherence. Cash-plays erode financial margins and brand viability.

            Reimagining DTP: A Model for Sustainable Growth. This includes an Integrated Digital Patient Experience, Seamless Multi-Vendor Patient Navigation via Full-Spectrum Data, Economic Viability, and Compliance Guardrails.

            Ahead of the Curve: Keeping Pace with Rapid Change. Factors include increasing consumerism, intensifying access barriers, competitive pressure, rising channel costs, and administration actions. The DTP market size is projected to be $21.4B in 2025, to grow +9% by 2030.

            ---

            Building a Scalable Direct-to-Patient Platform: Strategic Framework for Digital Engagement, Telemedicine, Patient Experience, Fulfillment, & Financials.

            Pharma companies are under pressure to rethink patient access. Underlying trends are driving the industry to a tipping point. Many classes of drugs are facing complex prior authorization requirements. Over 40% of a drug's cost goes to intermediaries, such as PBMs and wholesalers. President Trump demanded that 17 drugmakers offer DTC channels by September 29th, 2025. Consumers are choosing healthcare options that offer a better experience. Eli Lilly, Pfizer, and Novo Nordisk, have all launched direct-to-patient programs.

            A Successful Direct-to-Patient Experience Requires: Integrated Digital Patient Experience, Seamless Multi-Vendor Patient Navigation via Full-Spectrum Data, Patient Affordability & Economic Viability, and Compliance Guardrails.

            Key Building Blocks of a Direct-to-Patient Channel: Digital Marketing Funnel, Telemedicine Platform, and Hub & Fulfillment Partner.

            Creating an Integrated Digital Patient Experience is Critical. The UX Case for DTP: Patients are more likely to get on therapy if the experience mimics how they buy other consumables. Today's highest-performing direct-to-consumer model is low-friction and integrated, addressing price and convenience. Current attempts at DTP don't compare favorably, often being high-friction, high-effort, DIY projects.

            Brands should have sufficient data to be able to follow patients through the entire journey across all vendors to identify experience bottlenecks, enhance channel/ad targeting, and coordinate the patient journey.

            Key P&L Considerations: Get access to new patients, improve conversion rates, and profitability. DTP should drive a meaningful share of patient volume. Fully-loaded DTP should perform better than the traditional brick-and-mortar channel.

            Key Brand Criteria for Telemedicine Platforms: Consider vendor type & incentives, core capabilities, compliance, and controls.

            Hub and Fulfillment Channels Matter to enhance brand control on Gross-to-Net/Patient Affordability, continue the integrated patient experience, and enable innovation and flexibility.

            ---

            Pharma Direct-to-Patient: From Experiment to Imperative.

            Policy pressure, affordability gaps, and consumer expectations are reshaping how pharma companies think about direct to patient access. The question is no longer if, but how.

            New Pathways for Patient Access: Pharmaceutical companies are under pressure to rethink how patients get medicines. Patients are behaving more like consumers expecting digital access, transparent pricing, and streamlined service. Leading pharma companies, including Eli Lilly, Pfizer, and Novo Nordisk, have launched direct-to-patient programs. Over one third of US Zepbound prescriptions now run through LillyDirect. Recent actions by the administration are accelerating the shift.

            Getting the Program Design Right: Success depends on designing around core considerations like affordability, service model design, navigation burden, awareness and discovery, and compliance.

            Affordability: Most DTP programs sell medications for cash at GTN-level prices, which are out of reach for most patients. Pharma companies need to develop models that expand access while providing options for both insurance and cash.

            Service model design: DTP channels can include telemedicine, prescription fulfillment, care navigation, and adherence support, tailored to the therapeutic area.

            Navigation burden: Patients often stitch together services across multiple vendors. The burden should not fall on patients.

            Awareness and discovery: Patients must know that these programs exist. Pfizer publicized PfizerforAll with a Super Bowl ad.

            Compliance: Key issues include patient steerage, physician choice, and patient data privacy.

            Solution approaches:
            Affordability: Start with an insurance-first workflow.
            Service model design: Tailor the service stack to the therapeutic area.
            Reduce navigation burden: Create one front door with a seamless transition.
            Drive awareness and discovery: Market the DTP channel directly.
            Design for compliance: Build with an external physician group and protect patient data.

            Acting on the Opportunity: Direct-to-patient access is no longer optional. Start with a priority brand and design the experience based on its specific access challenges. Build for compliance from day one.
        `;
