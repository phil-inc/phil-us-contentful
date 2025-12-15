import React, { useState } from "react";
import { Box } from "@mantine/core";

import imgAddyiBox from "@addyi/assets/images/eed18cbd949fc9f2aeaa778cd983beecb6f61620.png";

import * as classes from "./SafetyInformation.module.css";

function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <Box className={`${classes.accordionIcon} ${isOpen ? classes.open : ""}`}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 2V27"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M27 14.5L2 14.5"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
    </Box>
  );
}

function AccordionHeader({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Box className={classes.accordionHeader} onClick={onToggle}>
      <Box className={classes.accordionHeaderContent}>
      <h3 className={classes.accordionTitle}>
        Important Safety Information
      </h3>
      <AccordionIcon isOpen={isOpen} />
      </Box>
    </Box>
  );
}

function WhatIsAddyi() {
  return (
    <Box className={classes.safetyColumn}>
      <h4 className={classes.sectionTitle}>
        What is ADDYI® (add-ee) (flibanserin) Tablets?
      </h4>
      <p className={classes.safetyText}>
        ADDYI® is a prescription medicine used to treat hypoactive (low) sexual
        desire disorder (HSDD) in women who have not gone through menopause, who
        have not had problems with low sexual desire in the past, and who have
        low sexual desire no matter the type of sexual activity, the situation,
        or the sexual partner. Women with HSDD have low sexual desire that is
        troubling to them. Their low sexual desire is not due to:
      </p>
      <ul className={classes.safetyList}>
        <li>a medical or mental health problem</li>
        <li>problems in the relationship</li>
        <li>medicine or other drug use.</li>
      </ul>
      <p className={classes.safetyText}>
        ADDYI® is not for use for the treatment of HSDD in women who have gone
        through menopause, in men or in children.
      </p>
      <p className={classes.safetyText}>
        ADDYI® is not for use to improve sexual performance.
      </p>

      <Box className={classes.boxImageContainer}>
        <Box className={classes.boxImageWrapper}>
          <img
            src={imgAddyiBox}
            alt="Addyi bottles and box"
            className={classes.boxImage}
          />
        </Box>
      </Box>
    </Box>
  );
}

// Source: Copy - Safety content (right column)
function ImportantSafetyInfo() {
  return (
    <Box className={classes.safetyColumn}>
      <h4 className={classes.sectionTitle}>
        IMPORTANT SAFETY INFORMATION
      </h4>

      <p className={classes.safetyTextBold}>
        What is the most important information I should know about ADDYI®? Your
        risk of severe low blood pressure and fainting (loss of consciousness)
        is increased:
      </p>

      <ul className={classes.safetyList}>
        <li>
          <strong>
            if you drink alcohol close to the time you take your ADDYI® dose,
          </strong>
        </li>
        <li>
          <strong>if you take ADDYI® with certain medicines, or</strong>
        </li>
        <li>
          <strong>if you have liver problems and you take ADDYI®.</strong>
        </li>
      </ul>

      <p className={classes.safetyTextBold}>
        To lower your risk of low blood pressure and fainting (loss of
        consciousness):
      </p>

      <ul className={classes.safetyList}>
        <li>
          <strong>
            Do not drink alcohol close to the time you take your ADDYI® dose
          </strong>
          <ul>
            <li>
              <strong>
                Wait at least 2 hours after drinking 1 or 2 standard alcoholic
                drinks before taking ADDYI® at bedtime.
              </strong>
            </li>
            <li>
              <strong>
                Skip your ADDYI® dose if you drink 3 or more standard alcoholic
                drinks that evening.
              </strong>
            </li>
          </ul>
        </li>
        <li>
          <strong>
            After taking ADDYI® at bedtime do not drink alcohol until the
            following day.
          </strong>
        </li>
      </ul>

      <p className={classes.safetyText}>
        Examples of 1 standard alcoholic drink include:
      </p>

      <ul className={classes.safetyList}>
        <li>one 12-ounce regular beer</li>
        <li>5 ounces of wine</li>
        <li>1.5 ounces of distilled spirits or shot</li>
      </ul>

      <p className={classes.safetyText}>
        <strong>
          Tell your doctor about other medicines you take. Do not take or start
          taking any prescription or over-the-counter medicines, or herbal
          supplements
        </strong>{" "}
        without first talking to your doctor. Your doctor will tell you if it is
        safe to take other medicines or herbal supplements while you are taking
        ADDYI®.
      </p>

      <p className={classes.safetyText}>
        Do not take ADDYI® if you have liver problems.
      </p>

      <p className={classes.safetyText}>
        If you take ADDYI® and you feel lightheaded or dizzy, lie down right
        away. Get emergency medical help or ask someone to get emergency medical
        help for you if the symptoms do not go away or if you feel like you
        could faint (lose consciousness). If you faint, tell your doctor as soon
        as you can.
      </p>

      <p className={classes.safetyTextBold}>
        Who should not take ADDYI®?
      </p>
      <p className={classes.safetyTextBold}>
        Do not take ADDYI® if you:
      </p>

      <ul className={classes.safetyList}>
        <li>
          take certain medicines. Taking ADDYI® with certain other medicines can
          increase the amount of ADDYI® in your blood and cause severe low blood
          pressure, fainting (loss of consciousness), and sleepiness.
        </li>
        <li>
          Do not take ADDYI® if you are taking any of the following medicines:
          <ul>
            <li>Certain medicines used to treat HIV-1 infection</li>
            <li>
              Certain medicines that you take by mouth used to treat fungal
              infections
            </li>
            <li>Certain antibiotics</li>
            <li>Certain medicines used to treat Hepatitis C infection</li>
            <li>
              Certain medicines used to treat high blood pressure, chest pain
              (angina), or other heart problems
            </li>
            <li>Nefazodone: a medicine used to treat depression</li>
          </ul>
        </li>
        <li>
          Ask your doctor or pharmacist if you are not sure if you take any of
          the medicines listed above. These are examples of the medicines that
          you should not take if you are taking ADDYI®. Tell your doctor about
          all the medicines you take before you start taking ADDYI®
        </li>
        <li>have liver problems</li>
        <li>
          are allergic to flibanserin or any of the ingredients in ADDYI®. See
          Medication Guide for the full list of ingredients.
        </li>
      </ul>

      <p className={classes.safetyTextBold}>
        What should I tell my doctor before taking ADDYI®?
      </p>
      <p className={classes.safetyTextBold}>
        Before you take ADDYI®, tell your doctor about all of your medical
        conditions, including if you:
      </p>

      <ul className={classes.safetyList}>
        <li>
          drink alcohol, use drugs, or have a history of alcohol or drug abuse
        </li>
        <li>have ever had depression or other mental health problems</li>
        <li>
          have low blood pressure or a medical condition that can cause low
          blood pressure
        </li>
        <li>
          are pregnant or plan to become pregnant. It is not known if ADDYI®
          will harm your unborn baby.
        </li>
        <li>
          are breastfeeding or plan to breastfeed. It is not known if ADDYI®
          passes into your breast milk. You and your doctor should decide if you
          will take ADDYI® or breastfeed. You should not do both.
        </li>
      </ul>

      <p className={classes.safetyText}>
        <strong>Tell your doctor</strong> if you have had an allergic reaction
        such as hives, itching, or trouble breathing during or after receiving a
        dose of ADDYI®.
      </p>
      <p className={classes.safetyText}>
        <strong>Tell your doctor about all of the medicines you take,</strong>{" "}
        including prescription and over-the-counter medicines, vitamins, and
        herbal supplements. ADDYI® can affect the way other medicines work, and
        other medicines can affect the way ADDYI® works, and can cause serious
        side effects.
      </p>

      <p className={classes.safetyTextBold}>
        What should I avoid while taking ADDYI®?
      </p>

      <ul className={classes.safetyList}>
        <li>
          <strong>
            Do not drink alcohol close to the time you take your ADDYI® dose
          </strong>{" "}
          because this increases your risk of severe low blood pressure and
          fainting (loss of consciousness).
        </li>
        <li>
          <strong>
            Do not drive, operate machinery, or do things that require clear
            thinking until at least 6 hours after you take ADDYI®
          </strong>{" "}
          and until you know how ADDYI® affects you.
        </li>
        <li>
          Do not drink grapefruit juice if you take ADDYI®. Drinking grapefruit
          juice during your treatment with ADDYI® increases your risk of severe
          low blood pressure and fainting (loss of consciousness).
        </li>
        <li>
          You should not take the herbal supplements St. John's Wort, ginkgo, or
          resveratrol or certain over-the-counter medicines such as cimetidine
          until you talk to your doctor. Taking ADDYI® with these herbal
          supplements and over-the-counter medicines may increase your risk of
          low blood pressure, fainting (loss of consciousness), and sleepiness.
        </li>
      </ul>

      <p className={classes.safetyTextBold}>
        What are the possible side effects of ADDYI®?
      </p>
      <p className={classes.safetyTextBold}>
        ADDYI® can cause serious side effects, including:
      </p>

      <ul className={classes.safetyList}>
        <li>
          <strong>Sleepiness</strong> is a common side effect of ADDYI® and can
          be serious. Taking ADDYI® can increase your risk of sleepiness if
          taken during waking hours, if you drink alcohol, or take certain
          medicines or herbal supplements.
        </li>
        <li>
          <strong>Low blood pressure and fainting (loss of consciousness)</strong>{" "}
          can happen when you take ADDYI® even if you do not drink alcohol or
          take other medicines or herbal supplements. Your risk of low blood
          pressure and fainting (loss of consciousness) is increased if ADDYI®
          is taken during waking hours, if you drink alcohol within 2 hours of
          taking ADDYI®, or if you take certain medicines or herbal supplements.
        </li>
      </ul>

      <p className={classes.safetyTextBold}>
        The most common side effects of ADDYI® include:
      </p>

      <ul className={classes.safetyList}>
        <li>Dizziness</li>
        <li>Difficulty falling asleep or staying asleep</li>
        <li>Nausea</li>
        <li>Dry mouth</li>
        <li>Tiredness</li>
      </ul>

      <p className={classes.safetyText}>
        These are not all of the possible side effects of ADDYI®. Call your
        doctor for medical advice about side effects. You are encouraged to
        report negative side effects of prescription drugs to the FDA. Visit{" "}
        <a
          href="http://www.fda.gov/medwatch"
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          www.fda.gov/medwatch
        </a>{" "}
        or call{" "}
        <a href="tel:18003321088" className={classes.link}>
          1-800-FDA-1088
        </a>
        .
      </p>

      <p className={classes.safetyTextBold}>
        See full Prescribing Information, including Boxed Warning regarding
        severe low blood pressure and fainting in certain settings, and
        Medication Guide at{" "}
        <a
          href="https://addyi.com/pi/"
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          addyi.com/pi
        </a>
        .
      </p>

      <p className={classes.safetyText}>
        This information does not take the place of talking with your doctor.
      </p>
    </Box>
  );
}

function AccordionContent() {
  return (
    <Box className={classes.safetyContentWrapper}>
      <Box className={classes.safetyColumnsContainer}>
        <WhatIsAddyi />
        <ImportantSafetyInfo />
      </Box>
    </Box>
  );
}

export const SafetyInformation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={classes.safetySection}>
      <AccordionHeader isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && <AccordionContent />}
    </Box>
  );
};
