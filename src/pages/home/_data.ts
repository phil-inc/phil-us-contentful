export const HERO = {
  title: {
    before: "The ",
    emphasis: "Simple Path",
    after: " to Affordable Medication Access",
  },
  subtitle:
    "PHIL is the digital hub and direct-to-patient platform that helps pharma brands maximize starts, coverage, adherence, and commercial performance.",
};

export const AUDIENCE_CHIPS = [
  {
    id: "pharma",
    variant: "pharma" as const,
    tag: "For Pharma",
    heading:
      "Improve patient outcomes and commercial performance for your retail and specialty-lite brands",
    cta: "Brand Experience",
    href: "/pharma/",
  },
  {
    id: "patients",
    variant: "patients" as const,
    tag: "For Patients",
    heading:
      "Get affordable medications delivered right to your door with PHILRx",
    cta: "Patient Experience",
    href: "/patients/",
  },
  {
    id: "providers",
    variant: "providers" as const,
    tag: "For Providers",
    heading:
      "Improve patient care with in-workflow prescribing and PA tools through PHILRx",
    cta: "Provider Experience",
    href: "/providers/",
  },
];

export const OUTCOMES = {
  heading: "Helping Pharma Brands Grow",
  stats: [
    { value: 2, suffix: "X+", label: "Patient Starts", sublabel: "vs. Traditional Channels" },
    { value: 2, suffix: "X+", label: "Covered Dispenses", sublabel: "vs. Traditional Channels" },
    { value: 3, suffix: "X+", label: "Refill Adherence", sublabel: "vs. Traditional Channels" },
    { value: 4.8, decimals: 1, suffix: "/5.0", label: "Patient Satisfaction Score" },
  ],
  trustpilot: {
    locale: "en-US",
    templateId: "5419b6ffb0d04a076446a9af",
    businessUnitId: "60e5837e95cb800001e58b14",
    token: "825768d4-bb04-42e7-84a3-df76f9202ad6",
  },
};

export type SolutionCard = {
  key: string;
  tag: string;
  title: string;
  body: string;
  stats: Array<{ value: number; decimals?: number; suffix: string; label: string }>;
};

export const SOLUTION = {
  title: "Maximize Patient Outcomes and Commercial Performance",
  subtitle:
    "We help retail and specialty-lite brands break through access barriers to improve commercial performance. Our end-to-end digital hub and direct-to-patient platform delivers strong results through human-first care, innovative technology, and AI-supported outcomes.",
  lead: "PHIL is helping pharma",
  leadEmphasis: "lead the way",
  pills: ["Digital Access", "PA & Coverage", "Dispense Network", "Data & Insights"],
  cards: [
    {
      key: "access",
      tag: "Digital Access",
      title: "Seamless Digital Experience & Direct-to-Patient Services",
      body: "Engage patients at every touchpoint with a branded, end-to-end medication access experience. From intake to routing to dispensing, PHIL helps pharma brands build a digital front door that drives patient starts, adherence, and satisfaction.",
      stats: [
        { value: 2, suffix: "x+", label: "Patient Starts" },
        { value: 3, suffix: "x+", label: "Refill Adherence" },
        { value: 4.8, decimals: 1, suffix: "/5.0", label: "Patient Satisfaction" },
      ],
    },
    {
      key: "afford",
      tag: "PA & Coverage",
      title: "Superior Prior Authorization & Coverage Outcomes",
      body: "Improve affordability with an advanced prior authorization process and built-in coverage workflows to help reduce out-of-pocket costs for patients. We bring copay support, financial assistance, and flexible access pathways together in one seamless experience.",
      stats: [
        { value: 90, suffix: "%+", label: "PA Submission Rate" },
        { value: 2, suffix: "x+", label: "Covered Dispenses" },
      ],
    },
    {
      key: "adhere",
      tag: "Dispense Network",
      title: "Integrated Dispense Network & Wholesale",
      body: "Deliver medications quickly through our nationwide pharmacy network with commercial and cash dispense capabilities. Our integrated dispense network offers fast fulfillment with free shipping, refill reminders, and a seamless delivery experience.",
      stats: [
        { value: 50, suffix: "-state", label: "Dispense Network" },
        { value: 99, suffix: "%+", label: "Plan Coverage" },
      ],
    },
    {
      key: "impact",
      tag: "Data & Insights",
      title: "End-to-End Technology, Data & Insights",
      body: "Build a lasting commercial advantage with a unified access platform. PHIL's advanced data capabilities, AI-powered workflows, and dedicated Client Insights team work seamlessly to surface opportunities to improve patient outcomes and brand performance.",
      stats: [
        { value: 3, suffix: "x+", label: "GTN Lift" },
        { value: 360, suffix: "°", label: "Program Insights" },
      ],
    },
  ] as SolutionCard[],
  cta: { text: "Explore Our Solution →", href: "/solution/" },
};

export type VoiceQuote = { q: string; a: string };

export const VOICES = {
  title: "A Trusted Partner to Pharma, Patients, and Providers",
  subtitle:
    "We're on a mission to simplify medication access for all. We're proud to have industry-leading satisfaction scores that reflect our commitment to delivering a superior experience across the board.",
  cards: [
    {
      variant: "pharma" as const,
      tag: "What Pharma Says",
      quotes: [
        {
          q: "Phil is very strong in driving starts and adherence across our portfolio. As a partner, we love their willingness to be agile and create new things with us that haven’t been done before.",
          a: "SVP Market Access, PHIL Client",
        },
        {
          q: "We consider PHIL’s integrated digital platform and their ability to drive conversions to be best in the field. They deliver a true, e-commerce experience for patients versus the much more cumbersome traditional patient experience.",
          a: "Director of Patient Support Services, PHIL Client",
        },
        {
          q: "We selected Phil because of their leadership in the space, as well as their ability to offer real-time access to end-to-end data in a single platform. This was really important to us and our brand.",
          a: "Head of Commercial, PHIL Client",
        },
      ] as VoiceQuote[],
    },
    {
      variant: "patients" as const,
      tag: "What Patients Say",
      quotes: [
        {
          q: "The staff at PHIL are very customer-oriented, staying connected and providing guidance throughout the whole prescription process. They are knowledgeable and friendly. The experience was pleasant!",
          a: "Ryan S., Patient",
        },
        {
          q: "I wasn’t able to afford a medication that helped me. My doctor found it through PHIL, I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.",
          a: "Carla R., Patient",
        },
        {
          q: "I felt that my needs were being considered from the very beginning. That was so refreshing to me because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!",
          a: "Dawn M., Patient",
        },
      ] as VoiceQuote[],
    },
    {
      variant: "providers" as const,
      tag: "What Providers Say",
      quotes: [
        {
          q: "PHILRx is very helpful with getting my patients their medications quickly.",
          a: "Jeffrey T., Healthcare provider",
        },
        {
          q: "Communication is fantastic! From start to finish, PHILRx does a great job keeping [our office] in the loop.",
          a: "Susan F., Healthcare provider",
        },
        {
          q: "PHILRx provides great support for patients, and convenient ways for providers to reach out.",
          a: "Elizabeth R., Healthcare provider",
        },
      ] as VoiceQuote[],
    },
  ],
  cta: { text: "Explore Customer Stories →", href: "/resources/?type=casestudy" },
};

export const INSIGHTS = {
  title: "Our Commitment to Your Success",
  subtitle:
    "We're advancing medication access for patients, providers, and pharma brands through innovative technology and dedicated partnership. Explore our latest news and insights to help move your brand forward.",
  cards: [
    {
      variant: "report" as const,
      tag: "Featured Report",
      title: "Patient Perspectives on Direct-to-Patient: Improving Access and Adherence",
      cta: "Read report",
      href: "/dtp-research/",
    },
    {
      variant: "webinar" as const,
      tag: "Featured Report",
      title: "HCP Perspectives on Direct-to-Patient: Engaging Providers in the Digital Era",
      cta: "Read report",
      href: "/hcp-research/",
    },
    {
      variant: "blog" as const,
      tag: "Featured Report",
      title: "5 Key Success Factors to Drive Brand Excellence",
      cta: "Read report",
      href: "/key-success-factors-to-drive-brand-excellence/",
    },
  ],
  cta: { text: "Explore Resources →", href: "/resources/" },
};

export const END_CTA = {
  eyebrow: "Ready to simplify medication access?",
  title: "Accelerate Access, Affordability, and Adherence",
  body: "Discover how PHIL can help your brands maximize patient outcomes and commercial performance.",
  cta: { text: "Book Demo", href: "/demo/" },
};

export const SEO = {
  title: "PHIL — Medication Access, Simplified.",
  description:
    "PHIL is the digital hub and direct-to-patient platform that helps pharma brands maximize starts, coverage, adherence, and commercial performance.",
  url: "https://phil.us/",
};
