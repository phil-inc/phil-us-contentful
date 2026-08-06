import React from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { getOgImage } from "utils/getOgImage";

import {
  ANNEX_TITLE,
  ANNEX_DESC,
  ANNEX_URL,
  PRIVACY_PATH,
  PRIVACY_EMAIL,
  PHIL_HOME_URL,
  WA_AG_COMPLAINT_URL,
  GOOGLE_PRIVACY_URL,
  GOOGLE_OPTOUT_URL,
  OPTOUT_FORM_URL,
  CHD_EXAMPLES,
  CHD_SHARING_ENTITIES,
  PI_TABLE_HEADERS,
  PI_TABLE_ROWS,
  USES_OF_PI,
  SENSITIVE_PI_PURPOSES,
  INCENTIVE_EXAMPLES,
} from "./_data";
import * as classes from "./annex.module.css";

declare global {
  interface Window {
    // Exposed by the CookieYes banner (injected via GTM). Reopens the
    // consent preference center.
    revisitCkyConsent?: () => void;
  }
}

// ─── Inline link helpers ─────────────────────────────────────────────────────

const Priv: React.FC<{ children?: React.ReactNode }> = ({
  children = "Privacy Notice",
}) => (
  <Link to={PRIVACY_PATH} className={classes.link}>
    {children}
  </Link>
);

const Ext: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={classes.link}>
    {children}
  </a>
);

const Mail: React.FC<{ addr?: string; children: React.ReactNode }> = ({
  addr = PRIVACY_EMAIL,
  children,
}) => (
  <a href={`mailto:${addr}`} className={classes.link}>
    {children}
  </a>
);

// CookieYes "revisit" control. Reopens the CookieYes consent preference center
// via the global `revisitCkyConsent()` the banner exposes (banner is injected
// through GTM, so it is absent on localhost — the click is a no-op there).
const openCookieBanner = (e: React.MouseEvent) => {
  e.preventDefault();
  if (typeof window !== "undefined" && typeof window.revisitCkyConsent === "function") {
    window.revisitCkyConsent();
  }
};

const CookieBtn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button
    type="button"
    onClick={openCookieBanner}
    className={`${classes.link} ${classes.cookieBtn}`}
  >
    {children}
  </button>
);

// In-page cross-reference to another section of this annex (by anchor id).
const InPage: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link to={`/annex/#${to}`} className={classes.link}>
    {children}
  </Link>
);

// ─── Annex A ─────────────────────────────────────────────────────────────────

const AnnexA = () => (
  <>
    <h2 id="annex-a" className={classes.annexTitle}>
      Annex A – Supplemental U.S. Consumer Health Data Privacy Statement
    </h2>

    <p className={classes.paragraph}>
      This Supplemental Consumer Health Data Privacy Statement (“Consumer Health
      Data Privacy Statement”) supplements Phil’s <Priv /> and applies only to
      personal information we process that is defined to be “consumer health
      data” subject to the Washington My Health My Data Act (“MHMDA”), Nevada
      Consumer Health Data Privacy Law (“NVCHDPL”), Connecticut Data Privacy Act
      (“CTDPA”), or other applicable state consumer health data privacy law.
    </p>
    <p className={classes.paragraph}>
      Terms used in this Supplemental Consumer Health Data Privacy Statement
      defined in MHMDA or NVCHDPL will have the meaning set forth in those laws to
      the extent such laws are applicable.
    </p>

    <h3 className={classes.sectionTitle}>Consumer Health Data We Collect</h3>
    <p className={classes.paragraph}>
      Under the MHMDA, “consumer health data” is defined as “personal information
      that is linked or reasonably linkable to a consumer and that identifies the
      consumer's past, present, or future physical or mental health status.”
    </p>
    <p className={classes.paragraph}>
      Under NVCHDPL, “consumer health data” is defined as “personally
      identifiable information that is linked or reasonably capable of being
      linked to a consumer and that a regulated entity uses to identify the past,
      present or future health status of the consumer.”
    </p>
    <p className={classes.paragraph}>
      Under the CTDPA, the definition of “sensitive data” includes data
      “revealing . . . mental or physical health condition or diagnosis.” As
      amended the definition of “sensitive data” was expanded to include
      “consumer health data” defined as any personal data “used to identify a
      consumer’s physical or mental health condition or diagnosis, including
      gender-affirming health data and reproductive sexual health data.”
    </p>
    <p className={classes.paragraph}>
      Because consumer health data is defined very broadly, many of the categories
      of personal information we collect under our <Priv /> may also be considered
      consumer health data.
    </p>
    <p className={classes.paragraph}>
      Examples of consumer health data you may provide to us, or that we may
      otherwise collect, may include:
    </p>
    <ul className={classes.list}>
      {CHD_EXAMPLES.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h3 className={classes.sectionTitle}>Sources of Consumer Health Data</h3>
    <p className={classes.paragraph}>
      We collect consumer health data that you provide to us, consumer health data
      we collect automatically when you use the Services, and consumer health data
      from third-party sources, as described in our <Priv /> and below.
    </p>

    <h3 className={classes.sectionTitle}>
      Why We Collect and Use Consumer Health Data
    </h3>
    <p className={classes.paragraph}>
      We collect and use consumer health data for the purposes and in the manner
      described in the “<Priv>How We Use Personal Information</Priv>” section of
      our <Priv />.
    </p>
    <p className={classes.paragraph}>
      Primarily, we collect and use consumer health data as reasonably necessary
      to provide you with the products or Services you have requested or
      authorized. This may include delivering and operating the products or
      Services and their features, personalization of certain product or Services
      features, ensuring the secure and reliable operation of the products or
      Services and the systems that support them, troubleshooting and improving the
      products and Services, and other essential business operations that support
      the provision of the products and Services (such as analyzing our performance
      and meeting our legal obligations).
    </p>
    <p className={classes.paragraph}>
      We may also use consumer health data for other purposes for which we give you
      choices and/or obtain your consent as required by law.
    </p>

    <h3 className={classes.sectionTitle}>Sharing of Consumer Health Data</h3>
    <p className={classes.paragraph}>
      We may share each of the categories of consumer health data described above
      for the purposes described above and in the “
      <Priv>How We Use Personal Information</Priv>” section of our <Priv />.
    </p>
    <p className={classes.paragraph}>
      In particular, we may share consumer health data, with your consent or as
      reasonably necessary to complete any transaction or provide any product or
      Service you have requested or authorized, as described above.
    </p>
    <p className={classes.paragraph}>
      We only share or disclose your consumer health data as needed to provide you
      with the products or services that you request, or with your explicit consent
      or authorization. We may share or disclose any or all the above categories of
      consumer health data to the following entities that may use the data only as
      permitted for the purposes set forth above, and within the bounds of our
      contracts with them:
    </p>
    <ul className={classes.list}>
      {CHD_SHARING_ENTITIES.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
    <p className={classes.paragraph}>
      In addition, we may share or disclose consumer health data as permitted or
      required by law, such as (i) to an acquiring organization if we are involved
      in a sale or a transfer of all or a part of our business, (ii) as needed to
      prevent, detect, protect against, or respond to security incidents, identity
      theft, fraud, harassment, malicious or deceptive activities, (iii) in
      situations that may involve violations of our terms of use or other rules,
      (iv) to protect our rights and the rights and safety of others, (v) as needed
      to support external auditing, compliance and corporate governance functions,
      (vi) as needed to preserve the integrity or security of our systems, or (vii)
      to investigate, report, or prosecute those responsible for any action that is
      illegal under applicable state or Federal law.
    </p>

    <h3 className={classes.sectionTitle}>How to Exercise Your Rights</h3>
    <p className={classes.paragraph}>
      State consumer health data privacy laws provide consumers with certain rights
      with respect to consumer health data. For example, under MHMDA, consumers
      have the right to: (i) confirm whether Phil is collecting, sharing, or selling
      consumer health data and to access such data; (ii) withdraw consent from
      Phil’s collection and sharing of consumer health data; and (iii) request Phil
      delete consumer health data. Under NVCHDPL, consumers have the right to: (i)
      confirm whether Phil is collecting, sharing or selling consumer health data;
      (ii) have Phil provide the consumer with a list of all third parties with whom
      Phil has shared consumer health data relating to the consumer or to whom Phil
      has sold such consumer health data; (iii) request that Phil cease collecting,
      sharing, or selling consumer health data relating to the consumer; and (iv)
      request that Phil delete consumer health data.
    </p>
    <p className={classes.paragraph}>
      The rights afforded to consumers under applicable state consumer health data
      privacy laws are subject to certain exceptions.
    </p>
    <p className={classes.paragraph}>
      Depending on the Services offered, you can access and make choices about your
      consumer health data through our product controls within the Phil website. You
      may also exercise your rights by following the instructions found under the “
      <Priv>Your Privacy Choices and Rights</Priv>” section of our <Priv />.
    </p>
    <p className={classes.paragraph}>
      Phil will not discriminate against you for exercising any of your rights. We
      will make reasonable efforts to respond promptly to your requests in
      accordance with applicable laws. Please allow 45 days for a response. We may,
      after receiving your request, require additional information from you to
      authenticate your request and verify your identity. Please be aware that we
      may be unable to afford these rights to you under certain circumstances, such
      as if we are legally prevented from doing so.
    </p>
    <p className={classes.paragraph}>
      If your request to exercise a right under a consumer health data law is
      denied, you may appeal that decision by contacting us at:{" "}
      <Mail>{PRIVACY_EMAIL}</Mail>.
    </p>
    <p className={classes.paragraph}>
      If your appeal is unsuccessful and your consumer health data is subject to
      MHMDA, you may raise a concern or lodge a complaint with the Washington State
      Attorney General at{" "}
      <Ext href={WA_AG_COMPLAINT_URL}>www.atg.wa.gov/file-complaint</Ext>.
    </p>

    <h3 className={classes.sectionTitle}>
      Disclosure Regarding Third Party Collection of Consumer Health Data Under
      NVCHDPL
    </h3>
    <p className={classes.paragraph}>
      This Supplement applies to Nevada consumers for purposes of providing
      additional disclosures required by NVCHDPL. We collect, use, process, and
      share consumer health data for the purposes and manners described above in our
      Consumer Health Data Privacy Notice.
    </p>
    <h4 className={classes.subTitle}>
      Third Party Collection of Consumer Health Data on Phil Websites.
    </h4>
    <p className={classes.paragraph}>
      We limit third party collection of consumer health data over time and across
      different Internet websites or online services when Nevada consumers use our
      websites or online services. We do this by disabling certain cookies or by
      ensuring that entities whose cookies, web beacons, pixels, and other online
      trackers we use on our websites and online services are our service providers
      or processors under applicable U.S. state privacy or consumer health data
      privacy laws. Nonetheless, please note that other third parties may still be
      able to process consumer health data from you over time and across different
      websites depending on your browser, browser settings and add-ons, and
      associated permissions you have set on your device. This collection of
      consumer health data by those third parties is unrelated to Phil processing of
      consumer health data from you, and we encourage you to review your browser
      settings and review those third parties’ privacy notices for more information
      about their consumer health data practices.
    </p>
    <h4 className={classes.subTitle}>
      Review and Revision of Consumer Health Data.
    </h4>
    <p className={classes.paragraph}>
      If you would like to review and/or revise your consumer health data, you may
      submit a request to us via any of the methods listed in this Notice.
    </p>

    <h3 className={classes.sectionTitle}>
      Updates to This Supplemental Consumer Health Data Privacy Statement
    </h3>
    <p className={classes.paragraph}>
      We may update this Supplemental Consumer Health Data Privacy Statement from
      time to time in our sole discretion. If we do, we’ll let you know by posting
      the updated Supplemental Consumer Health Data Privacy Statement on our
      website, and/or we may also send other communications.
    </p>
  </>
);

// ─── Annex B ─────────────────────────────────────────────────────────────────

const AnnexB = () => (
  <>
    <h2 id="annex-b" className={classes.annexTitle}>
      Annex B – Consumer Health Data Authorization
    </h2>
    <p className={classes.paragraph}>
      We and our partners use and share cookies and other tracking technologies
      (“cookies”) to improve your experience, measure website performance, and
      personalize marketing to you.
    </p>
    <p className={classes.paragraph}>
      Under certain state privacy laws, cookies are considered to include personal
      information and our sharing of cookies may be considered a “sale” or “sharing”
      for behavioral or “targeted” advertising. To opt out,{" "}
      <CookieBtn>click here</CookieBtn>.
    </p>
    <p className={classes.paragraph}>
      By clicking "Accept” or otherwise opting into personalized marketing, you
      authorize Phil to “sell” or “share” your "consumer health data” in accordance
      with our Consumer Health Data Authorization:
    </p>
    <p className={classes.paragraph}>
      This Consumer Health Data Privacy Authorization (“Authorization”) supplements
      Phil’s <Priv /> and Supplemental Consumer Health Data{" "}
      <Priv>Privacy Notice</Priv>, and applies only to “consumer health data”
      subject to the Washington My Health My Data Act (“MHMDA”), Nevada Consumer
      Health Data Privacy Law (“NVCHDPL”), Connecticut Data Privacy Act (“CTDPA”), or
      other applicable state consumer health data privacy law (as applicable).
    </p>
    <p className={classes.paragraph}>
      Terms used in this Authorization defined in MHMDA, NVCHDPL, CTDPA, or other
      applicable state consumer health data privacy law will have the meaning set
      forth in those laws to the extent such laws are applicable.
    </p>
    <p className={classes.paragraph}>
      If you opt-in to “personalized marketing” through the{" "}
      <Ext href={PHIL_HOME_URL}>www.phil.us</Ext>{" "}
      <CookieBtn>cookie banner</CookieBtn>, you allow Phil to “sell” your consumer
      health data as described below:
    </p>
    <ul className={classes.list}>
      <li>
        <strong>Specific consumer health data intended for “sale”</strong>:
        Consumer health data collected via cookies and similar technologies
        including but not limited to browsing activity on{" "}
        <Ext href={PHIL_HOME_URL}>www.phil.us</Ext>; however, consumer health data
        does not include PHI of current or potential Phil users.
      </li>
      <li>
        <strong>Purpose of the “sale” of consumer health data</strong>: To tailor
        and deliver personalized advertisements to you.
      </li>
      <li>
        <strong>
          How consumer health data purchasers gather and use the data:
        </strong>{" "}
        Consumer health data purchasers will gather the data via cookies and other
        tracking technologies when you visit the Phil website. These purchasers may
        use the data to assist us to deliver personalized advertisements to you and
        in accordance with their privacy policies linked below.
      </li>
      <li>
        <strong>Consumer health data purchasers’ contact information:</strong>
        <ul className={classes.list}>
          <li>
            <strong>Google.</strong> For more information about Google’s use of your
            personal information, please visit{" "}
            <Ext href={GOOGLE_PRIVACY_URL}>Google’s Data Policy</Ext>. To opt out of
            Google’s use of your information, please click{" "}
            <Ext href={GOOGLE_OPTOUT_URL}>here</Ext>.
          </li>
        </ul>
      </li>
      <li>
        <strong>Contact information for Phil</strong>: <Mail>{PRIVACY_EMAIL}</Mail>
      </li>
    </ul>

    <h3 className={classes.sectionTitle}>Please note:</h3>
    <ul className={classes.list}>
      <li>
        The provision of goods or services may not be conditioned upon you accepting
        the terms of this authorization.
      </li>
      <li>
        Purchasers may redisclose the consumer health data sold under this
        authorization and such data may no longer be protected by the MHMDA,
        NVCHDPL, CTDPA, or other applicable state consumer health data privacy law.
      </li>
      <li>
        You may revoke this authorization at any time through the{" "}
        <CookieBtn>Phil cookie banner</CookieBtn>. To do so, please be sure the box
        next to “Personalize Marketing” is <strong>unchecked</strong> and click “Save
        my preferences.” You may also click “Reject Optional Cookies” to decline our
        use of all cookies not required to operate our website.
      </li>
      <li>
        A revocation will not impact previously sold consumer health data. In
        addition, if you use different browsers or devices, you must indicate your
        choices on each browser/device used to access{" "}
        <Ext href={PHIL_HOME_URL}>www.phil.us</Ext>.
      </li>
    </ul>
    <p className={classes.paragraph}>
      If you have any questions about how to revoke your authorization, please contact
      us at <Mail>{PRIVACY_EMAIL}</Mail>.
    </p>
    <p className={classes.paragraph}>
      This authorization will expire one (1) year after accepting it.
    </p>
    <p className={classes.paragraph}>
      <strong>
        To learn more about how we use and share personal information including
        cookies, please review our <Priv />.
      </strong>
    </p>
  </>
);

// ─── Annex C ─────────────────────────────────────────────────────────────────

const AnnexC = () => (
  <>
    <h2 id="annex-c" className={classes.annexTitle}>
      Annex C – Supplemental U.S. Privacy Notice
    </h2>
    <p className={classes.paragraph}>
      This Supplemental U.S. Privacy Notice supplements our <Priv /> and only
      applies to our processing of Personal Information from U.S. consumers residing
      in a state with a comprehensive privacy law.
    </p>

    <h3 className={classes.sectionTitle}>Notice at Collection</h3>
    <p className={classes.paragraph}>
      At or before the time of collection, U.S. consumers residing in a state with a
      comprehensive privacy law have a right to receive notice of our privacy
      practices. Such consumers can find this information below.
    </p>
    <ul className={classes.list}>
      <li>
        <strong>Personal Information Collected</strong>. See the section of this
        Supplemental U.S. Privacy Notice titled “
        <InPage to="annex-c-overview">
          Overview of Personal Information Collected, Disclosed, Sold and/or Shared
        </InPage>
        ” for a list of personal information which may be collected. If we have
        previously collected personal information in the past 12 months, we may
        collect that personal information from you.
      </li>
      <li>
        <strong>Uses of Personal Information</strong>. See the section of this
        Supplemental U.S. Privacy Notice titled “
        <InPage to="annex-c-uses">Uses of Personal Information</InPage>” for a list
        of the purposes for which we use personal information.
      </li>
      <li>
        <strong>
          Is Personal Information “Sold” or “Shared” for “Cross-Context Behavioral
          Advertising”?
        </strong>{" "}
        Yes. See the section of this Supplemental U.S. Privacy Notice titled “
        <InPage to="annex-c-overview">
          Overview of Personal Information Collected, Disclosed, Sold and/or Shared
        </InPage>
        ” for more details. If we have previously “sold” personal information or
        “shared” personal information for “cross-context behavioral advertising” in
        the past 12 months, we may “sell” or “share” that personal information if
        collected from you. See the section of this Supplemental U.S. Privacy Notice
        titled “
        <InPage to="annex-c-optout">
          Right to Opt Out of ‘Sales’ of Personal Information and/or ‘Sharing’ for
          ‘Cross-Context Behavioral Advertising’
        </InPage>
        ” for instructions on how to opt-out of these activities.
      </li>
      <li>
        <strong>Personal Information Retention.</strong> To determine the appropriate
        retention period for personal information, we may consider applicable legal
        requirements, the amount, nature, and sensitivity of the personal
        information, certain risk factors, the purposes for which we process your
        personal information, and whether we can achieve those purposes through other
        means.
      </li>
      <li>
        <strong>Additional Information</strong>. For more information on our privacy
        practices, please review this Supplemental U.S. Privacy Notice and our{" "}
        <Priv />. Importantly, the section of our Privacy Notice titled “
        <Priv>Your Privacy Choices and Rights</Priv>” includes important details
        about how you can exercise some of the rights which you have under U.S.
        privacy laws.
      </li>
    </ul>

    <h3 className={classes.sectionTitle}>
      Categories of Sources From Which Personal Information Is Collected
    </h3>
    <p className={classes.paragraph}>
      We collect personal information that you provide to us, personal information we
      collect automatically when you use the Sites, and personal information from
      third-party sources.
    </p>

    <h3 id="annex-c-overview" className={classes.sectionTitle}>
      Overview of Personal Information Collected, Disclosed, Sold, and/or Shared
    </h3>
    <p className={classes.paragraph}>
      U.S. consumers residing in a state with a comprehensive privacy law are
      provided with the right to know what categories of personal information Phil
      has collected about them, whether Phil disclosed that personal information for
      a business purpose (e.g., to a service provider), whether Phil “sold” that
      personal information, and whether Phil “shared” that personal information for
      “cross-context behavioral advertising” in the preceding twelve months. U.S.
      consumers residing in a state with a comprehensive privacy law can find this
      information below:
    </p>
    <div className={classes.tableWrap}>
      <table className={classes.table}>
        <thead>
          <tr>
            {PI_TABLE_HEADERS.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PI_TABLE_ROWS.map((row, i) => (
            <tr key={i}>
              <th scope="row" className={classes.tableRowHead}>
                <span className={classes.tableCategory}>{row.category}</span>
                {row.description && (
                  <span className={classes.tableDesc}>{row.description}</span>
                )}
              </th>
              <td data-label={PI_TABLE_HEADERS[1]}>
                <ul className={classes.tableList}>
                  {row.disclosedTo.map((party, j) => (
                    <li key={j}>{party}</li>
                  ))}
                </ul>
              </td>
              <td data-label={PI_TABLE_HEADERS[2]}>
                <ul className={classes.tableList}>
                  {row.soldSharedTo.map((party, j) => (
                    <li key={j}>{party}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 id="annex-c-uses" className={classes.sectionTitle}>
      Uses of Personal Information
    </h3>
    <p className={classes.paragraph}>
      We may use and disclose the personal information that we collect for the
      following business and commercial purposes:
    </p>
    <ul className={classes.list}>
      {USES_OF_PI.map((u, i) => (
        <li key={i}>
          {u.priv ? (
            <>
              {u.text} as further described in our <Priv />;
            </>
          ) : (
            u.text
          )}
        </li>
      ))}
    </ul>

    <h3 id="annex-c-optout" className={classes.sectionTitle}>
      Right to Opt Out of “Sales” of Personal Information and/or “Sharing” for
      “Cross-Context Behavioral Advertising”
    </h3>
    <p className={classes.paragraph}>
      We don’t “sell” personal information as most consumers typically define the
      term “sell” or “sold.” However, our Sites use advertising and analytics tools
      provided by third parties (such as HubSpot) that may constitute a “sale” or
      “sharing” of personal information under certain state laws. We “share” your
      personal information for “cross-contextual behavioral advertising” to provide
      you with “cross-context behavioral advertising” about Phil’s products and
      services.
    </p>
    <p className={classes.paragraph}>
      U.S. consumers residing in a state with a comprehensive privacy law may have
      the right to opt out of the “sharing” of personal information for
      “cross-context behavioral advertising.” To exercise these rights, please click{" "}
      <Ext href={OPTOUT_FORM_URL}>HERE</Ext> and follow the instructions on that page
      or by emailing us at: <Mail>{PRIVACY_EMAIL}</Mail>. We will process such
      requests in accordance with applicable laws.
    </p>

    <h3 className={classes.sectionTitle}>
      Disclosure Regarding Individuals Under the Age of 18
    </h3>
    <p className={classes.paragraph}>
      Phil does not have actual knowledge of any “sale” of personal information of
      minors under 18 years of age. Phil does not have actual knowledge of any
      “sharing” of personal information of minors under 18 years of age for
      “cross-context behavioral advertising.”
    </p>

    <h3 className={classes.sectionTitle}>
      Disclosure Regarding Sensitive Personal Information
    </h3>
    <p className={classes.paragraph}>
      Phil only uses and discloses sensitive personal information for the following
      purposes:
    </p>
    <ul className={classes.list}>
      {SENSITIVE_PI_PURPOSES.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h3 className={classes.sectionTitle}>Non-Discrimination</h3>
    <p className={classes.paragraph}>
      California residents have the right not to receive discriminatory treatment by
      us for the exercise of their rights conferred by the CCPA.
    </p>

    <h3 className={classes.sectionTitle}>Notice of Financial Incentive</h3>
    <p className={classes.paragraph}>
      This Notice of Financial Incentives aims to inform you about any programs,
      benefits, and other financial incentive offerings, including price or service
      differences (collectively, “Incentive Offerings”), that we may provide in
      connection with the collection of your personal information so that you may
      make an informed decision on whether to participate in our Incentive Offerings.
      Such Incentive Offerings may be deemed “financial incentives” under the CCPA.
    </p>
    <p className={classes.paragraph}>
      The material aspects of any Incentive Offering, along with the personal
      information collected in connection with an Incentive Offering, will be
      described at the time you are presented with the Incentive Offering.
    </p>
    <p className={classes.paragraph}>Examples of our Incentive Offerings may include:</p>
    <ul className={classes.list}>
      {INCENTIVE_EXAMPLES.map((ex, i) => (
        <li key={i}>
          <strong>{ex.label}</strong> {ex.body}
        </li>
      ))}
    </ul>
    <p className={classes.paragraph}>
      You can opt-in to an Incentive Offering by following the instructions that
      accompany the presentation of the Incentive Offering. If you subsequently wish
      to withdraw from the Incentive Offering, you may request such withdrawal by
      contacting us as set forth in “Contact Us” above.
    </p>
    <p className={classes.paragraph}>
      Each Incentive Offering may be based upon our reasonable and good-faith
      determination of the estimated value of such offer to our business, taking into
      consideration the value of the offer itself and the anticipated revenue
      generation that may be realized.
    </p>
  </>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const AnnexPage = () => (
  <PageContext.Provider value={{ title: "Supplemental U.S. Privacy Notices" }}>
    <Layout>
      <section className={classes.page}>
        <div className="xl-container">
          <div className={classes.prose}>
            <h1 className={classes.pageTitle}>Supplemental U.S. Privacy Notices</h1>
            <AnnexA />
            <AnnexB />
            <AnnexC />
          </div>
        </div>
      </section>
    </Layout>
  </PageContext.Provider>
);

export default AnnexPage;

const ANNEX_OG_IMAGE = getOgImage(null);
const ANNEX_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": ANNEX_URL,
  url: ANNEX_URL,
  name: ANNEX_TITLE,
  description: ANNEX_DESC,
  image: ANNEX_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{ANNEX_TITLE}</title>
    <meta name="description" content={ANNEX_DESC} />
    <link rel="canonical" href={ANNEX_URL} />
    <meta property="og:title" content={ANNEX_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={ANNEX_DESC} />
    <meta property="og:image" content={ANNEX_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={ANNEX_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={ANNEX_TITLE} />
    <meta name="twitter:description" content={ANNEX_DESC} />
    <meta name="twitter:image" content={ANNEX_OG_IMAGE} />
    <script type="application/ld+json">{ANNEX_SCHEMA}</script>
  </>
);
