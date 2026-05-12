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
  Video,
  PenLine,
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

type MegaNavProps = {
  minimal?: boolean;
  headerTargetBlank?: boolean;
};

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const MOBILE_NAV_SECTIONS = [
  {
    label: "Who We Serve",
    key: "serve",
    links: [
      { to: "/pharma/", label: "Pharma", icon: PillBottle },
      { to: "/patients/", label: "Patients", icon: UserRound },
      { to: "/providers/", label: "Providers", icon: Stethoscope },
    ],
  },
  {
    label: "Our Solution",
    key: "solution",
    links: [
      { to: "/solution/", label: "Overview", icon: LayoutGrid },
      { to: "/solution/core/", label: "Digital Hub", icon: MonitorSmartphone },
      { to: "/solution/direct/", label: "Direct\u2011to\u2011Patient", icon: SmartphoneCharging },
    ],
  },
  {
    label: "Why PHIL",
    key: "why",
    links: [
      { to: "/insights/case-studies/", label: "Customer Success Stories", icon: Trophy },
      { to: "/gtn/", label: "GTN Calculator", icon: Calculator },
    ],
  },
  {
    label: "Resources",
    key: "resources",
    links: [
      { to: "/insights/press-releases/", label: "Press", icon: Newspaper },
      { to: "/insights/resources/", label: "Reports", icon: FileText },
      { to: "/insights/events/", label: "Webinars", icon: Video },
      { to: "/insights/phil-blog/", label: "Blog", icon: PenLine },
    ],
  },
  {
    label: "About Us",
    key: "about",
    links: [
      { to: "/company/", label: "Company", icon: Building },
      { to: "/leadership/", label: "Leadership", icon: UsersRound },
      { to: "/careers/", label: "Careers", icon: Briefcase },
      { to: "/contact/", label: "Contact", icon: Mail },
      { to: "/faqs/", label: "FAQ", icon: HelpCircle },
    ],
  },
];

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
      <button
        className={cx(classes.burger, classes.burgerOpen)}
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <span className={classes.burgerBar} />
        <span className={classes.burgerBar} />
        <span className={classes.burgerBar} />
      </button>
    </div>
    <div className={classes.mobileBody}>
      {MOBILE_NAV_SECTIONS.map((section) => (
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
              {section.links.map((link) => (
                <Link key={link.to} to={link.to} className={classes.mobileLink} onClick={onClose}>
                  <span className={classes.mobileLinkIcon}><link.icon size={18} /></span>
                  {link.label}
                </Link>
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

const MegaNav: React.FC<MegaNavProps> = ({
  minimal = false,
  headerTargetBlank = false,
}) => {
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
            <span className={classes.promoText}>{PROMO_BANNER.text}</span>
            <Link
              className={classes.promoLink}
              to={PROMO_BANNER.href}
            >
              {PROMO_BANNER.linkText}
              <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* Nav Bar */}
        <div className={classes.navBar}>
          {logo}

          <nav className={classes.navPrimary} aria-label="Primary">
            {/* Who We Serve */}
            <div
              className={cx(classes.navItem, { [classes.navItemOpen]: openMenu === "serve" })}
              onMouseEnter={() => handleMouseEnter("serve")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={classes.navTrigger} onClick={() => handleOpen(openMenu === "serve" ? null : "serve")}>
                Who We Serve
              </button>
              <div className={classes.mega} role="menu">
                <div className={classes.megaInner}>
                  <div className={classes.megaListWrap}>
                    <p className={classes.megaGroupTitle}>Who We Serve</p>
                    <ul className={classes.megaList}>
                      <li>
                        <Link to="/pharma/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><PillBottle size={20} /></span>
                          <span className={classes.megaItemTitle}>Pharma</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/patients/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><UserRound size={20} /></span>
                          <span className={classes.megaItemTitle}>Patients</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/providers/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Stethoscope size={20} /></span>
                          <span className={classes.megaItemTitle}>Providers</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <aside className={cx(classes.megaFeature, classes.megaFeatureTidewater)}>
                    <p className={classes.mfEyebrow}>For Pharma Manufacturers</p>
                    <h4 className={classes.mfTitle}>Streamline Your Prescription Access Experience.</h4>
                    <p className={classes.mfBody}>Explore our all-in-one platform that boosts access, affordability, and adherence at scale.</p>
                    <Link to="/solution/" className={cx(classes.mfLink, classes.mfLinkOverlay)}>
                      View Solution <ArrowIcon />
                    </Link>
                  </aside>
                  <aside className={cx(classes.megaFeature, classes.megaFeatureMeadow)}>
                    <p className={classes.mfEyebrow}>For Patients and Providers</p>
                    <h4 className={classes.mfTitle}>Questions About Your PHILRx Prescription?</h4>
                    <p className={classes.mfBody}>Visit our help center for information and support.</p>
                    <a href="https://philhelp.zendesk.com/hc/en-us/p/faq" target="_blank" rel="noopener noreferrer" className={cx(classes.mfLink, classes.mfLinkOverlay)}>
                      Visit Help Center <ArrowIcon />
                    </a>
                  </aside>
                </div>
              </div>
            </div>

            {/* Our Solution */}
            <div
              className={cx(classes.navItem, { [classes.navItemOpen]: openMenu === "solution" })}
              onMouseEnter={() => handleMouseEnter("solution")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={classes.navTrigger} onClick={() => handleOpen(openMenu === "solution" ? null : "solution")}>
                Our Solution
              </button>
              <div className={classes.mega} role="menu">
                <div className={cx(classes.megaInner, classes.megaInnerSolution)}>
                  <div className={classes.megaListWrap}>
                    <p className={classes.megaGroupTitle}>Our Solution</p>
                    <ul className={classes.megaList}>
                      <li>
                        <Link to="/solution/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><LayoutGrid size={20} /></span>
                          <span className={classes.megaItemTitle}>Overview</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/solution/core/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><MonitorSmartphone size={20} /></span>
                          <span className={classes.megaItemTitle}>Digital Hub</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/solution/direct/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><SmartphoneCharging size={20} /></span>
                          <span className={classes.megaItemTitle}>Direct‑to‑Patient</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className={classes.megaListWrap}>
                    <p className={classes.megaGroupTitle}>Why PHIL</p>
                    <ul className={classes.megaList}>
                      <li>
                        <Link to="/insights/case-studies/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Trophy size={20} /></span>
                          <span className={classes.megaItemTitle}>Customer Success Stories</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/gtn/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Calculator size={20} /></span>
                          <span className={classes.megaItemTitle}>GTN Calculator</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <aside className={cx(classes.megaFeature, classes.megaFeatureTidewater)}>
                    <p className={classes.mfEyebrow}>Quantify Your Commercial Potential</p>
                    <h4 className={classes.mfTitle}>Model Your Brand's Gross‑to‑Net Upside.</h4>
                    <p className={classes.mfBody}>Discover how partnering with PHIL can drive commercial success.</p>
                    <Link to="/gtn/" className={cx(classes.mfLink, classes.mfLinkOverlay)}>
                      Calculate GTN Potential <ArrowIcon />
                    </Link>
                  </aside>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div
              className={cx(classes.navItem, { [classes.navItemOpen]: openMenu === "resources" })}
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={classes.navTrigger} onClick={() => handleOpen(openMenu === "resources" ? null : "resources")}>
                Resources
              </button>
              <div className={classes.mega} role="menu">
                <div className={classes.megaInner}>
                  <div className={classes.megaListWrap}>
                    <p className={classes.megaGroupTitle}>Resources</p>
                    <ul className={classes.megaList}>
                      <li>
                        <Link to="/insights/press-releases/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Newspaper size={20} /></span>
                          <span className={classes.megaItemTitle}>Press</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/insights/resources/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><FileText size={20} /></span>
                          <span className={classes.megaItemTitle}>Reports</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/insights/events/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Video size={20} /></span>
                          <span className={classes.megaItemTitle}>Webinars</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/insights/phil-blog/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><PenLine size={20} /></span>
                          <span className={classes.megaItemTitle}>Blog</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <aside className={cx(classes.megaFeature, classes.megaFeatureTidewater)}>
                    <p className={classes.mfEyebrow}>Featured Resource</p>
                    <h4 className={classes.mfTitle}>Patient Perspectives on Direct‑to‑Patient: The Key to Improving Access and Adherence</h4>
                    <Link to="/dtp-research/" className={cx(classes.mfLink, classes.mfLinkOverlay)}>
                      Read Report <ArrowIcon />
                    </Link>
                  </aside>
                  <aside className={cx(classes.megaFeature, classes.megaFeatureMeadow)}>
                    <p className={classes.mfEyebrow}>Featured Resource</p>
                    <h4 className={classes.mfTitle}>HCP Perspectives on Direct‑to‑Patient: Engaging Providers in the Digital Era</h4>
                    <Link to="/hcp-research/" className={cx(classes.mfLink, classes.mfLinkOverlay)}>
                      Read Report <ArrowIcon />
                    </Link>
                  </aside>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div
              className={cx(classes.navItem, { [classes.navItemOpen]: openMenu === "about" })}
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={classes.navTrigger} onClick={() => handleOpen(openMenu === "about" ? null : "about")}>
                About Us
              </button>
              <div className={classes.mega} role="menu">
                <div className={classes.megaInner}>
                  <div className={classes.megaListWrap}>
                    <p className={classes.megaGroupTitle}>About</p>
                    <ul className={classes.megaList}>
                      <li>
                        <Link to="/company/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Building size={20} /></span>
                          <span className={classes.megaItemTitle}>Company</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/leadership/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><UsersRound size={20} /></span>
                          <span className={classes.megaItemTitle}>Leadership</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/careers/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Briefcase size={20} /></span>
                          <span className={classes.megaItemTitle}>Careers</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><Mail size={20} /></span>
                          <span className={classes.megaItemTitle}>Contact</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/faqs/" className={classes.megaListLink}>
                          <span className={classes.megaIcon}><HelpCircle size={20} /></span>
                          <span className={classes.megaItemTitle}>FAQ</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <aside className={cx(classes.megaFeature, classes.megaFeatureTidewater)}>
                    <p className={classes.mfEyebrow}>Featured Announcement</p>
                    <h4 className={classes.mfTitle}>PHIL and Sprout Pharmaceuticals Expand Affordable Direct‑to‑Patient Access Program for Innovative Women's Health Brand</h4>
                    <a href="https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html" target="_blank" rel="noopener noreferrer" className={cx(classes.mfLink, classes.mfLinkOverlay)}>
                      Read Press Release <ArrowIcon />
                    </a>
                  </aside>
                  <aside className={cx(classes.megaFeature, classes.megaFeatureMeadow)}>
                    <p className={classes.mfEyebrow}>Featured Announcement</p>
                    <h4 className={classes.mfTitle}>PHIL and Tenpoint Therapeutics Partner to Launch Direct‑to‑Patient Cash Program for Novel Ophthalmologic Brand</h4>
                    <a href="https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable" target="_blank" rel="noopener noreferrer" className={cx(classes.mfLink, classes.mfLinkOverlay)}>
                      Read Press Release <ArrowIcon />
                    </a>
                  </aside>
                </div>
              </div>
            </div>
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
