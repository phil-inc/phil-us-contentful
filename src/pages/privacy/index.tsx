import React from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { getOgImage } from "utils/getOgImage";

import {
  PRIVACY_TITLE,
  PRIVACY_DESC,
  PRIVACY_URL,
  HIPAA_PATH,
  ANNEX_A_PATH,
  PRIVACY_EMAIL,
  PRIVACY_PHONE_LABEL,
  PRIVACY_PHONE_HREF,
  PHIL_URL,
  MYPHIL_URL,
  GPC_URL,
  RIGHTS_FORM_URL,
  GOOGLE_ANALYTICS_PRIVACY_URL,
  GOOGLE_ANALYTICS_OPTOUT_URL,
  HUBSPOT_PRIVACY_URL,
  HUBSPOT_OPTOUT_URL,
  LINKEDIN_PRIVACY_URL,
  LINKEDIN_OPTOUT_URL,
  ZOOMINFO_PRIVACY_URL,
  ZOOMINFO_OPTOUT_URL,
  ANDROID_OPTOUT_URL,
  IOS_OPTOUT_URL,
  MOBILE_CHOICE_URL,
  NAI_OPTOUT_URL,
  DAA_OPTOUT_URL,
  TOC,
  INFO_PROVIDED,
  PROVIDE_SERVICES,
  ADMIN_PURPOSES,
  PRIVACY_RIGHTS,
} from "./_data";
import * as classes from "./privacy.module.css";

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
  addr = PRIVACY_EMAIL,
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

// In-page cross-reference to another section of this notice (by anchor id).
const InPage: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link to={`/privacy/#${to}`} className={classes.link}>
    {children}
  </Link>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const PrivacyPage = () => (
  <PageContext.Provider value={{ title: "Privacy Notice" }}>
    <Layout>
      <section className={classes.page}>
        <div className="xl-container">
          <div className={classes.prose}>
            <h1 className={classes.pageTitle}>Privacy Notice</h1>
            <p className={classes.paragraph}>
              <strong>Last Updated:</strong> July 15, 2026
            </p>

            <p className={classes.paragraph}>
              This Privacy Notice (“<strong>Notice</strong>”) applies to the processing
              of personal information by Phil, Inc. and our affiliates (“
              <strong>Phil</strong>,” “<strong>we</strong>,” “<strong>us</strong>,” or “
              <strong>our</strong>”), including on our mobile application, our website
              available at <Ext href={PHIL_URL}>www.phil.us</Ext>,{" "}
              <Ext href={MYPHIL_URL}>www.myphil.us</Ext>, our associated site(s), our
              microsite(s), and our other online or offline offerings which link to, or
              are otherwise subject to, this Privacy Notice (collectively, the “
              <strong>Services</strong>”).
            </p>
            <p className={classes.paragraph}>
              <strong>Special Note to Phil Patients and Potential Patients</strong>: When
              you visit our website or inquire about or register for our Services, we may
              collect information that identifies you and relates to your past, present,
              or future physical or mental health, treatment and services received, and
              payment for such treatment and services. This information may be considered
              protected health information (“<strong>PHI</strong>”) by the Health
              Insurance Portability and Accountability Act of 1996 (as amended) and the
              Health Information Technology for Economic and Clinical Health Act. If you
              receive care from us, this Notice describes how we collect, use, and share
              your non-PHI personal information and is separate from and in addition to
              our{" "}
              <Link to={HIPAA_PATH} className={classes.link}>
                HIPAA Notice of Privacy Practices
              </Link>{" "}
              describing how we use and disclose your PHI.
            </p>
            <p className={classes.paragraph}>
              <strong>
                Special Note to Consumers Residing in States with Laws Protecting Consumer
                Health Data or Sensitive Personal Information Privacy.
              </strong>{" "}
              For information on our processing of “consumer health data” or “sensitive
              personal information” subject to a consumer health data or other privacy
              law, please see{" "}
              <Link to={ANNEX_A_PATH} className={classes.link}>
                Annex A – Supplemental U.S. Consumer Health Data Privacy Notice
              </Link>
              .
            </p>

            <ul className={classes.tocList}>
              {TOC.map((item) => (
                <li key={item.anchor}>
                  <InPage to={item.anchor}>
                    {item.num} {item.label}
                  </InPage>
                </li>
              ))}
            </ul>

            {/* ── 1 ── */}
            <h2 id="updates" className={classes.annexTitle}>
              1. UPDATES TO THIS PRIVACY NOTICE
            </h2>
            <p className={classes.paragraph}>
              We may update this Privacy Notice from time to time in our sole discretion.
              If we do, we’ll let you know by posting the updated Privacy Notice on our
              website and/or by sending other communications where required by law.
            </p>

            {/* ── 2 ── */}
            <h2 id="collect" className={classes.annexTitle}>
              2. PERSONAL INFORMATION WE COLLECT
            </h2>
            <p className={classes.paragraph}>
              We collect personal information you provide to us, personal information we
              collect automatically when you use the Services, and personal information
              from third-party sources (see{" "}
              <InPage to="disclose">Section 4</InPage> below), as described below.
            </p>

            <h3 className={classes.sectionTitle}>
              Personal Information You Provide to Us Directly
            </h3>
            <p className={classes.paragraph}>
              We may collect personal information you provide to us.
            </p>
            <ul className={classes.list}>
              {INFO_PROVIDED.map((item, i) => (
                <li key={i}>
                  <strong>{item.label}</strong> {item.body}
                </li>
              ))}
            </ul>

            <h3 className={classes.sectionTitle}>
              Personal Information Collected Automatically
            </h3>
            <p className={classes.paragraph}>
              We may collect personal information automatically when you use the Services.
              We use third-party customer relationship management, marketing automation,
              analytics, and data enrichment tools, including HubSpot and ZoomInfo, that
              collect or receive personal information when you visit or interact with our
              websites, emails, or other online content.
            </p>
            <ul className={classes.list}>
              <li>
                <strong>Device Information.</strong> We may collect personal information
                about your device, such as your Internet protocol (IP) address, user
                settings, cookie identifiers, other unique identifiers, browser or device
                information, Internet service provider, and location information
                (including, as applicable, approximate location derived from IP address
                and precise geo-location information).
              </li>
              <li>
                <strong>Usage Information.</strong> We may collect personal information
                about your use of the Services, such as the pages you visit, you search
                for, the types of content you interact with, information about the links
                you click, the frequency and duration of your activities, and other
                information about how you use the Services.
              </li>
              <li>
                <strong>Cookie Notice (and Other Technologies).</strong> We, as well as
                third parties (such as HubSpot), may use cookies, pixel tags, web beacons,
                and other technologies, collectively “<strong>Technologies</strong>”) to
                automatically collect personal information (such as IP address, device and
                browser information, and information about pages visited, links clicked,
                and other website activity) through your use of the Services. These
                Technologies may be used for analytics, marketing, lead generation, and
                business development purposes. Please note, if you become a Phil patient,
                such Technologies will collect personal information only as permitted by
                applicable federal and state laws.
                <ul className={classes.list}>
                  <li>
                    <strong>Cookies.</strong> Cookies are small text files stored in
                    device browsers.
                  </li>
                  <li>
                    <strong>Pixel Tags/Web Beacons.</strong> A pixel tag (also known as a
                    web beacon) is a piece of code embedded in the Services collecting
                    personal information about use of or engagement with the Services. The
                    use of a pixel tag allows us to record, for example, that a user has
                    visited, a particular web page or clicked on a particular
                    advertisement. We may also include web beacons in e-mails to
                    understand whether messages have been opened, acted on, or forwarded.
                  </li>
                </ul>
              </li>
            </ul>
            <p className={classes.paragraph}>
              See “<InPage to="choices-rights">Your Privacy Choices and Rights</InPage>”
              below to understand your choices regarding these Technologies.
            </p>

            <h3 className={classes.sectionTitle}>
              Personal Information Collected from Third Parties
            </h3>
            <p className={classes.paragraph}>
              We may collect personal information about you from third parties. For
              example, if you access the Services using a Third-Party Service (defined
              below), we may collect personal information about you from such Third-Party
              Service you have made available via your privacy settings. In addition, we
              and other third parties may upload or otherwise provide personal information
              about you (i.e., prescription fill date).
            </p>
            <p className={classes.paragraph}>
              We may receive business contact, professional, and company-related
              information about you from third-party data providers such as ZoomInfo. This
              information may include your name, business email address, business phone
              number, job title, employer, industry, and related professional information,
              and is used for sales, marketing, business development, and other purposes.
            </p>

            {/* ── 3 ── */}
            <h2 id="use" className={classes.annexTitle}>
              3. HOW WE USE PERSONAL INFORMATION
            </h2>
            <p className={classes.paragraph}>
              We use personal information for a variety of business purposes, including to
              provide the Services, for administrative purposes, and to provide you with
              marketing materials, as described below.
            </p>

            <h3 className={classes.sectionTitle}>Provide the Services</h3>
            <p className={classes.paragraph}>
              We use personal information to fulfill our contract with you and provide the
              Services, such as:
            </p>
            <ul className={classes.list}>
              {PROVIDE_SERVICES.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className={classes.paragraph}>
              Our Services are enabled and/or supported by machine-learning tools
              fundamental to our ability to provide real-time engagement, inform and
              document treatment approaches, and track progress. These machine-learning
              tools process natural language communications to support user experience and
              outcomes.
            </p>

            <h3 className={classes.sectionTitle}>Administrative Purposes</h3>
            <p className={classes.paragraph}>
              We use personal information for various administrative purposes, such as:
            </p>
            <ul className={classes.list}>
              {ADMIN_PURPOSES.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className={classes.sectionTitle}>Marketing</h3>
            <p className={classes.paragraph}>
              We may use personal information to tailor and provide you with marketing and
              other content. We may provide you with these materials as permitted by
              applicable law. Additionally, with your consent, we may also use your
              information to contact you about goods and services that may be of interest
              to you. You may opt out of receiving such communications at any time by
              clicking the “unsubscribe” link at the bottom of these communications, by
              replying STOP to promotional text messages, or by contacting us as set forth
              in “<InPage to="contact">Contact Us</InPage>” below.
            </p>
            <p className={classes.paragraph}>
              We use marketing automation and customer relationship management tools,
              including HubSpot, to manage communications, measure content engagement,
              support marketing campaigns, and identify potential business opportunities.
            </p>
            <p className={classes.paragraph}>
              If you have any questions about our marketing practices, you may contact us
              at any time as set forth in “<InPage to="contact">Contact Us</InPage>”
              below.
            </p>

            <h3 className={classes.sectionTitle}>With Your Consent or Direction</h3>
            <p className={classes.paragraph}>
              We may use personal information for other purposes clearly disclosed to you
              at the time you provide personal information with your consent, such as if
              you opt-in to participate in research studies and research and development
              activities, or as otherwise directed by you.
            </p>

            <h3 className={classes.sectionTitle}>Automated Decision Making</h3>
            <p className={classes.paragraph}>
              We may engage in automated decision making, including profiling. Phil’s
              processing of your personal information will not result in a decision based
              solely on automated processing that has a legal or other similarly
              significant effect on you unless such a decision is necessary as part of a
              contract we have with you, we have your consent, or we are permitted by law
              to engage in such automated decision making.
            </p>
            <p className={classes.paragraph}>
              If you have questions about our automated decision making or to appeal a
              decision or finding made by such automated decision making, you may contact
              us as set forth in “<InPage to="contact">Contact Us</InPage>” below.
            </p>

            {/* ── 4 ── */}
            <h2 id="disclose" className={classes.annexTitle}>
              4. HOW WE DISCLOSE PERSONAL INFORMATION
            </h2>
            <p className={classes.paragraph}>
              We disclose personal information to third parties for a variety of business
              purposes, including to provide the Services, to protect us or others, or in
              the event of a major business transaction such as a merger, sale, or asset
              transfer, as described below.
            </p>

            <h3 className={classes.sectionTitle}>Disclosures to Provide the Services</h3>
            <p className={classes.paragraph}>
              We may disclose any of the personal information we collect to the categories
              of third parties described below.
            </p>
            <p className={classes.paragraph}>
              <strong>Service Providers.</strong> We may disclose personal information to
              third-party service providers assisting us with the provision of the
              Services. This may include, but is not limited to, service providers
              providing us with hosting, cloud storage, generative AI tools, customer
              service and relationship management, analytics, marketing automation and
              services, IT support and security, payment processing, system
              administration, data enrichment services (such as HubSpot and ZoomInfo),
              deployment of Technologies, chat features, and other related services.
              Please note, where required by law, we bind our service providers to privacy
              and security controls (including zero-day retention periods, where
              applicable). Where permissible by law, certain service providers collect or
              receive personal information through Technologies and, depending on
              configuration, may use such personal information for their own business
              purposes (such as improving their products, services, and datasets) subject
              to their terms and privacy notices.
            </p>
            <ul className={classes.list}>
              <li>
                Some of the service providers we may engage include:
                <ul className={classes.list}>
                  <li>
                    <strong>Google Analytics.</strong> For information about how Google
                    uses your personal information, please visit{" "}
                    <Ext href={GOOGLE_ANALYTICS_PRIVACY_URL}>
                      Google Analytics’ Privacy Notice
                    </Ext>
                    . To learn about how to opt-out of Google Analytics’ use of your
                    personal information, please click{" "}
                    <Ext href={GOOGLE_ANALYTICS_OPTOUT_URL}>here</Ext>.
                  </li>
                  <li>
                    <strong>HubSpot.</strong> For information about how HubSpot uses your
                    personal information, please visit{" "}
                    <Ext href={HUBSPOT_PRIVACY_URL}>HubSpot’s Privacy Policy</Ext>. To
                    learn how to opt out of its use of your personal information, please
                    click <Ext href={HUBSPOT_OPTOUT_URL}>here</Ext>.
                  </li>
                  <li>
                    <strong>LinkedIn Analytics.</strong> For information about how LinkedIn
                    uses your personal information, please visit{" "}
                    <Ext href={LINKEDIN_PRIVACY_URL}>
                      LinkedIn Analytics’ Privacy Policy
                    </Ext>
                    . To learn about how to opt-out of LinkedIn’s use of your information,
                    please click <Ext href={LINKEDIN_OPTOUT_URL}>here</Ext>.
                  </li>
                  <li>
                    <strong>ZoomInfo Co-Pilot.</strong> For information about how ZoomInfo
                    uses your personal information, please visit{" "}
                    <Ext href={ZOOMINFO_PRIVACY_URL}>ZoomInfo’s Privacy Policy</Ext>. To
                    learn how to opt out of its use of your personal information, please
                    click <Ext href={ZOOMINFO_OPTOUT_URL}>here</Ext>.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Third-Party Services You Share or Interact With.</strong> The
                Services may link to or allow you to interface, interact, share
                information with, direct us to share information with, access and/or use
                third-party websites, applications, services, products, and technology
                (each a “<strong>Third-Party Service</strong>”). Any personal information
                shared with a Third-Party Service will be subject to the Third-Party
                Service’s privacy policy. We are not responsible for the processing of
                personal information by Third-Party Services.
              </li>
              <li>
                <strong>Business Partners.</strong> We may share your personal information
                with business partners to provide you with a product or service you have
                requested. We may also share your personal information with business
                partners with whom we jointly offer products or services. Once your
                personal information is shared with our business partner, it will also be
                subject to our business partner’s privacy policy. We are not responsible
                for the processing of personal information by our business partners.
              </li>
              <li>
                <strong>Affiliates.</strong> We may share your personal information with
                our corporate affiliates.
              </li>
            </ul>
            <p className={classes.paragraph}>
              <strong>Advertising Partners.</strong> We may share your personal
              information with third-party advertising partners. These third-party
              advertising partners may set Technologies and other tracking tools on our
              Services to collect information regarding your activities and your device
              (e.g., your IP address, cookie identifiers, page(s) visited, location, time
              of day). These advertising partners may use this information (and similar
              information collected from other services) for purposes of delivering
              personalized advertisements to you when you visit digital properties within
              their networks. This practice is commonly referred to as “interest-based
              advertising,” “personalized advertising,” or “targeted advertising.” Some of
              the advertising Technologies we may use include Google, HubSpot, and
              LinkedIn.
            </p>

            <h3 className={classes.sectionTitle}>Disclosures to Protect Us or Others</h3>
            <p className={classes.paragraph}>
              We may access, preserve, and disclose any information we store associated
              with you to external parties if we, in good faith, believe doing so is
              required or appropriate to: comply with law enforcement or national security
              requests and legal process, such as a court order or subpoena; protect your,
              our, or others’ rights, property, or safety; enforce our policies or
              contracts; collect amounts owed to us; or assist with an investigation or
              prosecution of suspected or actual illegal activity.
            </p>

            <h3 className={classes.sectionTitle}>
              Disclosure in the Event of Merger, Sale, or Other Asset Transfers
            </h3>
            <p className={classes.paragraph}>
              If we are involved in a merger, divestiture, restructuring, acquisition,
              financing, reorganization, bankruptcy, dissolution, receivership, purchase
              or sale of assets, transition of service to another provider, or other
              similar corporate transaction, your personal information may be disclosed,
              sold, or transferred as part of such a transaction.
            </p>

            {/* ── 5 ── */}
            <h2 id="choices-rights" className={classes.annexTitle}>
              5. YOUR PRIVACY CHOICES AND RIGHTS
            </h2>

            <h3 className={classes.sectionTitle}>Your Privacy Choices.</h3>
            <p className={classes.paragraph}>
              The privacy choices you may have about your personal information are
              described below:
            </p>
            <ul className={classes.list}>
              <li>
                <strong>Email Communications.</strong> If you receive an unwanted email
                from us, you can use the unsubscribe functionality found at the bottom of
                the email to opt out of receiving future emails. Note that you will
                continue to receive transaction-related emails. We may also send you
                certain non-promotional communications regarding us and the Services, and
                you will not be able to opt out of those communications (e.g.,
                communications regarding the Services or updates to this Privacy Notice).
              </li>
              <li>
                <strong>Text/SMS Messages.</strong> If you receive an unwanted promotional
                text/SMS message from us, you may opt out of receiving future text/SMS
                messages from us by following the instructions in the text/SMS message you
                have received from us or by otherwise contacting us as set forth in “
                <InPage to="contact">Contact Us</InPage>” below.
              </li>
              <li>
                <strong>
                  Do Not Track Signals, Global Privacy Control, and Universal Opt-Out
                  Mechanisms.
                </strong>{" "}
                Some browsers, browser extensions, and devices transmit automated “opt-out
                preference signals,” such as the Universal Opt-Out Mechanisms (“
                <strong>UOOMs</strong>”) (including the{" "}
                <Ext href={GPC_URL}>Global Privacy Control</Ext> (“<strong>GPC</strong>”)),
                to indicate a user’s preference to opt out of certain data practices. These
                signals must typically be enabled through your browser settings or through
                a supported extension. You can check and adjust your settings by going to
                the “Do Not Sell or Share My Personal Information” link in the footer of
                this website.
                <ul className={classes.list}>
                  <li>
                    We recognize and process UOOMs in the states where applicable law
                    requires such recognition and, when required by law, we treat a valid
                    UOOM signals as a request to opt out of the sale or sharing of personal
                    information and/or targeted advertising, as applicable in that
                    jurisdiction.
                  </li>
                  <li>
                    Where not required by law, we may (but are not obligated to) process
                    UOOM signals as a best-effort opt out of the sale or sharing of
                    personal information and/or targeted advertising. In such
                    jurisdictions, any such best-effort honoring will apply only to the
                    extent supported by our systems and may not affect all data flows,
                    disclosures, or cookies. For a comprehensive opt-out, please use the
                    “Do Not Sell or Share My Personal Information” link in the footer of
                    this website.
                  </li>
                  <li>
                    Some browsers also send “Do Not Track” (“<strong>DNT</strong>”)
                    signals. Because DNT signals are not yet standardized and no law
                    currently requires their recognition, we do not respond to DNT signals.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Cookies.</strong> You may stop or restrict the placement of
                Technologies on your device or remove them by adjusting your preferences as
                your browser or device permits. However, if you adjust your preferences,
                the Services may not work properly.
                <ul className={classes.list}>
                  <li>
                    Please note that cookie-based opt-outs are not effective on mobile
                    applications. However, you may opt-out of certain tracking on some
                    mobile applications by following the instructions for{" "}
                    <Ext href={ANDROID_OPTOUT_URL}>Android</Ext>,{" "}
                    <Ext href={IOS_OPTOUT_URL}>iOS</Ext>, and{" "}
                    <Ext href={MOBILE_CHOICE_URL}>others</Ext>.
                  </li>
                  <li>
                    The online advertising industry also provides mechanisms that may allow
                    you to opt out of receiving targeted ads from organizations that
                    participate in self-regulatory programs. To learn more, visit the{" "}
                    <Ext href={NAI_OPTOUT_URL}>Network Advertising Initiative</Ext> and{" "}
                    <Ext href={DAA_OPTOUT_URL}>the Digital Advertising Alliance</Ext>.
                  </li>
                  <li>
                    Please note you must separately opt out in each browser and on each
                    device.
                  </li>
                </ul>
              </li>
            </ul>

            <h3 className={classes.sectionTitle}>Your Privacy Rights.</h3>
            <p className={classes.paragraph}>
              In accordance with applicable law, you may have the right to:
            </p>
            <ul className={classes.list}>
              {PRIVACY_RIGHTS.map((item, i) => (
                <li key={i}>
                  <strong>{item.label}</strong>
                  {item.body ? <> {item.body}</> : "."}
                </li>
              ))}
            </ul>
            <p className={classes.paragraph}>
              Please note that if your request relates to protected health information
              (PHI) maintained in connection with prescription or pharmacy services, those
              rights are governed by HIPAA and our Notice of Privacy Practices rather than
              applicable state consumer privacy laws. If your request relates to
              information held by one of our partner pharmacies, we will notify you and
              assist in directing your request to the appropriate party.
            </p>
            <p className={classes.paragraph}>
              If you would like to exercise any of these rights, please click{" "}
              <Ext href={RIGHTS_FORM_URL}>HERE</Ext> and follow the instructions on that
              page or by emailing us at: <Mail>{PRIVACY_EMAIL}</Mail>. We will process such
              requests in accordance with applicable laws.
            </p>
            <p className={classes.paragraph}>
              Only you, or someone legally authorized to act on your behalf in certain
              jurisdictions, may make a request to exercise the rights listed above
              regarding your personal information. If your personal information is subject
              to a law that allows an authorized agent to act on your behalf in exercising
              your privacy rights and you wish to designate an authorized agent, please
              provide written authorization signed by you and your designated agent using
              the information found in “<InPage to="contact">Contact Us</InPage>” below and
              ask us for additional instructions.
            </p>
            <p className={classes.paragraph}>
              To protect your privacy, we will take steps to verify your identity before
              fulfilling requests submitted under applicable privacy laws. These steps may
              involve asking you to provide sufficient information that allows us to
              reasonably verify you are the person about whom we collected personal
              information or an authorized representative. Examples of our verification
              process may include asking you to confirm the email address we have
              associated with you.
            </p>
            <p className={classes.paragraph}>
              Some laws may allow you to appeal our decision if we decline to process your
              request. If applicable laws grant you an appeal right, and you would like to
              appeal our decision with respect to your request, you may do so by informing
              us of this and providing us with information supporting your appeal.
            </p>

            <h3 className={classes.sectionTitle}>Consumer Health Privacy Laws</h3>
            <p className={classes.paragraph}>
              If you are a consumer residing in a U.S. state with a consumer health data
              privacy law, or a comprehensive consumer privacy law defining “sensitive
              personal information” to include health or medical information (or related
              data), please review our{" "}
              <Link to={ANNEX_A_PATH} className={classes.link}>
                Annex A – Supplemental Consumer Health Data Privacy Statement
              </Link>{" "}
              for our privacy practices related to consumer health data.
            </p>

            {/* ── 6 ── */}
            <h2 id="international" className={classes.annexTitle}>
              6. INTERNATIONAL TRANSFERS OF PERSONAL INFORMATION
            </h2>
            <p className={classes.paragraph}>
              All Services are controlled and operated by us from the United States and are
              not intended to subject us to the laws or jurisdiction of any state, country,
              or territory other than those of the United States. All personal information
              processed by us may be transferred, processed, and stored anywhere in the
              world, including, but not limited to, the United States or other countries,
              which may have data protection laws different from the laws where you live.
            </p>

            {/* ── 7 ── */}
            <h2 id="security-retention" className={classes.annexTitle}>
              7. DATA SECURITY AND RETENTION
            </h2>
            <p className={classes.paragraph}>
              We employ reasonable physical, technical, and administrative safeguards
              designed to keep personal information secure; however, no data collection,
              storage, or transmission including over the Internet or other network can be
              guaranteed to be 100% secure. Therefore, despite these safeguards, we cannot
              and do not guarantee the security of any personal information transmitted to
              us.
            </p>
            <p className={classes.paragraph}>
              Additionally, take steps to protect against unauthorized access to your
              password, phone, tablet, and computer by, among other things, signing off
              after using a shared device, choosing a robust password nobody else knows or
              can easily guess, and keeping log-in information and passwords private. We are
              not responsible for any lost, stolen, or compromised passwords or for any
              activity on your account via unauthorized password activity. Where required
              by applicable law, you may request access to information about our security
              policies and procedures by contacting us as described in “
              <InPage to="contact">Contact Us</InPage>” below.
            </p>
            <p className={classes.paragraph}>
              We store the personal information we collect as described in this Privacy
              Notice for as long as you use the Services, or as necessary to fulfill the
              purpose(s) for which it was collected, provide the Services, resolve
              disputes, establish legal defenses, conduct audits, pursue legitimate
              business purposes, enforce our agreements, and comply with applicable laws,
              unless you ask us to delete or transfer such information by contacting us as
              set forth in “<InPage to="contact">Contact Us</InPage>” below.
            </p>
            <p className={classes.paragraph}>
              To determine the appropriate retention period for personal data, we may
              consider applicable legal requirements, the amount, nature, and sensitivity
              of the personal data, certain risk factors, the purposes for which we process
              your personal data, and whether we can achieve those purposes through other
              means.
            </p>

            {/* ── 8 ── */}
            <h2 id="children" className={classes.annexTitle}>
              8. CHILDREN’S PERSONAL INFORMATION
            </h2>
            <p className={classes.paragraph}>
              The Services are not directed to children under 18 (or other age as required
              by local law outside the United States) and we do not knowingly collect
              personal information from children. We may collect information from employers
              about members of all ages to determine eligibility for our services.
            </p>
            <p className={classes.paragraph}>
              If you are a parent or guardian and believe your child has uploaded personal
              information to the Services in violation of applicable law, you may contact us
              as described in “<InPage to="contact">Contact Us</InPage>” below.
            </p>

            {/* ── 9 ── */}
            <h2 id="third-party" className={classes.annexTitle}>
              9. WEBSITES/APPLICATIONS
            </h2>
            <p className={classes.paragraph}>
              The Services may contain links to other websites/applications and other
              websites/applications may reference or link to our Services. These
              third-party services are not controlled by us. We encourage our users to read
              the privacy policies of each website and application with which they interact.
              We do not endorse, screen, or approve, and are not responsible for, the
              privacy practices or content of such other websites or applications. Providing
              personal information to third-party websites or applications is at your own
              risk.
            </p>

            {/* ── 10 ── */}
            <h2 id="contact" className={classes.annexTitle}>
              10. CONTACT US
            </h2>
            <p className={classes.paragraph}>
              If you have any questions about our privacy practices or this Privacy Notice,
              or to exercise your rights as detailed in this Privacy Notice, please contact
              us at:
            </p>
            <p className={classes.paragraph}>
              Phil, Inc.
              <br />
              ATTN: Privacy Officer
              <br />
              14500 N Northsight Blvd, Suite 307
              <br />
              Scottsdale, Arizona 85260
              <br />
              Phone: <Tel href={PRIVACY_PHONE_HREF}>{PRIVACY_PHONE_LABEL}</Tel>; Option 3
              <br />
              Email: <Mail>{PRIVACY_EMAIL}</Mail>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  </PageContext.Provider>
);

export default PrivacyPage;

const PRIVACY_OG_IMAGE = getOgImage(null);
const PRIVACY_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PRIVACY_URL,
  url: PRIVACY_URL,
  name: PRIVACY_TITLE,
  description: PRIVACY_DESC,
  image: PRIVACY_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{PRIVACY_TITLE}</title>
    <meta name="description" content={PRIVACY_DESC} />
    <link rel="canonical" href={PRIVACY_URL} />
    <meta property="og:title" content={PRIVACY_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={PRIVACY_DESC} />
    <meta property="og:image" content={PRIVACY_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={PRIVACY_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={PRIVACY_TITLE} />
    <meta name="twitter:description" content={PRIVACY_DESC} />
    <meta name="twitter:image" content={PRIVACY_OG_IMAGE} />
    <script type="application/ld+json">{PRIVACY_SCHEMA}</script>
  </>
);
