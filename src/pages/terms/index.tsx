import React from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { getOgImage } from "utils/getOgImage";

import {
  TERMS_TITLE,
  TERMS_DESC,
  TERMS_URL,
  PRIVACY_PATH,
  TERMS_EMAIL,
  TERMS_PHONE_LABEL,
  TERMS_PHONE_HREF,
  PRIVACY_URL,
  SITE_URL,
  MYPHIL_URL,
  ADR_URL,
  ADR_DEMAND_FORM_URL,
  DEA_SCHEDULE_URL,
  PROHIBITIONS,
} from "./_data";
import * as classes from "./terms.module.css";

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
  addr = TERMS_EMAIL,
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

const TermsPage = () => (
  <PageContext.Provider value={{ title: "Terms of Service" }}>
    <Layout>
      <section className={classes.page}>
        <div className="xl-container">
          <div className={classes.prose}>
            <h1 className={classes.pageTitle}>Terms of Service</h1>
            <p className={classes.paragraph}>
              <strong>Last Updated:</strong> July 15, 2026
            </p>

            <p className={classes.paragraph}>
              Welcome to Phil, an online prescription management and delivery platform
              made available by Phil, Inc. (“Phil,” “we,” “us” or “our”). Please read
              these Terms of Service (the “Terms”) and our Privacy Notice (
              <Ext href={PRIVACY_URL}>https://phil.us/privacy/</Ext>) (“Privacy Notice”)
              carefully because they govern your use of the website located at{" "}
              <Ext href={SITE_URL}>https://phil.us/</Ext> and{" "}
              <Ext href={MYPHIL_URL}>https://myphil.us</Ext> (the “Sites”) and the online
              prescription management and delivery services provided by Phil that are
              accessible via the Sites, text messaging and email communications. To make
              these Terms easier to read, the Sites and our services are collectively
              called the “Services.”
            </p>
            <p className={classes.paragraph}>
              <strong>
                IMPORTANT NOTICE REGARDING ARBITRATION FOR U.S. CUSTOMERS: WHEN YOU
                CREATE OR LOG IN TO YOUR ACCOUNT WITH US, YOU AGREE (WITH LIMITED
                EXCEPTION) TO RESOLVE ANY DISPUTE BETWEEN YOU AND PHIL THROUGH BINDING,
                INDIVIDUAL ARBITRATION RATHER THAN IN COURT. PLEASE REVIEW CAREFULLY THE
                “DISPUTE RESOLUTION” SECTION BELOW FOR DETAILS REGARDING ARBITRATION.
              </strong>
            </p>
            <p className={classes.paragraph}>
              By accessing or using the Services in any way, including without
              limitation, browsing the Services, using any information, or submitting any
              content or personal information via the Services, you agree to and are
              bound by these Terms. If you don’t agree to be bound by these Terms, do not
              use the Services.
            </p>
            <p className={classes.paragraph}>
              <strong>
                IF YOU ARE HAVING A MEDICAL EMERGENCY, DO NOT USE OUR SERVICES – CALL
                911.
              </strong>
            </p>

            <h2 className={classes.annexTitle}>Privacy Notice</h2>
            <p className={classes.paragraph}>
              Please review our Privacy Notice (
              <Ext href={PRIVACY_URL}>https://phil.us/privacy/</Ext>), which also governs
              your use of the Services, for information on how we collect, use and share
              your information.
            </p>

            <h3 className={classes.sectionTitle}>Who May Use the Phil Services</h3>
            <p className={classes.paragraph}>
              You may use the Services only if you are eighteen (18) years or older, are
              capable of forming a binding contract with Phil and are not barred from
              using the Services under applicable law.
            </p>

            <h3 className={classes.sectionTitle}>
              Phil is a Prescription Management Platform
            </h3>
            <p className={classes.paragraph}>
              Phil enables you to place an order for one (1) or more of your prescription
              medication needs (“Order”) and acts as a prescription management platform.
              You will only provide to Phil a valid prescription issued for a legitimate
              medical purpose by a medical professional acting in the usual course of
              his/her professional practice. The Services are not intended to be a
              substitute for professional medical advice, diagnosis or treatment, and do
              not constitute medical or other professional advice. Phil does not
              recommend or endorse any specific tests, physicians, products, procedures,
              opinions, or other information that may be mentioned on the Services or by
              any other electronic means. Reliance on any information provided by Phil is
              solely at your own risk. The information provided through Phil’s Services is
              designed to support, not replace, the relationship that exists between
              patient/site-visitor and his/her physician. Never disregard professional
              medical advice or delay in seeking it because of something you have read or
              seen on our Services.
            </p>

            <h3 className={classes.sectionTitle}>Telemedicine</h3>
            <p className={classes.paragraph}>
              If you need a prescription, Phil may assist you by connecting you with a
              health care professional who will provide telemedicine services. These
              services are not provided by Phil and these Terms do not apply to such
              services. You should refer to the terms of service and privacy policies of
              telemedicine provider before using them.
            </p>

            <h3 className={classes.sectionTitle}>Order Fulfillment by Pharmacy</h3>
            <p className={classes.paragraph}>
              When you place an Order through Phil, we work with pharmacies to process
              your Order and fill your prescriptions (each, a “Pharmacy”). Phil also is a
              Pharmacy and in some cases, Phil may fill your prescription. We verify that
              each Pharmacy that we work with is a licensed pharmacy. You also acknowledge
              and agree that, although we may select certain pharmacies to work with based
              on various metrics we apply, our decision to work with a specific pharmacy
              should not be deemed as an endorsement of, or a warranty regarding the
              quality of services provided by, such pharmacy. If, for any reason, you
              aren’t satisfied with the manner in which a Pharmacy processed your Order,
              you agree to address this issue with the Pharmacy directly.
            </p>
            <p className={classes.paragraph}>
              You also acknowledge and agree that Phil does not provide any medical
              advice, opinion, diagnosis or treatment, and that that no pharmacy-patient
              relationship (unless Phil is the Pharmacy that fills your prescription) or
              doctor-patient relationship is, or will be, established between Phil and you
              as a result of your use of the Services or otherwise. You should check
              product information (including package inserts) regarding dosages,
              precautions, warnings, interactions and contraindications before
              administering or using any medications. If you have any questions regarding
              your prescriptions, you should consult your healthcare professional or
              pharmacist, whose contact information may be listed on the prescription, the
              packaging of your prescription medicine or under your Account.
            </p>

            <h3 className={classes.sectionTitle}>Loaned Equipment</h3>
            <p className={classes.paragraph}>
              If your prescription medicine requires a device or equipment to utilize, we
              may loan you such device or equipment. In this case, you will be provided
              the device or equipment with your prescription order and will be given
              information on how and when to return the device or equipment. If you do not
              return the device or equipment as instructed, you may be charged the cost of
              the device or equipment.
            </p>

            <h3 className={classes.sectionTitle}>
              Authorization to Transfer Prescription
            </h3>
            <p className={classes.paragraph}>
              If your prescription was transferred to or originally filled by a
              non-participating pharmacy (not within Phil’s network) Phil may facilitate
              the transfer of your prescription to its participating pharmacy. By using
              Phil’s services, you authorize Phil to facilitate the transfer of your
              prescription to any participating Pharmacy. Phil has the sole discretion to
              determine which participating pharmacy fills your prescription. If the
              Pharmacy initially chosen by the Services is unable to fill your
              prescription(s), you expressly agree that Phil may transfer your personal
              information to another Pharmacy to do so.
            </p>

            <h2 className={classes.annexTitle}>
              Changes to these Terms or the Services
            </h2>
            <p className={classes.paragraph}>
              We may update the Terms from time to time at our sole discretion. If we do,
              we’ll let you know by posting the updated Terms on the Sites and/or may also
              send other communications. It’s important that you review the Terms whenever
              we update them or you use the Services. If you continue to use the Services
              after we have posted updated Terms it means that you accept and agree to the
              changes. If you don’t agree to be bound by the changes, you may not use the
              Services anymore. We’re always striving to improve the Services and, because
              our Services are evolving over time we may change or discontinue all or any
              part of the Services, at any time and without notice, at our sole
              discretion.
            </p>

            <h3 className={classes.sectionTitle}>Health-Related Content</h3>
            <p className={classes.paragraph}>
              The health-related content you may find in the Services (“Health-related
              Content”) is broad in nature and in scope, describes only general principles
              of health care, and is neither specific instructions for individual patients
              nor appropriate or relevant to your personal situation. Health-related
              Content is not intended to be used to diagnose, treat, cure or prevent
              diseases or as a self-medication guide or substitute for consulting with
              your health professional or pharmacist.
            </p>

            <h3 className={classes.sectionTitle}>Registration and Your Information</h3>
            <p className={classes.paragraph}>
              If you want to use certain features of the Services you’ll have to create an
              account (“Account”) via the Services. It’s important that you provide us with
              accurate, complete and up-to-date information for your Account and you agree
              to update such information to keep it accurate, complete and up-to-date. If
              you don’t provide us with accurate information (or do not update the
              information to keep it accurate, complete and up-to-date), we may suspend or
              terminate your Account. You agree to keep your Account password confidential
              and you’ll let us know immediately if there is any unauthorized use of your
              Account. Phil will not be responsible or liable for any loss or damage that
              results from your failure to comply with this security obligation. You are
              responsible for all activities that occur under your Account, whether or not
              you know about them, so please safeguard your Account password and other
              related information.
            </p>

            <h3 className={classes.sectionTitle}>SMS Text Messaging</h3>
            <p className={classes.paragraph}>
              When using the Services, you may opt in to receive SMS text messages from us
              (“Text Messages”) by providing your express consent to receive Text Messages
              at the mobile number you provide regarding your account, Services,
              prescriptions, refills, order status, care-related reminders, and other
              service-related communications. Your consent is not required as a condition
              of purchasing any goods or services, including pharmacy products or services.
              You can cancel the SMS service at any time by replying STOP to any message or
              by using any other opt-out method we make available in the message content.
              If you want to opt in again, you may re-enroll in SMS notifications by
              following the identified opt-in process. By opting in, you authorize Phil to
              send Text Messages to the mobile phone number associated with your opt in,
              including by using an automatic telephone
              dialing system or other automated technology, as permitted by law. You
              confirm that you are the current subscriber or authorized user of the mobile
              number you provide and you are authorized to provide consent to receive Text
              Messages at that number. The frequency of Text Messages will vary depending
              upon the Services you receive and your interactions with us and your
              communication preferences. Message and data rates may apply. For help at any
              time, reply HELP to any Text Message, or contact us at{" "}
              <Mail>{TERMS_EMAIL}</Mail>. Carriers are not liable for delayed or undelivered
              messages. We may change the short code or telephone number we use to send Text
              Messages. If we do, we will notify you as required by law. Please refer to
              our <Priv /> for information on how we collect, use and disclose information,
              including information related to Text Messages.
            </p>

            <h3 className={classes.sectionTitle}>Additional Users of the Services</h3>
            <p className={classes.paragraph}>
              You may add prescriptions for your family members, or others you are
              authorized to represent, as users of the Services on the following
              conditions:
            </p>
            <p className={classes.paragraph}>
              By adding a user over the age of eighteen (18) you acknowledge that you are
              acting as this user’s representative and have an express authorization from
              the patient to enter his/her personal information and have medications
              delivered to the address entered.
            </p>
            <p className={classes.paragraph}>
              If the additional user is under the age of eighteen (18) (a “Minor Child”),
              you represent that you are a parent or a guardian of the user. You recognize
              and acknowledge that there are certain risks of physical injury in connection
              with the administering of medication to a Minor Child. Such risks include,
              but are not limited to, failing to properly administer the medication, failing
              to observe side effects, failing to assess and/or recognize an adverse
              reaction, failing to assess and/or recognize a medical emergency, and failing
              to recognize the need to summon emergency medical services. You hereby fully
              release or discharge Phil and dispensing pharmacy from any and all claims from
              injuries, damages and losses your Minor Child may have, arising out of,
              connected with, incidental to, or in any way associated with the administering
              of medication.
            </p>

            <h3 className={classes.sectionTitle}>Delivery of Your Order</h3>
            <p className={classes.paragraph}>
              If no one is present at your delivery address at the time of the delivery to
              receive your Order, the courier may leave your Order at your door or other
              secure location in accordance with the general guidelines issued by the
              delivery services, if the courier believes it is reasonable to do so.
            </p>

            <h3 className={classes.sectionTitle}>Feedback to the Phil Services</h3>
            <p className={classes.paragraph}>
              Your opinion matters to us! We welcome feedback, comments and suggestions for
              improvements to the Services (“Feedback”). You can submit Feedback by emailing
              us at <Mail>{TERMS_EMAIL}</Mail>. If you provide us any Feedback, you agree
              that we may use the Feedback you provide to us in any way, including in future
              modifications to the Services or in other services we may provide. You hereby
              grant to Phil a perpetual, worldwide, irrevocable, fully-paid, royalty-free,
              sub-licensable and transferable license to use, copy, modify, distribute,
              display, create derivative works of and otherwise exploit the Feedback for any
              purpose.
            </p>

            <h3 className={classes.sectionTitle}>Payment for Your Order through Phil</h3>
            <p className={classes.paragraph}>
              When you submit an Order through Phil, the Pharmacy selected by the Services
              will calculate the total Order price, which will be based on: (i) the actual
              cash price charged by the Pharmacy for each medication, if you do not have
              health insurance coverage for prescription medications; (ii) a copay amount
              that you are required to pay for medications, if you do have health insurance
              coverage for prescription medications; and (iii) any applicable delivery and
              handling fee that we may charge for delivery of the medication to the address
              specified in your Order. After the Pharmacy determines the total Order price,
              we will send you an email to notify you of the Order Price. We will charge you
              only when you confirm the Order (using the appropriate button in the Service).
            </p>
            <p className={classes.paragraph}>
              For recurring Orders for medications that you take on an ongoing basis, you
              authorize Phil to initiate recurring non-refundable payments as set forth in
              this paragraph. If there is no change in the price or copay amount for the
              recurring Orders, we will process such Orders and charge you for the same price
              without sending you additional email for confirmation. If the price for a
              recurring Order has increased, we will send you another email to confirm the
              higher price or copay amount. If the price or copay amount for a recurring
              Order has decreased, we will charge you the lower price or copay amount without
              explicitly notifying you of the decrease. You may cancel recurring Order at any
              time through the Services before an Order is placed for that prescription.
            </p>
            <p className={classes.paragraph}>
              If you place an Order via the Services, you expressly authorize (i) Phil or
              Phil’s third party payment processing service provider to process and/or charge
              your credit card (and on a recurring basis for recurring medications) for
              verification, pre-authorization and payment purposes; (ii) to bear any
              additional charges that your bank or other financial service provider may levy
              on you as well as any fees or taxes that may apply to you, and (iii) that Phil
              may use your insurance information to run a test claim to determine the price of
              the medication and whether a Prior Authorization is needed. We may ask you to
              supply additional information relevant to your Order, including the expiration
              date of your credit card and your email and postal addresses for billing and
              notification. You represent and warrant that you have the legal right to use
              all payment method(s) that you provided to us to process your Order. You’ll
              receive a confirmation by email once the Pharmacy has completed processing your
              Order. If you have any concerns or objections regarding any charges, you agree
              to raise them first with Phil and you agree not to cancel or reject any credit
              card charges unless you have made a reasonable attempt at resolving the matter
              directly with Phil or the Pharmacy.
            </p>
            <p className={classes.paragraph}>
              By pressing the “Confirm” button for the listed charges in the Service, (i) you
              agree to the pricing, payment and billing policies applicable to such fees and
              charges, as posted or otherwise communicated to you, and (ii) you authorize us
              to provide your Payment Information and insurance information to third parties
              so we can complete your Order and to charge your payment method (plus any
              applicable taxes and other charges). You may need to provide additional
              information to verify your identity before completing your Order (such
              information is included within the definition of Payment Information). You
              represent and warrant that you will not dispute the payment with the credit card
              company so long as the transaction corresponds to the terms indicated on the
              payment page and in the Terms. You acknowledge that if any charges to the credit
              card are declined or charge backs are claimed against any outstanding amount, you
              will still be liable for payment pursuant to the Terms.
            </p>
            <p className={classes.paragraph}>
              If you authorize an Order or payment through a telephone interaction with a Phil
              agent or automated system, your verbal agreement during that call constitutes
              your authorization to charge the specified amount to your credit card on the
              same terms described above. You acknowledge that calls with Phil’s agents may be
              recorded, and that your verbal authorization carries the same legal effect as
              pressing the ‘Confirm’ button in the Service. Phil will confirm your
              authorization and Order details by email following any telephone interaction in
              which payment is authorized.
            </p>

            <h3 className={classes.sectionTitle}>Manufacturer’s Assistance</h3>
            <p className={classes.paragraph}>
              Phil may apply manufacturers’ financial assistance, such as coupons, discounts,
              repayment, and other reductions in your out-of-pocket expenses in compliance
              with state and federal laws and regulations applicable to drug manufacturers’
              assistance. Please note that manufacturers’ financial assistance is not
              available for government-sponsored plans, such as Medicare or Medicaid.
            </p>

            <h3 className={classes.sectionTitle}>No Refunds</h3>
            <p className={classes.paragraph}>
              It is important that you carefully review any order or renewal for recurring
              prescriptions that you place. If you do not wish to receive a refill of a
              prescription, please remove the prescription from your account, cancel a refill
              before the order is placed or otherwise notify Phil directly. Once the medication
              has been shipped it cannot be returned and we offer no refund unless there was an
              error in the order or the medication is defective. If you experience an issue
              with your order, please contact Phil using the details below.
            </p>

            <h3 className={classes.sectionTitle}>
              Cancellation of Your Prescription or Refill
            </h3>
            <p className={classes.paragraph}>
              You may remove a prescription from your Account or cancel a refill for a
              particular prescription at any time through the Services before an Order is
              placed for that prescription.
            </p>

            <h3 className={classes.sectionTitle}>Proprietary Rights</h3>
            <p className={classes.paragraph}>
              Phil and its licensors exclusively own all right, title and interest in and to
              the Services, including all associated intellectual property rights. You
              acknowledge that the Services are protected by laws of the United States and any
              applicable jurisdictions. You agree not to remove, alter or obscure any
              copyright, trademark, service mark or other proprietary rights notices
              incorporated in or accompanying the Services. Neither these Terms nor your use
              of the Services transfers any right, title or interest in the Services, the
              content of the Services, or intellectual property rights to you, and Phil and
              its third party licensors retain all of their respective right, title, and
              interest to the Services and content.
            </p>

            <h3 className={classes.sectionTitle}>Rights Granted by Phil</h3>
            <p className={classes.paragraph}>
              Subject to your compliance with these Terms, Phil grants you a limited,
              non-exclusive, non-transferable right to use the Services solely for your own
              personal and non-commercial purposes. Except as expressly permitted in these
              Terms, you may not: (i) copy, modify or create derivative works based on the
              Services; (ii) reverse engineer, decompile or disassemble the Services; or (iii)
              make the functionality of the Services available to multiple users through any
              means. Phil reserves all rights in and to the Services not expressly granted to
              you under these Terms.
            </p>

            <h3 className={classes.sectionTitle}>General Prohibitions</h3>
            <p className={classes.paragraph}>
              By using the Services, you agree not to do any of the following:
            </p>
            <ol className={classes.orderedList}>
              {PROHIBITIONS.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
              <li>
                You agree not to submit controlled substance prescriptions through the
                Services, except as expressly authorized by Phil in connection with specific
                programs or medications made available by Phil for which Phil has established
                applicable controls. A current list of controlled substances by DEA schedule
                can be found <Ext href={DEA_SCHEDULE_URL}>here</Ext>.
              </li>
            </ol>
            <p className={classes.paragraph}>
              Although we’re not obligated to monitor access to or use of the Services, we have
              the right to do so for the purpose of operating the Services, to ensure
              compliance with these Terms, or to comply with applicable law or other legal
              requirements. We have the right to investigate violations of these Terms or
              conduct that affects the Services. We may also consult and cooperate with law
              enforcement authorities to prosecute users who violate the law.
            </p>

            <h3 className={classes.sectionTitle}>
              Links to Third Party Websites or Resources
            </h3>
            <p className={classes.paragraph}>
              The Services may contain links to third-party websites or resources (“Linked
              Sites”). We provide these links only as a convenience and are not responsible
              for the content, products or services on or available from those websites or
              resources or links displayed on such sites.
            </p>
            <p className={classes.paragraph}>
              You should refer to the separate terms of use, privacy policies, and other rules
              posted on Linked Sites before you use them. Phil does not author, edit or monitor
              these Linked Sites, and is not responsible or liable for: (a) the availability of
              or content provided on such Linked Sites, nor does inclusion of any link imply
              endorsement of the Linked Sites by Phil, or vice versa; (b) third-party content
              accessible through such Linked Sites; (c) any loss or damage whatsoever you may
              incur from dealing with any Linked Site; or (d) your dealings with any third
              parties found on or through our Sites. You bear all risk associated with the use
              of the Linked Sites, third party services, and your correspondence or business
              dealings with advertisers other than us found on or through the Services.
            </p>
            <p className={classes.paragraph}>
              Phil does not control, makes no guarantees about, and disclaims any express or
              implied representations or warranties about the accuracy, relevance, timeliness,
              completeness, or appropriateness for a particular purpose of the information or
              the resources contained on the Linked Sites or any other Internet sites. We
              reserve the right to terminate such links at any time. The fact that we offer
              such links should not be construed in any way as an endorsement, authorization,
              or sponsorship of that site or its content, products, or services.
            </p>

            <h3 className={classes.sectionTitle}>Electronic Communications</h3>
            <p className={classes.paragraph}>
              You agree that all agreements, notices, disclosures and other communications
              that we provide to you electronically shall have the same legal effect as if
              provided physically and shall satisfy any legal requirement that such
              communications be in writing. You understand that email communication has risk
              of third-party interception and may be transmitted to unintended parties. You
              expressly agree to hold Phil harmless for any damages associated with the
              security breach of your email or erroneous transmission.
            </p>

            <h3 className={classes.sectionTitle}>Mobile Security</h3>
            <p className={classes.paragraph}>
              Most communication with Phil occurs through your mobile device. Therefore, your
              mobile device likely contains Protected Health Information (“PHI”), such as
              pictures of your prescriptions, medical insurance cards, and other vulnerable
              information. As a result, it is of utmost importance that you keep your mobile
              devices secure at all times. If you are using public Wi-Fi or email applications
              on mobile devices, you are likely using unsecure mobile networks, putting PHI at
              risk of interception.
            </p>
            <p className={classes.paragraph}>
              The best ways to protect mobile devices from security breaches is to maintain
              password protection, encryption, and/or to install a remote wiping/disabling
              program into them. A remote wiping/disabling program allows users to quickly
              clear and disable a lost or stolen mobile device, which can possibly prevent or
              reduce the magnitude of the breach.
            </p>
            <p className={classes.paragraph}>
              While Phil is HIPAA compliant and takes the utmost care in protecting your
              confidential information, it cannot protect information stored in your mobile
              device. By using Phil, you agree to hold Phil harmless of any data breaches
              occurring from theft/misplacement or any third-party intervention with your
              mobile device.
            </p>

            <h3 className={classes.sectionTitle}>Termination</h3>
            <p className={classes.paragraph}>
              We may suspend or terminate your access to and use of the Services or deactivate
              or cancel your Account, at our sole discretion with or without notice,
              temporarily or permanently, for any reason or no reason, and without liability
              to you. You may cancel your Account at any time by sending an email to us at{" "}
              <Mail>{TERMS_EMAIL}</Mail>. Upon any termination, discontinuation or cancellation
              of Services or your Account, all provisions of these Terms which by their nature
              should survive will survive, including, without limitation, provisions regarding
              loaned equipment, feedback, payment for your order, proprietary rights, third
              party websites or resources, warranty disclaimer, limitations of liability,
              governing law and forum and dispute resolution (including arbitration and class
              action waiver). Upon any termination, discontinuation or cancellation of the
              Services or your Account by you or us, you will continue to be obligated to pay
              all amounts owing under these Terms which are due and payable prior to such
              termination, discontinuation or cancellation.
            </p>

            <h3 className={classes.sectionTitle}>Warranty Disclaimers</h3>
            <p className={classes.paragraph}>
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, THE SERVICES ARE
              PROVIDED “AS IS, WHERE IS” AND “AS AVAILABLE” WITHOUT WARRANTY OF ANY KIND.
              WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ALL WARRANTIES OF ANY
              KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, SECURITY,
              ACCURACY AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF
              DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE. PHIL EXPRESSLY DISCLAIMS ANY
              AND ALL LIABILITY FOR LOSSES ARISING OUT OF ANY ACTION TAKEN IN RELIANCE ON THE
              SERVICES AND/OR ANY CONTENT, TOOLS, APPLICATIONS, AND PRODUCTS PROVIDED ON THE
              SERVICES. PHIL MAKES NO WARRANTY THAT: (A) THE SERVICES WILL MEET YOUR
              REQUIREMENTS OR WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE ERROR-FREE
              BASIS; (B) THE CONTENT WILL BE UP-TO-DATE, COMPLETE COMPREHENSIVE OR ACCURATE;
              (C) THE QUALITY OF ANY RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES;
              (D) THE QUALITY OF ANY PRODUCTS, CONTENT, SERVICES, INFORMATION OR OTHER MATERIAL
              OBTAINED THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS; OR (E) THAT DEFECTS, IF
              ANY, WILL BE CORRECTED. WE MAKE NO WARRANTY REGARDING THE QUALITY, ACCURACY,
              TIMELINESS, TRUTHFULNESS, COMPLETENESS OR RELIABILITY OF ANY HEALTH-RELATED
              CONTENT OBTAINED AS A RESULT OF YOUR USE OF THE SERVICES.
            </p>
            <p className={classes.paragraph}>
              YOU UNDERSTAND AND AGREE THAT ANY CONTENT AND/OR DATA DOWNLOADED OR OTHERWISE
              OBTAINED THROUGH THE USE OF THE SERVICES IS USED AT YOUR OWN RISK AND THAT YOU
              WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE
              DEVICE, OR FOR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH CONTENT,
              MATERIAL AND/OR DATA.
            </p>
            <p className={classes.paragraph}>
              IT IS SOLELY YOUR RESPONSIBILITY TO (1) ENSURE THAT YOUR ORDER WAS PROPERLY
              PROCESSED AND THAT YOU RECEIVED THE CORRECT MEDICATIONS (INCLUDING THE CORRECT
              DOSAGE(S) THEREOF), (2) CONSUME THE PROPER DOSAGE(S) OF YOUR MEDICATION(S), AND
              (3) STORE ALL MEDICATIONS PROPERLY AND IN ACCORDANCE WITH THE GUIDELINES PROVIDED
              BY THE PHARMACY AND/OR APPLICABLE MEDICATION MANUFACTURER(S). PHIL PROVIDES NO
              WARRANTIES REGARDING THE MEDICATIONS THAT ARE PROVIDED TO YOU BY THE PHARMACY AND
              ASSUMES NO LIABILITY FOR ANY MEDICATIONS (OR ANY INJURY OR DEATH RESULTING
              THEREFROM).
            </p>
            <p className={classes.paragraph}>
              PHIL EXPRESSLY DISCLAIMS ANY REPRESENTATIONS OR WARRANTIES, WHETHER EXPRESS OR
              IMPLIED, REGARDING A PHARMACY’S AND ITS PERSONNEL’S PROFESSIONAL QUALIFICATIONS,
              EXPERTISE, QUALITY OF WORK, OR ACCURACY IN FILLING YOUR PRESCRIPTION(S), AND
              ASSUMES NO RESPONSIBILITY FOR A PHARMACY’S COMPLIANCE WITH ANY APPLICABLE LAWS AND
              REGULATIONS (EXCEPT FOR PHIL IN THE CASES WHERE PHIL FILLS THE PRESCRIPTION).
              WITHOUT LIMITING THE FOREGOING, PHIL EXPRESSLY DISCLAIMS ALL LIABILITY FOR ANY
              PRESCRIPTIONS INCORRECTLY FILLED BY A PHARMACY, WHETHER AS A RESULT OF INACCURATE
              INFORMATION PROVIDED BY YOU OR OTHERWISE, ANY CANCELLED OR OTHERWISE UNFILLED
              PRESCRIPTIONS (OR ANY INJURY OR DEATH RESULTING THEREFROM), OR ANY ACT OR OMISSION
              OF ANY PHARMACY.
            </p>

            <h3 className={classes.sectionTitle}>Indemnity</h3>
            <p className={classes.paragraph}>
              You will indemnify, defend and hold harmless Phil and its officers, directors,
              employee and agents, from and against any claims, disputes, demands, liabilities,
              damages, losses, and costs and expenses, including, without limitation, reasonable
              legal and accounting fees, arising out of or in any way connected with (i) your
              access to or use of the Services, or (ii) your violation of these Terms.
            </p>

            <h3 className={classes.sectionTitle}>Limitation of Liability</h3>
            <p className={classes.paragraph}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL PHIL NOR ANY OTHER PARTY
              INVOLVED IN CREATING, PRODUCING, PROVIDING OR DELIVERING THE SERVICES, INCLUDING
              WITHOUT LIMITATION ANY HEALTH-RELATED CONTENT, BE LIABLE FOR ANY INCIDENTAL,
              SPECIAL, PUNITIVE, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOSS
              OF DATA OR GOODWILL, OR THE COST OF SUBSTITUTE SERVICES ARISING OUT OF OR IN
              CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES, OR
              FROM ANY COMMUNICATIONS OR INTERACTIONS WITH ANY PHARMACIES, WHETHER BASED ON
              WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE AND STRICT LIABILITY), PRODUCT
              LIABILITY OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT PHIL HAS BEEN INFORMED OF
              THE POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND
              TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. THIS LIMITATION OF LIABILITY APPLIES TO,
              BUT IS NOT LIMITED TO, THE TRANSMISSION OF ANY DISABLING DEVICE OR VIRUSES WHICH
              MAY INFECT YOUR EQUIPMENT OR SYSTEM, UNAUTHORIZED ACCESS, THEFT, BODILY INJURY,
              PROPERTY DAMAGE, OPERATOR STRIKES OR OTHER LABOR PROBLEMS OR ANY FORCE MAJEURE.
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR
              CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
            </p>
            <p className={classes.paragraph}>
              IN NO EVENT WILL PHIL’S TOTAL CUMULATIVE LIABILITY ARISING FROM ALL CLAIMS UNDER
              OR RELATED TO THESE TERMS, FROM THE USE OF OR INABILITY TO USE THE SERVICES,
              INCLUDING WITHOUT LIMITATION ANY HEALTH-RELATED CONTENT, OR FROM ANY COMMUNICATIONS
              OR INTERACTIONS WITH ANY PHARMACIES, EXCEED THE LESSER OF THE AMOUNTS YOU HAVE PAID
              TO PHIL FOR USE OF THE SERVICES OR ONE HUNDRED DOLLARS ($100).
            </p>
            <p className={classes.paragraph}>
              THE DISCLAIMER, EXCLUSIONS AND LIMITATIONS OF LIABILITY SET FORTH ABOVE ARE
              FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN PHIL AND YOU.
            </p>

            <h2 className={classes.annexTitle}>Governing Law and Forum Choice</h2>
            <p className={classes.paragraph}>
              These Terms and any action related thereto will be governed by the Federal
              Arbitration Act, federal arbitration law, and the laws of the State of Arizona,
              without regard to its conflict of laws provisions. Except as otherwise expressly
              set forth below in the paragraph “Dispute Resolution,” the exclusive jurisdiction
              for all Disputes (defined below) that you and Phil are not required to arbitrate
              will be the state and federal courts located in Maricopa County, Arizona and you
              and Phil each waive any objection to jurisdiction and venue in such courts.
            </p>

            <h2 className={classes.annexTitle}>Dispute Resolution</h2>
            <p className={classes.paragraph}>
              If you are a Phil patient who has a registered Phil account, then we each agree
              that any dispute, claim or controversy arising out of or relating to these Terms
              or the breach, termination, enforcement, interpretation or validity thereof or the
              use of the Services (collectively, “Disputes”) will be resolved solely by binding,
              individual arbitration and not in a class, representative or consolidated action or
              proceeding. You and Phil agree that the U.S. Federal Arbitration Act governs the
              interpretation and enforcement of these Terms, and that you and Phil are each
              waiving the right to a trial by jury or to participate in a class action. This
              arbitration provision shall survive termination of these Terms.
            </p>
            <p className={classes.paragraph}>
              As limited exceptions to the paragraph above: (i) we both may seek to resolve a
              Dispute in small claims court if it qualifies; and (ii) we each retain the right to
              seek injunctive or other equitable relief from a court to prevent (or enjoin) the
              infringement or misappropriation of our intellectual property rights.
            </p>

            <h3 className={classes.sectionTitle}>
              Conducting Arbitration and Arbitration Rules
            </h3>
            <p className={classes.paragraph}>
              The arbitration between Phil patients with registered Phil accounts will be
              conducted by the American Arbitration Association (“AAA”) under its Consumer
              Arbitration Rules (the “AAA Rules”) then in effect, except as modified by these
              Terms. The AAA Rules are available at <Ext href={ADR_URL}>www.adr.org</Ext> or by
              calling 1-800-778-7879. A party who wishes to start arbitration must submit a
              written Demand for Arbitration to AAA and give notice to the other party as
              specified in the AAA Rules. The AAA provides a form Demand for Arbitration at{" "}
              <Ext href={ADR_DEMAND_FORM_URL}>www.adr.org</Ext>.
            </p>
            <p className={classes.paragraph}>
              Any arbitration hearings will take place in the county (or parish) where you live,
              unless we both agree to a different location. The parties agree that the arbitrator
              shall have exclusive authority to decide all issues relating to the interpretation,
              applicability, enforceability and scope of this arbitration agreement.
            </p>
            <p className={classes.paragraph}>
              Payment of all filing, administration and arbitrator fees will be governed by the
              AAA Rules, and we won’t seek to recover the administration and arbitrator fees we
              are responsible for paying, unless the arbitrator finds your Dispute frivolous. If
              we prevail in arbitration we’ll pay all of our attorneys’ fees and costs and won’t
              seek to recover them from you. If you prevail in arbitration you will be entitled to
              an award of attorneys’ fees and expenses to the extent provided under applicable
              law.
            </p>
            <p className={classes.paragraph}>
              Except as provided in in the second paragraph of this subsection above, the
              arbitrator shall determine all issues of liability on the merits of any claim
              asserted by either party and may award declaratory or injunctive relief only in
              favor of the individual party seeking relief and only to the extent necessary to
              provide relief warranted by that party’s individual claim. To the extent that you or
              we prevail on a claim and seek public injunctive relief (that is, injunctive relief
              that has the primary purpose and effect of prohibiting unlawful acts that threaten
              future injury to the public), the entitlement to and extent of such relief must be
              litigated in a civil court of competent jurisdiction and not in arbitration. The
              parties agree that litigation of any issues of public injunctive relief shall be
              stayed pending the outcome of the merits of any individual claims in arbitration.
            </p>

            <h3 className={classes.sectionTitle}>Class Action Waiver</h3>
            <p className={classes.paragraph}>
              YOU AND PHIL AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS
              INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
              REPRESENTATIVE PROCEEDING. Further, if the parties’ Dispute is resolved through
              arbitration, the arbitrator may not consolidate another person’s claims with your
              claims, and may not otherwise preside over any form of a representative or class
              proceeding. If this specific provision is found to be unenforceable, then the
              entirety of this Dispute Resolution section shall be null and void.
            </p>

            <h3 className={classes.sectionTitle}>Severability</h3>
            <p className={classes.paragraph}>
              With the exception of any of the provisions in the paragraph above (Class Action
              Waiver), if an arbitrator or court of competent jurisdiction decides that any part
              of these Terms is invalid or unenforceable, the other parts of these Terms will
              still apply.
            </p>

            <h3 className={classes.sectionTitle}>General Terms</h3>
            <p className={classes.paragraph}>
              These Terms constitute the entire and exclusive understanding and agreement between
              Phil and you regarding the Services, and these Terms supersede and replace all prior
              oral or written understandings or agreements between Phil and you regarding the
              Services. If any provision of these Terms is held invalid or unenforceable by an
              arbitrator or a court of competent jurisdiction, that provision will be enforced to
              the maximum extent permissible and the other provisions of these Terms will remain
              in full force and effect.
            </p>
            <p className={classes.paragraph}>
              Except where provided by applicable law in your jurisdiction, you may not assign or
              transfer these Terms, by operation of law or otherwise, without Phil’s prior written
              consent. Any attempt by you to assign or transfer these Terms absent our consent or
              your statutory right, without such consent, will be null. Phil may freely assign or
              transfer these Terms without restriction. Subject to the foregoing, these Terms will
              bind and insure to the benefit of the parties, their successors and permitted
              assigns.
            </p>
            <p className={classes.paragraph}>
              Any notices or other communications provided by Phil under these Terms, including
              those regarding modifications to these Terms, will be given by Phil: (i) via email;
              or (ii) by posting to the Services. For notices made by e-mail, the date of receipt
              will be deemed the date on which such notice is transmitted.
            </p>
            <p className={classes.paragraph}>
              These Terms apply only to Phil and you. These Terms are not intended to, and shall
              not, create any third-party beneficiary rights, except as expressly provided in
              these Terms.
            </p>
            <p className={classes.paragraph}>
              Phil’s failure to enforce any right or provision of these Terms will not be
              considered a waiver of those rights. The waiver of any such right or provision will
              be effective only if in writing and signed by a duly authorized representative of
              Phil. Except as expressly set forth in these Terms, the exercise by either party of
              any of its remedies under these Terms will be without prejudice to its other
              remedies under these Terms or otherwise.
            </p>

            <h3 className={classes.sectionTitle}>Contact Information</h3>
            <p className={classes.paragraph}>
              If you have any questions about these Terms, the practices of Phil, or your dealings
              with the Services, or if you would like to update your personal information, please
              contact Phil at:
            </p>
            <p className={classes.paragraph}>
              Email: <Mail>{TERMS_EMAIL}</Mail>
              <br />
              Phone: <Tel href={TERMS_PHONE_HREF}>{TERMS_PHONE_LABEL}</Tel>, option 3
              <br />
              Phil, Inc.
              <br />
              ATTN: Privacy Officer, 14500 Northsight Blvd, Suite 307 Scottsdale, AZ 85260
            </p>
          </div>
        </div>
      </section>
    </Layout>
  </PageContext.Provider>
);

export default TermsPage;

const TERMS_OG_IMAGE = getOgImage(null);
const TERMS_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": TERMS_URL,
  url: TERMS_URL,
  name: TERMS_TITLE,
  description: TERMS_DESC,
  image: TERMS_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{TERMS_TITLE}</title>
    <meta name="description" content={TERMS_DESC} />
    <link rel="canonical" href={TERMS_URL} />
    <meta property="og:title" content={TERMS_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={TERMS_DESC} />
    <meta property="og:image" content={TERMS_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={TERMS_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={TERMS_TITLE} />
    <meta name="twitter:description" content={TERMS_DESC} />
    <meta name="twitter:image" content={TERMS_OG_IMAGE} />
    <script type="application/ld+json">{TERMS_SCHEMA}</script>
  </>
);
