import React from "react";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { getOgImage } from "utils/getOgImage";

import {
  HIPAA_TITLE,
  HIPAA_DESC,
  HIPAA_URL,
  HIPAA_PHONE_LABEL,
  HIPAA_PHONE_HREF,
  HIPAA_EMAIL,
  OCR_WEBSITE,
  OCR_WEBSITE_LABEL,
  PERMISSIBLE_USES,
  HIGHLY_CONFIDENTIAL,
  YOUR_RIGHTS,
} from "./_data";
import * as classes from "./hipaa.module.css";

// ─── Inline link helpers ─────────────────────────────────────────────────────

const Ext: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={classes.link}>
    {children}
  </a>
);

const Mail: React.FC<{ addr?: string; children: React.ReactNode }> = ({
  addr = HIPAA_EMAIL,
  children,
}) => (
  <a href={`mailto:${addr}`} className={classes.link}>
    {children}
  </a>
);

const Tel: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a href={href} className={classes.link}>
    {children}
  </a>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const HipaaPage = () => (
  <PageContext.Provider value={{ title: "HIPAA Notice" }}>
    <Layout>
      <section className={classes.page}>
        <div className="xl-container">
          <div className={classes.prose}>
            <h1 className={classes.pageTitle}>HIPAA Notice</h1>

            <p className={classes.paragraph}>
              <strong>
                THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED
                AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE
                REVIEW IT CAREFULLY.
              </strong>
            </p>

            <p className={classes.paragraph}>
              This Notice of Privacy Practices (“Notice”) describes the privacy
              practices of <strong>PHIL, Inc. and its affiliates (“PHIL”).</strong>
            </p>

            <p className={classes.paragraph}>
              PHIL is required by the Health Insurance Portability and Accountability
              Act (HIPAA) of 1996 and implementing regulations to protect the privacy
              of protected health information (“PHI”) about you. PHIL is also required
              by law to provide you with this Notice of Privacy Practices (this
              “Notice”) explaining its legal duties and privacy practices with respect
              to PHI. PHIL is legally required to follow the terms of this Notice
              currently in effect. PHIL is required by law to notify affected
              individuals following a breach of unsecured PHI. PHIL may change the
              terms of this Notice at any time. PHIL reserves the right to make changes
              and to make the new Notice effective for all information that PHIL
              maintains. Changes to the notice will be posted to the website. Copies of
              the most current Notice are also available upon request from our Privacy
              Officer.
            </p>

            <p className={classes.paragraph}>This Notice:</p>
            <ol className={classes.orderedList}>
              <li>discusses how PHIL may use and disclose medical information about you.</li>
              <li>explains your rights with respect to medical information about you.</li>
              <li>describes how and where you may file a privacy-related complaint.</li>
            </ol>

            <h2 className={classes.annexTitle}>
              Permissible Uses and Disclosures Without Your Written Authorization
            </h2>
            <p className={classes.paragraph}>
              PHIL may use and disclose your PHI in the following ways without your
              written authorization. This list is not exhaustive. Your PHI may be
              stored and shared in paper, electronic, or other formats, and PHIL limits
              such use and disclosure to the minimum necessary to accomplish the
              intended purpose.
            </p>

            {PERMISSIBLE_USES.slice(0, 3).map((item, i) => (
              <p key={i} className={classes.paragraph}>
                <strong>{item.label}</strong> {item.body}
              </p>
            ))}

            <p className={classes.paragraph}>
              PHIL may also disclose PHI to other entities covered by HIPAA to conduct
              certain health care operations, such as quality assessment and improvement
              activities, or for healthcare fraud and abuse detection or compliance. We
              may also make incidental disclosures of limited PHI to the extent permitted
              by law.
            </p>

            <p className={classes.paragraph}>
              <strong>
                Disclosure to Relatives, Close Friends and Other Caregivers:
              </strong>{" "}
              PHIL may use or disclose your PHI to a family member, other relative, a
              close personal friend or any other person identified by you when you are
              present for, or otherwise available prior to, the disclosure, if:
            </p>
            <p className={classes.paragraph}>
              (1) PHIL obtains your agreement; or (2) you do not object to the
              disclosure. If you are not present, or the opportunity to agree or object
              to a use or disclosure cannot practicably be provided because of your
              incapacity or an emergency circumstance, PHIL may exercise professional
              judgment to determine whether a disclosure is in your best interests.
            </p>
            <p className={classes.paragraph}>
              If PHIL discloses information to a family member, caregiver, other
              relative or a close personal friend, PHIL will disclose only information
              that it believes is directly relevant to the person’s involvement with
              your healthcare or payment related to your healthcare. PHIL may also
              disclose your PHI in order to notify (or assist in notifying) such persons
              of your location, general condition or death. If the patient is a minor,
              PHIL may disclose PHI about the minor to a parent, guardian or other person
              responsible for the minor except in limited circumstances.
            </p>

            <p className={classes.paragraph}>
              <strong>As Required by Law:</strong> {PERMISSIBLE_USES[3].body}
            </p>

            <p className={classes.paragraph}>
              <strong>Public Health Activities:</strong> PHIL may use or disclose your
              PHI for public health activities, such as the following:
            </p>
            <p className={classes.paragraph}>
              (1) to report health information to public health authorities for the
              purpose of preventing or controlling disease, injury or disability or
              aiding in disaster relief; (2) to report child abuse and neglect to public
              health authorities or other government authorities authorized by law to
              receive such reports; (3) to report information about products and services
              under the jurisdiction of the U.S. Food and Drug Administration; (4) to
              alert a person who may have been exposed to a communicable disease or may
              otherwise be at risk of contracting or spreading a disease or condition;
              (5) to report information to your employer as required under laws
              addressing work-related illnesses and injuries or workplace medical
              surveillance.
            </p>

            {PERMISSIBLE_USES.slice(4).map((item, i) => (
              <p key={i} className={classes.paragraph}>
                <strong>{item.label}</strong> {item.body}
              </p>
            ))}

            <h2 className={classes.annexTitle}>
              Uses and Disclosures Requiring Your Written Authorization
            </h2>
            <p className={classes.paragraph}>
              Other uses and disclosures of PHI not described above in this Notice will
              be made only with a written authorization signed by you or your
              representative. Subject to compliance with limited exceptions, PHIL will
              not use or disclose psychotherapy notes, use or disclose your PHI for
              marketing purposes, sell your PHI, or use or disclose genetic information
              for underwriting purposes unless you have signed an authorization.
            </p>
            <p className={classes.paragraph}>
              If you or your representative authorizes PHIL to use or disclose your PHI,
              you may revoke that authorization in writing at any time to stop future
              uses or disclosures. However, your decision to revoke the authorization
              will not affect or undo any use or disclosure of your PHI that occurred
              before you notified PHIL of your decision to revoke your authorization.
            </p>

            <p className={classes.paragraph}>
              <strong>
                Uses and Disclosures of Your Highly Confidential Information:
              </strong>{" "}
              In addition, federal and state law requires special privacy protections for
              certain highly confidential information about you (“Highly Confidential
              Information”). To the extent applicable to PHIL and required by law, PHIL
              will comply with such special privacy protections which may cover subsets
              of PHI that are viewed as sensitive, such as PHI that:
            </p>
            <ul className={classes.list}>
              {HIGHLY_CONFIDENTIAL.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p className={classes.paragraph}>
              <strong>Substance Use Disorder Information:</strong> Federal law (42 CFR
              Part 2) (“Part 2”) provides additional protections for records of substance
              use disorder diagnosis, treatment, or referral for treatment. PHIL will not
              use or disclose Part 2-protected records without your written consent,
              except as expressly permitted or required by Part 2. Such consent may be
              revoked in writing at any time, except to the extent action has already been
              taken in reliance on it. Part 2 records may not be used to investigate or
              prosecute you without specific legal authorization.
            </p>
            <p className={classes.paragraph}>
              Any disclosure made with your consent must include the following notice:
              “This information has been disclosed to you from records protected by
              federal confidentiality rules (42 CFR Part 2). The federal rules prohibit
              you from making any further disclosure of this information unless further
              disclosure is expressly permitted by the written consent of the person to
              whom it pertains or as otherwise permitted by 42 CFR Part 2.”
            </p>

            <h2 className={classes.annexTitle}>
              Your Rights Regarding Your Protected Health Information
            </h2>

            <p className={classes.paragraph}>
              <strong>{YOUR_RIGHTS[0].label}</strong> {YOUR_RIGHTS[0].body}
            </p>

            <p className={classes.paragraph}>
              <strong>Right to Request Restrictions:</strong> You may request
              restrictions on PHIL’s use and disclosure of your PHI:
            </p>
            <p className={classes.paragraph}>
              (1) for treatment, payment and healthcare operations; (2) to individuals
              (such as a family member, other relative, close personal friend or any
              other person identified by you) involved with your care or with payment
              related to your care; or (3) to notify or assist in the notification of
              such individuals regarding your location and general condition. While PHIL
              will consider all requests for restrictions carefully, it is not required
              to agree to a requested restriction, except that it must agree to a
              restriction relating to a disclosure of PHI to a health plan for the
              purposes of carrying out payment or healthcare operations in which the PHI
              pertains solely to a healthcare item or service for which it has already
              been paid out of pocket in full and the disclosure is not required by law.
              If you wish to request restrictions, please submit a written request to
              Patient Relations (see address below). A form to request restrictions is
              available upon request as described below under “For Further Information.”
            </p>

            {YOUR_RIGHTS.slice(1).map((item, i) => (
              <p key={i} className={classes.paragraph}>
                <strong>{item.label}</strong> {item.body}
              </p>
            ))}

            <h2 className={classes.annexTitle}>For Further Information or Complaints</h2>
            <p className={classes.paragraph}>
              If you desire further information about your privacy rights, wish to submit
              a request related to your patient rights, are concerned that PHIL has
              violated your privacy rights or disagree with a decision that has been made
              about access to your PHI, you may contact PHIL at:
            </p>
            <p className={classes.paragraph}>
              <strong>PHIL, Inc.</strong>
              <br />
              Phone: <Tel href={HIPAA_PHONE_HREF}>{HIPAA_PHONE_LABEL}</Tel>; option 3
              <br />
              Email: <Mail>{HIPAA_EMAIL}</Mail>
              <br />
              ATTN: Privacy Officer, 14500 N Northsight Blvd, Suite 307, Scottsdale, AZ
              85260
            </p>
            <p className={classes.paragraph}>
              For restriction requests and amendment requests, you may also contact
              Patient Relations at the address and phone number listed above.
            </p>
            <p className={classes.paragraph}>
              You may also file a complaint with the Office for Civil Rights of the U.S.
              Department of Health and Human Services (OCR) at:
            </p>
            <p className={classes.paragraph}>
              Website: <Ext href={OCR_WEBSITE}>{OCR_WEBSITE_LABEL}</Ext>
              <br />
              Phone: 1-800-368-1019 TTY: 1-800-537-7697
            </p>
            <p className={classes.paragraph}>
              PHIL will not retaliate against you if you file a complaint with us or with
              OCR. If you have questions about this Notice or about PHIL’s privacy
              policies, procedures, or practices, please contact us using the information
              above.
            </p>

            <h2 className={classes.annexTitle}>Effective Date of This Notice</h2>
            <p className={classes.paragraph}>
              This Notice is effective as of February 10, 2026.
            </p>
            <p className={classes.paragraph}>Last Revised: July 15, 2026.</p>
            <p className={classes.paragraph}>Version 26.2</p>
          </div>
        </div>
      </section>
    </Layout>
  </PageContext.Provider>
);

export default HipaaPage;

const HIPAA_OG_IMAGE = getOgImage(null);
const HIPAA_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": HIPAA_URL,
  url: HIPAA_URL,
  name: HIPAA_TITLE,
  description: HIPAA_DESC,
  image: HIPAA_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{HIPAA_TITLE}</title>
    <meta name="description" content={HIPAA_DESC} />
    <link rel="canonical" href={HIPAA_URL} />
    <meta property="og:title" content={HIPAA_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={HIPAA_DESC} />
    <meta property="og:image" content={HIPAA_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={HIPAA_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={HIPAA_TITLE} />
    <meta name="twitter:description" content={HIPAA_DESC} />
    <meta name="twitter:image" content={HIPAA_OG_IMAGE} />
    <script type="application/ld+json">{HIPAA_SCHEMA}</script>
  </>
);
