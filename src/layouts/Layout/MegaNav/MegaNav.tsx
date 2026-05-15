import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "gatsby";
import {
  PillBottle,
  UserRound,
  Stethoscope,
  LayoutGrid,
  MonitorSmartphone,
  SmartphoneCharging,
  Trophy,
  Calculator,
  Newspaper,
  FileText,
  Building,
  UsersRound,
  Briefcase,
  Mail,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import cx from "clsx";

import philLogo from "assets/images/phil-logo-green.png";
import { PROMO_BANNER } from "./megaNav.config";

import * as classes from "./megaNav.module.css";

/* ─── Types ─── */

type NavLink = {
  to: string;
  label: string;
  icon: React.FC<{ size: number }>;
};

type NavGroup = {
  title?: string;
  links: NavLink[];
};

type FeatureCard = {
  to: string;
  external?: boolean;
  variant: "tidewater" | "meadow";
  eyebrow: string;
  title: string;
  body?: string;
  linkText: string;
};

type NavSection = {
  label: string;
  key: string;
  megaInnerClass?: string;
  groups: NavGroup[];
  features?: FeatureCard[];
};

/* ─── Data ─── */

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Who We Serve",
    key: "serve",
    groups: [
      {
        links: [
          { to: "/pharma/", label: "Pharma", icon: PillBottle },
          { to: "/patients/", label: "Patients", icon: UserRound },
          { to: "/providers/", label: "Providers", icon: Stethoscope },
        ],
      },
    ],
    features: [
      {
        to: "/solution/",
        variant: "tidewater",
        eyebrow: "For Pharma Manufacturers",
        title: "Streamline Your Prescription Access Experience.",
        body: "Explore our all-in-one platform that boosts access, affordability, and adherence at scale.",
        linkText: "View Solution",
      },
      {
        to: "https://philhelp.zendesk.com/hc/en-us/p/faq",
        external: true,
        variant: "meadow",
        eyebrow: "For Patients and Providers",
        title: "Questions About Your PHILRx Prescription?",
        body: "Visit our help center for information and support.",
        linkText: "Visit Help Center",
      },
    ],
  },
  {
    label: "Our Solution",
    key: "solution",
    megaInnerClass: "megaInnerSolution",
    groups: [
      {
        links: [
          { to: "/solution/", label: "Overview", icon: LayoutGrid },
          { to: "/solution/core/", label: "Digital Hub", icon: MonitorSmartphone },
          { to: "/solution/direct/", label: "Direct\u2011to\u2011Patient", icon: SmartphoneCharging },
        ],
      },
      {
        title: "Why PHIL",
        links: [
          { to: "/insights/case-studies/", label: "Customer Success Stories", icon: Trophy },
          { to: "/gtn/", label: "GTN Calculator", icon: Calculator },
        ],
      },
    ],
    features: [
      {
        to: "/gtn/",
        variant: "tidewater",
        eyebrow: "Quantify Your Commercial Potential",
        title: "Model Your Brand\u2019s Gross\u2011to\u2011Net Upside.",
        body: "Discover how partnering with PHIL can drive commercial success.",
        linkText: "Calculate GTN Potential",
      },
    ],
  },
  {
    label: "Resources",
    key: "resources",
    groups: [
      {
        links: [
          { to: "/resources/", label: "Resource Hub", icon: FileText },
          { to: "/press/", label: "Press", icon: Newspaper },
        ],
      },
    ],
    features: [
      {
        to: "/dtp-research/",
        variant: "tidewater",
        eyebrow: "Featured Resource",
        title: "Patient Perspectives on Direct\u2011to\u2011Patient: The Key to Improving Access and Adherence",
        linkText: "Read Report",
      },
      {
        to: "/hcp-research/",
        variant: "meadow",
        eyebrow: "Featured Resource",
        title: "HCP Perspectives on Direct\u2011to\u2011Patient: Engaging Providers in the Digital Era",
        linkText: "Read Report",
      },
    ],
  },
  {
    label: "About Us",
    key: "about",
    groups: [
      {
        links: [
          { to: "/company/", label: "Company", icon: Building },
          { to: "/leadership/", label: "Leadership", icon: UsersRound },
          { to: "/careers/", label: "Careers", icon: Briefcase },
          { to: "/contact/", label: "Contact", icon: Mail },
          { to: "/faqs/", label: "FAQ", icon: HelpCircle },
        ],
      },
    ],
    features: [
      {
        to: "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html",
        external: true,
        variant: "tidewater",
        eyebrow: "Featured Announcement",
        title: "PHIL and Sprout Pharmaceuticals Expand Affordable Direct\u2011to\u2011Patient Access Program for Innovative Women\u2019s Health Brand",
        linkText: "Read Press Release",
      },
      {
        to: "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
        external: true,
        variant: "meadow",
        eyebrow: "Featured Announcement",
        title: "PHIL and Tenpoint Therapeutics Partner to Launch Direct\u2011to\u2011Patient Cash Program for Novel Ophthalmologic Brand",
        linkText: "Read Press Release",
      },
    ],
  },
];

/* ─── Reusable Components ─── */

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const MegaLinkList: React.FC<{ groups: NavGroup[]; sectionLabel: string }> = ({ groups, sectionLabel }) => (
  <>
    {groups.map((group, gi) => (
      <div key={gi} className={classes.megaListWrap}>
        <p className={classes.megaGroupTitle}>{group.title || (gi === 0 ? sectionLabel : "")}</p>
        <ul className={classes.megaList}>
          {group.links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={classes.megaListLink}>
                <span className={classes.megaIcon}><link.icon size={20} /></span>
                <span className={classes.megaItemTitle}>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

const MegaFeatureCard: React.FC<{ card: FeatureCard }> = ({ card }) => {
  const variantClass = card.variant === "tidewater" ? classes.megaFeatureTidewater : classes.megaFeatureMeadow;
  const content = (
    <>
      <p className={classes.mfEyebrow}>{card.eyebrow}</p>
      <h4 className={classes.mfTitle}>{card.title}</h4>
      {card.body && <p className={classes.mfBody}>{card.body}</p>}
      <span className={classes.mfLink}>
        {card.linkText} <ArrowIcon />
      </span>
    </>
  );

  if (card.external) {
    return (
      <a href={card.to} target="_blank" rel="noopener noreferrer" className={cx(classes.megaFeature, variantClass)}>
        {content}
      </a>
    );
  }

  return (
    <Link to={card.to} className={cx(classes.megaFeature, variantClass)}>
      {content}
    </Link>
  );
};

/* ─── Mobile Drawer ─── */

type MobileDrawerProps = {
  onClose: () => void;
  accordion: string | null;
  setAccordion: (key: string | null) => void;
  headerTargetBlank: boolean;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({ onClose, accordion, setAccordion, headerTargetBlank }) => (
  <div className={classes.mobileDrawer}>
    <div className={classes.mobileHeader}>
      {headerTargetBlank ? (
        <a href="https://phil.us" target="_blank" rel="noopener noreferrer" className={classes.navLogo} aria-label="PHIL home">
          <img src={philLogo} alt="PHIL" />
        </a>
      ) : (
        <Link className={classes.navLogo} to="/" aria-label="PHIL home" onClick={onClose}>
          <img src={philLogo} alt="PHIL" />
        </Link>
      )}
      <button className={cx(classes.burger, classes.burgerOpen)} onClick={onClose} aria-label="Close navigation menu">
        <span className={classes.burgerBar} />
        <span className={classes.burgerBar} />
        <span className={classes.burgerBar} />
      </button>
    </div>
    <div className={classes.mobileBody}>
      {NAV_SECTIONS.map((section) => (
        <div key={section.key} className={classes.mobileAccordionItem}>
          <button
            className={cx(classes.mobileAccordionTrigger, {
              [classes.mobileAccordionTriggerOpen]: accordion === section.key,
            })}
            onClick={() => setAccordion(accordion === section.key ? null : section.key)}
          >
            {section.label}
            <ChevronDown size={18} />
          </button>
          {accordion === section.key && (
            <div className={classes.mobileAccordionContent}>
              {section.groups.map((group, gi) => (
                <React.Fragment key={gi}>
                  {group.title && <div className={classes.mobileGroupTitle}>{group.title}</div>}
                  {group.links.map((link) => (
                    <Link key={link.to} to={link.to} className={classes.mobileLink} onClick={onClose}>
                      <span className={classes.mobileLinkIcon}><link.icon size={18} /></span>
                      {link.label}
                    </Link>
                  ))}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className={classes.mobileActions}>
        <a href="https://my.phil.us/" target="_blank" rel="noopener noreferrer" className={cx(classes.btnNav, classes.btnNavLogin)}>
          Patient Login
        </a>
        <Link to="/demo/" className={cx(classes.btnNav, classes.btnNavDemo)} onClick={onClose}>
          Book Demo
        </Link>
      </div>
    </div>
  </div>
);

/* ─── Main Component ─── */

type MegaNavProps = {
  minimal?: boolean;
  headerTargetBlank?: boolean;
};

const MegaNav: React.FC<MegaNavProps> = ({ minimal = false, headerTargetBlank = false }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shellRef = useRef<HTMLElement>(null);

  const handleOpen = useCallback((name: string | null) => {
    setOpenMenu(name);
  }, []);

  const handleMouseEnter = useCallback((menu: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    handleOpen(menu);
  }, [handleOpen]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => handleOpen(null), 140);
  }, [handleOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        handleOpen(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleOpen(null);
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleOpen]);

  const logo = headerTargetBlank ? (
    <a className={classes.navLogo} href="https://phil.us" target="_blank" rel="noopener noreferrer" aria-label="PHIL home">
      <img src={philLogo} alt="PHIL" />
    </a>
  ) : (
    <Link className={classes.navLogo} to="/" aria-label="PHIL home">
      <img src={philLogo} alt="PHIL" />
    </Link>
  );

  if (minimal) {
    return (
      <header className={classes.navShell}>
        <div className={classes.navBar}>{logo}</div>
      </header>
    );
  }

  return (
    <>
      <header className={classes.navShell} ref={shellRef}>
        {/* Promo Banner */}
        <div className={classes.promoBanner}>
          <div className={classes.promoInner}>
            <span className={classes.promoText}>{PROMO_BANNER.text}{" "}</span>
            <Link className={classes.promoLink} to={PROMO_BANNER.href}>
              {PROMO_BANNER.linkText}
              <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* Nav Bar */}
        <div className={classes.navBar}>
          {logo}

          <nav className={classes.navPrimary} aria-label="Primary">
            {NAV_SECTIONS.map((section) => (
              <div
                key={section.key}
                className={cx(classes.navItem, { [classes.navItemOpen]: openMenu === section.key })}
                onMouseEnter={() => handleMouseEnter(section.key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={classes.navTrigger}
                  onClick={() => handleOpen(openMenu === section.key ? null : section.key)}
                >
                  {section.label}
                </button>
                <div className={classes.mega} role="menu">
                  <div className={cx(classes.megaInner, section.megaInnerClass && (classes as Record<string, string>)[section.megaInnerClass])}>
                    <MegaLinkList groups={section.groups} sectionLabel={section.label} />
                    {section.features?.map((card, i) => (
                      <MegaFeatureCard key={i} card={card} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className={classes.navActions}>
            <a href="https://my.phil.us/" target="_blank" rel="noopener noreferrer" className={cx(classes.btnNav, classes.btnNavLogin)}>
              Patient Login
            </a>
            <Link to="/demo/" className={cx(classes.btnNav, classes.btnNavDemo)}>
              Book Demo
            </Link>
          </div>

          <button
            className={cx(classes.burger, { [classes.burgerOpen]: mobileOpen })}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className={classes.burgerBar} />
            <span className={classes.burgerBar} />
            <span className={classes.burgerBar} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={cx(classes.backdrop, { [classes.backdropVisible]: openMenu !== null })}
        onClick={() => handleOpen(null)}
      />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <MobileDrawer
          onClose={() => setMobileOpen(false)}
          accordion={mobileAccordion}
          setAccordion={setMobileAccordion}
          headerTargetBlank={headerTargetBlank}
        />
      )}
    </>
  );
};

export default MegaNav;
