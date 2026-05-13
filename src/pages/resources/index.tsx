import React, { useState, useMemo } from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import Pagination from "components/common/Pagination/Pagination";
import DemoCta from "components/common/DemoCta/DemoCta";

import * as classes from "./resources.module.css";

interface ResourceItem {
  title: string;
  description?: string;
  type: "Report" | "Press" | "Webinar" | "Blog";
  tags: string[];
  url: string;
  buttonLabel: string;
}

const RESOURCES_DATA: ResourceItem[] = [
  {
    title: "Building Direct-to-Patient Programs that Exceed Today's Patient Expectations",
    description: "New research from PHIL uncovers patient's most pressing expectations for today's direct-to-patient programs, and why this matters for pharma.",
    type: "Report",
    tags: ["Direct-to-Patient", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/dtp-research/",
    buttonLabel: "Download",
  },
  {
    title: "Tenpoint Therapeutics Ltd and PHIL Partner to Launch YUVEZZI™ Direct-to-Patient Cash Program",
    type: "Press",
    tags: ["Direct-to-Patient", "Access Strategy & Channel Design"],
    url: "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
    buttonLabel: "Read",
  },
  {
    title: "Bridging the Gap to Better Patient Outcomes: What HCPs Want from Pharma's Digital Access Channels",
    description: "New research from PHIL uncovers healthcare provider's perspectives on direct-to-patient programs, and why this matters for pharma.",
    type: "Report",
    tags: ["Direct-to-Patient", "Field Enablement & HCP Engagement", "Data, Technology & Optimization"],
    url: "https://phil.us/hcp-research/",
    buttonLabel: "Download",
  },
  {
    title: "Capturing Actionable Metrics to Improve Patient & Brand Outcomes",
    description: "Market-leading manufacturers are embracing new models to improve visibility and insight into patient outcomes, provider, and brand performance. Watch this webinar as industry experts from Phil and Syneos Health explore gaps in today's channel analytics environment, and offer strategic recommendations to help your team effectively leverage data to improve patient outcomes and brand performance.",
    type: "Webinar",
    tags: ["Data, Technology & Optimization", "Commercial Performance", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/on-demand-webinar-capturing-actionable-metrics-to-improve-patient-and-brand/",
    buttonLabel: "Watch",
  },
  {
    title: "The Hidden GTN Drain: Why Specialty-Lite Brands Need To Streamline The PA Process",
    description: "For retail and specialty-lite pharmaceutical brands, the path from prescription to profit has never been more treacherous. While commercial teams focus on market access negotiations and formulary wins, a critical revenue leak often goes unnoticed: the gap between prior authorization (PA) requirements and submission rates, creating a cascade of gross-to-net (GTN) erosion that threatens long-term viability.",
    type: "Press",
    tags: ["Utilization Management", "Commercial Performance"],
    url: "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal",
    buttonLabel: "Read",
  },
  {
    title: "Sprout Pharmaceuticals and PHIL Expand Their Affordable Direct-to-Patient Access Program for Addyi",
    type: "Press",
    tags: ["Direct-to-Patient", "Access Strategy & Channel Design"],
    url: "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html?",
    buttonLabel: "Read",
  },
  {
    title: "Redefining Commercial Success in Speciaty-Lite",
    description: "Specialty-lite products occupy a complex middle ground in pharmaceutical commercialization. Unsuitable for standard retail yet not requiring the full infrastructure of specialty pharmacies, these products face unique access barriers that traditional distribution models can't address effectively. The solution? Alternative channels that bring together tech-driven hub services and integrated pharmacy networks to maximize profitable revenue growth.",
    type: "Press",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://www.biopharmadive.com/spons/redefining-commercial-success-in-specialty-lite-with-alternative-channels/753650/",
    buttonLabel: "Read",
  },
  {
    title: "Pharma Direct-To-Patient 2.0: From Experiment To Imperative",
    description: "Policy pressure, affordability gaps, and consumer expectations are reshaping how pharma companies think about direct to patient access. The question is no longer if, but how.",
    type: "Press",
    tags: ["Direct-to-Patient", "Access Strategy & Channel Design"],
    url: "https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001",
    buttonLabel: "Read",
  },
  {
    title: "PHIL Launches Direct-to-Patient 2.0 Platform to Transform Access, Affordability, and Adherence in Pharma",
    type: "Press",
    tags: ["Direct-to-Patient", "Access Strategy & Channel Design"],
    url: "https://www.businesswire.com/news/home/20250922836527/en/PHIL-Launches-Direct-to-Patient-2.0-Platform-to-Transform-Access-Affordability-and-Adherence-in-Pharma",
    buttonLabel: "Read",
  },
  {
    title: "Bridging Data Gaps that Impact Retail and Specialty-Lite Success",
    description: "Retail and specialty-lite brand teams are facing a paradox – they're drowning in data yet struggling to gain actionable insight. While manufacturers collect vast amounts of information, most are still making critical business decisions based on incomplete data sets that fail to capture the full prescription journey.",
    type: "Press",
    tags: ["Data, Technology & Optimization", "Commercial Performance"],
    url: "https://www.biopharmadive.com/spons/bridging-the-data-gaps-that-impact-retail-and-specialty-lite-success/747704/",
    buttonLabel: "Read",
  },
  {
    title: "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
    type: "Press",
    tags: ["Direct-to-Patient", "Access Strategy & Channel Design"],
    url: "https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma",
    buttonLabel: "Read",
  },
  {
    title: "Harnessing the Power of Comprehensive Data to Drive GTN",
    description: "Growing market access barriers are compelling retail and specialty-lite pharmaceutical manufacturers to seek new approaches to optimize revenue and enhance patient access. Traditional data sources and siloed solutions are no longer sufficient to address the challenges of formulary exclusions and rising patient out-of-pocket costs. Success in today's market requires comprehensive visibility across the patient journey to drive meaningful improvements in gross-to-net (GTN) performance.",
    type: "Press",
    tags: ["Data, Technology & Optimization", "Commercial Performance"],
    url: "https://www.drugchannels.net/2025/02/from-data-gaps-to-revenue-gains.html",
    buttonLabel: "Read",
  },
  {
    title: "Transforming the Patient Experience with a Strong Direct-to-Consumer Program",
    description: "The pharmaceutical industry has undergone a digital transformation – as of 2024, over 75% of patients have accessed care virtually. Leading brands across the industry are embracing direct-to-consumer (DTC) programs to meet modern patient needs. If you're not considering how this access strategy could benefit your stakeholders, you may be missing out on the opportunity to better serve your patients and providers while driving brand performance.",
    type: "Blog",
    tags: ["Direct-to-Patient", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/transforming-the-patient-experience-with-a-strong-direct-to-consumer-program/",
    buttonLabel: "Read",
  },
  {
    title: "Integrating Telemedicine Into Your Pharmaceutical Brand's DTC Strategy",
    description: "The popularity of direct-to-consumer (DTC) channels across industries has fueled patients' expectations for convenience, cost savings, and improved access to healthcare services. While the COVID-19 pandemic cemented the idea that telemedicine can be a critical part of a pharmaceutical brand's go-to-market strategy, it's essential to recognize that it is just one piece of the puzzle. To truly transform the patient experience and improve brand outcomes, pharmaceutical brand teams need to integrate a telemedicine channel within a broader DTC strategy.",
    type: "Blog",
    tags: ["Direct-to-Patient", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/integrating-telemedicine-into-your-pharmaceutical-brand-dtc-strategy/",
    buttonLabel: "Read",
  },
  {
    title: "8 Strategies to Decrease Prescription Abandonment and Improve Medication Adherence",
    description: "An estimated 1 in 5 prescriptions are left at the pharmacy counter. This vexing healthcare challenge, known as prescription abandonment, is part of the broader concern of medication non-adherence, which also includes not taking medications as prescribed or failing to refill prescriptions.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/8-strategies-to-decrease-prescription-abandonment-and-improve-medication/",
    buttonLabel: "Read",
  },
  {
    title: "Phil Secures $60 Million Growth Capital Facility from K2 HealthVentures to Accelerate AI Integration",
    type: "Press",
    tags: ["Data, Technology & Optimization"],
    url: "https://www.prnewswire.com/news-releases/phil-secures-60-million-growth-capital-facility-from-k2-healthventures-to-accelerate-ai-integration-302499313.html",
    buttonLabel: "Read",
  },
  {
    title: "Is your Patient Access Hub a Strategic Partner?",
    description: "For patients prescribed a specialty or specialty-lite medication, getting started and staying on that therapy is typically a complex and expensive journey. That's why many life science brands are increasingly turning to hub providers to support patient access and affordability.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/is-your-patient-access-hub-a-strategic-partner/",
    buttonLabel: "Read",
  },
  {
    title: "The Case for an Alternative Channel Strategy in Specialty-Lite",
    description: "A major challenge for life science companies that manufacture specialty-lite therapies is finding a channel strategy that offers the level of access services patients and healthcare providers (HCPs) need at a price point that supports the brand's financial health. Typically, brand teams string together a network of brick-and-mortar retail or specialty pharmacies and either work with multiple vendors to build a traditional call-center-based hub or rely on the specialty pharmacies to provide these services. The result is that the brands' gross-to-net cannot sustainably support this channel strategy. To mitigate this challenge and future-proof their specialty-lite brands, manufacturers should consider adopting an alternative channel strategy that is digital and integrated across the prescription journey.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/the-case-for-an-alternative-channel-strategy-in-2024-and-beyond/",
    buttonLabel: "Read",
  },
  {
    title: "How Non-Dispensing Pharmacies can Improve the Patient Access Journey",
    description: "Patients struggling with complex medical conditions face a growing number of barriers to access, afford, and adhere to the innovative therapies their providers prescribe. In 2022, out-of-pocket costs led to the abandonment of 94 million prescriptions. And in a 2023 survey, 97% of medical practices said their patients had experienced care delays or denials due to increased prior authorization requirements.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/how-non-dispensing-pharmacies-can-improve-the-patient-access-journey/",
    buttonLabel: "Read",
  },
  {
    title: "How Can Pharma Manufacturers Improve Patient Engagement in 2025?",
    description: "Patient engagement is a critical factor for brand success. Not only does patient engagement benefit patients by addressing unmet needs more effectively, but it has also proven to be a powerful driver of financial value. A groundbreaking study revealed that an investment of $100,000 in patient engagement could increase net present value and expected net present value by more than 500-fold the investment – the equivalent of accelerating a pre-phase 2 product launch by 2.5 years.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://www.phil.us/how-can-pharma-manufacturers-improve-patient-engagement-in-2025",
    buttonLabel: "Read",
  },
  {
    title: "8 Patient Access Trends Pharma Leaders Should Consider in 2025",
    description: "With a new year brings new brand goals. Retail and specialty-lite brand teams continue to face an evolving patient access landscape that's significantly impacting their commercialization strategies. From the expansion of direct-to-consumer (DTC) models to the growing importance of real-world evidence, these emerging trends are reshaping how patients interact with healthcare systems and access prescribed therapies.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Direct-to-Patient"],
    url: "https://www.phil.us/8-patient-access-trends-pharma-leaders-should-consider-in-2025",
    buttonLabel: "Read",
  },
  {
    title: "Proactive Steps to Overcoming the Top 3 Patient Access Barriers to Retail and Specialty-Lite Therapies",
    description: "Ensuring patients get started and adhere to their medications is critical to achieving optimal health outcomes. However, navigating the medication access journey is no longer straightforward. Whether due to knowledge gaps, prior authorization hurdles, or affordability concerns, there are proactive measures manufacturers can take to address these challenges and improve patient access.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance", "Utilization Management"],
    url: "https://phil.us/proactive-steps-to-overcoming-the-top-3-patient-access-barriers-to-retail/",
    buttonLabel: "Read",
  },
  {
    title: "5 Ways PhilRx Meets Patients' Expectations for Digital Healthcare",
    description: "From travel and entertainment to shopping and banking, digital experiences surround consumers daily. So, it should come as no surprise that they have high expectations for seamless and connected digital experiences in healthcare. And these expectations are driving demand.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/5-ways-philrx-meets-patients-expectations-for-digital-healthcare/",
    buttonLabel: "Read",
  },
  {
    title: "Translating Data into Actionable Insights to Inform your Patient Access Strategy",
    description: "Pharmaceutical companies are embracing big data initiatives to drive their business objectives. For brand teams, data is valuable only when they have the right data to make informed decisions that improve access to their retail and specialty-lite therapies. Life science companies that invest in capabilities to capture, strategically analyze, and draw actionable insights from the most relevant data will realize better brand outcomes.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Access Strategy & Channel Design"],
    url: "https://phil.us/translating-data-into-actionable-insights-to-inform-your-patient-access/",
    buttonLabel: "Read",
  },
  {
    title: "How Drug Manufacturers Can Evolve their Provider Engagement Model to Drive Brand Performance",
    description: "Evolving healthcare provider (HCP) needs and expectations have disrupted conventional customer engagement methods. The traditional reach and frequency model that had long been successful for pharma companies no longer delivers on brand goals.",
    type: "Blog",
    tags: ["Field Enablement & HCP Engagement", "Commercial Performance"],
    url: "https://phil.us/how-drug-manufacturers-can-evolve-their-provider-engagement-model-to-drive/",
    buttonLabel: "Read",
  },
  {
    title: "The Evolving Role of Retail Pharmacies: What Branded Retail and Specialty-Lite Manufacturers Need to Know",
    description: "Branded retail and specialty-lite pharmaceutical manufacturers must be acutely aware of the changes occurring within the retail pharmacy channel because they directly impact access and commercialization efforts. The evolving landscape – marked by the transition of retail pharmacies into primary care providers, the reduction of chain pharmacy footprints, the rise of mail order and online pharmacies, and critical labor shortages – directly influences how branded prescription medications are distributed, accessed, and managed. The following retail pharmacy trends are strong indicators that manufacturers must consider and adopt an alternative channel strategy in 2024 and beyond.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design"],
    url: "https://phil.us/the-evolving-role-of-retail-pharmacies-what-branded-retail-and-specialty/",
    buttonLabel: "Read",
  },
  {
    title: "5 Trends Set to Impact Patient Access to Prescription Therapy in 2024",
    description: "The pharmaceutical industry finds itself at the crossroads of innovative treatments and technological advancements redefining how patients access prescribed therapy. However, this tremendous innovation has also presented unique challenges in securing patient affordability and access to therapy. These five key trends should be considered and will influence how manufacturers should think about shaping their services programs heading into 2024.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/5-trends-set-to-impact-patient-access-to-prescription-therapy-in-2024/",
    buttonLabel: "Read",
  },
  {
    title: "Digital Health's Role in Transforming How Healthcare is Delivered",
    description: "Editor's Note: As the healthcare ecosystem continues to undergo significant digital transformations, life sciences companies would be wise to consider the impact of this evolution on one of their most important stakeholders - health care providers (HCPs). The fusion of the increased prevalence of blended care models, staff shortages, and higher utilization management requirements have resulted in an environment where HCPs find themselves more constrained than ever. This has made it more challenging for life sciences companies to effectively engage providers to ensure that patients can access their therapies.",
    type: "Blog",
    tags: ["Field Enablement & HCP Engagement", "Data, Technology & Optimization"],
    url: "https://phil.us/digital-healths-role-in-transforming-how-healthcare-is-delivered/",
    buttonLabel: "Read",
  },
  {
    title: "How Life Sciences Manufacturers can Meet HCP Expectations for Patient Access Support",
    description: "With payer cost-containment measures continuing to escalate, patient access is top-of-mind for healthcare providers (HCPs) when deciding on prescribed therapy for their patients. Manufacturer-sponsored patient support programs are essential to helping patients get started and afford specialty and specialty-lite medications.",
    type: "Blog",
    tags: ["Field Enablement & HCP Engagement", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/how-life-sciences-manufacturers-can-meet-hcp-expectations-for-patient-access/",
    buttonLabel: "Read",
  },
  {
    title: "Enhancing your Patient Access Hub to Drive Brand Success",
    description: "Biopharma hubs should strive to ensure patients get access to the medications they need quickly and affordably, while easing the manual effort required by prescribers. A positive hub experience builds trust, promotes brand loyalty, and supports ongoing therapy adherence. At the same time, the hub should maximize insurance coverage, which helps manufacturers improve brand economics. In this ideal state, the hub is a strategic partner that drives access, gross-to-net, and outcomes.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance", "Commercial Performance"],
    url: "https://phil.us/enhancing-your-patient-access-hub-to-drive-brand-success/",
    buttonLabel: "Read",
  },
  {
    title: "Leveraging Territory Performance Monitoring to Scale Hub Performance",
    description: "Biopharma field teams play an integral role in driving overall brand success. The visibility gained from benchmarking hub performance at the territory level enables field leadership and access teams to be more strategic with how they promote the hub and helps manufacturers operationalize brand goal alignment. As access teams look to scale their hub services to address these gaps, here's how to leverage territory performance monitoring to ensure success.",
    type: "Blog",
    tags: ["Field Enablement & HCP Engagement", "Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/leveraging-territory-performance-monitoring-to-scale-hub-performance/",
    buttonLabel: "Read",
  },
  {
    title: "Why Quality Scripts are Crucial to Ensuring Pharmacy Coverage for Your Brand",
    description: "Quality prescription intake is the first step to a smooth HCP and patient access experience and is crucial to ensuring your brand realizes the highest rates of adoption and coverage at the pharmacy as possible. At the most basic level, there's a handful of information that a prescription should include the following information to be considered valid for coverage. This blog outlines key quality criteria and how you can ensure high prescription quality for your hub program.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design"],
    url: "https://phil.us/why-quality-scripts-are-crucial-to-ensuring-pharmacy-coverage-for-your-brand/",
    buttonLabel: "Read",
  },
  {
    title: "Hubs, Digital Pharmacies, and Specialty Pharmacies: What Pharma Access Teams Should Know",
    description: "The evolution of healthcare consumer expectations and proliferation of expensive specialty and specialty-lite therapies have led to the rise of innovative solutions to clear an often onerous path to prescribed treatment. In 2022, specialty drugs accounted for 55% of the net spending in the pharmaceutical market, up from 28% in 2011. And an estimated 3 out of 4 patients who try to fill a new prescription for a recently launched brand are unsuccessful due to payer controls.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design"],
    url: "https://phil.us/hubs-digital-pharmacies-and-specialty-pharmacies-what-pharma-access-teams/",
    buttonLabel: "Read",
  },
  {
    title: "How Biopharma Companies Can Support Patients with High Deductible Health Plans",
    description: "In 2023, a growing number of patients are enrolled in high deductible health plans (HDHPs), which require members to pay healthcare costs out-of-pocket until they meet their annual deductible amount before the plan starts covering eligible costs. A recent analysis found that over half of American private-sector workers are now enrolled in HDHPs – a 14.5% increase from 2017.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/how-biopharma-companies-can-support-patients-with-high-deductible-health/",
    buttonLabel: "Read",
  },
  {
    title: "How Manufacturers Can Improve Speed to Therapy: Overcoming Common Causes of Prescription Delays",
    description: "The timely initiation of a prescription therapy is critical to patients' health and quality of life and can often be a matter of life and death. Therapy delays not only have a profound impact on individuals' well-being but also significantly burden the healthcare system. Understanding the root causes of these delays is crucial for developing strategies that enhance patient care, streamline healthcare processes, and ultimately benefit patients and therapy outcomes. In this blog post, we will explore the most prevalent reasons why patients experience prescription therapy delays and delve into how pharmaceutical manufacturers can play a role in improving speed to therapy to improve outcomes for patients and their brands.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance", "Commercial Performance"],
    url: "https://phil.us/how-manufacturers-can-improve-speed-to-therapy-overcoming-common-causes-of/",
    buttonLabel: "Read",
  },
  {
    title: "4 Commercial Practices Shaping the Future of Life Sciences",
    description: "Developing a new drug is an incredibly costly, time-consuming, and high-risk venture. Given the considerable investment to make the drug accessible to patients, it's critical for commercial teams to develop a go-to-market model that delivers an appropriate return on investment (ROI). Here are four commercialization strategies that offer sustainable value in today's complex drug channel.",
    type: "Blog",
    tags: ["Commercial Performance"],
    url: "https://phil.us/4-commercial-practices-shaping-the-future-of-life-sciences/",
    buttonLabel: "Read",
  },
  {
    title: "Setting the Stage for a Successful, Modern Hub Services Program",
    description: "Getting prescribed medications – especially those that treat more complicated, chronic conditions – into the hands of patients is like navigating a maze filled with roadblocks. Consider that out of all the products launched in 2019, only 1 out of 3 patients who tried to initiate a treatment could get it filled – with over half facing a formulary restriction and others abandoning due to cost.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/setting-the-stage-for-a-successful-modern-hub-services-program/",
    buttonLabel: "Read",
  },
  {
    title: "The Impact of Time Constrained HCPs on Life Sciences Commercialization and How Manufacturers Should Adapt",
    description: "Workflows within physician practices have drastically evolved over the last few decades. This shift is due to the transition to value-based payment models, technological advancements, and changing patient expectations for a modern access experience.",
    type: "Blog",
    tags: ["Field Enablement & HCP Engagement", "Commercial Performance"],
    url: "https://phil.us/the-impact-of-time-constrained-hcps-on-life-sciences-commercialization-and/",
    buttonLabel: "Read",
  },
  {
    title: "Conventional Biopharma Commercial Strategies are No Longer Enough",
    description: "In an era where life sciences companies face unprecedented costs to bring novel therapies to market and declining expected returns upon launch, conventional commercialization strategies are insufficient to deliver brand success. The traditional approach of driving demand to the top of the funnel through clinical differentiation, expensive media campaigns, and large field sales forces no longer guarantees adequate product adoption and long-term financial viability under the constraints of intricate utilization management requirements. Thus, a paradigm shift is in order – one that centers around an integrated commercial strategy that is laser-focused on patient access and underpinned by gross-to-net optimization.",
    type: "Blog",
    tags: ["Commercial Performance", "Access Strategy & Channel Design"],
    url: "https://phil.us/conventional-biopharma-commercial-strategies-are-no-longer-enough/",
    buttonLabel: "Read",
  },
  {
    title: "Why Transparency is Critical in the Patient Access Journey",
    description: "The Healthcare system is notoriously complicated and opaque, making it arduous for patients to navigate successfully. That's why there's been a legislative push to increase transparency across through policies such as the No Surprises Act and Hospital Pricing Transparency rule.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/why-transparency-is-critical-in-the-patient-access-journey/",
    buttonLabel: "Read",
  },
  {
    title: "How Life Science Brands Can Successfully Navigate Retail Challenges",
    description: "In 2021, 3 out of 4 patients who tried to fill a new prescription were unsuccessful due to payer controls. As life science companies continue to launch innovative specialty-lite therapies, adopting a distribution strategy that ensures patients can access the brand as prescribed – efficiently and affordably – can mean the difference between a successful launch and not hitting forecasts. Pharmacy networks play a pivotal role in the distribution, fulfillment, and reimbursement of prescription medications, which means the brand's short- and long-term commercial success ultimately hinges on those pharmacies' performance. With a rapidly evolving pharmacy landscape, brand teams should understand the retail challenges in today's market and closely evaluate the pharmacy networks that dispense their prescription therapies.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design"],
    url: "https://phil.us/how-life-science-brands-can-successfully-navigate-retail-challenges/",
    buttonLabel: "Read",
  },
  {
    title: "Is Telemedicine Part of Your Brand's Go-to-Market Strategy? Delivering an End-to-End Digital Experience is Essential",
    description: "The explosion of virtual healthcare during the COVID-19 pandemic fueled the rise of digital direct-to-consumer (DTC) channels in the life sciences industry. The realization that it's possible for patients to have a compliant, clinical conversation to receive a prescription via a telemedicine platform linked to a brand's website can be a game-changer.",
    type: "Blog",
    tags: ["Direct-to-Patient", "Data, Technology & Optimization"],
    url: "https://phil.us/is-telemedicine-part-of-your-brands-go-to-market-strategy-delivering-an-end/",
    buttonLabel: "Read",
  },
  {
    title: "3 Reasons Why Your Patient Services Program May be Falling Short on Medication Adherence",
    description: "Medication nonadherence is a long-standing problem linked to poor health outcomes, increased hospitalizations, and significantly higher healthcare costs. According to the CDC, out of the 3.8 billion prescriptions written in the U.S., one out of five are never filled. Even with good insurance and drug coverage, medication adherence rates for chronic conditions fall between 50-60% – a far cry from the 80% adherence rates medical experts say are necessary for optimal therapeutic efficacy.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/3-reasons-why-your-patient-services-program-may-be-falling-short-on/",
    buttonLabel: "Read",
  },
  {
    title: "4 Strategies to Maximize Enrollment in your Patient Services Program",
    description: "Low enrollment in manufacturer-sponsored patient services programs is rampant, so much so that many industry stakeholders have come to accept this as inevitable. This disappointing trend nearly always holds true if brands employ traditional \"call center-based\" hubs or specialty pharmacies that lack consumer-friendliness, creating unnecessary friction for patients and HCPs. These \"clunky\" programs typically result in enrollment rates between 20-30%. Whereas, digital hubs that deliver more responsive user experiences, in line with what patients engage with in other industries can witness up to 90% enrollment rates. However, numerous factors can diminish those rates, resulting in suboptimal results for brands looking to improve adoption, patient outcomes, and gross-to-net. At Phil, we've learned that there are a number of proven strategies that companies should deploy to maximize enrollment in patient services programs.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance", "Data, Technology & Optimization"],
    url: "https://phil.us/4-strategies-to-maximize-enrollment-in-your-patient-services-program/",
    buttonLabel: "Read",
  },
  {
    title: "Implementing an Effective Bridge Program: Laying the Foundation for Covered Dispenses",
    description: "A common challenge for specialty and specialty-lite brand commercialization teams is maximizing prescription coverage while minimizing free goods program overutilization. Patient bridge and quickstart programs, which provide temporary access to medications for patients experiencing coverage gaps or delays, are essential for therapy continuity and preventing financial burden on patients.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/implementing-an-effective-bridge-program-laying-the-foundation-for-covered/",
    buttonLabel: "Read",
  },
  {
    title: "Launching a New Drug in a Category with Generic Alternatives",
    description: "Getting an innovative prescription drug approved for patient use is a significant milestone – however, it's only the beginning and certainly does not ensure the brand's commercial success. Considering it typically takes ten years and over $2.6 billion for a life sciences manufacturer to move a drug from its initial discovery into the marketplace, commercialization teams must employ effective launch strategies that differentiate their brand to get it into the hands of patients.",
    type: "Blog",
    tags: ["Commercial Performance"],
    url: "https://phil.us/launching-a-new-drug-in-a-category-with-generic-alternatives/",
    buttonLabel: "Read",
  },
  {
    title: "What Makes Phil's Prior Authorization Process Unique?",
    description: "The prior authorization process (PA) presents a significant (and growing) roadblock for healthcare providers trying to get a patient started on a prescription therapy they deem best. In general, a PA requirement affects patients' experience with their healthcare. It represents a length of time – and the associated frustration – they must wait to receive their medication or go without the treatment they have been introduced to by their provider and may desperately need. If the prescribed therapy is not covered, this essentially precludes patients from being able to afford to start and adhere to a medication that could help them better manage a complex medical condition and improve their quality of life.",
    type: "Blog",
    tags: ["Utilization Management"],
    url: "https://phil.us/what-makes-phils-prior-authorization-process-unique/",
    buttonLabel: "Read",
  },
  {
    title: "Transforming the Prior Authorization Process: How Feedback Loops can Improve Patient Access to Life Sciences Brands",
    description: "The use of prior authorization (PA) to control the utilization of prescription drugs, especially specialty medications, is growing, with 79% of medical practices reporting that PA requirements increased between 2021 and 2022. By design, the PA process is a barrier to medication access – it can leave patients waiting for days, weeks, or even months for approval, and coverage denial may occur despite a therapy being appropriately prescribed. The negative consequences of delaying treatment are well documented, yet more than 8 out of 10 patients still experience delays accessing their medications for reasons such as cost and insurance challenges. By implementing a PA strategy that integrates a feedback loop, life sciences manufacturers can improve the overall PA process for key stakeholders – ultimately accelerating time-to-therapy while increasing covered dispenses and gross to net (GTN) for their brand.",
    type: "Blog",
    tags: ["Utilization Management", "Commercial Performance"],
    url: "https://phil.us/transforming-the-prior-authorization-process-how-feedback-loops-can-improve/",
    buttonLabel: "Read",
  },
  {
    title: "Prior Authorizations: What Pharmaceutical Manufacturers Need to Know",
    description: "As healthcare costs have escalated over the last several decades, public and private medical insurers have introduced different utilization management (UM) strategies to control healthcare expenditures. The proliferation of higher-cost specialty medications has accelerated the use of drug UM tools to control access, with prior authorization (PA) being the most common today.",
    type: "Blog",
    tags: ["Utilization Management"],
    url: "https://phil.us/prior-authorizations-what-pharmaceutical-manufacturers-need-to-know/",
    buttonLabel: "Read",
  },
  {
    title: "Optimizing Life Sciences Field Teams in the Era of Drug Utilization Management",
    description: "A persistent challenge for life sciences manufacturers is growing access and affordability obstacles, exacerbated by hard-to-enter formularies and rigorous utilization management (UM) practices. Payers are tightening the screws year over year with new cost containment strategies. Where there used to be hoops, they are now on fire, making it more difficult than ever to ensure reimbursement at the pharmacy.",
    type: "Blog",
    tags: ["Field Enablement & HCP Engagement", "Utilization Management", "Commercial Performance"],
    url: "https://phil.us/optimizing-life-sciences-field-teams-in-the-era-of-drug-utilization/",
    buttonLabel: "Read",
  },
  {
    title: "Phil Inc. Adds Duchesnay USA's Women's Healthcare Product to Its Patient Access Platform",
    description: "Phil Inc. Adds Duchesnay USA's Women's Healthcare Product to Its Patient Access Platform",
    type: "Press",
    tags: ["Access Strategy & Channel Design"],
    url: "https://www.businesswire.com/news/home/20230109005280/en/Phil-Inc.-Adds-Duchesnay-USAs-Womens-Healthcare-Product-to-Its-Patient-Access-Platform",
    buttonLabel: "Read",
  },
  {
    title: "3 Reasons to Work with a Commercialization Partner that has an Integrated Distribution Network",
    description: "The stakes are high for life science companies when establishing the \"best fit\" drug distribution and channel strategy for a brand across the lifecycle, particularly since strong market access is no longer a guarantee to ensure a high percentage of covered dispenses at the pharmacy.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/3-reasons-to-work-with-a-commercialization-partner-that-has-an-integrated/",
    buttonLabel: "Read",
  },
  {
    title: "How to Make the Most of your Manufacturer-sponsored Financial Assistance",
    description: "Life science companies are acutely aware of the financial burden patients face when trying to access branded medications. With an estimated 3 out of 10 American adults not taking medications as prescribed due to cost, affordability is a leading barrier to patient access and something that manufactures have to take seriously if they wish to unlock significant adoption.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/how-to-make-the-most-of-your-manufacturer-sponsored-financial-assistance/",
    buttonLabel: "Read",
  },
  {
    title: "Not Getting Traction with Your Patient Services Program? Here's Why and What to do About it",
    description: "As life science companies continue to invest in and launch specialty and specialty-lite medications to help patients manage chronic - and sometimes debilitating or life-threatening - conditions, they are tasked with developing patient support services programs to help patients access and stay on these therapies. Unfortunately, a poorly utilized program can undermine clinical efficacy and often hinders a brand's commercial success. Despite pouring $5 billion each year into patient support programs, pharmaceutical manufacturers only get an estimated 3 percent of eligible patients to enroll and use their programs. That's a staggering missed opportunity. The key to turning things around is understanding the barriers to utilization and taking steps to maximize the adoption and the value of your program.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/not-getting-traction-with-your-patient-services-program-heres-why-and-what/",
    buttonLabel: "Read",
  },
  {
    title: "Why Strong Market Access Doesn't Always Translate to Covered Dispenses",
    description: "Strong market access, the ability of a pharmaceutical manufacturer to secure reimbursement and coverage for their products from payers and other decision-makers, does not always translate to covered dispenses at the pharmacy level – particularly for specialty and specialty-lite therapies. Manufacturers must also navigate a complex prescription fulfillment and payer utilization management landscape to overcome barriers to patient access. Here are the three biggest reasons why good market access does not guarantee coverage and what commercialization teams can do to overcome this challenge.",
    type: "Blog",
    tags: ["Utilization Management", "Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/why-strong-market-access-doesnt-always-translate-to-covered-dispenses/",
    buttonLabel: "Read",
  },
  {
    title: "Tech Enabled Patient Services: Do More With Less in 2023",
    description: "The pharmaceutical sector has historically been slow to embrace digital technologies. More recently though, as life science companies strive to ensure improved access to their therapies and reduce operational costs, they are turning to disruptive technology platforms that offer the potential to break through barriers to medication.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/tech-enabled-patient-services-do-more-with-less-in-2023/",
    buttonLabel: "Read",
  },
  {
    title: "8 Metrics that Matter When it Comes to Measuring Your Patient Access Program",
    description: "For life science companies, patient support services have become as vital to a brand's success as efficacy and price. A patient support services program has the potential to help break through barriers to medication access. That's why it's crucial to make sure it aligns with your business goals and delivers on your brand objectives while helping patients access their therapy as easily as possible. The only way to evaluate this is by examining the right metrics.",
    type: "Blog",
    tags: ["Patient Experience, Support & Assistance", "Commercial Performance", "Data, Technology & Optimization"],
    url: "https://phil.us/8-metrics-that-matter-when-it-comes-to-measuring-your-patient-access-program/",
    buttonLabel: "Read",
  },
  {
    title: "Developing a Distribution Strategy that Optimizes Gross to Net",
    description: "Downward pressure on net sales is an ongoing problem for pharmaceutical and life sciences companies. It's crucial to understand the gross-to-net (GNT) challenges that manufacturers are facing and how they can leverage their distribution strategies to optimize GTN.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/developing-a-distribution-strategy-that-optimizes-gross-to-net/",
    buttonLabel: "Read",
  },
  {
    title: "Are Traditional Hub Providers Keeping Pace with Today's Consumers and Providers?",
    description: "The seismic changes in consumer behavior and expectations brought on by mobile devices and cloud computing seem to have happened overnight, but they've been years in the making. The popularity of user-friendly services offered by the likes of Amazon, Uber, and Apple Pay has driven innovation and disruption across industries. The COVID-19 pandemic further accelerated the shift to digital tools, especially in healthcare.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Data, Technology & Optimization"],
    url: "https://phil.us/are-traditional-hub-providers-keeping-pace-with-todays-consumers-and/",
    buttonLabel: "Read",
  },
  {
    title: "Tech Enabled Patient Access Webinar: Key Takeaways",
    description: "\"Patient access begins at the moment that a drug is prescribed and encompasses everything that goes with getting a drug into a patient's hand.\" said Len Paolillo, CCO of Impel Pharmaceuticals, during last Thursday's webinar focused on how the right technology can meaningfully improve the chances a therapy will actually be taken as prescribed.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/tech-enabled-patient-access-webinar-key-takeaways/",
    buttonLabel: "Read",
  },
  {
    title: "How Pharmaceutical Manufacturers can Leverage Phil's Technology to Improve Patient Access to Their Therapies",
    description: "Many patients struggle to navigate healthcare effectively, inhibiting access to prescribed therapies. Patrick Leary, Chief Commercial Officer at Phil, shares how technology can break down many of the barriers patients experience, enabling them to better afford and adhere to their medications.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/how-pharmaceutical-manufacturers-can-leverage-phils-technology-to-improve/",
    buttonLabel: "Read",
  },
  {
    title: "3 Ways for Pharmaceutical Companies to Improve the Probability of Launch Success",
    description: "Launching a successful pharmaceutical brand is no easy task. It takes significant stakeholder alignment across many strategic fronts to successfully transition from FDA approval to product adoption and growth. And even with a sizable base and formulary placement, it doesn't necessarily follow that a brand will overcome the \"Coverage Hurdle\" that requires a brand to jump through hoops to convert market access to a high % of covered dispenses. With the stakes at brand launch at an all-time high as a result of soaring drug development costs and the prospect of slipping into a mid-cycle crisis an ever present reality - brands would be wise to adopt new paradigms at launch.",
    type: "Blog",
    tags: ["Commercial Performance"],
    url: "https://phil.us/three-ways-for-pharmaceutical-companies-to-improve-the-probability-of-launch-success/",
    buttonLabel: "Read",
  },
  {
    title: "Why Your Channel Strategy Matters",
    description: "Channel strategy underpins the deployment of a life science company's overall commercialization strategy. A company's channel strategy is the tie that binds the market access, patient access, marketing, trade, and sales strategies to meet brand goals effectively. Ideally, it tightly integrates the processes for managing the logistics of getting products from the manufacturer to patients, implementing services to support patient access and medication adherence, and capturing channel data to measure success and inform decision-making.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/why-your-channel-strategy-matters/",
    buttonLabel: "Read",
  },
  {
    title: "3 Ways Healthcare Technology is Improving Medication Adherence",
    description: "One of the most significant burdens on the U.S. healthcare system is nonadherence to drug therapy. Not only does this issue exact a severe toll on patients' health and quality of life, but the related healthcare costs are also staggering. Studies show that up to 60% of patients struggle with medication adherence, and failure to take prescribed treatment causes an estimated 125,000 avoidable deaths and $100 billion in preventable healthcare costs each year.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/three-ways-healthcare-technology-is-improving-medication-adherence/",
    buttonLabel: "Read",
  },
  {
    title: "Where's the Data? The Healthcare Data You Need to Drive Commercialization",
    description: "In today's world, data abounds. Driven by increased internet access, mobile phone use, and social media, the amount of data created worldwide is expected to skyrocket from 64.2 zettabytes in 2020 to more than 180 zettabytes – that's 180 trillion gigabytes – in 2025.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Commercial Performance"],
    url: "https://phil.us/where-is-the-data-the-healthcare-data-you-need-to-drive-commercialization/",
    buttonLabel: "Read",
  },
  {
    title: "How to Streamline Pharmaceutical Commercialization",
    description: "Developing a new drug is an incredibly costly, time-consuming, and high-risk venture. In the 21st century, it typically takes ten years and over $2.6 billion for a pharmaceutical manufacturer to move a drug from its initial discovery into the marketplace.",
    type: "Blog",
    tags: ["Commercial Performance"],
    url: "https://phil.us/how-to-streamline-pharmaceutical-commercialization/",
    buttonLabel: "Read",
  },
  {
    title: "Optimizing your Drug Distribution Model",
    description: "The primary objective of a drug distribution model is to ensure patients receive the medications they need when they need them. A manufacturer's strategy for getting their product from manufacturer to patient – effectively and efficiently – is crucial to the success of a therapy. The complexity of the distribution process has been exacerbated as a result of the pandemic. In addition to considering the range of physical, financial, and logistical challenges, life science companies would be wise to evaluate the needs and preferences of key stakeholders. Commercial teams can take the following steps to optimize their distribution process across a brand's life cycle.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design"],
    url: "https://phil.us/optimizing-your-drug-distribution-model/",
    buttonLabel: "Read",
  },
  {
    title: "Determining the Optimal Channel Strategy for Your Pharma Brand",
    description: "In this on-demand webinar, Patrick Leary, Phil's Chief Commercial Officer, discusses challenges pharmaceutical brands are facing and how a well-thought-out channel strategy is essential to these key success factors: - Speed-to-therapy - Payer Coverage (Approvals of Rx) - Pull-through to First Fill - Adherence to Therapy - Reimbursement A fragmented commercialization strategy poses significant risks to brand growth and threatens things like the patient and prescriber experience, rates of prescription coverage and pull through, medication adherence, and ultimately, profit margins and commercial success.",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/optimal-channel-strategy-your-pharma-brand/",
    buttonLabel: "Read",
  },
  {
    title: "Technology Trends Shaping the Future of the Pharmaceutical Commercialization",
    description: "Due to its highly regulated, high-risk environment, the pharmaceutical industry has traditionally been slow to adopt new technologies. A conservative approach to technology implementation means that pharma companies may be missing out on the advantages digital technologies offer and have lagged behind other industries in creating rich customer experiences; however, the Covid-19 pandemic significantly accelerated digital transformation throughout the industry.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Commercial Performance"],
    url: "https://phil.us/technology-trends-in-pharmaceutical-commercialization/",
    buttonLabel: "Read",
  },
  {
    title: "3 Patient Engagement Technology Myths",
    description: "A recent survey by Boston Consulting Group, exploring what patients want from pharma companies and how well companies are meeting those needs, revealed a deficiency in patient engagement. The growing demand for improved and more efficient communication between patients and healthcare entities has created an opportunity for pharmaceutical manufacturers to promote patient engagement through digital tools. However, three common myths may be holding them back.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/3-patient-engagement-technology-myths/",
    buttonLabel: "Read",
  },
  {
    title: "6 Healthcare Trends Impacting Pharma Commercialization",
    description: "What commercialization strategies should life sciences companies focus on as they look ahead? It's crucial to monitor trends closely to navigate the evolving healthcare landscape better and build winning strategies. Here are the top six healthcare trends affecting pharma commercialization today:",
    type: "Blog",
    tags: ["Commercial Performance"],
    url: "https://phil.us/6-trends-impacting-pharma-commercialization/",
    buttonLabel: "Read",
  },
  {
    title: "Is Your Life Science Company Taking Full Advantage of Digital Technology?",
    description: "The pharmaceutical industry generates immense volumes of data, so it would make sense that pharma companies are ahead of the curve by leveraging the latest technologies to transform their operations across the value chain. However, historically, the pharmaceutical sector has been slow to embrace digital technologies.",
    type: "Blog",
    tags: ["Data, Technology & Optimization"],
    url: "https://phil.us/life-science-company-digital-technology/",
    buttonLabel: "Read",
  },
  {
    title: "Is Your Pharma Product at Risk for a Mid-Life Cycle Crisis?",
    description: "Commercial launch is an expensive and risky endeavor, especially for small life science companies. According to a recent report, about half of all the drugs launched in the last fifteen years underperformed market expectations by more than 20%. In fact, over half failed to reach $250 million in peak U.S. sales.",
    type: "Blog",
    tags: ["Commercial Performance"],
    url: "https://phil.us/pharma-product-mid-life-cycle-risk/",
    buttonLabel: "Read",
  },
  {
    title: "Prior Authorization Hurdles Don't Discriminate By Disease",
    description: "The rising cost of healthcare in the US and subsequent burdens on payors has led to an overreliance on prior authorizations (PA) to lower costs. Many medicines promising to improve health outcomes, regardless of disease or therapeutic area, come at a price that insurers are reluctant to pay. The PA process can leave patients waiting for days or weeks on a coverage decision for their medication, and coverage can be denied despite being appropriately prescribed. Physicians and patients struggle to navigate the appeals process which leaves patients more inclined to abandon therapy, while drug manufacturers lose out on potential revenues. Drug manufacturers lack visibility into the prevalence of prior authorization hurdles nor have the opportunity to prevent this roadblock to patient care.",
    type: "Blog",
    tags: ["Utilization Management"],
    url: "https://phil.us/prior-authorizations-impacting-therapy-delivery/",
    buttonLabel: "Read",
  },
  {
    title: "How Small Pharma Manufacturers can Optimize Drug Commercialization through Outsourcing",
    description: "One of the most important considerations for any pharmaceutical manufacturer is determining the internal capabilities and capital needed to support drug commercialization. The reality is that small- and medium-sized life sciences companies lack the resources to match the commercialization strategies of big pharma. Fortunately, today, there are opportunities for small pharmaceutical companies to execute a go-to-market strategy through outsourcing.",
    type: "Blog",
    tags: ["Commercial Performance"],
    url: "https://phil.us/small-pharma-manufacturers-drug-commercialization-outsourcing/",
    buttonLabel: "Read",
  },
  {
    title: "Is Your Market Access Strategy Meeting the Needs of Drug Formulary Decision Makers?",
    description: "Drug formularies are a driving force for patient access to prescribed medication. A pharmaceutical brand's inclusion and positioning on drug formularies are often reflective of the market access strategy's level of success. To remain competitive, pharma manufacturers must understand how formulary management and the influence of payers are evolving and take steps to optimize market access.",
    type: "Blog",
    tags: ["Utilization Management", "Commercial Performance"],
    url: "https://phil.us/market-access-strategy-drug-formulary/",
    buttonLabel: "Read",
  },
  {
    title: "Does Your Pharmaceutical Brand's Data Demonstrate Value to Payers?",
    description: "The traditional route to pharmaceutical market access focuses on successful clinical trials and meeting regulators' safety and efficacy data requirements. In the past, this same data was sufficient for payers to determine that the drug was worth covering at the price point set by the manufacturer. But times have changed. With payers playing a more influential role in market access and the availability of data to provide a more accurate picture of how medications perform after approval, pharmaceutical manufacturers need to prove the real-world value of their brands.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Commercial Performance"],
    url: "https://phil.us/does-your-pharmaceutical-brands-data-demonstrate-value-to-payers/",
    buttonLabel: "Read",
  },
  {
    title: "Leveraging Data Analytics to Boost Pharmaceutical Market Access",
    description: "Specialty drugs comprise a growing share of the pharmaceutical market. According to an industry report by Drug Channels, total prescription revenues surpassed $500 billion in 2021, with specialty drugs accounting for almost 40 percent of outpatient prescription revenues and an even larger share of payers' net prescription costs. Over the next five years, these therapies are projected to account for at least half of all revenue generated by the pharmacy industry. To remain competitive in this space, manufacturers need to work with their channel and commercialization partners to access real-time data and meaningful insights to drive market- and patient-access.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Commercial Performance"],
    url: "https://phil.us/leveraging-data-analytics/",
    buttonLabel: "Read",
  },
  {
    title: "3 Ways a Patient Access Platform Breaks Through Barriers to Medication",
    description: "There was a time when the path from a physician prescribing to the patient starting drug therapy was straightforward. With the rise of value-based healthcare and novel specialty treatments, that's no longer the case. Today, rigorous payer requirements and increasing out-of-pocket obligations frequently hinder patient access. Up to one-third of patients report they experience difficulties getting their prescription drugs due to delays, denials, and costs. At the same time, one in ten fail to take medications as prescribed solely because of financial constraints.",
    type: "Blog",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance", "Utilization Management"],
    url: "https://phil.us/3-ways-to-breakthrough-barriers-to-medication/",
    buttonLabel: "Read",
  },
  {
    title: "How to Choose the Best Commercialization Partner to Drive Patient Access",
    description: "Is a pharmaceutical hub the best solution for commercializing your therapies? For well over a decade, pharmaceutical hub services have played a pivotal role in supporting patient access to life-saving and life-altering advanced drug therapies. Unfortunately, hubs tend to be a partner with low customer satisfaction rates and lower than ideal coverage and adherence. So, what is the best way to support patient access to critical therapies?",
    type: "Blog",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/how-to-choose-the-best-commercialization-partner-to-drive-patient-access/",
    buttonLabel: "Read",
  },
  {
    title: "On-Demand Webinar: Innovative Strategies to Streamline the Access Journey for Patients & Providers",
    description: "Putting patients and providers at the heart of every brand initiative is top of mind for all pharma teams. But, many manufacturers have large gaps and friction points in their access journey that are creating high barriers to access, engagement, and adherence. On this webinar, dive into trusted strategies and best practices for designing a medication access experience that drives patient outcomes and provider engagement based on insights from Phil's diverse portfolio of life sciences brands.",
    type: "Webinar",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/on-demand-webinar-innovative-strategies-to-streamline-the-access-journey-for/",
    buttonLabel: "Watch",
  },
  {
    title: "On-Demand Webinar: Delivering on Direct-to-Consumer: Exceeding Patient Expectations for Virtual Care",
    description: "Over 75% of patients have accessed care virtually as of 2024 – the primary reasons being for improved convenience and choice. As patient expectations for digital care continue to rise, the direct-to-consumer (DTC) movement should be top of mind for pharma manufacturers. Watch this webinar with seasoned leaders from Sun Pharmaceuticals and Phil to unpack the evolving landscape of digital care from the perspective of patients and providers, and its potential to improve prescription access, adherence and affordability.",
    type: "Webinar",
    tags: ["Direct-to-Patient", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/on-demand-webinar-delivering-on-direct-to-consumer-exceeding-patient/",
    buttonLabel: "Watch",
  },
  {
    title: "On-Demand Webinar: Optimizing Your Field Team to Maximize Patient Access",
    description: "Field teams play a critical role in securing patient access. As a key player in your brand's success, your field team must command a mastery of your brand's strategic goals in order to effectively drive HCP loyalty and maximize patient access. In this webinar, you'll learn how to design a modern field team model that mobilizes your field team to drive patient access with leaders from Phil and Real Endpoints.",
    type: "Webinar",
    tags: ["Field Enablement & HCP Engagement", "Commercial Performance"],
    url: "https://phil.us/optimizing-your-field-team-to-maximize-patient-access-webinar/",
    buttonLabel: "Watch",
  },
  {
    title: "On-Demand Webinar: Improving Patient Access to Medications by Simplifying the Prescription Process",
    description: "Tune in as panelists will discuss the biggest challenges in the prescription process and implications to patients, as well as opportunities to improve medication access using technology.",
    type: "Webinar",
    tags: ["Data, Technology & Optimization", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/webinar-improving-patient-access-to-medications-by-simplifying-the/",
    buttonLabel: "Watch",
  },
  {
    title: "On-Demand Webinar: Tech Enabled Patient Access",
    description: "Technology is the driving force behind transforming patient access. On this webinar, you'll discover trusted strategies and best practices for building a technology-enabled access strategy from seasoned leaders from Phil, Merck, Impel, Syneos Health, and Fierce Pharma.",
    type: "Webinar",
    tags: ["Data, Technology & Optimization", "Access Strategy & Channel Design"],
    url: "https://phil.us/on-demand-webinar-tech-enabled-patient-access/",
    buttonLabel: "Watch",
  },
  {
    title: "Setting the Stage for Commercial Success in 2025 and Beyond",
    description: "Numerous changes in the healthcare sector are impacting pharmaceutical manufacturers of retail and specialty-lite therapies and their patients, providers, and partners. In order to stay ahead, brand teams must become more agile, digitally-savvy, and patient-centric as they move into 2025. This eBook provides an in-depth guide for pharmaceutical brand teams to thrive in this evolving ecosystem through a laser-focus on patient outcomes and brand success.",
    type: "Report",
    tags: ["Commercial Performance"],
    url: "https://phil.us/setting-the-stage-for-commercial-success-in-2025-and-beyond/",
    buttonLabel: "Download",
  },
  {
    title: "Building a Direct-to-Consumer Program that Wins",
    description: "Pharma manufacturers are embracing direct-to-consumer models as they recognize its potential to improve patient outcomes, provider engagement, and brand performance. However, this transformation comes with challenges and considerations, as it represents a significant shift in how medications are marketed and accessed. If your team is looking to initiate or improve a DTC program as a key component of your channel strategy, this playbook will give you an in-depth overview and strategic roadmap for building an effective digital care initiative",
    type: "Report",
    tags: ["Direct-to-Patient", "Access Strategy & Channel Design"],
    url: "https://phil.us/building-a-direct-to-consumer-program-that-works/",
    buttonLabel: "Download",
  },
  {
    title: "Innovating Your HCP Engagement Model",
    description: "9 in 10 providers expect pharmaceutical companies to help them address their challenges and concerns. Is your team leveraging the right strategy in the right channels at the right time to effectively educate and engage providers. This playbook unpacks the current state of HCP engagement for retail and specialty-lite brands, and offers a 4-point proven strategy for innovating the HCP engagement model through data and technology",
    type: "Report",
    tags: ["Field Enablement & HCP Engagement", "Data, Technology & Optimization"],
    url: "https://phil.us/innovating-your-hcp-engagement-model/",
    buttonLabel: "Download",
  },
  {
    title: "Key Success Factors to Drive Brand Excellence",
    description: "Your support services are critical to ensuring that your patients can start and stay on therapy, easily and affordably. With UM barriers increasing, a digital hub can be an effective channel solution, creating a seamless access experience that supports patients, providers, and manufacturer brand teams across the prescription journey. Download this playbook to learn about the core elements of a digital hub, and the five success factors you can optimize to accelerate the performance of your retail and specialty-lite brands.",
    type: "Report",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance", "Utilization Management"],
    url: "https://phil.us/key-success-factors-to-drive-brand-excellence/",
    buttonLabel: "Download",
  },
  {
    title: "Designing an Exceptional Life Sciences Hub",
    description: "Hub services represent a major touchpoint with patients and healthcare providers, yet many brands struggle to effectively drive engagement. To support today's patients and providers, brand teams should consider a digital patient services model that maximizes patient access. Chart a new course with this playbook, where you'll dive into the data behind digital hubs, learn key strategies for maximizing hub adoption, and read success stories from life sciences manufacturers that have successfully introduced a digital hub.",
    type: "Report",
    tags: ["Access Strategy & Channel Design", "Patient Experience, Support & Assistance"],
    url: "https://phil.us/life-sciences-hub-design/",
    buttonLabel: "Download",
  },
  {
    title: "Strategies to Ensure the Long-term Success of Your Patient Services Programs",
    description: "Life sciences manufacturers face growing challenges with building patient support programs that are also financially sustainable. Discover key research findings and industry insights that offer a strategic approach to ensuring patient service programs drive long-term brand value.",
    type: "Report",
    tags: ["Patient Experience, Support & Assistance", "Commercial Performance"],
    url: "https://phil.us/5-strategies-to-ensure-the-long-term-success-of-your-patient-services/",
    buttonLabel: "Download",
  },
  {
    title: "Optimizing Patient Access for Sustainable Growth",
    description: "Life science companies are often challenged to meet forecasts and maximize the growth of their therapies at any cost – with gross-to-net (GTN) often taking the biggest hit. In today's market conditions, manufacturers can no longer afford to overlook GTN when building and scaling a patient access strategy. Read this white paper to discover the ultimate playbook for aligning the internal teams that have a stake in your brand's success - including marketing, sales, market access, and patient services - to balance maximum patient access with a sustainable GTN.",
    type: "Report",
    tags: ["Access Strategy & Channel Design", "Commercial Performance"],
    url: "https://phil.us/optimizing-patient-access-for-sustainable-growth/",
    buttonLabel: "Download",
  },
  {
    title: "Improving Prescription Coverage at the Pharmacy",
    description: "Pharmacies play a pivotal role in brand success. Through strategically integrating your dispense network into your access strategy, you can successfully improve coverage and accelerate patient adoption. This white paper uncovers the pharmacy dynamics that underpin pharmaceutical brand growth, and outlines actionable strategies to help you build a strong pharmacy partnership that optimizes coverage at the counter.",
    type: "Report",
    tags: ["Access Strategy & Channel Design"],
    url: "https://phil.us/improving-prescription-coverage-at-the-pharmacy/",
    buttonLabel: "Download",
  },
  {
    title: "Improving Adoption of Your Patient Support Services",
    description: "Life sciences teams are investing significant time, energy, and effort into their patient services programs, and most are not yielding desired results. It's time to turn your patient services into a strategic force for brand growth. This white paper outlines how to overcome barriers to patient program utilization and key strategies to maximize patient adoption.",
    type: "Report",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/improving-adoption-of-your-patient-support-services/",
    buttonLabel: "Download",
  },
  {
    title: "Successfully Navigating Prior Authorizations",
    description: "Most pharmaceutical manufacturers (and healthcare providers) are challenged with lengthy and manual prior authorizations. This creates a frustrating barrier to getting patients on the therapies they need to improve their health, quickly and affordably. Luckily, there's a better path to access. This white paper dives into the utilization management landscape, and how commercial teams can reframe their approach to create a seamless experience for providers, patients, and pharmacies.",
    type: "Report",
    tags: ["Utilization Management"],
    url: "https://phil.us/successfully-navigating-prior-authorizations/",
    buttonLabel: "Download",
  },
  {
    title: "Modernizing the Patient Access Experience",
    description: "Patient expectations for digital-first care are at an all-time high. In response, pharmaceutical brands are delivering patient-centric access experiences that provide support at every stage of the prescription journey. This white paper unpacks key trends in patient engagement and key strategies for modernizing your patient services model.",
    type: "Report",
    tags: ["Patient Experience, Support & Assistance", "Data, Technology & Optimization"],
    url: "https://phil.us/modernizing-the-patient-access-experience/",
    buttonLabel: "Download",
  },
  {
    title: "Defining Success for Patient Support Services",
    description: "Life sciences brands aim to develop innovative therapies that improve patient health and wellbeing. Unfortunately, some brands struggle to reach this important milestone - this often occurs when they don't have the right patient support services in place. This white paper offers key strategic questions you can ask to ensure your patient services programs are built to maximize brand access and growth.",
    type: "Report",
    tags: ["Patient Experience, Support & Assistance"],
    url: "https://phil.us/defining-success-for-patient-support-services/",
    buttonLabel: "Download",
  },
];

const TYPES: ResourceItem["type"][] = ["Report", "Press", "Webinar", "Blog"];
const ALL_TAGS = [
  "Access Strategy & Channel Design",
  "Commercial Performance",
  "Data, Technology & Optimization",
  "Direct-to-Patient",
  "Field Enablement & HCP Engagement",
  "Patient Experience, Support & Assistance",
  "Utilization Management",
];

const ITEMS_PER_PAGE = 9;

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function isInternalUrl(url: string): string | null {
  const match = url.match(/^https?:\/\/(www\.)?phil\.us(\/.*)/);
  return match ? match[2] : null;
}

const ResourcesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState<ResourceItem["type"][]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const toggleType = (t: ResourceItem["type"]) => {
    setActiveTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
    setPage(1);
  };

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return RESOURCES_DATA.filter((item) => {
      if (q && !item.title.toLowerCase().includes(q) && !(item.description || "").toLowerCase().includes(q)) return false;
      if (activeTypes.length && !activeTypes.includes(item.type)) return false;
      if (activeTags.length && !activeTags.some((tag) => item.tags.includes(tag))) return false;
      return true;
    });
  }, [search, activeTypes, activeTags]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <PageContext.Provider value={{ title: "Resources" }}>
      <Layout>
        {/* Hero */}
        <section className={classes.hero}>
          <div className={classes.heroInner}>
            <div>
              <div className={classes.heroEyebrow}>Resources</div>
              <h1 className={classes.h1}>Resource Hub</h1>
              <p className={classes.heroDesc}>
                Explore insights, research, and strategies to improve patient access, affordability, and brand performance.
              </p>
            </div>
            <div className={classes.heroArt} aria-hidden="true">
              <div className={classes.ring} />
              <div className={`${classes.ring} ${classes.ringInner}`} />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className={classes.filters}>
          <input
            type="text"
            className={classes.searchInput}
            placeholder="Search resources..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <div className={classes.filterRow}>
            {TYPES.map((t) => (
              <button
                key={t}
                className={`${classes.filterBtn} ${activeTypes.includes(t) ? classes.filterBtnActive : ""}`}
                onClick={() => toggleType(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className={classes.filterRow}>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                className={`${classes.tagBtn} ${activeTags.includes(tag) ? classes.tagBtnActive : ""}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className={classes.gridSection}>
          <div className={classes.grid}>
            {paged.length === 0 && <p className={classes.noResults}>No resources match your filters.</p>}
            {paged.map((item, i) => {
              const internal = isInternalUrl(item.url);
              const cta = internal ? (
                <Link to={internal} className={classes.cardCta}>
                  {item.buttonLabel} <ArrowIcon />
                </Link>
              ) : (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={classes.cardCta}>
                  {item.buttonLabel} <ArrowIcon />
                </a>
              );
              return (
                <div key={i} className={classes.card}>
                  <div className={classes.cardBar} />
                  <div className={classes.cardBody}>
                    <span className={classes.typeBadge}>{item.type}</span>
                    <h3 className={classes.cardTitle}>{item.title}</h3>
                    {item.description && <p className={classes.cardDesc}>{item.description}</p>}
                    <div className={classes.cardTags}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={classes.cardTag}>{tag}</span>
                      ))}
                    </div>
                    {cta}
                  </div>
                </div>
              );
            })}
          </div>
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </section>

        {/* Demo CTA */}
        <DemoCta
          heading="See how PHIL moves more patients to therapy, quickly and affordably"
          description="Take a tour of the PHIL platform and discover how we can help amplify starts, adherence, coverage, and commercial success."
        />
      </Layout>
    </PageContext.Provider>
  );
};

export default ResourcesPage;

export const Head: HeadFC = () => (
  <>
    <title>Resources | PHIL</title>
    <meta
      name="description"
      content="Explore PHIL's resource hub for insights, research, webinars, and strategies on patient access, affordability, and pharmaceutical brand performance."
    />
  </>
);
