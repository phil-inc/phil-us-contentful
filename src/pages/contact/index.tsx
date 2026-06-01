import React from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import * as classes from "./contact.module.css";

const CONTACT_TITLE = "Contact Us — PHIL";
const CONTACT_DESC =
  "Our team is happy to help! Tell us who you are, and we'll connect you to the right people for support.";
const CONTACT_URL = "https://phil.us/contact";
const CONTACT_OG_IMAGE = getOgImage(null);
const CONTACT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": CONTACT_URL,
  url: CONTACT_URL,
  name: CONTACT_TITLE,
  description: CONTACT_DESC,
  image: CONTACT_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PharmaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="8" y="5" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9.5 10h13v15a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M16 15v6m-3-3h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PatientIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="11" r="4.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 26c0-4.4 4-7 9-7s9 2.6 9 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ProviderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M9 5v8a5 5 0 0 0 10 0V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 5h4M17 5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 18v3a5 5 0 0 0 5 5h0a4 4 0 0 0 4-4v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="23" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CirclesArt = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 1000" width="100%" height="100%" aria-hidden="true">
    {/* Row 1 */}
    <circle cx="100" cy="0" r="100" fill="#d4efef" />
    <circle cx="300" cy="0" r="100" fill="#d4efef" />
    {/* Row 2 */}
    <circle cx="300" cy="200" r="100" fill="#00827a" />
    <circle cx="500" cy="200" r="100" fill="#00827a" />
    {/* Row 3 */}
    <circle cx="100" cy="400" r="100" fill="#5ebea3" />
    <circle cx="300" cy="400" r="100" fill="#00827a" />
    <circle cx="500" cy="400" r="100" fill="#5ebea3" />
    {/* Row 4 */}
    <circle cx="100" cy="600" r="100" fill="#00827a" />
    <circle cx="300" cy="600" r="100" fill="#00827a" />
    {/* Row 5 */}
    <circle cx="100" cy="800" r="100" fill="#d4efef" />
    <circle cx="300" cy="800" r="100" fill="#5ebea3" />
    <circle cx="500" cy="800" r="100" fill="#00827a" />
    {/* Row 6 */}
    <circle cx="100" cy="1000" r="100" fill="#d4efef" />
  </svg>
);

const CARDS = [
  {
    icon: <PharmaIcon />,
    heading: "Pharma",
    body: "Interested in partnering with PHIL? Book a discovery call with our sales team.",
    ctaText: "Book Demo",
    href: "/demo",
    external: true,
  },
  {
    icon: <PatientIcon />,
    heading: "Patients & Caregivers",
    body: "Questions about your PHILRx prescription? Visit our patient help center for support.",
    ctaText: "Contact Patient Support",
    href: "https://philhelp.zendesk.com/hc/en-us/requests/new?ticket_form_id=18810700002196",
    external: true,
  },
  {
    icon: <ProviderIcon />,
    heading: "Healthcare Providers",
    body: "Questions about prescribing to PHILRx? Our HCP support team can help.",
    ctaText: "Contact HCP Support",
    href: "/contact/hcp-support",
    external: true,
  },
];

const ContactPage = () => (
  <PageContext.Provider value={{ title: "Contact Us" }}>
    <Layout>
      <main className={classes.contactPage}>
        <section className={classes.band}>
          <div className={`xl-container ${classes.bandContainer}`}>
            <div className={classes.bandCopy}>
              <div className={classes.bandEyebrow}>
                <span className={classes.bandEyebrowRule} />
                Contact Us
              </div>
              <h1 className={classes.bandTitle}>Get In Touch</h1>
              <p className={classes.bandIntro}>
                Our team is happy to help! Tell us who you are, and we'll connect you to the right people for support.
              </p>
            </div>
          </div>
          <div className={classes.bandArt} aria-hidden="true">
            <CirclesArt />
          </div>
        </section>

        <section className={classes.cards} aria-label="Choose who you are">
          <div className={`xl-container ${classes.cardsGrid}`}>
            {CARDS.map((card) => (
              <a
                key={card.heading}
                className={classes.card}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
              >
                <span className={classes.cardIcon}>{card.icon}</span>
                <h2 className={classes.cardHeading}>{card.heading}</h2>
                <p className={classes.cardBody}>{card.body}</p>
                <span className={classes.cardCta}>
                  {card.ctaText}
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>

          <div className={`xl-container ${classes.bannerWrap}`}>
            <a className={classes.banner} href="/contact/get-in-touch" target="_blank" rel="noopener noreferrer">
              <div className={classes.bannerCopy}>
                Still have a question? Reach out to the PHIL team here
              </div>
              <span className={classes.bannerCta}>
                Get in touch
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 9h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </section>
      </main>
    </Layout>
  </PageContext.Provider>
);

export default ContactPage;

export const Head: HeadFC = () => (
  <>
    <title>{CONTACT_TITLE}</title>
    <meta name="description" content={CONTACT_DESC} />
    <link rel="canonical" href={CONTACT_URL} />
    <meta property="og:title" content={CONTACT_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={CONTACT_DESC} />
    <meta property="og:image" content={CONTACT_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={CONTACT_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={CONTACT_TITLE} />
    <meta name="twitter:description" content={CONTACT_DESC} />
    <meta name="twitter:image" content={CONTACT_OG_IMAGE} />
    <script type="application/ld+json">{CONTACT_SCHEMA}</script>
  </>
);
